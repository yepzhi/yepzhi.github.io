/**
 * ==============================================================================
 * JobSync Application Engine (yepzhi.com/jobs)
 * Architecture: Reactive Client State, Kanban Drag & Drop, ATS Matching,
 * Cover Letter Synthesis, STAR Interview Bank, and Multi-Provider AI Gateway.
 * ==============================================================================
 */

const STORAGE_KEY = 'jobsync_yepzhi_v1';
const SETTINGS_KEY = 'jobsync_settings_v1';

// Default Sample State if first visit
const DEFAULT_STATE = {
  activeResumeId: 'res-1',
  resumes: [
    {
      id: 'res-1',
      title: 'Senior Full Stack & AI Architect',
      fullName: 'Alberto Yépiz',
      headline: 'EdTech & AI Innovation Leader | Senior Full Stack Engineer',
      email: 'contacto@yepzhi.com',
      phone: '+52 (662) 123-4567 • Hermosillo, Sonora, MX',
      linkedin: 'https://linkedin.com/in/alberto-yepiz',
      github: 'https://github.com/yepzhi',
      summary: 'Líder en innovación tecnológica y EdTech con más de 10 años de trayectoria construyendo arquitecturas escalables, sistemas de Inteligencia Artificial local y plataformas educativas masivas. Fundador de JóvenesSTEM y creador de herramientas cloud de alto rendimiento.',
      skills: ['TypeScript', 'JavaScript (ES2024)', 'React', 'Node.js', 'Python', 'PyTorch', 'Ollama / LLMs', 'Docker', 'Cloudflare Workers', 'Firebase / Firestore', 'PostgreSQL', 'Git', 'Linux / Systemd', 'CI/CD'],
      experience: [
        {
          role: 'Fundador & Director de Arquitectura Tecnológica',
          company: 'JóvenesSTEM / yepzhi.com',
          date: '2022 - Presente',
          highlights: [
            'Diseñó e implementó la plataforma de aprendizaje STEM atendiendo a más de 5,000 estudiantes con 226 módulos interactivos.',
            'Desarrolló STEMBot, tutor socrático con IA local y failover a Gemini en Cloudflare Workers con latencia menor a 1.2s.',
            'Arquitectura serverless con Cloudflare Workers, Firebase y validación criptográfica W3C Verifiable Credentials.'
          ]
        },
        {
          role: 'Senior Software & AI Infrastructure Consultant',
          company: 'Independiente / Tech Advisory',
          date: '2019 - 2022',
          highlights: [
            'Optimizó microservicios y pipelines de inferencia para empresas de tecnología en México y LATAM.',
            'Lideró equipos ágiles multidisciplinarios reduciendo tiempos de entrega en un 35%.'
          ]
        }
      ],
      education: [
        {
          degree: 'Maestría en Administración (MBA) & Liderazgo',
          school: 'Instituto Tecnológico / Escuela de Negocios',
          date: '2018'
        },
        {
          degree: 'Ingeniería en Sistemas Computacionales',
          school: 'Instituto Tecnológico de Hermosillo (ITH)',
          date: '2015'
        }
      ]
    },
    {
      id: 'res-2',
      title: 'EdTech & Product Director',
      fullName: 'Alberto Yépiz',
      headline: 'Director de Innovación Educativa & Alianzas Estratégicas',
      email: 'contacto@yepzhi.com',
      phone: '+52 (662) 123-4567 • México',
      linkedin: 'https://linkedin.com/in/alberto-yepiz',
      github: 'https://yepzhi.com',
      summary: 'Directivo de tecnología educativa con experiencia comprobada en alianzas público-privadas, diseño curricular STEM y escalamiento de programas de impacto social y acreditaciones oficiales.',
      skills: ['Liderazgo Estratégico', 'Diseño Curricular STEM', 'Gestión de Proyectos', 'Alianzas Institucionales', 'EdTech', 'Product Management', 'Acreditaciones SEP CONOCER'],
      experience: [
        {
          role: 'Director de Programa STEM Nacional',
          company: 'JóvenesSTEM México',
          date: '2023 - Presente',
          highlights: [
            'Estableció convenios con preparatorias, universidades e industrias aeroespaciales y de semiconductores.',
            'Supervisó el desarrollo de herramientas pedagógicas asistidas por Inteligencia Artificial.'
          ]
        }
      ],
      education: [
        {
          degree: 'Maestría en Administración de Empresas',
          school: 'Tecnológico Nacional de México',
          date: '2018'
        }
      ]
    }
  ],
  jobs: [
    {
      id: 'job-1',
      role: 'Staff AI & Full Stack Engineer',
      company: 'Globant',
      status: 'INTERVIEWING',
      priority: 'HIGH',
      location: 'Remoto (México / USA)',
      salary: '$90,000 - $115,000 MXN / mes',
      url: 'https://globant.com/careers',
      date: '2026-09-12',
      matchScore: 92,
      notes: 'Entrevista técnica de arquitectura aprobada. Siguiente: sesión de liderazgo.',
      description: 'Buscamos un Staff Engineer con sólida experiencia en TypeScript, Node.js, arquitecturas de IA generativa (RAG, LLMs locales y cloud) y microservicios resilientes. Liderará la adopción de buenas prácticas y mentoría técnica.'
    },
    {
      id: 'job-2',
      role: 'Lead Cloud & Backend Architect',
      company: 'Mercado Libre',
      status: 'APPLIED',
      priority: 'HIGH',
      location: 'Híbrido (CDMX / Remoto)',
      salary: '$85,000 - $105,000 MXN / mes',
      url: 'https://mercadolibre.com/jobs',
      date: '2026-09-16',
      matchScore: 88,
      notes: 'Postulación enviada mediante referencia de ex-colega.',
      description: 'Responsable de diseñar soluciones serverless de alta concurrencia, bases de datos distribuidas y optimización de latencia para servicios de millones de usuarios.'
    },
    {
      id: 'job-3',
      role: 'Head of Educational Technology (EdTech)',
      company: 'Tec de Monterrey',
      status: 'OFFER',
      priority: 'HIGH',
      location: 'Monterrey / Remoto parcial',
      salary: '$95,000 MXN / mes + Prestaciones',
      url: 'https://jobs.tec.mx',
      date: '2026-09-02',
      matchScore: 95,
      notes: '¡Oferta formal recibida! En revisión de paquete de compensación y fecha de inicio.',
      description: 'Liderar la transformación de laboratorios virtuales, plataformas adaptativas con IA y certificación de competencias digitales para estudiantes universitarios.'
    },
    {
      id: 'job-4',
      role: 'Senior AI Solutions Specialist',
      company: 'Microsoft México',
      status: 'WISHLIST',
      priority: 'MEDIUM',
      location: 'Remoto',
      salary: '$110,000 - $130,000 MXN / mes',
      url: 'https://careers.microsoft.com',
      date: '2026-09-18',
      matchScore: 84,
      notes: 'Vacante detectada en LinkedIn. Ajustando CV para enfoque en modelos empresariales.',
      description: 'Asesorar a clientes estratégicos en la integración de modelos LLM, soluciones seguras en Azure AI y gobernanza de datos.'
    },
    {
      id: 'job-5',
      role: 'Frontend Principal Architect',
      company: 'Nu México',
      status: 'REJECTED',
      priority: 'LOW',
      location: 'Remoto',
      salary: '$90,000 MXN / mes',
      url: 'https://nu.com.mx/carreras',
      date: '2026-08-25',
      matchScore: 78,
      notes: 'Feedback: proceso cerrado internamente para promoción interna.',
      description: 'Diseño de sistemas de diseño globales, accesibilidad avanzada y rendimiento web crítico en aplicaciones fintech.'
    }
  ],
  questions: [
    {
      id: 'q-1',
      category: 'BEHAVIORAL',
      title: 'Cuéntame sobre una ocasión en la que tuviste un desacuerdo técnico y cómo lo resolviste.',
      star: {
        s: 'En JóvenesSTEM teníamos dos posturas: usar una base de datos relacional pesada o una arquitectura serverless con Firestore + Cloudflare KV.',
        t: 'Debíamos garantizar respuesta de menos de 100ms para miles de alumnos simultáneos sin inflar costos de infraestructura.',
        a: 'Diseñé una prueba de concepto (POC) comparativa de latencia y costos. Mostré métricas objetivas al equipo sin sesgos personales.',
        r: 'Adoptamos la arquitectura edge serverless, reduciendo costos operativos un 70% y logrando latencias de 45ms sin caídas.'
      }
    },
    {
      id: 'q-2',
      category: 'TECHNICAL',
      title: '¿Cómo diseñarías un sistema de inferencia de IA local para alta concurrencia con recursos de hardware limitados?',
      star: {
        s: 'El servidor local de IA sufría de saturación de VRAM y caídas periódicas cuando varios usuarios enviaban consultas a la vez.',
        t: 'Habilitar paralelismo real sin exceder el presupuesto de 15.5 GB de VRAM de la iGPU.',
        a: 'Reemplacé modelos pesados con un modelo Qwen 2.5 con GQA optimizado (reduciendo el KV Cache 6x) y fijé el parámetro OLLAMA_NUM_PARALLEL=8 con flash attention.',
        r: 'El sistema pasó de colapsar con 3 usuarios a atender hasta 12 peticiones concurrentes a más de 90 tokens/s agregados.'
      }
    },
    {
      id: 'q-3',
      category: 'LEADERSHIP',
      title: '¿Cómo manejas la presión ante una fecha de entrega crítica cuando surgen impedimentos imprevistos?',
      star: {
        s: 'A 48 horas del lanzamiento de una convocatoria educativa estatal, el proveedor de autenticación cambió su política de cuotas.',
        t: 'Asegurar que 2,000 aspirantes pudieran registrarse sin errores en la fecha pactada.',
        a: 'Prioricé las funcionalidades críticas, implementé un bypass de fallback seguro y mantuve comunicación transparente con los coordinadores de cada institución.',
        r: 'El 100% de los aspirantes completó su registro sin pérdida de datos ni quejas.'
      }
    },
    {
      id: 'q-4',
      category: 'QUESTIONS_TO_ASK',
      title: 'Preguntas estratégicas para hacerle al equipo contratante al final de la entrevista:',
      star: {
        s: '1. ¿Cuáles son los mayores retos técnicos que el equipo planea resolver en los próximos 6 meses?',
        t: '2. ¿Cómo miden el éxito de esta posición durante los primeros 90 días?',
        a: '3. ¿Cómo fomenta la empresa la experimentación y adopción de nuevas tecnologías como IA generativa?',
        r: '4. ¿Qué es lo que más disfruta el equipo de la cultura de trabajo diaria aquí?'
      }
    }
  ],
  companies: [
    {
      id: 'comp-1',
      name: 'Globant',
      industry: 'Tecnología & Consultoría Global',
      location: 'México / Global',
      careersUrl: 'https://globant.com/careers',
      rating: '4.3 ★',
      status: 'Proceso Activo'
    },
    {
      id: 'comp-2',
      name: 'Mercado Libre',
      industry: 'E-commerce & Fintech',
      location: 'CDMX / Remoto',
      careersUrl: 'https://mercadolibre.com/jobs',
      rating: '4.6 ★',
      status: 'Postulado'
    },
    {
      id: 'comp-3',
      name: 'Tec de Monterrey',
      industry: 'Educación Superior & EdTech',
      location: 'Monterrey / Nacional',
      careersUrl: 'https://jobs.tec.mx',
      rating: '4.7 ★',
      status: 'Oferta Recibida'
    },
    {
      id: 'comp-4',
      name: 'Microsoft México',
      industry: 'Enterprise Software & Cloud',
      location: 'Remoto',
      careersUrl: 'https://careers.microsoft.com',
      rating: '4.5 ★',
      status: 'Watchlist'
    }
  ],
  contacts: [
    {
      id: 'cnt-1',
      name: 'Sarah Connor',
      company: 'Globant',
      role: 'Technical Talent Lead',
      email: 's.connor@globant.com',
      lastContact: '2026-09-17',
      notes: 'Coordinó la sesión de arquitectura técnica. Muy atenta y rápida para responder.'
    },
    {
      id: 'cnt-2',
      name: 'Eduardo Garza',
      company: 'Tec de Monterrey',
      role: 'Director de Recursos Académicos',
      email: 'egarza@itesm.mx',
      lastContact: '2026-09-18',
      notes: 'Envió la carta de oferta formal. En espera de llamada de alineación de inicio.'
    }
  ]
};

