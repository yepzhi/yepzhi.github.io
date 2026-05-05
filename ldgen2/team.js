// ── team.js · Richmond Pro · Directorio + Mapa D3 ──

const TEAM = [
  {
    id: 'noroeste',
    zona: 'Zona Noroeste',
    zonaShort: 'Noroeste',
    nombre: 'Alberto Yépiz',
    wa: '5216621147374',
    foto: 'assets/Alberto yepiz.png',
    estados: ['Baja California', 'Baja California Sur', 'Sonora', 'Sinaloa', 'Chihuahua'],
    color: '#4f8ef7',
  },
  {
    id: 'norte',
    zona: 'Zona Norte',
    zonaShort: 'Norte',
    nombre: 'Luis Franco',
    wa: '5218119905772',
    foto: 'assets/luis Franco.jpg',
    estados: ['Durango', 'Coahuila', 'Nuevo León', 'Tamaulipas', 'Zacatecas'],
    color: '#a78bfa',
  },
  {
    id: 'occidente',
    zona: 'Zona Occidente',
    zonaShort: 'Occidente',
    nombre: 'Fabiola Martinez',
    wa: '5213316025928',
    foto: 'assets/Fabiola Martinez.png',
    estados: ['Jalisco', 'Colima', 'Michoacán', 'Aguascalientes', 'Guanajuato', 'Nayarit'],
    color: '#f472b6',
  },
  {
    id: 'sureste',
    zona: 'Zona Sureste',
    zonaShort: 'Sureste',
    nombre: 'Arturo Mendoza',
    wa: '5215537339886',
    foto: 'assets/Arturo Mendoza.png',
    estados: ['Oaxaca', 'Chiapas', 'Tabasco', 'Campeche', 'Yucatán', 'Quintana Roo'],
    color: '#34d399',
  },
  {
    id: 'puebla',
    zona: 'Zona Puebla / Veracruz',
    zonaShort: 'Puebla / Veracruz',
    nombre: 'Joel Navor',
    wa: '522211057576',
    foto: 'assets/Joel Navor.jpg',
    estados: ['Puebla', 'Tlaxcala', 'Morelos', 'Guerrero', 'Veracruz'],
    color: '#fb923c',
  },
  {
    id: 'toluca',
    zona: 'Zona Toluca / CDMX',
    zonaShort: 'Toluca / CDMX',
    nombre: 'Edgar Espinoza',
    wa: '526641234572',
    estados: ['Estado de México', 'Hidalgo', 'Querétaro', 'San Luis Potosí'],
    color: '#f4c94e',
  },
  {
    id: 'cdmx1',
    zona: 'Zona CDMX',
    zonaShort: 'CDMX',
    nombre: 'Miguel Campero',
    wa: '5218116318251',
    estados: ['Ciudad de México', 'Estado de México'],
    color: '#60a5fa',
  },
  {
    id: 'cdmx2',
    zona: 'Zona CDMX',
    zonaShort: 'CDMX',
    nombre: 'Daniel Morales',
    wa: '5215537339631',
    foto: 'assets/Daniel Morales.png',
    estados: ['Ciudad de México', 'Estado de México'],
    color: '#818cf8',
  },
  {
    id: 'cdmx3',
    zona: 'Zona CDMX',
    zonaShort: 'CDMX',
    nombre: 'Yanser Rebollo',
    rol: 'Académico Richmond Pro',
    wa: '5215666689003',
    foto: 'assets/yanser Rebollo.png',
    estados: ['Ciudad de México'],
    color: '#e879f9',
  }
];

const MANAGERS = [
  { nombre: 'Michelle Gutiérrez', rol: 'Gerente México Sur', wa: '5215532239128', foto: 'assets/michelle Gutierrez.jpg' },
  { nombre: 'Marco Guerrero', rol: 'Gerente México Norte', wa: '5215666689044' },
  { nombre: 'Manuel Ramírez', rol: 'Gerente Nacional', wa: '5215539000043', highlight: true, foto: 'assets/Manuel Ramirez.png' },
];

// ── Estado → miembro primario (último gana si hay duplicados) ──
const ESTADO_MEMBER = {};
TEAM.forEach(m => m.estados.forEach(e => { ESTADO_MEMBER[e] = m; }));

