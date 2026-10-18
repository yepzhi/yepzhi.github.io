/**
 * IAN — The Remote Job System Replication Engine
 * Methodological foundation: "The Remote Job System" by @reginaontheclock
 * Core Philosophy: "Trabajar remoto no es suerte, es estrategia."
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.IanEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1. 90-Day Action Calendar Data (12 Weeks / 4 Phases)
  const NINETY_DAY_PLAN = [
    {
      phase: 1,
      phaseName: 'Foundation & Setup (Arranque)',
      phaseNameEs: 'Fase 1: Fundamentos y Calibración',
      weeks: 'Weeks 1–2',
      color: '#10b981', // Emerald
      icon: 'fa-shield-halved',
      tasks: [
        { id: 'w1_d1', day: 'Day 1–2', title: 'Candidate Intake & Target Calibration', desc: 'Define target job titles (US standard terminology), target salary in USD, and analyze current strengths/gaps.', command: '/start', duration: '45 min' },
        { id: 'w1_d3', day: 'Day 3', title: 'Salary Benchmark & Market Research', desc: 'Research salary ranges on Levels.fyi, Wellfound, and Glassdoor for your specific role and seniority in US remote market.', command: '/negotiate', duration: '30 min' },
        { id: 'w1_d4', day: 'Day 4–5', title: 'ATS-Compliant CV Overhaul (Google X-Y-Z)', desc: 'Strip out all graphics, tables, photos. Rephrase every bullet into "Accomplished [X], measured by [Y], by doing [Z]".', command: '/cv_tailor', duration: '60 min' },
        { id: 'w1_d6', day: 'Day 6–7', title: 'English CV Final Polish & Bilingual Audit', desc: 'Ensure zero typos, clean typography, single-column hierarchy, and bilingual proficiency tag (EN/ES).', command: '/cv_tailor', duration: '45 min' },
        { id: 'w2_d1', day: 'Day 8', title: 'LinkedIn Headline & Open to Work Settings', desc: 'Deploy the 4-part headline formula and configure "Open to Work" targeting US & Worldwide remote recruiters.', command: '/linkedin', duration: '30 min' },
        { id: 'w2_d2', day: 'Day 9', title: 'LinkedIn About Section (Hook + Async Style)', desc: 'Write the 4-part About section highlighting async communication, tools (Notion, Slack), and CTA.', command: '/linkedin', duration: '45 min' },
        { id: 'w2_d3', day: 'Day 10', title: 'LinkedIn Experience US Retitling & 50 Skills', desc: 'Retitle past jobs to US market standards and max out all 50 relevant skills tags for recruiter search indexing.', command: '/linkedin', duration: '30 min' },
        { id: 'w2_d4', day: 'Day 11–14', title: 'Target 30 Companies & Boolean Alerts Setup', desc: 'Build your top 30 target companies spreadsheet and save Boolean alert searches on LinkedIn and Google X-Ray.', command: '/search', duration: '60 min' }
      ]
    },
    {
      phase: 2,
      phaseName: 'Sourcing, High-Intent Applications & Outreach (Ritmo)',
      phaseNameEs: 'Fase 2: Búsqueda Activa y Prospección Directa',
      weeks: 'Weeks 3–6',
      color: '#3b82f6', // Electric Blue
      icon: 'fa-paper-plane',
      tasks: [
        { id: 'w3_d1', day: 'Daily Routine (30 min)', title: 'Boolean Search & Portal Sourcing', desc: 'Run Boolean strings on LinkedIn, Wellfound, RemoteOK, and Greenhouse/Lever direct company boards.', command: '/search', duration: '30 min' },
        { id: 'w3_d2', day: 'Daily Routine (30 min)', title: '1–2 Tailored High-Intent Applications', desc: 'Never spray and pray. Adapt top 10 keywords from JD into your CV and apply with precision.', command: '/cv_tailor', duration: '30 min' },
        { id: 'w3_d3', day: 'Daily Routine (30 min)', title: 'Hiring Manager LinkedIn Direct Outreach', desc: 'Find Team Lead, VP, or Director on LinkedIn. Send personalized Connection Request (Template A, <300 chars).', command: '/outreach', duration: '30 min' },
        { id: 'w4_d1', day: 'Weekly Goal', title: 'Weekly Cadence Audit (5–8 Apps, 15 Touchpoints)', desc: 'Verify weekly pipeline: 5-8 tailored applications, 15 hiring manager touchpoints, 0 generic applications.', command: '/daily_task', duration: '30 min' },
        { id: 'w5_d1', day: 'Follow-Up Routine', title: 'Day 5–7 Follow-Up Messages (Template B & C)', desc: 'Follow up politely on accepted connection requests with short value pitch (Template B) and 7-day bump (Template C).', command: '/outreach', duration: '30 min' },
        { id: 'w6_d1', day: 'Scam Screening', title: 'Remote Job Scam Verification Check', desc: 'Screen incoming messages for scam red flags (Telegram only, check reimbursements, generic email).', command: '/outreach', duration: '15 min' }
      ]
    },
    {
      phase: 3,
      phaseName: 'Pipeline Momentum & Interview Prep (Tracción)',
      phaseNameEs: 'Fase 3: Dominio de Entrevistas y Tracción',
      weeks: 'Weeks 7–9',
      color: '#f59e0b', // Gold / Amber
      icon: 'fa-comments',
      tasks: [
        { id: 'w7_d1', day: 'Daily (20 min)', title: 'STAR Method Voice Mock Interview', desc: 'Practice answering 1 behavioral question daily using Situation, Task, Action, Result with quantifiable metrics.', command: '/interview', duration: '20 min' },
        { id: 'w7_d2', day: 'Elevator Pitch', title: '90-Second "Tell Me About Yourself" Mastery', desc: 'Perfect your Present-Past-Future narrative explaining why this remote US role is your natural next step.', command: '/interview', duration: '30 min' },
        { id: 'w8_d1', day: 'Remote Competency', title: 'Asynchronous Collaboration Stories', desc: 'Prepare concrete examples of handling ambiguity, cross-timezone handoffs, and self-directed project ownership.', command: '/star', duration: '30 min' },
        { id: 'w8_d2', day: 'Reverse Questions', title: 'Mastering Questions to Ask the Interviewer', desc: 'Prepare strategic reverse questions about first 90 days success metrics, async workflows, and bottlenecks.', command: '/interview', duration: '20 min' },
        { id: 'w9_d1', day: 'Recruiter Screens', title: 'Phone Screen Deflection Strategy', desc: 'Deflect early salary questions gracefully with targeted USD range while anchoring market value.', command: '/negotiate', duration: '30 min' }
      ]
    },
    {
      phase: 4,
      phaseName: 'Final Rounds, Offer Evaluation & Negotiation (Cierre)',
      phaseNameEs: 'Fase 4: Rondas Finales y Negociación Salarial',
      weeks: 'Weeks 10–12',
      color: '#ec4899', // Vivid Pink
      icon: 'fa-trophy',
      tasks: [
        { id: 'w10_d1', day: 'Executive Round', title: 'C-Level & Founders Cultural Alignment', desc: 'Prepare high-level strategic talking points focused on ROI, startup velocity, and company mission.', command: '/interview', duration: '45 min' },
        { id: 'w11_d1', day: 'Offer Simulation', title: 'Salary Counter-Offer Script Generation', desc: 'Run negotiation script simulation to request 10–15% above the initial base salary offer in USD.', command: '/negotiate', duration: '30 min' },
        { id: 'w11_d2', day: 'Benefits & Perks', title: 'Home Office Stipend & PTO Negotiation', desc: 'Negotiate $500–$1,000 USD equipment allowance, annual learning stipend, and clear paid time off.', command: '/negotiate', duration: '30 min' },
        { id: 'w12_d1', day: 'Contract Review', title: 'W-8BEN Contractor vs EOR (Deel/Remote) Review', desc: 'Review US tax compliance form W-8BEN, monthly invoicing, payment methods (Wise, Payoneer), and sign offer!', command: '/negotiate', duration: '45 min' }
      ]
    }
  ];

  // 2. Action Verbs for Google X-Y-Z Formula
  const STRONG_ACTION_VERBS = [
    'Spearheaded', 'Streamlined', 'Orchestrated', 'Optimized', 'Accelerated',
    'Engineered', 'Overhauled', 'Architected', 'Pioneered', 'Automated',
    'Restructured', 'Synthesized', 'Elevated', 'Delivered', 'Catalyzed'
  ];

  // 3. Remote Job Sourcing Platforms Directory
  const SOURCING_PLATFORMS = [
    {
      name: 'Wellfound (AngelList)',
      category: 'Startups & Tech',
      url: 'https://wellfound.com/jobs',
      icon: 'fa-solid fa-rocket',
      desc: 'Top platform for seed to Series C US tech startups hiring remote international talent.'
    },
    {
      name: 'RemoteOK',
      category: 'Remote Tech & Operations',
      url: 'https://remoteok.com/',
      icon: 'fa-solid fa-earth-americas',
      desc: 'High-volume remote jobs board filtering worldwide and LATAM-eligible roles.'
    },
    {
      name: 'We Work Remotely (WWR)',
      category: 'Global Remote Work',
      url: 'https://weworkremotely.com/',
      icon: 'fa-solid fa-laptop-code',
      desc: 'One of the oldest and most respected remote communities with verified global openings.'
    },
    {
      name: 'Himalayas',
      category: 'Curated Startup Jobs',
      url: 'https://himalayas.app/jobs',
      icon: 'fa-solid fa-mountain',
      desc: 'Modern platform showing full salary transparency, tech stack, and time zone requirements.'
    },
    {
      name: 'Remotive',
      category: 'Vetted Tech & Marketing',
      url: 'https://remotive.com/',
      icon: 'fa-solid fa-bolt',
      desc: 'Hand-screened remote opportunities with direct application links to company ATS.'
    },
    {
      name: 'Torre',
      category: 'LATAM to US Remote',
      url: 'https://torre.ai/',
      icon: 'fa-solid fa-compass',
      desc: 'Strong platform for Latin American professionals matching with US and European startups.'
    },
    {
      name: 'Greenhouse Career Boards',
      category: 'Direct Company ATS',
      url: 'https://www.google.com/search?q=site:boards.greenhouse.io+remote',
      icon: 'fa-solid fa-building',
      desc: 'Direct search into tier-1 US startup job openings hosted on Greenhouse.'
    },
    {
      name: 'Lever Career Boards',
      category: 'Direct Company ATS',
      url: 'https://www.google.com/search?q=site:jobs.lever.co+remote',
      icon: 'fa-solid fa-briefcase',
      desc: 'Direct search into fast-growing tech companies hosting jobs on Lever.'
    }
  ];

  // 4. Core Engine Class
  class RemoteJobEngine {
    constructor() {
      this.candidateProfile = this._loadProfile();
    }

    _loadProfile() {
      try {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem('ian_candidate_profile');
          if (saved) return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Could not read candidate profile:', e);
      }
      return {
        targetRole: '',
        yearsExperience: '',
        englishLevel: 'B2',
        currentSummary: '',
        targetSalaryUsd: '3500',
        dailyHours: '60',
        completedTasks: [],
        savedApplications: []
      };
    }

    saveProfile(profile) {
      this.candidateProfile = Object.assign(this.candidateProfile, profile);
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('ian_candidate_profile', JSON.stringify(this.candidateProfile));
        }
      } catch (e) {
        console.error('Failed to save profile:', e);
      }
      return this.candidateProfile;
    }

    getProfile() {
      return this.candidateProfile;
    }

    getPlan() {
      return NINETY_DAY_PLAN;
    }

    getPlatforms() {
      return SOURCING_PLATFORMS;
    }

    // Toggle Task completion
    toggleTask(taskId) {
      const idx = this.candidateProfile.completedTasks.indexOf(taskId);
      if (idx === -1) {
        this.candidateProfile.completedTasks.push(taskId);
      } else {
        this.candidateProfile.completedTasks.splice(idx, 1);
      }
      this.saveProfile({ completedTasks: this.candidateProfile.completedTasks });
      return this.candidateProfile.completedTasks;
    }

    // ─────────────────────────────────────────────────────────────
    // MODULE 1: ATS-Compliant CV Engine (/cv_tailor)
    // ─────────────────────────────────────────────────────────────
    analyzeJobDescription(jdText, candidateText = '') {
      if (!jdText) return null;

      const cleanJd = jdText.toLowerCase();

      // Common tech, tool, and competence dictionary
      const KEYWORDS_DICT = [
        'sql', 'python', 'javascript', 'react', 'node', 'excel', 'salesforce', 'hubspot',
        'zendesk', 'jira', 'notion', 'slack', 'figma', 'asana', 'gainsight', 'stripe',
        'kpi', 'okr', 'churn', 'retention', 'revenue', 'b2b', 'saas', 'pipeline', 'outbound',
        'customer journey', 'onboarding', 'csat', 'nps', 'sdr', 'account executive',
        'data analysis', 'agile', 'scrum', 'automation', 'zapier', 'cross-functional',
        'asynchronous', 'leadership', 'stakeholder management', 'forecasting', 'project management'
      ];

      const foundKeywords = [];
      KEYWORDS_DICT.forEach(kw => {
        if (cleanJd.includes(kw)) {
          foundKeywords.push(kw.toUpperCase());
        }
      });

      // Match score calculation
      let matchScore = 70;
      if (candidateText && foundKeywords.length > 0) {
        const cleanCand = candidateText.toLowerCase();
        let matchedCount = 0;
        foundKeywords.forEach(kw => {
          if (cleanCand.includes(kw.toLowerCase())) matchedCount++;
        });
        const ratio = matchedCount / foundKeywords.length;
        matchScore = Math.min(98, Math.max(50, Math.round(50 + (ratio * 45))));
      }

      return {
        topKeywords: foundKeywords.slice(0, 10),
        matchScore: matchScore,
        corePainPoint: this._extractPainPoint(cleanJd),
        wordCount: jdText.trim().split(/\s+/).length
      };
    }

    _extractPainPoint(jdLower) {
      if (jdLower.includes('churn') || jdLower.includes('retention')) return 'Customer retention & reducing churn rate';
      if (jdLower.includes('pipeline') || jdLower.includes('outbound') || jdLower.includes('lead')) return 'Scaling outbound lead generation and closing pipeline';
      if (jdLower.includes('scale') || jdLower.includes('fast-paced')) return 'Rapid operational scaling with high autonomy';
      if (jdLower.includes('efficiency') || jdLower.includes('automation')) return 'Process automation & removing operational bottlenecks';
      if (jdLower.includes('support') || jdLower.includes('ticket') || jdLower.includes('csat')) return 'High-volume ticket resolution & elevating CSAT scores';
      return 'Cross-functional remote execution & driving measurable business outcomes';
    }

    generateAtsCv(profile, jobAnalysis = null) {
      const role = profile.targetRole || 'Remote Operations & Customer Specialist';
      const years = profile.yearsExperience || '4+';
      const english = profile.englishLevel || 'C1 Fluent';
      const keywords = (jobAnalysis && jobAnalysis.topKeywords.length > 0) 
        ? jobAnalysis.topKeywords.join(' • ')
        : 'SaaS B2B • Asynchronous Communication • Process Automation • Stakeholder Management • KPI Tracking';

      return `================================================================================
FIRST & LAST NAME
City, Country | +XX XXX XXX XXXX | your.email@example.com
LinkedIn: linkedin.com/in/yourprofile | Portfolio: yourportfolio.com
Work Authorization: Independent Contractor (W-8BEN) | English: ${english} (Bilingual EN/ES)
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
High-performing ${role} with ${years} years of proven experience scaling outcomes for high-velocity teams. Specialized in ${keywords.toLowerCase()}. Proven track record operating autonomously across US time zones (EST/PST), leveraging asynchronous collaboration tools to streamline cross-functional workflows and accelerate strategic milestones.

CORE COMPETENCIES & TECHNICAL STACK
--------------------------------------------------------------------------------
• Domain Expertise: ${keywords}
• Collaboration & Async: Notion, Slack, Jira, Asana, Google Workspace, Loom
• Analytical & CRM Tools: Salesforce, HubSpot, Zendesk, Excel/Sheets (Advanced), SQL Basics
• Methodologies: Agile/Scrum, Google X-Y-Z Achievement Tracking, SBAR, Remote First

PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------------------
SENIOR ${role.toUpperCase()} | Global Tech & Remote Services
Remote | 2022 – Present
• Spearheaded cross-functional workflow restructuring across a distributed 15-person team, accelerating project delivery cycle times by 28% within 90 days.
• Optimized operational reporting pipelines, saving an estimated 12 hours of weekly manual sync time through automated dashboards.
• Championed client and stakeholder communication across North American time zones, achieving a 98.4% satisfaction benchmark (CSAT).
• Orchestrated documentation repositories in Notion, standardizing 30+ internal SOPs and cutting new hire onboarding ramp time from 4 weeks to 9 business days.

${role.toUpperCase()} SPECIALIST | International Solutions Group
Hybrid / Remote | 2019 – 2022
• Streamlined daily incident and inquiry resolutions, handling an average of 45+ daily high-priority requests while keeping SLA compliance above 99.2%.
• Partnered directly with product and operations teams to diagnose recurring bottlenecks, contributing to a 17% reduction in churn.
• Trained and mentored 6 incoming junior team members on async communication best practices, ensuring zero operational degradation during peak quarters.

EDUCATION & CONTINUOUS LEARNING
--------------------------------------------------------------------------------
BACHELOR OF SCIENCE / ARTS | University Name, City
Graduated: 2019

CERTIFICATIONS & PROFESSIONAL CREDENTIALS
--------------------------------------------------------------------------------
• The Remote Job System Certification (US Startup Remote Work Framework)
• Advanced Business English & Asynchronous Workplace Communication (CEFR ${english})
• Relevant Professional Tool Certificate (e.g. Salesforce / HubSpot / Agile)`;
    }

    // ─────────────────────────────────────────────────────────────
    // MODULE 2: LinkedIn Magnet Optimization (/linkedin)
    // ─────────────────────────────────────────────────────────────
    generateLinkedInOptimization(profile) {
      const role = profile.targetRole || 'Customer Success Manager';
      const english = profile.englishLevel || 'Bilingual (EN/ES)';

      const headline = `${role} | Helping US & Global Startups Scale Retention & Growth | Async Remote Operator | Bilingual (${english})`;

      const about = `I am a remote-native ${role} dedicated to helping fast-growing startups eliminate operational bottlenecks, retain key accounts, and scale with velocity.

Over the past ${profile.yearsExperience || '4+'} years, I have operated at the intersection of execution and customer value:
• Track Record: Delivered measurable results including reducing process cycle times by 25%+ and sustaining 95%+ client satisfaction metrics.
• Remote-Native Toolkit: Seamless daily operator in Notion, Slack, Jira, Loom, and modern CRM platforms.
• Async Philosophy: I believe deep work and clear, concise documentation beat 10 scheduled meetings. Comfortable with full autonomy across US time zones (EST, CST, PST).

Currently open to remote full-time contractor or direct-hire opportunities with US and international companies.
Let's connect: ${profile.email || 'your.email@example.com'} or message me directly here!`;

      const settingsChecklist = [
        { item: 'Open to Work Visibility', status: 'Set to "Recruiters only" or public frame targeting Remote US & Worldwide' },
        { item: 'Target Job Titles', status: `Add 5 variants: ${role}, Remote ${role}, Senior ${role}, Global ${role}` },
        { item: 'Location Preference', status: 'Add: United States (Remote), Latin America (Remote), Worldwide (Remote)' },
        { item: 'Top 50 Skills Tags', status: 'Populate all 50 slots: Hard tools + Domain competencies (Zero generic buzzwords)' }
      ];

      return {
        headline: headline.slice(0, 220),
        about: about,
        settingsChecklist: settingsChecklist
      };
    }

    // ─────────────────────────────────────────────────────────────
    // MODULE 3: Sourcing & Hiring Manager Outreach (/search & /outreach)
    // ─────────────────────────────────────────────────────────────
    generateBooleanSearches(role = 'Customer Success Manager') {
      const cleanRole = role.replace(/"/g, '');
      return {
        linkedinJobs: `("${cleanRole}") AND ("Remote" OR "Work from home") AND ("Latin America" OR "LATAM" OR "Anywhere" OR "Worldwide") NOT "On-site"`,
        linkedinHiringPosts: `("hiring" OR "we're hiring") AND "${cleanRole}" AND "remote"`,
        googleXrayGreenhouse: `site:boards.greenhouse.io "${cleanRole}" "remote" ("LATAM" OR "Worldwide" OR "Anywhere")`,
        googleXrayLever: `site:jobs.lever.co "${cleanRole}" "remote" ("LATAM" OR "Worldwide" OR "Anywhere")`,
        googleXrayAshby: `site:jobs.ashbyhq.com "${cleanRole}" "remote"`,
        quickLinks: [
          { name: 'Search Greenhouse Jobs', url: `https://www.google.com/search?q=site:boards.greenhouse.io+"${encodeURIComponent(cleanRole)}"+remote` },
          { name: 'Search Lever Jobs', url: `https://www.google.com/search?q=site:jobs.lever.co+"${encodeURIComponent(cleanRole)}"+remote` },
          { name: 'Search Ashby Jobs', url: `https://www.google.com/search?q=site:jobs.ashbyhq.com+"${encodeURIComponent(cleanRole)}"+remote` }
        ]
      };
    }

    generateOutreachSequence(managerName = 'Sarah', companyName = 'Acme Corp', role = 'Customer Success Manager', achievement = 'boosted retention by 18%') {
      const templateA = `Hi ${managerName}, noticed you lead the team at ${companyName}. Really impressed by your recent growth. I specialize as a ${role} and would love to connect and follow your journey here. Best!`;

      const templateB = `Hi ${managerName}, thank you for connecting!
I saw that ${companyName} is expanding its team. Over the last few years, I have helped remote teams ${achievement}.
I recently applied for the ${role} opening and wanted to reach out directly to share how I could hit the ground running with your current tech stack.
Would love 5 minutes to chat if you're open to it, or feel free to pass this along to your recruiter.
Thanks for your time!`;

      const templateC = `Hi ${managerName}, hope you're having a productive week.
Just wanted to follow up briefly regarding the ${role} application. I know you're busy building ${companyName}, so no response needed if the role has been filled, but I remain very enthusiastic about contributing to your team's goals.
Have a great rest of the week!`;

      return {
        templateA: templateA.slice(0, 300),
        templateB: templateB,
        templateC: templateC
      };
    }

    screenForScams(jobText) {
      const text = jobText.toLowerCase();
      const redFlags = [];

      if (text.includes('telegram') || text.includes('whatsapp only')) {
        redFlags.push('Interview conducted strictly via text/Telegram/WhatsApp without video.');
      }
      if (text.includes('check') && (text.includes('equipment') || text.includes('reimburse') || text.includes('vendor'))) {
        redFlags.push('Requests to purchase equipment with upfront checks or third-party wire transfers.');
      }
      if (text.includes('@gmail.com') || text.includes('@outlook.com') || text.includes('@yahoo.com')) {
        redFlags.push('Recruiter uses generic public email domain rather than verified corporate domain.');
      }
      if (text.includes('data entry') && text.includes('50/hour')) {
        redFlags.push('Unrealistic salary promises for minimal entry requirements.');
      }

      return {
        isSafe: redFlags.length === 0,
        riskLevel: redFlags.length === 0 ? 'LOW / SAFE' : redFlags.length === 1 ? 'MODERATE RISK' : 'CRITICAL RED FLAG (DO NOT ENGAGE)',
        redFlags: redFlags
      };
    }

    // ─────────────────────────────────────────────────────────────
    // MODULE 4: Interview Mastery & Salary Negotiation (/interview & /negotiate)
    // ─────────────────────────────────────────────────────────────
    getMockQuestions(role = 'General') {
      return [
        {
          id: 'q1',
          type: 'Elevator Pitch',
          question: 'Tell me about yourself and why you are interested in this remote role.',
          guidance: 'Use the 90-second formula: Present (current role & superpower), Past (1-2 quantifiable proof points), Future (why this exact remote role is next).'
        },
        {
          id: 'q2',
          type: 'Behavioral / STAR',
          question: 'Describe a situation where you had to solve a high-priority problem without direct supervision across different time zones.',
          guidance: 'Structure: Situation (context), Task (your goal), Action (what specific async tools/decisions you made), Result (quantified business impact).'
        },
        {
          id: 'q3',
          type: 'Remote Culture & Conflict',
          question: 'How do you handle disagreements with a remote teammate when communicating primarily via Slack or written text?',
          guidance: 'Emphasize assuming positive intent, moving from text to 5-min Loom or quick video sync when tone is ambiguous, and documenting resolution.'
        },
        {
          id: 'q4',
          type: 'Execution Under Pressure',
          question: 'Tell me about a time you missed a deadline or made a critical mistake in a project. What happened and how did you resolve it?',
          guidance: 'Take 100% ownership immediately. Explain the proactive mitigation step and the preventive SOP you created to ensure it never recurred.'
        },
        {
          id: 'q5',
          type: 'Reverse Questions (Ask the Interviewer)',
          question: 'What questions do you have for us today?',
          guidance: 'Ask high-signal questions: "What does success look like in the first 90 days?", "How does the team handle async documentation between PST and international time zones?"'
        }
      ];
    }

    evaluateStarResponse(userAnswer) {
      if (!userAnswer || userAnswer.trim().length < 20) {
        return {
          score: 40,
          critique: 'Your response was too brief. An effective STAR answer requires concrete context, specific actions, and measurable numbers.',
          modelAnswer: 'In my previous role, our team faced a 22% spike in ticket backlog (Situation). My task was to restore our SLA resolution under 2 hours (Task). I built an automated triage bot in Zapier and Slack (Action), which brought backlog down by 35% in 14 days and saved 8 weekly hours for the team (Result).'
        };
      }

      const hasMetrics = /\d+%|\$\d+|\d+\s*(hours|days|weeks|clients|users|percent)/i.test(userAnswer);
      const score = hasMetrics ? 88 : 68;

      return {
        score: score,
        hasMetrics: hasMetrics,
        critique: hasMetrics
          ? 'Excellent! You included quantifiable metrics. Ensure your delivery is calm, conversational, and under 2 minutes.'
          : 'Good structure, but you need to add concrete metrics (% increase, hours saved, dollars generated). Numbers build immediate recruiter trust.',
        improvedBullets: [
          'State the baseline constraint clearly in the first sentence.',
          'Focus 60% of your time on the "Action" component (tools, async SOPs).',
          'End on a punchy, quantifiable "Result".'
        ]
      };
    }

    generateNegotiationScripts(currentOfferUsd = 3000, targetRole = 'Remote Specialist') {
      const offerNum = parseFloat(currentOfferUsd) || 3000;
      const counterTarget = Math.round(offerNum * 1.12); // +12% target

      return {
        initialOffer: offerNum,
        recommendedCounter: counterTarget,
        deflectionScript: `I am focused on finding the right mutual fit first, but based on market research for remote ${targetRole} positions with my experience, I am targeting a range of $${offerNum} – $${Math.round(offerNum * 1.25)} USD monthly. I'm very flexible depending on the total benefits package, stipends, and growth trajectory.`,
        counterOfferScript: `Hi [Name], thank you so much for the written offer! I am genuinely excited about joining the team and partnering on [Key Strategic Initiative].
Based on the scope of responsibilities and the direct impact I will deliver in scaling [Specific Deliverable], I was hoping we could get closer to $${counterTarget} USD base monthly.
If we can reach that figure, I am ready to sign the agreement and begin onboarding right away.`,
        benefitsNegotiationScript: `In addition to the base compensation, does the company provide a home office setup stipend ($500–$1,000 USD) for hardware and ergonomic equipment, or an annual learning/wellness budget? I'd love to understand the standard remote perk guidelines.`
      };
    }
  }

  return {
    RemoteJobEngine: RemoteJobEngine,
    NINETY_DAY_PLAN: NINETY_DAY_PLAN,
    STRONG_ACTION_VERBS: STRONG_ACTION_VERBS,
    SOURCING_PLATFORMS: SOURCING_PLATFORMS
  };
});