// Global App State Instance
let appState = null;
let appSettings = null;
let currentView = 'dashboard';
let currentAppViewMode = 'kanban'; // 'kanban' | 'table'

// ==============================================================================
// INITIALIZATION
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  loadSettings();
  setupNavigation();
  setupDragAndDrop();
  renderAllViews();
});

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appState = JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading state, resetting to default', e);
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } else {
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    try {
      appSettings = JSON.parse(saved);
    } catch (e) {
      appSettings = getDefaultSettings();
    }
  } else {
    appSettings = getDefaultSettings();
  }
}

function getDefaultSettings() {
  return {
    provider: 'HEURISTIC', // 'OLLAMA_LOCAL' | 'GEMINI' | 'OPENAI' | 'HEURISTIC'
    ollamaEndpoint: 'http://localhost:11434',
    apiKey: ''
  };
}

function saveSettings() {
  const provider = document.getElementById('settingAiProvider').value;
  const ollamaEndpoint = document.getElementById('settingOllamaEndpoint').value.trim();
  const apiKey = document.getElementById('settingApiKey').value.trim();

  appSettings = { provider, ollamaEndpoint, apiKey };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(appSettings));
  closeSettingsModal();
  showToast('Ajustes guardados correctamente');
}

// ==============================================================================
// NAVIGATION & VIEW SWITCHING
// ==============================================================================
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.getAttribute('data-view');
      switchView(view);
    });
  });
}