// ── Normalizar nombres del GeoJSON → nuestros nombres ──
const NAME_NORM = {
  'México': 'Estado de México',
  'Distrito Federal': 'Ciudad de México',
  'Coahuila de Zaragoza': 'Coahuila',
  'Michoacán de Ocampo': 'Michoacán',
  'Veracruz de Ignacio de la Llave': 'Veracruz',
  'Querétaro Arteaga': 'Querétaro',
  'Yucatan': 'Yucatán',
};
function normName(n) { return NAME_NORM[n] || n; }

// ─── D3 Map ───────────────────────────────────────────────────
let mapSvg = null;
let mapPaths = null;
let mapTooltip = null;
let currentMember = null;

function initTeamMap() {
  const el = document.getElementById('team-map');
  if (!el || mapSvg) return;

  // Dimensiones reales del contenedor
  const W = el.clientWidth || 600;
  const H = el.clientHeight || 380;

  // Skeleton mientras carga
  el.style.position = 'relative';
  const loader = document.createElement('div');
  loader.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(220,226,255,0.3);font-size:13px;font-family:Outfit,sans-serif';
  loader.textContent = 'Cargando mapa…';
  el.appendChild(loader);

  fetch('https://cdn.jsdelivr.net/gh/angelnmara/geojson@master/mexicoHigh.json')
    .then(r => {
      if (!r.ok) throw new Error('GeoJSON fetch failed');
      return r.json();
    })
    .then(geo => {
      loader.remove();
      buildD3Map(el, geo, W, H);
    })
    .catch(() => {
      loader.textContent = 'Mapa no disponible';
    });
}

function buildD3Map(el, geo, W, H) {
  const svg = d3.select(el)
    .append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', '100%')
    .style('display', 'block');

  mapSvg = svg;

  // Proyección Mercator ajustada al GeoJSON
  const projection = d3.geoMercator()
    .fitExtent([[12, 12], [W - 12, H - 12]], geo);

  const pathGen = d3.geoPath().projection(projection);

  // Grupo de estados
  const g = svg.append('g');

  mapPaths = g.selectAll('path')
    .data(geo.features)
    .join('path')
    .attr('d', pathGen)
    .attr('data-state', d => normName(d.properties.name || d.properties.NAME_1 || ''))
    .attr('fill', d => {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const member = ESTADO_MEMBER[name];
      return member ? member.color + '45' : 'rgba(255,255,255,0.06)';
    })
    .attr('stroke', 'rgba(255,255,255,0.15)')
    .attr('stroke-width', 0.6)
    .style('cursor', 'pointer')
    .style('transition', 'fill 0.2s, stroke 0.2s');

  // Tooltip flotante
  mapTooltip = d3.select(el)
    .append('div')
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('background', 'rgba(6,9,24,0.96)')
    .style('border', '1px solid rgba(255,255,255,0.14)')
    .style('border-radius', '12px')
    .style('padding', '10px 14px')
    .style('font-family', 'Outfit, sans-serif')
    .style('font-size', '13px')
    .style('color', '#eef0fb')
    .style('display', 'none')
    .style('z-index', '20')
    .style('box-shadow', '0 8px 32px rgba(0,0,0,0.6)')
    .style('backdrop-filter', 'blur(12px)')
    .style('max-width', '180px');

  // Eventos hover / click
  mapPaths
    .on('mousemove', function (event, d) {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const member = ESTADO_MEMBER[name];
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (member) {
        // Highlight este estado
        d3.select(this)
          .attr('fill', member.color + 'cc')
          .attr('stroke', member.color)
          .attr('stroke-width', 1.2);

        mapTooltip
          .style('display', 'block')
          .style('left', Math.min(x + 14, W - 190) + 'px')
          .style('top', Math.max(y - 50, 8) + 'px')
          .html(`
            <div style="color:${member.color};font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">${member.zonaShort}</div>
            <div style="font-weight:700;font-size:13px">${name}</div>
            <div style="color:rgba(220,226,255,0.5);font-size:11px;margin-top:2px">${member.nombre}</div>
          `);
      } else {
        d3.select(this).attr('fill', 'rgba(255,255,255,0.1)');
        mapTooltip.style('display', 'none');
      }
    })
    .on('mouseleave', function (event, d) {
      mapTooltip.style('display', 'none');
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const member = ESTADO_MEMBER[name];
      d3.select(this)
        .attr('fill', getStateFill(name, member))
        .attr('stroke', getStateStroke(name, member))
        .attr('stroke-width', getStateStrokeW(name, member));
    })
    .on('click', function (event, d) {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const member = ESTADO_MEMBER[name];
      if (member) onCardClick(member.id);
    });
}

