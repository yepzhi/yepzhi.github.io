/**
 * Aurora Background — JóvenesSTEM ReactBits Port
 * Animated gradient orbs + interactive dot grid on <canvas>
 * Brand colors: #277eff (primary), #00a896 (teal), #1a9dff (mid-blue)
 */
(function () {
  'use strict';

  const BRAND = {
    primary:  [39, 126, 255],
    teal:     [0,  168, 150],
    mid:      [26, 157, 255],
    deep:     [22,  51,  94],
    accent:   [100, 180, 255],
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
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '0',
      });
      this.container.style.position = 'relative';
      this.container.insertBefore(c, this.container.firstChild);

      this._resize();
      this._initOrbs();
      this._initDots();

      this.lastUserInteraction = 0;

      window.addEventListener('resize', () => { this._resize(); this._initDots(); });
      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
        this.lastUserInteraction = Date.now();
      });

      const handleTouch = (e) => {
        if (!e.touches || !e.touches[0]) return;
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
        this.lastUserInteraction = Date.now();
      };
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('touchmove', handleTouch, { passive: true });

      this._tick();
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = this.container.offsetWidth;
      const h = this.container.offsetHeight;
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
        [BRAND.primary, BRAND.mid],
        [BRAND.teal, BRAND.accent],
        [BRAND.mid, BRAND.teal],
        [BRAND.primary, BRAND.deep],
      ];
      this.orbs = colorSets.map((colors, i) => ({
        x: (this.W || 800) * (0.2 + 0.25 * i),
        y: (this.H || 600) * (0.2 + 0.2 * (i % 2)),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.35,
        r: 280 + i * 80,
        colors,
        phase: i * Math.PI * 0.5,
      }));
    }

    _initDots() {
      const spacing = 36;
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
      this.time += 0.007;
      const { ctx, W, H, time, mouse } = this;
      ctx.clearRect(0, 0, W, H);

      // — Draw Rich Gradient Orbs —
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
        grad.addColorStop(0,   `rgba(${r1},${g1},${b1},0.32)`);
        grad.addColorStop(0.45, `rgba(${r1},${g1},${b1},0.16)`);
        grad.addColorStop(0.8,  `rgba(${r1},${g1},${b1},0.05)`);
        grad.addColorStop(1,   `rgba(${r1},${g1},${b1},0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // — Determine Active Focus Target (Mobile Auto-Wandering or User Interaction) —
      const isTouchDevice = ('ontouchstart' in window) || (window.innerWidth < 768);
      const isUserActive = (Date.now() - (this.lastUserInteraction || 0)) < 3000 && mouse.x > 0 && mouse.y > 0;

      let targetX = mouse.x;
      let targetY = mouse.y;

      if (!isUserActive || (isTouchDevice && (mouse.x <= 0 || mouse.y <= 0))) {
        // Autonomous organic Lissajous wandering trajectory
        targetX = (W * 0.5) + (W * 0.38) * Math.sin(time * 0.85) * Math.cos(time * 0.4);
        targetY = (H * 0.45) + (H * 0.32) * Math.sin(time * 0.7 + 1.2);
      }

      // Secondary floating quantum guide node
      const node2X = (W * 0.5) + (W * 0.30) * Math.cos(time * 0.65 + 2.2);
      const node2Y = (H * 0.5) + (H * 0.25) * Math.sin(time * 0.8 + 0.5);

      // — Interactive Constellation Mesh & Dot Grid —
      const dotRadius = 1.6;
      const influenceR = 150;
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
        const baseAlpha = 0.20 + 0.08 * Math.sin(time * 1.3 + dot.x * 0.02 + dot.y * 0.015);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(39,126,255,${baseAlpha})`;
        ctx.fill();

        // Proximity Glow
        if (maxProx > 0) {
          if (prox > 0) nearDots.push({ x: dot.x, y: dot.y, proximity: prox });
          if (prox2 > 0) nearDots2.push({ x: dot.x, y: dot.y, proximity: prox2 });

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotRadius + maxProx * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,168,150,${maxProx * 0.9})`;
          ctx.shadowColor = '#00a896';
          ctx.shadowBlur = maxProx * 10;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // — Draw Constellation lines to Target Node —
      if (nearDots.length > 0) {
        for (const nd of nearDots) {
          ctx.beginPath();
          ctx.moveTo(targetX, targetY);
          ctx.lineTo(nd.x, nd.y);
          ctx.strokeStyle = `rgba(39,126,255,${nd.proximity * 0.38})`;
          ctx.lineWidth = nd.proximity * 1.5;
          ctx.stroke();
        }
      }

      // — Draw Constellation lines to Secondary Node —
      if (nearDots2.length > 0) {
        for (const nd of nearDots2) {
          ctx.beginPath();
          ctx.moveTo(node2X, node2Y);
          ctx.lineTo(nd.x, nd.y);
          ctx.strokeStyle = `rgba(0,168,150,${nd.proximity * 0.25})`;
          ctx.lineWidth = nd.proximity * 1.2;
          ctx.stroke();
        }
      }

      this.raf = requestAnimationFrame(() => this._tick());
    }

    destroy() {
      cancelAnimationFrame(this.raf);
      this.canvas.remove();
    }
  }

  // — Auto-init on elements with [data-aurora] or .hero-aurora —
  function init() {
    const targets = document.querySelectorAll('[data-aurora], .aurora-bg');
    targets.forEach(el => {
      if (el._aurora) return;
      el._aurora = new AuroraCanvas(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AuroraCanvas = AuroraCanvas;
  window.initAurora = init;
})();
