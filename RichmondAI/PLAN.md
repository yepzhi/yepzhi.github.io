# RichmondAI — PLAN.md (Master Handoff Document)

> **Audience: any AI agent or human developer picking this project up cold.**
> Read this file first. It is the source of truth for product intent, architecture,
> current status, constraints, decisions, and what to do next.
> `ROADMAP.md` is the ORIGINAL 50-phase wishlist and is partly outdated (it describes a dark
> "cyber-aurora" theme and unchecked boxes that are in fact done). **If PLAN.md and ROADMAP.md
> disagree, PLAN.md wins.**
>
> Keep this file updated whenever you change behaviour, add a generator, or flip a backend switch.
> Last updated: 2026-10-17.

---

## 1. Product in one paragraph

**RichmondAI** is an AI instructional-materials studio for **English (ELT) and ESP teachers**
(English for Specific Purposes: engineering, healthcare, aviation, computing, business, tourism).
Teachers pick a generator, set a topic + CEFR level + difficulty + SEND (special needs) options, and get
a ready-to-use classroom resource (quiz, flashcards, lesson plan, rubric, ...) they can print, copy, or
export to Word. It is a **cheaper TeacherMatic alternative**:

| | TeacherMatic | RichmondAI |
|---|---|---|
| Price | $99 / year | **$29 / year** (~70% cheaper) or $4.99/mo |
| Free tier | 15/day trial week only | **15 generations/day permanently** |
| Pro | – | 150/day |
| Institutional | – | 500/day (placeholder) |
| Focus | General | CEFR-calibrated + 7 ESP tracks + SEND adaptation |

Live URL: **https://yepzhi.com/RichmondAI/** (static hosting, see §9).
Owner/maintainer: yepzhi (Alberto/“yepz”). Primary UI language: English (users are teachers in
Mexico/LatAm and beyond; owner chats in Spanish — answer the owner in the language they use).

---

## 2. HARD CONSTRAINTS (do not violate)

1. **100% light mode. NO dark mode.** White/near-white surfaces. Do not add `prefers-color-scheme: dark`,
   dark toggles, or dark backgrounds. (ROADMAP.md mentions obsidian/dark tokens — that is obsolete.)
2. **The big GOLD “RichmondAI” hero wordmark on the homepage must stay.** Gradients are welcome.
3. **Do NOT start Firebase Auth or the Gemini proxy until the owner provides credentials / says go**
   (see §7 — scaffolding and docs are fine, activation is not). Owner said “not yet” twice. The
   2026-10-17 message “ALL” asked for the *plan to cover everything*; code scaffolds are acceptable,
   switching production behaviour is not without credentials.
4. Keep pricing messaging: **$29/yr vs $99/yr**, **15 free/day permanent**.
5. Stay **dependency-free static front-end** (vanilla HTML/CSS/JS, no build step) unless the owner
   approves a framework. Fonts/icons come from CDNs already referenced in `index.html`.
6. Preserve existing comments/docstrings you aren't changing.
7. Never commit real API keys, Firebase service accounts, or secrets. A Firebase *web* config is not
   secret, but a Gemini key is.

---

## 3. Repository layout

```
/Users/yepz/RichmondAI            <- this repo (git, branch main)
├── index.html                    # Entire UI: homepage/hero, sandbox, studio, modals (≈1225 lines)
├── app.js                        # ALL logic (≈1920 lines, single IIFE-style file)
├── styles.css                    # ALL styling (≈2290 lines, includes @media print at ~1384)
├── aurora.js                     # Animated background canvas (position:fixed, behind everything)
├── firestore.rules.example       # Rules for the future Firestore quota store (NOT deployed)
├── README.md                     # Marketing-style overview (somewhat dated: mentions dark/obsidian)
├── ROADMAP.md                    # Original 50-phase wishlist (outdated, see header note)
├── PLAN.md                       # THIS FILE
└── .gitignore
```

### Deployment copies (IMPORTANT)
The site is served from a *different* repo: **`/Users/yepz/yepzhiweb`** (GitHub Pages-style host for
yepzhi.com). RichmondAI is copied there under BOTH casings because URLs are case sensitive:
`/Users/yepz/yepzhiweb/RichmondAI/` and `/Users/yepz/yepzhiweb/richmondai/`.

---

## 4. Architecture (app.js map)

