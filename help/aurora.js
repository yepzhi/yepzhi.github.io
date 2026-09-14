/**
 * Aurora Background — Richmond Pro Help Portal
 * Animated interactive gradient mesh orbs + interactive dot grid on <canvas>
 * Colors: Richmond Blue #1e7aff, Sky #38b6ff, Amber #f59e0b, Deep Blue #0e3575
 */
(function () {
  'use strict';

  const BRAND = {
    primary:  [30,  122, 255],
    sky:      [56,  182, 255],
    amber:    [245, 158, 11],
    deep:     [14,  53,  117],
    cyan:     [14,  165, 233]
  };

  function lerpColor(a, b, t) {
    return a.map((v, i) => Math.round(v + (b[i] - v) * t));
  }

  class AuroraCanvas {
    constructor(container) {
      this.container = container;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.orbs = [];
      this.dots = [];
      this.mouse = { x: -9999, y: -9999 };
      this.time = 0;
      this.raf = null;
      this._setup();
    }

    _setup() {
      const c = this.canvas;
      Object.assign(c.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '0',
      });
      this.container.insertBefore(c, this.container.firstChild);

      this._resize();
      this._initOrbs();
      this._initDots();

      this.lastUserInteraction = 0;
      this.isVisible = true;

      window.addEventListener('resize', () => { 
        this._resize(); 
        this._initDots(); 
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.lastUserInteraction = Date.now();
      });

      const handleTouch = (e) => {
        if (!e.touches || !e.touches[0]) return;
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.lastUserInteraction = Date.now();
      };
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('touchmove', handleTouch, { passive: true });

      this._tick();
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.canvas.width  = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width  = w + 'px';
      this.canvas.style.height = h + 'px';
      this.ctx.scale(dpr, dpr);
      this.W = w;
      this.H = h;
    }

    _initOrbs() {
      const colorSets = [
        [BRAND.primary, BRAND.sky],
        [BRAND.sky, BRAND.cyan],
        [BRAND.amber, BRAND.sky],
        [BRAND.primary, BRAND.deep],
      ];
      this.orbs = colorSets.map((colors, i) => ({
        x: (this.W || 800) * (0.15 + 0.25 * i),
        y: (this.H || 600) * (0.2 + 0.25 * (i % 2)),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        r: 320 + i * 70,
        colors,
        phase: i * Math.PI * 0.5,
      }));
    }

    _initDots() {
      const isTouch = ('ontouchstart' in window) || (window.innerWidth < 768);
      const spacing = isTouch ? 56 : 38;
      this.dots = [];
      const cols = Math.ceil(this.W / spacing) + 1;
      const rows = Math.ceil(this.H / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          this.dots.push({ x: c * spacing, y: r * spacing });
        }
      }
    }

    _tick() {
      if (!this.isVisible) {
        this.raf = null;
        return;
      }
      this.time += 0.007;
      const { ctx, W, H, time, mouse } = this;
      ctx.clearRect(0, 0, W, H);

      // — Draw Rich Gradient Mesh Orbs (Auras) —
      for (const orb of this.orbs) {
        orb.x += orb.vx + Math.sin(time + orb.phase) * 0.45;
        orb.y += orb.vy + Math.cos(time * 0.7 + orb.phase) * 0.3;
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;

        const t = (Math.sin(time * 0.6 + orb.phase) + 1) / 2;
        const [r1, g1, b1] = lerpColor(orb.colors[0], orb.colors[1], t);
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0,    `rgba(${r1},${g1},${b1},0.42)`);
        grad.addColorStop(0.45, `rgba(${r1},${g1},${b1},0.20)`);
        grad.addColorStop(0.8,  `rgba(${r1},${g1},${b1},0.06)`);
        grad.addColorStop(1,    `rgba(${r1},${g1},${b1},0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // — Interactive Target Focus (Mouse or Smooth Lissajous Wandering) —
      const isTouchDevice = ('ontouchstart' in window) || (window.innerWidth < 768);
      const isUserActive = (Date.now() - (this.lastUserInteraction || 0)) < 3000 && mouse.x > 0 && mouse.y > 0;

      let targetX = mouse.x;
      let targetY = mouse.y;

      if (!isUserActive || (isTouchDevice && (mouse.x <= 0 || mouse.y <= 0))) {
        targetX = (W * 0.5) + (W * 0.35) * Math.sin(time * 0.85) * Math.cos(time * 0.4);
        targetY = (H * 0.45) + (H * 0.28) * Math.sin(time * 0.7 + 1.2);
      }

      const node2X = (W * 0.5) + (W * 0.28) * Math.cos(time * 0.65 + 2.2);
      const node2Y = (H * 0.5) + (H * 0.22) * Math.sin(time * 0.8 + 0.5);

      // — Interactive Constellation Mesh & Dot Grid —
      const dotRadius = 1.6;
      const influenceR = isTouchDevice ? 110 : 145;
      const nearDots = [];
      const nearDots2 = [];

      for (const dot of this.dots) {
        const dx = dot.x - targetX;
        const dy = dot.y - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / influenceR);

        const dx2 = dot.x - node2X;
        const dy2 = dot.y - node2Y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const prox2 = Math.max(0, 1 - dist2 / (influenceR * 0.85));

        const maxProx = Math.max(prox, prox2 * 0.7);

        // Base dot
        const baseAlpha = 0.14 + 0.05 * Math.sin(time * 1.3 + dot.x * 0.02 + dot.y * 0.015);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30,122,255,${baseAlpha})`;
        ctx.fill();

        // Proximity Glow
        if (maxProx > 0) {
          if (prox > 0) nearDots.push({ x: dot.x, y: dot.y, proximity: prox });
          if (prox2 > 0) nearDots2.push({ x: dot.x, y: dot.y, proximity: prox2 });

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotRadius + maxProx * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56,182,255,${maxProx * 0.85})`;
          ctx.fill();
        }
      }

      // — Constellation lines to Target Node —
      if (nearDots.length > 0) {
        for (const nd of nearDots) {
          ctx.beginPath();
          ctx.moveTo(targetX, targetY);
          ctx.lineTo(nd.x, nd.y);
          ctx.strokeStyle = `rgba(30,122,255,${nd.proximity * 0.32})`;
          ctx.lineWidth = nd.proximity * 1.4;
          ctx.stroke();
        }
      }

      // — Constellation lines to Secondary Node —
      if (nearDots2.length > 0) {
        for (const nd of nearDots2) {
          ctx.beginPath();
          ctx.moveTo(node2X, node2Y);
          ctx.lineTo(nd.x, nd.y);
          ctx.strokeStyle = `rgba(56,182,255,${nd.proximity * 0.22})`;
          ctx.lineWidth = nd.proximity * 1.1;
          ctx.stroke();
        }
      }

      this.raf = requestAnimationFrame(() => this._tick());
    }
  }

  // Auto mount when DOM is ready
  function init() {
    new AuroraCanvas(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