function switchView(viewName) {
  currentView = viewName;

  // Update tabs UI
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-view') === viewName);
  });

  // Update panels UI
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${viewName}`);
  });

  // Re-render specific view if needed
  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'applications') renderApplications();
  if (viewName === 'resumes') renderResumes();
  if (viewName === 'match') setupMatchInputs();
  if (viewName === 'interviews') renderInterviews();
  if (viewName === 'companies') renderCompanies();
}

function renderAllViews() {
  renderDashboard();
  renderApplications();
  renderResumes();
  setupMatchInputs();
  renderInterviews();
  renderCompanies();
  updateNavCounters();
}

function updateNavCounters() {
  const countEl = document.getElementById('navAppCount');
  if (countEl && appState.jobs) {
    countEl.textContent = appState.jobs.length;
  }
}

// ==============================================================================
// VIEW 1: DASHBOARD
// ==============================================================================
function renderDashboard() {
  const jobs = appState.jobs || [];
  const total = jobs.length;
  const interviewing = jobs.filter(j => j.status === 'INTERVIEWING').length;
  const offers = jobs.filter(j => j.status === 'OFFER').length;
  const applied = jobs.filter(j => j.status === 'APPLIED').length;
  const active = applied + interviewing + offers;

  const responses = interviewing + offers + jobs.filter(j => j.status === 'REJECTED').length;
  const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0;

  document.getElementById('statTotalApps').textContent = total;
  document.getElementById('statActiveApps').textContent = active;
  document.getElementById('statInterviewApps').textContent = interviewing;
  document.getElementById('statOfferApps').textContent = offers;
  document.getElementById('statResponseRate').textContent = `${responseRate}%`;

  // Pipeline Bars
  const pipelineEl = document.getElementById('pipelineBars');
  const statuses = [
    { key: 'WISHLIST', name: '📌 Guardados / Wishlist', color: '#64748b' },
    { key: 'APPLIED', name: '📝 Postulados', color: '#3b82f6' },
    { key: 'INTERVIEWING', name: '🎯 En Entrevistas', color: '#f59e0b' },
    { key: 'OFFER', name: '🏆 Ofertas Recibidas', color: '#10b981' },
    { key: 'REJECTED', name: '❌ Rechazados', color: '#f43f5e' }
  ];

  pipelineEl.innerHTML = statuses.map(s => {
    const count = jobs.filter(j => j.status === s.key).length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return `
      <div class="pipeline-item">
        <div class="pipeline-meta">
          <span class="pipeline-name">${s.name}</span>
          <span class="pipeline-count">${count} (${pct}%)</span>
        </div>
        <div class="pipeline-track">
          <div class="pipeline-fill" style="width:${pct}%; background:${s.color};"></div>
        </div>
      </div>
    `;
  }).join('');

  // Upcoming Interviews / Actions
  const upcomingEl = document.getElementById('upcomingList');
  const upcomingJobs = jobs.filter(j => j.status === 'INTERVIEWING' || j.status === 'OFFER').slice(0, 4);

  if (upcomingJobs.length === 0) {
    upcomingEl.innerHTML = `<p class="text-sm text-muted">No tienes entrevistas agendadas actualmente.</p>`;
  } else {
    upcomingEl.innerHTML = upcomingJobs.map(j => `
      <div class="upcoming-item">
        <div>
          <div class="upcoming-role">${escapeHtml(j.role)}</div>
          <div class="upcoming-company">${escapeHtml(j.company)} • ${escapeHtml(j.location || 'Remoto')}</div>
        </div>
        <span class="upcoming-date">${j.status === 'OFFER' ? '🏆 Oferta Lista' : '🎯 En Proceso'}</span>
      </div>
    `).join('');
  }
}

// ==============================================================================
// VIEW 2: APPLICATIONS (KANBAN + TABLE)
// ==============================================================================
const KANBAN_COLUMNS = [
  { id: 'WISHLIST', title: '📌 Guardados', icon: 'bookmark' },
  { id: 'APPLIED', title: '📝 Postulados', icon: 'send' },
  { id: 'INTERVIEWING', title: '🎯 Entrevistando', icon: 'message-square' },
  { id: 'OFFER', title: '🏆 Ofertas', icon: 'award' },
  { id: 'REJECTED', title: '❌ Rechazados', icon: 'x-circle' }
];

function setAppViewMode(mode) {
  currentAppViewMode = mode;
  document.getElementById('viewModeKanbanBtn').classList.toggle('active', mode === 'kanban');
  document.getElementById('viewModeTableBtn').classList.toggle('active', mode === 'table');
  document.getElementById('kanbanBoard').style.display = mode === 'kanban' ? 'grid' : 'none';
  document.getElementById('tableContainer').style.display = mode === 'table' ? 'block' : 'none';
  renderApplications();
}

function renderApplications() {
  const query = (document.getElementById('appSearchInput')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('appStatusFilter')?.value || 'ALL';
  const priorityFilter = document.getElementById('appPriorityFilter')?.value || 'ALL';

  let filteredJobs = appState.jobs.filter(job => {
    const matchQuery = !query || 
      job.role.toLowerCase().includes(query) || 
      job.company.toLowerCase().includes(query) ||
      (job.location && job.location.toLowerCase().includes(query)) ||
      (job.description && job.description.toLowerCase().includes(query));

    const matchStatus = statusFilter === 'ALL' || job.status === statusFilter;
    const matchPriority = priorityFilter === 'ALL' || job.priority === priorityFilter;

    return matchQuery && matchStatus && matchPriority;
  });

  if (currentAppViewMode === 'kanban') {
    renderKanbanBoard(filteredJobs);
  } else {
    renderApplicationsTable(filteredJobs);
  }
  updateNavCounters();
}

function renderKanbanBoard(jobsList) {
  const board = document.getElementById('kanbanBoard');
  board.innerHTML = '';

  KANBAN_COLUMNS.forEach(col => {
    const colJobs = jobsList.filter(j => j.status === col.id);

    const colEl = document.createElement('div');
    colEl.className = 'kanban-column';
    colEl.setAttribute('data-column-id', col.id);

    colEl.innerHTML = `
      <div class="kanban-col-header">
        <div class="kanban-col-title">
          <span>${col.title}</span>
        </div>
        <span class="kanban-col-badge">${colJobs.length}</span>
      </div>
      <div class="kanban-cards-area" data-status="${col.id}">
        ${colJobs.map(job => createJobCardHtml(job)).join('')}
      </div>
    `;

    board.appendChild(colEl);
  });

  attachCardDragEvents();
}

function createJobCardHtml(job) {
  const priorityClass = job.priority === 'HIGH' ? 'tag-high' : (job.priority === 'MEDIUM' ? 'tag-med' : 'tag-low');
  const matchClass = job.matchScore >= 85 ? 'badge-match-high' : (job.matchScore >= 70 ? 'badge-match-mid' : 'badge-match-low');

  return `
    <div class="job-card" draggable="true" data-job-id="${job.id}">
      <div class="job-card-top">
        <div class="job-card-role">${escapeHtml(job.role)}</div>
        <div class="job-card-actions">
          <button class="btn-card-action" onclick="openEditJobModal('${job.id}')" title="Editar">✏️</button>
          <button class="btn-card-action" onclick="deleteJob('${job.id}')" title="Eliminar">&times;</button>
        </div>
      </div>
      <div class="job-card-company">${escapeHtml(job.company)}</div>
      <div class="job-card-tags">
        ${job.location ? `<span class="tag-pill tag-location">${escapeHtml(job.location)}</span>` : ''}
        ${job.salary ? `<span class="tag-pill tag-salary">${escapeHtml(job.salary)}</span>` : ''}
        <span class="tag-pill ${priorityClass}">${job.priority || 'MED'}</span>
      </div>
      <div class="job-card-footer">
        <span class="job-match-badge ${matchClass}">Match: ${job.matchScore || 75}%</span>
        <span>${job.date ? formatDate(job.date) : 'Sin fecha'}</span>
      </div>
    </div>
  `;
}

function renderApplicationsTable(jobsList) {
  const tbody = document.getElementById('applicationsTableBody');
  if (jobsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 2rem;">No se encontraron postulaciones con los filtros seleccionados.</td></tr>`;
    return;
  }

  tbody.innerHTML = jobsList.map(job => `
    <tr>
      <td>
        <div style="font-weight:700; color:#fff;">${escapeHtml(job.role)}</div>
        <div style="font-size:0.825rem; color:var(--text-secondary);">${escapeHtml(job.company)}</div>
      </td>
      <td>
        <select class="select-control" style="padding:0.25rem 0.5rem; font-size:0.8rem;" onchange="updateJobStatus('${job.id}', this.value)">
          <option value="WISHLIST" ${job.status === 'WISHLIST' ? 'selected' : ''}>📌 Guardado</option>
          <option value="APPLIED" ${job.status === 'APPLIED' ? 'selected' : ''}>📝 Postulado</option>
          <option value="INTERVIEWING" ${job.status === 'INTERVIEWING' ? 'selected' : ''}>🎯 Entrevistando</option>
          <option value="OFFER" ${job.status === 'OFFER' ? 'selected' : ''}>🏆 Oferta</option>
          <option value="REJECTED" ${job.status === 'REJECTED' ? 'selected' : ''}>❌ Rechazado</option>
        </select>
      </td>
      <td>${escapeHtml(job.location || 'Remoto')}</td>
      <td style="font-family:var(--font-mono); color:#34d399;">${escapeHtml(job.salary || 'No especificado')}</td>
      <td><span class="job-match-badge badge-match-high">${job.matchScore || 80}%</span></td>
      <td>${job.date ? formatDate(job.date) : '-'}</td>
      <td>
        <button class="btn-sm btn-secondary" onclick="openEditJobModal('${job.id}')">Editar</button>
        <button class="btn-sm btn-danger-outline" onclick="deleteJob('${job.id}')">&times;</button>
      </td>
    </tr>
  `).join('');
}

