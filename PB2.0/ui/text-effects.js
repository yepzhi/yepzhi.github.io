/**
 * DecryptedText & SplitText effects — JóvenesSTEM ReactBits Port
 * Cyberpunk letter-by-letter scramble reveal
 */
(function () {
  'use strict';

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';

  /**
   * DecryptedText — scrambles text then resolves to real content
   * Usage: new DecryptedText(el, { speed: 35, delay: 0 })
   * Or add data-decrypt on any element and call initDecrypt()
   */
  class DecryptedText {
    constructor(el, opts = {}) {
      this.el = el;
      this.originalHTML = el.innerHTML;
      this.originalText = el.textContent.trim();
      this.speed = opts.speed || 40;       // ms per frame
      this.resolveDelay = opts.resolveDelay || 2.0; // frames before resolving each char
      this.done = false;
      this._obs = null;
      this._observe();
    }

    _observe() {
      this._obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.done) {
          this.done = true;
          this._obs.disconnect();
          setTimeout(() => this.play(), 100);
        }
      }, { threshold: 0.20 });
      this._obs.observe(this.el);
    }

    play() {
      const el = this.el;
      const originalHTML = this.originalHTML;
      const text = this.originalText;
      const len = text.length;
      let frame = 0;
      const totalFrames = Math.floor(len * this.resolveDelay) + 14;

      const isHeroBrand = el.classList.contains('hero-brand-name');

      const tick = () => {
        if (isHeroBrand) {
          // 'jóvenes' (0..6) -> gradient, 'STEM' (7..10) -> navy, '®' (11) -> reg mark
          let outJovenes = '';
          let outStem = '';
          let outReg = '';

          for (let i = 0; i < len; i++) {
            const char = text[i];
            if (char === ' ') continue;
            const resolveAt = i * this.resolveDelay;
            const isResolved = frame >= resolveAt + 5;
            const glyph = isResolved ? char : CHARS[Math.floor(Math.random() * CHARS.length)];
            
            // Starts dark/blackish cyberpunk glyph, transitions to full brand color
            const spanStyle = isResolved
              ? ''
              : 'color:#0a192f; -webkit-text-fill-color:#0a192f; opacity:0.85;';

            const charHTML = spanStyle ? `<span style="${spanStyle}">${glyph}</span>` : glyph;

            if (i < 7) {
              outJovenes += charHTML;
            } else if (i < 11) {
              outStem += charHTML;
            } else {
              outReg += charHTML;
            }
          }

          el.innerHTML = `<span class="hero-brand-jovenes">${outJovenes}</span><span class="hero-brand-stem">${outStem}</span><sup class="hero-brand-reg">${outReg || '&reg;'}</sup>`;
        } else {
          let out = '';
          for (let i = 0; i < len; i++) {
            if (text[i] === ' ') { out += ' '; continue; }
            const resolveAt = i * this.resolveDelay;
            if (frame >= resolveAt + 5) {
              out += text[i];
            } else {
              out += `<span style="color:#0a192f; -webkit-text-fill-color:#0a192f; opacity:0.8;">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
            }
          }
          el.innerHTML = out;
        }

        if (frame < totalFrames) {
          frame++;
          setTimeout(tick, this.speed);
        } else {
          el.innerHTML = originalHTML;
        }
      };
      tick();
    }
  }

  /**
   * SplitText — reveals words one by one sliding up
   * Usage: add data-split on element and call initSplit()
   */
  class SplitText {
    constructor(el, opts = {}) {
      this.el = el;
      this.delay = opts.delay || 60; // ms between words
      this._build();
    }

    _build() {
      const html = this.el.innerHTML;
      // Preserve inner spans (like .g gradients)
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const words = [];

      const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const isInsideGradient = node.parentElement && (
            node.parentElement.classList.contains('g') ||
            node.parentElement.closest('.g')
          );

          node.textContent.split(/(\s+)/).forEach(part => {
            if (part.trim()) {
              const span = document.createElement('span');
              span.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
              const inner = document.createElement('span');
              
              let extraStyle = '';
              if (isInsideGradient) {
                extraStyle = 'background: linear-gradient(135deg, #277eff 0%, #1a9dff 40%, #00a896 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: #277eff;';
              }

              inner.style.cssText = `display:inline-block;transform:translateY(110%);opacity:0;transition:transform 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.4s ease;${extraStyle}`;
              inner.textContent = part;
              span.appendChild(inner);
              words.push(inner);
              node.parentNode.insertBefore(span, node);
            } else if (part) {
              node.parentNode.insertBefore(document.createTextNode(part), node);
            }
          });
          node.remove();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Keep element intact, wrap its text words
          Array.from(node.childNodes).forEach(processNode);
        }
      };

      Array.from(temp.childNodes).forEach(processNode);
      this.el.innerHTML = '';
      Array.from(temp.childNodes).forEach(n => this.el.appendChild(n));
      this._words = words;

      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          this._animate();
        }
      }, { threshold: 0.3 });
      obs.observe(this.el);
    }

    _animate() {
      this._words.forEach((w, i) => {
        setTimeout(() => {
          w.style.transform = 'translateY(0)';
          w.style.opacity = '1';
        }, i * this.delay);
      });
    }
  }

  /**
   * TextScramble — for AI tutor responses
   * Call textScramble(el, newText) to animate text change
   */
  function textScramble(el, newText, speed = 25) {
    let frame = 0;
    const len = newText.length;
    const resolveDelay = 1.4;
    const totalFrames = len * resolveDelay + 8;

    const tick = () => {
      let out = '';
      for (let i = 0; i < len; i++) {
        if (newText[i] === ' ' || newText[i] === '\n') { out += newText[i]; continue; }
        const resolveAt = i * resolveDelay;
        if (frame >= resolveAt + 3) {
          out += newText[i];
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = out;
      if (frame < totalFrames) {
        frame++;
        setTimeout(tick, speed);
      } else {
        el.textContent = newText;
      }
    };
    tick();
  }

  function initDecrypt() {
    document.querySelectorAll('[data-decrypt]').forEach(el => {
      if (!el._decrypt) el._decrypt = new DecryptedText(el, {
        speed: parseInt(el.dataset.decryptSpeed || '30'),
        resolveDelay: parseFloat(el.dataset.decryptResolve || '1.5'),
      });
    });
  }

  function initSplit() {
    document.querySelectorAll('[data-split]').forEach(el => {
      if (!el._split) el._split = new SplitText(el, {
        delay: parseInt(el.dataset.splitDelay || '60'),
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initDecrypt(); initSplit(); });
  } else {
    initDecrypt(); initSplit();
  }

  window.DecryptedText  = DecryptedText;
  window.SplitText      = SplitText;
  window.textScramble   = textScramble;
  window.initDecrypt    = initDecrypt;
  window.initSplit      = initSplit;
})();
