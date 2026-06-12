/* ==========================================================================
   STEMOS LXP - PLATFORM AND SOCRATIC CHAT SIMULATOR INTERACTIVE LOGIC
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Skills Nodes Data --- */
    const skillsData = {
        origins: {
            title: "Ciencia L1 (Orígenes)",
            status: "completed",
            desc: "Comprensión del origen del Universo a través de la gran expansión cósmica y las partículas fundamentales constitutivas de la materia.",
            prereq: "Ninguno (Fundación)",
            standard: "NGSS HS-PS4 / SEP EC1290",
            xp: 150,
            chatTopic: "origins"
        },
        cosmology: {
            title: "Cosmología",
            status: "completed",
            desc: "Modelos científicos sobre el origen, evolución y estructura general del cosmos, incluyendo la radiación de fondo de microondas y la energía oscura.",
            prereq: "Ciencia L1 (Orígenes)",
            standard: "NGSS HS-ESS1-2 / SEP EC1290",
            xp: 150,
            chatTopic: "cosmology"
        },
        transistors: {
            title: "Física de Transistores",
            status: "completed",
            desc: "Comportamiento electrónico de materiales semiconductores dopados tipo P y N. Funcionamiento lógico de la compuerta del transistor en procesadores.",
            prereq: "Ciencia L1 (Orígenes)",
            standard: "SEP EC2034 (Manufactura de Chips)",
            xp: 150,
            chatTopic: "transistors"
        },
        relativity: {
            title: "Relatividad Especial",
            status: "active",
            desc: "Conceptos de espacio-tiempo curvo, dilatación temporal de Einstein y la transformación del marco de referencia en la velocidad de la luz.",
            prereq: "Cosmología",
            standard: "NGSS HS-PS2-4",
            xp: 200,
            chatTopic: "relativity"
        },
        cpu: {
            title: "Arquitectura de Procesadores",
            status: "active",
            desc: "Cómo operan las unidades aritmético-lógicas (ALU), los registros internos, y los ciclos de instrucción Fetch-Decode-Execute en un CPU moderno.",
            prereq: "Física de Transistores",
            standard: "SEP EC2034 (Manufactura de Chips)",
            xp: 200,
            chatTopic: "cpu"
        },
        "english-esp": {
            title: "Inglés ESP (Semiconductores)",
            status: "active",
            desc: "Inglés Técnico para Propósitos Específicos (ESP) enfocado en la cadena de suministro de microchips, salas limpias (cleanrooms) y especificaciones de fotolitografía.",
            prereq: "Física de Transistores / CPU",
            standard: "CONOCER EC1338 / MCER B2",
            xp: 180,
            chatTopic: "english-esp"
        },
        quantum: {
            title: "Computación Cuántica",
            status: "locked",
            desc: "Modelado de Qubits mediante principios de superposición, interferencia constructiva y entrelazamiento cuántico para resolución de algoritmos complejos.",
            prereq: "Relatividad & Procesadores",
            standard: "NGSS HS-PS4-5 / Quantum Computing Foundation",
            xp: 300,
            chatTopic: "quantum"
        },
        "socratic-coding": {
            title: "Coding Socrático",
            status: "locked",
            desc: "Desarrollo y optimización de algoritmos en frontend/backend apoyado en la guía lógica y de refactorización interactiva del Feynman Engine.",
            prereq: "Computación Cuántica",
            standard: "SEP EC0982 (Programación Frontend)",
            xp: 400,
            chatTopic: "socratic-coding"
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
        step: 0
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
        
        if (chatState.topic === "cosmology") {
            if (chatState.step === 1) {
                addBotMessage("Para evaluar tu comprensión en **Cosmología**, empecemos desde el principio. Imagina que le explicas a un niño de 8 años: **¿Qué fue el Big Bang y cómo dio origen a nuestro espacio?**");
            } else if (chatState.step === 2) {
                addBotMessage("Esa es una perspectiva común. Pero dime, ¿el Big Bang fue una explosión que ocurrió *dentro* de un espacio que ya existía vacío, o fue la creación y expansión del *espacio mismo*?");
            } else if (chatState.step === 3) {
                addBotMessage("¡Fantástico! Has captado la esencia cuántica: el espacio no es un contenedor pasivo, sino algo dinámico que se expande. Una última pregunta: si el espacio se está expandiendo en este instante, **¿por qué la Tierra o tú mismo no se están expandiendo de tamaño también?**");
            } else if (chatState.step === 4) {
                addBotMessage("¡Absolutamente correcto! La fuerza de gravedad a corta escala y las fuerzas electromagnéticas que unen los átomos son mucho más fuertes que la débil tasa de expansión cósmica local. Has completado tu repaso de Cosmología con éxito. **¡+150 XP sumados a tu perfil!** 🌌");
                awardXP(150);
                resetTutor();
            }
        } else if (chatState.topic === "transistors") {
            if (chatState.step === 1) {
                addBotMessage("Excelente. Hablemos de la física de **Transistores**. Explécame de forma muy simple: **¿Qué es un transistor y cuál es su función principal dentro de tu celular?**");
            } else if (chatState.step === 2) {
                addBotMessage("Exacto, funciona como un apagador o interruptor microscópico. Ahora, para apagar una luz física usamos el dedo. **¿Qué señal física activa o desactiva la compuerta de este micro-interruptor dentro del silicio?**");
            } else if (chatState.step === 3) {
                addBotMessage("¡Brillante! Un voltaje eléctrico altera la conductividad eléctrica del silicio. Para cerrar el ciclo, ¿por qué llamamos al silicio un **semiconductor**? ¿Qué propiedad lo hace tan especial comparado con el cobre o el plástico?");
            } else if (chatState.step === 4) {
                addBotMessage("¡Exacto! El silicio puede comportarse como conductor o aislante dependiendo de la presencia de impurezas (dopaje) y campos eléctricos. Has demostrado un dominio conceptual sólido. **¡+150 XP añadidos!** 🔌");
                awardXP(150);
                resetTutor();
            }
        } else if (chatState.topic === "english-esp") {
            if (chatState.step === 1) {
                addBotMessage("Welcome to the **Semiconductor Technical English (ESP)** review! Let's check your communication skills. Imagine describing the difference between a **'wafer'** and a **'die'** in English. How would you explain them simply?");
            } else if (chatState.step === 2) {
                addBotMessage("Superb distinction! A wafer is the raw circular silicon disk, and a die is the individual chip block. Now, in the fabrication process, we build chips inside ultra-sterile environments. **What is the English term for these special rooms, and why is air filtering so critical there?**");
            } else if (chatState.step === 3) {
                addBotMessage("Indeed, a 'cleanroom'! And yes, dust particles (contaminants) are the ultimate enemy of nanometric circuits. Now, to protect the cleanroom from human lint and skin cells, workers must wear specialized protective overalls. **Do you know the popular name of these white suits?**");
            } else if (chatState.step === 4) {
                addBotMessage("Spot on! They are called **'bunny suits'**. You've proven that your English communication skills are perfectly aligned with cleanroom manufacturing requirements. **+180 XP awarded!** 🇺🇸📡");
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
        newLine.setAttribute("y1", "325");
        newLine.setAttribute("x2", "330");
        newLine.setAttribute("y2", "400");
        newLine.setAttribute("class", "line active");
        svg.appendChild(newLine);

        // 2. Create the Node Group
        const newNodeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        newNodeGroup.setAttribute("class", "node node-active");
        newNodeGroup.setAttribute("data-node", "semiconductors-phys");
        newNodeGroup.setAttribute("transform", "translate(330, 400)");

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
        foreignObj.innerHTML = '<i class="fa-solid fa-atom node-icon"></i>';
        newNodeGroup.appendChild(foreignObj);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("y", "44");
        text.setAttribute("class", "node-text");
        text.textContent = "Física Semiconductors";
        newNodeGroup.appendChild(text);

        svg.appendChild(newNodeGroup);

        // Add details to dictionary dynamically
        skillsData["semiconductors-phys"] = {
            title: "Física de Semiconductores",
            status: "active",
            desc: "Estudio de las bandas de conducción en cristales de silicio, portadores mayoritarios/minoritarios y dopaje extrínseco para control electrónico.",
            prereq: "Física de Transistores (SC-1)",
            standard: "CONOCER EC2034",
            xp: 200,
            chatTopic: "semiconductors-phys"
        };

        // Attach listener to new node
        newNodeGroup.addEventListener('click', () => {
            svgNodes.forEach(n => n.querySelector('.node-circle').removeAttribute('style'));
            circle.style.strokeWidth = "5px";
            circle.style.stroke = "#f59e0b";

            emptyState.classList.add('hidden');
            infoContent.classList.remove('hidden');

            nodeTitle.textContent = skillsData["semiconductors-phys"].title;
            nodeDesc.textContent = skillsData["semiconductors-phys"].desc;
            nodePrereq.textContent = skillsData["semiconductors-phys"].prereq;
            nodeStandard.textContent = skillsData["semiconductors-phys"].standard;
            nodePoints.textContent = `${skillsData["semiconductors-phys"].xp} XP`;
            nodeStatusBadge.textContent = "En Progreso";
            nodeStatusBadge.className = "badge-status active";
            startTutorBtn.disabled = false;
            startTutorBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Evaluar con Feynman Engine`;
            selectedNodeId = "semiconductors-phys";
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
