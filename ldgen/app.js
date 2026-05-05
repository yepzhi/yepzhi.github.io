/* ── app.js · Richmond Pro Lead Generator ── */

// ────────────────────────────────────────────────
// Firebase Configuration
// Replace these values with your Firebase project
// ────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCdszta7w3yg1zLeHDrPlo4Kln63K2Ftks",
  authDomain:        "leadgen-ca3c9.firebaseapp.com",
  projectId:         "leadgen-ca3c9",
  storageBucket:     "leadgen-ca3c9.firebasestorage.app",
  messagingSenderId: "436445053383",
  appId:             "1:436445053383:web:e7c99ece8753f6a56d59e2",
  measurementId:     "G-VGRW18M26G"
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const analytics = getAnalytics(app);


// ─── State ───────────────────────────────────────
const STATE = {
  intention:   'contact',
  instType:    'gobierno',
  subsistema:  '',
  hasProvider: 'no',
  role:        null,
  data:        {}
};

// ─── Navigation ──────────────────────────────────
let currentStep = 0;

function goStep(n, isBack = false) {
  const current = document.getElementById(`step-${currentStep}`);
  const next    = document.getElementById(`step-${n}`);
  if (!next) return;
  current.classList.remove('active', 'slide-back');
  next.classList.add('active');
  if (isBack) next.classList.add('slide-back');
  void next.offsetWidth; // restart animation
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Intention Toggle ────────────────────────────
function selectIntention(val) {
  STATE.intention = val;
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    const isActive = btn.dataset.value === val;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
}

// ─── Chip Select ─────────────────────────────────
function selectChip(groupId, el) {
  document.querySelectorAll(`#${groupId} .chip`).forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  STATE.instType = el.dataset.val;
  clearError('err-instType');
}

// ─── Subsistema Handler ──────────────────────────
function handleSubsistema(val) {
  STATE.subsistema = val;
  clearError('err-subsistema');
  const reveal = document.getElementById('subsistemaOtroReveal');
  if (val === 'Otro') {
    reveal.classList.add('open');
  } else {
    reveal.classList.remove('open');
    const inp = document.getElementById('subsistemaOtro');
    if (inp) inp.value = '';
  }
}

// ─── Provider Yes/No Toggle ─────────────────────
function selectProvider(val, el) {
  STATE.hasProvider = val;
  document.querySelectorAll('#providerToggle .yesno-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const reveal = document.getElementById('providerReveal');
  if (val === 'si') {
    reveal.classList.add('open');
  } else {
    reveal.classList.remove('open');
    const inp = document.getElementById('providerName');
    if (inp) inp.value = '';
  }
}

// ─── Privacy Checkbox ─────────────────────────────
function togglePrivacy(el) {
  if (el.checked) clearError('err-privacy');
}

// ─── Role Select ─────────────────────────────────
function selectRole(el) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  STATE.role = el.dataset.val;
  clearError('err-role');
  document.getElementById('otroWrap').style.display = STATE.role === 'Otro' ? 'flex' : 'none';
}

// ─── Error helpers ───────────────────────────────
function setError(id, msg) { const el = document.getElementById(id); if (el) el.textContent = msg; }
function clearError(id)    { const el = document.getElementById(id); if (el) el.textContent = ''; }
function markInput(id, err) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('error', err);
}

