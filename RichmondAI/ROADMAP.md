# RichmondAI — 50-Phase Master Project Roadmap & Architecture

This document outlines the complete 50-phase implementation plan for **RichmondAI**, the premier AI instructional material generator for English Language Teaching (ELT) and English for Specific Purposes (ESP).

---

## 50-Phase Implementation Matrix

### Block I: Architectural Foundation & Design System (Phases 1–10)
- [x] **Phase 1: Project Initialization & Git Version Control** — Repository creation on branch `main`, initial structure, license, and `.gitignore`.
- [ ] **Phase 2: Semantic HTML5 Scaffold** — Dual-pane generator studio with accessible semantic landmarks, dialog elements, and viewport optimization.
- [ ] **Phase 3: Cyber-Aurora Design System** — CSS custom property tokens for Neon Pink (`#ec4899`, `#f43f5e`), Electric Blue (`#38bdf8`, `#6366f1`), Gold (`#f59e0b`, `#fbbf24`), and deep space obsidian (`#060d24`, `#030712`).
- [ ] **Phase 4: stemOS Glassmorphism Tokens** — Frosted glass backdrops (`backdrop-filter: blur(16px)`), luminous borders, and ambient box-shadow elevations.
- [ ] **Phase 5: Interactive Aurora Canvas (`aurora.js`)** — Canvas-based dynamic background with smooth orbiting gradient orbs and mouse-reactive interactive dot mesh.
- [ ] **Phase 6: Vertical Rail Sidebar Component** — Collapsible icon rail with tooltips, view triggers (Studio, Generators, Cartridges, History, Pricing, Settings), and brand crest.
- [ ] **Phase 7: Floating Top Glass Island Header** — Header bar with user profile greeting, CEFR quick badge, active generator indicator, and daily quota pill.
- [ ] **Phase 8: Generator Workspace Dual-Pane Grid** — Left: Configuration input panel with differentiation controls; Right: Output canvas with live preview and action bar.
- [ ] **Phase 9: Typography & Iconography Integration** — Google Fonts (`Plus Jakarta Sans`, `Inter`, `Outfit`, `JetBrains Mono`) and FontAwesome 6 icons.
- [ ] **Phase 10: Responsive Layout & Mobile Drawer** — Breakpoint engine ensuring flawless execution on desktop, iPad, tablet, and mobile browsers.

### Block II: Authentication, User Profiles & Quota Management (Phases 11–16)
- [ ] **Phase 11: Registered User Gating Engine** — Access restricted exclusively to authenticated users; unauthorized clicks trigger the registration flow.
- [ ] **Phase 12: Auth Modal & Form State** — Tabbed Sign In / Register dialog with form validation, remember me, and demo teacher profile.
- [ ] **Phase 13: User Session Persistence** — Browser LocalStorage persistence for user profile data (`name`, `email`, `role`, `tier`, `country`, `school`).
- [ ] **Phase 14: Daily Generation Counter & Meter** — Real-time quota tracker (15/day for Free Tier, 150/day for Pro) with visual progress bar.
- [ ] **Phase 15: UTC Midnight Auto-Reset Timer** — Countdown indicator computing the exact hours/minutes until the next daily quota renewal.
- [ ] **Phase 16: Tier Upgrade Gating Logic** — Soft-limit upgrade notification modal when the daily free quota is exhausted.

### Block III: Gemini Flash 2.5/1.5 AI Core Engine (Phases 17–22)
- [ ] **Phase 17: Gemini Flash Client Connector** — Direct REST API integration with Google Gemini Flash (`gemini-2.5-flash` / `gemini-1.5-flash`).
- [ ] **Phase 18: API Key Configuration Modal** — Teacher BYOK (Bring-Your-Own-Key) modal allowing educators to input their personal Gemini API key for zero-cost generations.
- [ ] **Phase 19: Offline/Demo Fallback Mock Engine** — Rich, pedagogically authentic ELT/ESP generation simulator for instant preview when no API key is provided.
- [ ] **Phase 20: System Instructions & CEFR Calibration** — Specialized prompt templates embedding CEFR vocabulary limits, grammatical patterns, and ESP contexts.
- [ ] **Phase 21: Streaming / Chunked Generation Visualizer** — Shimmer skeleton loaders, cyber-aurora glow indicators, and live typing animations.
- [ ] **Phase 22: Error Handling & Resilience** — Graceful handling of network timeouts, JSON parsing errors, and Gemini quota exhaustion.

