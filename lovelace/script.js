/* ==========================================================================
   LOVELACE FEYNMAN TECHNOLOGIES - INTERACTIVE CANVAS & SANDBOX LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. STARRY/NEURAL CONSTELLATION BACKGROUND
       ========================================== */
    const bgCanvas = document.getElementById('quantum-bg');
    const bgCtx = bgCanvas.getContext('2d');

    let bgWidth = bgCanvas.width = window.innerWidth;
    let bgHeight = bgCanvas.height = window.innerHeight;

    const bgParticles = [];
    const maxBgParticles = 60;

    class BgParticle {
        constructor() {
            this.reset();
            this.y = Math.random() * bgHeight; // initial random distribution
        }

        reset() {
            this.x = Math.random() * bgWidth;
            this.y = bgHeight + 10;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = -(Math.random() * 0.3 + 0.1);
            this.alpha = Math.random() * 0.5 + 0.2;
            // Introduce occasional pink/cyan tinted stars
            const rand = Math.random();
            if (rand > 0.9) {
                this.color = `rgba(236, 72, 153, `; // pink
            } else if (rand > 0.8) {
                this.color = `rgba(6, 182, 212, `; // cyan
            } else {
                this.color = `rgba(139, 92, 246, `; // purple
            }
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y < -10 || this.x < -10 || this.x > bgWidth + 10) {
                this.reset();
            }
        }

        draw() {
            bgCtx.beginPath();
            bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            bgCtx.fillStyle = this.color + this.alpha + ')';
            bgCtx.fill();
        }
    }

    // Initialize bg particles
    for (let i = 0; i < maxBgParticles; i++) {
        bgParticles.push(new BgParticle());
    }

    /* ==========================================
       2. HERO ORBITAL CANVAS
       ========================================== */
    const heroCanvas = document.getElementById('hero-orbital-canvas');
    const heroCtx = heroCanvas.getContext('2d');

    let hWidth = heroCanvas.width = 380;
    let hHeight = heroCanvas.height = 380;

    let mouseX = hWidth / 2;
    let mouseY = hHeight / 2;
    let targetMouseX = hWidth / 2;
    let targetMouseY = hHeight / 2;

    heroCanvas.addEventListener('mousemove', (e) => {
        const rect = heroCanvas.getBoundingClientRect();
        targetMouseX = e.clientX - rect.left;
        targetMouseY = e.clientY - rect.top;
    });

    heroCanvas.addEventListener('mouseleave', () => {
        targetMouseX = hWidth / 2;
        targetMouseY = hHeight / 2;
    });

    const orbits = [
        { rx: 140, ry: 40, angle: 30, speed: 0.015, color: '#8b5cf6', eSize: 5 },
        { rx: 120, ry: 35, angle: -30, speed: 0.02, color: '#06b6d4', eSize: 4.5 },
        { rx: 100, ry: 30, angle: 90, speed: 0.012, color: '#ec4899', eSize: 4 }
    ];

    let time = 0;

    function drawHeroOrbital() {
        heroCtx.clearRect(0, 0, hWidth, hHeight);
        
        const centerX = hWidth / 2;
        const centerY = hHeight / 2;

        // Smooth mouse movement tracking
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;

        // Calculate offset based on mouse
        const offsetX = (mouseX - centerX) * 0.15;
        const offsetY = (mouseY - centerY) * 0.15;

        // Core atom (glowing heart placeholder coordinates)
        heroCtx.save();
        heroCtx.translate(centerX + offsetX, centerY + offsetY);
        
        // Draw glow back-circle
        const glowGrad = heroCtx.createRadialGradient(0, 0, 5, 0, 0, 30);
        glowGrad.addColorStop(0, 'rgba(236, 72, 153, 0.4)');
        glowGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        heroCtx.fillStyle = glowGrad;
        heroCtx.beginPath();
        heroCtx.arc(0, 0, 30, 0, Math.PI * 2);
        heroCtx.fill();

        // Draw Heart Core
        heroCtx.beginPath();
        heroCtx.moveTo(0, -6);
        // Parametric-like bezier heart shape
        heroCtx.bezierCurveTo(-10, -16, -20, -6, -20, 6);
        heroCtx.bezierCurveTo(-20, 16, -10, 24, 0, 32);
        heroCtx.bezierCurveTo(10, 24, 20, 16, 20, 6);
        heroCtx.bezierCurveTo(20, -6, 10, -16, 0, -6);
        heroCtx.closePath();
        heroCtx.fillStyle = 'rgba(236, 72, 153, 0.85)';
        heroCtx.shadowColor = '#ec4899';
        heroCtx.shadowBlur = 15;
        heroCtx.fill();
        heroCtx.restore();

        // Draw Orbits and Electrons
        orbits.forEach(orb => {
            heroCtx.save();
            heroCtx.translate(centerX + offsetX * 0.5, centerY + offsetY * 0.5);
            heroCtx.rotate(orb.angle * Math.PI / 180);

            // Orbit path
            heroCtx.beginPath();
            heroCtx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
            heroCtx.strokeStyle = orb.color;
            heroCtx.lineWidth = 1;
            heroCtx.globalAlpha = 0.25;
            heroCtx.shadowBlur = 0;
            heroCtx.stroke();

            // Electron Position
            const eAngle = time * orb.speed;
            const ex = orb.rx * Math.cos(eAngle);
            const ey = orb.ry * Math.sin(eAngle);

            heroCtx.beginPath();
            heroCtx.arc(ex, ey, orb.eSize, 0, Math.PI * 2);
            heroCtx.fillStyle = orb.color;
            heroCtx.globalAlpha = 1;
            heroCtx.shadowColor = orb.color;
            heroCtx.shadowBlur = 8;
            heroCtx.fill();

            heroCtx.restore();
        });

        time += 1;
    }

    /* ==========================================
       3. QUANTUM WAVE SANDBOX
       ========================================== */
    const waveCanvas = document.getElementById('sandbox-wave-canvas');
    const waveCtx = waveCanvas.getContext('2d');

    // Controls
    const freqSlider = document.getElementById('wave-frequency');
    const ampSlider = document.getElementById('wave-amplitude');
    const partsSlider = document.getElementById('wave-particles');
    const freqVal = document.getElementById('freq-val');
    const ampVal = document.getElementById('amp-val');
    const partsVal = document.getElementById('parts-val');
    const resonanceBtn = document.getElementById('btn-resonance');

    let waveWidth = waveCanvas.width = 400;
    let waveHeight = waveCanvas.height = 300;

    let frequency = parseFloat(freqSlider.value);
    let amplitude = parseFloat(ampSlider.value);
    let numParticles = parseInt(partsSlider.value);
    let isResonating = false;
    let resonanceTimer = 0;

    function resizeWaveCanvas() {
        const container = waveCanvas.parentElement;
        waveWidth = waveCanvas.width = container.clientWidth;
        waveHeight = waveCanvas.height = container.clientHeight;
    }
    
    resizeWaveCanvas();
    window.addEventListener('resize', () => {
        bgWidth = bgCanvas.width = window.innerWidth;
        bgHeight = bgCanvas.height = window.innerHeight;
        resizeWaveCanvas();
    });

    // Slider Event Listeners
    freqSlider.addEventListener('input', (e) => {
        frequency = parseFloat(e.target.value);
        freqVal.textContent = frequency.toFixed(1);
        isResonating = false; // deactivate heart resonance if user changes frequency
        resonanceBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Activar Resonancia (5.0Hz)';
        resonanceBtn.classList.remove('btn-primary');
        resonanceBtn.classList.add('btn-secondary');
    });

    ampSlider.addEventListener('input', (e) => {
        amplitude = parseFloat(e.target.value);
        ampVal.textContent = amplitude;
    });

    partsSlider.addEventListener('input', (e) => {
        numParticles = parseInt(e.target.value);
        partsVal.textContent = numParticles;
    });

    // Resonance Button
    resonanceBtn.addEventListener('click', () => {
        isResonating = !isResonating;
        if (isResonating) {
            frequency = 5.0;
            freqSlider.value = 5.0;
            freqVal.textContent = "5.0 (RES)";
            resonanceBtn.innerHTML = '<i class="fa-solid fa-heart pulse-icon"></i> Resonancia Activa!';
            resonanceBtn.classList.remove('btn-secondary');
            resonanceBtn.classList.add('btn-primary');
            resonanceTimer = 0;
        } else {
            frequency = parseFloat(freqSlider.value);
            freqVal.textContent = frequency.toFixed(1);
            resonanceBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Activar Resonancia (5.0Hz)';
            resonanceBtn.classList.remove('btn-primary');
            resonanceBtn.classList.add('btn-secondary');
        }
    });

    let waveOffset = 0;

    function drawWaveSandbox() {
        waveCtx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // trail effect
        waveCtx.fillRect(0, 0, waveWidth, waveHeight);

        // Draw coordinate grid lines
        waveCtx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
        waveCtx.lineWidth = 1;
        const gridSpacing = 30;
        for (let x = 0; x < waveWidth; x += gridSpacing) {
            waveCtx.beginPath();
            waveCtx.moveTo(x, 0);
            waveCtx.lineTo(x, waveHeight);
            waveCtx.stroke();
        }
        for (let y = 0; y < waveHeight; y += gridSpacing) {
            waveCtx.beginPath();
            waveCtx.moveTo(0, y);
            waveCtx.lineTo(waveWidth, y);
            waveCtx.stroke();
        }

        const centerY = waveHeight / 2;
        const centerX = waveWidth / 2;

        if (isResonating) {
            // Resonance Mode: Morph particles into a glowing parametric heart!
            resonanceTimer += 0.02;
            // Blend from standard wave to heart coordinates
            const heartParticles = numParticles;
            waveCtx.shadowColor = '#ec4899';
            waveCtx.shadowBlur = 10;
            
            waveCtx.beginPath();
            for (let i = 0; i < heartParticles; i++) {
                const t = (i / heartParticles) * Math.PI * 2;
                
                // Base heart equations
                const hx = 16 * Math.pow(Math.sin(t), 3);
                const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                
                // Scale factor
                const scale = Math.min(waveWidth, waveHeight) * 0.012 * (amplitude / 40);
                
                // Add a quantum wave fluctuation to the boundary
                const ripple = Math.sin(t * frequency + waveOffset) * 4;
                
                const px = centerX + hx * scale + (hx != 0 ? (hx / Math.abs(hx)) * ripple : 0);
                const py = centerY + hy * scale + (hy != 0 ? (hy / Math.abs(hy)) * ripple : 0);

                if (i === 0) waveCtx.moveTo(px, py);
                else waveCtx.lineTo(px, py);

                // Individual glowing dots along the heart
                if (i % 3 === 0) {
                    waveCtx.fillStyle = `rgba(236, 72, 153, ${0.5 + Math.sin(waveOffset + i)*0.5})`;
                    waveCtx.fillRect(px - 2, py - 2, 4, 4);
                }
            }
            waveCtx.closePath();
            waveCtx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
            waveCtx.lineWidth = 2;
            waveCtx.stroke();
            waveCtx.shadowBlur = 0;

        } else {
            // Standard Mode: Wave interference grid representing subatomic waves
            const particleGap = waveWidth / numParticles;
            
            for (let i = 0; i < numParticles; i++) {
                const px = i * particleGap;
                // Double wave interference equation
                const term1 = Math.sin(px * 0.02 * frequency + waveOffset) * amplitude;
                const term2 = Math.cos(px * 0.04 * (frequency * 0.5) - waveOffset * 1.5) * (amplitude * 0.4);
                const py = centerY + term1 + term2;

                // Color gradients based on amplitude position
                const ratio = (py - (centerY - amplitude)) / (amplitude * 2);
                const colorHex = ratio > 0.5 ? '#8b5cf6' : '#06b6d4';
                
                // Draw connecting strings (vertical nodes to center)
                waveCtx.strokeStyle = `rgba(139, 92, 246, 0.08)`;
                waveCtx.beginPath();
                waveCtx.moveTo(px, centerY);
                waveCtx.lineTo(px, py);
                waveCtx.stroke();

                // Draw wave point
                waveCtx.beginPath();
                waveCtx.arc(px, py, 3, 0, Math.PI * 2);
                waveCtx.fillStyle = colorHex;
                waveCtx.fill();
            }
        }

        waveOffset += 0.05;
    }

    /* ==========================================
       4. ANIMATION CONTROLLER LOOP
       ========================================== */
    function animateAll() {
        // 1. Draw Star Background
        bgCtx.fillStyle = '#05050c';
        bgCtx.fillRect(0, 0, bgWidth, bgHeight);
        bgParticles.forEach(p => {
            p.update();
            p.draw();
        });

        // 2. Draw Hero Orb
        drawHeroOrbital();

        // 3. Draw Wave Sandbox
        drawWaveSandbox();

        requestAnimationFrame(animateAll);
    }

    // Launch Animations
    animateAll();
});
