/* ───────────────────────────────────────────────
   RICHMOND PRO · Help & Support Client Logic
   yepzhi.com/help
──────────────────────────────────────────────── */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  onSnapshot,
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase Configuration (RProDash cloud project - yepzhi.com)
const firebaseConfig = {
  apiKey:            "AIzaSyCCyhX69gadotGWr_ahCSZbRF7CAdeMe1E",
  authDomain:        "rprodash.firebaseapp.com",
  projectId:         "rprodash",
  storageBucket:     "rprodash.firebasestorage.app",
  messagingSenderId: "116659616322",
  appId:             "1:116659616322:web:a422259da3034e71654bdb"
};

let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('[RichmondPro Help] Firebase connected');
} catch (err) {
  console.warn('[RichmondPro Help] Firebase init note:', err);
}

// Google Sheets Webhook URL (Pega aquí la URL de tu Apps Script implementado)
export const SHEETS_WEBHOOK_URL = '';

// Asesores de México (leadgen/team.js sin gerentes)
export const ADVISORS = [
  { id: 'noroeste',  nombre: 'Alberto Yépiz',   zona: 'Noroeste (Sonora, Sinaloa, BC, BCS, Chih)', wa: '5216621147374' },
  { id: 'norte',     nombre: 'Luis Franco',     zona: 'Norte (Durango, Coahuila, NL, Tamps, Zac)',  wa: '5218119905772' },
  { id: 'occidente', nombre: 'Fabiola Martinez',zona: 'Occidente (Jal, Col, Mich, Ags, Gto, Nay)', wa: '5213316025928' },
  { id: 'sureste',   nombre: 'Arturo Mendoza',  zona: 'Sureste (Oax, Chis, Tab, Camp, Yuc, QRoo)',  wa: '5215537339886' },
  { id: 'puebla',    nombre: 'Joel Navor',      zona: 'Puebla / Veracruz / Mor / Gro / Tlax',       wa: '522211057576' },
  { id: 'toluca',    nombre: 'Edgar Espinoza',  zona: 'Toluca / EdoMex / Hgo / Qro / SLP',         wa: '526641234572' },
  { id: 'cdmx1',     nombre: 'Miguel Campero',  zona: 'CDMX / EdoMex',                              wa: '5218116318251' },
  { id: 'cdmx2',     nombre: 'Daniel Morales',  zona: 'CDMX / EdoMex',                              wa: '5215537339631' },
  { id: 'cdmx3',     nombre: 'Yanzer Rebollo',  zona: 'Académico Richmond Pro / CDMX',              wa: '5215666689003' }
];

// Estado de la Solicitud
const STATE = {
  currentStep: 1,
  data: {
    issueType: '',
    school: '',
    schoolOther: '',
    email: '',
    altEmail: '',
    fullName: '',
    nickname: '',
    bookCode: '',
    notes: ''
  },
  activeTicket: null,
  activeTimerInterval: null,
  activeSnapshotUnsub: null
};

// ─── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initIssueSelectors();
  initSchoolSelect();
  initNavTabs();
  initLookupEnterKey();

  // Revisar si viene folio en URL (?folio=HELP-XXXXX)
  const urlParams = new URLSearchParams(window.location.search);
  const qFolio = urlParams.get('folio');
  if (qFolio) {
    switchTab('status');
    const input = document.getElementById('lookupInput');
    if (input) input.value = qFolio;
    searchTicketStatus(qFolio);
  }
});

// ─── NAV TABS ─────────────────────────────────────
function initNavTabs() {
  const tabForm = document.getElementById('tabForm');
  const tabStatus = document.getElementById('tabStatus');

  if (tabForm) {
    tabForm.addEventListener('click', () => switchTab('form'));
  }
  if (tabStatus) {
    tabStatus.addEventListener('click', () => switchTab('status'));
  }
}

export function switchTab(tab) {
  const tabForm = document.getElementById('tabForm');
  const tabStatus = document.getElementById('tabStatus');
  const viewForm = document.getElementById('viewForm');
  const viewStatus = document.getElementById('viewStatus');

  if (tab === 'form') {
    tabForm?.classList.add('active');
    tabStatus?.classList.remove('active');
    viewForm?.classList.add('active');
    viewStatus?.classList.remove('active');
  } else {
    tabStatus?.classList.add('active');
    tabForm?.classList.remove('active');
    viewStatus?.classList.add('active');
    viewForm?.classList.remove('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.switchTab = switchTab;

// ─── ISSUE SELECTOR CHIPS ─────────────────────────
function initIssueSelectors() {
  const cards = document.querySelectorAll('.issue-card:not(.issue-card-external)');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const val = card.dataset.value;
      STATE.data.issueType = val;
      clearError('err-issueType');
    });
  });
}

