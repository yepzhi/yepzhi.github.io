/**
 * StarBorder + ShinyText — JóvenesSTEM ReactBits Port
 * Animated border light trail + metallic shimmer text
 */
(function () {
  'use strict';

  /**
   * StarBorder — glowing dot travels around button border
   */
  class StarBorder {
    constructor(el, opts = {}) {
      this.el = el;
      this.color = opts.color || '#277eff';
      this.speed = opts.speed || 3.5; // seconds per loop
      this._build();
    }

    _build() {
      const el = this.el;
      el.style.position = 'relative';
      el.style.isolation = 'isolate';
      el.style.overflow = 'hidden';

      // Top border beam
      const top = this._makeBeam('top');
      const bot = this._makeBeam('bottom');
      const lft = this._makeBeam('left');
      const rgt = this._makeBeam('right');
      [top, bot, lft, rgt].forEach(b => el.prepend(b));
    }

    _makeBeam(side) {
      const beam = document.createElement('span');
      const c = this.color;
      const s = this.speed;
      const isH = side === 'top' || side === 'bottom';

      Object.assign(beam.style, {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: '0',
        borderRadius: '9999px',
      });

      if (isH) {
        Object.assign(beam.style, {
          height: '3px',
          width: '45%',
          [side]: '0',
          left: side === 'top' ? '-45%' : '145%',
          background: `linear-gradient(90deg, transparent, #fff, ${c}, transparent)`,
          boxShadow: `0 0 14px ${c}, 0 0 6px #fff`,
          animation: `star-h-${side} ${s}s linear infinite`,
        });
      } else {
        Object.assign(beam.style, {
          width: '3px',
          height: '40%',
          [side === 'left' ? 'left' : 'right']: '0',
          top: side === 'left' ? '-40%' : '140%',
          background: `linear-gradient(180deg, transparent, #fff, ${c}, transparent)`,
          boxShadow: `0 0 14px ${c}, 0 0 6px #fff`,
          animation: `star-v-${side} ${s}s linear infinite`,
        });
      }
      return beam;
    }
  }

  // Inject keyframes once
  if (!document.getElementById('starborder-styles')) {
    const style = document.createElement('style');
    style.id = 'starborder-styles';
    style.textContent = `
      @keyframes star-h-top    { 0%{left:-45%} 100%{left:145%} }
      @keyframes star-h-bottom { 0%{left:145%} 100%{left:-45%} }
      @keyframes star-v-left   { 0%{top:-40%}  100%{top:140%}  }
      @keyframes star-v-right  { 0%{top:140%}  100%{top:-40%}  }
      @keyframes shiny-sweep   { 0%{background-position:-200% center} 100%{background-position:200% center} }
    `;
    document.head.appendChild(style);
  }

  /**
   * ShinyText — metallic animated shimmer on text
   */
  class ShinyText {
    constructor(el, opts = {}) {
      this.el = el;
      const speed = opts.speed || 3;
      // Wrap content in a shiny span
      const text = el.innerHTML;
      el.innerHTML = `<span class="shiny-inner" style="
        background: linear-gradient(120deg, currentColor 20%, #ffffff 45%, #7ebfff 52%, #ffffff 58%, currentColor 80%);
        background-size: 250% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shiny-sweep ${speed}s linear infinite;
        display: inline-flex;
        align-items: center;
        gap: inherit;
      ">${text}</span>`;
    }
  }

  /**
   * CountUp — smoothly counts from 0 to target value
   */
  class CountUp {
    constructor(el, opts = {}) {
      this.el = el;
      this.target  = parseInt(el.dataset.countup || el.textContent || '0');
      this.duration = opts.duration || 1800;
      this.prefix  = el.dataset.prefix  || '';
      this.suffix  = el.dataset.suffix  || '';
      this._obs();
    }

    _obs() {
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          this._run();
        }
      }, { threshold: 0.5 });
      obs.observe(this.el);
    }

    _run() {
      const start = performance.now();
      const el = this.el;
      const target = this.target;
      const dur = this.duration;
      const prefix = this.prefix;
      const suffix = this.suffix;

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const val = Math.round(ease * target);
        el.textContent = prefix + val.toLocaleString('es-MX') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  // — Auto-init —
  function initAll() {
    document.querySelectorAll('[data-starborder]').forEach(el => {
      if (!el._sb) el._sb = new StarBorder(el, {
        color: el.dataset.sbColor || '#277eff',
        speed: parseFloat(el.dataset.sbSpeed || '3.5'),
      });
    });
    document.querySelectorAll('[data-shiny]').forEach(el => {
      if (!el._shiny) el._shiny = new ShinyText(el, {
        speed: parseFloat(el.dataset.shinySpeed || '3'),
      });
    });
    document.querySelectorAll('[data-countup]').forEach(el => {
      if (!el._countup) el._countup = new CountUp(el, {
        duration: parseInt(el.dataset.countDuration || '1800'),
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.StarBorder = StarBorder;
  window.ShinyText  = ShinyText;
  window.CountUp    = CountUp;
  window.initButtonEffects = initAll;
})();