// Drag and Drop Logic
let draggedJobId = null;

function setupDragAndDrop() {
  document.addEventListener('dragover', (e) => {
    const dropArea = e.target.closest('.kanban-cards-area');
    if (dropArea) {
      e.preventDefault();
      dropArea.classList.add('drag-over');
    }
  });

  document.addEventListener('dragleave', (e) => {
    const dropArea = e.target.closest('.kanban-cards-area');
    if (dropArea) {
      dropArea.classList.remove('drag-over');
    }
  });

  document.addEventListener('drop', (e) => {
    const dropArea = e.target.closest('.kanban-cards-area');
    if (dropArea && draggedJobId) {
      e.preventDefault();
      dropArea.classList.remove('drag-over');
      const targetStatus = dropArea.getAttribute('data-status');
      updateJobStatus(draggedJobId, targetStatus);
      draggedJobId = null;
    }
  });
}

function attachCardDragEvents() {
  const cards = document.querySelectorAll('.job-card');
  cards.forEach(card => {
    card.addEventListener('dragstart', () => {
      draggedJobId = card.getAttribute('data-job-id');
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.kanban-cards-area').forEach(a => a.classList.remove('drag-over'));
    });
  });
}

function updateJobStatus(jobId, newStatus) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (job && job.status !== newStatus) {
    job.status = newStatus;
    saveState();
    renderApplications();
    renderDashboard();
    showToast(`Postulación movida a ${newStatus}`);
  }
}

// ==============================================================================
// JOB MODAL (ADD / EDIT)
// ==============================================================================
function openJobModal(jobToEdit = null) {
  const form = document.getElementById('jobForm');
  form.reset();

  if (jobToEdit) {
    document.getElementById('jobModalTitle').textContent = 'Editar Postulación';
    document.getElementById('jobId').value = jobToEdit.id;
    document.getElementById('jobTitle').value = jobToEdit.role;
    document.getElementById('jobCompany').value = jobToEdit.company;
    document.getElementById('jobStatus').value = jobToEdit.status;
    document.getElementById('jobPriority').value = jobToEdit.priority || 'MEDIUM';
    document.getElementById('jobLocation').value = jobToEdit.location || '';
    document.getElementById('jobSalary').value = jobToEdit.salary || '';
    document.getElementById('jobUrl').value = jobToEdit.url || '';
    document.getElementById('jobDate').value = jobToEdit.date || '';
    document.getElementById('jobDescription').value = jobToEdit.description || '';
    document.getElementById('jobNotes').value = jobToEdit.notes || '';
  } else {
    document.getElementById('jobModalTitle').textContent = 'Nueva Postulación';
    document.getElementById('jobId').value = '';
    document.getElementById('jobDate').value = new Date().toISOString().split('T')[0];
  }

  document.getElementById('jobModalBackdrop').classList.add('open');
}

function openEditJobModal(jobId) {
  const job = appState.jobs.find(j => j.id === jobId);
  if (job) openJobModal(job);
}

function closeJobModal() {
  document.getElementById('jobModalBackdrop').classList.remove('open');
}

function handleJobFormSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('jobId').value;
  const role = document.getElementById('jobTitle').value.trim();
  const company = document.getElementById('jobCompany').value.trim();
  const status = document.getElementById('jobStatus').value;
  const priority = document.getElementById('jobPriority').value;
  const location = document.getElementById('jobLocation').value.trim();
  const salary = document.getElementById('jobSalary').value.trim();
  const url = document.getElementById('jobUrl').value.trim();
  const date = document.getElementById('jobDate').value;
  const description = document.getElementById('jobDescription').value.trim();
  const notes = document.getElementById('jobNotes').value.trim();

  // Quick auto-match score
  const activeResume = getActiveResume();
  const autoScore = calculateAtsScore(description, activeResume);

  if (id) {
    const existing = appState.jobs.find(j => j.id === id);
    if (existing) {
      Object.assign(existing, { role, company, status, priority, location, salary, url, date, description, notes, matchScore: autoScore.score });
      showToast('Postulación actualizada');
    }
  } else {
    const newJob = {
      id: 'job-' + Date.now(),
      role,
      company,
      status,
      priority,
      location,
      salary,
      url,
      date,
      description,
      notes,
      matchScore: autoScore.score
    };
    appState.jobs.unshift(newJob);
    showToast('Nueva postulación registrada');
  }

  saveState();
  closeJobModal();
  renderApplications();
  renderDashboard();
}

function deleteJob(jobId) {
  if (confirm('¿Estás seguro de eliminar esta postulación?')) {
    appState.jobs = appState.jobs.filter(j => j.id !== jobId);
    saveState();
    renderApplications();
    renderDashboard();
    showToast('Postulación eliminada');
  }
}

// ==============================================================================
// VIEW 3: RESUMES & CV BUILDER
// ==============================================================================
function getActiveResume() {
  return appState.resumes.find(r => r.id === appState.activeResumeId) || appState.resumes[0];
}

