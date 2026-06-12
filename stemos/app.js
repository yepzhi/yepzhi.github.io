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

    let globalXP = 450;
    let globalCompleted = 3;
    const statCompleted = document.getElementById('stat-completed');
    const statPoints = document.getElementById('stat-points');

    function awardXP(amount) {
        globalXP += amount;
        statPoints.textContent = globalXP;
        // Optionally update progress bars
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
       CERTIFICATE VIEW MODAL
       ========================================== */
    const modal = document.getElementById('cert-modal');
    const modalClose = document.getElementById('cert-modal-close');
    const badgeCertBtns = document.querySelectorAll('.badge-cert-btn');

    badgeCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certType = btn.dataset.cert;
            if (certType === "l1-sci") {
                document.getElementById('modal-cert-skill').textContent = "Ciencia Nivel 1 (Orígenes & Cosmología)";
                document.getElementById('modal-cert-id').textContent = "MD5: 8085-L1-SCI-987B2405";
            }
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

});
