/**
 * SpotlightCard + TiltedCard — JóvenesSTEM ReactBits Port
 * Cards that react to mouse: spotlight halo + 3D tilt
 */
(function () {
  'use strict';

  /**
   * SpotlightCard — adds a radial light halo following the mouse
   */
  class SpotlightCard {
    constructor(el, opts = {}) {
      this.el = el;
      this.color = opts.color || 'radial-gradient(circle at 50% 50%, rgba(39,126,255,0.40) 0%, rgba(0,168,150,0.22) 35%, transparent 70%)';
      this.size  = opts.size  || 360;
      this._bind();
    }

    _bind() {
      const el = this.el;
      const pos = getComputedStyle(el).position;
      if (pos === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';

      const light = document.createElement('div');
      Object.assign(light.style, {
        position: 'absolute',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        inset: '0',
        opacity: '0',
        transition: 'opacity 0.25s ease',
        background: this.color.startsWith('radial-gradient') ? this.color : `radial-gradient(circle at 50% 50%, ${this.color} 0%, transparent 70%)`,
        backgroundSize: this.size + 'px ' + this.size + 'px',
        backgroundRepeat: 'no-repeat',
        zIndex: '2',
      });
      el.appendChild(light);
      this._light = light;

      el.addEventListener('mousemove', (e) => this._onMove(e));
      el.addEventListener('mouseenter', () => { light.style.opacity = '1'; });
      el.addEventListener('mouseleave', () => { light.style.opacity = '0'; });
    }

    _onMove(e) {
      const rect = this.el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const half = this.size / 2;
      this._light.style.backgroundPosition = `${x - half}px ${y - half}px`;
    }
  }

  /**
   * TiltedCard — 3D perspective tilt on mouse
   */
  class TiltedCard {
    constructor(el, opts = {}) {
      this.el = el;
      this.maxTilt   = opts.maxTilt   || 12;   // degrees
      this.maxScale  = opts.maxScale  || 1.04;
      this._bind();
    }

    _bind() {
      const el = this.el;
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      el.style.transition = 'transform 0.08s ease';

      el.addEventListener('mousemove', (e) => this._onMove(e));
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.45s cubic-bezier(0.16,1,0.3,1)';
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.08s ease';
      });
    }

    _onMove(e) {
      const rect = this.el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotY =  dx * this.maxTilt;
      const rotX = -dy * this.maxTilt;
      this.el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${this.maxScale})`;
    }
  }

  /**
   * GlowCard — card with animated glowing border
   */
  class GlowCard {
    constructor(el, opts = {}) {
      this.el = el;
      this.color = opts.color || '#277eff';
      this._build();
    }

    _build() {
      const el = this.el;
      el.style.position = 'relative';
      el.style.isolation = 'isolate';

      const glow = document.createElement('div');
      const c = this.color;
      Object.assign(glow.style, {
        position: 'absolute',
        inset: '-2px',
        borderRadius: 'inherit',
        background: `linear-gradient(135deg, ${c}60, transparent 40%, ${c}40)`,
        opacity: '0',
        transition: 'opacity 0.4s ease',
        zIndex: '-1',
        filter: 'blur(8px)',
        pointerEvents: 'none',
      });
      el.parentNode && el.parentNode.style.position !== 'static'
        ? el.insertBefore(glow, el.firstChild)
        : (() => {
            el.style.position = 'relative';
            el.insertBefore(glow, el.firstChild);
          })();

      el.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
      el.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
      this._glow = glow;
    }
  }

  // — Auto-init —
  function initSpotlight() {
    document.querySelectorAll('[data-spotlight]').forEach(el => {
      if (!el._spotlight) el._spotlight = new SpotlightCard(el, {
        color: el.dataset.spotlightColor || 'rgba(39,126,255,0.18)',
        size:  parseInt(el.dataset.spotlightSize || '300'),
      });
    });
  }

  function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      if (!el._tilt) el._tilt = new TiltedCard(el, {
        maxTilt:  parseFloat(el.dataset.tiltMax   || '8'),
        maxScale: parseFloat(el.dataset.tiltScale || '1.03'),
      });
    });
  }

  function initGlow() {
    document.querySelectorAll('[data-glow]').forEach(el => {
      if (!el._glow) el._glow = new GlowCard(el, {
        color: el.dataset.glowColor || '#277eff',
      });
    });
  }

  function initAll() { initSpotlight(); initTilt(); initGlow(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Re-init for dynamically rendered cards
  const origInit = window.initCardEffects;
  window.initCardEffects = function () {
    if (origInit) origInit();
    initAll();
  };

  window.SpotlightCard   = SpotlightCard;
  window.TiltedCard      = TiltedCard;
  window.GlowCard        = GlowCard;
  window.initSpotlight   = initSpotlight;
  window.initTilt        = initTilt;
  window.initCardEffects = initAll;
})();