function renderResumes() {
  const tabsBar = document.getElementById('resumeTabsBar');
  tabsBar.innerHTML = appState.resumes.map(r => `
    <button class="resume-pill ${r.id === appState.activeResumeId ? 'active' : ''}" onclick="selectResume('${r.id}')">
      <span>📄</span>
      <span>${escapeHtml(r.title)}</span>
    </button>
  `).join('');

  const resume = getActiveResume();
  const preview = document.getElementById('resumePreview');

  preview.innerHTML = `
    <div class="res-header-name">${escapeHtml(resume.fullName)}</div>
    <div class="res-header-title">${escapeHtml(resume.headline)}</div>
    <div class="res-header-contact">
      <span>✉️ ${escapeHtml(resume.email)}</span>
      <span>📞 ${escapeHtml(resume.phone)}</span>
      ${resume.linkedin ? `<span>🔗 <a href="${resume.linkedin}" target="_blank" style="color:#2563eb;">LinkedIn</a></span>` : ''}
      ${resume.github ? `<span>💻 <a href="${resume.github}" target="_blank" style="color:#2563eb;">GitHub / Web</a></span>` : ''}
    </div>

    <div class="res-section-title">Resumen Profesional</div>
    <p class="res-summary-text">${escapeHtml(resume.summary)}</p>

    <div class="res-section-title">Experiencia Laboral Destacada</div>
    ${(resume.experience || []).map(exp => `
      <div class="res-exp-item">
        <div class="res-exp-header">
          <div><span class="res-exp-role">${escapeHtml(exp.role)}</span> • <span class="res-exp-company">${escapeHtml(exp.company)}</span></div>
          <span class="res-exp-date">${escapeHtml(exp.date)}</span>
        </div>
        ${(exp.highlights || []).map(h => `<div class="res-exp-bullet">• ${escapeHtml(h)}</div>`).join('')}
      </div>
    `).join('')}

    <div class="res-section-title">Habilidades Técnicas & Clave</div>
    <div class="res-skills-grid">
      ${(resume.skills || []).map(s => `<span class="res-skill-badge">${escapeHtml(s)}</span>`).join('')}
    </div>

    <div class="res-section-title">Formación Académica & Certificaciones</div>
    ${(resume.education || []).map(edu => `
      <div class="res-exp-item">
        <div class="res-exp-header">
          <span class="res-exp-role">${escapeHtml(edu.degree)}</span>
          <span class="res-exp-date">${escapeHtml(edu.date)}</span>
        </div>
        <div class="res-exp-company">${escapeHtml(edu.school)}</div>
      </div>
    `).join('')}
  `;
}

function selectResume(resumeId) {
  appState.activeResumeId = resumeId;
  saveState();
  renderResumes();
  if (currentView === 'match') setupMatchInputs();
}

function exportResumePDF() {
  window.print();
}

function openResumeModal() {
  const resume = getActiveResume();
  document.getElementById('resFullName').value = resume.fullName;
  document.getElementById('resHeadline').value = resume.headline;
  document.getElementById('resEmail').value = resume.email;
  document.getElementById('resPhone').value = resume.phone;
  document.getElementById('resLinkedIn').value = resume.linkedin;
  document.getElementById('resGitHub').value = resume.github;
  document.getElementById('resSummary').value = resume.summary;
  document.getElementById('resSkills').value = (resume.skills || []).join(', ');
  
  // Format experience as lines for simplicity
  const expLines = (resume.experience || []).map(e => `${e.role} | ${e.company} | ${e.date}`).join('\n');
  document.getElementById('resExperienceJson').value = expLines;

  document.getElementById('resumeModalBackdrop').classList.add('open');
}

function closeResumeModal() {
  document.getElementById('resumeModalBackdrop').classList.remove('open');
}

function handleResumeEditSubmit(event) {
  event.preventDefault();
  const resume = getActiveResume();

  resume.fullName = document.getElementById('resFullName').value.trim();
  resume.headline = document.getElementById('resHeadline').value.trim();
  resume.email = document.getElementById('resEmail').value.trim();
  resume.phone = document.getElementById('resPhone').value.trim();
  resume.linkedin = document.getElementById('resLinkedIn').value.trim();
  resume.github = document.getElementById('resGitHub').value.trim();
  resume.summary = document.getElementById('resSummary').value.trim();
  resume.skills = document.getElementById('resSkills').value.split(',').map(s => s.trim()).filter(Boolean);

  saveState();
  closeResumeModal();
  renderResumes();
  showToast('Perfil de currículum actualizado');
}

// ==============================================================================
// VIEW 4: ATS MATCHING & SCORING ENGINE
// ==============================================================================
function setupMatchInputs() {
  const jobSelect = document.getElementById('matchJobSelect');
  jobSelect.innerHTML = `<option value="">-- O selecciona una postulación guardada --</option>` +
    appState.jobs.map(j => `<option value="${j.id}">${escapeHtml(j.role)} (${escapeHtml(j.company)})</option>`).join('');

  const resumeSelect = document.getElementById('matchResumeSelect');
  resumeSelect.innerHTML = appState.resumes.map(r => `
    <option value="${r.id}" ${r.id === appState.activeResumeId ? 'selected' : ''}>${escapeHtml(r.title)}</option>
  `).join('');
}

function onMatchJobSelectChange() {
  const jobId = document.getElementById('matchJobSelect').value;
  if (!jobId) return;
  const job = appState.jobs.find(j => j.id === jobId);
  if (job) {
    document.getElementById('matchJobTitle').value = job.role;
    document.getElementById('matchJobDesc').value = job.description || '';
    runAtsMatching();
  }
}

function runAtsMatching() {
  const desc = document.getElementById('matchJobDesc').value.trim();
  const title = document.getElementById('matchJobTitle').value.trim();
  const resId = document.getElementById('matchResumeSelect').value;
  const resume = appState.resumes.find(r => r.id === resId) || getActiveResume();

  if (!desc) {
    showToast('Pega una descripción de puesto para calcular el match');
    return;
  }

  const analysis = calculateAtsScore(desc + ' ' + title, resume);
  displayMatchResults(analysis);
}

