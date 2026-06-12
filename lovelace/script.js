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

    // ==========================================
    // 3.1 TRANSLATIONS & GEOLOCATION AUTO-DETECTION
    // ==========================================
    const translations = {
        es: {
            "nav.ecosystem": "Ecosistema",
            "nav.sandbox": "Wave Sandbox",
            "nav.about": "Nosotros",
            "nav.explore_stemos": "Explorar stemOS",
            "hero.title": "Expandiendo la frontera entre lo <span class=\"gradient-text\">conocido</span> y lo <span class=\"gradient-text-alt\">desconocido</span>.",
            "hero.desc": "Construyendo la infraestructura del futuro del aprendizaje y el desarrollo de competencias en América Latina a través de la física, la computación cuántica y la pedagogía socrática guiada por Inteligencia Artificial.",
            "hero.btn_eco": "Ver Ecosistema",
            "hero.btn_waves": "Interactuar con Ondas",
            "hero.scroll_down_lbl": "Física & Aprendizaje",
            "eco.title": "El Ecosistema Lovelace Feynman",
            "eco.subtitle": "Nuestras marcas y tecnologías están diseñadas para funcionar en resonancia armónica, conectando la pedagogía de vanguardia con el desarrollo de talento regional.",
            "eco.card1_desc": "stemOS es una plataforma de experiencia de aprendizaje (LXP) impulsada por IA para LATAM que ofrece trayectorias personalizadas de STEM e inglés técnico a través de micro-credenciales alineadas con la industria. Creada para cerrar la brecha de talento STEM y dominio del inglés, permite la validación medible de habilidades desde el aula hasta la carrera profesional.",
            "eco.card1_link": "Explorar stemOS",
            "eco.card2_desc": "Nuestra comunidad e iniciativa educativa sin fines de lucro en México. Inspira a estudiantes de secundaria y preparatoria en las ciencias duras a través del método SIIP NextGen y el libro BlueBook v1.",
            "eco.card2_link": "Visitar JóvenesSTEM",
            "eco.card3_desc": "Motor de tutoría de Inteligencia Artificial que realmente enseña. Sustituye las evaluaciones pasivas por diálogos socráticos adaptativos donde el estudiante explica los conceptos complejos con palabras sencillas.",
            "eco.card3_status": "Integra Gemini API",
            "sandbox.title": "Quantum Wave Sandbox",
            "sandbox.desc": "La luz y el amor son, al final, funciones de onda. Experimenta con las ecuaciones de interferencia cuántica. Modifica la frecuencia y la amplitud de las funciones de onda para revelar armónicos ocultos.",
            "sandbox.desc_sub": "Tip: Incrementa la frecuencia para observar el colapso de fase en la cuadrícula de interferencia subatómica.",
            "sandbox.label_frequency": "Frecuencia (Hz)",
            "sandbox.label_amplitude": "Amplitud (Ψ)",
            "sandbox.label_particles": "Partículas (N)",
            "sandbox.label_resonance": "Resonancia Corazón",
            "sandbox.btn_resonance_off": "Activar Resonancia (5.0Hz)",
            "sandbox.btn_resonance_on": "Resonancia Activa!",
            "sandbox.val_resonance": "(RES)",
            "about.title": "Lovelace Feynman Technologies",
            "about.subtitle": "S.A.P.I. de C.V. • Hermosillo, Sonora, México",
            "about.text": "Inspirados por Ada Lovelace, la visionaria del primer algoritmo computacional, y Richard Feynman, el genio que nos enseñó a explicar lo complejo de forma simple; unimos la ciencia de datos, la física moderna y la Inteligencia Artificial para impulsar la educación y el capital humano en el norte de México y mercados globales.",
            "about.btn_page": "Conoce al Fundador",
            "about.btn_whatsapp": "WhatsApp",
            "footer.copy": "&copy; 2026 Lovelace Feynman Technologies S.A.P.I. de C.V. Todos los derechos reservados."
        },
        en: {
            "nav.ecosystem": "Ecosystem",
            "nav.sandbox": "Wave Sandbox",
            "nav.about": "About Us",
            "nav.explore_stemos": "Explore stemOS",
            "hero.title": "Expanding the boundary between the <span class=\"gradient-text\">known</span> and the <span class=\"gradient-text-alt\">unknown</span>.",
            "hero.desc": "Building the infrastructure for the future of learning and competence development in Latin America through physics, quantum computing, and AI-guided Socratic pedagogy.",
            "hero.btn_eco": "Explore Ecosystem",
            "hero.btn_waves": "Interact with Waves",
            "hero.scroll_down_lbl": "Physics & Learning",
            "eco.title": "The Lovelace Feynman Ecosystem",
            "eco.subtitle": "Our brands and technologies are designed to operate in harmonic resonance, connecting cutting-edge pedagogy with regional talent development.",
            "eco.card1_desc": "stemOS is an AI-powered Learning Experience Platform (LXP) for LATAM that delivers personalized STEM and technical English pathways through industry-aligned micro-credentials. Built to bridge the STEM talent and English proficiency gap.",
            "eco.card1_link": "Explore stemOS",
            "eco.card2_desc": "Our non-profit educational initiative and community in Mexico. Inspiring middle and high school students to pursue careers in the hard sciences through the SIIP NextGen method and the BlueBook v1.",
            "eco.card2_link": "Visit JóvenesSTEM",
            "eco.card3_status": "Integrates Gemini API",
            "sandbox.title": "Quantum Wave Sandbox",
            "sandbox.desc": "Light and love are, ultimately, wave functions. Experiment with quantum interference equations. Modify the frequency and amplitude of the wave functions to reveal hidden harmonics.",
            "sandbox.desc_sub": "Tip: Increase the frequency to observe phase collapse in the subatomic interference grid.",
            "sandbox.label_frequency": "Frequency (Hz)",
            "sandbox.label_amplitude": "Amplitude (Ψ)",
            "sandbox.label_particles": "Particles (N)",
            "sandbox.label_resonance": "Heart Resonance",
            "sandbox.btn_resonance_off": "Activate Resonance (5.0Hz)",
            "sandbox.btn_resonance_on": "Resonance Active!",
            "sandbox.val_resonance": "(ACTIVE)",
            "about.title": "Lovelace Feynman Technologies",
            "about.subtitle": "S.A.P.I. de C.V. • Hermosillo, Sonora, Mexico",
            "about.text": "Inspired by Ada Lovelace, the visionary behind the first computer algorithm, and Richard Feynman, the genius who taught us to explain complex topics in simple terms; we merge data science, modern physics, and Artificial Intelligence to advance education and human capital in northern Mexico and global markets.",
            "about.btn_page": "Meet the Founder",
            "about.btn_whatsapp": "WhatsApp",
            "footer.copy": "&copy; 2026 Lovelace Feynman Technologies S.A.P.I. de C.V. All rights reserved."
        }
    };

    let currentLang = 'es';

    function getTranslation(key) {
        return translations[currentLang][key] || translations['es'][key] || key;
    }

    function setLang(lang) {
        if (!translations[lang]) lang = 'es';
        currentLang = lang;
        localStorage.setItem('lovelace-lang', lang);
        
        // Update switcher buttons active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Translate HTML elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getTranslation(key);
            
            if (translation.includes('<span') || translation.includes('<em') || translation.includes('&copy;')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Update the resonance button text
        updateResonanceButton();

        // Update the active frequency display value if resonating
        if (isResonating) {
            freqVal.textContent = "5.0 " + getTranslation('sandbox.val_resonance');
        }
    }

    // Expose setLang globally for HTML onclick events
    window.setLang = setLang;

    function updateResonanceButton() {
        const icon = isResonating ? '<i class="fa-solid fa-heart pulse-icon"></i> ' : '<i class="fa-solid fa-heart"></i> ';
        const key = isResonating ? 'sandbox.btn_resonance_on' : 'sandbox.btn_resonance_off';
        resonanceBtn.innerHTML = icon + getTranslation(key);
    }

    // Auto-detect language by IP or browser setting
    async function detectLanguage() {
        // 1. Check saved language preference
        const savedLang = localStorage.getItem('lovelace-lang');
        if (savedLang) {
            setLang(savedLang);
            return;
        }

        // 2. Try IP-based detection using a fast HTTPS API
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout
            
            const response = await fetch('https://ipwho.is/', { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                if (data && data.success) {
                    const code = (data.country_code || '').toUpperCase();
                    const latamCountries = [
                        'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 
                        'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 
                        'PA', 'UY', 'PR'
                    ];
                    
                    if (latamCountries.includes(code)) {
                        setLang('es');
                        return;
                    } else {
                        setLang('en');
                        return;
                    }
                }
            }
        } catch (err) {
            console.log('IP Geolocation auto-detection failed, using browser locale fallback:', err);
        }

        // 3. Browser language fallback
        const userLang = navigator.language || navigator.userLanguage || 'es';
        if (userLang.toLowerCase().startsWith('es')) {
            setLang('es');
        } else {
            setLang('en');
        }
    }

    // Slider Event Listeners
    freqSlider.addEventListener('input', (e) => {
        frequency = parseFloat(e.target.value);
        freqVal.textContent = frequency.toFixed(1);
        isResonating = false; // deactivate heart resonance
        updateResonanceButton();
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
            freqVal.textContent = "5.0 " + getTranslation('sandbox.val_resonance');
            resonanceBtn.classList.remove('btn-secondary');
            resonanceBtn.classList.add('btn-primary');
            resonanceTimer = 0;
        } else {
            frequency = parseFloat(freqSlider.value);
            freqVal.textContent = frequency.toFixed(1);
            resonanceBtn.classList.remove('btn-primary');
            resonanceBtn.classList.add('btn-secondary');
        }
        updateResonanceButton();
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

    // Bind language switcher buttons programmatically
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLang(lang);
        });
    });

    // Launch Animations & Detect Language preference
    animateAll();
    detectLanguage();
});