// ─── SCHOOL DROPDOWN HANDLER ──────────────────────
function initSchoolSelect() {
  const schoolSelect = document.getElementById('schoolSelect');
  const otherWrap = document.getElementById('schoolOtherWrap');

  if (schoolSelect) {
    schoolSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      STATE.data.school = val;
      clearError('err-school');
      if (val === 'OTRA') {
        if (otherWrap) otherWrap.style.display = 'block';
      } else {
        if (otherWrap) otherWrap.style.display = 'none';
        STATE.data.schoolOther = '';
      }
    });
  }
}

// ─── WARNING BOX COLLAPSE (CON ESTILO) ────────────
export function toggleWarningBox() {
  const box = document.getElementById('warningBox');
  if (!box) return;
  const isCollapsed = box.classList.contains('is-collapsed');
  setWarningBoxCollapsed(!isCollapsed);
}
window.toggleWarningBox = toggleWarningBox;

export function setWarningBoxCollapsed(collapsed) {
  const box = document.getElementById('warningBox');
  const label = document.getElementById('warningToggleLabel');
  const btn = document.getElementById('warningToggleBtn');
  if (!box) return;

  if (collapsed) {
    box.classList.add('is-collapsed');
    if (label) label.textContent = 'Ver soluciones frecuentes (2)';
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('title', 'Mostrar soluciones frecuentes a errores');
    }
  } else {
    box.classList.remove('is-collapsed');
    if (label) label.textContent = 'Ocultar guía';
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('title', 'Ocultar guía de soluciones');
    }
  }
}
window.setWarningBoxCollapsed = setWarningBoxCollapsed;

// ─── STEPPER NAVIGATION ───────────────────────────
export function goStep(stepNumber) {
  const currentStepEl = document.getElementById(`step-${STATE.currentStep}`);
  const nextStepEl = document.getElementById(`step-${stepNumber}`);

  if (!nextStepEl) return;

  currentStepEl?.classList.remove('active');
  nextStepEl.classList.add('active');

  STATE.currentStep = stepNumber;
  updateStepperProgress(stepNumber);

  // Al avanzar más allá del paso 1, colapsar con estilo el anuncio de errores comunes
  if (stepNumber > 1) {
    setWarningBoxCollapsed(true);
  } else {
    setWarningBoxCollapsed(false);
  }

  // Desplazamiento fluido hacia la tarjeta para una experiencia impecable
  const wizardCard = document.querySelector('.glass-card');
  if (wizardCard && stepNumber > 1) {
    const yOffset = -24;
    const y = wizardCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
window.goStep = goStep;

function updateStepperProgress(current) {
  const fill = document.getElementById('progressFill');
  const nodes = document.querySelectorAll('.step-node');

  // Máximo 4 pasos en la barra
  const pct = Math.min(100, Math.max(0, (current - 1) / 3 * 100));
  if (fill) fill.style.width = `${pct}%`;

  nodes.forEach(node => {
    const step = parseInt(node.dataset.step, 10);
    node.classList.remove('active', 'completed');
    if (step === current) {
      node.classList.add('active');
    } else if (step < current) {
      node.classList.add('completed');
    }
  });
}

// ─── VALIDATIONS ──────────────────────────────────
export function validateStep1() {
  let ok = true;

  if (!STATE.data.issueType) {
    setError('err-issueType', 'Por favor selecciona el tipo de incidencia que presentas.');
    ok = false;
  } else {
    clearError('err-issueType');
  }

  const school = document.getElementById('schoolSelect').value;
  if (!school) {
    setError('err-school', 'Por favor selecciona tu escuela o institución.');
    markInput('schoolSelect', true);
    ok = false;
  } else {
    clearError('err-school');
    markInput('schoolSelect', false);
    STATE.data.school = school;

    if (school === 'OTRA') {
      const otherVal = document.getElementById('schoolOtherInput').value.trim();
      if (!otherVal) {
        setError('err-schoolOther', 'Indica el nombre de tu institución.');
        markInput('schoolOtherInput', true);
        ok = false;
      } else {
        clearError('err-schoolOther');
        markInput('schoolOtherInput', false);
        STATE.data.schoolOther = otherVal;
      }
    }
  }

  if (ok) goStep(2);
}
window.validateStep1 = validateStep1;

export function validateStep2() {
  let ok = true;
  const email = document.getElementById('emailInput').value.trim();
  const altEmail = document.getElementById('altEmailInput').value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !re.test(email)) {
    setError('err-email', 'Ingresa el correo electrónico que usaste para registrarte.');
    markInput('emailInput', true);
    ok = false;
  } else {
    clearError('err-email');
    markInput('emailInput', false);
    STATE.data.email = email;
  }

  if (altEmail && !re.test(altEmail)) {
    setError('err-altEmail', 'Ingresa un correo con formato válido (ej. usuario@dominio.com).');
    markInput('altEmailInput', true);
    ok = false;
  } else {
    clearError('err-altEmail');
    markInput('altEmailInput', false);
    STATE.data.altEmail = altEmail;
  }

  if (ok) goStep(3);
}
window.validateStep2 = validateStep2;

export function validateStep3() {
  let ok = true;
  const fullName = document.getElementById('fullNameInput').value.trim();
  const nickname = document.getElementById('nicknameInput').value.trim();

  if (!fullName || fullName.length < 3) {
    setError('err-fullName', 'Por favor ingresa tu nombre completo.');
    markInput('fullNameInput', true);
    ok = false;
  } else {
    clearError('err-fullName');
    markInput('fullNameInput', false);
    STATE.data.fullName = fullName;
    STATE.data.nickname = nickname;
  }

  if (ok) goStep(4);
}
window.validateStep3 = validateStep3;

export function validateStep4() {
  let ok = true;
  const bookCode = document.getElementById('bookCodeInput').value.trim();
  const notes = document.getElementById('notesInput').value.trim();

  if (!bookCode || bookCode.length < 4) {
    setError('err-bookCode', 'Por favor ingresa el código de tu libro (página izquierda).');
    markInput('bookCodeInput', true);
    ok = false;
  } else {
    clearError('err-bookCode');
    markInput('bookCodeInput', false);
    STATE.data.bookCode = bookCode.toUpperCase();
    STATE.data.notes = notes;
  }

  if (ok) {
    submitTicket();
  }
}
window.validateStep4 = validateStep4;

// ─── ERROR HELPERS ────────────────────────────────
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = '';
}
function markInput(id, isError) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('error', isError);
}