function calculateAtsScore(jobText, resume) {
  const lowerText = jobText.toLowerCase();

  // Curated taxonomy of high-value tech and professional competencies
  const TECH_KEYWORDS = [
    'typescript', 'javascript', 'python', 'react', 'node.js', 'nodejs', 'docker', 'kubernetes',
    'aws', 'cloud', 'gcp', 'azure', 'pytorch', 'tensorflow', 'ollama', 'llm', 'sql', 'postgresql',
    'mongodb', 'graphql', 'rest', 'api', 'ci/cd', 'git', 'linux', 'systemd', 'microservicios',
    'arquitectura', 'liderazgo', 'mentoria', 'agile', 'scrum', 'testing', 'cypress', 'jest',
    'seguridad', 'oauth', 'cloudflare', 'firebase', 'devops', 'edtech', 'html', 'css', 'tailwind'
  ];

  const resumeText = [
    resume.headline,
    resume.summary,
    ...(resume.skills || []),
    ...(resume.experience || []).flatMap(e => [e.role, e.company, ...(e.highlights || [])])
  ].join(' ').toLowerCase();

  const foundInJob = TECH_KEYWORDS.filter(kw => lowerText.includes(kw));
  const matched = [];
  const missing = [];

  foundInJob.forEach(kw => {
    if (resumeText.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  // Calculate base percentage
  let score = 0;
  if (foundInJob.length === 0) {
    score = 75; // Default neutral baseline
  } else {
    score = Math.round((matched.length / foundInJob.length) * 100);
    // Keep it realistic between 50% and 98%
    score = Math.max(45, Math.min(score, 98));
  }

  // Recommendations
  const recs = [];
  if (missing.length > 0) {
    recs.push(`Incorpora las palabras clave <strong>${missing.slice(0, 3).join(', ')}</strong> en tu sección de habilidades y en viñetas de experiencia reciente.`);
  }
  recs.push('Cuantifica tus impactos usando la fórmula: [Logro medible] mediante [tecnología/acción] resultando en [métrica % o $].');
  recs.push('Asegúrate de que el título de tu CV guarde simetría directa con el rol postulado.');

  return {
    score,
    matched,
    missing,
    recommendations: recs
  };
}

function displayMatchResults(analysis) {
  document.getElementById('matchEmptyState').style.display = 'none';
  document.getElementById('matchContent').style.display = 'block';

  // Animate circular gauge
  const score = analysis.score;
  document.getElementById('gaugeScore').textContent = `${score}%`;

  const circle = document.getElementById('gaugeCircle');
  const circumference = 2 * Math.PI * 50; // ~314
  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  // Colors & Verdict
  const titleEl = document.getElementById('matchVerdictTitle');
  const descEl = document.getElementById('matchVerdictDesc');

  if (score >= 85) {
    circle.style.stroke = 'var(--accent-emerald)';
    titleEl.textContent = '🌟 ¡Excelente Compatibilidad ATS!';
    descEl.textContent = 'Tu perfil cumple con la gran mayoría de los requisitos técnicos clave. Tienes altas probabilidades de pasar el primer filtro de reclutamiento.';
  } else if (score >= 70) {
    circle.style.stroke = 'var(--accent-amber)';
    titleEl.textContent = '⚡ Buena Compatibilidad (Optimizaciones Sugeridas)';
    descEl.textContent = 'Cumples con los fundamentos del rol, pero agregar las palabras clave faltantes te posicionará en el top 10% de candidatos.';
  } else {
    circle.style.stroke = 'var(--accent-rose)';
    titleEl.textContent = '⚠️ Brecha de Requisitos Detectada';
    descEl.textContent = 'Existen varias herramientas o competencias críticas no mencionadas en tu CV. Considera adaptar tus viñetas de experiencia antes de aplicar.';
  }

  // Pills
  document.getElementById('matchedCount').textContent = analysis.matched.length;
  document.getElementById('matchedKeywordsWrap').innerHTML = analysis.matched.length > 0
    ? analysis.matched.map(kw => `<span class="kw-pill kw-pill-match">✓ ${escapeHtml(kw)}</span>`).join('')
    : '<span class="text-muted text-sm">Sin coincidencias directas en taxonomía común.</span>';

  document.getElementById('missingCount').textContent = analysis.missing.length;
  document.getElementById('missingKeywordsWrap').innerHTML = analysis.missing.length > 0
    ? analysis.missing.map(kw => `<span class="kw-pill kw-pill-missing">+ ${escapeHtml(kw)}</span>`).join('')
    : '<span class="text-emerald text-sm">¡Tienes todas las palabras clave prioritarias identificadas!</span>';

  // Recommendations
  document.getElementById('matchRecList').innerHTML = analysis.recommendations.map(r => `<li>${r}</li>`).join('');
}

function generateCoverLetterFromMatch() {
  const role = document.getElementById('matchJobTitle').value;
  const desc = document.getElementById('matchJobDesc').value;

  switchView('coverletter');
  if (role) document.getElementById('clRole').value = role;
  if (desc) document.getElementById('clHighlights').value = 'Alineado a los requisitos de la vacante analizada previamente.';
}

// ==============================================================================
// VIEW 5: COVER LETTER GENERATOR
// ==============================================================================
function generateCoverLetterAI() {
  const company = document.getElementById('clCompany').value.trim() || 'Estimada Empresa';
  const role = document.getElementById('clRole').value.trim() || 'la vacante solicitada';
  const recruiter = document.getElementById('clRecruiter').value.trim() || 'Estimado Comité de Selección';
  const tone = document.getElementById('clTone').value;
  const highlights = document.getElementById('clHighlights').value.trim();

  const resume = getActiveResume();
  const dateStr = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  let letter = `${dateStr}\n\n`;
  letter += `${recruiter}\n`;
  letter += `${company}\n\n`;

  if (tone === 'EXECUTIVE') {
    letter += `Asunto: Candidatura para la posición de ${role} — ${resume.fullName}\n\n`;
    letter += `Le escribo con gran entusiasmo para presentar formalmente mi postulación al puesto de ${role} en ${company}. Con más de una década de trayectoria liderando arquitecturas tecnológicas y escalando plataformas de misión crítica, he seguido de cerca la visión innovadora de ${company} y me identifico plenamente con sus estándares de excelencia.\n\n`;
    letter += `A lo largo de mi carrera, he combinado visión estratégica y solvencia en ingeniería de software: ${resume.summary}\n\n`;
    if (highlights) {
      letter += `En particular, considero relevante destacar: ${highlights}\n\n`;
    }
    letter += `Estoy convencido de que mi experiencia técnica en ${resume.skills.slice(0, 5).join(', ')} me permitirá generar valor inmediato en los objetivos de negocio de ${company}. Agradezco de antemano su consideración y quedo a su entera disposición para coordinar una entrevista.\n\n`;
    letter += `Atentamente,\n\n${resume.fullName}\n${resume.headline}\n${resume.email} • ${resume.phone}`;
  } else if (tone === 'PASSIONATE') {
    letter += `¡Hola equipo de ${company}!\n\n`;
    letter += `Les escribo emocionado por la oportunidad de sumarme como ${role}. He seguido el impacto de ${company} y considero que este es el reto ideal para sumar mi energía y experiencia construyendo tecnología que transforma vidas.\n\n`;
    letter += `Como ${resume.headline}, me apasiona crear productos rápidos, confiables y respaldados por Inteligencia Artificial. ${resume.summary}\n\n`;
    if (highlights) {
      letter += `Un logro que refleja mi compromiso: ${highlights}\n\n`;
    }
    letter += `Me encantaría platicar con ustedes sobre cómo podemos acelerar el desarrollo de sus productos clave. ¡Conversemos pronto!\n\n`;
    letter += `Un saludo cordial,\n\n${resume.fullName}\n${resume.email}`;
  } else {
    // DIRECT
    letter += `Estimado equipo de selección de ${company}:\n\n`;
    letter += `Presento mi candidatura para el rol de ${role}. Mi perfil técnico y de liderazgo se alinea directamente a las necesidades de su vacante:\n\n`;
    letter += `• Dominio de stack principal: ${resume.skills.slice(0, 6).join(', ')}.\n`;
    letter += `• Trayectoria comprobada: ${resume.summary}\n`;
    if (highlights) {
      letter += `• Logro destacado: ${highlights}\n`;
    }
    letter += `\nCuento con disponibilidad para conversar sobre los requerimientos de la posición en cualquier momento conveniente.\n\n`;
    letter += `Atentamente,\n${resume.fullName} • ${resume.phone}`;
  }

  const output = document.getElementById('coverLetterOutput');
  output.value = letter;
  updateWordCount(letter);
  showToast('Carta de presentación generada');
}

function updateWordCount(text) {
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.getElementById('clWordCount').textContent = count;
}

function copyCoverLetter() {
  const text = document.getElementById('coverLetterOutput').value;
  if (!text) {
    showToast('Genera una carta primero');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('✓ Carta copiada al portapapeles');
  });
}

// ==============================================================================
// VIEW 6: STAR INTERVIEW QUESTION BANK
// ==============================================================================
let activeQuestionCategory = 'ALL';

function filterQuestions(category) {
  activeQuestionCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(category) || (category === 'ALL' && btn.textContent.includes('Todas')));
  });
  renderInterviews();
}

