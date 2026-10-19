/**
 * JobHunter — The Remote Job System & AI Job Search Hybrid Controller
 * Powered by IAN (Remote Career Strategist & Technical Headhunter)
 * Blended with MadsLorentzen/ai-job-search 5-Dimension Rubric & Application Suite
 */

(function () {
  'use strict';

  class JobHunterApp {
    constructor() {
      this.engine = new window.IanEngine.RemoteJobEngine();
      this.currentQuestionIndex = 0;
      this.questions = this.engine.getMockQuestions();
      this.lastJdAnalysis = null;
      this.currentSelectedJob = null;
      this.activeMatchFilter = 90; // Default to 90%-100% full compatibility
      this.activeLocationFilter = 'all';
      this.activeSortFilter = 'reputation';
      this.activePipelineFilter = 'all';
      
      this._initDOMElements();
      this._bindEvents();
      this._renderPlanRoadmap();
      this._renderSourcingPlatforms();
      this._initOmniSearcher();
      this._updateHeaderMetrics();
      this._loadCandidateProfileIntoForms();
      this._renderInterviewQuestion(0);
      this._renderPipelineView();
    }

    _initDOMElements() {
      // Nav buttons & Views
      this.navButtons = document.querySelectorAll('.rail-btn[data-tab]');
      this.tabViews = document.querySelectorAll('.tab-view');
      this.headerModuleName = document.getElementById('header-module-name');
      this.progressTextDisplay = document.getElementById('progress-text-display');
      this.salaryDisplay = document.getElementById('salary-display');
      this.userRoleDisplay = document.getElementById('user-role-display');
      this.userAvatarText = document.getElementById('user-avatar-text');
      this.btnHeader1ClickMatch = document.getElementById('btn-header-1click-match');

      // Omni-Searcher elements
      this.omniSearchQuery = document.getElementById('omni-search-query');
      this.omniFilterCategory = document.getElementById('omni-filter-category');
      this.omniFilterLocation = document.getElementById('omni-filter-location');
      this.btnRunOmniSearch = document.getElementById('btn-run-omni-search');
      this.btnLaunchAllBoards = document.getElementById('btn-launch-all-boards');
      this.multiBoardChipsGrid = document.getElementById('multi-board-chips-grid');
      this.jobsCardsGrid = document.getElementById('jobs-cards-grid');
      this.jobsCountText = document.getElementById('jobs-count-text');
      this.searchFilterChips = document.getElementById('search-filter-chips');

      // Pipeline elements
      this.pipeStatTotal = document.getElementById('pipe-stat-total');
      this.pipeStatFollowup = document.getElementById('pipe-stat-followup');
      this.pipeStatInterview = document.getElementById('pipe-stat-interview');
      this.pipeStatAvgMatch = document.getElementById('pipe-stat-avgmatch');
      this.pipelineItemsList = document.getElementById('pipeline-items-list');

      // Modals
      this.modalProfile = document.getElementById('modal-profile');
      this.modalScam = document.getElementById('modal-scam');
      this.modalRankApply = document.getElementById('modal-rank-apply');
      this.btnCloseProfile = document.getElementById('btn-close-modal-profile');
      this.btnCloseScam = document.getElementById('btn-close-modal-scam');
      this.btnCloseRankApply = document.getElementById('btn-close-modal-rank-apply');
      this.btnFooterCloseRankApply = document.getElementById('mra-btn-close-footer');
      this.btnOpenSettings = document.getElementById('btn-open-settings');
      this.btnHeaderProfile = document.getElementById('btn-header-profile');
      this.btnOpenScamScanner = document.getElementById('btn-open-scam-scanner');

      // Rank & Apply Modal elements
      this.mraRoleTitle = document.getElementById('mra-role-title');
      this.mraCompanyName = document.getElementById('mra-company-name');
      this.mraGlassdoorBadge = document.getElementById('mra-glassdoor-badge');
      this.mraTierBadge = document.getElementById('mra-tier-badge');
      this.mraMatchBadge = document.getElementById('mra-match-badge');
      this.mraTabsNav = document.getElementById('mra-tabs-nav');
      this.mraRubricGrid = document.getElementById('mra-rubric-grid');
      this.mraStrengthsList = document.getElementById('mra-strengths-list');
      this.mraGapsList = document.getElementById('mra-gaps-list');
      this.mraCvText = document.getElementById('mra-cv-text');
      this.mraBtnCopyCv = document.getElementById('mra-btn-copy-cv');
      this.mraBtnDlCv = document.getElementById('mra-btn-dl-cv');
      this.mraCoverText = document.getElementById('mra-cover-text');
      this.mraBtnCopyCover = document.getElementById('mra-btn-copy-cover');
      this.mraDossierMission = document.getElementById('mra-dossier-mission');
      this.mraDossierQuestions = document.getElementById('mra-dossier-questions');
      this.mraEmailsContainer = document.getElementById('mra-emails-container');
      this.mraBtnAddPipeline = document.getElementById('mra-btn-add-pipeline');
      this.mraBtnOpenAts = document.getElementById('mra-btn-open-ats');

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

      // 1-Click Header Match Button
      if (this.btnHeader1ClickMatch) {
        this.btnHeader1ClickMatch.addEventListener('click', () => {
          this.trigger1ClickAiMatch();
        });
      }

      // Profile modal triggers
      if (this.btnOpenSettings) this.btnOpenSettings.addEventListener('click', () => this.openModal('modal-profile'));
      if (this.btnHeaderProfile) this.btnHeaderProfile.addEventListener('click', () => this.openModal('modal-profile'));
      if (this.btnCloseProfile) this.btnCloseProfile.addEventListener('click', () => this.closeModal('modal-profile'));

      // Scam modal triggers
      if (this.btnOpenScamScanner) this.btnOpenScamScanner.addEventListener('click', () => this.openModal('modal-scam'));
      if (this.btnCloseScam) this.btnCloseScam.addEventListener('click', () => this.closeModal('modal-scam'));

      // Rank & Apply modal triggers
      if (this.btnCloseRankApply) this.btnCloseRankApply.addEventListener('click', () => this.closeModal('modal-rank-apply'));
      if (this.btnFooterCloseRankApply) this.btnFooterCloseRankApply.addEventListener('click', () => this.closeModal('modal-rank-apply'));

      // Modal tabs switching
      if (this.mraTabsNav) {
        this.mraTabsNav.querySelectorAll('.modal-tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const targetTab = btn.dataset.mraTab;
            this.switchMraTab(targetTab);
          });
        });
      }

      // Profile form submit
      if (this.formProfile) {
        this.formProfile.addEventListener('submit', (e) => {
          e.preventDefault();
          this._handleProfileSave();
        });
      }

      // CV Tailor events
      if (this.btnAnalyzeJd) this.btnAnalyzeJd.addEventListener('click', () => this._handleAnalyzeJd());
      if (this.btnGenerateCv) this.btnGenerateCv.addEventListener('click', () => this._handleGenerateCv());
      if (this.btnCopyCv) this.btnCopyCv.addEventListener('click', () => this.copyText('ats-preview-canvas'));
      if (this.btnDownloadCv) this.btnDownloadCv.addEventListener('click', () => this._downloadCv());
      if (this.btnPrintCv) this.btnPrintCv.addEventListener('click', () => window.print());

      // LinkedIn events
      if (this.btnOptimizeLinkedin) this.btnOptimizeLinkedin.addEventListener('click', () => this._handleOptimizeLinkedin());
      if (this.btnCopyLinkedin) this.btnCopyLinkedin.addEventListener('click', () => this.copyText('li-about-text'));

      // Sourcing events
      if (this.btnGenerateBoolean) this.btnGenerateBoolean.addEventListener('click', () => this._handleGenerateBoolean());
      if (this.btnGenerateOutreach) this.btnGenerateOutreach.addEventListener('click', () => this._handleGenerateOutreach());

      // Interview events
      if (this.btnEvaluateAnswer) this.btnEvaluateAnswer.addEventListener('click', () => this._handleEvaluateInterview());
      if (this.btnNextQuestion) this.btnNextQuestion.addEventListener('click', () => this._handleNextQuestion());
      if (this.btnSpeakQuestion) this.btnSpeakQuestion.addEventListener('click', () => this._speakCurrentQuestion());

      // Negotiation events
      if (this.btnCalculateNegotiation) this.btnCalculateNegotiation.addEventListener('click', () => this._handleCalculateNegotiation());

      // Chat events
      if (this.chatInputForm) {
        this.chatInputForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this._handleChatSubmit();
        });
      }

      // Scam check button
      if (this.btnRunScamScan) this.btnRunScamScan.addEventListener('click', () => this._handleRunScamScan());

      // Modal copy actions
      if (this.mraBtnCopyCv) this.mraBtnCopyCv.addEventListener('click', () => this.copyText('mra-cv-text'));
      if (this.mraBtnDlCv) this.mraBtnDlCv.addEventListener('click', () => this._downloadMraCv());
      if (this.mraBtnCopyCover) this.mraBtnCopyCover.addEventListener('click', () => this.copyText('mra-cover-text'));
      if (this.mraBtnAddPipeline) {
        this.mraBtnAddPipeline.addEventListener('click', () => {
          if (this.currentSelectedJob) {
            this.engine.addToPipeline(this.currentSelectedJob, this.currentSelectedJob.fit);
            this._renderPipelineView();
            this.showToast('🎉 Tracked in Pipeline! 5-Day Follow-Up Scheduled.');
            this.closeModal('modal-rank-apply');
          }
        });
      }
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
        searcher: 'Job Searcher (Omni-Board)',
        pipeline: 'Application Pipeline',
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

      if (tabId === 'pipeline') {
        this._renderPipelineView();
      }
    }

    switchMraTab(tabKey) {
      if (!this.modalRankApply) return;
      this.modalRankApply.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mraTab === tabKey);
      });
      this.modalRankApply.querySelectorAll('.modal-tab-pane').forEach(p => {
        p.classList.toggle('active', p.id === `mra-pane-${tabKey}`);
      });
    }

    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    }

    // ── 1-Click AI Match Trigger ──
    trigger1ClickAiMatch() {
      this.switchTab('searcher');
      this.activeMatchFilter = 90;
      
      // Update filter chips visual
      if (this.searchFilterChips) {
        this.searchFilterChips.querySelectorAll('.filter-chip-btn').forEach(btn => {
          if (btn.dataset.matchFilter === '90') {
            btn.classList.add('active');
          } else if (btn.dataset.matchFilter === 'all') {
            btn.classList.remove('active');
          }
        });
      }

      this._runOmniSearch();
      this.showToast('⚡ 1-Click AI Match: Surface top 90%–100% compatible remote opportunities in Mexico & abroad!');
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
      this.showToast('Profile calibrated! Target set to: ' + (updated.targetRole || 'Remote Lead'));
      
      this._addChatMessage('IAN • Remote Career Strategist', `¡Excelente! He calibrado tu perfil para el puesto objetivo: <strong>${updated.targetRole}</strong> con expectativa de <strong>$${updated.targetSalaryUsd || '5000'} USD/mes</strong>. Tu siguiente paso es probar el <strong>1-Click AI Match</strong> para descubrir puestos 100% compatibles.`);
      this._runOmniSearch();
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
        this.salaryDisplay.textContent = `$${parseInt(p.targetSalaryUsd || 5000).toLocaleString()}/mo USD`;
      }
      if (this.userRoleDisplay) {
        this.userRoleDisplay.textContent = p.fullName || 'Alberto Yépiz';
      }
      if (this.userAvatarText) {
        const initials = (p.fullName || 'Alberto Yépiz').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        this.userAvatarText.textContent = initials || 'AY';
      }
    }

    // ─────────────────────────────────────────────────────────────
    // OMNI-SEARCHER & HYBRID JOB STREAM
    // ─────────────────────────────────────────────────────────────
    _initOmniSearcher() {
      this._renderMultiBoardChips();

      if (this.btnRunOmniSearch) {
        this.btnRunOmniSearch.addEventListener('click', () => this._runOmniSearch());
      }

      if (this.omniSearchQuery) {
        this.omniSearchQuery.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this._runOmniSearch();
          }
        });
      }

      if (this.btnLaunchAllBoards) {
        this.btnLaunchAllBoards.addEventListener('click', () => this._handleLaunchAllBoards());
      }

      // Filter Chips Binding
      if (this.searchFilterChips) {
        this.searchFilterChips.querySelectorAll('.filter-chip-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            if (btn.dataset.matchFilter) {
              this.searchFilterChips.querySelectorAll('[data-match-filter]').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              this.activeMatchFilter = btn.dataset.matchFilter === 'all' ? 0 : 90;
            } else if (btn.dataset.locationFilter) {
              btn.classList.toggle('active');
              this.activeLocationFilter = btn.classList.contains('active') ? 'mexico' : 'all';
            } else if (btn.dataset.sortFilter) {
              btn.classList.toggle('active');
              this.activeSortFilter = btn.classList.contains('active') ? 'reputation' : 'fit';
            }
            this._runOmniSearch();
          });
        });
      }

      // Initial run
      this._runOmniSearch();
    }

    _renderMultiBoardChips() {
      if (!this.multiBoardChipsGrid) return;
      const role = this.engine.getProfile().targetRole || 'Senior Full-Stack Engineer';
      const links = this.engine.generateLookupEverywhereLinks(role);

      this.multiBoardChipsGrid.innerHTML = links.map(l => `
        <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="board-chip" title="Direct search on ${l.name}">
          <i class="${l.icon}" style="color:${l.color};"></i>
          <span class="board-chip-name">${l.name}</span>
          <span class="board-chip-badge">${l.badge}</span>
        </a>
      `).join('');
    }

    async _runOmniSearch() {
      if (!this.jobsCardsGrid) return;
      const query = this.omniSearchQuery ? this.omniSearchQuery.value.trim() : '';
      const category = this.omniFilterCategory ? this.omniFilterCategory.value : 'all';

      this.jobsCardsGrid.innerHTML = `
        <div style="text-align:center; padding:32px 14px; color:var(--text-muted);">
          <i class="fa-solid fa-spinner fa-spin" style="font-size:1.8rem; color:var(--accent-emerald); margin-bottom:12px;"></i>
          <p style="font-size:0.86rem;">Scanning remote feeds & evaluating compatibility across 5 dimensions...</p>
        </div>
      `;

      try {
        const jobs = await this.engine.searchLiveJobs(query, category, this.activeLocationFilter, this.activeMatchFilter);
        this._renderJobsStream(jobs);
      } catch (e) {
        console.error('Error fetching jobs:', e);
        const fallback = this.engine.getCuratedHighMatchJobs();
        this._renderJobsStream(fallback);
      }
    }

    _renderJobsStream(jobs) {
      if (!this.jobsCardsGrid) return;

      if (!jobs || jobs.length === 0) {
        this.jobsCardsGrid.innerHTML = `
          <div style="text-align:center; padding:36px 14px; color:var(--text-muted); background:var(--bg-surface); border:1.5px solid var(--border); border-radius:var(--radius-lg);">
            <i class="fa-solid fa-filter-circle-xmark" style="font-size:2rem; margin-bottom:12px; color:var(--accent-gold);"></i>
            <p style="font-size:0.92rem; color:var(--text-primary); font-weight:700;">No postings matched the strict 90%+ filter.</p>
            <p style="font-size:0.82rem; margin-top:6px;">Try switching to "All Remote Openings" or expanding search terms.</p>
          </div>
        `;
        if (this.jobsCountText) this.jobsCountText.textContent = '0 jobs found matching criteria';
        return;
      }

      if (this.jobsCountText) {
        this.jobsCountText.innerHTML = `Showing <strong>${jobs.length} high-intent remote openings</strong> calibrated for your profile`;
      }

      this.jobsCardsGrid.innerHTML = jobs.map((job, idx) => {
        const fit = job.fit || this.engine.evaluateJobFit(job, this.engine.getProfile());
        const rep = fit.reputation;
        const tierClass = fit.overallScore >= 95 ? 'match-tier-perfect' : (fit.overallScore >= 90 ? 'match-tier-high' : 'match-tier-strong');

        return `
          <div class="job-card-item" data-jobindex="${idx}">
            <div class="job-card-top-row">
              <div class="job-title-company">
                <h3>${job.title}</h3>
                <div class="reputation-tag-row">
                  <span class="job-company-badge"><i class="fa-solid fa-building"></i> ${job.company}</span>
                  <span class="reputation-pill glassdoor"><i class="fa-solid fa-star"></i> ${rep.glassdoorRating} Glassdoor</span>
                  <span class="reputation-pill tier">${rep.tier}</span>
                  <span class="reputation-pill ats"><i class="fa-solid fa-check"></i> ${rep.atsBadge}</span>
                </div>
              </div>

              <div class="job-meta-badges">
                <span class="match-score-badge ${tierClass}" title="Calculated using MadsLorentzen 5-Dimension Rubric">
                  <i class="fa-solid fa-bolt-lightning"></i> ${fit.overallScore}% Fit
                </span>
                <span class="job-location-pill"><i class="fa-solid fa-globe"></i> ${job.location}</span>
                <span class="job-salary-pill"><i class="fa-solid fa-dollar-sign"></i> ${job.salary}</span>
              </div>
            </div>

            <div class="job-desc-snippet">${job.description || 'Autonomous engineering and systems role.'}</div>

            <div class="job-tags-row">
              ${(job.tags || []).map(t => `<span class="keyword-pill">${t}</span>`).join('')}
            </div>

            <div class="job-actions-row">
              <div style="font-size:0.75rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-shield-halved" style="color:var(--accent-emerald);"></i> 100% Remote • W-8BEN / EOR Friendly • Direct Contract
              </div>

              <div class="job-action-buttons">
                <button type="button" class="btn-primary btn-rank-apply" data-jobid="${job.id || idx}">
                  <i class="fa-solid fa-bolt"></i>
                  <span>Rank & Apply Suite</span>
                </button>
                <a href="${job.url}" target="_blank" rel="noopener noreferrer" class="btn-secondary" title="View Direct on ATS Board">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>ATS Link</span>
                </a>
                <button type="button" class="btn-secondary btn-quick-track" data-jobid="${job.id || idx}" title="Save to Pipeline">
                  <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Bind Rank & Apply buttons
      this.jobsCardsGrid.querySelectorAll('.btn-rank-apply').forEach(btn => {
        btn.addEventListener('click', () => {
          const jobId = btn.dataset.jobid;
          const targetJob = jobs.find(j => (j.id || '') == jobId) || jobs[parseInt(jobId) || 0];
          if (targetJob) {
            this.openRankApplyModal(targetJob);
          }
        });
      });

      // Bind Quick Track buttons
      this.jobsCardsGrid.querySelectorAll('.btn-quick-track').forEach(btn => {
        btn.addEventListener('click', () => {
          const jobId = btn.dataset.jobid;
          const targetJob = jobs.find(j => (j.id || '') == jobId) || jobs[parseInt(jobId) || 0];
          if (targetJob) {
            this.engine.addToPipeline(targetJob, targetJob.fit);
            this._renderPipelineView();
            this.showToast(`Saved "${targetJob.title}" to Pipeline!`);
          }
        });
      });
    }

    _handleLaunchAllBoards() {
      const role = this.omniSearchQuery.value.trim() || this.engine.getProfile().targetRole || 'Senior Full-Stack Engineer';
      const links = this.engine.generateLookupEverywhereLinks(role);
      links.slice(0, 4).forEach(l => window.open(l.url, '_blank'));
      this.showToast('Opened top 4 startup boards in new tabs');
    }

    // ─────────────────────────────────────────────────────────────
    // RANK & APPLY SUITE MODAL (Drafter + Reviewer Artifacts)
    // ─────────────────────────────────────────────────────────────
    openRankApplyModal(job) {
      this.currentSelectedJob = job;
      const profile = this.engine.getProfile();
      const fit = job.fit || this.engine.evaluateJobFit(job, profile);
      const rep = fit.reputation;

      // Header Lockup
      if (this.mraRoleTitle) this.mraRoleTitle.textContent = job.title;
      if (this.mraCompanyName) this.mraCompanyName.textContent = job.company;
      if (this.mraGlassdoorBadge) this.mraGlassdoorBadge.innerHTML = `<i class="fa-solid fa-star"></i> ${rep.glassdoorRating} Glassdoor`;
      if (this.mraTierBadge) this.mraTierBadge.textContent = rep.tier;
      if (this.mraMatchBadge) {
        this.mraMatchBadge.innerHTML = `<i class="fa-solid fa-bolt-lightning"></i> ${fit.overallScore}% Fit (${fit.verdict})`;
        this.mraMatchBadge.className = `match-score-badge ${fit.overallScore >= 95 ? 'match-tier-perfect' : 'match-tier-high'}`;
      }

      // Pane 1: Fit Rubric Grid
      if (this.mraRubricGrid) {
        this.mraRubricGrid.innerHTML = `
          <div class="rubric-metric-card">
            <div class="rubric-metric-label">
              <span>Technical Match (30%)</span>
              <strong>${fit.techScore}/100</strong>
            </div>
            <div class="rubric-metric-bar"><div class="rubric-metric-fill" style="width:${fit.techScore}%;"></div></div>
          </div>
          <div class="rubric-metric-card">
            <div class="rubric-metric-label">
              <span>Experience & Domain (25%)</span>
              <strong>${fit.expScore}/100</strong>
            </div>
            <div class="rubric-metric-bar"><div class="rubric-metric-fill" style="width:${fit.expScore}%;"></div></div>
          </div>
          <div class="rubric-metric-card">
            <div class="rubric-metric-label">
              <span>Culture & Autonomy (15%)</span>
              <strong>${fit.behaviorScore}/100</strong>
            </div>
            <div class="rubric-metric-bar"><div class="rubric-metric-fill" style="width:${fit.behaviorScore}%;"></div></div>
          </div>
          <div class="rubric-metric-card">
            <div class="rubric-metric-label">
              <span>Career & Compensation (30%)</span>
              <strong>${fit.careerScore}/100</strong>
            </div>
            <div class="rubric-metric-bar"><div class="rubric-metric-fill" style="width:${fit.careerScore}%;"></div></div>
          </div>
          <div class="rubric-metric-card" style="grid-column:1 / -1; background:#f8fafc; border:1.5px solid var(--border);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <span style="font-size:0.78rem; color:var(--accent-teal); font-weight:700;"><i class="fa-solid fa-passport"></i> Location Gate: ${fit.locationGate} (${job.location})</span>
              <span style="font-size:0.78rem; color:var(--accent-teal); font-weight:700;"><i class="fa-solid fa-language"></i> Language Gate: ${fit.languageGate} (English C1+ Bilingual)</span>
              <span style="font-size:0.78rem; color:#b45309; font-weight:700;"><i class="fa-solid fa-shield"></i> Scam Risk: ${rep.scamRisk}</span>
            </div>
          </div>
        `;
      }

      // Strengths & Gaps
      if (this.mraStrengthsList) {
        this.mraStrengthsList.innerHTML = fit.strengths.map(s => `<li>${s}</li>`).join('');
      }
      if (this.mraGapsList) {
        this.mraGapsList.innerHTML = fit.gaps.map(g => `<li>${g}</li>`).join('');
      }

      // Pane 2: Tailored ATS CV
      const tailoredCv = this.engine.generateTailoredCvForJob(job, profile);
      if (this.mraCvText) this.mraCvText.textContent = tailoredCv;

      // Pane 3: Cover Letter
      const coverLetter = this.engine.generateCoverLetterForJob(job, profile);
      if (this.mraCoverText) this.mraCoverText.textContent = coverLetter;

      // Pane 4: Company Dossier
      const dossier = this.engine.generateCompanyDossier(job);
      if (this.mraDossierMission) this.mraDossierMission.textContent = dossier.missionSummary;
      if (this.mraDossierQuestions) {
        this.mraDossierQuestions.innerHTML = dossier.suggestedReverseQuestions.map(q => `<li>"${q}"</li>`).join('');
      }

      // Pane 5: Follow-Up Emails Suite
      const emailSeq = this.engine.generateFollowUpEmailSequence(job, profile);
      if (this.mraEmailsContainer) {
        this.mraEmailsContainer.innerHTML = `
          <!-- Touchpoint 1 -->
          <div class="email-card-box">
            <div class="email-card-header">
              <div class="email-card-title"><i class="fa-solid fa-paper-plane" style="color:var(--accent-emerald);"></i> ${emailSeq.touchpoint1.title}</div>
              <div class="email-actions-row">
                <a href="${emailSeq.touchpoint1.mailtoUrl}" class="btn-mini" target="_blank"><i class="fa-solid fa-envelope"></i> Open in Gmail</a>
                <button type="button" class="btn-mini" onclick="navigator.clipboard.writeText(document.getElementById('email-body-1').innerText); window.JobHunterApp.showToast('Copied Touchpoint 1!');"><i class="fa-regular fa-copy"></i> Copy</button>
              </div>
            </div>
            <div class="email-subject-line">Subject: ${emailSeq.touchpoint1.subject}</div>
            <div class="email-body-text" id="email-body-1">${emailSeq.touchpoint1.body}</div>
          </div>

          <!-- Touchpoint 2 -->
          <div class="email-card-box">
            <div class="email-card-header">
              <div class="email-card-title"><i class="fa-solid fa-clock-rotate-left" style="color:var(--accent-gold);"></i> ${emailSeq.touchpoint2.title}</div>
              <div class="email-actions-row">
                <a href="${emailSeq.touchpoint2.mailtoUrl}" class="btn-mini" target="_blank"><i class="fa-solid fa-envelope"></i> Open in Gmail</a>
                <button type="button" class="btn-mini" onclick="navigator.clipboard.writeText(document.getElementById('email-body-2').innerText); window.JobHunterApp.showToast('Copied Touchpoint 2!');"><i class="fa-regular fa-copy"></i> Copy</button>
              </div>
            </div>
            <div class="email-subject-line">Subject: ${emailSeq.touchpoint2.subject}</div>
            <div class="email-body-text" id="email-body-2">${emailSeq.touchpoint2.body}</div>
          </div>

          <!-- Touchpoint 3 -->
          <div class="email-card-box">
            <div class="email-card-header">
              <div class="email-card-title"><i class="fa-solid fa-handshake-angle" style="color:var(--accent-cyan);"></i> ${emailSeq.touchpoint3.title}</div>
              <div class="email-actions-row">
                <a href="${emailSeq.touchpoint3.mailtoUrl}" class="btn-mini" target="_blank"><i class="fa-solid fa-envelope"></i> Open in Gmail</a>
                <button type="button" class="btn-mini" onclick="navigator.clipboard.writeText(document.getElementById('email-body-3').innerText); window.JobHunterApp.showToast('Copied Touchpoint 3!');"><i class="fa-regular fa-copy"></i> Copy</button>
              </div>
            </div>
            <div class="email-subject-line">Subject: ${emailSeq.touchpoint3.subject}</div>
            <div class="email-body-text" id="email-body-3">${emailSeq.touchpoint3.body}</div>
          </div>

          <!-- LinkedIn Note -->
          <div class="email-card-box">
            <div class="email-card-header">
              <div class="email-card-title"><i class="fa-brands fa-linkedin" style="color:#0a66c2;"></i> ${emailSeq.linkedinNote.title}</div>
              <button type="button" class="btn-mini" onclick="navigator.clipboard.writeText(document.getElementById('email-body-li').innerText); window.JobHunterApp.showToast('Copied LinkedIn Note!');"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>
            <div class="email-body-text" id="email-body-li">${emailSeq.linkedinNote.text}</div>
          </div>
        `;
      }

      // External ATS link
      if (this.mraBtnOpenAts) {
        this.mraBtnOpenAts.href = job.url;
      }

      // Reset to Tab 1
      this.switchMraTab('scorecard');
      this.openModal('modal-rank-apply');
    }

    _downloadMraCv() {
      if (!this.mraCvText) return;
      const content = this.mraCvText.textContent;
      const role = (this.currentSelectedJob && this.currentSelectedJob.title) || 'Candidate';
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ATS_Resume_${role.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('Downloaded tailored ATS resume (.txt)');
    }

    // ─────────────────────────────────────────────────────────────
    // APPLICATION PIPELINE TRACKER VIEW
    // ─────────────────────────────────────────────────────────────
    _renderPipelineView() {
      if (!this.pipelineItemsList) return;
      const pipeline = this.engine.getPipeline();

      // Stats
      const total = pipeline.length;
      const followUps = pipeline.filter(p => p.status === 'Follow-up Due' || p.status === 'Applied').length;
      const interviews = pipeline.filter(p => p.status === 'Interviewing').length;
      const avgScore = total > 0 ? Math.round(pipeline.reduce((acc, p) => acc + (p.matchScore || 90), 0) / total) : 96;

      if (this.pipeStatTotal) this.pipeStatTotal.textContent = total;
      if (this.pipeStatFollowup) this.pipeStatFollowup.textContent = followUps;
      if (this.pipeStatInterview) this.pipeStatInterview.textContent = interviews;
      if (this.pipeStatAvgMatch) this.pipeStatAvgMatch.textContent = `${avgScore}%`;

      // Filtered items
      let items = pipeline;
      if (this.activePipelineFilter && this.activePipelineFilter !== 'all') {
        items = pipeline.filter(p => p.status === this.activePipelineFilter);
      }

      if (items.length === 0) {
        this.pipelineItemsList.innerHTML = `
          <div style="text-align:center; padding:32px 14px; color:var(--text-muted); background:var(--bg-surface); border:1.5px solid var(--border); border-radius:var(--radius-lg);">
            <i class="fa-solid fa-clipboard-list" style="font-size:2rem; margin-bottom:12px; color:var(--primary);"></i>
            <p style="font-size:0.92rem; color:var(--text-primary); font-weight:700;">No applications in this pipeline stage.</p>
            <p style="font-size:0.82rem; margin-top:4px;">Use <strong>"1-Click AI Match"</strong> or the Job Searcher to rank and track applications.</p>
          </div>
        `;
        return;
      }

      this.pipelineItemsList.innerHTML = items.map(item => {
        const statusClass = item.status === 'Applied' ? 'status-applied' :
                            item.status === 'Follow-up Due' ? 'status-followup' :
                            item.status === 'Interviewing' ? 'status-interviewing' :
                            item.status === 'Offered' ? 'status-offered' : 'status-applied';

        return `
          <div class="pipeline-item-card" data-appid="${item.id}">
            <div style="display:flex; flex-direction:column; gap:4px; max-width:400px;">
              <h4 style="font-size:1.05rem; color:var(--text-primary); font-weight:700;">${item.title}</h4>
              <div style="font-size:0.82rem; color:var(--primary); font-weight:700;">
                <i class="fa-solid fa-building"></i> ${item.company} • <i class="fa-solid fa-star" style="color:#d97706;"></i> ${item.glassdoorRating || 4.8}
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">
                Applied: <strong>${item.appliedDate}</strong> • Next Follow-up: <strong style="color:#fbbf24;">${item.followUpDate} 🔥</strong>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="match-score-badge match-tier-perfect">
                <i class="fa-solid fa-bolt"></i> ${item.matchScore}% Match
              </span>

              <select class="select-filter pipeline-status-select" data-appid="${item.id}" style="padding:4px 8px; font-size:0.76rem;">
                <option value="Applied" ${item.status === 'Applied' ? 'selected' : ''}>Status: Applied</option>
                <option value="Follow-up Due" ${item.status === 'Follow-up Due' ? 'selected' : ''}>Status: Follow-up Due 🔥</option>
                <option value="Interviewing" ${item.status === 'Interviewing' ? 'selected' : ''}>Status: Interviewing</option>
                <option value="Offered" ${item.status === 'Offered' ? 'selected' : ''}>Status: Offer Received 🎉</option>
              </select>

              <button type="button" class="btn-mini btn-pipe-email" data-appid="${item.id}" title="Launch Day 5 Follow-Up Email">
                <i class="fa-solid fa-paper-plane" style="color:var(--accent-emerald);"></i> Follow-up
              </button>

              <button type="button" class="btn-mini btn-pipe-delete" data-appid="${item.id}" title="Remove from Pipeline">
                <i class="fa-regular fa-trash-can" style="color:#ef4444;"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Bind status changes
      this.pipelineItemsList.querySelectorAll('.pipeline-status-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const id = e.target.dataset.appid;
          this.engine.updatePipelineStatus(id, e.target.value);
          this._renderPipelineView();
          this.showToast('Application status updated to ' + e.target.value);
        });
      });

      // Bind follow-up email trigger
      this.pipelineItemsList.querySelectorAll('.btn-pipe-email').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.appid;
          const app = pipeline.find(p => p.id === id);
          if (app) {
            const emailSeq = this.engine.generateFollowUpEmailSequence(app);
            window.open(emailSeq.touchpoint2.mailtoUrl, '_blank');
            this.showToast('Launching Day 5 Follow-Up Email draft in Gmail!');
          }
        });
      });

      // Bind delete button
      this.pipelineItemsList.querySelectorAll('.btn-pipe-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.appid;
          this.engine.removePipelineItem(id);
          this._renderPipelineView();
          this.showToast('Removed from Pipeline');
        });
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 90-DAY PLAN & INTERVIEWS (The Remote Job System)
    // ─────────────────────────────────────────────────────────────
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
                <h3 style="font-size:1.05rem; color:var(--text-primary); font-weight:700;">Phase ${phase.phase}: ${phase.phaseName}</h3>
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
      else if (cmd === '/search') this.switchTab('searcher');
      else if (cmd === '/outreach') this.switchTab('sourcing');
      else if (cmd === '/interview' || cmd === '/star') this.switchTab('interview');
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
      const role = this.cvTargetRole.value.trim() || this.engine.getProfile().targetRole || 'Remote Lead';
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
      a.download = `ATS_Resume_${(this.engine.getProfile().targetRole || 'Alberto_Yepiz').replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('CV downloaded as plain text');
    }

    // ── Module 2: LinkedIn Magnet ──
    _handleOptimizeLinkedin() {
      const p = this.engine.getProfile();
      const customProfile = Object.assign({}, p, {
        targetRole: this.liRole.value.trim() || p.targetRole,
        topSkills: this.liSkills.value.trim() || 'AI Prompt Engineering, Full-Stack Architecture, Node.js, Python'
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
      const role = this.sourcingRole.value.trim() || this.engine.getProfile().targetRole || 'Senior Full-Stack Engineer';
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
      const role = this.engine.getProfile().targetRole || 'Senior Full-Stack Engineer';
      const achievement = this.outreachAchievement.value.trim() || 'architected AI pipelines cutting latency by 45%';

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
      const offer = parseFloat(this.negCurrentOffer.value) || 5000;
      const role = this.negTargetRole.value.trim() || 'Senior Full-Stack Engineer';
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

    // ── Chat & Agent Commands ──
    sendQuickCommand(cmd) {
      if (this.chatInputField) {
        this.chatInputField.value = cmd;
        this._handleChatSubmit();
      }
    }

    _handleChatSubmit() {
      const text = this.chatInputField.value.trim();
      if (!text) return;

      this._addChatMessage('Alberto', text, true);
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
      } else if (clean.startsWith('/recommend') || clean.startsWith('/match') || clean.startsWith('/scrape') || clean.startsWith('/rank')) {
        this.trigger1ClickAiMatch();
        this._addChatMessage('IAN • Strategist', 'Activando el <strong>1-Click AI Match</strong> con la rúbrica de 5 dimensiones de MadsLorentzen. Mostrando puestos remotos en México y el mundo con 90%–100% de compatibilidad con tu CV.');
      } else if (clean.startsWith('/pipeline')) {
        this.switchTab('pipeline');
        this._addChatMessage('IAN • Strategist', 'Cargando tu <strong>Application Pipeline</strong>. Aquí puedes ver el estado de tus postulaciones y activar los correos de seguimiento a los 5 días.');
      } else if (clean.startsWith('/cv_tailor')) {
        this.switchTab('cv');
        this._addChatMessage('IAN • Strategist', 'Te he llevado al módulo <strong>ATS CV Tailor</strong>. Pega la descripción de la vacante para analizar las competencias clave y generar tu CV en 1 columna sin gráficos.');
      } else if (clean === '/linkedin') {
        this.switchTab('linkedin');
        this._addChatMessage('IAN • Strategist', 'Cargando el optimizador de <strong>LinkedIn Magnet</strong>. Aquí generamos tu titular de alto impacto y tu sección Acerca de en 4 partes.');
      } else if (clean === '/search') {
        this.switchTab('searcher');
        this._addChatMessage('IAN • Strategist', 'Abriendo el buscador Omni-Board y directorio de startups en Greenhouse, Lever y Ashby.');
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
        this._addChatMessage('IAN • Strategist', `Entendido Alberto. Para tu objetivo de puesto <strong>${p.targetRole || 'Tech Lead'}</strong>, recuerda nuestra regla de oro: <em>"Trabajar remoto no es suerte, es estrategia."</em> Puedes usar el botón <button class="chip-cmd" onclick="window.JobHunterApp.trigger1ClickAiMatch()">1-Click Match</button> para ver puestos con 90%–100% de compatibilidad, o ir a <button class="chip-cmd" onclick="window.JobHunterApp.switchTab('pipeline')">Pipeline</button> para gestionar tus seguimientos.`);
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
      }, 3200);
    }
  }

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.JobHunterApp = new JobHunterApp();
  });
})();