`app.js` sections, in order (line numbers approximate — **grep, don't trust them**):

| Section | Symbol | Purpose |
|---|---|---|
| 1 | `GENERATORS` (~L13) | Object keyed by generator id. Each: `{id, name, category, icon, desc, promptHint, ...}` |
| – | `CEFR_INFO`, `SEND_LABELS` | CEFR descriptors (Pre-A1…C2) and SEND option labels |
| – | `BACKEND_CONFIG` (~L346) | `{quotaBackend:'local'|'firestore', firebase:null|{...}}` — the swap switch |
| – | `QUOTA_LIMITS` | `{free:15, pro:150, institutional:500}` |
| 2 | `LocalQuotaStore` | Signed (FNV-1a hash, salt `rch-v1`) localStorage counter. Tamper-evident + clock-rollback resistant. **Deterrent only**, not security |
| – | `FirestoreQuotaStore` | Coded, **disabled**. Doc `quotas/{uid}_{YYYY-MM-DD}` → `{used,max}`; transaction increments |
| – | `createQuotaStore(key)` | Chooses store from `BACKEND_CONFIG` |
| 3 | `AuthManager` | Demo login in localStorage (`name,email,school,tier`), quota UI, UTC-midnight reset countdown, `async consumeGeneration()` |
| 4 | `PedagogicalGenerator` (~L564) | **Offline/demo engine.** Template output for every generator using the user's topic (`_generateDocContent` for the 10 newer generators; older ones have bespoke methods) |
| 5 | `GeminiClient` (~L911) | Direct browser→Gemini REST (`generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=`). BYOK key in localStorage `richmond_gemini_api_key`, model `richmond_gemini_model` (default `gemini-2.5-flash`) |
| 6 | `RichmondStudio` (~L983) | UI controller: DOM init, events, `navTo`, `trySample`, `selectGenerator`, `executeGeneration`, rendering (formatted / cutout flashcards / student / key / markdown), exports, cartridges, history |

### Generation flow
1. User clicks **Generate** → `executeGeneration()`.
2. Auth gate (must be logged in) → quota check (`auth.canGenerate()`).
3. Build prompt = generator `promptHint` + topic + CEFR + difficulty + learner profile + SEND + active
   cartridge context + system instruction (CEFR calibration).
4. If `gemini.hasKey()` → live Gemini call; else → `PedagogicalGenerator` offline template (topic-aware).
5. `consumeGeneration()` decrements quota (async; Firestore-ready).
6. Result stored in `this.currentGeneration` `{topic, cefr, markdown, type, cards?}` and rendered.
7. Actions: Print (`window.print()` + `@media print`), **DOCX** (HTML-in-.doc Blob, `application/msword`),
   Copy markdown, Save to Library (localStorage history).

### localStorage keys (grep `localStorage.` to confirm)
- `richmond_gemini_api_key`, `richmond_gemini_model` — BYOK
- user/session + quota keys inside `AuthManager` (quota is the signed object `{date,used,max,sig}`)
- cartridges and history arrays (`_loadCartridges`, `_loadHistory`)

### Adding a generator (single entry!)
Add ONE object to `GENERATORS` with `id`, `name`, `category`, `icon`, `desc`, `promptHint`.
The sidebar dropdown and the Generators catalog are built dynamically from this object.
For an offline template, extend `PedagogicalGenerator._generateDocContent` (switch on id).
Test: select it, enter a custom topic, confirm output contains that topic and quota drops by 1.

---

## 5. Generator catalog (26 total)

**General ELT (11):** `mcq`, `flashcards` (cut-out printable cards, IPA + CEFR), `activities`,
`summariser` (CEFR leveler), `questions` (Bloom), `short_answers`, `discussion`, `inspiration`,
`feedback` (essay feedback/rubric), `youtube` (video-based tasks), …

**Specialized ESP (6):** `esp_engineering`, `esp_healthcare`, `esp_aviation`, `esp_computing`,
`esp_business`, `esp_tourism`

**Planning & Writing (10, added Oct 2026):** `lesson_plan`, `worksheet`, `reading_comp`, `cloze`,
`rubric`, `email_writer`, `scheme_of_work`, `dialogue`, `vocab_list`, `report_comments`

Verification status: all 26 pass a headless node test (custom topic appears in output). Only
`lesson_plan` was additionally checked visually in the browser. The other 9 new ones have NOT been
inspected in the rendered UI (see task T2).

---

---

## 6. Current status snapshot

### Done
- Light-mode redesign inspired by `/Users/yepz/stemOS` and `/Users/yepz/JSweb`: big gold hero, gradients,
  sandbox “try it” section, comparison table, catalog grid, collapsible sidebar, header island.
- Layout bug fixed: aurora canvas is `position:fixed` (was in flow and shoved the app down).
- 26 generators; dynamic dropdown/catalog.
- Quota layer swappable (local ⇄ firestore), signed local counter, tamper test passes (shows 0/15).
- Offline demo templates use the user's topic across all 26 generators.
- **T1 Polish style & export**: full GFM table rendering (`richmond-table`), cloze blanks, dialogue badges,
  isolated printable answer-key sections (`page-break-before: always;`), sanitized Word XML `.doc` export with margins.
- **T2 & T7 Test Suite**: automated regression suite (`tests/generators.test.js`) testing all 26 generators,
  topic calibration, signed quota store, and markdown parser (90 tests passing).
- **T6 TTS Pro (Mini PC Piper TTS)**: integrated `RichmondTtsEngine` with `fable` (English) and `stembot` (Spanish),
  mobile audio unlock, floating tap-to-play pill `#ttsTapPill`, action bar `#btn-export-tts`, and inline dialogue audio.
- Deployed to yepzhi.com/RichmondAI (+ lowercase copy).

### Scaffolded / Ready to activate
- **T3 Firebase Auth**: `BACKEND_CONFIG.authBackend` ('local' | 'firebase'), `AuthManager.loginWithGoogle()`,
  `FirestoreQuotaStore` transaction engine. Ready to activate once user provides Firebase project config.
- **T4 Gemini Proxy**: `BACKEND_CONFIG.geminiBackend` ('client' | 'proxy') and `GeminiClient.generate()`
  supporting Cloudflare Worker proxy with bearer token without exposing teacher keys.

---

## 7. Backlog (ordered). Status legend: ☐ todo · ◐ scaffold only · ☑ done

### T1 — Polish style + export of all 26 generators ☑ done
- GFM table parser implemented with responsive wrappers (`.table-responsive > .richmond-table`).
- `@media print`: clean student worksheet vs teacher answer key page break (`page-break-before: always;`
  on `.answer-key-section`), high-contrast table borders, chrome and audio buttons hidden in print.
- Enhanced DOCX export: sanitized HTML to prevent XML corruption, Microsoft Office Word XML formatting,
  `@page WordSection1` margins (1 inch), Calibri typography, table borders, and header metadata box.
- Interactive cloze underlines (`.cloze-blank`) and styled dialogue speaker badges (`.dialogue-speaker`).

### T2 — Verify all 26 generators ☑ done
- Fully verified via automated test suite `tests/generators.test.js` (90 passing assertions).
- All 26 generators verified offline with custom topic embedding and CEFR calibration.

### T3 — Firebase Auth + real quota ◐ scaffolded (WAITING FOR OWNER FIREBASE PROJECT)
Prereqs from owner: Firebase project id + web config; enable Email/Password and Google providers;
authorized domains `yepzhi.com`.
Current status:
1. `BACKEND_CONFIG.authBackend = 'local' | 'firebase'` ready in `app.js`.
2. `AuthManager.loginWithGoogle()` and `_initFirebaseAuth()` listener scaffolded.
3. Google Sign-In button added to `#modal-auth` in `index.html`.
4. `FirestoreQuotaStore` ready with `firestore.rules.example`.
5. Once credentials arrive: add Firebase scripts, set config in `BACKEND_CONFIG`, flip switch to `'firebase'`.

### T4 — Gemini proxy ◐ scaffolded (WAITING FOR WORKER URL)
Goal: teachers don’t need their own key; the owner’s key stays server-side; limits enforced server-side.
Current status:
1. `BACKEND_CONFIG.geminiBackend = 'client' | 'proxy'` ready in `app.js`.
2. `GeminiClient.generate()` automatically forwards prompt to `BACKEND_CONFIG.proxyUrl` with Firebase ID token when active.
3. Seamless fallback to BYOK key or offline pedagogical templates.

### T5 — Pro payments ☐ (not started, not requested yet)
Stripe Checkout / Payment Links ($29/yr, $4.99/mo) → webhook sets tier claim. Needs T3+T4.

### T6 — Voice (TTS Pro with Mini PC) ☑ done
- Uses Mini PC Piper TTS: `POST https://core-yzai.yepzhi.com/v1/audio/speech` (with fallback to `yzai.yepzhi.com`).
- Voices: **English = `fable`**, **Spanish = `stembot`** (auto-detected from linguistic markers and accents).
- Mobile audio unlock: valid 0.3s silent PCM WAV data URL prevents mobile autoplay rejections.
- Floating `#ttsTapPill`: tap-to-play pill appears if browser requires an explicit user gesture.
- Action bar `#btn-export-tts`: global "Listen / Stop" button for current generation.
- Inline listen buttons: dialogue lines have individual `🔊` buttons.
- Fallback: graceful handoff to `window.speechSynthesis` if Mini PC is unreachable.

### T7 — Quality & Test Automation ☑ done
- `tests/generators.test.js`: runnable via `npm test`. 90 unit tests passing.
- `package.json`: includes `npm test`, `npm run check`, `npm start`, and `npm run deploy`.
- Analytics-free by default; add privacy note for BYOK key (stays in browser).

### T8 — Content features from original roadmap not built ☐
Cartridges exist (saved course contexts). Not built / partial: real YouTube transcript fetch (current
`youtube` generator works from pasted text/topic only), image-based task builder, essay grading with
rubric scores, multi-language UI (UK/US/ES/FR), institutional tier.

---

## 8. Decisions log

| Date | Decision | Reason |
|---|---|---|
| 2026-10 | Light mode only, gold hero | Owner preference; stemOS/JSweb look |
| 2026-10 | Aurora canvas `position:fixed` | In-flow canvas pushed app down |
| 2026-10 | Swappable quota layer (local ⇄ firestore) | Owner wanted Auth later without rewrite |
| 2026-10 | Signed local counter | Cheap tamper deterrent until Auth exists |
| 2026-10 | 10 generators under “Planning & Writing” | Match TeacherMatic’s most-used tools |
| 2026-10 | Firebase Auth + Gemini proxy deferred | Owner: “not yet” |
| 2026-10-17 | PLAN.md becomes the master handoff | Owner wants every AI able to continue |

---

## 9. Build, run, test, deploy

**Run locally** (no build): `cd /Users/yepz/RichmondAI && python3 -m http.server 8080` → http://localhost:8080

**Syntax check:** `node --check app.js`

**Headless generator test (ad-hoc):** load `app.js` in node with a stubbed `window/document/localStorage`,
instantiate `PedagogicalGenerator`, call it for each `GENERATORS` id with a custom topic, assert the topic is in
the output. (Make this permanent: T7.)

**Browser verification tips:** log in with the demo form first (generation is gated). Use a clean
profile or clear localStorage to reset quota. When using an automated browser agent, give it strict
read-only instructions — earlier agents fabricated/patched results; always look at the screenshots yourself.

**Deploy (static copy into yepzhiweb):**
```bash
cd /Users/yepz/RichmondAI
rsync -a --exclude='.git' ./ /Users/yepz/yepzhiweb/RichmondAI/
cp -r ./* /Users/yepz/yepzhiweb/richmondai/
cd /Users/yepz/yepzhiweb && git add -A && git commit -m "RichmondAI: <what changed>" && git push
```
Also commit in the RichmondAI repo itself (`git add -A && git commit`).
Cache: after deploy, hard-refresh; there is no asset hashing, so consider a `?v=` query on script/css tags.

---

## 10. Related projects in the owner’s workspace (context only)

- `/Users/yepz/stemOS` — visual inspiration for the homepage design.
- `/Users/yepz/JSweb` — feature/layout inspiration (its index lists what the product is about).
- `/Users/yepz/yzai` — local AI client; hosts the Mini PC Piper TTS used in T6; Cloudflare Pages + Tunnel.
- `/Users/yepz/yepzhiweb` — the actual deploy target (yepzhi.com), also hosts the help portal.

---

## 11. Quick-start checklist for a new AI agent

1. Read §2 (constraints) and §6 (status).
2. `grep -n "GENERATORS\|BACKEND_CONFIG\|class " app.js` to orient.
3. Pick the next task from §7 (T1/T2 need no credentials; T3/T4/T5 need owner go-ahead).
4. Make the change, run `node --check app.js`, test in a browser (light mode only!).
5. Update this file (status, decisions log), commit, and deploy per §9.
