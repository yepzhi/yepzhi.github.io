/**
 * RichmondAI — Light Cyber-Aurora Background Engine
 * Crisp All-White Aesthetic inspired by JSweb (jovenesstem.com)
 * Luminous White Canvas with ethereal Pastel Pink, Sky Blue & Warm Gold ambient mesh
 */

(function () {
  'use strict';

  const AURORA_LIGHT_PALETTE = {
    pink:     [244, 63,  94],   // Bright Rose Pink
    fuchsia:  [217, 70,  239],  // Luminous Fuchsia
    blue:     [37,  99,  235],  // Royal / Electric Blue
    cyan:     [14,  165, 233],  // Sky Cyan
    gold:     [245, 158, 11],   // Amber Gold
    amber:    [251, 191, 36]    // Warm Sun Amber
  };

  class AuroraLightBackground {
    constructor(containerSelector = 'body') {
      this.container = document.querySelector(containerSelector) || document.body;
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'richmond-aurora-canvas';
      this.ctx = this.canvas.getContext('2d');
      this.orbs = [];
      this.dots = [];
      this.mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };
      this.time = 0;
      this.raf = null;
      this.isVisible = true;
      this._init();
    }

    _init() {
      const c = this.canvas;
      Object.assign(c.style, {
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '0',
        opacity: '1'
      });
      this.container.insertBefore(c, this.container.firstChild);

      this._resize();
      this._initOrbs();
      this._initDots();

      window.addEventListener('resize', () => {
        this._resize();
        this._initDots();
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.targetX = e.clientX;
        this.mouse.targetY = e.clientY;
      });

      const handleTouch = (e) => {
        if (!e.touches || !e.touches[0]) return;
        this.mouse.targetX = e.touches[0].clientX;
        this.mouse.targetY = e.touches[0].clientY;
      };
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('touchmove', handleTouch, { passive: true });

      document.addEventListener('visibilitychange', () => {
        this.isVisible = !document.hidden;
        if (this.isVisible) this._tick();
      });

      this._tick();
    }

    _resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      if (this.ctx && typeof this.ctx.setTransform === 'function') {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
      }
      this.W = w;
      this.H = h;
    }

    _initOrbs() {
      // Soft ambient light orbs
      const orbConfigs = [
        { c1: AURORA_LIGHT_PALETTE.pink,  c2: AURORA_LIGHT_PALETTE.blue,  baseR: 450, speedX: 0.0005, speedY: 0.0006, phase: 0 },
        { c1: AURORA_LIGHT_PALETTE.gold,  c2: AURORA_LIGHT_PALETTE.pink,  baseR: 380, speedX: -0.0006, speedY: 0.0005, phase: 2 },
        { c1: AURORA_LIGHT_PALETTE.cyan,  c2: AURORA_LIGHT_PALETTE.blue,  baseR: 480, speedX: 0.0004, speedY: -0.0005, phase: 4 },
        { c1: AURORA_LIGHT_PALETTE.amber, c2: AURORA_LIGHT_PALETTE.gold,  baseR: 320, speedX: -0.0007, speedY: -0.0004, phase: 1.5 },
        { c1: AURORA_LIGHT_PALETTE.fuchsia, c2: AURORA_LIGHT_PALETTE.cyan, baseR: 400, speedX: 0.0004, speedY: 0.0006, phase: 3 }
      ];

      this.orbs = orbConfigs.map((cfg, i) => ({
        ...cfg,
        x: (this.W || 1200) * (0.15 + 0.18 * i),
        y: (this.H || 800) * (0.2 + 0.15 * (i % 3)),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      }));
    }

    _initDots() {
      this.dots = [];
      const spacing = 48;
      const cols = Math.ceil(this.W / spacing) + 1;
      const rows = Math.ceil(this.H / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          this.dots.push({
            originX: c * spacing,
            originY: r * spacing,
            x: c * spacing,
            y: r * spacing,
            alpha: 0.045,
            baseAlpha: 0.045
          });
        }
      }
    }

    _tick() {
      if (!this.isVisible) return;
      this.time += 0.012;

      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

      const ctx = this.ctx;
      const w = this.W;
      const h = this.H;

      ctx.clearRect(0, 0, w, h);

      // 1. Crisp All-White Clean Gradient Base (JSweb style)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#f8fafc');   // Slate 50
      bgGrad.addColorStop(0.5, '#f1f5f9'); // Slate 100
      bgGrad.addColorStop(1, '#ffffff');   // Pure White
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Render Soft Ambient Light Mesh Orbs (Multiply / Soft Overlay)
      ctx.globalCompositeOperation = 'multiply';

      this.orbs.forEach((orb, i) => {
        const oscX = Math.sin(this.time * orb.speedX * 1000 + orb.phase) * (w * 0.1);
        const oscY = Math.cos(this.time * orb.speedY * 1000 + orb.phase) * (h * 0.1);
        
        let cx = orb.x + oscX;
        let cy = orb.y + oscY;

        // Subtle mouse pull
        const dx = this.mouse.x - cx;
        const dy = this.mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600 && dist > 0) {
          const force = (1 - dist / 600) * 35;
          cx += (dx / dist) * force;
          cy += (dy / dist) * force;
        }

        const radius = orb.baseR + Math.sin(this.time * 0.7 + i) * 25;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

        const [r1, g1, b1] = orb.c1;
        const [r2, g2, b2] = orb.c2;

        grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.14)`);
        grad.addColorStop(0.5, `rgba(${r2}, ${g2}, ${b2}, 0.06)`);
        grad.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render Subtle Constellation Dots on Light Canvas
      ctx.globalCompositeOperation = 'source-over';
      const mouseDistThreshold = 130;

      for (let i = 0; i < this.dots.length; i++) {
        const d = this.dots[i];
        const dx = this.mouse.x - d.originX;
        const dy = this.mouse.y - d.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetAlpha = d.baseAlpha;
        let drawX = d.originX;
        let drawY = d.originY;
        let dotColor = 'rgba(15, 23, 42, '; // Slate 900 base

        if (dist < mouseDistThreshold) {
          const proximity = 1 - dist / mouseDistThreshold;
          targetAlpha = 0.35 + proximity * 0.3;
          drawX -= (dx / dist) * proximity * 10;
          drawY -= (dy / dist) * proximity * 10;
          dotColor = proximity > 0.5 ? 'rgba(37, 99, 235, ' : 'rgba(244, 63, 94, ';
        }

        d.alpha += (targetAlpha - d.alpha) * 0.1;

        ctx.fillStyle = `${dotColor}${d.alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, dist < mouseDistThreshold ? 1.5 : 0.85, 0, Math.PI * 2);
        ctx.fill();
      }

      this.raf = requestAnimationFrame(() => this._tick());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AuroraLightBackground());
  } else {
    new AuroraLightBackground();
  }
})();
