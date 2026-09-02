/**
 * LIQUID GOOEY UI SYSTEM
 * Pure Vanilla JavaScript implementation of Morph, Move & Contact Dissolve.
 * Zero external dependencies · Crisp text & icons · 60-120 FPS GPU compositor.
 */

(function () {
  'use strict';

  // 1. Inject SVG Filters once into document
  function injectSvgFilters() {
    if (document.getElementById('liquid-gooey-svg-defs')) return;

    const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgDefs.id = 'liquid-gooey-svg-defs';
    svgDefs.setAttribute('class', 'liquid-gooey-svg-defs');
    svgDefs.setAttribute('aria-hidden', 'true');
    svgDefs.innerHTML = `
      <defs>
        <!-- Morph Filter: smooth metaball blending between moving shapes -->
        <filter id="liquid-morph-filter" color-interpolation-filters="sRGB" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 24 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>

        <!-- Subtle Goo: for subtle tab sliding / Move trails -->
        <filter id="liquid-trail-filter" color-interpolation-filters="sRGB" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 18 -7" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    `;
    document.body.appendChild(svgDefs);
  }

  // 2. Liquid Floating Action Dock (Ecosystem Menu)
  function initLiquidDock(options = {}) {
    const existing = document.querySelector('.liquid-dock-wrap');
    if (existing) return existing;

    const dock = document.createElement('div');
    dock.className = 'liquid-dock-wrap';
    dock.setAttribute('role', 'region');
    dock.setAttribute('aria-label', 'Menú del Ecosistema');

    dock.innerHTML = `
      <!-- Gooey background layer (filtered) -->
      <div class="liquid-goo-layer" aria-hidden="true">
        <div class="liquid-goo-blob blob-trigger"></div>
        <div class="liquid-goo-blob blob-1"></div>
        <div class="liquid-goo-blob blob-2"></div>
        <div class="liquid-goo-blob blob-3"></div>
        <div class="liquid-goo-blob blob-4"></div>
        <div class="liquid-goo-blob blob-5"></div>
      </div>

      <!-- Crisp content layer (unfiltered, sharp icons) -->
      <div class="liquid-content-layer">
        <!-- Item 1: YZAI -->
        <a href="https://yzai.yepzhi.com" target="_blank" rel="noopener" class="liquid-item-btn liquid-item-1" title="YZAI - Inteligencia Artificial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span class="liquid-item-label">YZAI · IA Local</span>
        </a>

        <!-- Item 2: JóvenesSTEM -->
        <a href="https://jovenesstem.com" target="_blank" rel="noopener" class="liquid-item-btn liquid-item-2" title="JóvenesSTEM - Plataforma EdTech">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
          <span class="liquid-item-label">JóvenesSTEM</span>
        </a>

        <!-- Item 3: ProExperience -->
        <a href="/ProExperience/" class="liquid-item-btn liquid-item-3" title="Richmond Pro Experience">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span class="liquid-item-label">Pro Experience</span>
        </a>

        <!-- Item 4: Lovelace -->
        <a href="/lovelace/" class="liquid-item-btn liquid-item-4" title="Lovelace Dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span class="liquid-item-label">Lovelace</span>
        </a>

        <!-- Item 5: Contacto / WhatsApp -->
        <a href="https://wa.me/message/6O4USI5SGF3IA1" target="_blank" rel="noopener" class="liquid-item-btn liquid-item-5" title="WhatsApp Contacto Directo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span class="liquid-item-label">Contacto</span>
        </a>

        <!-- Main trigger button -->
        <button type="button" class="liquid-trigger-btn" aria-expanded="false" aria-label="Abrir Ecosistema">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(dock);

    const triggerBtn = dock.querySelector('.liquid-trigger-btn');
    triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dock.classList.toggle('open');
      triggerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (dock.classList.contains('open') && !dock.contains(e.target)) {
        dock.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dock.classList.contains('open')) {
        dock.classList.remove('open');
        triggerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    return dock;
  }

  // 3. Liquid Elastic Tabs (Move Effect with spring rubber trail)
  function initLiquidTabs(containerSelector) {
    const containers = document.querySelectorAll(containerSelector || '[data-liquid-tabs]');
    containers.forEach(container => {
      if (container.dataset.liquidInitialized) return;
      container.dataset.liquidInitialized = 'true';

      container.classList.add('liquid-tabs-container');

      // Create pill indicator
      let pill = container.querySelector('.liquid-tab-pill');
      if (!pill) {
        pill = document.createElement('div');
        pill.className = 'liquid-tab-pill';
        container.prepend(pill);
      }

      const buttons = container.querySelectorAll('.liquid-tab-btn, button');
      buttons.forEach(btn => btn.classList.add('liquid-tab-btn'));

      function updatePill(activeBtn, animate = true) {
        if (!activeBtn) return;
        const cRect = container.getBoundingClientRect();
        const bRect = activeBtn.getBoundingClientRect();

        const x = bRect.left - cRect.left;
        const width = bRect.width;

        const currentX = parseFloat(pill.dataset.x || x);
        const movingRight = x > currentX;

        pill.dataset.x = x;
        pill.style.width = `${width}px`;
        pill.style.transform = `translate3d(${x}px, 0, 0)`;

        if (animate && Math.abs(x - currentX) > 10) {
          pill.classList.remove('stretching-right', 'stretching-left');
          void pill.offsetWidth; // Force reflow
          pill.classList.add(movingRight ? 'stretching-right' : 'stretching-left');
        }
      }

      // Find initial active button
      const activeBtn = container.querySelector('.active') || buttons[0];
      if (activeBtn) {
        activeBtn.classList.add('active');
        // Initial positioning without stretch
        setTimeout(() => updatePill(activeBtn, false), 50);
      }

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          updatePill(btn, true);
        });
      });

      window.addEventListener('resize', () => {
        const cur = container.querySelector('.active');
        if (cur) updatePill(cur, false);
      }, { passive: true });
    });
  }

  // Auto-init when DOM is ready
  function init() {
    injectSvgFilters();
    initLiquidDock();
    initLiquidTabs('[data-liquid-tabs]');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose to window
  window.LiquidGooey = {
    injectSvgFilters,
    initLiquidDock,
    initLiquidTabs
  };
})();