// ── Helpers de estilo según estado activo ────────────────────
function getStateFill(stateName, member) {
  if (!member) return 'rgba(255,255,255,0.05)';
  if (currentMember) {
    return currentMember.id === member.id
      ? member.color + 'cc'
      : member.color + '20';
  }
  return member.color + '45';
}
function getStateStroke(stateName, member) {
  if (!member) return 'rgba(255,255,255,0.12)';
  if (currentMember && currentMember.id === member.id) return member.color;
  return 'rgba(255,255,255,0.14)';
}
function getStateStrokeW(stateName, member) {
  if (currentMember && member && currentMember.id === member.id) return 1.4;
  return 0.6;
}

// ── Resaltar zona seleccionada ───────────────────────────────
function showStateMarkers(member) {
  currentMember = member;
  if (!mapPaths) return;
  mapPaths
    .transition().duration(220)
    .attr('fill', function (d) {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const m = ESTADO_MEMBER[name];
      if (!m) return 'rgba(255,255,255,0.04)';
      return m.id === member.id ? m.color + 'cc' : m.color + '1a';
    })
    .attr('stroke', function (d) {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const m = ESTADO_MEMBER[name];
      return (m && m.id === member.id) ? m.color : 'rgba(255,255,255,0.08)';
    })
    .attr('stroke-width', function (d) {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const m = ESTADO_MEMBER[name];
      return (m && m.id === member.id) ? 1.5 : 0.5;
    });
}

function clearStateMarkers() {
  currentMember = null;
  if (!mapPaths) return;
  mapPaths
    .transition().duration(220)
    .attr('fill', d => {
      const name = normName(d.properties.name || d.properties.NAME_1 || '');
      const member = ESTADO_MEMBER[name];
      return member ? member.color + '45' : 'rgba(255,255,255,0.06)';
    })
    .attr('stroke', 'rgba(255,255,255,0.15)')
    .attr('stroke-width', 0.6);
}