function renderInterviews() {
  const grid = document.getElementById('questionsGrid');
  const filtered = activeQuestionCategory === 'ALL'
    ? appState.questions
    : appState.questions.filter(q => q.category === activeQuestionCategory);

  grid.innerHTML = filtered.map(q => `
    <div class="question-card">
      <div class="question-header">
        <span class="question-badge badge-primary">${q.category}</span>
      </div>
      <div class="question-title">${escapeHtml(q.title)}</div>
      <div class="star-box">
        <div class="star-step"><strong>S (Situación):</strong> ${escapeHtml(q.star.s)}</div>
        <div class="star-step"><strong>T (Tarea):</strong> ${escapeHtml(q.star.t)}</div>
        <div class="star-step"><strong>A (Acción):</strong> ${escapeHtml(q.star.a)}</div>
        <div class="star-step"><strong>R (Resultado):</strong> ${escapeHtml(q.star.r)}</div>
      </div>
    </div>
  `).join('');
}

function openNewQuestionModal() {
  const title = prompt('Ingresa la pregunta de entrevista:');
  if (!title) return;
  const s = prompt('Situación (Contexto del problema):') || '';
  const t = prompt('Tarea (Tu responsabilidad u objetivo):') || '';
  const a = prompt('Acción (Lo que implementaste exactamente):') || '';
  const r = prompt('Resultado (Métrica o impacto logrado):') || '';

  const newQ = {
    id: 'q-' + Date.now(),
    category: 'BEHAVIORAL',
    title,
    star: { s, t, a, r }
  };
  appState.questions.unshift(newQ);
  saveState();
  renderInterviews();
  showToast('Pregunta STAR guardada en el banco');
}

// ==============================================================================
// VIEW 7: COMPANIES & CONTACTS
// ==============================================================================
function renderCompanies() {
  const compList = document.getElementById('companiesList');
  compList.innerHTML = (appState.companies || []).map(c => `
    <div class="company-item">
      <div>
        <div class="company-name">${escapeHtml(c.name)} <span style="font-size:0.8rem; color:var(--accent-amber);">${c.rating || ''}</span></div>
        <div class="company-industry">${escapeHtml(c.industry)} • ${escapeHtml(c.location || '')}</div>
      </div>
      <div>
        <a href="${c.careersUrl}" target="_blank" class="btn-sm btn-secondary" style="text-decoration:none;">Vacantes ↗</a>
      </div>
    </div>
  `).join('');

  const cntList = document.getElementById('contactsList');
  cntList.innerHTML = (appState.contacts || []).map(cnt => `
    <div class="contact-item">
      <div>
        <div class="contact-name">${escapeHtml(cnt.name)}</div>
        <div class="contact-role">${escapeHtml(cnt.role)} en <strong style="color:#fff;">${escapeHtml(cnt.company)}</strong></div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(cnt.email || '')} • Contacto: ${cnt.lastContact || ''}</div>
      </div>
      <div>
        <a href="mailto:${cnt.email}" class="btn-sm btn-secondary" style="text-decoration:none;">Escribir</a>
      </div>
    </div>
  `).join('');
}

function openCompanyModal() {
  const name = prompt('Nombre de la Empresa:');
  if (!name) return;
  const industry = prompt('Industria / Sector:') || 'Tecnología';
  const careersUrl = prompt('URL de su bolsa de trabajo:') || 'https://';

  appState.companies.push({
    id: 'comp-' + Date.now(),
    name,
    industry,
    location: 'México / Remoto',
    careersUrl,
    rating: '5.0 ★',
    status: 'Watchlist'
  });
  saveState();
  renderCompanies();
  showToast('Empresa agregada al watchlist');
}

function openContactModal() {
  const name = prompt('Nombre del Reclutador o Contacto:');
  if (!name) return;
  const company = prompt('Empresa en la que trabaja:') || '';
  const role = prompt('Rol del contacto (ej. Tech Recruiter):') || 'Reclutador';
  const email = prompt('Correo o enlace de contacto:') || '';

  appState.contacts.push({
    id: 'cnt-' + Date.now(),
    name,
    company,
    role,
    email,
    lastContact: new Date().toISOString().split('T')[0]
  });
  saveState();
  renderCompanies();
  showToast('Contacto registrado en la red');
}

// ==============================================================================
// DOCKED AI ASSISTANT DRAWER
// ==============================================================================
function toggleAiDrawer() {
  const drawer = document.getElementById('aiDrawer');
  drawer.classList.toggle('open');
}

function openAIAssistantWithPrompt(promptText) {
  const drawer = document.getElementById('aiDrawer');
  drawer.classList.add('open');
  document.getElementById('aiChatInput').value = promptText;
  document.getElementById('aiChatInput').focus();
}

function sendQuickPrompt(promptText) {
  document.getElementById('aiChatInput').value = promptText;
  handleAiChatSubmit(new Event('submit'));
}

function handleAiInputKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleAiChatSubmit(event);
  }
}

async function handleAiChatSubmit(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('aiChatInput');
  const text = input.value.trim();
  if (!text) return;

  // Append user message
  appendAiMessage('user', text);
  input.value = '';

  // Show thinking indicator
  const botMsgId = 'msg-' + Date.now();
  appendAiMessage('bot', '<em>Pensando y analizando datos de carrera...</em>', botMsgId);

  // Check if user is asking to extract a job posting
  if (text.toLowerCase().includes('vacante') || text.length > 120) {
    setTimeout(() => {
      const extracted = parseJobText(text);
      if (extracted.role) {
        updateBotMessage(botMsgId, `
          <p><strong>✓ Vacante analizada con éxito:</strong></p>
          <ul>
            <li><strong>Puesto:</strong> ${escapeHtml(extracted.role)}</li>
            <li><strong>Empresa:</strong> ${escapeHtml(extracted.company)}</li>
            <li><strong>Ubicación:</strong> ${escapeHtml(extracted.location)}</li>
            <li><strong>Salario est.:</strong> ${escapeHtml(extracted.salary)}</li>
          </ul>
          <button class="btn-sm btn-primary mt-2" onclick="addExtractedJobToBoard(${JSON.stringify(extracted).replace(/"/g, '&quot;')})">+ Agregar a mi Tablero Kanban</button>
        `);
        return;
      }
    }, 600);
  }

  // Answer normal questions via Multi-Provider Gateway
  try {
    const reply = await queryAiProvider(text);
    updateBotMessage(botMsgId, reply);
  } catch (err) {
    updateBotMessage(botMsgId, generateHeuristicCareerAdvice(text));
  }
}