### Block IV: Universal Differentiation Controls (Phases 23–27)
- [ ] **Phase 23: Language & Target Country Selector** — Language localization (English UK, English US, Spanish, French) and cultural target settings.
- [ ] **Phase 24: CEFR Level Dial** — Interactive selector for Pre-A1, A1, A2, B1, B2, C1, C2 with real-time level descriptors.
- [ ] **Phase 25: Pedagogical Difficulty Slider** — 5-step calibrator (Very Easy, Easy, Standard, Quite Difficult, Advanced).
- [ ] **Phase 26: Learner Profile Module** — Customizable inputs for student age, vocational interests, and regional context (e.g. *Adult 18-21 years Atlixco Puebla*).
- [ ] **Phase 27: SEND / Neurodiversity Checklist** — Multi-select pills for Dyslexia, ADHD, ASD, Speech & Language, Visual, and Emotional Needs.

### Block V: Core General ELT Generators (Phases 28–34)
- [ ] **Phase 28: Multiple Choice Question (MCQ) Generator** — Leveled quizzes with question counts, distractor rationales, and separate answer keys.
- [ ] **Phase 29: Cut-out Flash Cards Generator** — Front/back vocabulary cards with IPA phonetics, definitions, CEFR tags, and example sentences.
- [ ] **Phase 30: Interactive Learning Activities Generator** — Warmers, communicative drills, pair-work, information-gap tasks, and roleplays.
- [ ] **Phase 31: Inspiration & Hook Generator** — High-engagement lesson hooks designed to captivate reluctant learners.
- [ ] **Phase 32: Classroom Questions (Bloom's Taxonomy)** — Questions structured across Remembering, Understanding, Applying, Analyzing, Evaluating, Creating.
- [ ] **Phase 33: Very Short Answers & Quick-Check Quizzer** — Rapid retrieval 1-word or short-phrase comprehension verification.
- [ ] **Phase 34: Discussion Topics & Debate Motions** — Engaging speaking prompts with target functional exponents.

### Block VI: Specialized ESP & Technical English Modules (Phases 35–40)
- [ ] **Phase 35: ESP Engineering & Advanced Manufacturing** — Technical English for shop floors, schematics, safety protocols, and automotive trades.
- [ ] **Phase 36: ESP Healthcare & Nursing** — Triage dialogue, bedside empathy, patient intake notes, and medical acronyms.
- [ ] **Phase 37: ESP Computing, AI & Software Engineering** — Standup meeting vocabulary, bug triage, code review discussions, and API documentation.
- [ ] **Phase 38: ESP Aviation & Aerodrome Communication** — ICAO standard phraseology, pilot-ATC exchanges, emergency briefings.
- [ ] **Phase 39: ESP Business & Executive English** — Pitch decks, contract negotiations, financial reviews, and formal correspondence.
- [ ] **Phase 40: ESP Tourism & Hospitality** — Concierge roleplays, guest dispute resolution, menu culinary descriptions.

### Block VII: Multimodal, Media & Text Adaptation Engines (Phases 41–44)
- [ ] **Phase 41: YouTube Transcript & Video Content Generator** — YouTube video link parser generating quizzes, vocabulary glossaries, and cloze tasks.
- [ ] **Phase 42: Text Summariser & CEFR Leveler** — Tool to simplify or elevate authentic text up or down the CEFR scale while preserving core meaning.
- [ ] **Phase 43: Feedback & Essay Grading Assistant** — Formative/summative essay evaluation against CEFR rubrics with actionable feedback.
- [ ] **Phase 44: Image-Based Classroom Task Builder** — Transforms image descriptions or themes into CEFR-calibrated tasks.

### Block VIII: Export Pipeline, Cut-out Flashcards & Cartridges (Phases 45–48)
- [ ] **Phase 45: Printable Cut-Out Flashcard Grid** — Perforated CSS print stylesheet rendering 4x2 cut-out flashcard sheets ready for scissors.
- [ ] **Phase 46: Student Quiz & Teacher Answer Key Layout** — Dual-view print layout (clean student worksheet + separated teacher answer key).
- [ ] **Phase 47: DOCX & Markdown Export Engine** — Instant local file generation downloading structured `.docx` or formatted `.md`.
- [ ] **Phase 48: Course Cartridge System** — Save custom course/class profiles (*"Puebla Automotive B1"*) to inject into any generator with 1 click.

### Block IX: Pricing, History Library & Production Launch (Phases 49–50)
- [ ] **Phase 49: Interactive Pricing Modal** — Currency switcher (£ GBP, $ USD, € EUR) showcasing Free ($0), Pro ($29/yr - 70% off), and Institutional tiers.
- [ ] **Phase 50: Production Build, Testing, Git Commit & Deployment Verification** — End-to-end testing, accessibility pass, Git commit with full changelog, and readiness for `yepzhi.com/RichmondAI`.