// ─── Helpers ─────────────────────────────────────────────────
function getInitials(nombre) {
  return nombre.split(' ')
    .filter(w => w.length > 1)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

// ─── Render Directory ─────────────────────────────────────────
function renderTeamSection() {
  const section = document.getElementById('team-section');
  if (!section) return;

  section.innerHTML = `
    <div class="team-header">
      <div class="team-header-badge">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
          <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z" stroke="currentColor" stroke-width="1.5"/>
          <path d="M6.5 10.5c.9.9 2.1 1.5 3.5 1.5s2.6-.6 3.5-1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="7.5" cy="8" r="1" fill="currentColor"/>
          <circle cx="12.5" cy="8" r="1" fill="currentColor"/>
        </svg>
        Contacta Ahora, con un Click!
      </div>
      <h2 class="team-title">Equipo Richmond Pro <span class="team-heart">💙</span> México</h2>
      <p class="team-sub">Toca sobre un nombre o tarjeta para contactar ahora.</p>
      <div class="team-socials">
        <a href="https://www.instagram.com/richmondproglobal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="team-social-link">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/></svg>
        </a>
        <a href="https://www.facebook.com/RichmondMx" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="team-social-link">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/richmond-elt-mexico/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="team-social-link">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" stroke-width="1.6"/><path d="M7 10v7M7 7v.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="https://richmondpro.global/" target="_blank" rel="noopener noreferrer" aria-label="Website" class="team-social-link">
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </a>
      </div>
    </div>

    <div class="team-map-wrap">
      <div id="team-map"></div>
      <div class="map-legend">
        ${TEAM.filter((m, i, a) => a.findIndex(x => x.zonaShort === m.zonaShort) === i).map(m => `
          <div class="legend-item" onclick="onCardClick('${m.id}')">
            <span class="legend-dot" style="background:${m.color}"></span>
            <span>${m.zonaShort}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="team-grid">
      ${TEAM.map(m => {
    const waText = encodeURIComponent(`Hola ${m.nombre}, te contacto desde el portal Richmond Pro 👋`);
    const initials = getInitials(m.nombre);
    return `
        <div class="team-card" data-id="${m.id}" onclick="onCardClick('${m.id}')">
          <div class="team-card-accent" style="background:${m.color}"></div>
          <div class="team-card-avatar" style="border-color:${m.color}40; background: linear-gradient(135deg, ${m.color}22, ${m.color}44);">
            ${m.foto ? `<img src="${m.foto}" alt="${m.nombre}" loading="lazy"/>` : `<span class="team-card-initial" style="color:${m.color}">${initials}</span>`}
          </div>
          <div class="team-card-info">
            <div class="team-card-zona" style="color:${m.color}">${m.zonaShort}</div>
            <div class="team-card-name">${m.nombre}</div>
            ${m.rol ? `<div class="team-card-rol">${m.rol}</div>` : ''}
          </div>
          <a
            class="manager-wa-btn"
            href="https://wa.me/${m.wa}?text=${waText}"
            target="_blank" rel="noopener noreferrer"
            onclick="event.stopPropagation()"
            style="text-decoration:none;"
          >
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M14 12.5c-.5-.25-2-.98-2.3-1.08-.3-.1-.52-.15-.74.15-.22.3-.85 1.08-1.04 1.3-.19.22-.38.25-.7.08-.32-.17-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.22.05-.41-.02-.57C5.68 7.16 5.05 5.5 4.8 4.92c-.25-.57-.5-.5-.7-.5-.18 0-.4-.02-.61-.02-.22 0-.57.08-.87.41C2.32 5.14 1.5 5.9 1.5 7.5s1.06 3.18 1.21 3.4c.15.22 2.1 3.2 5.08 4.49 4.5 1.94 4.5 1.29 5.31 1.21.81-.08 2.61-1.07 2.98-2.1.37-1.03.37-1.92.26-2.1-.11-.18-.3-.27-.81-.52z" fill="currentColor"/></svg>
            WhatsApp
          </a>
        </div>`;
  }).join('')}
    </div>

    <div class="managers-section">
      <div class="managers-label">Gerencia Richmond Pro México</div>
      <div class="managers-row">
        ${MANAGERS.map(m => {
    const waText = encodeURIComponent(`Hola ${m.nombre}, te contacto desde el portal Richmond Pro 👋`);
    const initials = getInitials(m.nombre);
    return `
          <a class="manager-card ${m.highlight ? 'manager-highlight' : ''}"
            href="https://wa.me/${m.wa}?text=${waText}"
            target="_blank" rel="noopener noreferrer">
            <div class="manager-avatar">
              ${m.foto ? `<img src="${m.foto}" alt="${m.nombre}" loading="lazy"/>` : `<span class="manager-initial">${initials}</span>`}
            </div>
            <div>
              <div class="manager-name">${m.nombre}</div>
              <div class="manager-rol">${m.rol}</div>
            </div>
            <div class="manager-wa-btn">
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M14 12.5c-.5-.25-2-.98-2.3-1.08-.3-.1-.52-.15-.74.15-.22.3-.85 1.08-1.04 1.3-.19.22-.38.25-.7.08-.32-.17-1.35-.5-2.57-1.58-.95-.84-1.59-1.88-1.77-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.22.05-.41-.02-.57C5.68 7.16 5.05 5.5 4.8 4.92c-.25-.57-.5-.5-.7-.5-.18 0-.4-.02-.61-.02-.22 0-.57.08-.87.41C2.32 5.14 1.5 5.9 1.5 7.5s1.06 3.18 1.21 3.4c.15.22 2.1 3.2 5.08 4.49 4.5 1.94 4.5 1.29 5.31 1.21.81-.08 2.61-1.07 2.98-2.1.37-1.03.37-1.92.26-2.1-.11-.18-.3-.27-.81-.52z" fill="currentColor"/></svg>
              WhatsApp
            </div>
          </a>`;
  }).join('')}
      </div>
    </div>
  `;

  // Init map después de que el DOM esté pintado
  requestAnimationFrame(() => requestAnimationFrame(initTeamMap));
}

function onCardClick(id) {
  const member = TEAM.find(t => t.id === id);
  if (!member) return;
  highlightCard(id);
  showStateMarkers(member);
  // Scroll al mapa en móvil
  const mapEl = document.getElementById('team-map');
  if (mapEl && window.innerWidth < 700) {
    mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function highlightCard(id) {
  document.querySelectorAll('.team-card').forEach(c => {
    c.classList.toggle('highlighted', c.dataset.id === id);
  });
}
function clearHighlight() {
  document.querySelectorAll('.team-card').forEach(c => c.classList.remove('highlighted'));
}

window.TEAM = TEAM;
window.onCardClick = onCardClick;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTeamSection);
} else {
  renderTeamSection();
}