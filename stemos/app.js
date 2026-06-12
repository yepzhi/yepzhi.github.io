/* ==========================================================================
   STEMOS LXP - PLATFORM AND SOCRATIC CHAT SIMULATOR INTERACTIVE LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Skills Nodes Data --- */
    const skillsData = {
        "esp-foundation": {
            title: "A2 Bridge: Intro to ESP",
            status: "completed",
            desc: "Transición lingüística del nivel A2 al inglés técnico especializado. Expresiones base, construcciones sintácticas y gramática del discurso tecnológico.",
            prereq: "Ninguno (Nivel A2 alcanzado)",
            standard: "MCER A2/B1 / Transición ESP",
            xp: 150,
            chatTopic: "esp-foundation"
        },
        semiconductors: {
            title: "ESP: Semiconductores",
            status: "completed",
            desc: "Inglés técnico para la fabricación y ensamblaje de circuitos integrados. Vocabulario técnico sobre cleanrooms, obleas de silicio (wafers) y fotolitografía.",
            prereq: "A2 Bridge: Intro to ESP",
            standard: "CONOCER EC1338 / MCER B2",
            xp: 150,
            chatTopic: "semiconductors"
        },
        cybersecurity: {
            title: "ESP: Ciberseguridad & Redes",
            status: "active",
            desc: "Inglés técnico enfocado en ciberseguridad, topología de redes inteligentes, encriptación, firewalls y mitigación de amenazas digitales (threat intelligence).",
            prereq: "A2 Bridge: Intro to ESP",
            standard: "CONOCER EC1338 / MCER B2",
            xp: 180,
            chatTopic: "cybersecurity"
        },
        electromobility: {
            title: "ESP: Electromovilidad",
            status: "active",
            desc: "Esqueleto del módulo de electromovilidad. Vocabulario técnico sobre sistemas de tren motriz eléctrico, gestión de baterías (BMS) y estaciones de carga rápida.",
            prereq: "ESP: Semiconductores",
            standard: "MCER B2 / Electromobility ESP",
            xp: 200,
            chatTopic: "electromobility"
        },
        "it-innovation": {
            title: "ESP: TI & Innovación Digital",
            status: "active",
            desc: "Esqueleto del módulo de tecnologías de la información. Terminología de APIs, desarrollo frontend/backend, computación en la nube (Cloud) y transformación digital.",
            prereq: "ESP: Ciberseguridad & Redes",
            standard: "MCER B2 / IT ESP",
            xp: 200,
            chatTopic: "it-innovation"
        },
        aerospace: {
            title: "ESP: Manufactura Aeronáutica",
            status: "locked",
            desc: "Esqueleto de manufactura aeronáutica. Terminología de fuselajes, aviónica, motores de propulsión y materiales compuestos avanzados.",
            prereq: "ESP: Electromovilidad & Innovación TI",
            standard: "MCER B2 / Aerospace ESP",
            xp: 300,
            chatTopic: "aerospace"
        },
        "socratic-capstone": {
            title: "Feynman Capstone Assessment",
            status: "locked",
            desc: "Módulo integrador final. Diálogo socrático abierto en inglés sobre resolución de retos técnicos reales en entornos industriales multidisciplinarios.",
            prereq: "ESP: Manufactura Aeronáutica",
            standard: "MCER C1 / Professional English",
            xp: 400,
            chatTopic: "socratic-capstone"
        }
    };

    let globalXP = 450;
    let globalCompleted = 3;
    const statCompleted = document.getElementById('stat-completed');
    const statPoints = document.getElementById('stat-points');

    /* --- State Management and Progress Persistence --- */
    let userProgress = {
        xp: 450,
        completedReadings: {},
        completedModules: {},
        completedTracks: {},
        nodeStatuses: {}
    };

    function loadProgress() {
        const saved = localStorage.getItem('stemos_user_progress');
        if (saved) {
            try {
                userProgress = JSON.parse(saved);
                globalXP = userProgress.xp || 450;
                statPoints.textContent = globalXP;

                let completedCount = 0;
                for (let node in userProgress.nodeStatuses) {
                    if (userProgress.nodeStatuses[node] === 'completed') {
                        completedCount++;
                    }
                }
                globalCompleted = completedCount;
                statCompleted.textContent = globalCompleted;

                // Sync skillsData statuses from userProgress
                for (let key in userProgress.nodeStatuses) {
                    if (skillsData[key]) {
                        skillsData[key].status = userProgress.nodeStatuses[key];
                    }
                }
            } catch (e) {
                console.error("Error loading progress", e);
            }
        } else {
            // Set initial state
            userProgress = {
                xp: globalXP,
                completedReadings: {},
                completedModules: {
                    "semi-m1": true,
                    "semi-m2": true,
                    "semi-m3": true,
                    "semi-m4": true,
                    "semi-m5": true,
                    "semi-m6": true
                },
                completedTracks: {
                    "esp-foundation": true,
                    "semiconductors": true
                },
                nodeStatuses: {}
            };
            for (let key in skillsData) {
                userProgress.nodeStatuses[key] = skillsData[key].status;
            }
            saveProgress();
        }
        updateProgressBar();
    }

    function saveProgress() {
        userProgress.xp = globalXP;
        for (let key in skillsData) {
            userProgress.nodeStatuses[key] = skillsData[key].status;
        }
        localStorage.setItem('stemos_user_progress', JSON.stringify(userProgress));
    }

    // Load progress and update UI
    loadProgress();
    setTimeout(() => {
        updateGraphUI();
    }, 100);

    /* --- Tab Switcher --- */
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            item.classList.add('active');
            const tabId = `tab-${item.dataset.tab}`;
            document.getElementById(tabId).classList.add('active');
        });
    });

    /* --- Interactive Skills Graph Selection --- */
    const svgNodes = document.querySelectorAll('.node');
    const emptyState = document.querySelector('.info-empty-state');
    const infoContent = document.getElementById('info-content');
    
    // Elements to fill
    const nodeStatusBadge = document.getElementById('node-status-badge');
    const nodeTitle = document.getElementById('node-title');
    const nodeDesc = document.getElementById('node-desc');
    const nodePrereq = document.getElementById('node-prereq');
    const nodeStandard = document.getElementById('node-standard');
    const nodePoints = document.getElementById('node-points');
    const startTutorBtn = document.getElementById('btn-start-tutor');

    let selectedNodeId = null;

    svgNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Remove selection class from all nodes
            svgNodes.forEach(n => n.querySelector('.node-circle').removeAttribute('style'));
            
            // Add visual selection border highlight
            const circle = node.querySelector('.node-circle');
            circle.style.strokeWidth = "5px";
            circle.style.stroke = "#f59e0b"; // gold/amber border on select

            const nodeId = node.dataset.node;
            selectedNodeId = nodeId;
            const nodeData = skillsData[nodeId];

            if (nodeData) {
                emptyState.classList.add('hidden');
                infoContent.classList.remove('hidden');

                // Update text content
                nodeTitle.textContent = nodeData.title;
                nodeDesc.textContent = nodeData.desc;
                nodePrereq.textContent = nodeData.prereq;
                nodeStandard.textContent = nodeData.standard;
                nodePoints.textContent = `${nodeData.xp} XP`;

                // Badge class switcher
                nodeStatusBadge.textContent = nodeData.status;
                nodeStatusBadge.className = "badge-status"; // reset
                if (nodeData.status === "completed") {
                    nodeStatusBadge.classList.add('completed');
                    nodeStatusBadge.textContent = "Completada";
                    startTutorBtn.disabled = false;
                    startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Iniciar Repaso Socrático`;
                } else if (nodeData.status === "active") {
                    nodeStatusBadge.classList.add('active');
                    nodeStatusBadge.textContent = "En Progreso";
                    startTutorBtn.disabled = false;
                    startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Evaluar con Feynman Engine`;
                } else {
                    nodeStatusBadge.classList.add('locked');
                    nodeStatusBadge.textContent = "Bloqueada";
                    startTutorBtn.disabled = true;
                    startTutorBtn.innerHTML = `<i class="fa-solid fa-lock"></i> Habilidad Bloqueada`;
                }

                // Render modules list in side panel
                renderModules(nodeId);
            }
        });
    });

    /* --- Socratic Chat Simulator (Feynman Engine) --- */
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const tutorStatusText = document.getElementById('tutor-status-text');

    let chatState = {
        active: false,
        topic: "",
        step: 0,
        lastUserReply: ""
    };

    startTutorBtn.addEventListener('click', () => {
        if (!selectedNodeId) return;

        const nodeData = skillsData[selectedNodeId];
        
        // Scroll to tutor section smoothly
        document.getElementById('tutor-section').scrollIntoView({ behavior: 'smooth' });

        // Initialize Chat State
        chatState.active = true;
        chatState.topic = selectedNodeId;
        chatState.step = 1;

        tutorStatusText.textContent = `Tema: ${nodeData.title} (Socrático)`;
        chatInput.disabled = false;
        chatSendBtn.disabled = false;

        // Clear Chat area and display start conversation
        chatMessagesContainer.innerHTML = '';
        addBotMessage(`¡Perfecto! Iniciemos la evaluación de **${nodeData.title}**.`);
        
        setTimeout(() => {
            triggerFeynmanSocraticStep();
        }, 800);
    });

    // Helper functions for chat
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot';
        messageDiv.innerHTML = `
            <div class="avatar">F</div>
            <div class="message-bubble">
                <p>${text}</p>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user';
        messageDiv.innerHTML = `
            <div class="avatar">A</div>
            <div class="message-bubble">
                <p>${text}</p>
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'tutor-typing';
        typingDiv.innerHTML = `
            <div class="avatar">F</div>
            <div class="message-bubble" style="padding: 10px 20px;">
                <span style="font-style: italic; color: var(--text-secondary);">Pensando pregunta...</span>
            </div>
        `;
        chatMessagesContainer.appendChild(typingDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('tutor-typing');
        if (typingDiv) typingDiv.remove();
    }

    // Dialogue script flows for the simulator
    function triggerFeynmanSocraticStep() {
        removeTypingIndicator();
        
        const reply = (chatState.lastUserReply || "").toLowerCase();

        if (chatState.topic === "esp-foundation") {
            if (chatState.step === 1) {
                addBotMessage("Welcome, Alberto! Let's start with your **A2 Bridge** assessment. Technical English uses specific verbs like **'conduct'**, **'amplify'**, and **'transmit'**. Can you tell me: **What is the difference in meaning between 'to transmit data' and 'to store data' in English?**");
            } else if (chatState.step === 2) {
                const hasSend = reply.includes("send") || reply.includes("move") || reply.includes("transfer") || reply.includes("enviar") || reply.includes("transmitir");
                const hasSave = reply.includes("save") || reply.includes("keep") || reply.includes("store") || reply.includes("guardar") || reply.includes("almacenar");
                if (hasSend && hasSave) {
                    addBotMessage("Excellent! You distinguished them perfectly: to transmit means to send or move, while to store means to save or keep. Now, if we say a system has a **'failure'**, is that a good thing or a bad thing? What is a synonym for 'failure' in tech?");
                } else {
                    addBotMessage("Good start! Just remember, 'transmit' means to send or transfer data, whereas 'store' means to save or retain it. Now, if we say a system has a **'failure'**, is that a good thing or a bad thing? What is a synonym for 'failure' in tech?");
                }
            } else if (chatState.step === 3) {
                const isBad = reply.includes("bad") || reply.includes("mal") || reply.includes("negative");
                const hasSynonym = reply.includes("bug") || reply.includes("error") || reply.includes("fault") || reply.includes("defect") || reply.includes("glitch") || reply.includes("fallo");
                if (isBad && hasSynonym) {
                    addBotMessage("Exactly! A failure (fallo) is a bad thing, and a synonym is indeed 'bug', 'error', or 'defect'. Last question: what is the English verb we use when we want to **'find and resolve errors in a code or circuit'**?");
                } else {
                    addBotMessage("A failure is definitely a bad thing! Tech synonyms include **'bug'**, **'error'**, or **'defect'**. Last question: what is the English verb we use when we want to **'find and resolve errors in a code or circuit'**?");
                }
            } else if (chatState.step === 4) {
                const isCorrect = reply.includes("debug") || reply.includes("troubleshoot") || reply.includes("depurar");
                if (isCorrect) {
                    addBotMessage("Yes, **'to debug'** (depurar) or **'troubleshoot'**! You have successfully crossed the bridge into specialized technical English. **+150 XP awarded!** 🎓");
                } else {
                    addBotMessage("Good effort! The standard technical English verbs are **'to debug'** (depurar) or **'to troubleshoot'**. You have successfully crossed the bridge. **+150 XP awarded!** 🎓");
                }
                awardXP(150);
                resetTutor();
            }
        } else if (chatState.topic === "semiconductors") {
            if (chatState.step === 1) {
                addBotMessage("Welcome to the **Semiconductor Technical English (ESP)** review! Let's check your communication skills. Imagine describing the difference between a **'wafer'** and a **'die'** in English. How would you explain them simply?");
            } else if (chatState.step === 2) {
                const hasWafer = reply.includes("wafer") || reply.includes("disk") || reply.includes("slice") || reply.includes("oblea") || reply.includes("circular");
                const hasDie = reply.includes("die") || reply.includes("chip") || reply.includes("block") || reply.includes("square") || reply.includes("individual") || reply.includes("dado");
                if (hasWafer && hasDie) {
                    addBotMessage("Superb distinction! A wafer is the raw circular silicon disk, and a die is the individual chip block. Now, in the fabrication process, we build chips inside ultra-sterile environments. **What is the English term for these special rooms, and why is air filtering so critical there?**");
                } else {
                    addBotMessage("Keep in mind that a **wafer** is the large circular silicon disk from which chips are made, and a **die** is the individual small rectangular chip cut from it. Now, in the fabrication process, we build chips inside ultra-sterile environments. **What is the English term for these special rooms, and why is air filtering so critical there?**");
                }
            } else if (chatState.step === 3) {
                const isCleanroom = reply.includes("cleanroom") || reply.includes("clean room") || reply.includes("sala limpia") || reply.includes("cuarto limpio");
                if (isCleanroom) {
                    addBotMessage("Indeed, a **'cleanroom'**! And yes, dust particles (contaminants) are the ultimate enemy of nanometric circuits. Now, to protect the cleanroom from human lint and skin cells, workers must wear specialized protective overalls. **Do you know the popular name of these white suits?**");
                } else {
                    addBotMessage("It is called a **'cleanroom'**! And air filtering is critical because even micro-dust can ruin a nanometric chip. To protect the cleanroom from human particles, workers wear specialized white overalls. **Do you know the popular name of these white suits?**");
                }
            } else if (chatState.step === 4) {
                const isBunny = reply.includes("bunny") || reply.includes("conejo");
                if (isBunny) {
                    addBotMessage("Spot on! They are called **'bunny suits'**. You've proven that your English communication skills are perfectly aligned with cleanroom manufacturing requirements. **+150 XP awarded!** 🇺🇸📡");
                } else {
                    addBotMessage("They are popularly called **'bunny suits'** (due to the ears/hood design)! Excellent effort. You've proven that your English communication skills are aligned with cleanroom manufacturing. **+150 XP awarded!** 🇺🇸📡");
                }
                awardXP(150);
                resetTutor();
            }
        } else if (chatState.topic === "cybersecurity") {
            if (chatState.step === 1) {
                addBotMessage("Welcome! Let's check your technical English for **Smart Networks & Cybersecurity**. Imagine you need to explain to a client why a **'firewall'** is not enough to stop a **'phishing attack'**. How would you explain that in English?");
            } else if (chatState.step === 2) {
                const isHuman = reply.includes("human") || reply.includes("user") || reply.includes("people") || reply.includes("social") || reply.includes("email") || reply.includes("click") || reply.includes("engañ");
                if (isHuman) {
                    addBotMessage("Precisely! A firewall blocks unauthorized network traffic, but phishing targets human vulnerability (social engineering). Now, when hackers exploit a vulnerability that is completely unknown to the software developer, **what is this specific type of attack or exploit called in English?**");
                } else {
                    addBotMessage("Good point, but remember: a firewall regulates traffic on network ports, whereas phishing targets the **human user** to trick them into giving away credentials. Now, when hackers exploit a vulnerability that is completely unknown to the software developer, **what is this specific type of attack or exploit called in English?**");
                }
            } else if (chatState.step === 3) {
                const isZeroDay = reply.includes("zero") || reply.includes("dia cero") || reply.includes("día cero") || reply.includes("0-day") || reply.includes("0 day");
                if (isZeroDay) {
                    addBotMessage("Exactly, a **'zero-day exploit'** (or zero-day attack)! Now, in a smart network, data is encoded so that only authorized parties can read it. **What is the English verb and noun for this mathematical shielding process?**");
                } else {
                    addBotMessage("It is called a **'zero-day exploit'** (since developers have 'zero days' to prepare a patch). Now, in a smart network, data is encoded so that only authorized parties can read it. **What is the English verb and noun for this mathematical shielding process?**");
                }
            } else if (chatState.step === 4) {
                const hasVerb = reply.includes("encrypt") || reply.includes("encriptar");
                const hasNoun = reply.includes("encryption") || reply.includes("encriptación") || reply.includes("encriptacion");
                if (hasVerb && hasNoun) {
                    addBotMessage("**'Encryption'** (noun) and **'encrypt'** (verb). Excellent job! You've shown that you have the vocabulary to discuss advanced security architecture in English. **+180 XP awarded!** 🛡️🌐");
                } else {
                    addBotMessage("The correct English terms are **'encryption'** (noun) and **'encrypt'** (verb). Excellent effort! You've shown that you have the vocabulary to discuss advanced security architecture in English. **+180 XP awarded!** 🛡️🌐");
                }
                awardXP(180);
                resetTutor();
            }
        } else {
            // General Fallback
            if (chatState.step === 1) {
                addBotMessage(`Hablemos sobre la habilidad **${skillsData[chatState.topic].title}**. Explícame en tus propias palabras qué entiendes de esta competencia.`);
            } else {
                addBotMessage("Interesante. Tu explicación cubre los puntos base. Cuéntame un poco más sobre cómo aplicarías esto a un problema práctico de la industria tecnológica local.");
                resetTutor();
            }
        }
    }

    // Send Message Logic
    function handleUserReply() {
        const text = chatInput.value.trim();
        if (!text || !chatState.active) return;

        chatState.lastUserReply = text;
        addUserMessage(text);
        chatInput.value = '';
        chatInput.disabled = true;
        chatSendBtn.disabled = true;

        showTypingIndicator();

        setTimeout(() => {
            chatState.step += 1;
            chatInput.disabled = false;
            chatSendBtn.disabled = false;
            triggerFeynmanSocraticStep();
            chatInput.focus();
        }, 1500); // simulated thinking time
    }

    chatSendBtn.addEventListener('click', handleUserReply);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserReply();
    });

    function resetTutor() {
        chatState.active = false;
        chatState.topic = "";
        chatState.step = 0;
        chatInput.disabled = true;
        chatSendBtn.disabled = true;
        chatInput.value = '';
        tutorStatusText.textContent = "Tema: Repaso finalizado";
    }

    function awardXP(amount) {
        globalXP += amount;
        statPoints.textContent = globalXP;
        saveProgress();
        updateProgressBar();
    }

    /* ==========================================
       AI COURSE CREATOR STUDIO (TEACHER VIEW)
       ========================================== */
    const generateBtn = document.getElementById('btn-generate-course');
    const fileDropArea = document.getElementById('file-drop-area');
    const fileInput = document.getElementById('studio-file-input');
    const fileBadge = document.getElementById('file-uploaded-badge');
    const filenameLabel = document.getElementById('uploaded-filename');

    const previewEmpty = document.getElementById('studio-preview-empty');
    const previewGenerating = document.getElementById('studio-preview-generating');
    const previewResults = document.getElementById('studio-preview-results');
    const generatingLogText = document.getElementById('generating-log-text');
    const deployCourseBtn = document.getElementById('btn-deploy-course');
    const genCourseTitle = document.getElementById('gen-course-title');
    const courseNameInput = document.getElementById('course-name');

    // Drag and Drop simulation
    fileDropArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0].name);
        }
    });

    fileDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropArea.style.borderColor = "#06b6d4";
    });

    fileDropArea.addEventListener('dragleave', () => {
        fileDropArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });

    fileDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropArea.style.borderColor = "rgba(255, 255, 255, 0.1)";
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0].name);
        }
    });

    function handleFileUpload(name) {
        fileBadge.classList.remove('hidden');
        filenameLabel.textContent = name;
        fileDropArea.style.display = "none";
    }

    // AI Generation Simulator
    generateBtn.addEventListener('click', () => {
        const cName = courseNameInput.value.trim() || "Semiconductores y Nearshoring de Chips";
        genCourseTitle.textContent = cName;

        previewEmpty.classList.add('hidden');
        previewResults.classList.add('hidden');
        previewGenerating.classList.remove('hidden');

        // Log pipeline steps
        const logs = [
            "Extrayendo y vectorizando plan de estudios de syllabus.pdf...",
            "Consultando catálogo nacional de competencias (CONOCER SEP EC2034)...",
            "Mapeando dependencias lógicas y taxonomías de aprendizaje...",
            "Diseñando prompt conversacional para Feynman Engine...",
            "Generando árbol de competencias y nodos de evaluación..."
        ];

        let logIdx = 0;
        const logInterval = setInterval(() => {
            if (logIdx < logs.length) {
                generatingLogText.textContent = logs[logIdx];
                logIdx++;
            } else {
                clearInterval(logInterval);
                // Complete simulation
                previewGenerating.classList.add('hidden');
                previewResults.classList.remove('hidden');
            }
        }, 600);
    });

    // Deploy simulated course to SVG skills graph!
    deployCourseBtn.addEventListener('click', () => {
        alert("¡Grafo desplegado con éxito! Se ha agregado el nodo 'SC-1: Física de Semiconductores' a tu mapa de competencias.");
        
        // Dynamically append a new SVG connection and node inside the student's graph!
        const svg = document.getElementById('skills-graph-svg');
        
        // 1. Create connection line
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        newLine.setAttribute("x1", "250");
        newLine.setAttribute("y1", "330");
        newLine.setAttribute("x2", "350");
        newLine.setAttribute("y2", "400");
        newLine.setAttribute("class", "line active");
        svg.appendChild(newLine);

        // 2. Create the Node Group
        const newNodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        newNodeGroup.setAttribute("class", "node node-active");
        newNodeGroup.setAttribute("data-node", "cybersecurity-adv");
        newNodeGroup.setAttribute("transform", "translate(350, 400)");

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", "26");
        circle.setAttribute("class", "node-circle");
        newNodeGroup.appendChild(circle);

        // Standard-compliant SVG Icon
        const foreignObj = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObj.setAttribute("x", "-8");
        foreignObj.setAttribute("y", "-8");
        foreignObj.setAttribute("width", "16");
        foreignObj.setAttribute("height", "16");
        foreignObj.setAttribute("class", "node-icon-wrapper");
        foreignObj.innerHTML = '<i class="fa-solid fa-lock node-icon"></i>';
        newNodeGroup.appendChild(foreignObj);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("y", "44");
        text.setAttribute("class", "node-text");
        text.textContent = "Ciberseguridad Avanzada";
        newNodeGroup.appendChild(text);

        svg.appendChild(newNodeGroup);

        // Add details to dictionary dynamically
        skillsData["cybersecurity-adv"] = {
            title: "ESP: Ciberseguridad Avanzada",
            status: "active",
            desc: "Terminología inglesa avanzada para análisis de vulnerabilidades de día cero, modelado de amenazas y mitigación criptográfica en redes industriales inteligentes.",
            prereq: "ESP: Ciberseguridad & Redes (SC-2)",
            standard: "CONOCER EC1338 / B2",
            xp: 200,
            chatTopic: "cybersecurity-adv"
        };

        // Attach listener to new node
        newNodeGroup.addEventListener('click', () => {
            svgNodes.forEach(n => n.querySelector('.node-circle').removeAttribute('style'));
            circle.style.strokeWidth = "5px";
            circle.style.stroke = "#f59e0b";

            emptyState.classList.add('hidden');
            infoContent.classList.remove('hidden');

            nodeTitle.textContent = skillsData["cybersecurity-adv"].title;
            nodeDesc.textContent = skillsData["cybersecurity-adv"].desc;
            nodePrereq.textContent = skillsData["cybersecurity-adv"].prereq;
            nodeStandard.textContent = skillsData["cybersecurity-adv"].standard;
            nodePoints.textContent = `${skillsData["cybersecurity-adv"].xp} XP`;
            nodeStatusBadge.textContent = "En Progreso";
            nodeStatusBadge.className = "badge-status active";
            startTutorBtn.disabled = false;
            startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Evaluar con Feynman Engine`;
            selectedNodeId = "cybersecurity-adv";
        });

        // Update student progress metrics
        globalCompleted += 1;
        statCompleted.textContent = globalCompleted;
        document.getElementById('progress-percent').textContent = "42%";
        document.getElementById('progress-fill-bar').style.width = "42.5%";

        // Redirect back to dashboard tab
        document.querySelector('.nav-item[data-tab="dashboard"]').click();
    });

    /* ==========================================
       CERTIFICATE VIEW MODAL (Native <dialog>)
       ========================================== */
    const modal = document.getElementById('cert-modal');
    const modalClose = document.getElementById('cert-modal-close');
    const badgeCertBtns = document.querySelectorAll('.badge-cert-btn');
    const printBtn = document.getElementById('btn-print-cert');

    badgeCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certType = btn.dataset.cert;
            if (certType === "l1-sci") {
                document.getElementById('modal-cert-skill').textContent = "Ciencia Nivel 1 (Orígenes & Cosmología)";
                document.getElementById('modal-cert-id').textContent = "MD5: 8085-L1-SCI-987B2405";
            }
            modal.showModal();
        });
    });

    modalClose.addEventListener('click', () => {
        modal.close();
    });

    // Light dismiss: close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });

    // Print certificate
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    /* ==========================================
       ACADEMIC READER & EVALUATION LOGIC
       ========================================== */
    const academicModal = document.getElementById('academic-modal');
    const academicModalClose = document.getElementById('academic-modal-close');
    const acadTrackTitle = document.getElementById('acad-track-title');
    const acadModuleTitle = document.getElementById('acad-module-title');
    
    // Timeline buttons / headers
    const stepBtnRead = document.getElementById('step-btn-read');
    const stepBtnVocab = document.getElementById('step-btn-vocab');
    const stepBtnQuiz = document.getElementById('step-btn-quiz');
    
    // Screens
    const screenReading = document.getElementById('screen-reading');
    const screenVocabulary = document.getElementById('screen-vocabulary');
    const screenQuiz = document.getElementById('screen-quiz');
    const screenCongrats = document.getElementById('screen-congrats');
    
    // Areas to inject content
    const readingContentArea = document.getElementById('reading-content-area');
    const vocabGridArea = document.getElementById('vocab-grid-area');
    const quizQuestionsArea = document.getElementById('quiz-questions-area');
    
    // Navigation inside modal
    const btnToVocab = document.getElementById('btn-to-vocab');
    const btnBackToRead = document.getElementById('btn-back-to-read');
    const btnToQuiz = document.getElementById('btn-to-quiz');
    const btnBackToVocab = document.getElementById('btn-back-to-vocab');
    const btnSubmitQuiz = document.getElementById('btn-submit-quiz');
    const btnCloseAcademicSuccess = document.getElementById('btn-close-academic-success');

    let activeModule = null;
    let activeTrackId = null;
    let activeReadingIndex = 0;

    function renderModules(nodeId) {
        const modulesList = document.getElementById('modules-list');
        if (!modulesList) return;
        modulesList.innerHTML = '';

        const nodeData = skillsData[nodeId];
        if (!nodeData) return;

        if (nodeData.status === 'locked') {
            modulesList.innerHTML = `
                <div class="info-empty-state" style="padding: 10px 0;">
                    <i class="fa-solid fa-lock text-muted" style="font-size: 1.5rem;" aria-hidden="true"></i>
                    <p style="font-size: 0.8rem; margin-top: 6px;">Módulos bloqueados. Completa primero: <strong>${nodeData.prereq}</strong>.</p>
                </div>
            `;
            return;
        }

        // Get course data from courses.js (ESP_COURSES)
        const course = typeof ESP_COURSES !== 'undefined' ? ESP_COURSES[nodeId] : null;
        if (!course || !course.modules || course.modules.length === 0) {
            modulesList.innerHTML = `
                <div class="info-empty-state" style="padding: 10px 0;">
                    <i class="fa-solid fa-compass-drafting text-muted" style="font-size: 1.5rem;" aria-hidden="true"></i>
                    <p style="font-size: 0.8rem; margin-top: 6px;">Esta unidad no contiene módulos académicos en la versión actual.</p>
                </div>
            `;
            return;
        }

        course.modules.forEach((mod, index) => {
            const isCompleted = userProgress.completedModules[mod.id] === true;
            const isParentCompleted = nodeData.status === 'completed';
            const isUnlocked = isParentCompleted || index === 0 || userProgress.completedModules[course.modules[index - 1].id] === true;

            const card = document.createElement('div');
            card.className = `module-card ${isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked'}`;
            
            const iconClass = mod.icon || 'fa-solid fa-book';
            
            let badgeHTML = '';
            let actionBtnHTML = '';
            
            if (isCompleted) {
                badgeHTML = '<span class="module-badge completed">Aprobado</span>';
                actionBtnHTML = '<button class="module-action-btn" title="Repasar" aria-label="Repasar"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i></button>';
            } else if (isUnlocked) {
                badgeHTML = '<span class="module-badge pending">Pendiente</span>';
                actionBtnHTML = '<button class="module-action-btn" title="Iniciar" aria-label="Iniciar"><i class="fa-solid fa-play" aria-hidden="true"></i></button>';
            } else {
                badgeHTML = '<span class="module-badge locked">Bloqueado</span>';
                actionBtnHTML = '<button class="module-action-btn" disabled aria-label="Bloqueado"><i class="fa-solid fa-lock" aria-hidden="true"></i></button>';
            }

            const totalReadings = mod.readings ? mod.readings.length : 0;
            const completedReadingsInMod = mod.readings ? mod.readings.filter(r => userProgress.completedReadings[r.id]).length : 0;
            
            let subtitleText = '';
            if (totalReadings === 0) {
                subtitleText = 'Esqueleto - Próximamente';
            } else if (totalReadings > 1) {
                subtitleText = `${completedReadingsInMod}/${totalReadings} Lecturas Completadas`;
            } else {
                subtitleText = '1 Lectura Técnica';
            }

            card.innerHTML = `
                <div class="module-card-left">
                    <div class="module-card-icon">
                        <i class="${iconClass}" aria-hidden="true"></i>
                    </div>
                    <div class="module-card-details">
                        <span class="module-card-title">${mod.titleES || mod.title}</span>
                        <span class="module-card-subtitle">${subtitleText}</span>
                    </div>
                </div>
                <div class="module-card-right">
                    ${badgeHTML}
                    ${actionBtnHTML}
                </div>
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    openAcademicModal(nodeId, mod);
                });
            }

            modulesList.appendChild(card);
        });
    }

    function openAcademicModal(trackId, mod) {
        activeTrackId = trackId;
        activeModule = mod;
        activeReadingIndex = 0;

        // Reset scroll position
        readingContentArea.scrollTop = 0;

        const track = ESP_COURSES[trackId];
        acadTrackTitle.textContent = track ? (track.titleEN || track.title) : "ESP Track";
        
        // Check if there are readings:
        if (!mod.readings || mod.readings.length === 0) {
            acadModuleTitle.textContent = mod.titleES || mod.title;
            switchScreen('reading');
            renderSkeletonView(mod);
            academicModal.showModal();
            return;
        }

        // Find first uncompleted reading
        let readingIdx = mod.readings.findIndex(r => !userProgress.completedReadings[r.id]);
        if (readingIdx === -1) {
            readingIdx = 0; // Default to first reading if all are completed
        }
        activeReadingIndex = readingIdx;

        switchScreen('reading');
        renderCurrentReading();
        academicModal.showModal();
    }

    function switchScreen(screenName) {
        screenReading.classList.remove('active');
        screenVocabulary.classList.remove('active');
        screenQuiz.classList.remove('active');
        screenCongrats.classList.remove('active');

        stepBtnRead.classList.remove('active', 'completed');
        stepBtnVocab.classList.remove('active', 'completed');
        stepBtnQuiz.classList.remove('active', 'completed');

        if (screenName === 'reading') {
            screenReading.classList.add('active');
            stepBtnRead.classList.add('active');
        } else if (screenName === 'vocabulary') {
            screenVocabulary.classList.add('active');
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('active');
        } else if (screenName === 'quiz') {
            screenQuiz.classList.add('active');
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('completed');
            stepBtnQuiz.classList.add('active');
        } else if (screenName === 'congrats') {
            screenCongrats.classList.add('active');
            stepBtnRead.classList.add('completed');
            stepBtnVocab.classList.add('completed');
            stepBtnQuiz.classList.add('completed');
        }
    }

    function renderCurrentReading() {
        const reading = activeModule.readings[activeReadingIndex];
        if (!reading) return;

        // Render reading text
        readingContentArea.innerHTML = parseMarkdownLineByLine(reading.content);

        const totalReadings = activeModule.readings.length;
        if (totalReadings > 1) {
            acadModuleTitle.textContent = `${activeModule.titleES || activeModule.title} (${activeReadingIndex + 1}/${totalReadings})`;
        } else {
            acadModuleTitle.textContent = activeModule.titleES || activeModule.title;
        }

        // Render Vocabulary
        vocabGridArea.innerHTML = '';
        if (reading.vocabulary && reading.vocabulary.length > 0) {
            reading.vocabulary.forEach(item => {
                const card = document.createElement('div');
                card.className = 'vocab-card';
                card.innerHTML = `
                    <div class="vocab-term-header">
                        <span class="vocab-term-en">${item.en}</span>
                        <span class="vocab-term-es">${item.es}</span>
                    </div>
                    <p class="vocab-term-def">${item.definition}</p>
                `;
                vocabGridArea.appendChild(card);
            });
        } else {
            vocabGridArea.innerHTML = '<p class="text-secondary">No hay vocabulario registrado en esta unidad.</p>';
        }

        // Render Quiz
        quizQuestionsArea.innerHTML = '';
        if (reading.questions && reading.questions.length > 0) {
            reading.questions.forEach((qObj, qIdx) => {
                const qBox = document.createElement('div');
                qBox.className = 'quiz-question-box';
                
                let optionsHTML = '';
                qObj.options.forEach((opt, oIdx) => {
                    optionsHTML += `
                        <label class="quiz-option-label" data-qidx="${qIdx}" data-oidx="${oIdx}">
                            <input type="radio" name="q${qIdx}" value="${oIdx}" class="quiz-option-radio">
                            <span>${opt}</span>
                        </label>
                    `;
                });

                qBox.innerHTML = `
                    <h5 class="quiz-q-title">
                        <span class="quiz-q-num">Q${qIdx + 1}.</span>
                        <span>${qObj.q}</span>
                    </h5>
                    <div class="quiz-options-list">
                        ${optionsHTML}
                    </div>
                `;
                quizQuestionsArea.appendChild(qBox);
            });

            // Handle selection styles
            const radioLabels = quizQuestionsArea.querySelectorAll('.quiz-option-label');
            radioLabels.forEach(label => {
                const qIdx = label.dataset.qidx;
                const radio = label.querySelector('.quiz-option-radio');
                radio.addEventListener('change', () => {
                    const siblings = quizQuestionsArea.querySelectorAll(`.quiz-option-label[data-qidx="${qIdx}"]`);
                    siblings.forEach(s => s.classList.remove('selected', 'correct-feedback', 'incorrect-feedback'));
                    label.classList.add('selected');
                });
            });
        } else {
            quizQuestionsArea.innerHTML = '<p class="text-secondary">No hay preguntas registradas en esta unidad.</p>';
        }
        
        btnSubmitQuiz.disabled = false;
        btnSubmitQuiz.innerHTML = 'Enviar Evaluación <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }

    function renderSkeletonView(mod) {
        stepBtnVocab.style.opacity = '0.15';
        stepBtnQuiz.style.opacity = '0.15';
        
        let placeholderKeywords = [];
        if (activeTrackId === 'electromobility') {
            placeholderKeywords = [
                { en: "Battery Management System (BMS)", es: "Sistema de Gestión de Baterías", desc: "El cerebro electrónico que protege y balancea las celdas de litio." },
                { en: "Powertrain", es: "Tren Motriz / Unidad de Tracción", desc: "El grupo de componentes mecánicos y eléctricos que mueven las llantas." }
            ];
        } else if (activeTrackId === 'it-innovation') {
            placeholderKeywords = [
                { en: "Cloud Deployment", es: "Despliegue en la Nube", desc: "Instalar y ejecutar aplicaciones en servidores remotos virtuales." },
                { en: "CI/CD Pipeline", es: "Tubería de Integración/Entrega Continua", desc: "Automatizar pruebas y entregas de código a producción." }
            ];
        } else {
            placeholderKeywords = [
                { en: "Aerodynamics", es: "Aerodinámica", desc: "Estudio de las fuerzas que actúan sobre un fuselaje en vuelo." },
                { en: "Composite Materials", es: "Materiales Compuestos", desc: "Materiales ligeros y de alta resistencia (como fibra de carbono)." }
            ];
        }

        let outlineListHTML = '';
        placeholderKeywords.forEach(k => {
            outlineListHTML += `<li><i class="fa-solid fa-circle-notch" aria-hidden="true"></i> <strong>${k.en}</strong> (${k.es}): ${k.desc}</li>`;
        });

        readingContentArea.innerHTML = `
            <div class="skeleton-coming-soon">
                <div class="skeleton-icon"><i class="fa-solid fa-map" aria-hidden="true"></i></div>
                <h4 class="skeleton-title">Módulo de Esqueleto: ${mod.title}</h4>
                <p class="skeleton-desc">Este módulo forma parte del esqueleto curricular interactivo de stemOS. En la versión final, incluirá lecturas técnicas de 10 minutos adaptadas al nivel A2-B1 y evaluaciones con el Feynman Engine.</p>
                
                <div class="skeleton-outline-box">
                    <h5 class="skeleton-outline-title">Conceptos Clave Planificados:</h5>
                    <ul class="skeleton-outline-list">
                        ${outlineListHTML}
                    </ul>
                </div>

                <button class="btn btn-primary" id="btn-simulate-skeleton">
                    Simular Completar Unidad (+25 XP)
                </button>
            </div>
        `;

        document.querySelector('#screen-reading .screen-footer').classList.add('hidden');
        
        const simulateBtn = document.getElementById('btn-simulate-skeleton');
        simulateBtn.addEventListener('click', () => {
            userProgress.completedModules[mod.id] = true;
            globalXP += 25;
            statPoints.textContent = globalXP;
            
            checkTrackCompletion();
            saveProgress();
            
            switchScreen('congrats');
            document.getElementById('xp-award-val').textContent = "+25 XP";
            
            stepBtnVocab.style.opacity = '';
            stepBtnQuiz.style.opacity = '';
            document.querySelector('#screen-reading .screen-footer').classList.remove('hidden');
        });
    }

    function checkTrackCompletion() {
        if (!activeTrackId) return;
        const track = ESP_COURSES[activeTrackId];
        if (!track) return;

        const allCompleted = track.modules.every(mod => userProgress.completedModules[mod.id] === true);
        if (allCompleted && skillsData[activeTrackId].status !== 'completed') {
            skillsData[activeTrackId].status = 'completed';
            
            globalXP += 100;
            statPoints.textContent = globalXP;
            
            globalCompleted++;
            statCompleted.textContent = globalCompleted;
            
            alert(`¡Excelente trabajo! Has completado exitosamente la especialidad: ${track.title}. (+100 XP Bonus y Certificado Desbloqueado) 🎓`);
            
            checkUnlocks();
            updateGraphUI();
        }
        
        statPoints.textContent = globalXP;
        updateProgressBar();
    }

    function checkUnlocks() {
        if (skillsData["electromobility"].status === 'completed' && skillsData["it-innovation"].status === 'completed') {
            if (skillsData["aerospace"].status === 'locked') {
                skillsData["aerospace"].status = 'active';
                alert("🔓 ¡Habilidad Desbloqueada! Ya puedes acceder a: ESP: Manufactura Aeronáutica.");
            }
        }
        if (skillsData["aerospace"].status === 'completed') {
            if (skillsData["socratic-capstone"].status === 'locked') {
                skillsData["socratic-capstone"].status = 'active';
                alert("🔓 ¡Habilidad Final Desbloqueada! Comienza el Socratic Capstone Assessment.");
            }
        }
    }

    function updateProgressBar() {
        const totalModules = 30;
        let completedCount = 0;
        for (let key in userProgress.completedModules) {
            if (userProgress.completedModules[key] === true) {
                completedCount++;
            }
        }
        const percent = Math.min(100, Math.round(16.6 + (completedCount / totalModules) * 83.4));
        
        document.getElementById('progress-percent').textContent = `${percent}%`;
        document.getElementById('progress-fill-bar').style.width = `${percent}%`;
    }

    function updateGraphUI() {
        const svgNodes = document.querySelectorAll('.node');
        svgNodes.forEach(node => {
            const nodeId = node.dataset.node;
            const status = skillsData[nodeId]?.status;
            if (status) {
                node.classList.remove('node-completed', 'node-active', 'node-locked');
                node.classList.add(`node-${status}`);

                const icon = node.querySelector('.node-icon');
                if (icon) {
                    if (status === 'locked') {
                        icon.className = 'fa-solid fa-lock node-icon';
                    } else {
                        const iconMap = {
                            "esp-foundation": "fa-graduation-cap",
                            "semiconductors": "fa-microchip",
                            "cybersecurity": "fa-shield-halved",
                            "electromobility": "fa-car-battery",
                            "it-innovation": "fa-cloud",
                            "aerospace": "fa-plane-up",
                            "socratic-capstone": "fa-comments",
                            "cybersecurity-adv": "fa-lock"
                        };
                        icon.className = `fa-solid ${iconMap[nodeId] || 'fa-book'} node-icon`;
                    }
                }
            }
        });

        const lines = document.querySelectorAll('line[data-from]');
        lines.forEach(line => {
            const fromId = line.dataset.from;
            const toId = line.dataset.to;
            const fromStatus = skillsData[fromId]?.status;
            const toStatus = skillsData[toId]?.status;

            line.classList.remove('completed', 'active', 'locked');

            if (fromStatus === 'completed' && toStatus === 'completed') {
                line.classList.add('completed');
            } else if (fromStatus === 'completed' && toStatus === 'active') {
                line.classList.add('active');
            } else {
                line.classList.add('locked');
            }
        });
    }

    function completeActiveReading() {
        const reading = activeModule.readings[activeReadingIndex];
        
        if (!userProgress.completedReadings[reading.id]) {
            userProgress.completedReadings[reading.id] = true;
            globalXP += 25;
            statPoints.textContent = globalXP;
        }

        const allReadingsCompleted = activeModule.readings.every(r => userProgress.completedReadings[r.id] === true);
        if (allReadingsCompleted) {
            userProgress.completedModules[activeModule.id] = true;
            renderModules(activeTrackId);
            checkTrackCompletion();
        }

        saveProgress();
        switchScreen('congrats');
    }

    btnToVocab.addEventListener('click', () => switchScreen('vocabulary'));
    btnBackToRead.addEventListener('click', () => switchScreen('reading'));
    btnToQuiz.addEventListener('click', () => switchScreen('quiz'));
    btnBackToVocab.addEventListener('click', () => switchScreen('vocabulary'));
    
    academicModalClose.addEventListener('click', () => academicModal.close());
    
    btnCloseAcademicSuccess.addEventListener('click', () => {
        academicModal.close();
        document.getElementById('skills-info-panel').scrollIntoView({ behavior: 'smooth' });
    });

    btnSubmitQuiz.addEventListener('click', () => {
        const reading = activeModule.readings[activeReadingIndex];
        if (!reading.questions || reading.questions.length === 0) {
            completeActiveReading();
            return;
        }

        const form = document.getElementById('academic-quiz-form');
        let allAnswered = true;
        let allCorrect = true;

        const allLabels = form.querySelectorAll('.quiz-option-label');
        allLabels.forEach(l => l.classList.remove('correct-feedback', 'incorrect-feedback'));

        reading.questions.forEach((qObj, qIdx) => {
            const checkedRadio = form.querySelector(`input[name="q${qIdx}"]:checked`);
            if (!checkedRadio) {
                allAnswered = false;
                return;
            }

            const selectedIdx = parseInt(checkedRadio.value);
            const correctIdx = qObj.answer;

            const selectedLabel = form.querySelector(`.quiz-option-label[data-qidx="${qIdx}"][data-oidx="${selectedIdx}"]`);
            const correctLabel = form.querySelector(`.quiz-option-label[data-qidx="${qIdx}"][data-oidx="${correctIdx}"]`);

            if (selectedIdx === correctIdx) {
                selectedLabel.classList.add('correct-feedback');
            } else {
                allCorrect = false;
                selectedLabel.classList.add('incorrect-feedback');
                correctLabel.classList.add('correct-feedback');
            }
        });

        if (!allAnswered) {
            alert("Por favor, responde todas las preguntas del cuestionario.");
            return;
        }

        if (allCorrect) {
            btnSubmitQuiz.disabled = true;
            btnSubmitQuiz.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ¡Aprobado!';
            setTimeout(() => {
                completeActiveReading();
            }, 1200);
        } else {
            alert("Respuestas incorrectas. Por favor, repasa y corrige tus respuestas marcadas en rojo.");
            btnSubmitQuiz.innerHTML = 'Reintentar Evaluación <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>';
        }
    });

    function parseMarkdownLineByLine(md) {
        if (!md) return "";
        const lines = md.split('\n');
        let html = "";
        let inList = false;
        let inTable = false;
        let inBlockquote = false;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            
            if (line.startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    html += "<table>";
                }
                if (line.includes('---')) continue;
                
                const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
                html += "<tr>";
                
                const isHeader = (lines[i+1] && lines[i+1].includes('---'));
                const cellTag = isHeader ? 'th' : 'td';
                
                cells.forEach(cell => {
                    html += `<${cellTag}>${parseInlineFormatting(cell)}</${cellTag}>`;
                });
                html += "</tr>";
                continue;
            } else if (inTable) {
                inTable = false;
                html += "</table>";
            }
            
            if (line.startsWith('>')) {
                if (!inBlockquote) {
                    inBlockquote = true;
                    html += "<blockquote>";
                }
                const content = line.substring(1).trim();
                html += `<p>${parseInlineFormatting(content)}</p>`;
                continue;
            } else if (inBlockquote) {
                inBlockquote = false;
                html += "</blockquote>";
            }
            
            if (line.startsWith('- ') || line.startsWith('* ')) {
                if (!inList) {
                    inList = true;
                    html += "<ul>";
                }
                html += `<li>${parseInlineFormatting(line.substring(2))}</li>`;
                continue;
            } else if (line.match(/^\d+\.\s+/)) {
                if (!inList) {
                    inList = true;
                    html += "<ol>";
                }
                const content = line.replace(/^\d+\.\s+/, '');
                html += `<li>${parseInlineFormatting(content)}</li>`;
                continue;
            } else if (inList) {
                inList = false;
                if (html.lastIndexOf('<ul>') > html.lastIndexOf('<ol>')) {
                    html += "</ul>";
                } else {
                    html += "</ol>";
                }
            }
            
            if (line.startsWith('# ')) {
                html += `<h1>${parseInlineFormatting(line.substring(2))}</h1>`;
            } else if (line.startsWith('## ')) {
                html += `<h2>${parseInlineFormatting(line.substring(3))}</h2>`;
            } else if (line.startsWith('### ')) {
                html += `<h3>${parseInlineFormatting(line.substring(4))}</h3>`;
            } else if (line === '---') {
                html += "<hr>";
            } else if (line !== "") {
                html += `<p>${parseInlineFormatting(line)}</p>`;
            }
        }
        
        if (inTable) html += "</table>";
        if (inBlockquote) html += "</blockquote>";
        if (inList) {
            if (html.lastIndexOf('<ul>') > html.lastIndexOf('<ol>')) {
                html += "</ul>";
            } else {
                html += "</ol>";
            }
        }
        
        return html;
    }

    function parseInlineFormatting(text) {
        let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
        return formatted;
    }
});
