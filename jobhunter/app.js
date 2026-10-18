/**
 * JobHunter — The Remote Job System Application Controller
 * Powered by IAN (Remote Career Strategist & Technical Headhunter)
 */

(function () {
  'use strict';

  class JobHunterApp {
    constructor() {
      this.engine = new window.IanEngine.RemoteJobEngine();
      this.currentQuestionIndex = 0;
      this.questions = this.engine.getMockQuestions();
      this.lastJdAnalysis = null;
      
      this._initDOMElements();
      this._bindEvents();
      this._renderPlanRoadmap();
      this._renderSourcingPlatforms();
      this._updateHeaderMetrics();
      this._loadCandidateProfileIntoForms();
      this._renderInterviewQuestion(0);
    }

    _initDOMElements() {
      // Nav buttons
      this.navButtons = document.querySelectorAll('.rail-btn[data-tab]');
      this.tabViews = document.querySelectorAll('.tab-view');
      this.headerModuleName = document.getElementById('header-module-name');
      this.progressTextDisplay = document.getElementById('progress-text-display');
      this.salaryDisplay = document.getElementById('salary-display');
      this.userRoleDisplay = document.getElementById('user-role-display');
      this.userAvatarText = document.getElementById('user-avatar-text');

      // Modals
      this.modalProfile = document.getElementById('modal-profile');
      this.modalScam = document.getElementById('modal-scam');
      this.btnCloseProfile = document.getElementById('btn-close-modal-profile');
      this.btnCloseScam = document.getElementById('btn-close-modal-scam');
      this.btnOpenSettings = document.getElementById('btn-open-settings');
      this.btnHeaderProfile = document.getElementById('btn-header-profile');
      this.btnOpenScamScanner = document.getElementById('btn-open-scam-scanner');

      // Forms & Inputs
      this.formProfile = document.getElementById('form-profile');
      this.inputProfileRole = document.getElementById('input-profile-role');
      this.inputProfileYears = document.getElementById('input-profile-years');
      this.selectProfileEnglish = document.getElementById('select-profile-english');
      this.inputProfileSalary = document.getElementById('input-profile-salary');
      this.selectProfileHours = document.getElementById('select-profile-hours');
      this.inputProfileSummary = document.getElementById('input-profile-summary');

      // CV Tailor elements
      this.cvTargetRole = document.getElementById('cv-target-role');
      this.cvJobDesc = document.getElementById('cv-job-desc');
      this.btnAnalyzeJd = document.getElementById('btn-analyze-jd');
      this.btnGenerateCv = document.getElementById('btn-generate-cv');
      this.jdAnalysisBox = document.getElementById('jd-analysis-box');
      this.matchScoreVal = document.getElementById('match-score-val');
      this.keywordsCloud = document.getElementById('keywords-cloud');
      this.painPointNote = document.getElementById('pain-point-note');
      this.atsPreviewCanvas = document.getElementById('ats-preview-canvas');
      this.btnCopyCv = document.getElementById('btn-copy-cv');
      this.btnDownloadCv = document.getElementById('btn-download-cv');
      this.btnPrintCv = document.getElementById('btn-print-cv');

      // LinkedIn elements
      this.liRole = document.getElementById('li-role');
      this.liSkills = document.getElementById('li-skills');
      this.liImpact = document.getElementById('li-impact');
      this.btnOptimizeLinkedin = document.getElementById('btn-optimize-linkedin');
      this.liHeadlineText = document.getElementById('li-headline-text');
      this.liAboutText = document.getElementById('li-about-text');
      this.liChecklistItems = document.getElementById('li-checklist-items');
      this.btnCopyLinkedin = document.getElementById('btn-copy-linkedin');

      // Sourcing elements
      this.sourcingRole = document.getElementById('sourcing-role');
      this.btnGenerateBoolean = document.getElementById('btn-generate-boolean');
      this.booleanResultsArea = document.getElementById('boolean-results-area');
      this.boolLinkedinJobs = document.getElementById('bool-linkedin-jobs');
      this.boolGreenhouse = document.getElementById('bool-greenhouse');
      this.platformsGrid = document.getElementById('platforms-grid');

      // Outreach elements
      this.outreachManager = document.getElementById('outreach-manager');
      this.outreachCompany = document.getElementById('outreach-company');
      this.outreachAchievement = document.getElementById('outreach-achievement');
      this.btnGenerateOutreach = document.getElementById('btn-generate-outreach');
      this.outreachTA = document.getElementById('outreach-t-a');
      this.outreachTB = document.getElementById('outreach-t-b');
      this.outreachTC = document.getElementById('outreach-t-c');

      // Interview elements
      this.interviewQIndex = document.getElementById('interview-q-index');
      this.interviewQType = document.getElementById('interview-q-type');
      this.interviewQText = document.getElementById('interview-q-text');
      this.interviewQGuidance = document.getElementById('interview-q-guidance');
      this.userInterviewAnswer = document.getElementById('user-interview-answer');
      this.btnEvaluateAnswer = document.getElementById('btn-evaluate-answer');
      this.btnNextQuestion = document.getElementById('btn-next-question');
      this.btnSpeakQuestion = document.getElementById('btn-speak-question');
      this.feedbackScoreNum = document.getElementById('feedback-score-num');
      this.feedbackStatusTitle = document.getElementById('feedback-status-title');
      this.feedbackCritiqueText = document.getElementById('feedback-critique-text');
      this.feedbackModelBox = document.getElementById('feedback-model-box');
      this.feedbackModelText = document.getElementById('feedback-model-text');

      // Negotiation elements
      this.negCurrentOffer = document.getElementById('neg-current-offer');
      this.negTargetRole = document.getElementById('neg-target-role');
      this.btnCalculateNegotiation = document.getElementById('btn-calculate-negotiation');
      this.counterValHighlight = document.getElementById('counter-val-highlight');
      this.negDeflectionText = document.getElementById('neg-deflection-text');
      this.negCounterText = document.getElementById('neg-counter-text');
      this.negPerksText = document.getElementById('neg-perks-text');

      // Chat elements
      this.chatMessagesStream = document.getElementById('chat-messages-stream');
      this.chatInputForm = document.getElementById('chat-input-form');
      this.chatInputField = document.getElementById('chat-input-field');

      // Scam scanner modal elements
      this.inputScamText = document.getElementById('input-scam-text');
      this.btnRunScamScan = document.getElementById('btn-run-scam-scan');
      this.scamResultsBox = document.getElementById('scam-results-box');
    }

    _bindEvents() {
      // Tab navigation
      this.navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          this.switchTab(btn.dataset.tab);
        });
      });

      // Profile modal triggers
      if (this.btnOpenSettings) this.btnOpenSettings.addEventListener('click', () => this.openModal('modal-profile'));
      if (this.btnHeaderProfile) this.btnHeaderProfile.addEventListener('click', () => this.openModal('modal-profile'));
      if (this.btnCloseProfile) this.btnCloseProfile.addEventListener('click', () => this.closeModal('modal-profile'));

      // Scam modal triggers
      if (this.btnOpenScamScanner) this.btnOpenScamScanner.addEventListener('click', () => this.openModal('modal-scam'));
      if (this.btnCloseScam) this.btnCloseScam.addEventListener('click', () => this.closeModal('modal-scam'));

      // Profile form submit
      if (this.formProfile) {
        this.formProfile.addEventListener('submit', (e) => {
          e.preventDefault();
          this._handleProfileSave();
        });
      }

      // CV Module events
      if (this.btnAnalyzeJd) this.btnAnalyzeJd.addEventListener('click', () => this._handleAnalyzeJd());
      if (this.btnGenerateCv) this.btnGenerateCv.addEventListener('click', () => this._handleGenerateCv());
      if (this.btnCopyCv) this.btnCopyCv.addEventListener('click', () => this.copyText('ats-preview-canvas'));
      if (this.btnDownloadCv) this.btnDownloadCv.addEventListener('click', () => this._downloadCv());
      if (this.btnPrintCv) this.btnPrintCv.addEventListener('click', () => window.print());

      // LinkedIn Module events
      if (this.btnOptimizeLinkedin) this.btnOptimizeLinkedin.addEventListener('click', () => this._handleOptimizeLinkedin());
      if (this.btnCopyLinkedin) this.btnCopyLinkedin.addEventListener('click', () => {
        const full = `${this.liHeadlineText.textContent}\n\n---\n\n${this.liAboutText.textContent}`;
        navigator.clipboard.writeText(full).then(() => this.showToast('LinkedIn headline and About copied!'));
      });

      // Sourcing Module events
      if (this.btnGenerateBoolean) this.btnGenerateBoolean.addEventListener('click', () => this._handleGenerateBoolean());
      if (this.btnGenerateOutreach) this.btnGenerateOutreach.addEventListener('click', () => this._handleGenerateOutreach());

      // Interview Module events
      if (this.btnEvaluateAnswer) this.btnEvaluateAnswer.addEventListener('click', () => this._handleEvaluateInterview());
      if (this.btnNextQuestion) this.btnNextQuestion.addEventListener('click', () => this._handleNextQuestion());
      if (this.btnSpeakQuestion) this.btnSpeakQuestion.addEventListener('click', () => this._speakCurrentQuestion());

      // Negotiation Module events
      if (this.btnCalculateNegotiation) this.btnCalculateNegotiation.addEventListener('click', () => this._handleCalculateNegotiation());

      // Chat Module events
      if (this.chatInputForm) {
        this.chatInputForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this._handleChatSubmit();
        });
      }

      // Scam check button
      if (this.btnRunScamScan) this.btnRunScamScan.addEventListener('click', () => this._handleRunScamScan());
    }

    switchTab(tabId) {
      this.navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });

      this.tabViews.forEach(view => {
        view.classList.toggle('active', view.id === `view-${tabId}`);
      });

      const tabTitles = {
        plan: '90-Day Plan',
        cv: 'ATS CV Tailor',
        linkedin: 'LinkedIn Magnet',
        sourcing: 'Sourcing & Outreach',
        interview: 'Mock Interview (STAR)',
        negotiate: 'Salary Negotiation',
        chat: 'Ask IAN (Strategist)'
      };

      if (this.headerModuleName) {
        this.headerModuleName.textContent = tabTitles[tabId] || 'Workspace';
      }
    }

    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    }

    _loadCandidateProfileIntoForms() {
      const p = this.engine.getProfile();
      if (p.targetRole) {
        if (this.inputProfileRole) this.inputProfileRole.value = p.targetRole;
        if (this.cvTargetRole) this.cvTargetRole.value = p.targetRole;
        if (this.liRole) this.liRole.value = p.targetRole;
        if (this.sourcingRole) this.sourcingRole.value = p.targetRole;
        if (this.negTargetRole) this.negTargetRole.value = p.targetRole;
      }
      if (p.yearsExperience && this.inputProfileYears) this.inputProfileYears.value = p.yearsExperience;
      if (p.englishLevel && this.selectProfileEnglish) this.selectProfileEnglish.value = p.englishLevel;
      if (p.targetSalaryUsd) {
        if (this.inputProfileSalary) this.inputProfileSalary.value = p.targetSalaryUsd;
        if (this.negCurrentOffer) this.negCurrentOffer.value = p.targetSalaryUsd;
      }
      if (p.dailyHours && this.selectProfileHours) this.selectProfileHours.value = p.dailyHours;
      if (p.currentSummary && this.inputProfileSummary) this.inputProfileSummary.value = p.currentSummary;

      this._updateHeaderMetrics();
    }

    _handleProfileSave() {
      const updated = {
        targetRole: this.inputProfileRole.value.trim(),
        yearsExperience: this.inputProfileYears.value.trim(),
        englishLevel: this.selectProfileEnglish.value,
        targetSalaryUsd: this.inputProfileSalary.value.trim(),
        dailyHours: this.selectProfileHours.value,
        currentSummary: this.inputProfileSummary.value.trim()
      };

      this.engine.saveProfile(updated);
      this._loadCandidateProfileIntoForms();
      this.closeModal('modal-profile');
      this.showToast('Profile saved & 90-day plan calibrated!');
      
      this._addChatMessage('IAN • Remote Career Strategist', `¡Excelente! He calibrado tu perfil para el puesto objetivo: <strong>${updated.targetRole || 'Remote Specialist'}</strong> con expectativa de <strong>$${updated.targetSalaryUsd || '3500'} USD/mes</strong>. Tu siguiente paso es el módulo <strong>ATS CV</strong> para optimizar tus viñetas con la fórmula Google X-Y-Z.`);
    }

    _updateHeaderMetrics() {
      const p = this.engine.getProfile();
      const plan = this.engine.getPlan();
      const totalTasks = plan.reduce((acc, ph) => acc + ph.tasks.length, 0);
      const completedCount = p.completedTasks ? p.completedTasks.length : 0;

      if (this.progressTextDisplay) {
        this.progressTextDisplay.textContent = `${completedCount} / ${totalTasks} Tasks`;
      }
      if (this.salaryDisplay) {
        this.salaryDisplay.textContent = `$${parseInt(p.targetSalaryUsd || 3500).toLocaleString()}/mo USD`;
      }
      if (this.userRoleDisplay) {
        this.userRoleDisplay.textContent = p.targetRole || 'Candidate';
      }
      if (this.userAvatarText) {
        const initials = (p.targetRole || 'Job Hunter').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        this.userAvatarText.textContent = initials || 'JH';
      }
    }

    // ── 90-Day Plan Rendering ──
    _renderPlanRoadmap() {
      const container = document.getElementById('plan-phases-container');
      if (!container) return;

      container.innerHTML = '';
      const plan = this.engine.getPlan();
      const profile = this.engine.getProfile();
      const completedTasks = profile.completedTasks || [];

      plan.forEach(phase => {
        const block = document.createElement('div');
        block.className = 'phase-block';
        block.innerHTML = `
          <div class="phase-header">
            <div class="phase-title-wrap">
              <div class="phase-icon-box" style="background:${phase.color}20; color:${phase.color};">
                <i class="fa-solid ${phase.icon}"></i>
              </div>
              <div>
                <h3 style="font-size:1.05rem; color:#ffffff;">Phase ${phase.phase}: ${phase.phaseName}</h3>
                <span style="font-size:0.75rem; color:var(--text-muted);">${phase.weeks} • ${phase.phaseNameEs}</span>
              </div>
            </div>
            <span class="mono-tag" style="color:${phase.color}; background:${phase.color}15;">Phase ${phase.phase}</span>
          </div>
          <div class="phase-tasks-list">
            ${phase.tasks.map(task => {
              const isChecked = completedTasks.includes(task.id);
              return `
                <div class="task-item-card ${isChecked ? 'completed' : ''}" data-taskid="${task.id}">
                  <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} data-taskid="${task.id}">
                  <div class="task-content">
                    <div class="task-header-row">
                      <span class="task-day-badge">${task.day}</span>
                      <span class="task-duration-badge"><i class="fa-regular fa-clock"></i> ${task.duration}</span>
                    </div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-desc">${task.desc}</div>
                    <button type="button" class="btn-mini" style="margin-top:8px;" onclick="window.JobHunterApp.handleTaskAction('${task.command}')">${task.command}</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;

        // Checkbox events
        block.querySelectorAll('.task-checkbox').forEach(cb => {
          cb.addEventListener('change', (e) => {
            const taskId = e.target.dataset.taskid;
            this.engine.toggleTask(taskId);
            this._renderPlanRoadmap();
            this._updateHeaderMetrics();
            this.showToast('Task status updated');
          });
        });

        container.appendChild(block);
      });
    }

    handleTaskAction(cmd) {
      if (cmd === '/start') this.openModal('modal-profile');
      else if (cmd === '/cv_tailor') this.switchTab('cv');
      else if (cmd === '/linkedin') this.switchTab('linkedin');
      else if (cmd === '/search') this.switchTab('sourcing');
      else if (cmd === '/outreach') this.switchTab('sourcing');
      else if (cmd === '/interview') this.switchTab('interview');
      else if (cmd === '/star') this.switchTab('interview');
      else if (cmd === '/negotiate') this.switchTab('negotiate');
      else if (cmd === '/daily_task') this.showDailyTaskToast();
    }

    showDailyTaskToast() {
      const plan = this.engine.getPlan();
      const p = this.engine.getProfile();
      const completed = p.completedTasks || [];
      
      let nextTask = null;
      for (const phase of plan) {
        for (const t of phase.tasks) {
          if (!completed.includes(t.id)) {
            nextTask = t;
            break;
          }
        }
        if (nextTask) break;
      }

      if (nextTask) {
        this._addChatMessage('IAN • 90-Day Coach', `Tu siguiente tarea para hoy es: <strong>${nextTask.title}</strong> (${nextTask.day}, ${nextTask.duration}).<br><em>${nextTask.desc}</em><br>Comando rápido: <button class="chip-cmd" onclick="window.JobHunterApp.handleTaskAction('${nextTask.command}')">${nextTask.command}</button>`);
        this.switchTab('chat');
      } else {
        this.showToast('🎉 All 90-Day tasks completed! You are fully job-ready.');
      }
    }

    // ── Module 1: ATS CV Tailor ──
    _handleAnalyzeJd() {
      const jd = this.cvJobDesc.value.trim();
      if (!jd) {
        this.showToast('Please paste a job description first.');
        return;
      }

      const p = this.engine.getProfile();
      this.lastJdAnalysis = this.engine.analyzeJobDescription(jd, p.currentSummary || '');
      
      this.matchScoreVal.textContent = `${this.lastJdAnalysis.matchScore}%`;
      this.keywordsCloud.innerHTML = this.lastJdAnalysis.topKeywords.map(kw => `<span class="keyword-pill">${kw}</span>`).join('');
      this.painPointNote.innerHTML = `<strong>Core Hiring Pain Point:</strong> ${this.lastJdAnalysis.corePainPoint}`;
      this.jdAnalysisBox.style.display = 'block';

      this.showToast(`Extracted ${this.lastJdAnalysis.topKeywords.length} key competencies!`);
    }

    _handleGenerateCv() {
      const role = this.cvTargetRole.value.trim() || this.engine.getProfile().targetRole || 'Remote Specialist';
      const profile = Object.assign({}, this.engine.getProfile(), { targetRole: role });
      
      const atsCv = this.engine.generateAtsCv(profile, this.lastJdAnalysis);
      this.atsPreviewCanvas.textContent = atsCv;
      this.showToast('1-Column ATS CV generated successfully!');
    }

    _downloadCv() {
      const content = this.atsPreviewCanvas.textContent;
      if (!content || content.startsWith('Click')) {
        this.showToast('Generate a CV first.');
        return;
      }
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ATS_Resume_${(this.engine.getProfile().targetRole || 'Candidate').replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('CV downloaded as plain text');
    }

    // ── Module 2: LinkedIn Magnet ──
    _handleOptimizeLinkedin() {
      const p = this.engine.getProfile();
      const customProfile = Object.assign({}, p, {
        targetRole: this.liRole.value.trim() || p.targetRole,
        topSkills: this.liSkills.value.trim() || 'SaaS, Client Retention, Async Tools'
      });

      const res = this.engine.generateLinkedInOptimization(customProfile);
      this.liHeadlineText.textContent = res.headline;
      this.liAboutText.textContent = res.about;

      this.liChecklistItems.innerHTML = res.settingsChecklist.map(item => `
        <li style="margin-bottom:6px; font-size:0.8rem; color:var(--text-secondary);">
          <strong style="color:var(--text-primary);">${item.item}:</strong> ${item.status}
        </li>
      `).join('');

      this.showToast('LinkedIn headline & About section optimized!');
    }

    // ── Module 3: Sourcing & Outreach ──
    _handleGenerateBoolean() {
      const role = this.sourcingRole.value.trim() || this.engine.getProfile().targetRole || 'Customer Success Manager';
      const bools = this.engine.generateBooleanSearches(role);

      this.boolLinkedinJobs.textContent = bools.linkedinJobs;
      this.boolGreenhouse.textContent = bools.googleXrayGreenhouse;
      this.booleanResultsArea.style.display = 'block';

      this.showToast('Boolean sourcing strings generated!');
    }

    _renderSourcingPlatforms() {
      if (!this.platformsGrid) return;
      const platforms = this.engine.getPlatforms();
      this.platformsGrid.innerHTML = platforms.map(p => `
        <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="platform-link-card" title="${p.desc}">
          <div class="platform-icon-wrap"><i class="${p.icon}"></i></div>
          <div>
            <div class="platform-info-name">${p.name}</div>
            <div class="platform-info-sub">${p.category}</div>
          </div>
        </a>
      `).join('');
    }

    _handleGenerateOutreach() {
      const manager = this.outreachManager.value.trim() || 'Sarah';
      const company = this.outreachCompany.value.trim() || 'Acme Corp';
      const role = this.engine.getProfile().targetRole || 'Customer Success Manager';
      const achievement = this.outreachAchievement.value.trim() || 'scaled client retention by 18%';

      const seq = this.engine.generateOutreachSequence(manager, company, role, achievement);
      this.outreachTA.textContent = seq.templateA;
      this.outreachTB.textContent = seq.templateB;
      this.outreachTC.textContent = seq.templateC;

      this.showToast('3-Step outreach sequence generated!');
    }

    // ── Module 4: Mock Interview & STAR ──
    _renderInterviewQuestion(idx) {
      if (idx < 0 || idx >= this.questions.length) return;
      this.currentQuestionIndex = idx;
      const q = this.questions[idx];

      this.interviewQIndex.textContent = `Question ${idx + 1} / ${this.questions.length}`;
      this.interviewQType.textContent = q.type;
      this.interviewQText.textContent = q.question;
      this.interviewQGuidance.textContent = q.guidance;
      this.userInterviewAnswer.value = '';
      
      this.feedbackScoreNum.textContent = '--';
      this.feedbackStatusTitle.textContent = 'Awaiting Response';
      this.feedbackCritiqueText.textContent = 'Submit your answer to receive a STAR framework breakdown.';
      this.feedbackModelBox.style.display = 'none';
    }

    _handleNextQuestion() {
      let next = this.currentQuestionIndex + 1;
      if (next >= this.questions.length) next = 0;
      this._renderInterviewQuestion(next);
    }

    _speakCurrentQuestion() {
      const q = this.questions[this.currentQuestionIndex];
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(q.question);
        utterance.lang = 'en-US';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
        this.showToast('Audio playing...');
      } else {
        this.showToast('Speech synthesis not supported in this browser.');
      }
    }

    _handleEvaluateInterview() {
      const ans = this.userInterviewAnswer.value.trim();
      const evalRes = this.engine.evaluateStarResponse(ans);

      this.feedbackScoreNum.textContent = evalRes.score;
      this.feedbackScoreNum.style.color = evalRes.score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-gold)';
      this.feedbackStatusTitle.textContent = evalRes.score >= 80 ? 'High-Impact STAR Delivery' : 'Needs Quantifiable Metrics';
      this.feedbackCritiqueText.textContent = evalRes.critique;

      if (evalRes.modelAnswer) {
        this.feedbackModelText.textContent = evalRes.modelAnswer;
        this.feedbackModelBox.style.display = 'block';
      }

      this.showToast(`STAR Evaluated: ${evalRes.score}/100`);
    }

    // ── Module 5: Salary Negotiation ──
    _handleCalculateNegotiation() {
      const offer = parseFloat(this.negCurrentOffer.value) || 3000;
      const role = this.negTargetRole.value.trim() || 'Remote Specialist';
      const scripts = this.engine.generateNegotiationScripts(offer, role);

      this.counterValHighlight.textContent = `$${scripts.recommendedCounter.toLocaleString()} USD / mo (+12%)`;
      this.negDeflectionText.textContent = scripts.deflectionScript;
      this.negCounterText.textContent = scripts.counterOfferScript;
      this.negPerksText.textContent = scripts.benefitsNegotiationScript;

      this.showToast('Counter-offer calculated (+12%)');
    }

    // ── Module 6: Scam Scanner ──
    _handleRunScamScan() {
      const text = this.inputScamText.value.trim();
      if (!text) {
        this.showToast('Paste the message or offer details first.');
        return;
      }

      const res = this.engine.screenForScams(text);
      let html = '';
      if (res.isSafe) {
        html = `
          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px; color:#34d399;">
            <strong>✓ LOW RISK / SAFE:</strong> No automated scam patterns detected (no Telegram text-only interview or equipment check checks). Always verify the corporate domain before signing contracts.
          </div>
        `;
      } else {
        html = `
          <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:12px; color:#f87171;">
            <strong style="font-size:0.92rem;"><i class="fa-solid fa-triangle-exclamation"></i> WARNING: ${res.riskLevel}</strong>
            <ul style="margin-top:8px; padding-left:18px; font-size:0.8rem; line-height:1.5;">
              ${res.redFlags.map(rf => `<li>${rf}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      this.scamResultsBox.innerHTML = html;
      this.scamResultsBox.style.display = 'block';
      this.showToast('Scam scan finished');
    }

    // ── Chat & Slash Commands ──
    sendQuickCommand(cmd) {
      if (this.chatInputField) {
        this.chatInputField.value = cmd;
        this._handleChatSubmit();
      }
    }

    _handleChatSubmit() {
      const text = this.chatInputField.value.trim();
      if (!text) return;

      this._addChatMessage('You', text, true);
      this.chatInputField.value = '';

      // Command dispatch
      setTimeout(() => {
        this._processAgentCommand(text);
      }, 300);
    }

    _processAgentCommand(input) {
      const clean = input.toLowerCase().trim();

      if (clean === '/start') {
        this.openModal('modal-profile');
        this._addChatMessage('IAN • Strategist', 'Abriendo el formulario de calibración de perfil. Completa tus puestos objetivo, nivel de inglés y expectativa salarial.');
      } else if (clean.startsWith('/cv_tailor')) {
        this.switchTab('cv');
        this._addChatMessage('IAN • Strategist', 'Te he llevado al módulo <strong>ATS CV Tailor</strong>. Pega la descripción de la vacante para analizar las 10 competencias clave y generar tu CV en 1 columna sin gráficos.');
      } else if (clean === '/linkedin') {
        this.switchTab('linkedin');
        this._addChatMessage('IAN • Strategist', 'Cargando el optimizador de <strong>LinkedIn Magnet</strong>. Aquí generamos tu titular de alto impacto y tu sección Acerca de en 4 partes.');
      } else if (clean === '/search') {
        this.switchTab('sourcing');
        this._addChatMessage('IAN • Strategist', 'Abriendo el generador de búsquedas Booleanas y directorio de startups en Greenhouse/Lever.');
      } else if (clean === '/outreach') {
        this.switchTab('sourcing');
        this._addChatMessage('IAN • Strategist', 'Aquí tienes la secuencia de 3 pasos para contactar directamente a los Hiring Managers por LinkedIn.');
      } else if (clean === '/interview' || clean === '/star') {
        this.switchTab('interview');
        this._addChatMessage('IAN • Strategist', 'Iniciando el simulador de entrevistas STAR. Puedes escuchar cada pregunta con el botón de audio y practicar tu respuesta.');
      } else if (clean === '/negotiate') {
        this.switchTab('negotiate');
        this._addChatMessage('IAN • Strategist', 'Calculando rangos de contraoferta (+12%) y scripts de negociación salarial y beneficios para contratistas remotos (W-8BEN).');
      } else if (clean === '/daily_task') {
        this.showDailyTaskToast();
      } else {
        // Conversational response
        const p = this.engine.getProfile();
        this._addChatMessage('IAN • Strategist', `Entendido. Para tu objetivo de puesto <strong>${p.targetRole || 'remoto'}</strong>, recuerda nuestra regla de oro: <em>"Trabajar remoto no es suerte, es estrategia."</em> Nunca envíes aplicaciones genéricas masivas ("spray and pray"). En su lugar, selecciona 1–2 vacantes al día, adapta las palabras clave en <button class="chip-cmd" onclick="window.JobHunterApp.switchTab('cv')">/cv_tailor</button> y contacta al Hiring Manager en <button class="chip-cmd" onclick="window.JobHunterApp.switchTab('sourcing')">/outreach</button>.`);
      }
    }

    _addChatMessage(sender, htmlContent, isUser = false) {
      if (!this.chatMessagesStream) return;
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'agent-bubble'}`;
      bubble.innerHTML = `
        <div class="bubble-sender" style="${isUser ? 'color:#ffffff;' : ''}">${sender}</div>
        <div class="bubble-content">${htmlContent}</div>
      `;
      this.chatMessagesStream.appendChild(bubble);
      this.chatMessagesStream.scrollTop = this.chatMessagesStream.scrollHeight;
    }

    copyText(elementId) {
      const el = document.getElementById(elementId);
      if (!el) return;
      const text = el.textContent || el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('Copied to clipboard!');
      }).catch(() => {
        this.showToast('Could not copy text.');
      });
    }

    showToast(message) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'toast-item';
      toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> <span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  }

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.JobHunterApp = new JobHunterApp();
  });
})();