// ─── Toast ───────────────────────────────────────
function showToast(msg, color = '#43e89e') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg viewBox="0 0 20 20" fill="none" style="color:${color}">
      <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
      <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ${msg}`;
  toast.style.borderColor = color + '44';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Validators ──────────────────────────────────
function validateStep1() {
  let ok = true;
  const uni = document.getElementById('university').value.trim();
  if (!uni) { setError('err-university', 'Por favor ingresa tu universidad.'); markInput('university', true); ok = false; }
  else       { clearError('err-university'); markInput('university', false); }
  if (!STATE.instType) { setError('err-instType', 'Selecciona el tipo de institución.'); ok = false; }
  else                 { clearError('err-instType'); }
  const sub = document.getElementById('subsistema').value;
  if (!sub) { setError('err-subsistema', 'Por favor selecciona el subsistema.'); ok = false; }
  else      { clearError('err-subsistema'); }
  const st = document.getElementById('state').value;
  if (!st)  { setError('err-state', 'Por favor selecciona tu estado.'); ok = false; }
  else      { clearError('err-state'); }
  if (ok) {
    STATE.data.university   = uni;
    STATE.data.instType     = STATE.instType;
    STATE.data.subsistema   = sub;
    if (sub === 'Otro') {
      STATE.data.subsistemaOtro = document.getElementById('subsistemaOtro').value.trim();
    }
    STATE.data.state        = st;
    STATE.data.hasProvider  = STATE.hasProvider;
    if (STATE.hasProvider === 'si') {
      STATE.data.providerName = document.getElementById('providerName').value.trim();
    }
    goStep(2);
  }
}

function validateStep2() {
  let ok = true;
  const fn = document.getElementById('firstName').value.trim();
  const ln = document.getElementById('lastName').value.trim();
  const em = document.getElementById('email').value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fn) { setError('err-firstName', 'Ingresa tu nombre.');    markInput('firstName', true); ok = false; }
  else     { clearError('err-firstName'); markInput('firstName', false); }
  if (!ln) { setError('err-lastName', 'Ingresa tu apellido.');   markInput('lastName', true); ok = false; }
  else     { clearError('err-lastName'); markInput('lastName', false); }
  if (!em || !re.test(em)) { setError('err-email', 'Ingresa un correo válido.'); markInput('email', true); ok = false; }
  else                     { clearError('err-email'); markInput('email', false); }
  if (ok) {
    STATE.data.firstName = fn;
    STATE.data.lastName  = ln;
    STATE.data.email     = em;
    STATE.data.whatsapp  = document.getElementById('whatsapp').value.trim();
    goStep(3);
  }
}

function validateStep3() {
  if (!STATE.role) { setError('err-role', 'Por favor selecciona tu puesto.'); return; }
  clearError('err-role');
  const privacy = document.getElementById('privacyCheck');
  if (!privacy.checked) { setError('err-privacy', 'Debes aceptar el Aviso de Privacidad para continuar.'); return; }
  clearError('err-privacy');
  STATE.data.role = STATE.role;
  if (STATE.role === 'Otro') STATE.data.roleComment = document.getElementById('otroComment').value.trim();
  submitLead();
}

// ─── Google Sheets Webhook ────────────────────────
// Pega aquí la URL de tu despliegue de Apps Script:
const WEBHOOK_URL = 'REPLACE_WITH_APPS_SCRIPT_URL';

// ─── Submit → Firestore + Sheets ──────────────────
async function submitLead() {
  const submitBtn = document.querySelector('#step-3 .btn-primary');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';

  const payload = {
    ...STATE.data,
    intention:   STATE.intention,
    createdAt:   serverTimestamp(),
    source:      'leadgen-portal'
  };

  try {
    const docRef = await addDoc(collection(db, 'leads'), payload);
    console.log('[RichmondPro] Lead saved:', docRef.id);

    // Send to Google Sheets (fire & forget, no-cors)
    if (WEBHOOK_URL && !WEBHOOK_URL.startsWith('REPLACE')) {
      fetch(WEBHOOK_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...STATE.data, intention: STATE.intention, firestoreId: docRef.id })
      }).catch(err => console.warn('[Sheets] Webhook error:', err));
    }

    buildSummary(payload);
    goStep(4);
  } catch (err) {
    console.error('[RichmondPro] Firestore error:', err);
    showToast('Error al guardar. Intenta de nuevo.', '#ff6b6b');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Enviar <svg class="btn-svg" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
}


// ─── Summary card ────────────────────────────────
function buildSummary(payload) {
  const summary = document.getElementById('summaryCard');
  const rows = [
    ['Nombre',      `${payload.firstName} ${payload.lastName}`],
    ['Correo',      payload.email],
    ['Universidad', payload.university],
    ['Subsistema',  payload.subsistema + (payload.subsistemaOtro ? ` – ${payload.subsistemaOtro}` : '')],
    ['Institución', payload.instType === 'gobierno' ? 'Pública / Gobierno' : 'Privada'],
    ['Estado',      payload.state],
    ['Puesto',      payload.role + (payload.roleComment ? ` – ${payload.roleComment}` : '')],
    ['Interés',     payload.intention === 'contact' ? 'Contacto directo' : 'Open Webinars'],
  ];
  if (payload.whatsapp) rows.splice(2, 0, ['WhatsApp', `+52 ${payload.whatsapp}`]);
  summary.innerHTML = rows.map(([k, v]) => `
    <div class="summary-row">
      <span class="summary-key">${k}</span>
      <span class="summary-val">${v}</span>
    </div>`).join('');

  document.getElementById('thanksMessage').textContent = payload.intention === 'contact'
    ? 'Te contactaremos muy pronto con información personalizada. ¡Gracias por tu interés en Richmond Pro!'
    : '¡Recibirás los próximos Open Webinars gratuitos en tu correo!';

  const wa = document.getElementById('whatsappShare');
  const text = encodeURIComponent(
    `¡Me acabo de registrar en Richmond Pro!\nSoy ${payload.firstName} de ${payload.university}.\nhttps://richmondpro.mx`
  );
  wa.href   = `https://api.whatsapp.com/send?text=${text}`;
  wa.target = '_blank';
  wa.rel    = 'noopener noreferrer';
}

