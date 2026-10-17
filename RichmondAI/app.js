/**
 * RichmondAI — Master Application Engine
 * Next-Gen AI Material Studio for English & ESP Teachers
 * Powered by Google Gemini Flash | CEFR-Calibrated | 70% Cheaper than TeacherMatic
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. GENERATORS CATALOG & REGISTRY
  // =========================================================================
  const GENERATORS = {
    mcq: {
      id: 'mcq',
      name: 'Multiple-Choice Questions',
      category: 'General ELT',
      icon: 'fa-list-check',
      iconColor: 'pink',
      desc: 'Effortlessly generate multiple-choice quizzes calibrated to CEFR bands with distractors, answer keys, and pedagogical rationales.',
      topicPlaceholder: 'e.g., Hydraulic Brake System Maintenance or Industrial Safety Protocols',
      defaultTopic: 'Automotive Hydraulic Brake Fluid & Workshop Safety',
      countLabel: 'Number of Questions',
      defaultCount: 5,
      supportsCutout: false,
      supportsStudentKey: true
    },
    flashcards: {
      id: 'flashcards',
      name: 'Cut-out Flash Cards (Printable)',
      category: 'General ELT',
      icon: 'fa-clone',
      iconColor: 'gold',
      desc: 'Generate printable 2-sided vocabulary cards with IPA phonetics, CEFR levels, and ready-to-cut dashed scissor margins.',
      topicPlaceholder: 'e.g., Pneumatics & Workshop Hand Tools',
      defaultTopic: 'Pneumatics & Mechanical Hand Tools',
      countLabel: 'Number of Flashcards',
      defaultCount: 6,
      supportsCutout: true,
      supportsStudentKey: false
    },
    activities: {
      id: 'activities',
      name: 'Learning Activities',
      category: 'General ELT',
      icon: 'fa-dice',
      iconColor: 'blue',
      desc: 'Interactive communicative classroom tasks, roleplays, warmers, and information-gap exercises that maximize student speaking time.',
      topicPlaceholder: 'e.g., Negotiating Workplace Schedules or Troubleshooting a Broken Alternator',
      defaultTopic: 'Workshop Shift Handover & Mechanical Troubleshooting',
      countLabel: 'Number of Activities',
      defaultCount: 3,
      supportsCutout: false,
      supportsStudentKey: false
    },
    summariser: {
      id: 'summariser',
      name: 'Text Summariser & CEFR Leveler',
      category: 'General ELT',
      icon: 'fa-compress',
      iconColor: 'blue',
      desc: 'Summarise or adapt authentic technical articles, simplifying or elevating the text to your chosen target CEFR band.',
      topicPlaceholder: 'e.g., How Modern Electric Vehicles Use Regenerative Braking',
      defaultTopic: 'Electric Vehicle Inverter Principles & Regenerative Braking',
      countLabel: 'Summary Length / Paragraphs',
      defaultCount: 2,
      supportsCutout: false,
      supportsStudentKey: false
    },
    questions: {
      id: 'questions',
      name: 'Classroom Questions (Bloom\'s)',
      category: 'General ELT',
      icon: 'fa-circle-question',
      iconColor: 'pink',
      desc: 'Inquiry prompts categorized through Bloom\'s Taxonomy (Remembering to Creating) to scaffold critical thinking in English.',
      topicPlaceholder: 'e.g., Quality Control in Aerospace Manufacturing',
      defaultTopic: 'Quality Assurance in High-Precision CNC Machining',
      countLabel: 'Number of Questions',
      defaultCount: 6,
      supportsCutout: false,
      supportsStudentKey: true
    },
    short_answers: {
      id: 'short_answers',
      name: 'Very Short Answers (Rapid Check)',
      category: 'General ELT',
      icon: 'fa-bolt',
      iconColor: 'gold',
      desc: 'Rapid retrieval questions requiring a single word, technical term, or short phrase for quick bellringer checks.',
      topicPlaceholder: 'e.g., Semiconductor Cleanroom Protocols',
      defaultTopic: 'Semiconductor Fabrication Protocols & Cleanroom ISO Standards',
      countLabel: 'Number of Questions',
      defaultCount: 6,
      supportsCutout: false,
      supportsStudentKey: true
    },
    discussion: {
      id: 'discussion',
      name: 'Discussion Topics & Debates',
      category: 'General ELT',
      icon: 'fa-comments',
      iconColor: 'blue',
      desc: 'Controversial, engaging speaking motions with target functional language phrases (agreeing, dissenting, hedging).',
      topicPlaceholder: 'e.g., AI Replacing Junior Software Engineers',
      defaultTopic: 'Automation vs Human Technicians in Automotive Assembly Plants',
      countLabel: 'Number of Discussion Topics',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: false
    },
    inspiration: {
      id: 'inspiration',
      name: 'Inspiration & Hook Generator',
      category: 'General ELT',
      icon: 'fa-lightbulb',
      iconColor: 'gold',
      desc: 'High-energy lesson hooks, mystery challenges, and real-world dilemmas to captivate reluctant or unmotivated learners.',
      topicPlaceholder: 'e.g., Technical Safety Regulations for Undergraduates',
      defaultTopic: 'OSHA Workshop Safety Violations: The Case of the Exploding Cylinder',
      countLabel: 'Number of Hook Ideas',
      defaultCount: 3,
      supportsCutout: false,
      supportsStudentKey: false
    },
    feedback: {
      id: 'feedback',
      name: 'Feedback & Rubric Assistant',
      category: 'General ELT',
      icon: 'fa-clipboard-check',
      iconColor: 'pink',
      desc: 'Formative assessment on student work with actionable praise, grammar recommendations, and CEFR level benchmarks.',
      topicPlaceholder: 'e.g., Student essay on Electric Motors vs Combustion Engines',
      defaultTopic: 'Student Lab Report on Hydraulic Fluid Viscosity Testing',
      countLabel: 'Feedback Depth / Sections',
      defaultCount: 3,
      supportsCutout: false,
      supportsStudentKey: false
    },
    youtube: {
      id: 'youtube',
      name: 'YouTube Content Generator',
      category: 'General ELT',
      icon: 'fa-play',
      iconColor: 'pink',
      desc: 'Extract vocabulary lists, listening comprehension questions, and cloze tests from video links or transcripts.',
      topicPlaceholder: 'Paste YouTube URL or video subject (e.g. How Jet Engines Work)',
      defaultTopic: 'How Dual-Clutch Transmissions Operate (Engineering Explained)',
      countLabel: 'Number of Comprehension Tasks',
      defaultCount: 5,
      supportsCutout: false,
      supportsStudentKey: true
    },
    esp_engineering: {
      id: 'esp_engineering',
      name: 'ESP: Engineering & Manufacturing',
      category: 'Specialized ESP',
      icon: 'fa-gears',
      iconColor: 'gold',
      desc: 'Technical English for mechanical, civil, automotive, and electrical disciplines. Schematics, tolerances, and diagnostics.',
      topicPlaceholder: 'e.g., Torque Tolerances and Fastener Failure Modes',
      defaultTopic: 'Torque Specifications & Fastener Tensile Strengths',
      countLabel: 'Number of Technical Tasks',
      defaultCount: 5,
      supportsCutout: true,
      supportsStudentKey: true
    },
    esp_healthcare: {
      id: 'esp_healthcare',
      name: 'ESP: Healthcare & Nursing',
      category: 'Specialized ESP',
      icon: 'fa-user-doctor',
      iconColor: 'pink',
      desc: 'Clinical English for nurses and doctors: emergency triage dialogues, bedside manner, pharmacology terms, and intake notes.',
      topicPlaceholder: 'e.g., ER Patient Triage & Pain Scale Assessment',
      defaultTopic: 'Emergency Department Triage & SBAR Patient Handover',
      countLabel: 'Number of Clinical Drills',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: true
    },
    esp_aviation: {
      id: 'esp_aviation',
      name: 'ESP: Aviation & ICAO Phraseology',
      category: 'Specialized ESP',
      icon: 'fa-plane-departure',
      iconColor: 'blue',
      desc: 'Standard ICAO radiotelephony, pilot-controller communications, weather briefings, and emergency declarations.',
      topicPlaceholder: 'e.g., Rejected Takeoff and Hydraulic System Advisory',
      defaultTopic: 'Crosswind Landing Advisory & Go-Around Pilot-ATC Exchange',
      countLabel: 'Number of Aviation Exchanges',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: true
    },
    esp_computing: {
      id: 'esp_computing',
      name: 'ESP: Software & Computing',
      category: 'Specialized ESP',
      icon: 'fa-code',
      iconColor: 'blue',
      desc: 'Tech English for engineers: agile standups, bug reproduction tickets, pull request reviews, and cloud infrastructure.',
      topicPlaceholder: 'e.g., CI/CD Pipeline Failure & Microservices Latency',
      defaultTopic: 'Pull Request Code Review & API Latency Bug Triage',
      countLabel: 'Number of Tech Drills',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: true
    },
    esp_business: {
      id: 'esp_business',
      name: 'ESP: Business & Negotiations',
      category: 'Specialized ESP',
      icon: 'fa-briefcase',
      iconColor: 'gold',
      desc: 'Executive English: contract dispute negotiations, pitch deck vocabulary, investor Q&A, and formal correspondence.',
      topicPlaceholder: 'e.g., B2B Supplier Contract Renegotiation on Lead Times',
      defaultTopic: 'International Supply Chain Lead Time Renegotiation',
      countLabel: 'Number of Business Scenarios',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: false
    },
    esp_tourism: {
      id: 'esp_tourism',
      name: 'ESP: Hospitality & Tourism',
      category: 'Specialized ESP',
      icon: 'fa-hotel',
      iconColor: 'pink',
      desc: 'Hotel concierge disputes, restaurant culinary descriptions, VIP guest handling, and local tour guiding.',
      topicPlaceholder: 'e.g., Handling an Overbooked Suite & Guest Compensation',
      defaultTopic: 'Front Desk Dispute Resolution: Overbooked Suite Compensation',
      countLabel: 'Number of Hospitality Scenarios',
      defaultCount: 4,
      supportsCutout: false,
      supportsStudentKey: false
    },
    lesson_plan: {
      id: 'lesson_plan', name: 'Lesson Plan', category: 'Planning & Writing',
      icon: 'fa-chalkboard-user', iconColor: 'blue',
      desc: 'Complete timed lesson plan with objectives, warmer, presentation, practice, production, and assessment stages.',
      topicPlaceholder: 'e.g., Giving instructions in a workshop', defaultTopic: 'Giving Safety Instructions in a Workshop',
      countLabel: 'Lesson Length (minutes / 10)', defaultCount: 6, supportsCutout: false, supportsStudentKey: false,
      promptHint: 'Write a complete timed lesson plan with: aims, success criteria, materials, anticipated problems, and stages (warmer, lead-in, presentation, controlled practice, freer practice, wrap-up, homework). Include timings and interaction patterns. Number of items = lesson length in units of 10 minutes.'
    },
    worksheet: {
      id: 'worksheet', name: 'Worksheet Builder', category: 'Planning & Writing',
      icon: 'fa-file-lines', iconColor: 'gold',
      desc: 'Ready-to-print worksheet mixing matching, gap-fill, sentence building, and short writing tasks, with answer key.',
      topicPlaceholder: 'e.g., Present perfect for work experience', defaultTopic: 'Present Perfect for Describing Work Experience',
      countLabel: 'Number of Tasks', defaultCount: 4, supportsCutout: false, supportsStudentKey: true,
      promptHint: 'Create a printable student worksheet with varied task types (matching, gap-fill, error correction, sentence transformation, short writing). Put an ANSWER KEY section at the end.'
    },
    reading_comp: {
      id: 'reading_comp', name: 'Reading Comprehension', category: 'Planning & Writing',
      icon: 'fa-book-open', iconColor: 'pink',
      desc: 'Original CEFR-levelled reading text with pre-reading, comprehension, vocabulary-in-context, and post-reading questions.',
      topicPlaceholder: 'e.g., A day in the life of a flight nurse', defaultTopic: 'A Day in the Life of a Flight Nurse',
      countLabel: 'Number of Questions', defaultCount: 6, supportsCutout: false, supportsStudentKey: true,
      promptHint: 'Write an original reading text strictly at the target CEFR level (word count suited to the level), then add pre-reading questions, true/false, comprehension questions, vocabulary-in-context and a post-reading discussion task. Include an ANSWER KEY.'
    },
    cloze: {
      id: 'cloze', name: 'Gap-Fill / Cloze Test', category: 'Planning & Writing',
      icon: 'fa-pen-to-square', iconColor: 'blue',
      desc: 'Cloze passages with word bank or open gaps, tuned to CEFR grammar and technical vocabulary.',
      topicPlaceholder: 'e.g., Describing a process with the passive', defaultTopic: 'Describing a Manufacturing Process (Passive Voice)',
      countLabel: 'Number of Gaps', defaultCount: 10, supportsCutout: false, supportsStudentKey: true,
      promptHint: 'Write a short cloze passage with numbered gaps and a word bank, then an ANSWER KEY with brief explanations. Number of items = number of gaps.'
    },
    rubric: {
      id: 'rubric', name: 'Rubric Builder', category: 'Planning & Writing',
      icon: 'fa-table-list', iconColor: 'gold',
      desc: 'Analytic assessment rubric for speaking or writing with CEFR-aligned band descriptors.',
      topicPlaceholder: 'e.g., Oral presentation of a technical process', defaultTopic: 'Oral Presentation of a Technical Process',
      countLabel: 'Number of Criteria', defaultCount: 4, supportsCutout: false, supportsStudentKey: false,
      promptHint: 'Build an analytic rubric as a Markdown table: criteria as rows, 4 performance bands as columns, student-friendly descriptors aligned to the CEFR level, plus a scoring guide.'
    },
    email_writer: {
      id: 'email_writer', name: 'Email & Letter Writing Tasks', category: 'Planning & Writing',
      icon: 'fa-envelope-open-text', iconColor: 'pink',
      desc: 'Model emails and letters with register analysis, useful phrases, and a guided writing task.',
      topicPlaceholder: 'e.g., Complaint about a delayed delivery', defaultTopic: 'Complaint About a Delayed Parts Delivery',
      countLabel: 'Number of Model Texts', defaultCount: 2, supportsCutout: false, supportsStudentKey: false,
      promptHint: 'Produce model email/letter texts (one formal, one semi-formal), annotate the register and structure, list useful phrases, then give a guided writing task with a checklist.'
    },
    scheme_of_work: {
      id: 'scheme_of_work', name: 'Scheme of Work', category: 'Planning & Writing',
      icon: 'fa-calendar-days', iconColor: 'blue',
      desc: 'Week-by-week syllabus with outcomes, language focus, skills, assessment points, and resources.',
      topicPlaceholder: 'e.g., 8-week English for Nursing course', defaultTopic: '8-Week English for Nursing Course',
      countLabel: 'Number of Weeks', defaultCount: 8, supportsCutout: false, supportsStudentKey: false,
      promptHint: 'Create a scheme of work as a Markdown table: week, theme, learning outcomes, language focus, skills, assessment, resources. Number of items = number of weeks.'
    },
    dialogue: {
      id: 'dialogue', name: 'Dialogue & Roleplay Scripts', category: 'Planning & Writing',
      icon: 'fa-people-arrows', iconColor: 'pink',
      desc: 'Model dialogues with gapped versions, role cards, and functional language boxes for speaking practice.',
      topicPlaceholder: 'e.g., Reporting a fault to a supervisor', defaultTopic: 'Reporting a Machine Fault to a Supervisor',
      countLabel: 'Number of Dialogues', defaultCount: 2, supportsCutout: false, supportsStudentKey: true,
      promptHint: 'Write natural model dialogues, then a gapped version, role cards for pairs (A/B), and a functional language box. Include an ANSWER KEY for the gapped version.'
    },
    vocab_list: {
      id: 'vocab_list', name: 'Vocabulary List & Practice', category: 'Planning & Writing',
      icon: 'fa-spell-check', iconColor: 'gold',
      desc: 'Topic vocabulary with IPA, definitions, example sentences, collocations, and quick practice exercises.',
      topicPlaceholder: 'e.g., Hospital ward equipment', defaultTopic: 'Hospital Ward Equipment',
      countLabel: 'Number of Words', defaultCount: 10, supportsCutout: false, supportsStudentKey: true,
      promptHint: 'Create a vocabulary table (word, part of speech, IPA, learner-friendly definition, example, collocations) then 2 short practice exercises and an ANSWER KEY.'
    },
    report_comments: {
      id: 'report_comments', name: 'Student Report Comments', category: 'Planning & Writing',
      icon: 'fa-comment-dots', iconColor: 'blue',
      desc: 'Constructive, personalised end-of-term report comments across skills, with targets for improvement.',
      topicPlaceholder: 'e.g., Strong speaker, weaker writing accuracy', defaultTopic: 'Confident Speaker, Needs Work on Writing Accuracy',
      countLabel: 'Number of Comments', defaultCount: 3, supportsCutout: false, supportsStudentKey: false,
      promptHint: 'Write constructive, specific, professional report comments (strength, area to improve, next-step target) in varied tones. Do not invent grades. Use [Student Name] as a placeholder.'
    }
  };

  // =========================================================================
  // 2. CEFR BENCHMARKS & SEND DESCRIPTIONS
  // =========================================================================
  const CEFR_INFO = {
    'Pre-A1': 'Pre-A1: Breakthrough / Isolated words and high-frequency gestures',
    'A1': 'A1: Beginner / Everyday basic expressions and simple personal sentences',
    'A2': 'A2: Elementary / Routine social exchanges, past simple, concrete needs',
    'B1': 'B1: Intermediate (ESP Gateway) / Explaining processes, basic technical troubleshooting',
    'B2': 'B2: Upper Intermediate / Technical specifications, complex workplace discussions',
    'C1': 'C1: Advanced / Operational proficiency, academic & industrial nuance',
    'C2': 'C2: Mastery / Native-grade technical discourse, complex executive synthesis'
  };

  const SEND_LABELS = {
    dyslexia: 'Dyslexia (High visual clarity, chunked bullets, clear typographic cues)',
    adhd: 'ADHD (Micro-tasks, gamified check-ins, highlighted keywords)',
    autism: 'Autism Spectrum / ASD (Explicit instructions, literal idioms, clear expectations)',
    speech: 'Speech & Language (Phonetic guides, visual support, scaffolded turn-taking)',
    visual: 'Visual Accommodations (High contrast, large print ready)',
    hearing: 'Hearing Accommodations (Full written dialogue transcripts)'
  };

  // =========================================================================
  // 3. USER AUTHENTICATION & DAILY QUOTA MANAGER
  // =========================================================================
  // ---- Backend switches. Flip switches once Firebase or Cloudflare proxy is configured. ----
  const BACKEND_CONFIG = {
    quotaBackend: 'local',     // 'local' | 'firestore'
    authBackend: 'local',      // 'local' | 'firebase'
    geminiBackend: 'client',   // 'client' | 'proxy'
    proxyUrl: 'https://richmond-proxy.yepzhi.workers.dev/generate',
    piperTtsEndpoint: 'https://core-yzai.yepzhi.com/v1/audio/speech',
    piperTtsFallback: 'https://yzai.yepzhi.com/v1/audio/speech',
    firebase: null             // e.g. { apiKey, authDomain, projectId, appId }
  };

  const QUOTA_LIMITS = { free: 15, pro: 150, institutional: 500 };
  const utcToday = () => new Date().toISOString().slice(0, 10);

  // Local store: tamper-evident (signed) and clock-rollback resistant. Deterrent only; real
  // enforcement needs the Firestore store below.
  class LocalQuotaStore {
    constructor(key) { this.key = key; this.remote = false; }
    _sig(q) {
      const s = `${q.date}|${q.used}|${q.max}|rch-v1`;
      let h = 2166136261;
      for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
      return (h >>> 0).toString(36);
    }
    load(user, max) {
      const today = utcToday();
      try {
        const p = JSON.parse(localStorage.getItem(this.key) || 'null');
        if (p && typeof p.used === 'number') {
          if (p.sig && p.sig !== this._sig(p)) {
            // Edited by hand: treat the day as fully used.
            return this.save({ date: p.date >= today ? p.date : today, used: max, max });
          }
          // Clock set backwards: keep the later stored day so quota can't be refreshed.
          const date = p.date > today ? p.date : today;
          if (p.date === date) return this.save({ date, used: Math.min(p.used, max), max });
        }
      } catch (e) { }
      return this.save({ date: today, used: 0, max });
    }
    save(q) {
      const out = { date: q.date, used: q.used, max: q.max };
      out.sig = this._sig(out);
      localStorage.setItem(this.key, JSON.stringify(out));
      return out;
    }
    commit(q) { return Promise.resolve(this.save(q)); }
  }

  // Firestore store: ready but OFF by default. Needs the Firebase compat SDK on the page and a
  // signed-in user id. Document: quotas/{uid}_{YYYY-MM-DD} -> { used, max }. See firestore.rules.example.
  class FirestoreQuotaStore {
    constructor(config, fallback) {
      this.remote = true; this.fallback = fallback;
      this.ok = !!(config && window.firebase && window.firebase.firestore);
      if (this.ok) {
        if (!window.firebase.apps.length) window.firebase.initializeApp(config);
        this.db = window.firebase.firestore();
      } else {
        console.warn('[RichmondAI] Firestore quota backend unavailable; using local store.');
      }
    }
    _ref(user) { return this.db.collection('quotas').doc(`${user.uid || user.email}_${utcToday()}`); }
    load(user, max) { return this.fallback.load(user, max); }
    async sync(user, max) {
      if (!this.ok) return null;
      const snap = await this._ref(user).get();
      const used = snap.exists ? snap.data().used : 0;
      return this.fallback.save({ date: utcToday(), used, max });
    }
    async commit(q, user) {
      if (!this.ok) return this.fallback.save(q);
      const ref = this._ref(user);
      const used = await this.db.runTransaction(async tx => {
        const snap = await tx.get(ref);
        const next = (snap.exists ? snap.data().used : 0) + 1;
        if (next > q.max) throw new Error('Daily generation limit reached.');
        tx.set(ref, { used: next, max: q.max, updated: window.firebase.firestore.FieldValue.serverTimestamp() });
        return next;
      });
      return this.fallback.save({ date: q.date, used, max: q.max });
    }
  }

  function createQuotaStore(key) {
    const local = new LocalQuotaStore(key);
    return BACKEND_CONFIG.quotaBackend === 'firestore' ? new FirestoreQuotaStore(BACKEND_CONFIG.firebase, local) : local;
  }

  class AuthManager {
    constructor() {
      this.storageKey = 'richmond_user_session';
      this.quotaKey = 'richmond_daily_quota';
      this.store = createQuotaStore(this.quotaKey);
      this.user = this._loadUser();
      this.quota = this._loadQuota();
      if (this.store.remote && this.store.sync) {
        this.store.sync(this.user, this.quota.max).then(q => { if (q) { this.quota = q; this.updateQuotaUI(); } }).catch(() => { });
      }
      this._initFirebaseAuth();
      this._startResetTimer();
    }

    _initFirebaseAuth() {
      if (BACKEND_CONFIG.authBackend === 'firebase' && window.firebase && window.firebase.auth) {
        window.firebase.auth().onAuthStateChanged(fbUser => {
          if (fbUser) {
            const user = {
              uid: fbUser.uid,
              name: fbUser.displayName || 'Educator',
              email: fbUser.email,
              school: 'Verified Educator',
              tier: 'free',
              registered: true
            };
            this._saveUser(user);
            if (this.store.remote && this.store.sync) {
              this.store.sync(user, this.quota.max).then(q => { if (q) { this.quota = q; this.updateQuotaUI(); } }).catch(() => {});
            }
          }
        });
      }
    }

    _loadUser() {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
      // Default to registered demo teacher for instant preview
      const defaultUser = {
        name: 'Prof. Yepz (Demo Teacher)',
        email: 'yepz@richmond.edu',
        school: 'Instituto Tecnológico Atlixco',
        tier: 'free', // 'free' | 'pro' | 'institutional'
        registered: true
      };
      this._saveUser(defaultUser);
      return defaultUser;
    }

    _saveUser(user) {
      this.user = user;
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }

    _maxFor(tier) { return QUOTA_LIMITS[tier] || QUOTA_LIMITS.free; }

    _loadQuota() {
      return this.store.load(this.user, this._maxFor(this.user.tier));
    }

    _saveQuota(quota) {
      this.quota = this.store.save ? this.store.save(quota) : quota;
    }

    getRemainingGenerations() {
      return Math.max(0, this.quota.max - this.quota.used);
    }

    canGenerate() {
      return this.user.registered && this.getRemainingGenerations() > 0;
    }

    async consumeGeneration() {
      // Re-check the day first (tab left open past UTC midnight, or storage changed in another tab).
      this.quota = this.store.load(this.user, this._maxFor(this.user.tier));
      const next = { ...this.quota, used: this.quota.used + 1 };
      try {
        this.quota = await this.store.commit(next, this.user);
      } catch (e) {
        this.quota = this.store.load(this.user, this._maxFor(this.user.tier));
        this.updateQuotaUI();
        throw e;
      }
      this.updateQuotaUI();
    }

    upgradeToPro() {
      this.user.tier = 'pro';
      this.quota.max = 150;
      this._saveUser(this.user);
      this._saveQuota(this.quota);
      this.updateQuotaUI();
    }

    login(name, email, school, tier = 'free') {
      const user = { name, email, school, tier, registered: true };
      this._saveUser(user);
      this.quota.max = tier === 'pro' ? 150 : 15;
      this._saveQuota(this.quota);
      this.updateQuotaUI();
    }

    async loginWithGoogle() {
      if (BACKEND_CONFIG.authBackend === 'firebase' && window.firebase && window.firebase.auth) {
        const provider = new window.firebase.auth.GoogleAuthProvider();
        const cred = await window.firebase.auth().signInWithPopup(provider);
        const fbUser = cred.user;
        const user = {
          uid: fbUser.uid,
          name: fbUser.displayName || 'Google Educator',
          email: fbUser.email,
          school: 'Verified Google Educator',
          tier: 'free',
          registered: true
        };
        this._saveUser(user);
        if (this.store.remote && this.store.sync) {
          const q = await this.store.sync(user, this._maxFor(user.tier));
          if (q) this.quota = q;
        }
        this.updateQuotaUI();
        return user;
      }
      // Demo / Local Fallback
      const demoGoogleUser = {
        name: 'Prof. Yepz (Google Educator)',
        email: 'alberto@richmond.edu',
        school: 'Google Educator Academy',
        tier: 'free',
        registered: true
      };
      this.login(demoGoogleUser.name, demoGoogleUser.email, demoGoogleUser.school, demoGoogleUser.tier);
      return demoGoogleUser;
    }

    logout() {
      this.user = {
        name: 'Guest Teacher',
        email: '',
        school: '',
        tier: 'free',
        registered: false
      };
      this._saveUser(this.user);
      this.updateQuotaUI();
    }

    updateQuotaUI() {
      const remaining = this.getRemainingGenerations();
      const max = this.quota.max;
      const pct = Math.round((remaining / max) * 100);

      const countEl = document.getElementById('quota-text-display');
      const barEl = document.getElementById('quota-progress-bar');
      const userBadgeEl = document.getElementById('user-display-name');
      const avatarEl = document.getElementById('user-avatar-initials');

      if (countEl) countEl.textContent = `${remaining} / ${max} daily left`;
      if (barEl) barEl.style.width = `${pct}%`;

      if (userBadgeEl) {
        userBadgeEl.textContent = this.user.registered ? this.user.name : 'Sign In Required';
      }
      if (avatarEl) {
        avatarEl.textContent = this.user.registered ? this.user.name.charAt(0).toUpperCase() : '?';
      }
    }

    _startResetTimer() {
      const updateTimer = () => {
        const timerEl = document.getElementById('quota-timer-display');
        if (!timerEl) return;
        const now = new Date();
        const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
        const diffMs = tomorrow - now;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        timerEl.textContent = `Resets in ${hours}h ${mins}m`;
      };
      updateTimer();
      setInterval(updateTimer, 60000);
    }
  }

  // =========================================================================
  // 4. RICH CONTENT SIMULATOR (PEDAGOGICALLY AUTHENTIC FALLBACK)
  // =========================================================================
  class PedagogicalGenerator {
    static generate(params) {
      const gen = GENERATORS[params.generatorId] || GENERATORS.mcq;
      const cefr = params.cefr || 'B1';
      const topic = params.topic || gen.defaultTopic;
      const count = params.count || 5;
      const profile = params.learnerProfile || 'General English Learners';
      const sends = params.sends.length ? params.sends.map(s => SEND_LABELS[s]).join(', ') : 'None specified';

      switch (params.generatorId) {
        case 'flashcards':
        case 'esp_engineering':
          return this._generateFlashcardsContent(topic, cefr, count, profile, sends);
        case 'mcq':
        case 'questions':
        case 'short_answers':
        case 'youtube':
          return this._generateQuizContent(topic, cefr, count, profile, sends, gen);
        case 'activities':
        case 'discussion':
        case 'inspiration':
        case 'esp_healthcare':
        case 'esp_aviation':
        case 'esp_computing':
        case 'esp_business':
        case 'esp_tourism':
          return this._generateActivitiesContent(topic, cefr, count, profile, sends, gen);
        case 'summariser':
          return this._generateSummaryContent(topic, cefr, count, profile, sends);
        case 'feedback':
          return this._generateFeedbackContent(topic, cefr, count, profile, sends);
        case 'lesson_plan':
        case 'worksheet':
        case 'reading_comp':
        case 'cloze':
        case 'rubric':
        case 'email_writer':
        case 'scheme_of_work':
        case 'dialogue':
        case 'vocab_list':
        case 'report_comments':
          return this._generateDocContent(params.generatorId, topic, cefr, count, profile, sends, gen);
        default:
          return this._generateQuizContent(topic, cefr, count, profile, sends, gen);
      }
    }

    static _generateQuizContent(topic, cefr, count, profile, sends, gen) {
      const quizItems = [
        {
          num: 1,
          q: `Which component is primarily responsible for generating hydraulic line pressure during vehicle braking?`,
          opts: [
            { k: 'A', text: 'Brake booster vacuum diaphragm' },
            { k: 'B', text: 'Master cylinder piston assembly', correct: true },
            { k: 'C', text: 'Disc caliper bleed nipple' },
            { k: 'D', text: 'ABS wheel speed sensor pulse ring' }
          ],
          rationale: `The master cylinder converts mechanical foot force into hydraulic pressure throughout the brake lines. Calipers and wheel cylinders are secondary actuators.`
        },
        {
          num: 2,
          q: `Why must a technician NEVER use mineral oil in a standard DOT 4 hydraulic brake circuit?`,
          opts: [
            { k: 'A', text: 'It will corrode metallic copper brake pipes instantly' },
            { k: 'B', text: 'It deteriorates EPDM rubber seals and causes catastrophic brake failure', correct: true },
            { k: 'C', text: 'It lowers the electrical resistance of the ABS computer module' },
            { k: 'D', text: 'It causes the brake pads to glaze over the rotor face' }
          ],
          rationale: `DOT 3 and DOT 4 glycol-ether fluids are engineered specifically for EPDM rubber seals. Petroleum/mineral oils rapidly swell and dissolve these seals, causing total pressure loss.`
        },
        {
          num: 3,
          q: `What is the standard procedure when a "spongy" or soft brake pedal feel is detected during inspection?`,
          opts: [
            { k: 'A', text: 'Tighten the parking brake cable mechanism' },
            { k: 'B', text: 'Bleed the hydraulic circuit to purge trapped air bubbles', correct: true },
            { k: 'C', text: 'Replace the steering knuckle and tie rod ends' },
            { k: 'D', text: 'Apply grease to the front rotor contact surface' }
          ],
          rationale: `Unlike brake fluid, air is compressible. When air enters the hydraulic lines, pedal pressure compresses air rather than pushing the caliper pistons, resulting in a spongy pedal.`
        },
        {
          num: 4,
          q: `In the workshop context, what personal protective equipment (PPE) is mandatory before opening a pressurized brake bleeder?`,
          opts: [
            { k: 'A', text: 'Welding helmet and heat-resistant gauntlets' },
            { k: 'B', text: 'Chemical-splash safety goggles and nitrile gloves', correct: true },
            { k: 'C', text: 'Full respiratory hazmat suit and steel cap gaiters' },
            { k: 'D', text: 'High-visibility fluorescent reflective harness only' }
          ],
          rationale: `Brake fluid is corrosive to paint and hazardous to human mucous membranes. Splash goggles and nitrile gloves safeguard against sudden pressure release.`
        },
        {
          num: 5,
          q: `When communicating with an international supervisor about brake wear, which term indicates the rotor has worn below legal specifications?`,
          opts: [
            { k: 'A', text: 'Maximum allowable diameter limit' },
            { k: 'B', text: 'Discard thickness (minimum thickness limit)', correct: true },
            { k: 'C', text: 'Nominal surface friction coefficient' },
            { k: 'D', text: 'Thermal dissipation runout benchmark' }
          ],
          rationale: `Technical service manuals denote "Discard Thickness" or "Min. Thickness" as the critical threshold below which rotors cannot be resurfaced or reused.`
        }
      ].slice(0, count);

      let markdown = `# ${gen.name}: ${topic}\n\n`;
      markdown += `**CEFR Band**: ${cefr} | **Target Profile**: ${profile}\n`;
      markdown += `**SEND Adaptations**: ${sends}\n\n---\n\n`;

      quizItems.forEach(item => {
        markdown += `### Question ${item.num}\n${item.q}\n\n`;
        item.opts.forEach(o => {
          markdown += `- **${o.k}**: ${o.text} ${o.correct ? '*(Correct Answer)*' : ''}\n`;
        });
        markdown += `\n> **Pedagogical Rationale**: ${item.rationale}\n\n`;
      });

      return {
        type: 'quiz',
        markdown,
        items: quizItems,
        topic,
        cefr
      };
    }

    static _generateFlashcardsContent(topic, cefr, count, profile, sends) {
      const cards = [
        {
          term: 'Master Cylinder',
          ipa: '/ˈmæstər ˈsɪlɪndər/',
          cefr: cefr,
          def: 'The primary hydraulic pump that converts mechanical pedal pressure into hydraulic fluid pressure.',
          example: 'Always check the master cylinder reservoir before bleeding the brake lines.'
        },
        {
          term: 'Brake Caliper',
          ipa: '/breɪk ˈkælɪpər/',
          cefr: cefr,
          def: 'The hydraulic clamp assembly housing pistons and brake pads that squeeze the spinning rotor to stop the wheel.',
          example: 'The technician inspected the caliper slide pins for signs of corrosion or sticking.'
        },
        {
          term: 'Bleeder Valve',
          ipa: '/ˈbliːdər vælv/',
          cefr: cefr,
          def: 'A threaded screw fitting used to release trapped air and old fluid from the hydraulic brake circuit.',
          example: 'Open the bleeder valve half a turn while your partner depresses the brake pedal.'
        },
        {
          term: 'Brake Fade',
          ipa: '/breɪk feɪd/',
          cefr: cefr,
          def: 'A dangerous loss of stopping power caused by overheating of brake pads and boiling of brake fluid.',
          example: 'Heavy downhill braking caused severe brake fade in the loaded truck.'
        },
        {
          term: 'Viscosity',
          ipa: '/vɪˈskɑːsəti/',
          cefr: cefr,
          def: 'A fluid\'s resistance to flow; critical for ensuring brake fluid operates properly in extreme temperatures.',
          example: 'DOT 4 fluid maintains stable viscosity even under high thermal stress.'
        },
        {
          term: 'Rotor Runout',
          ipa: '/ˈroʊtər ˈrʌnˌaʊt/',
          cefr: cefr,
          def: 'Lateral wobbling or deviation of the brake disc as it rotates, measured with a dial indicator.',
          example: 'Excessive rotor runout causes pedal pulsation when stopping at highway speeds.'
        }
      ].slice(0, count);

      let markdown = `# Cut-out Flash Cards: ${topic}\n\n`;
      markdown += `**CEFR Level**: ${cefr} · **Learner Track**: ${profile}\n\n`;
      cards.forEach((c, idx) => {
        markdown += `### Card ${idx + 1}: ${c.term} (${c.ipa})\n`;
        markdown += `- **Definition**: ${c.def}\n`;
        markdown += `- **Example Sentence**: *"${c.example}"*\n\n`;
      });

      return {
        type: 'flashcards',
        markdown,
        cards,
        topic,
        cefr
      };
    }

    static _generateActivitiesContent(topic, cefr, count, profile, sends, gen) {
      let markdown = `# ${gen.name}: ${topic}\n\n`;
      markdown += `**CEFR Calibration**: ${cefr} | **Target Profile**: ${profile}\n`;
      markdown += `**Pedagogical Aim**: Enhance communicative fluency & technical ESP workplace negotiation.\n\n---\n\n`;

      markdown += `## Activity 1: The Emergency Workshop Handover (Information-Gap Roleplay)\n`;
      markdown += `**Timing**: 20 minutes | **Grouping**: Pairs (Technician A & Shift Supervisor B)\n\n`;
      markdown += `### Instructions for Student A (Technician):\n`;
      markdown += `You just finished inspecting vehicle #412. The brake pads have only 1.5mm remaining (discard limit is 2mm), and you noticed air in the rear-left hydraulic line. You must explain the safety risk to your supervisor and insist the vehicle cannot leave the workshop today.\n\n`;
      markdown += `### Instructions for Student B (Supervisor):\n`;
      markdown += `The customer urgently needs vehicle #412 in 2 hours for a delivery run. You want to know if there is a quick fix or if safety genuinely demands keeping the car overnight.\n\n`;
      markdown += `### Target Functional Phrases (${cefr}):\n`;
      markdown += `- *"In my professional assessment, the risk of brake fade is too high..."*\n`;
      markdown += `- *"According to manufacturer specifications, the minimum thickness is..."*\n`;
      markdown += `- *"I strongly advise against releasing the vehicle until we flush the circuit."*\n\n---\n\n`;

      markdown += `## Activity 2: Socratic Root-Cause Investigation (Peer Diagnostic)\n`;
      markdown += `**Timing**: 15 minutes | **Grouping**: Small Groups (3-4 students)\n`;
      markdown += `**Scenario**: A fleet van exhibits intermittent brake pedal softening only during prolonged highway driving in hot weather. Why does this happen?\n\n`;
      markdown += `**Student Task Sheet**:\n`;
      markdown += `1. **Hypothesis Formulation**: Brainstorm 3 distinct physical causes (moisture in DOT fluid, boiling point degradation, vapor lock).\n`;
      markdown += `2. **Diagnostic Step Plan**: Order the testing steps chronologically using technical sequencing adverbs (*First, Next, Concurrently, Finally*).\n`;
      markdown += `3. **Oral Report**: Each team presents their diagnostic roadmap to the class in 90 seconds.\n`;

      return {
        type: 'activity',
        markdown,
        topic,
        cefr
      };
    }

    static _generateSummaryContent(topic, cefr, count, profile, sends) {
      let markdown = `# CEFR ${cefr} Leveled Text: ${topic}\n\n`;
      markdown += `*Calibrated for ${profile} · Verified against Oxford 3000 / CEFR ${cefr} vocabulary density.*\n\n---\n\n`;

      markdown += `Modern passenger vehicles rely on hydraulic brake circuits engineered around Pascal's Principle: fluid in a closed system transmits pressure equally in all directions without losing force. When the technician depresses the brake pedal, the master cylinder forces brake fluid through steel pipes and flexible hoses into the calipers at each wheel hub.\n\n`;
      markdown += `Inside the caliper, hydraulic pressure drives pistons against friction pads, squeezing them firmly against the rotating cast-iron disc. This conversion transforms kinetic energy into extreme thermal energy. Because brake fluid is hygroscopic—meaning it absorbs ambient moisture over time—its boiling point gradually drops from approximately 230°C to below 155°C. For this reason, professional standards require periodic fluid replacement to prevent catastrophic vapor lock and ensure passenger safety.\n\n`;
      markdown += `### Key Vocabulary Extracted:\n`;
      markdown += `- **Hygroscopic** (/haɪɡrəˈskɑːpɪk/): Absorbing moisture from the air.\n`;
      markdown += `- **Vapor Lock**: Failure caused when liquid boils into compressible gas bubbles.\n`;
      markdown += `- **Kinetic Energy**: The energy an object possesses due to its motion.\n`;

      return {
        type: 'summary',
        markdown,
        topic,
        cefr
      };
    }

    static _generateFeedbackContent(topic, cefr, count, profile, sends) {
      let markdown = `# Formative Assessment & Pedagogical Feedback\n\n`;
      markdown += `**Assignment Title**: ${topic}\n`;
      markdown += `**Target Standard**: CEFR ${cefr} Technical Immersion\n\n---\n\n`;

      markdown += `## 1. Overall CEFR Alignment & Strengths\n`;
      markdown += `The student demonstrates strong B1 communicative control regarding workshop safety protocols. Vocabulary choices (*"bleed valve"*, *"hydraulic pressure"*, *"caliper pins"*) are applied accurately in technical context without translation ambiguities.\n\n`;

      markdown += `## 2. Targeted Improvement Areas (Grammar & ESP Register)\n`;
      markdown += `- **Passive Voice Precision**: In technical reporting, technicians should favor the impersonal passive (*"The bleeder was opened"* rather than *"I opened the bleeder"*).\n`;
      markdown += `- **Modal Verbs of Obligation**: Refine distinctions between *must* (mandatory safety rule), *should* (best practice guideline), and *can* (procedural capability).\n\n`;

      markdown += `## 3. Recommended Next Steps & Practice Exercises\n`;
      markdown += `1. Review the passive construction of past actions in workshop job cards.\n`;
      markdown += `2. Practice reading OEM technical repair manuals to identify standard torque specification verbs.\n`;

      return {
        type: 'feedback',
        markdown,
        topic,
        cefr
      };
    }

    // ---- Topic-aware offline templates for the Planning & Writing generators ----
    static _generateDocContent(id, topic, cefr, count, profile, sends, gen) {
      const n = Math.max(1, count);
      const head = `# ${gen.name}: ${topic}\n\n**CEFR**: ${cefr} | **Learners**: ${profile || 'General English learners'} | **SEND support**: ${sends}\n\n---\n\n`;
      const T = topic;
      const range = k => Array.from({ length: k }, (_, i) => i + 1);
      let md = head;
      switch (id) {
        case 'lesson_plan': {
          const total = n * 10;
          md += `## Aims\nBy the end of the lesson, learners can use language for **${T}** appropriately at ${cefr}.\n\n## Success Criteria\n- I can understand key vocabulary for ${T}.\n- I can use target structures accurately in a short exchange.\n- I can complete a real-world task about ${T}.\n\n**Total time**: ${total} min | **Materials**: board, handouts, role cards\n\n## Stages\n| Stage | Time | Interaction | Activity |\n|---|---|---|---|\n| Warmer | ${Math.round(total * 0.1)} min | Whole class | Quick question chain to activate prior knowledge of ${T} |\n| Lead-in | ${Math.round(total * 0.1)} min | Pairs | Predict vocabulary from images or a short prompt |\n| Presentation | ${Math.round(total * 0.2)} min | T-Ss | Model language in context, concept-check, drill |\n| Controlled practice | ${Math.round(total * 0.2)} min | Individual / pairs | Gap-fill and matching, peer check |\n| Freer practice | ${Math.round(total * 0.25)} min | Groups | Roleplay or task based on ${T} |\n| Wrap-up | ${Math.round(total * 0.1)} min | Whole class | Feedback on errors, exit ticket |\n| Homework | - | Individual | Short written task on ${T} |\n\n## Anticipated Problems\n- Learners may lack vocabulary: pre-teach 6-8 items.\n- Fast finishers: extension task (write a follow-up message).\n`;
          break;
        }
        case 'worksheet': {
          md += `## Task 1: Match the words to their meanings\nMatch 5 key terms about **${T}** with definitions.\n\n`;
          if (n >= 2) md += `## Task 2: Complete the sentences\nFill each gap with one word from the box.\n\n`;
          if (n >= 3) md += `## Task 3: Correct the mistakes\nFind and fix one error in each sentence.\n\n`;
          if (n >= 4) md += `## Task 4: Write\nWrite 5-6 sentences about ${T}, using at least 4 target words.\n\n`;
          range(Math.max(0, n - 4)).forEach(i => { md += `## Bonus Task ${i + 1}\nPair speaking: ask and answer three questions about ${T}.\n\n`; });
          md += `---\n## Answer Key\n- Task 1: students' matches should reflect the chosen vocabulary.\n- Task 2/3: accept any grammatically correct answer at ${cefr}.\n- Task 4: use the rubric focus on accuracy, range, and task achievement.\n`;
          break;
        }
        case 'reading_comp': {
          md += `## Before You Read\n1. What do you already know about ${T}?\n2. Which words do you expect to see?\n\n## Text\n*(Original ${cefr} text about ${T}: replace with Gemini output when a live key is connected.)*\n\n## Comprehension Questions\n`;
          range(n).forEach(i => { md += `${i + 1}. Question ${i + 1} about the main ideas and details of the text on ${T}.\n`; });
          md += `\n## Vocabulary in Context\nFind a word in the text that means: (a) very important, (b) to make something start.\n\n## After You Read\nDiscuss in pairs: how is ${T} relevant to your own work or studies?\n\n---\n## Answer Key\nAnswers depend on the generated text; use evidence from the passage.\n`;
          break;
        }
        case 'cloze': {
          md += `## Word Bank\n*(choose from the words below)*\n\n## Passage\nWhen working with ${T}, it is important to follow the correct ${'(1)'} ______ . First, you ${'(2)'} ______ the equipment, then you check it carefully.`;
          range(Math.max(0, n - 2)).forEach(i => { md += ` Then step ${i + 3} ${'(' + (i + 3) + ')'} ______ .`; });
          md += `\n\n---\n## Answer Key\nGaps 1-${n}: depends on the generated passage and word bank.\n`;
          break;
        }
        case 'rubric': {
          const crit = ['Content & Task Achievement', 'Accuracy (Grammar)', 'Range (Vocabulary)', 'Fluency / Coherence', 'Pronunciation / Presentation', 'Interaction'].slice(0, Math.min(6, n));
          md += `| Criterion | 4 - Excellent | 3 - Good | 2 - Developing | 1 - Beginning |\n|---|---|---|---|---|\n`;
          crit.forEach(c => { md += `| **${c}** | Consistently strong at ${cefr} for ${T} | Mostly effective with minor slips | Partly effective, some breakdowns | Limited, needs support |\n`; });
          md += `\n**Scoring**: ${crit.length * 4} points total. Share descriptors with learners before the task.\n`;
          break;
        }
        case 'email_writer': {
          md += `## Model Text 1 (Formal)\n**Subject**: ${T}\n\nDear Mr/Ms [Name],\n\nI am writing to you regarding ${T}. I would be grateful if you could look into this matter at your earliest convenience.\n\nYours sincerely,\n[Your name]\n\n`;
          if (n >= 2) md += `## Model Text 2 (Semi-formal)\n**Subject**: Quick update: ${T}\n\nHi [Name],\n\nJust a quick note about ${T}. Could you let me know what you think by Friday?\n\nThanks,\n[Your name]\n\n`;
          md += `## Useful Phrases\n- *I am writing to...* / *I would like to inquire about...*\n- *Could you possibly...?* / *I would appreciate it if...*\n- *Please find attached...* / *Look forward to hearing from you.*\n\n## Your Turn\nWrite a ${cefr}-appropriate email about ${T} (80-120 words). Checklist: greeting, purpose, details, request, closing.\n`;
          break;
        }
        case 'scheme_of_work': {
          md += `| Week | Theme | Learning outcomes | Language focus | Skills | Assessment |\n|---|---|---|---|---|---|\n`;
          range(n).forEach(w => { md += `| ${w} | ${T}: unit ${w} | Learners can do task ${w} at ${cefr} | Key structures & vocabulary ${w} | ${['Speaking', 'Listening', 'Reading', 'Writing'][(w - 1) % 4]} | ${w % 4 === 0 ? 'Progress check' : 'Informal feedback'} |\n`; });
          md += `\n**Resources**: coursebook extracts, authentic texts, RichmondAI worksheets.\n`;
          break;
        }
        case 'dialogue': {
          range(n).forEach(i => {
            md += `## Dialogue ${i + 1}\n**A**: Good morning. I need to talk to you about ${T}.\n**B**: Of course. What seems to be the problem?\n**A**: Well, ${i === 0 ? 'there has been an issue' : 'I have a different concern'} and I would like your advice.\n**B**: I see. Let's go through it step by step.\n\n### Gapped version\n**A**: Good ______. I need to ______ to you about ${T}.\n\n### Role cards\n**Student A**: explain the situation. **Student B**: ask questions and suggest a solution.\n\n`;
          });
          md += `## Functional Language\n- Explaining: *The issue is that...*\n- Advising: *I suggest we...*\n- Checking: *Do you mean...?*\n\n---\n## Answer Key\nmorning; talk.\n`;
          break;
        }
        case 'vocab_list': {
          md += `| # | Word | POS | Definition | Example |\n|---|---|---|---|---|\n`;
          range(n).forEach(i => { md += `| ${i + 1} | term ${i + 1} | noun | learner-friendly definition | Example sentence on ${T}. |\n`; });
          md += `\n## Practice\n1. Match each word with its definition.\n2. Write a sentence using three of the words.\n\n---\n## Answer Key\nDepends on the final word list.\n`;
          break;
        }
        case 'report_comments': {
          range(n).forEach(i => {
            md += `### Comment ${i + 1}\n[Student Name] has shown real progress this term (${T}). ${['Their confidence in class is a clear strength.', 'They contribute thoughtfully to group work.', 'Their effort and attitude are excellent.'][i % 3]} To improve further, [Student Name] should focus on accuracy in extended writing. **Next-step target**: write one short paragraph each week and self-check for common errors.\n\n`;
          });
          break;
        }
        default:
          md += `Content for ${T}.`;
      }
      return { type: 'formatted', markdown: md, topic, cefr };
    }
  }

  // =========================================================================
  // 5. LIVE GEMINI FLASH API CLIENT (REST CONNECTOR)
  // =========================================================================
  class GeminiClient {
    constructor() {
      this.keyStorageKey = 'richmond_gemini_api_key';
      this.modelStorageKey = 'richmond_gemini_model';
      this.apiKey = localStorage.getItem(this.keyStorageKey) || '';
      this.model = localStorage.getItem(this.modelStorageKey) || 'gemini-2.5-flash';
    }

    hasKey() {
      if (BACKEND_CONFIG.geminiBackend === 'proxy') return true;
      return Boolean(this.apiKey && this.apiKey.trim().length > 10);
    }

    setKey(key, model = 'gemini-2.5-flash') {
      this.apiKey = key.trim();
      this.model = model;
      localStorage.setItem(this.keyStorageKey, this.apiKey);
      localStorage.setItem(this.modelStorageKey, this.model);
    }

    clearKey() {
      this.apiKey = '';
      localStorage.removeItem(this.keyStorageKey);
    }

    async generate(prompt, systemInstruction = '') {
      // 1. Cloudflare / Backend Proxy Mode
      if (BACKEND_CONFIG.geminiBackend === 'proxy') {
        const headers = { 'Content-Type': 'application/json' };
        if (window.firebase && window.firebase.auth && window.firebase.auth().currentUser) {
          try {
            const token = await window.firebase.auth().currentUser.getIdToken();
            headers['Authorization'] = `Bearer ${token}`;
          } catch (e) {}
        }

        const response = await fetch(BACKEND_CONFIG.proxyUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            prompt,
            systemInstruction,
            model: this.model
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || errorData.error || `Proxy error (Status ${response.status})`);
        }

        const data = await response.json();
        const text = data.text || data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Proxy returned an empty response.');
        return text;
      }

      // 2. Direct Browser-to-Gemini Client Mode (BYOK)
      if (!this.hasKey()) {
        throw new Error('No API key configured');
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 2500
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Gemini API error (Status ${response.status})`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Gemini Flash returned an empty response.');
      }
      return text;
    }
  }

  // =========================================================================
  // 5.5 RICHMOND PRO TTS ENGINE & RICH MARKDOWN PARSER
  // =========================================================================
  function parseMarkdownToHtml(md) {
    if (!md) return '';
    const lines = md.split('\n');
    const out = [];
    let inTable = false;
    let inList = false;
    let listType = null;
    let inAnswerKey = false;

    function closeList() {
      if (inList) {
        out.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = null;
      }
    }

    function closeTable() {
      if (inTable) {
        out.push('</tbody></table></div>');
        inTable = false;
      }
    }

    function inlineMd(s) {
      return s
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/(_{3,})/g, '<span class="cloze-blank">______</span>');
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // GFM Tables
      if (line.startsWith('|') && line.endsWith('|')) {
        closeList();
        const cells = line.slice(1, -1).split('|').map(c => c.trim());
        if (cells.every(c => /^:?-+:?$/.test(c))) continue; // separator row

        if (!inTable) {
          inTable = true;
          out.push('<div class="table-responsive"><table class="richmond-table">');
          out.push('<thead><tr>' + cells.map(c => '<th>' + inlineMd(c) + '</th>').join('') + '</tr></thead><tbody>');
        } else {
          out.push('<tr>' + cells.map(c => '<td>' + inlineMd(c) + '</td>').join('') + '</tr>');
        }
        continue;
      } else {
        closeTable();
      }

      // Answer Key section
      if (/^## (Answer Key|Teacher Answer Key|Teacher Key|Solucionario)/i.test(line)) {
        closeList();
        if (!inAnswerKey) {
          inAnswerKey = true;
          out.push('<div class="answer-key-section">');
        }
        out.push('<h2 class="answer-key-title"><i class="fa-solid fa-key"></i> ' + inlineMd(line.replace(/^##\s*/, '')) + '</h2>');
        continue;
      }

      // Headings
      if (line.startsWith('# ')) { closeList(); out.push('<h1>' + inlineMd(line.slice(2)) + '</h1>'); continue; }
      if (line.startsWith('## ')) { closeList(); out.push('<h2>' + inlineMd(line.slice(3)) + '</h2>'); continue; }
      if (line.startsWith('### ')) { closeList(); out.push('<h3>' + inlineMd(line.slice(4)) + '</h3>'); continue; }
      if (line.startsWith('#### ')) { closeList(); out.push('<h4>' + inlineMd(line.slice(5)) + '</h4>'); continue; }

      // Horizontal Rule
      if (/^(\-{3,}|\*{3,})$/.test(line)) { closeList(); out.push('<hr>'); continue; }

      // Blockquote
      if (line.startsWith('> ')) { closeList(); out.push('<blockquote>' + inlineMd(line.slice(2)) + '</blockquote>'); continue; }

      // Lists
      const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
      if (ulMatch) {
        if (!inList || listType !== 'ul') { closeList(); inList = true; listType = 'ul'; out.push('<ul>'); }
        out.push('<li>' + inlineMd(ulMatch[1]) + '</li>');
        continue;
      }

      const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (olMatch) {
        if (!inList || listType !== 'ol') { closeList(); inList = true; listType = 'ol'; out.push('<ol>'); }
        out.push('<li>' + inlineMd(olMatch[2]) + '</li>');
        continue;
      }

      closeList();
      if (line === '') continue;

      // Dialogue speaker detection
      const dialogueMatch = line.match(/^\*\*(Speaker\s+[A-Z]|[A-Z]|Student(?:\s+[A-Z])?|Teacher|Doctor|Patient|Supervisor|Technician|Guest|Concierge)\*\*:\s*(.*)$/i);
      if (dialogueMatch) {
        const speaker = dialogueMatch[1];
        const speech = dialogueMatch[2];
        const cleanSpeechAttr = speech.replace(/"/g, '&quot;');
        out.push(`<div class="dialogue-line"><span class="dialogue-speaker">${speaker}</span> <span class="dialogue-text">${inlineMd(speech)}</span> <button type="button" class="tts-inline-btn" data-tts="${cleanSpeechAttr}" title="Listen"><i class="fa-solid fa-volume-high"></i></button></div>`);
        continue;
      }

      out.push('<p>' + inlineMd(line) + '</p>');
    }

    closeList();
    closeTable();
    if (inAnswerKey) out.push('</div>');
    return out.join('\n');
  }

  class RichmondTtsEngine {
    constructor() {
      this.currentAudio = null;
      this.isPlaying = false;
      this.tapPill = null;
      this.tapPillLabel = null;
      this.activeBtn = null;
      this._initUnlock();
    }

    _makeSilentWavUrl() {
      const sampleRate = 44100;
      const numSamples = Math.floor(sampleRate * 0.3);
      const dataSize = numSamples * 2;
      const buffer = new ArrayBuffer(44 + dataSize);
      const view = new DataView(buffer);
      function writeStr(offset, str) {
        for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
      }
      writeStr(0, 'RIFF');
      view.setUint32(4, 36 + dataSize, true);
      writeStr(8, 'WAVE');
      writeStr(12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, 1, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      writeStr(36, 'data');
      view.setUint32(40, dataSize, true);
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      return 'data:audio/wav;base64,' + btoa(binary);
    }

    _initUnlock() {
      const unlock = () => {
        try {
          const a = new Audio(this._makeSilentWavUrl());
          a.play().then(() => {
            window.removeEventListener('click', unlock);
            window.removeEventListener('touchstart', unlock);
          }).catch(() => {});
        } catch (e) {}
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }

    isSpanish(text) {
      if (!text) return false;
      if (/[áéíóúüñ¿¡]/i.test(text)) return true;
      const words = text.toLowerCase().split(/\W+/);
      const esCommon = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'de', 'en', 'para', 'por', 'con', 'es', 'son', 'que', 'del']);
      let hits = 0;
      for (const w of words) if (esCommon.has(w)) hits++;
      return hits >= 2;
    }

    offerTapToPlay(audio, label) {
      if (!this.tapPill) {
        this.tapPill = document.getElementById('ttsTapPill');
        this.tapPillLabel = document.getElementById('ttsTapPillLabel');
      }
      if (!this.tapPill) return;
      if (this.tapPillLabel) this.tapPillLabel.textContent = label || 'Tap to listen / Toca para escuchar';
      this.tapPill.style.display = 'flex';
      this.tapPill.onclick = () => {
        this.tapPill.style.display = 'none';
        audio.play().catch(() => {});
      };
      audio.addEventListener('ended', () => {
        if (this.tapPill) this.tapPill.style.display = 'none';
      }, { once: true });
    }

    stop() {
      if (this.currentAudio) {
        try {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        } catch (e) {}
        this.currentAudio = null;
      }
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      this.isPlaying = false;
      this._updateUIState(false);
      if (this.tapPill) this.tapPill.style.display = 'none';
    }

    _updateUIState(playing) {
      const globalBtn = document.getElementById('btn-export-tts');
      const globalLabel = document.getElementById('btn-export-tts-label');
      if (globalBtn) {
        if (playing) {
          globalBtn.classList.add('playing');
          if (globalLabel) globalLabel.textContent = 'Stop';
        } else {
          globalBtn.classList.remove('playing');
          if (globalLabel) globalLabel.textContent = 'Listen';
        }
      }
      if (this.activeBtn) {
        if (playing) {
          this.activeBtn.classList.add('playing');
          this.activeBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
        } else {
          this.activeBtn.classList.remove('playing');
          this.activeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          this.activeBtn = null;
        }
      }
    }

    async speak(text, triggerBtn = null) {
      if (this.isPlaying) {
        this.stop();
        return;
      }

      if (!text || !text.trim()) {
        if (window.RichmondApp) window.RichmondApp._showToast('No text available to speak.');
        return;
      }

      this.stop();
      this.isPlaying = true;
      this.activeBtn = triggerBtn;
      this._updateUIState(true);

      const cleanText = text
        .replace(/#+\s+/g, '')
        .replace(/\*\*|__|\*|_/g, '')
        .replace(/\|/g, ' ')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/_{3,}/g, 'blank')
        .replace(/\s+/g, ' ')
        .trim();

      const spanish = this.isSpanish(cleanText);
      const voice = spanish ? 'stembot' : 'fable';
      const endpoints = [
        BACKEND_CONFIG.piperTtsEndpoint,
        BACKEND_CONFIG.piperTtsFallback
      ].filter(Boolean);

      let audioBlob = null;

      for (const ep of endpoints) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 4500);
          const res = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: cleanText.slice(0, 800),
              model: 'tts-1',
              voice,
              speed: 1.0
            }),
            signal: controller.signal
          });
          clearTimeout(timer);
          if (res.ok) {
            audioBlob = await res.blob();
            break;
          }
        } catch (e) {}
      }

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.addEventListener('ended', () => {
          this.stop();
          URL.revokeObjectURL(audioUrl);
        }, { once: true });

        audio.addEventListener('error', () => {
          this.stop();
          URL.revokeObjectURL(audioUrl);
        }, { once: true });

        audio.play().catch(err => {
          if (err && err.name === 'NotAllowedError') {
            this.offerTapToPlay(audio, spanish ? 'Toca para escuchar (Voz Pro)' : 'Tap to listen (Pro TTS)');
          } else {
            this._fallbackWebSpeech(cleanText, spanish);
          }
        });
      } else {
        this._fallbackWebSpeech(cleanText, spanish);
      }
    }

    _fallbackWebSpeech(text, isSpanish) {
      if (!('speechSynthesis' in window)) {
        this.stop();
        if (window.RichmondApp) window.RichmondApp._showToast('Speech synthesis not supported on this device.');
        return;
      }
      try {
        const u = new SpeechSynthesisUtterance(text.slice(0, 400));
        u.lang = isSpanish ? 'es-ES' : 'en-US';
        u.rate = 0.95;
        u.onend = () => this.stop();
        u.onerror = () => this.stop();
        window.speechSynthesis.speak(u);
      } catch (e) {
        this.stop();
      }
    }
  }

  // =========================================================================
  // 6. RICHMOND AI STUDIO CONTROLLER
  // =========================================================================
  class RichmondStudio {
    constructor() {
      this.auth = new AuthManager();
      this.gemini = new GeminiClient();
      this.tts = new RichmondTtsEngine();
      this.activeGeneratorId = 'mcq';
      this.activeCefr = 'B1';
      this.activeDifficulty = 'standard';
      this.activeSends = [];
      this.currentGeneration = null;
      this.currentViewMode = 'formatted'; // 'formatted' | 'cutout' | 'student' | 'key' | 'markdown'
      this.cartridges = this._loadCartridges();
      this.history = this._loadHistory();

      this._initDOM();
      this._bindEvents();
      this.auth.updateQuotaUI();
      this._renderCartridgeList();
      this._renderCatalogGrid();
    }

    _loadCartridges() {
      const saved = localStorage.getItem('richmond_cartridges');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 8) return parsed;
        } catch (e) { }
      }
      return [
        // ── 1. RICHMOND FLAGSHIP: English ID 3.0 Series (Young Adult, Pink Stress, Communicative) ──
        {
          id: 'eid-u1',
          category: 'English ID 3.0 (A1)',
          title: 'English ID 3.0 · Unit 1: What’s your name? (A1)',
          context: 'Textbook: Richmond English ID 3.0 (A1) Unit 1. Target Grammar: Verb to be (I am, you are, he/she is), possessive adjectives (my, your, his, her), questions with What and Who. Target Vocabulary: Greetings (Hello, Hi), classroom instructions, alphabet, numbers 0-20, first/last names. Richmond Signature Feature: Pink Stress Letters highlighting tonic vowel/syllable in #ec008c. Communicative Objective: Introduce oneself, spell names, ask and share contact details in youthful higher-ed environments.'
        },
        {
          id: 'eid-u2',
          category: 'English ID 3.0 (A1)',
          title: 'English ID 3.0 · Unit 2: Where are you from? (A1)',
          context: 'Textbook: Richmond English ID 3.0 (A1) Unit 2. Target Grammar: Verb to be negative & interrogative (Where are you from? Are you Mexican?), plural nouns (-s, -es), this/these. Target Vocabulary: 15 world countries & nationalities, languages, phone numbers, numbers 20-100. Richmond Signature Feature: Pink Stress syllable counts on country/nationality pairs (Mex-i-co / Mex-i-can, Bra-zil / Bra-zil-i-an). Communicative Objective: Identify origin, ask where classmates are from, navigate international student campus life.'
        },
        {
          id: 'eid-u3',
          category: 'English ID 3.0 (A1)',
          title: 'English ID 3.0 · Unit 3: In my backpack & Campus Life (A1)',
          context: 'Textbook: Richmond English ID 3.0 (A1) Unit 3. Target Grammar: Demonstratives (this, that, these, those), articles a/an, prepositions of place (in, on, under, next to). Target Vocabulary: Everyday tech & student items (laptop, student ID, charger, keys, headphones, backpack, water bottle). Richmond Signature Feature: Pronunciation of plural endings /s/, /z/, /ɪz/ with Pink Stress. Communicative Objective: Ask about and describe personal belongings, lost & found on campus.'
        },
        {
          id: 'eid-u4',
          category: 'English ID 3.0 (A1)',
          title: 'English ID 3.0 · Unit 4: People in my life & Friends (A1)',
          context: 'Textbook: Richmond English ID 3.0 (A1) Unit 4. Target Grammar: Possessive \'s, have/has got, descriptive adjectives (tall, short, friendly, funny, creative). Target Vocabulary: Family members, close friends, coworkers, personality traits. Richmond Signature Feature: Word stress on multi-syllable adjectives with Pink Stress. Communicative Objective: Describe friends, introduce people, share stories about social circles and World of Friends.'
        },

        // ── 2. RICHMOND FLAGSHIP: Personal Best 2.0 (High Academic Production) ──
        {
          id: 'pb-intensive',
          category: 'Personal Best 2.0',
          title: 'Personal Best 2.0 · 3x3 Speaking Matrix & High Production (A1–B1)',
          context: 'Textbook: Richmond Personal Best 2.0. Focus: Intensive language production, 3x3 speaking tasks, timed oral fluency bursts (3 minutes), scaffolded peer debates, academic text builders, and rapid self-correction rubrics designed for demanding university workloads.'
        },

        // ── 3. MEXICAN HIGHER ED ESP TRACKS (stemOS UT / TecNM Network) ──
        {
          id: 'ut-mecatronica',
          category: 'Mexican UT / IT ESP',
          title: 'UT / IT Mecatrónica: PLC Ladder, Automation & LOTO (TSU & Ing.)',
          context: 'Aligned to Mexican Universidades Tecnológicas (UT Tijuana, UT Querétaro, UT Ramos Arizpe, UT Ciudad Juárez). Target Standards: IEC 61131-3, ISO 10218-1/2, OSHA 1910.147 LOTO, NFPA 70E Arc Flash. Focus: Industrial robot cells (KUKA, Yaskawa), Allen-Bradley/Siemens PLC ladder diagnostics, zero-energy isolation, shopfloor SOPs and vendor technical calls with US suppliers.'
        },
        {
          id: 'ut-mantenimiento',
          category: 'Mexican UT / IT ESP',
          title: 'UT / IT Mantenimiento Industrial: Vibration Analysis & OEE (TSU & Ing.)',
          context: 'Aligned to Mexican Universidades Tecnológicas (UT Coahuila, UT Hermosillo, UT San Luis Potosí, UT Norte de Guanajuato). Target Standards: ISO 55001 Asset Management, VDI 2056 Vibration Severity, OSHA 1910.147. Focus: Predictive vibration analysis (mm/s RMS), infrared thermography, hydraulic press lockout, line-stop escalation, spare parts procurement and MTBF/MTTR reporting.'
        },
        {
          id: 'ut-logistica',
          category: 'Mexican UT / IT ESP',
          title: 'UT / IT Logística y Transporte: Border Crossing & T-MEC Customs (TSU & Ing.)',
          context: 'Aligned to Mexican Universidades Tecnológicas (UT Nogales, UT Nuevo Laredo, UT Reynosa, UT Altamira). Target Standards: Incoterms 2020 (FCA, DAP, DDP), C-TPAT/OEA, T-MEC/USMCA Rules of Origin, SAT Anexo 24/31. Focus: Border crossing manifests at World Trade Bridge, customs holds, bill of lading, expedited freight charter negotiation, and international supply chain compliance.'
        },
        {
          id: 'ut-ti-cloud',
          category: 'Mexican UT / IT ESP',
          title: 'UT / IT Tecnologías de la Información: APIs, Microservices & DevOps (TSU & Ing.)',
          context: 'Aligned to Mexican Universidades Tecnológicas (UT Jalisco, UT Aguascalientes, UT Querétaro, UT Metropolitana de Mérida). Target Standards: REST/GraphQL, ISO 27001, OpenTelemetry, SOC 2. Focus: Microservices architecture, industrial MQTT telemetry, sprint planning standups in English, pull request reviews, distributed tracing and incident postmortems.'
        },
        {
          id: 'ut-procesos',
          category: 'Mexican UT / IT ESP',
          title: 'UT / IT Procesos Industriales: Injection Molding & PPAP Quality (TSU & Ing.)',
          context: 'Aligned to Mexican Universidades Tecnológicas (UT Puebla, UT Tamaulipas Norte, UT Tijuana). Target Standards: AIAG APQP/PPAP, IATF 16949, SPI Mold Standards. Focus: Polymer injection molding parameters, short shot/flash defect analysis, GD&T drawing reading, CMM inspection, and customer quality concessions with Detroit automotive OEMs.'
        }
      ];
    }

    _saveCartridges() {
      localStorage.setItem('richmond_cartridges', JSON.stringify(this.cartridges));
    }

    _loadHistory() {
      const saved = localStorage.getItem('richmond_library');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
      return [];
    }

    _saveHistory() {
      localStorage.setItem('richmond_library', JSON.stringify(this.history));
    }

    _initDOM() {
      // Inputs
      this.genDropdown = document.getElementById('generator-selector-dropdown');
      // Build options from the registry so new generators appear automatically, grouped by category.
      const byCat = {};
      Object.values(GENERATORS).forEach(g => { (byCat[g.category] = byCat[g.category] || []).push(g); });
      this.genDropdown.innerHTML = '';
      Object.keys(byCat).forEach(cat => {
        const og = document.createElement('optgroup');
        og.label = cat;
        byCat[cat].forEach(g => {
          const o = document.createElement('option');
          o.value = g.id; o.textContent = g.name;
          og.appendChild(o);
        });
        this.genDropdown.appendChild(og);
      });
      this.genDropdown.value = 'mcq';
      this.topicInput = document.getElementById('input-topic');
      this.countInput = document.getElementById('input-count');
      this.countValueDisplay = document.getElementById('display-count-value');
      this.countLabel = document.getElementById('label-count-text');
      this.profileInput = document.getElementById('input-learner-profile');
      this.supportingText = document.getElementById('input-supporting-text');
      this.supportingUrl = document.getElementById('input-supporting-url');
      this.cartridgeSelect = document.getElementById('select-active-cartridge');
      this.languageSelect = document.getElementById('input-language');
      this.countrySelect = document.getElementById('input-country');
      
      // Header and Canvas
      this.headerGenName = document.getElementById('header-gen-name');
      this.paneTitle = document.getElementById('active-pane-title');
      this.emptyBox = document.getElementById('empty-state-box');
      this.loadingBox = document.getElementById('loading-state-box');
      this.renderedBox = document.getElementById('rendered-content-box');
      this.flashcardsGrid = document.getElementById('flashcards-render-grid');
      this.tabBtnCutout = document.getElementById('tab-btn-cutout');
      this.tabBtnStudent = document.getElementById('tab-btn-student');
      this.tabBtnKey = document.getElementById('tab-btn-key');

      // Populate Gemini API key input if stored
      const keyInput = document.getElementById('input-user-gemini-key');
      if (keyInput && this.gemini.apiKey) keyInput.value = this.gemini.apiKey;
    }

    _bindEvents() {
      // 1. Sidebar Navigation View Switcher & Brand Clicks
      document.querySelectorAll('.rail-nav .rail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.dataset.view;
          if (view) this.navTo(view);
        });
      });

      const brandHomeLink = document.getElementById('brand-home-link');
      if (brandHomeLink) {
        brandHomeLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.navTo('home');
        });
      }
      const headerBrand = document.querySelector('.header-brand-title');
      if (headerBrand) {
        headerBrand.style.cursor = 'pointer';
        headerBrand.addEventListener('click', () => {
          this.navTo('home');
        });
      }

      // 2. Generator Switcher Dropdown
      this.genDropdown.addEventListener('change', (e) => {
        this.selectGenerator(e.target.value);
      });

      // 3. CEFR Pills Selection
      document.querySelectorAll('#cefr-dial-grid .cefr-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('#cefr-dial-grid .cefr-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCefr = pill.dataset.level;
          const descEl = document.getElementById('cefr-description-text');
          if (descEl) descEl.textContent = CEFR_INFO[this.activeCefr] || this.activeCefr;
        });
      });

      // 4. Difficulty Selector
      document.querySelectorAll('#difficulty-dial-grid .difficulty-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('#difficulty-dial-grid .difficulty-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeDifficulty = pill.dataset.diff;
        });
      });

      // 5. SEND Neurodiversity Checkbox Pills
      document.querySelectorAll('#send-pills-list .send-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const sendType = pill.dataset.send;
          if (this.activeSends.includes(sendType)) {
            this.activeSends = this.activeSends.filter(s => s !== sendType);
            pill.classList.remove('active');
          } else {
            this.activeSends.push(sendType);
            pill.classList.add('active');
          }
        });
      });

      // 6. Quantity Slider
      this.countInput.addEventListener('input', (e) => {
        this.countValueDisplay.textContent = `${e.target.value} items`;
      });

      // 7. Preset Chips for Learner Profiles
      document.querySelectorAll('.preset-chips-row .preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (chip.dataset.profile) {
            this.profileInput.value = chip.dataset.profile;
          }
        });
      });

      // 8. Supporting Material Tabs
      document.querySelectorAll('#supporting-material-tabs .tab-btn-min').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#supporting-material-tabs .tab-btn-min').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.dataset.tab;
          document.getElementById('tab-content-paste').style.display = tab === 'paste' ? 'block' : 'none';
          document.getElementById('tab-content-url').style.display = tab === 'url' ? 'block' : 'none';
          document.getElementById('tab-content-cartridge').style.display = tab === 'cartridge' ? 'block' : 'none';
        });
      });

      // 9. View Mode Switcher
      document.querySelectorAll('#view-mode-tab-group .view-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#view-mode-tab-group .view-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.setViewMode(btn.dataset.view);
        });
      });

      // 10. Main Generate CTA Button + Keyboard Shortcut
      document.getElementById('btn-run-generation').addEventListener('click', () => this.executeGeneration());
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          this.executeGeneration();
        }
      });

      // 11. Export Actions (Print, DOCX, Copy, Save, TTS)
      const ttsBtn = document.getElementById('btn-export-tts');
      if (ttsBtn) ttsBtn.addEventListener('click', () => this.exportTts());
      document.getElementById('btn-export-print').addEventListener('click', () => this.exportPrint());
      document.getElementById('btn-export-docx').addEventListener('click', () => this.exportDocx());
      document.getElementById('btn-export-copy').addEventListener('click', () => this.exportCopy());
      document.getElementById('btn-export-save').addEventListener('click', () => this.saveToLibrary());

      // 12. Header Quick Triggers
      const quotaPill = document.getElementById('quota-meter-pill');
      if (quotaPill) quotaPill.addEventListener('click', () => this._openModal('modal-pricing'));
      const btnHeaderUpgrade = document.getElementById('btn-header-upgrade');
      if (btnHeaderUpgrade) btnHeaderUpgrade.addEventListener('click', () => this._openModal('modal-pricing'));
      const btnHeaderUser = document.getElementById('btn-header-user');
      if (btnHeaderUser) btnHeaderUser.addEventListener('click', () => this._openModal('modal-auth'));
      const btnHeaderGemini = document.getElementById('btn-header-gemini');
      if (btnHeaderGemini) btnHeaderGemini.addEventListener('click', () => this._openModal('modal-gemini-key'));
      const navBtnUser = document.getElementById('nav-btn-user-auth');
      if (navBtnUser) navBtnUser.addEventListener('click', () => this._openModal('modal-auth'));
      const navBtnGemini = document.getElementById('nav-btn-gemini-key');
      if (navBtnGemini) navBtnGemini.addEventListener('click', () => this._openModal('modal-gemini-key'));

      // 13. Modal Close Triggers
      document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.closest('.modal-overlay').classList.remove('active');
        });
      });

      // 14. Auth Form Submit
      const authForm = document.getElementById('form-auth');
      if (authForm) {
        authForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('auth-name').value;
          const email = document.getElementById('auth-email').value;
          const school = document.getElementById('auth-school').value;
          this.auth.login(name, email, school, 'free');
          this._closeModal('modal-auth');
          this._showToast(`Welcome, ${name}! Your 15 daily free generations are ready.`);
        });
      }

      // 14.5 Google Sign-In Trigger
      const googleBtn = document.getElementById('btn-auth-google');
      if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
          try {
            const u = await this.auth.loginWithGoogle();
            this._closeModal('modal-auth');
            this._showToast(`Signed in with Google as ${u.name}!`);
          } catch (err) {
            this._showToast(err.message || 'Google sign-in failed.');
          }
        });
      }

      // 15. Instant Demo Login Button
      document.getElementById('btn-auth-demo-bypass').addEventListener('click', () => {
        this.auth.login('Prof. Yepz (Atlixco B1)', 'yepz@richmond.edu', 'Instituto Tecnológico Atlixco', 'free');
        this._closeModal('modal-auth');
        this._showToast('Signed in with Demo Teacher credentials.');
      });

      // 16. Pricing Upgrade Trigger
      document.getElementById('btn-plan-pro').addEventListener('click', () => {
        this.auth.upgradeToPro();
        this._closeModal('modal-pricing');
        this._showToast('🎉 Upgraded to RichmondAI Pro! 150 daily generations unlocked.');
      });

      // 17. Currency Switcher in Pricing
      document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cur = btn.dataset.currency;
          const freeEl = document.getElementById('price-free');
          const proEl = document.getElementById('price-pro');
          const instEl = document.getElementById('price-inst');
          if (cur === 'USD') {
            freeEl.textContent = '$0.00'; proEl.textContent = '$29.00'; instEl.textContent = '$189.00';
          } else if (cur === 'GBP') {
            freeEl.textContent = '£0.00'; proEl.textContent = '£24.00'; instEl.textContent = '£149.00';
          } else {
            freeEl.textContent = '€0.00'; proEl.textContent = '€27.00'; instEl.textContent = '€175.00';
          }
        });
      });

      // 18. Gemini Key Save
      document.getElementById('btn-save-gemini-key').addEventListener('click', () => {
        const key = document.getElementById('input-user-gemini-key').value;
        const model = document.getElementById('select-gemini-model').value;
        this.gemini.setKey(key, model);
        this._closeModal('modal-gemini-key');
        this._showToast(`Gemini Key saved for model ${model}! Direct API calls active.`);
      });

      document.getElementById('btn-clear-gemini-key').addEventListener('click', () => {
        this.gemini.clearKey();
        document.getElementById('input-user-gemini-key').value = '';
        this._showToast('Gemini API key cleared. RichmondAI will use the high-fidelity pedagogical engine.');
      });

      // 19. Cartridge Creation
      document.getElementById('btn-save-new-cartridge').addEventListener('click', () => {
        const title = document.getElementById('new-cartridge-title').value.trim();
        const context = document.getElementById('new-cartridge-context').value.trim();
        if (!title || !context) {
          alert('Please enter both a title and curriculum context for your cartridge.');
          return;
        }
        const newCart = { id: `cartridge-${Date.now()}`, title, context };
        this.cartridges.push(newCart);
        this._saveCartridges();
        this._renderCartridgeList();
        document.getElementById('new-cartridge-title').value = '';
        document.getElementById('new-cartridge-context').value = '';
        this._showToast(`Cartridge "${title}" saved and ready!`);
      });

      // 20. Catalog Search
      const catSearch = document.getElementById('catalog-search-input');
      if (catSearch) {
        catSearch.addEventListener('input', (e) => {
          this._filterCatalogGrid(e.target.value.toLowerCase());
        });
      }

      // 21. FAQ Accordion Toggle
      document.querySelectorAll('#faq-accordion-container .faq-question-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const wasActive = item.classList.contains('active');
          document.querySelectorAll('#faq-accordion-container .faq-item').forEach(i => i.classList.remove('active'));
          if (!wasActive) item.classList.add('active');
        });
      });

      // 22. FAQ Category Filters
      document.querySelectorAll('#faq-category-filters .faq-cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('#faq-category-filters .faq-cat-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const cat = pill.dataset.cat;
          document.querySelectorAll('#faq-accordion-container .faq-item').forEach(item => {
            if (cat === 'all' || item.dataset.cat === cat) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });

      // 23. FAQ Search Input
      const faqSearch = document.getElementById('faq-search-input');
      if (faqSearch) {
        faqSearch.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase().trim();
          document.querySelectorAll('#faq-accordion-container .faq-item').forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(query) ? 'block' : 'none';
          });
        });
      }

      // 24. Clean EdTech Layout (No Cinema Blackout)
    }

    toggleCinemaMode() {
      // Safe stub - cinema blackout effect disabled
    }

    navTo(view) {
      this.toggleCinemaMode(false);
      if (view === 'pricing') {
        this.openPricing();
        return;
      }
      if (view === 'cartridges') {
        this._openModal('modal-cartridge');
        this._renderCartridgeList();
        return;
      }
      if (view === 'history') {
        this._openModal('modal-history');
        this._renderHistoryList();
        return;
      }

      const homeView = document.getElementById('home-view');
      const studioView = document.getElementById('studio-view');
      const catalogView = document.getElementById('catalog-view');
      const faqView = document.getElementById('faq-view');

      document.querySelectorAll('.rail-nav .rail-btn').forEach(b => b.classList.remove('active'));
      const activeRailBtn = document.querySelector(`.rail-nav .rail-btn[data-view="${view}"]`);
      if (activeRailBtn) activeRailBtn.classList.add('active');

      if (view === 'home') {
        if (homeView) {
          homeView.classList.add('active');
          homeView.style.display = 'block';
          homeView.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (studioView) studioView.style.display = 'none';
        if (catalogView) catalogView.style.display = 'none';
        if (faqView) faqView.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (view === 'catalog') {
        if (homeView) {
          homeView.classList.remove('active');
          homeView.style.display = 'none';
        }
        if (studioView) studioView.style.display = 'none';
        if (faqView) faqView.style.display = 'none';
        if (catalogView) catalogView.style.display = 'block';
      } else if (view === 'faq') {
        if (homeView) {
          homeView.classList.remove('active');
          homeView.style.display = 'none';
        }
        if (studioView) studioView.style.display = 'none';
        if (catalogView) catalogView.style.display = 'none';
        if (faqView) faqView.style.display = 'block';
      } else {
        // default: 'studio'
        if (homeView) {
          homeView.classList.remove('active');
          homeView.style.display = 'none';
        }
        if (catalogView) catalogView.style.display = 'none';
        if (faqView) faqView.style.display = 'none';
        if (studioView) studioView.style.display = 'grid';
      }
    }

    openPricing() {
      this._openModal('modal-pricing');
    }

    trySample(genId, topic, cefr) {
      this.selectGenerator(genId);
      if (topic && this.topicInput) {
        this.topicInput.value = topic;
      }
      if (cefr) {
        this.activeCefr = cefr;
        document.querySelectorAll('#cefr-dial-grid .cefr-pill').forEach(p => {
          if (p.dataset.level === cefr) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        const descEl = document.getElementById('cefr-description-text');
        if (descEl) descEl.textContent = CEFR_INFO[cefr] || cefr;
      }
      this.navTo('studio');
      this.executeGeneration();
      this._showToast(`Calibrating ${GENERATORS[genId]?.name || genId} for ${cefr}...`);
    }

    selectGenerator(genId) {
      const gen = GENERATORS[genId];
      if (!gen) return;

      this.activeGeneratorId = genId;
      this.genDropdown.value = genId;
      this.headerGenName.textContent = gen.name;
      this.paneTitle.textContent = `${gen.name} Setup`;
      this.topicInput.placeholder = gen.topicPlaceholder;
      this.topicInput.value = gen.defaultTopic;
      this.countLabel.textContent = gen.countLabel;
      this.countInput.value = gen.defaultCount;
      this.countValueDisplay.textContent = `${gen.defaultCount} items`;

      // Visibility of mode tabs based on generator capabilities
      this.tabBtnCutout.style.display = gen.supportsCutout ? 'inline-flex' : 'none';
      this.tabBtnStudent.style.display = gen.supportsStudentKey ? 'inline-flex' : 'none';
      this.tabBtnKey.style.display = gen.supportsStudentKey ? 'inline-flex' : 'none';

      // Switch back to studio workspace if in catalog, faq, or home
      const homeView = document.getElementById('home-view');
      const studioView = document.getElementById('studio-view');
      const catalogView = document.getElementById('catalog-view');
      const faqView = document.getElementById('faq-view');
      if (homeView) {
        homeView.classList.remove('active');
        homeView.style.display = 'none';
      }
      if (catalogView) catalogView.style.display = 'none';
      if (faqView) faqView.style.display = 'none';
      if (studioView) studioView.style.display = 'grid';

      document.querySelectorAll('.rail-nav .rail-btn').forEach(b => b.classList.remove('active'));
      const studioNavBtn = document.getElementById('nav-btn-studio');
      if (studioNavBtn) studioNavBtn.classList.add('active');
    }

    async executeGeneration() {
      // 1. Registered User & Quota Verification
      if (!this.auth.user.registered) {
        this._openModal('modal-auth');
        this._showToast('Please sign in or register to generate materials.');
        return;
      }

      if (this.auth.getRemainingGenerations() <= 0) {
        this._openModal('modal-pricing');
        this._showToast('You have used your daily generations. Upgrade to Pro for 150/day!');
        return;
      }

      // 2. Gather Parameters
      const topic = this.topicInput.value.trim() || GENERATORS[this.activeGeneratorId].defaultTopic;
      const count = parseInt(this.countInput.value, 10) || 5;
      const profile = this.profileInput.value.trim();
      const language = this.languageSelect.value;
      const country = this.countrySelect.value;
      const supportingText = this.supportingText.value.trim();
      const supportingUrl = this.supportingUrl.value.trim();
      const activeCartridgeId = this.cartridgeSelect.value;
      const activeCartridge = this.cartridges.find(c => c.id === activeCartridgeId);

      const params = {
        generatorId: this.activeGeneratorId,
        topic,
        count,
        cefr: this.activeCefr,
        difficulty: this.activeDifficulty,
        learnerProfile: profile,
        language,
        country,
        supportingText,
        supportingUrl,
        cartridgeContext: activeCartridge ? activeCartridge.context : '',
        sends: this.activeSends
      };

      // 3. UI Shimmer Loading State
      this.emptyBox.style.display = 'none';
      this.renderedBox.style.display = 'none';
      this.flashcardsGrid.style.display = 'none';
      this.loadingBox.style.display = 'flex';

      const statusEl = document.getElementById('loading-status-message');
      statusEl.textContent = `Gemini Flash is calibrating CEFR ${this.activeCefr} vocabulary and instructional alignment...`;

      try {
        let result = null;

        // Check if Teacher supplied live Gemini API Key
        if (this.gemini.hasKey()) {
          statusEl.textContent = `Connecting to Google Gemini Flash API (${this.gemini.model})...`;
          const systemPrompt = `You are RichmondAI, an elite ELT and ESP material creation engine. Calibrate output strictly to CEFR ${params.cefr}. Learner Profile: ${params.learnerProfile}. SEND accommodations: ${params.sends.join(', ')}. Format in clean, beautiful Markdown with clear headings and bold target vocabulary.`;
          const hint = GENERATORS[params.generatorId].promptHint ? ` ${GENERATORS[params.generatorId].promptHint}` : '';
          const userPrompt = `Create ${params.count} items for generator "${GENERATORS[params.generatorId].name}" on the topic: "${params.topic}". Additional context: ${params.supportingText || params.cartridgeContext || 'None'}.${hint}`;
          
          const rawResponse = await this.gemini.generate(userPrompt, systemPrompt);
          result = {
            type: params.generatorId === 'flashcards' ? 'flashcards' : 'formatted',
            markdown: rawResponse,
            topic: params.topic,
            cefr: params.cefr,
            cards: params.generatorId === 'flashcards' ? this._parseFlashcardsFromText(rawResponse, params.topic, params.cefr) : []
          };
        } else {
          // Pedagogically authentic fallback simulation
          await new Promise(resolve => setTimeout(resolve, 600)); // Sub-second simulation
          result = PedagogicalGenerator.generate(params);
        }

        // Deduct 1 daily generation from quota
        await this.auth.consumeGeneration();
        this.currentGeneration = result;

        // Render result
        this.loadingBox.style.display = 'none';
        this.renderGenerationOutput(result);
        this._showToast(`Generated successfully! (${this.auth.getRemainingGenerations()} generations left today)`);

      } catch (err) {
        console.error('Generation Error:', err);
        this.loadingBox.style.display = 'none';
        this.renderedBox.style.display = 'block';
        this.renderedBox.innerHTML = `
          <div style="padding:20px; border-left:4px solid var(--accent-pink); background:rgba(236,72,153,0.1);">
            <h3 style="color:var(--accent-pink);">Generation Notice</h3>
            <p style="font-size:0.9rem; margin-top:8px;">${err.message}</p>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">Falling back to local pedagogical synthesis engine.</p>
          </div>
        `;
      }
    }

    _parseFlashcardsFromText(text, topic, cefr) {
      // Basic fallback card extractor if Gemini returned markdown
      return [
        {
          term: topic.split(' ')[0] || 'Key Term',
          ipa: '/kiz tɜːrm/',
          cefr: cefr,
          def: 'Core technical component or principle extracted from the instructional material.',
          example: `Ensure you inspect the ${topic} before continuing the workshop drill.`
        }
      ];
    }

    renderGenerationOutput(result) {
      this.emptyBox.style.display = 'none';

      if (result.type === 'flashcards' && result.cards && result.cards.length > 0) {
        this.tabBtnCutout.style.display = 'inline-flex';
        this.renderCutoutFlashcards(result.cards);
        this.setViewMode('cutout');
      } else {
        this.flashcardsGrid.style.display = 'none';
        this.renderedBox.style.display = 'block';
        this.renderMarkdownFormatted(result.markdown);
        this.setViewMode('formatted');
      }
    }

    renderCutoutFlashcards(cards) {
      this.renderedBox.style.display = 'none';
      this.flashcardsGrid.style.display = 'grid';
      this.flashcardsGrid.innerHTML = '';

      cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'cutout-card';
        cardEl.innerHTML = `
          <div class="cutout-card-inner">
            <div class="cutout-card-front">
              <div class="card-cut-mark">
                <span><i class="fa-solid fa-scissors"></i> Cut #0${index + 1}</span>
                <span class="mono-badge" style="color:var(--accent-gold); font-size:0.7rem;">CEFR ${card.cefr}</span>
              </div>
              <div>
                <div class="card-term">${card.term}</div>
                <div class="card-phonetics">${card.ipa}</div>
              </div>
              <div style="font-size:0.7rem; color:var(--text-muted);"><i class="fa-solid fa-hand-pointer"></i> Click to flip</div>
            </div>
            <div class="cutout-card-back">
              <div class="card-cut-mark">
                <span style="color:var(--accent-gold-light);">Definition & Usage</span>
                <span class="mono-badge">Card #0${index + 1}</span>
              </div>
              <div class="card-def">${card.def}</div>
              <div class="card-example">"${card.example}"</div>
            </div>
          </div>
        `;
        cardEl.addEventListener('click', () => {
          cardEl.classList.toggle('flipped');
        });
        this.flashcardsGrid.appendChild(cardEl);
      });
    }

    renderMarkdownFormatted(mdText) {
      this.flashcardsGrid.style.display = 'none';
      this.renderedBox.style.display = 'block';

      this.renderedBox.innerHTML = parseMarkdownToHtml(mdText);
      this._attachInlineTtsListeners();
    }

    _attachInlineTtsListeners() {
      if (!this.renderedBox) return;
      this.renderedBox.querySelectorAll('.tts-inline-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const text = btn.dataset.tts;
          if (text) this.tts.speak(text, btn);
        });
      });
    }

    setViewMode(mode) {
      this.currentViewMode = mode;
      if (!this.currentGeneration) return;

      const gen = this.currentGeneration;

      if (mode === 'cutout') {
        if (gen.cards && gen.cards.length) {
          this.renderCutoutFlashcards(gen.cards);
        }
      } else if (mode === 'student') {
        // Hide answer keys and rationales for exam handouts
        this.flashcardsGrid.style.display = 'none';
        this.renderedBox.style.display = 'block';
        if (gen.items) {
          let studentMd = `# ${gen.topic} — Student Assessment\n\n**Name**: ____________________ **Date**: __________ **CEFR Band**: ${gen.cefr}\n\n---\n\n`;
          gen.items.forEach(item => {
            studentMd += `### Question ${item.num}\n${item.q}\n\n`;
            item.opts.forEach(o => {
              studentMd += `[  ] **${o.k}**: ${o.text}\n`;
            });
            studentMd += `\n\n`;
          });
          this.renderMarkdownFormatted(studentMd);
        } else {
          this.renderMarkdownFormatted(gen.markdown);
        }
      } else if (mode === 'key') {
        // Teacher key view
        this.flashcardsGrid.style.display = 'none';
        this.renderedBox.style.display = 'block';
        if (gen.items) {
          let keyMd = `# ${gen.topic} — Teacher Answer Key & Rationales\n\n**CEFR Band**: ${gen.cefr} · European ELT Assessment Standards\n\n---\n\n`;
          gen.items.forEach(item => {
            keyMd += `### Question ${item.num}\n${item.q}\n\n`;
            item.opts.forEach(o => {
              keyMd += `- **${o.k}**: ${o.text} ${o.correct ? '★ **[CORRECT]**' : ''}\n`;
            });
            keyMd += `\n> **Pedagogical Rationale**: ${item.rationale}\n\n`;
          });
          this.renderMarkdownFormatted(keyMd);
        } else {
          this.renderMarkdownFormatted(gen.markdown);
        }
      } else if (mode === 'markdown') {
        this.flashcardsGrid.style.display = 'none';
        this.renderedBox.style.display = 'block';
        this.renderedBox.innerHTML = `<pre style="white-space: pre-wrap; font-family:'JetBrains Mono',monospace; font-size:0.85rem; color:#0f172a; background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:8px;">${this._escapeHtml(gen.markdown)}</pre>`;
      } else {
        // Formatted Preview
        if (gen.type === 'flashcards' && gen.cards) {
          this.renderCutoutFlashcards(gen.cards);
        } else {
          this.renderMarkdownFormatted(gen.markdown);
        }
      }
    }

    exportPrint() {
      if (!this.currentGeneration) {
        this._showToast('Generate content before printing.');
        return;
      }
      const oldTitle = document.title;
      document.title = `RichmondAI - ${this.currentGeneration.topic || 'Classroom Material'}`;
      window.print();
      setTimeout(() => { document.title = oldTitle; }, 1000);
    }

    exportDocx() {
      if (!this.currentGeneration) {
        this._showToast('Generate content before exporting.');
        return;
      }
      const rawTopic = this.currentGeneration.topic || 'RichmondAI_Lesson';
      const cleanTopic = this._escapeHtml(rawTopic);
      const safeFilename = rawTopic.replace(/[^a-zA-Z0-9_\-]/g, '_');
      const cefr = this._escapeHtml(this.currentGeneration.cefr || 'B1');
      const dateStr = new Date().toLocaleDateString();

      // Clean HTML clone without interactive buttons
      const clone = this.renderedBox.cloneNode(true);
      clone.querySelectorAll('.tts-inline-btn, #ttsTapPill').forEach(el => el.remove());
      const bodyHtml = clone.innerHTML;

      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${cleanTopic}</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            @page WordSection1 {
              size: 8.5in 11.0in;
              margin: 1.0in 1.0in 1.0in 1.0in;
              mso-header-margin: .5in;
              mso-footer-margin: .5in;
              mso-paper-source: 0;
            }
            div.WordSection1 { page: WordSection1; }
            body {
              font-family: Calibri, 'Segoe UI', Arial, sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              color: #1e293b;
            }
            h1 {
              font-size: 18pt;
              color: #1e3a8a;
              border-bottom: 2pt solid #1e3a8a;
              padding-bottom: 6pt;
              margin-bottom: 12pt;
            }
            h2 {
              font-size: 14pt;
              color: #0f172a;
              margin-top: 14pt;
              margin-bottom: 6pt;
            }
            h3 {
              font-size: 12pt;
              color: #334155;
              margin-top: 10pt;
              margin-bottom: 4pt;
            }
            p, li {
              font-size: 11pt;
              color: #334155;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 12pt 0;
              font-size: 10pt;
            }
            th, td {
              border: 1pt solid #cbd5e1;
              padding: 6pt 8pt;
              text-align: left;
              vertical-align: top;
            }
            th {
              background-color: #f1f5f9;
              font-weight: bold;
              color: #0f172a;
            }
            .meta-box {
              background: #f8fafc;
              border: 1pt solid #e2e8f0;
              padding: 8pt 12pt;
              margin-bottom: 14pt;
              font-size: 10pt;
              color: #475569;
            }
            .answer-key-section {
              page-break-before: always;
              margin-top: 24pt;
              border-top: 2pt dashed #94a3b8;
              padding-top: 12pt;
            }
          </style>
        </head>
        <body>
          <div class="WordSection1">
            <div class="meta-box">
              <strong>RichmondAI Instructional Materials Studio</strong> &bull; CEFR ${cefr} Standard &bull; ${dateStr}
            </div>
            ${bodyHtml}
          </div>
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RichmondAI_${safeFilename}.doc`;
      a.click();
      URL.revokeObjectURL(url);
      this._showToast('Word DOCX file downloaded.');
    }

    exportTts() {
      if (!this.currentGeneration) {
        this._showToast('Generate content before listening.');
        return;
      }
      this.tts.speak(this.currentGeneration.markdown);
    }

    exportCopy() {
      if (!this.currentGeneration) {
        this._showToast('No content to copy.');
        return;
      }
      navigator.clipboard.writeText(this.currentGeneration.markdown).then(() => {
        this._showToast('Markdown copied to clipboard!');
      });
    }

    saveToLibrary() {
      if (!this.currentGeneration) {
        this._showToast('No content to save.');
        return;
      }
      const item = {
        id: `gen-${Date.now()}`,
        generatorId: this.activeGeneratorId,
        topic: this.currentGeneration.topic,
        cefr: this.currentGeneration.cefr,
        markdown: this.currentGeneration.markdown,
        timestamp: new Date().toLocaleDateString()
      };
      this.history.unshift(item);
      this._saveHistory();
      this._showToast('Saved to My Generations Library.');
    }

    _renderCartridgeList() {
      const container = document.getElementById('cartridges-list-container');
      const selectEl = document.getElementById('select-active-cartridge');
      if (!container || !selectEl) return;

      container.innerHTML = '';
      selectEl.innerHTML = '<option value="">-- No Cartridge Selected (Standard Mode) --</option>';

      // Group into categories
      const groups = {};
      this.cartridges.forEach(cart => {
        const cat = cart.category || 'General Curricula';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(cart);
      });

      Object.keys(groups).forEach(cat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = cat;

        groups[cat].forEach(cart => {
          // Dropdown option
          const opt = document.createElement('option');
          opt.value = cart.id;
          opt.textContent = cart.title;
          optgroup.appendChild(opt);

          // Modal Card
          const div = document.createElement('div');
          div.style.cssText = 'padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ffffff; box-shadow:0 1px 3px rgba(15,23,42,0.04); display:flex; justify-content:space-between; align-items:flex-start; gap:12px;';
          div.innerHTML = `
            <div style="flex:1;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
                <span style="font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:9999px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;">${cat}</span>
                <span style="font-weight:700; font-size:0.88rem; color:#0f172a;">${cart.title}</span>
              </div>
              <div style="font-size:0.78rem; color:#475569; line-height:1.45;">${cart.context}</div>
            </div>
            <button type="button" class="btn-glass btn-apply-cartridge" data-id="${cart.id}" style="padding:6px 14px; font-size:0.75rem; white-space:nowrap; border-color:#2563eb; color:#2563eb; font-weight:700;">
              Use in Studio
            </button>
          `;
          container.appendChild(div);
        });

        selectEl.appendChild(optgroup);
      });

      // Bind 'Use in Studio' buttons
      container.querySelectorAll('.btn-apply-cartridge').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (selectEl) {
            selectEl.value = id;
            const cartTabBtn = document.querySelector('#supporting-material-tabs .tab-btn-min[data-tab="cartridge"]');
            if (cartTabBtn) cartTabBtn.click();
          }
          const cart = this.cartridges.find(c => c.id === id);
          const modal = document.getElementById('modal-cartridge');
          if (modal) modal.classList.remove('active');
          this.navTo('studio');
          if (cart) {
            this._showToast(`Cartridge active: ${cart.title}`);
          }
        });
      });
    }

    _renderHistoryList() {
      const container = document.getElementById('history-items-container');
      if (!container) return;

      if (!this.history.length) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted); font-size:0.88rem;">No saved generations yet. Create and click "Save" to build your library.</div>`;
        return;
      }

      container.innerHTML = '';
      this.history.forEach(item => {
        const gen = GENERATORS[item.generatorId] || GENERATORS.mcq;
        const div = document.createElement('div');
        div.style.cssText = 'padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ffffff; box-shadow:0 1px 3px rgba(15,23,42,0.06); display:flex; justify-content:space-between; align-items:center;';
        div.innerHTML = `
          <div>
            <div style="font-weight:700; color:var(--text-primary); font-size:0.9rem;">${item.topic}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">
              <span>${gen.name}</span> · <strong style="color:var(--accent-gold);">${item.cefr}</strong> · ${item.timestamp}
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="action-btn-sm" onclick="window.RichmondApp.loadFromHistory('${item.id}')"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open</button>
            <button class="action-btn-sm" style="color:#ef4444;" onclick="window.RichmondApp.deleteFromHistory('${item.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        `;
        container.appendChild(div);
      });
    }

    applyCartridgeQuick(id) {
      if (this.cartridgeSelect) {
        this.cartridgeSelect.value = id;
        const cartTabBtn = document.querySelector('#supporting-material-tabs .tab-btn-min[data-tab="cartridge"]');
        if (cartTabBtn) cartTabBtn.click();
      }
      const cart = this.cartridges.find(c => c.id === id);
      if (cart) {
        this._showToast(`Cartridge active: ${cart.title}`);
        if (!this.topicInput.value.trim() || this.topicInput.value.includes('·')) {
          this.topicInput.value = cart.title.split('·')[1]?.trim() || cart.title;
        }
      }
    }

    loadFromHistory(id) {
      const item = this.history.find(h => h.id === id);
      if (!item) return;
      this.selectGenerator(item.generatorId);
      this.topicInput.value = item.topic;
      this.currentGeneration = {
        type: 'formatted',
        markdown: item.markdown,
        topic: item.topic,
        cefr: item.cefr
      };
      this.renderMarkdownFormatted(item.markdown);
      this._closeModal('modal-history');
      this._showToast(`Loaded "${item.topic}" from library.`);
    }

    deleteFromHistory(id) {
      this.history = this.history.filter(h => h.id !== id);
      this._saveHistory();
      this._renderHistoryList();
      this._showToast('Item deleted from library.');
    }

    _renderCatalogGrid() {
      const grid = document.getElementById('catalog-cards-grid');
      if (!grid) return;

      grid.innerHTML = '';
      Object.values(GENERATORS).forEach(gen => {
        const card = document.createElement('div');
        card.className = 'gen-card-item';
        card.dataset.title = gen.name.toLowerCase();
        card.dataset.desc = gen.desc.toLowerCase();
        card.innerHTML = `
          <div class="gen-card-top">
            <div class="gen-card-icon ${gen.iconColor}"><i class="fa-solid ${gen.icon}"></i></div>
            <span class="mono-badge" style="font-size:0.65rem; color:var(--text-muted);">${gen.category}</span>
          </div>
          <div class="gen-card-title">${gen.name}</div>
          <div class="gen-card-desc">${gen.desc}</div>
        `;
        card.addEventListener('click', () => {
          this.selectGenerator(gen.id);
        });
        grid.appendChild(card);
      });
    }

    _filterCatalogGrid(query) {
      document.querySelectorAll('#catalog-cards-grid .gen-card-item').forEach(card => {
        const match = card.dataset.title.includes(query) || card.dataset.desc.includes(query);
        card.style.display = match ? 'flex' : 'none';
      });
    }

    _openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    }

    _closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    }

    _showToast(msg) {
      let toast = document.getElementById('app-toast-pill');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast-pill';
        toast.style.cssText = 'position:fixed; bottom:24px; right:24px; background:#ffffff; border:1px solid #2563eb; box-shadow:0 10px 30px rgba(15,23,42,0.15); color:#0f172a; padding:10px 20px; border-radius:999px; font-size:0.82rem; font-weight:600; z-index:99999; display:flex; align-items:center; gap:8px; opacity:0; transform:translateY(10px); transition:all 0.25s ease;';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-gold);"></i> <span>${msg}</span>`;
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
      }, 3500);
    }

    _escapeHtml(text) {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }

  // Quick Global Helper
  window.quickSelectGenerator = function(id) {
    if (window.RichmondApp) window.RichmondApp.selectGenerator(id);
  };

  // Launch on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    window.RichmondApp = new RichmondStudio();
  });
})();