// ─── SUBMIT TICKET ────────────────────────────────
async function submitTicket() {
  const submitBtn = document.getElementById('btnSubmitTicket');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      Registrando solicitud…`;
  }

  // Generar Folio Único (ej. HELP-84920)
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const folio = `HELP-${randomNum}`;

  // Determinación de Asesor:
  // Noroeste -> Alberto Yépiz (UTH, ITESCA, ITLM, ITH, IT MXL, UNIVAFU)
  // Norte    -> Luis Franco (UAZ PEUL, UJED, ICEST TAMPICO, CI 22 UANL)
  // Occidente -> Fabiola Martinez (UTNA, IT CUL, BACH TEPIC, UPSIN, CETI COLOMOS, LAMAR, CAI)
  // Toluca / EdoMex / Mich -> Edgar Espinoza (UTZIN, UPOTEC, UAEM, ENES, UMSNH, SIRIUS, IBIM, UTSEM, TESJI, UIEM)
  const schoolKey = STATE.data.school;
  let assignedAdvisor = 'Alberto Yépiz';
  let advisorWA = '5216621147374';

  const NORTE_SCHOOLS = [
    'UAZ PEUL',
    'UJED',
    'ICEST TAMPICO',
    'CI 22 UANL'
  ];

  const OCCIDENTE_SCHOOLS = [
    'UTNA',
    'IT CUL',
    'BACH TEPIC',
    'UPSIN',
    'CETI COLOMOS',
    'LAMAR',
    'CAI'
  ];

  const TOLUCA_SCHOOLS = [
    'UTZIN',
    'UPOTEC',
    'UAEM ENFERMERIA',
    'UAEM CS EXACTAS',
    'ENES MORELIA',
    'UMSNH',
    'SIRIUS',
    'IBIM ATLACOMULCO',
    'IBIM TOLUCA',
    'UTSEM',
    'TESJI',
    'UIEM',
    'UAEM QUIMICA',
    'UAEM ODONTOLOGIA'
  ];

  const SCHOOL_NAMES = {
    'UTH': 'UTH - Univ. Tecnológica de Hermosillo',
    'ITESCA': 'ITESCA - Inst. Tecnológico Superior de Cajeme',
    'ITLM': 'ITLM - Inst. Tecnológico de Los Mochis',
    'ITH': 'ITH - Inst. Tecnológico de Hermosillo',
    'IT MXL': 'IT MXL - Inst. Tecnológico de Mexicali',
    'UNIVAFU': 'UNIVAFU - Universidad del Valle del Fuerte',
    'UAZ PEUL': 'UAZ PEUL - Universidad Autónoma de Zacatecas (PEUL)',
    'UJED': 'UJED - Facultad de Lenguas PUAALI',
    'ICEST TAMPICO': 'ICEST Tampico',
    'CI 22 UANL': 'CI 22 UANL - Centro de Idiomas Prepa',
    'UTNA': 'UTNA - Univ. Tecnológica del Norte de Aguascalientes',
    'IT CUL': 'IT CUL - Inst. Tecnológico de Culiacán',
    'BACH TEPIC': 'Bach. de Ciencias y Letras de Tepic',
    'UPSIN': 'UPSIN - Univ. Politécnica de Sinaloa',
    'CETI COLOMOS': 'CETI Colomos - Centro de Enseñanza Técnica Industrial',
    'LAMAR': 'LAMAR - Univ. Guadalajara LAMAR',
    'CAI': 'CAI - Coordinación de Asuntos Internacionales',
    'UTZIN': 'UTZIN - Universidad Tecnológica de Zinacantepec',
    'UPOTEC': 'UPOTEC - Universidad Politécnica de Otzolotepec',
    'UAEM ENFERMERIA': 'UAEM - Facultad de Enfermería',
    'UAEM CS EXACTAS': 'UAEM - Facultad de Ciencias Exactas',
    'ENES MORELIA': 'ENES Campus Morelia',
    'UMSNH': 'UMSNH - Univ. Michoacana de San Nicolás de Hidalgo',
    'SIRIUS': 'Sirius Campus Universitario',
    'IBIM ATLACOMULCO': 'IBIM Atlacomulco',
    'IBIM TOLUCA': 'IBIM Toluca',
    'UTSEM': 'UTSEM - Univ. Tecnológica del Sur del Edo. de México',
    'TESJI': 'TESJI - Tec. de Estudios Superiores de Jilotepec',
    'UIEM': 'UIEM - Univ. Intercultural del Edo. de México',
    'UAEM QUIMICA': 'UAEM - Facultad de Química',
    'UAEM ODONTOLOGIA': 'UAEM - Facultad de Odontología'
  };

  if (TOLUCA_SCHOOLS.includes(schoolKey)) {
    assignedAdvisor = 'Edgar Espinoza';
    advisorWA = '526641234572';
  } else if (NORTE_SCHOOLS.includes(schoolKey)) {
    assignedAdvisor = 'Luis Franco';
    advisorWA = '5218119905772';
  } else if (OCCIDENTE_SCHOOLS.includes(schoolKey)) {
    assignedAdvisor = 'Fabiola Martinez';
    advisorWA = '5213316025928';
  } else {
    assignedAdvisor = 'Alberto Yépiz';
    advisorWA = '5216621147374';
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-MX', {
    timeZone: 'America/Hermosillo',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const payload = {
    folio: folio,
    issueType: STATE.data.issueType,
    school: schoolKey === 'OTRA' ? (STATE.data.schoolOther || 'Otra institución') : (SCHOOL_NAMES[schoolKey] || schoolKey),
    schoolCode: schoolKey,
    email: STATE.data.email.toLowerCase(),
    altEmail: STATE.data.altEmail ? STATE.data.altEmail.toLowerCase() : '',
    fullName: STATE.data.fullName,
    nickname: STATE.data.nickname || '',
    bookCode: STATE.data.bookCode,
    notes: STATE.data.notes || '',
    status: 'Pendiente', // 'Pendiente' | 'En Revisión' | 'Resuelto'
    assignedAdvisor: assignedAdvisor,
    advisorWA: advisorWA,
    solutionNote: '',
    createdAtMillis: Date.now(),
    createdAtDateStr: dateStr,
    resolvedAtMillis: null,
    elapsedMinutes: 0
  };

  // Ocultar error previo si existe
  const errCloudBox = document.getElementById('err-submit-cloud');
  const errCloudMsg = document.getElementById('err-submit-cloud-msg');
  if (errCloudBox) errCloudBox.style.display = 'none';

  let firestoreDocId = null;

  // Guardar en Firebase Firestore (REQUERIDO)
  if (!db) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Enviar Solicitud <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    }
    if (errCloudBox) {
      errCloudBox.style.display = 'block';
      if (errCloudMsg) errCloudMsg.textContent = 'No hay conexión activa con la base de datos de Richmond Pro. Verifica tu conexión a internet e intenta nuevamente.';
    }
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "help_tickets"), {
      ...payload,
      createdAt: serverTimestamp()
    });
    firestoreDocId = docRef.id;
    console.log('[RichmondPro Help] Ticket saved to Firestore with ID:', docRef.id);
  } catch (err) {
    console.error('[RichmondPro Help] Firestore save error:', err);
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Reintentar Envío de Solicitud <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    }
    if (errCloudBox) {
      errCloudBox.style.display = 'block';
      if (errCloudMsg) errCloudMsg.textContent = `No se pudo completar el registro en la base de datos (${err.code || err.message || 'Error de conexión'}). Por favor presiona "Reintentar Envío de Solicitud".`;
    }
    return; // <-- Si no se guarda bien en Firestore, muestra el error y no completa el ticket
  }

  // Guardar en LocalStorage como respaldo
  const localTickets = JSON.parse(localStorage.getItem('richmond_help_tickets') || '[]');
  localTickets.unshift({ ...payload, firestoreId: firestoreDocId });
  localStorage.setItem('richmond_help_tickets', JSON.stringify(localTickets.slice(0, 100)));

  // Enviar a Google Sheets Webhook si está configurado
  if (SHEETS_WEBHOOK_URL && SHEETS_WEBHOOK_URL.startsWith('http')) {
    fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        firestoreId: firestoreDocId,
        dateStr: dateStr
      })
    }).catch(err => console.warn('[Sheets Webhook] notice:', err));
  }

  // Renderizar Pantalla de Éxito
  renderSuccessScreen(payload);
}

function renderSuccessScreen(ticket) {
  const folioCodeEl = document.getElementById('successFolioCode');
  const schoolEl = document.getElementById('successSchool');
  const advisorEl = document.getElementById('successAdvisor');

  if (folioCodeEl) folioCodeEl.textContent = ticket.folio;
  if (schoolEl) schoolEl.textContent = ticket.school;
  if (advisorEl) advisorEl.textContent = ticket.assignedAdvisor;

  goStep(5);
  showToast('¡Tu solicitud ha sido recibida con éxito!');
}

// ─── COPY FOLIO ───────────────────────────────────
export function copyFolioCode() {
  const code = document.getElementById('successFolioCode')?.textContent?.trim();
  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      showToast(`Folio ${code} copiado al portapapeles`);
    });
  }
}
window.copyFolioCode = copyFolioCode;

export function viewMyNewTicket() {
  const code = document.getElementById('successFolioCode')?.textContent?.trim();
  if (code) {
    switchTab('status');
    const input = document.getElementById('lookupInput');
    if (input) input.value = code;
    searchTicketStatus(code);
  }
}
window.viewMyNewTicket = viewMyNewTicket;

// ─── LOOKUP / CONSULTAR ESTATUS ───────────────────
function initLookupEnterKey() {
  const input = document.getElementById('lookupInput');
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchTicketStatus();
      }
    });
  }
}

export async function searchTicketStatus(explicitQuery = null) {
  const input = document.getElementById('lookupInput');
  const rawQ = (explicitQuery || input?.value || '').trim();
  const errEl = document.getElementById('lookupError');
  const resultContainer = document.getElementById('lookupResultContainer');

  if (!rawQ) {
    if (errEl) errEl.textContent = 'Ingresa tu Folio (ej. HELP-12345) o tu correo registrado.';
    return;
  }
  if (errEl) errEl.textContent = '';

  resultContainer.innerHTML = `
    <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="animation: spin 1s linear infinite; margin-bottom: 0.5rem;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10"/>
      </svg>
      <p style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">Consultando estatus de tu solicitud…</p>
    </div>
  `;

  let foundTicket = null;
  const cleanQ = rawQ.trim();
  let folioCandidate = cleanQ.toUpperCase();
  if (/^\d{4,6}$/.test(cleanQ)) {
    folioCandidate = `HELP-${cleanQ}`;
  }

  // 1. Buscar en Firestore
  if (db) {
    try {
      // Buscar por Folio (con o sin prefijo HELP-)
      let q = query(collection(db, "help_tickets"), where("folio", "==", folioCandidate));
      let snapshot = await getDocs(q);

      if (snapshot.empty && folioCandidate !== cleanQ.toUpperCase()) {
        q = query(collection(db, "help_tickets"), where("folio", "==", cleanQ.toUpperCase()));
        snapshot = await getDocs(q);
      }

      if (!snapshot.empty) {
        foundTicket = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      } else {
        // Buscar por email principal
        q = query(collection(db, "help_tickets"), where("email", "==", cleanQ.toLowerCase()));
        snapshot = await getDocs(q);
        if (!snapshot.empty) {
          foundTicket = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        } else {
          // Buscar por email alternativo
          q = query(collection(db, "help_tickets"), where("altEmail", "==", cleanQ.toLowerCase()));
          snapshot = await getDocs(q);
          if (!snapshot.empty) {
            foundTicket = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
          }
        }
      }
    } catch (e) {
      console.warn('[Lookup] Firestore error, trying local cache:', e);
    }
  }

  // 2. Fallback a LocalStorage si no se halló en Firestore
  if (!foundTicket) {
    const local = JSON.parse(localStorage.getItem('richmond_help_tickets') || '[]');
    foundTicket = local.find(t => 
      (t.folio && (t.folio.toUpperCase() === folioCandidate || t.folio.toUpperCase() === cleanQ.toUpperCase())) || 
      (t.email && t.email.toLowerCase() === cleanQ.toLowerCase()) ||
      (t.altEmail && t.altEmail.toLowerCase() === cleanQ.toLowerCase())
    );
  }

  if (!foundTicket) {
    resultContainer.innerHTML = `
      <div style="text-align:center; padding: 2rem 1.5rem; background: #fff1f2; border: 1.5px dashed #f43f5e; border-radius: 18px;">
        <p style="color: #9f1239; font-weight: 700; font-size: 1rem; margin-bottom: 0.4rem;">No encontramos una solicitud con ese dato</p>
        <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.45;">
          Verifica que hayas escrito tu Folio correctamente (ej. HELP-12345) o el mismo correo electrónico que ingresaste al registrar la solicitud.
        </p>
      </div>
    `;
    return;
  }

  STATE.activeTicket = foundTicket;

  // Suscribirse a cambios en tiempo real en Firestore
  if (STATE.activeSnapshotUnsub) {
    STATE.activeSnapshotUnsub();
    STATE.activeSnapshotUnsub = null;
  }

  if (db && foundTicket.id) {
    try {
      STATE.activeSnapshotUnsub = onSnapshot(doc(db, "help_tickets", foundTicket.id), (docSnap) => {
        if (docSnap.exists()) {
          const freshData = { id: docSnap.id, ...docSnap.data() };
          STATE.activeTicket = freshData;
          renderStatusCard(freshData);
        }
      });
    } catch (err) {
      console.warn('[Realtime listener notice]:', err);
    }
  }

  renderStatusCard(foundTicket);
}
window.searchTicketStatus = searchTicketStatus;

// ─── RENDER STATUS CARD WITH ELAPSED TIME & QUEUE ───
function renderStatusCard(ticket) {
  const container = document.getElementById('lookupResultContainer');
  if (!container) return;

  // Limpiar timer anterior
  if (STATE.activeTimerInterval) {
    clearInterval(STATE.activeTimerInterval);
    STATE.activeTimerInterval = null;
  }

  const isResolved = ticket.status === 'Resuelto';
  const isProgress = ticket.status === 'En Revisión';

  let badgeClass = 'pending';
  let badgeText = 'En Espera de Revisión';
  if (isResolved) {
    badgeClass = 'resolved';
    badgeText = 'Solicitud Resuelta';
  } else if (isProgress) {
    badgeClass = 'progress';
    badgeText = 'En Proceso de Atención';
  }

  const createdAt = ticket.createdAtMillis || (ticket.createdAt?.toDate ? ticket.createdAt.toDate().getTime() : Date.now());
  const resolvedAt = ticket.resolvedAtMillis || null;
  const assignedPassword = (ticket.assignedPassword || '').trim();
  const noteText = (ticket.solutionNote || '').toLowerCase();
  const isNoUserFound = noteText.includes('no se encontró') || 
                        noteText.includes('no se encontro') || 
                        noteText.includes('ningún usuario') || 
                        noteText.includes('ningun usuario');
  const hasPasswordAssigned = isResolved && assignedPassword.length > 0 && !isNoUserFound;

  container.innerHTML = `
    <div class="status-card">
      <div class="status-card-header">
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); font-weight: 800;">Folio Oficial</span>
          <h3 style="font-size: 1.45rem; font-weight: 900; color: var(--text-main); font-family: monospace;">${ticket.folio}</h3>
        </div>
        <div class="status-badge ${badgeClass}">
          ${badgeText}
        </div>
      </div>

      <!-- CASO 1: RESUELTO CON CONTRASEÑA ASIGNADA -->
      ${hasPasswordAssigned ? `
        <div class="resolved-hero-card">
          <div class="resolved-hero-header">
            <span class="resolved-check-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <div>
              <h4 class="resolved-hero-title">¡Tu solicitud está resuelta!</h4>
              <p class="resolved-hero-subtitle">Puedes proceder a ingresar a tu portal Richmond Studio con estos datos:</p>
            </div>
          </div>

          <div class="resolved-credentials-box">
            <div class="cred-row">
              <span class="cred-label">Usuario / Correo:</span>
              <div class="cred-val-wrap">
                <code class="cred-val" id="credEmailText">${escapeHtml(ticket.email)}</code>
                <button type="button" class="btn-copy" onclick="copyToClipboard('${escapeHtml(ticket.email)}', this)">Copiar</button>
              </div>
            </div>

            <div class="cred-row">
              <span class="cred-label">Contraseña asignada:</span>
              <div class="cred-val-wrap">
                <code class="cred-val highlight" id="credPassText">${escapeHtml(assignedPassword)}</code>
                <button type="button" class="btn-copy" onclick="copyToClipboard('${escapeHtml(assignedPassword)}', this)">Copiar</button>
              </div>
            </div>
          </div>

          <div class="resolved-action-bar">
            <a href="https://www.richmondlp.com" target="_blank" rel="noopener noreferrer" class="btn-access-studio" title="Ingresar a la plataforma Richmond Studio">
              <span>Ingresar a mi portal Richmond Studio</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <p class="resolved-tip">
            Una vez dentro, podrás actualizar tu contraseña si lo deseas en la sección <strong>"My Profile"</strong>.
          </p>
        </div>
      ` : ''}

      <!-- CASO 2: NO SE ENCONTRÓ USUARIO (SIN CONTRASEÑA) -->
      ${isNoUserFound ? `
        <div class="resolved-hero-card" style="background: #fffbeb; border: 2px solid #fcd34d; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.12);">
          <div class="resolved-hero-header">
            <span class="resolved-check-icon" style="background: #f59e0b; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </span>
            <div>
              <h4 class="resolved-hero-title" style="color: #92400e;">${isResolved ? 'Solicitud Atendida: Usuario No Encontrado' : 'Revisión: Usuario No Encontrado'}</h4>
              <p class="resolved-hero-subtitle" style="color: #78350f;">No existe una cuenta registrada previa con estos datos en la plataforma Richmond Studio.</p>
            </div>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #fde68a; border-radius: 14px; padding: 1.05rem 1.25rem; color: #1e293b; font-size: 0.93rem; line-height: 1.55; font-weight: 600;">
            ${escapeHtml(ticket.solutionNote || 'No se encontró ningún usuario con esos datos. Favor de revisar e intentar registrar su código de nuevo en la plataforma; mandar foto al asesor vía WhatsApp. Si sigue saliendo inválido se le proporcionará un código de repuesto nuevo.')}
          </div>

          <div style="margin-top: 0.3rem;">
            <a href="https://wa.me/${ticket.advisorWA || '5216621147374'}?text=${encodeURIComponent(`Hola, envío foto de mi código sobre mi solicitud con Folio: ${ticket.folio} (${ticket.fullName})`)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="btn-solution-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
              </svg>
              Enviar foto de mi código al asesor por WhatsApp
            </a>
          </div>

          <p class="resolved-tip" style="color: #92400e;">
            <strong>Nota:</strong> Al no existir cuenta previa en la plataforma, <strong>NO</strong> se te asignó ninguna contraseña predeterminada. Debes crear tu cuenta registrando tu código del libro.
          </p>
        </div>
      ` : ''}

      <!-- CASO 3: EN PROCESO (SIN RESOLUCIÓN NI AVISO DE NO USUARIO) -->
      ${(!isResolved && !isNoUserFound) ? `
        <div class="queue-box" id="queuePositionBox">
          <div class="queue-box-info">
            <div class="queue-icon-bubble">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div>
              <div class="queue-headline">Fila de Atención en Vivo</div>
              <div class="queue-subtext" id="queuePosText">Calculando solicitudes en cola…</div>
            </div>
          </div>
          <span class="queue-badge-pill" id="queuePosVal">Consultando…</span>
        </div>
      ` : ''}

      <!-- Live Elapsed Time Ticker -->
      <div class="elapsed-box">
        <div class="elapsed-label">
          <span class="elapsed-pulse-dot" style="${isResolved ? 'background:#16a34a; box-shadow:0 0 10px #16a34a; animation:none;' : ''}"></span>
          <span>${isResolved ? 'Tiempo Total de Resolución (SLA):' : 'Tiempo Transcurrido (Elapsed Time):'}</span>
        </div>
        <div class="elapsed-time-val" id="liveElapsedTimer">
          Calculando…
        </div>
      </div>

      <!-- Indicaciones Generales del Asesor si no es caso de "No Usuario" -->
      ${(ticket.solutionNote && !isNoUserFound) ? `
        <div class="advisor-solution-box">
          <div class="solution-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Indicaciones del Asesor:
          </div>
          <div class="solution-text">${escapeHtml(ticket.solutionNote)}</div>

          ${(ticket.solutionNote.toLowerCase().includes('whatsapp') || ticket.solutionNote.toLowerCase().includes('foto') || ticket.solutionNote.toLowerCase().includes('código') || ticket.solutionNote.toLowerCase().includes('codigo') || ticket.solutionNote.toLowerCase().includes('asesor')) ? `
            <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed rgba(22, 163, 74, 0.35); display: flex; flex-direction: column; gap: 0.45rem;">
              <span style="font-size: 0.78rem; color: #166534; font-weight: 700;">Envía la foto de tu código directamente a tu asesor aquí:</span>
              <a href="https://wa.me/${ticket.advisorWA || '5216621147374'}?text=${encodeURIComponent(`Hola, envío la foto de mi código respecto a mi solicitud con Folio: ${ticket.folio} (${ticket.fullName})`)}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn-solution-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                </svg>
                Contactar directamente a tu asesor por WhatsApp
              </a>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="status-details-grid">
        <div class="status-detail-item">
          <span class="label">Alumno</span>
          <span class="val">${escapeHtml(ticket.fullName)} ${ticket.nickname ? `(${escapeHtml(ticket.nickname)})` : ''}</span>
        </div>
        <div class="status-detail-item">
          <span class="label">Institución</span>
          <span class="val">${escapeHtml(ticket.school)}</span>
        </div>
        <div class="status-detail-item">
          <span class="label">Tipo de Incidencia</span>
          <span class="val">${escapeHtml(ticket.issueType)}</span>
        </div>
        <div class="status-detail-item">
          <span class="label">Asesor Responsable</span>
          <span class="val" style="color: var(--primary);">${escapeHtml(ticket.assignedAdvisor || 'Alberto Yépiz')}</span>
        </div>
        <div class="status-detail-item">
          <span class="label">Fecha de Registro</span>
          <span class="val">${ticket.createdAtDateStr || 'Reciente'}</span>
        </div>
        <div class="status-detail-item">
          <span class="label">Código de Libro</span>
          <span class="val" style="font-family: monospace;">${escapeHtml(ticket.bookCode)}</span>
        </div>
      </div>

      <div style="margin-top: 0.5rem; text-align: center;">
        <a href="https://wa.me/${ticket.advisorWA || '5216621147374'}?text=${encodeURIComponent(`Hola, tengo una duda sobre mi solicitud con Folio: ${ticket.folio} (${ticket.fullName})`)}" 
           target="_blank" 
           rel="noopener noreferrer" 
           style="display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.82rem; color: var(--success); text-decoration: none; font-weight: 700;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
          </svg>
          Contactar directamente a tu asesor por WhatsApp
        </a>
      </div>
    </div>
  `;

  // Arrancar temporizador
  updateElapsedTimeDisplay(createdAt, resolvedAt, isResolved);
  if (!isResolved) {
    STATE.activeTimerInterval = setInterval(() => {
      updateElapsedTimeDisplay(createdAt, resolvedAt, false);
    }, 1000);

    // Calcular posición en la fila en tiempo real
    updateQueuePositionDisplay(ticket);
  }
}

// ─── CÁLCULO DE POSICIÓN EN COLA EN TIEMPO REAL ───
async function updateQueuePositionDisplay(ticket) {
  const queueBoxEl = document.getElementById('queuePositionBox');
  if (!queueBoxEl) return;
  if (!db) {
    queueBoxEl.style.display = 'none';
    return;
  }

  const myCreated = ticket.createdAtMillis || (ticket.createdAt?.toDate ? ticket.createdAt.toDate().getTime() : 0);
  if (!myCreated) return;

  try {
    const q = query(
      collection(db, "help_tickets"),
      where("status", "in", ["Pendiente", "En Revisión"])
    );
    const snap = await getDocs(q);
    let aheadCount = 0;
    snap.forEach(docSnap => {
      const d = docSnap.data();
      if (docSnap.id !== ticket.id && d.folio !== ticket.folio) {
        const theirCreated = d.createdAtMillis || (d.createdAt?.toDate ? d.createdAt.toDate().getTime() : 0);
        if (theirCreated && theirCreated < myCreated) {
          aheadCount++;
        }
      }
    });

    const posEl = document.getElementById('queuePosVal');
    const textEl = document.getElementById('queuePosText');
    if (posEl) posEl.textContent = `Posición: #${aheadCount + 1}`;
    if (textEl) {
      if (aheadCount === 0) {
        textEl.innerHTML = `<strong>¡Eres el siguiente en ser atendido!</strong> Tu asesor está revisando tu caso.`;
      } else if (aheadCount === 1) {
        textEl.innerHTML = `Hay <strong>1 solicitud</strong> antes que la tuya en la fila de atención.`;
      } else {
        textEl.innerHTML = `Hay <strong>${aheadCount} solicitudes</strong> antes que la tuya en la fila de atención.`;
      }
    }
  } catch (err) {
    console.warn('[Queue Calc Error]:', err);
  }
}

function updateElapsedTimeDisplay(createdAtMillis, resolvedAtMillis, isResolved) {
  const el = document.getElementById('liveElapsedTimer');
  if (!el) return;

  const targetEnd = (isResolved && resolvedAtMillis) ? resolvedAtMillis : Date.now();
  const diffMs = Math.max(0, targetEnd - createdAtMillis);

  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (n) => String(n).padStart(2, '0');

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    el.textContent = `${days}d ${pad(remHours)}h ${pad(minutes)}m`;
  } else if (hours > 0) {
    el.textContent = `${hours}h ${pad(minutes)}m`;
  } else {
    el.textContent = `${minutes} min`;
  }
}

// ─── CLIPBOARD COPY HELPER ────────────────────────
export function copyToClipboard(text, btn) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '¡Copiado!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = '¡Copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 1500);
  });
}
window.copyToClipboard = copyToClipboard;

// ─── TOAST NOTIFICATION ───────────────────────────
export function showToast(msg) {
  let toast = document.getElementById('helpToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'helpToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-success)" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}
window.showToast = showToast;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