// ─── Restart ─────────────────────────────────────
function restartForm() {
  Object.assign(STATE, { intention: 'contact', instType: 'gobierno', subsistema: '', role: null, data: {} });
  ['university','firstName','lastName','email','whatsapp','otroComment','providerName','subsistemaOtro'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('state').value = '';
  document.getElementById('subsistema').value = '';
  // Reset subsistema reveal
  const subReveal = document.getElementById('subsistemaOtroReveal');
  if (subReveal) subReveal.classList.remove('open');
  // Reset provider toggle
  STATE.hasProvider = 'no';
  document.querySelectorAll('#providerToggle .yesno-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  const reveal = document.getElementById('providerReveal');
  if (reveal) reveal.classList.remove('open');
  document.querySelectorAll('.chip').forEach((c, i) => c.classList.toggle('active', i === 0));
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('otroWrap').style.display = 'none';
  const privacyCheck = document.getElementById('privacyCheck');
  if (privacyCheck) privacyCheck.checked = false;
  clearError('err-privacy');
  selectIntention('contact');
  document.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  document.querySelectorAll('.form-input').forEach(e => e.classList.remove('error'));
  // Reset submit button
  const btn = document.querySelector('#step-3 .btn-primary');
  if (btn) { btn.disabled = false; btn.innerHTML = 'Enviar <svg class="btn-svg" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  goStep(0);
}

// ─── Clear errors on input ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.form-input').forEach(inp => {
    inp.addEventListener('input', () => {
      inp.classList.remove('error');
      const errEl = document.getElementById(`err-${inp.id}`);
      if (errEl) errEl.textContent = '';
    });
  });
});

window.handleSubsistema  = handleSubsistema;
window.togglePrivacy     = togglePrivacy;
window.goStep          = goStep;
window.selectIntention = selectIntention;
window.selectChip      = selectChip;
window.selectRole      = selectRole;
window.selectProvider  = selectProvider;
window.validateStep1   = validateStep1;
window.validateStep2   = validateStep2;
window.validateStep3   = validateStep3;
window.restartForm     = restartForm;