function appendAiMessage(sender, htmlContent, id = null) {
  const container = document.getElementById('aiMessages');
  const msg = document.createElement('div');
  msg.className = `ai-msg ai-msg-${sender}`;
  if (id) msg.id = id;

  msg.innerHTML = sender === 'bot'
    ? `<div class="msg-avatar">🤖</div><div class="msg-body">${htmlContent}</div>`
    : `<div class="msg-body">${escapeHtml(htmlContent)}</div>`;

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function updateBotMessage(id, htmlContent) {
  const el = document.getElementById(id);
  if (el) {
    const body = el.querySelector('.msg-body');
    if (body) body.innerHTML = htmlContent;
    document.getElementById('aiMessages').scrollTop = document.getElementById('aiMessages').scrollHeight;
  }
}

function parseJobText(rawText) {
  // Simple heuristic parser extracting role, company, salary from pasted post
  let role = 'Software Engineer';
  let company = 'Empresa Confidencial';
  let location = 'Remoto';
  let salary = '$60,000 - $80,000 MXN';

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length > 0) role = lines[0].substring(0, 50);
  if (lines.length > 1 && lines[1].length < 40) company = lines[1];

  const lower = rawText.toLowerCase();
  if (lower.includes('híbrido') || lower.includes('hybrid')) location = 'Híbrido';
  if (lower.includes('presencial') || lower.includes('on-site')) location = 'Presencial';

  return {
    role,
    company,
    location,
    salary,
    description: rawText.substring(0, 500)
  };
}

function addExtractedJobToBoard(jobData) {
  const newJob = {
    id: 'job-' + Date.now(),
    role: jobData.role,
    company: jobData.company,
    status: 'WISHLIST',
    priority: 'HIGH',
    location: jobData.location,
    salary: jobData.salary,
    date: new Date().toISOString().split('T')[0],
    description: jobData.description,
    matchScore: 88
  };
  appState.jobs.unshift(newJob);
  saveState();
  renderApplications();
  renderDashboard();
  showToast('✓ Vacante guardada en tu Kanban');
}

async function queryAiProvider(userPrompt) {
  const provider = appSettings?.provider || 'HEURISTIC';
  const activeResume = getActiveResume();

  if (provider === 'OLLAMA_LOCAL') {
    const endpoint = (appSettings.ollamaEndpoint || 'http://localhost:11434') + '/api/generate';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:7b',
        prompt: `Eres el asesor de carreras de JobSync en yepzhi.com. Usuario: ${activeResume.fullName}. Pregunta: ${userPrompt}. Responde con consejos prácticos y de alto impacto:`,
        stream: false
      })
    });
    const data = await res.json();
    return data.response;
  }

  // Fallback to local heuristic advice
  return generateHeuristicCareerAdvice(userPrompt);
}

function generateHeuristicCareerAdvice(prompt) {
  const lower = prompt.toLowerCase();
  const resume = getActiveResume();

  if (lower.includes('debilidad') || lower.includes('weakness')) {
    return `
      <p><strong>Estrategia para responder sobre tu mayor debilidad:</strong></p>
      <p>Aplica la fórmula: <em>[Habilidad real que antes te costaba] + [Acción concreta que tomaste para mejorarla] + [Resultado actual medible].</em></p>
      <p><strong>Ejemplo recomendado para tu perfil:</strong></p>
      <blockquote style="border-left: 2px solid var(--accent-cyan); padding-left: 0.75rem; margin: 0.5rem 0; color:var(--text-secondary);">
        "En el pasado tendía a asumir la arquitectura completa de los proyectos sin delegar suficientes componentes a tiempo. Al darme cuenta, implementé revisiones de RFCs por pares y tableros con hitos claros, lo que aumentó la velocidad del equipo un 30%."
      </blockquote>
    `;
  }

  if (lower.includes('cv') || lower.includes('resumen') || lower.includes('perfil')) {
    return `
      <p><strong>Análisis rápido de tu CV activo (${escapeHtml(resume.title)}):</strong></p>
      <ul>
        <li><strong>Fortaleza:</strong> Resumen conciso y mención directa de tecnologías clave (${resume.skills.slice(0, 4).join(', ')}).</li>
        <li><strong>Oportunidad de mejora:</strong> Asegúrate de que cada viñeta en tus experiencias empiece con un verbo de acción en pasado (ej. <em>Diseñó, Arquitectó, Lideró</em>) e incluya un número o porcentaje de impacto.</li>
      </ul>
    `;
  }

  return `
    <p>Excelente pregunta sobre tu estrategia de postulación. Para puestos de <strong>${escapeHtml(resume.headline)}</strong>, la clave es diferenciarte demostrando cómo tus soluciones resolvieron problemas de negocio concretos (reducción de costos de nube, escalamiento de usuarios o latencia).</p>
    <p>¿Deseas que preparemos un simulacro de entrevista técnica o redactemos una carta enfocada en tus fortalezas?</p>
  `;
}

function openPasteJobPrompt() {
  switchView('match');
  document.getElementById('matchJobDesc').focus();
  showToast('Pega la descripción de la vacante en el área señalada');
}

// ==============================================================================
// SETTINGS & BACKUP/RESTORE
// ==============================================================================
function openSettingsModal() {
  document.getElementById('settingAiProvider').value = appSettings.provider || 'HEURISTIC';
  document.getElementById('settingOllamaEndpoint').value = appSettings.ollamaEndpoint || 'http://localhost:11434';
  document.getElementById('settingApiKey').value = appSettings.apiKey || '';
  toggleAiSettingsFields();
  document.getElementById('settingsModalBackdrop').classList.add('open');
}

function closeSettingsModal() {
  document.getElementById('settingsModalBackdrop').classList.remove('open');
}

function toggleAiSettingsFields() {
  const prov = document.getElementById('settingAiProvider').value;
  document.getElementById('settingOllamaGroup').style.display = prov === 'OLLAMA_LOCAL' ? 'block' : 'none';
  document.getElementById('settingApiKeyGroup').style.display = (prov === 'GEMINI' || prov === 'OPENAI') ? 'block' : 'none';
}

function exportDataBackup() {
  const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JobSync_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ Respaldo JSON descargado');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.jobs && data.resumes) {
        appState = data;
        saveState();
        renderAllViews();
        closeSettingsModal();
        showToast('✓ Respaldo restaurado con éxito');
      } else {
        alert('El archivo no contiene un formato de respaldo válido de JobSync.');
      }
    } catch (err) {
      alert('Error al leer el archivo JSON.');
    }
  };
  reader.readAsText(file);
}

function resetToSampleData() {
  if (confirm('¿Restablecer a los datos de demostración? Tus cambios locales actuales se reemplazarán.')) {
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    saveState();
    renderAllViews();
    closeSettingsModal();
    showToast('Datos de demostración restablecidos');
  }
}

// ==============================================================================
// UTILITIES
// ==============================================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = '0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
