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
    renderThankYouContacts();
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
    ['Puesto',      payload.role + (payload.roleComment ? ` (${payload.roleComment})` : '')],
    ['Interés',     payload.intention === 'contact' ? 'Contacto directo' : 'Open Webinars'],
  ];
  if (payload.whatsapp) rows.splice(2, 0, ['WhatsApp', `+52 ${payload.whatsapp}`]);
  
  summary.innerHTML = rows.map(([l, v]) => `
    <div class="summary-row">
      <span class="summary-key">${l}</span>
      <span class="summary-val">${v}</span>
    </div>`).join('');

  const wa = document.getElementById('whatsappShare');
  const text = encodeURIComponent(
    `¡Me acabo de registrar en Richmond Pro!\nSoy ${payload.firstName} de ${payload.university}.\nhttps://richmondpro.mx`
  );
  wa.href   = `https://api.whatsapp.com/send?text=${text}`;
  wa.target = '_blank';
  wa.rel    = 'noopener noreferrer';
}

function renderThankYouContacts() {
  const container = document.getElementById('contactDirectory');
  if (!container) return;

  const msg = document.getElementById('thanksMessage');
  if (msg) msg.textContent = 'Contacta ahora a un asesor especializado Richmond Pro!';

  // Hide the global team section (the one with the map)
  const globalTeam = document.getElementById('team-section');
  if (globalTeam) globalTeam.style.display = 'none';

  // We use TEAM and MANAGERS from window (team.js)
  const team = window.TEAM || [];
  const managers = [
    { nombre: 'Michelle Gutiérrez', rol: 'Gerente México Sur', wa: '5215532239128', foto: 'assets/michelle Gutierrez.jpg' },
    { nombre: 'Marco Guerrero', rol: 'Gerente México Norte', wa: '5215666689044' },
    { nombre: 'Manuel Ramírez', rol: 'Gerente Nacional', wa: '5215539000043', highlight: true, foto: 'assets/Manuel Ramirez.png' }
  ];

  let html = `
    <div class="team-grid" style="margin-top: 1rem; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 0.75rem; display: grid;">
  `;

  team.forEach(m => {
    const waText = encodeURIComponent(`Hola ${m.nombre}, te contacto desde el portal Richmond Pro 👋`);
    const initials = m.nombre.split(' ').filter(w => w.length > 0).map(n => n[0]).join('').toUpperCase().slice(0,2);
    html += `
      <div class="team-card" style="padding: 0.75rem; display: flex; flex-direction: column; align-items: center; text-align: center; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background:${m.color}"></div>
        <div style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid ${m.color}30; margin-bottom: 0.5rem; overflow: hidden; display: flex; align-items: center; justify-content: center; background: ${m.color}15;">
          ${m.foto ? `<img src="${m.foto}" alt="${m.nombre}" style="width:100%;height:100%;object-fit:cover;"/>` : `<span style="font-size:0.9rem; font-weight:700; color:${m.color}">${initials}</span>`}
        </div>
        <div style="color:${m.color}; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.1rem;">${m.zonaShort}</div>
        <div style="font-size: 0.75rem; font-weight: 600; line-height: 1.2; color: #fff; margin-bottom: 0.5rem;">${m.nombre}</div>
        <a href="https://wa.me/${m.wa}?text=${waText}" target="_blank" style="width: 100%; padding: 5px 0; background: rgba(255,255,255,0.05); border-radius: 6px; color: #fff; font-size: 0.65rem; font-weight: 600; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); transition: background 0.2s;">
          WhatsApp
        </a>
      </div>
    `;
  });

  html += `</div><div class="managers-section" style="margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.25rem;">
    <div class="managers-label" style="font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; text-align: center;">Gerencia Richmond Pro México</div>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
  `;

  managers.forEach(m => {
    const waText = encodeURIComponent(`Hola ${m.nombre}, te contacto desde el portal Richmond Pro 👋`);
    const initials = m.nombre.split(' ').filter(w => w.length > 0).map(n => n[0]).join('').toUpperCase().slice(0,2);
    html += `
      <a href="https://wa.me/${m.wa}?text=${waText}" target="_blank" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: ${m.highlight ? 'rgba(79,142,247,0.1)' : 'rgba(255,255,255,0.03)'}; border-radius: 12px; border: 1px solid ${m.highlight ? 'rgba(79,142,247,0.3)' : 'rgba(255,255,255,0.1)'}; text-decoration: none; transition: transform 0.2s;">
        <div style="width: 38px; height: 38px; border-radius: 50%; overflow: hidden; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.2);">
          ${m.foto ? `<img src="${m.foto}" alt="${m.nombre}" style="width:100%;height:100%;object-fit:cover;"/>` : `<span style="font-size:0.8rem; font-weight:700; color:#fff;">${initials}</span>`}
        </div>
        <div style="flex: 1;">
          <div style="font-size: 0.85rem; font-weight: 600; color: #fff;">${m.nombre}</div>
          <div style="font-size: 0.65rem; opacity: 0.6; color: #fff;">${m.rol}</div>
        </div>
        <div style="font-size: 0.7rem; font-weight: 600; color: #4f8ef7; border: 1px solid rgba(79,142,247,0.3); padding: 4px 10px; border-radius: 6px; background: rgba(79,142,247,0.05);">WhatsApp</div>
      </a>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
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
  const globalTeam = document.getElementById('team-section');
  if (globalTeam) globalTeam.style.display = 'block';
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
