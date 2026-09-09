/**
 * PERSONAL BEST 2.0 - INTERACTIVE EXPERIENCE APPLICATION
 * Full dynamic bilingual engine, interactive state, simulators, and media handlers
 */

// ==========================================
// 1. DATA & CONTENT ARCHITECTURE (ES / EN)
// ==========================================

const PB_DATA = {
  // Levels Showcase
  levels: [
    {
      id: "a1",
      cefr: "A1 Starter / Beginner",
      title_es: "Personal Best 2.0 - Starter / A1",
      title_en: "Personal Best 2.0 - Starter / A1",
      badge: "CEFR A1",
      img: "assets/image9.png",
      desc_es: "Construcción de bases sólidas. Enfoque en expresiones cotidianas, pronunciación fonémica inicial guiada por Adrian Underhill y proyectos colaborativos sencillos.",
      desc_en: "Building solid foundations. Focus on everyday basic expressions, initial phonemic pronunciation guided by Adrian Underhill, and accessible collaborative tasks.",
      units: "10 Units",
      hours: "70-90 Contact Hours",
      features_es: [
        "10 Unidades temáticas ODS de la ONU",
        "Aperturas con video Best Start",
        "Silabario de pronunciación fonémica",
        "Evaluación continua y auto-diagnóstico"
      ],
      features_en: [
        "10 Thematic UN SDG Units",
        "Best Start video unit openers",
        "Phonemic pronunciation syllabus",
        "Continuous self & teacher assessment"
      ]
    },
    {
      id: "a2",
      cefr: "A2 Elementary",
      title_es: "Personal Best 2.0 - Elementary / A2",
      title_en: "Personal Best 2.0 - Elementary / A2",
      badge: "CEFR A2",
      img: "assets/image11.png",
      desc_es: "Desarrollo de fluidez en situaciones familiares. Introducción a la mediación textual básica, ampliación de tiempos verbales y shows web Learning Curve.",
      desc_en: "Developing fluency in familiar scenarios. Introduction to basic textual mediation, expanded verb tenses, and Learning Curve web shows.",
      units: "12 Units",
      hours: "80-100 Contact Hours",
      features_es: [
        "Shows web Learning Curve y Talking Zone",
        "Actividades de mediación elemental",
        "Práctica de escritura guiada (Writing Practice)",
        "Quizzes de reconocimiento de voz en Richmond Studio"
      ],
      features_en: [
        "Learning Curve & Talking Zone web shows",
        "Foundational mediation tasks",
        "Guided Writing Practice spread",
        "Voice Recognition Quizzes in Richmond Studio"
      ]
    },
    {
      id: "b1",
      cefr: "B1 Pre-Intermediate",
      title_es: "Personal Best 2.0 - Pre-Intermediate / B1",
      title_en: "Personal Best 2.0 - Pre-Intermediate / B1",
      badge: "CEFR B1",
      img: "assets/image10.png",
      desc_es: "Consolidación de destrezas comunicativas independientes. Énfasis en habla conectada (connected speech), textos graduados y proyectos en equipo Best Finish.",
      desc_en: "Consolidating independent communicative skills. Strong emphasis on connected speech, graded reading texts, and Best Finish team projects.",
      units: "12 Units",
      hours: "90-110 Contact Hours",
      features_es: [
        "Desarrollo de habla conectada (rhythm & elision)",
        "Proyectos colaborativos con impacto social (ODS)",
        "Grammar Blitz adaptativo en plataforma",
        "Simulaciones de certificación Exam Jam"
      ],
      features_en: [
        "Connected speech mastery (rhythm & elision)",
        "Socially impactful collaborative projects (SDGs)",
        "Adaptive Grammar Blitz on platform",
        "Exam Jam certification task simulations"
      ]
    },
    {
      id: "b1plus",
      cefr: "B1+ Intermediate",
      title_es: "Personal Best 2.0 - Intermediate / B1+",
      title_en: "Personal Best 2.0 - Intermediate / B1+",
      badge: "CEFR B1+",
      img: "assets/image7.png",
      desc_es: "Transición hacia el dominio intermedio alto. Manejo de matices, argumentación, mediación conceptual en debates y redacción de diversos géneros.",
      desc_en: "Transition to high-intermediate mastery. Handling nuance, argumentation, conceptual mediation in debates, and multi-genre writing.",
      units: "12 Units",
      hours: "90-120 Contact Hours",
      features_es: [
        "Mediación conceptual y resolución de problemas",
        "Variedad de acentos globales (International English)",
        "Speech Lab con retroalimentación acústica",
        "6 páginas completas de Writing Skills"
      ],
      features_en: [
        "Conceptual mediation & problem-solving",
        "Global accents exposure (International English)",
        "Speech Lab with acoustic feedback",
        "6 full dedicated Writing Skills lessons"
      ]
    },
    {
      id: "b2",
      cefr: "B2 Upper-Intermediate",
      title_es: "Personal Best 2.0 - Upper-Intermediate / B2",
      title_en: "Personal Best 2.0 - Upper-Intermediate / B2",
      badge: "CEFR B2",
      img: "assets/image6.png",
      desc_es: "Autonomía y precisión en entornos académicos y profesionales. Cohesión textual avanzada, análisis crítico y preparación para certificaciones de nivel B2.",
      desc_en: "Autonomy and precision in academic and professional contexts. Advanced text cohesion, critical thinking, and B2 certification readiness.",
      units: "12 Units",
      hours: "100-130 Contact Hours",
      features_es: [
        "Preparación para B2 First / TOEIC / TOEFL",
        "Pensamiento crítico e interculturalidad profunda",
        "Cohesión y recursos de género en Text Builder",
        "Monitoreo integral con Richmond AI Assessment"
      ],
      features_en: [
        "Preparation for B2 First / TOEIC / TOEFL",
        "Critical thinking & deep intercultural awareness",
        "Cohesion & discourse markers in Text Builder",
        "Holistic monitoring with Richmond AI Assessment"
      ]
    },
    {
      id: "c1",
      cefr: "C1 Advanced",
      title_es: "Personal Best 2.0 - Advanced / C1",
      title_en: "Personal Best 2.0 - Advanced / C1",
      badge: "CEFR C1",
      img: "assets/image8.png",
      desc_es: "Excelencia comunicativa y mediación de alta complejidad. Análisis de discurso, registro formal e informal, debates sofisticados y proyectos globales.",
      desc_en: "Communicative excellence and high-complexity mediation. Discourse analysis, formal/informal register, sophisticated debate, and global projects.",
      units: "12 Units",
      hours: "110-140 Contact Hours",
      features_es: [
        "Dominio avanzado del marco CEFR C1",
        "Mediación comunicativa en contextos multiculturales",
        "Herramientas docentes Teacher's iSolutions",
        "Ecosistema digital completo en Richmond Studio"
      ],
      features_en: [
        "Advanced CEFR C1 framework mastery",
        "Communicative mediation in multicultural settings",
        "Full Teacher's iSolutions interactive suite",
        "Complete digital ecosystem on Richmond Studio"
      ]
    }
  ],

  // Unit Anatomy Steps
  unitSteps: [
    {
      step: 1,
      id: "best-start",
      tab_es: "1. Best Start",
      tab_en: "1. Best Start",
      title_es: "Apertura Best Start: ODS de la ONU y Activación",
      title_en: "Best Start Opener: UN SDGs & Activation",
      desc_es: "Cada unidad abre con una página Best Start que introduce el tema a través de un video cautivador enfocado en uno de los 17 Objetivos de Desarrollo Sostenible (ODS). Los estudiantes activan vocabulario previo y discuten desafíos globales reales.",
      desc_en: "Every unit begins with a Best Start page introducing the unit theme through an engaging video focused on one of the 17 UN Sustainable Development Goals (SDGs). Learners activate prior knowledge and discuss real global challenges.",
      highlights_es: [
        "Video oficial de la ONU contextualizado con presentadores internacionales",
        "Imágenes dinámicas de gran formato diseñadas para detonar el debate",
        "Activación lingüística previa a las lecciones de Language y Skills"
      ],
      highlights_en: [
        "Official contextualized video with international presenters",
        "High-impact dynamic imagery designed to trigger discussion",
        "Language pre-activation before Language and Skills lessons"
      ],
      img: "assets/image22.png",
      caption_es: "Página de apertura 'Best Start' con vinculación a los ODS",
      caption_en: "Best Start opening page linked to UN SDGs"
    },
    {
      step: 2,
      id: "lessons-ac",
      tab_es: "2. Lessons A & C (Language)",
      tab_en: "2. Lessons A & C (Language)",
      title_es: "Lecciones A & C: Enfoque Riguroso en Language",
      title_en: "Lessons A & C: Dedicated Language Focus",
      desc_es: "La gramática y el vocabulario se enseñan en lecciones independientes con recuadros Grammar Box claros y pistas de audio graduadas. La pronunciación no es un añadido: cuenta con un silabario de connected speech diseñado por Adrian Underhill.",
      desc_en: "Grammar and vocabulary are taught in standalone lessons featuring crystal-clear Grammar Boxes and graded audio tracks. Pronunciation is central: it features a connected speech syllabus created by Adrian Underhill.",
      highlights_es: [
        "Cajas de gramática con reglas inductivas y tablas concisas",
        "Silabario de habla conectada (acentuación, entonación y elisión)",
        "Dos o más conjuntos de vocabulario relevante y funcional por unidad"
      ],
      highlights_en: [
        "Grammar boxes with inductive rules and concise explanations",
        "Connected speech syllabus (stress, intonation, and elision)",
        "Two or more relevant, functional vocabulary sets per unit"
      ],
      img: "assets/image34.png",
      caption_es: "Lección de Lenguaje: Gramática estructurada y Connected Speech",
      caption_en: "Language Lesson: Structured Grammar & Connected Speech"
    },
    {
      step: 3,
      id: "lessons-bd",
      tab_es: "3. Lessons B & D (Skills)",
      tab_en: "3. Lessons B & D (Skills)",
      title_es: "Lecciones B & D: Desarrollo de Skills con Web Shows",
      title_en: "Lessons B & D: Skills Development via Web Shows",
      desc_es: "La lección B desarrolla destrezas receptivas (Reading/Listening) con recuadros Text Builder para comprender cohesión y estructura. La lección D impulsa destrezas productivas (Speaking/Writing) apoyadas por los web shows Learning Curve y Talking Zone.",
      desc_en: "Lesson B develops receptive skills (Reading/Listening) with Text Builder boxes for text cohesion. Lesson D fosters productive skills (Speaking/Writing) driven by the authentic web shows Learning Curve and Talking Zone.",
      highlights_es: [
        "Presentadores transatlánticos con diversidad de acentos auténticos",
        "Conversation Builder: frases funcionales transferibles al mundo real",
        "Text Builder: marcadores discursivos, secuenciación y coherencia"
      ],
      highlights_en: [
        "Transatlantic presenters showcasing authentic global accents",
        "Conversation Builder: high-utility functional spoken phrases",
        "Text Builder: discourse markers, sequencing, and cohesion"
      ],
      img: "assets/image36.png",
      caption_es: "Lección de Skills: Reading, Listening y Conversation Builder",
      caption_en: "Skills Lesson: Reading, Listening & Conversation Builder"
    },
    {
      step: 4,
      id: "practice-plus",
      tab_es: "4. Practice Spread",
      tab_en: "4. Practice Spread",
      title_es: "Práctica Extendida: Consolidación y Referencia",
      title_en: "Extended Practice Spread: Deep Consolidation",
      desc_es: "Al final del Student's Book se incluye una sección exhaustiva de referencia gramatical y banco de vocabulario. Cada punto se explica con detalle y ejercicios adicionales, garantizando que nadie se quede atrás.",
      desc_en: "At the back of the Student's Book is a comprehensive grammar reference and vocabulary bank. Every target point is explained in detail with extra exercises, ensuring full mastery for all learners.",
      highlights_es: [
        "Explicaciones gramaticales detalladas para estudio independiente",
        "Bancos de vocabulario clasificados con soporte fonético",
        "Puente directo hacia las actividades interactivas de Richmond Studio"
      ],
      highlights_en: [
        "Detailed grammar explanations for independent review",
        "Categorized vocabulary banks with phonemic transcriptions",
        "Direct bridge to interactive activities on Richmond Studio"
      ],
      img: "assets/image42.png",
      caption_es: "Sección de práctica extendida al final del libro",
      caption_en: "Extended Practice and reference section at book back"
    },
    {
      step: 5,
      id: "best-finish",
      tab_es: "5. Best Finish",
      tab_en: "5. Best Finish",
      title_es: "Cierre Best Finish: Mini-Proyecto Colaborativo y Mediación",
      title_en: "Best Finish Closure: Collaborative Project & Mediation",
      desc_es: "Cada unidad culmina con la página Best Finish, donde los alumnos aplican lo aprendido en un mini-proyecto grupal vinculado al tema ODS de la apertura. Al final, son dirigidos a una tarea de Mediación CEFR para transferir información a terceros.",
      desc_en: "Every unit culminates in a Best Finish page where students apply target skills in a group collaborative project linked to the opening SDG theme, followed by an official CEFR Mediation task.",
      highlights_es: [
        "Proyectos en equipo con presentación a la clase y rúbrica de reflexión",
        "Top Tips metodológicos para asegurar el éxito en la entrega del proyecto",
        "Paso directo a tareas de Mediación: textual, conceptual y comunicativa"
      ],
      highlights_en: [
        "Team projects with class presentations and self-reflection rubrics",
        "Top Tips providing step-by-step guidance for student success",
        "Direct transition to Mediation tasks: textual, conceptual & communicative"
      ],
      img: "assets/image44.png",
      caption_es: "Página 'Best Finish' con proyecto colaborativo y mediación",
      caption_en: "Best Finish page featuring collaborative project & mediation"
    }
  ],

  // Richmond Studio Tabs
  studioTabs: [
    {
      id: "estudent-book",
      title_es: "eStudent's Book & eWorkbook",
      title_en: "eStudent's Book & eWorkbook",
      badge: "100% Digital",
      desc_es: "Versiones totalmente digitalizadas del Student's Book y Workbook, aptas para clases presenciales, híbridas o remotas. Los alumnos reciben retroalimentación instantánea en la mayoría de actividades y los profesores pueden calificar tareas abiertas con rúbricas claras.",
      desc_en: "Fully digitized editions of the Student's Book and Workbook, tailored for in-person, hybrid, or online classes. Students receive instant automated feedback on activities, while teachers can mark open tasks seamlessly.",
      points_es: [
        "Autocorrección inmediata que acelera el aprendizaje",
        "Asignación flexible: individual, por grupos o al grupo completo",
        "eLogs de interacción y tiempo de estudio dedicado",
        "Herramientas de anotación y zoom integradas"
      ],
      points_en: [
        "Instant self-grading accelerating learner internalization",
        "Flexible assignment: individual, groups, or whole class",
        "eLogs tracking interaction and study hours",
        "Integrated annotation and presentation tools"
      ],
      img: "assets/image62.png"
    },
    {
      id: "extra-practice",
      title_es: "Extra Practice & Markbook",
      title_en: "Extra Practice & Markbook",
      badge: "Data Insights",
      desc_es: "Práctica profunda de vocabulario, gramática y destrezas de cada unidad. Todas las actividades se registran automáticamente en el Markbook docente, generando analíticas de desempeño en tiempo real más allá de una simple calificación.",
      desc_en: "Deep practice of unit vocabulary, grammar, and skills. All activities are automatically logged in the teacher's Markbook, providing actionable real-time performance insights far beyond simple grades.",
      points_es: [
        "Modo autoestudio o asignación como tarea con fecha límite",
        "Gráficas de progreso por destreza y por estudiante",
        "Detección temprana de áreas de rezago o dificultad",
        "Exportación de reportes de progreso institucional"
      ],
      points_en: [
        "Self-study mode or homework assignments with deadlines",
        "Progress analytics mapped by skill and by student",
        "Early warning detection for struggling learners",
        "Institutional report exports for coordinators"
      ],
      img: "assets/image64.png"
    },
    {
      id: "voice-quizzes",
      title_es: "Voice Review Quizzes",
      title_en: "Voice Review Quizzes",
      badge: "Voice AI Engine",
      desc_es: "Una herramienta innovadora de reconocimiento de voz donde los estudiantes responden las preguntas de los cuestionarios hablando en voz alta. Refuerza la pronunciación de las expresiones de Conversation Builder y genera confianza para comunicarse.",
      desc_en: "An innovative voice-recognition AI tool where learners answer quiz questions using their own voice. It reinforces pronunciation of Conversation Builder phrases and builds speaking confidence.",
      points_es: [
        "Reconocimiento de voz impulsado por inteligencia artificial",
        "Repaso activo de expresiones coloquiales y funcionales",
        "Calificación automática reportada de inmediato al Markbook",
        "Ambiente de práctica seguro y sin inhibiciones para el alumno"
      ],
      points_en: [
        "AI-powered speech recognition evaluation",
        "Active oral review of functional expressions",
        "Automated grading logged directly into Markbook",
        "Safe, low-anxiety speaking environment for students"
      ],
      img: "assets/image66.jpeg"
    },
    {
      id: "isolutions",
      title_es: "Teacher's iSolutions",
      title_en: "Teacher's iSolutions",
      badge: "Classroom Hub",
      desc_es: "La herramienta docente proyectable e interactiva definitiva. Integra Student's Book y Workbook interactivos, notas para el profesor, claves de respuestas a un clic, audios sincronizados con scripts y videos con subtítulos.",
      desc_en: "The ultimate projectable interactive teaching hub. Combines interactive Student's Book and Workbook, teacher notes, one-click answer keys, embedded audios with scripts, and videos with subtitles.",
      points_es: [
        "Agiliza la preparación de clase y dinamiza la sesión en aula",
        "Recursos visuales y auditivos para todos los estilos de aprendizaje",
        "Acceso directo a Test Manager y generador de exámenes",
        "Modo offline disponible para clases sin conexión garantizada"
      ],
      points_en: [
        "Streamlines lesson prep and energizes classroom delivery",
        "Visual and auditory aids catering to all learning styles",
        "Direct access to Test Manager and test generator",
        "Offline mode available for unreliable connections"
      ],
      img: "assets/image68.png"
    },
    {
      id: "power-engines",
      title_es: "Motores: Exam Jam, Speech Lab & Grammar Blitz",
      title_en: "Engines: Exam Jam, Speech Lab & Grammar Blitz",
      badge: "Adaptive Tech",
      desc_es: "Tres motores de alto rendimiento que potencian Richmond Studio: Exam Jam prepara al alumno para certificaciones internacionales; Speech Lab perfecciona la fonología oral; Grammar Blitz adapta la dificultad según el rendimiento.",
      desc_en: "Three high-performance engines powering Richmond Studio: Exam Jam trains learners for international certifications; Speech Lab perfects oral phonology; Grammar Blitz adaptively scales grammar difficulty.",
      points_es: [
        "Exam Jam: Actividades orientadas a certificaciones oficiales",
        "Speech Lab: Laboratorio de habla con precisión acústica",
        "Grammar Blitz: Algoritmo adaptativo que desafía al estudiante a su propio ritmo"
      ],
      points_en: [
        "Exam Jam: Certification-oriented skill building activities",
        "Speech Lab: Precision acoustic speaking laboratory",
        "Grammar Blitz: Adaptive algorithm scaling to learner mastery"
      ],
      img: "assets/image71.png"
    }
  ],

  // Student Onboarding Steps
  simSteps: [
    {
      num: 1,
      title_es: "Paso 1: Acceso al Portal",
      title_en: "Step 1: Portal Access",
      url: "https://richmondstudio.global/login",
      desc_es: "El estudiante ingresa a la plataforma oficial de Richmond Studio desde cualquier navegador web o dispositivo móvil para iniciar su sesión o crear su perfil.",
      desc_en: "The student navigates to the official Richmond Studio platform from any web browser or mobile device to log in or register.",
      tip_es: "Recomienda a tus alumnos guardar este enlace en marcadores de su navegador.",
      tip_en: "Encourage students to bookmark this login page in their browser.",
      img: "assets/image77.png"
    },
    {
      num: 2,
      title_es: "Paso 2: Registro de Nueva Cuenta",
      title_en: "Step 2: New Account Creation",
      url: "Crear Cuenta / Sign Up",
      desc_es: "El alumno selecciona 'New Account' e ingresa sus datos básicos (nombre, correo institucional o personal y contraseña segura).",
      desc_en: "The student clicks 'New Account' and enters their basic info (name, institutional or personal email, and a secure password).",
      tip_es: "Es fundamental usar el correo registrado en las listas del profesor.",
      tip_en: "Students should use the official email address registered with their institution.",
      img: "assets/image78.png"
    },
    {
      num: 3,
      title_es: "Paso 3: Activación del Access Code",
      title_en: "Step 3: Access Code Activation",
      url: "Código de Acceso / Book Code",
      desc_es: "El alumno raspa la tarjeta o revisa el código de acceso único impreso en el interior de su Student's Book o eStudent's Book de Personal Best 2.0 y lo introduce.",
      desc_en: "The student scratches the security strip or checks the unique access code printed inside their Personal Best 2.0 Student's Book and submits it.",
      tip_es: "El código desbloquea de inmediato todos los materiales digitales de ese nivel durante el ciclo escolar.",
      tip_en: "The code immediately unlocks all digital level materials for the academic term.",
      img: "assets/image80.png"
    },
    {
      num: 4,
      title_es: "Paso 4: Vinculación con Class Code",
      title_en: "Step 4: Class Code Enrollment",
      url: "Código de Clase del Profesor",
      desc_es: "El profesor genera un 'Class Code' desde su panel docente y se lo proporciona a sus alumnos. Al introducirlo, el alumno queda inscrito en el grupo correspondiente.",
      desc_en: "The teacher generates a 'Class Code' from their teacher hub and shares it with students. Once entered, the student is instantly enrolled in the group.",
      tip_es: "A partir de este momento, todas las calificaciones se enviarán en automático al Markbook del profesor.",
      tip_en: "From this moment, all grades and logs are automatically synced to the teacher's Markbook.",
      img: "assets/image81.png"
    },
    {
      num: 5,
      title_es: "Paso 5: Vista General del Alumno",
      title_en: "Step 5: Student Dashboard Overview",
      url: "Dashboard del Estudiante",
      desc_es: "El alumno accede a su panel principal con acceso directo a: eWorkbook, eStudent’s Book, Extra Practice Activities, Voice Review Quizzes, Grammar Blitz, Speech Lab y Exam Jam.",
      desc_en: "The student accesses their main dashboard with one-click access to: eWorkbook, eStudent's Book, Extra Practice, Voice Quizzes, Grammar Blitz, Speech Lab, and Exam Jam.",
      tip_es: "El panel muestra notificaciones de tareas pendientes, fechas límite y récord de medallas.",
      tip_en: "The dashboard displays pending assignments, deadlines, and achievement badges.",
      img: "assets/image82.png"
    }
  ],

  // Richmond AI Suite
  aiSuite: [
    {
      id: "cefr-report",
      badge: "CEFR Diagnostic",
      title_es: "CEFR Assessment Report",
      title_en: "CEFR Assessment Report",
      desc_es: "Permite al docente subir fotografías de trabajos, redacciones o exámenes de los alumnos (en grupos de hasta cinco fotos). La IA analiza la evidencia y genera un diagnóstico CEFR completo con descriptores oficiales.",
      desc_en: "Allows educators to upload photos of student work samples or essays (in batches of up to five images). AI analyzes the work and generates an official CEFR diagnostic report with detailed descriptors.",
      feature_es: "Ahorra horas de corrección manual y ofrece evidencia objetiva para coordinadores y padres de familia.",
      feature_en: "Saves hours of manual grading while providing objective evidence for coordinators and parents.",
      img: "assets/image84.png"
    },
    {
      id: "activity-generator",
      badge: "Pedagogy AI",
      title_es: "Learning Activities Generator",
      title_en: "Learning Activities Generator",
      desc_es: "Generador inteligente de secuencias didácticas paso a paso. El profesor selecciona el modelo pedagógico y las necesidades de aprendizaje del grupo para obtener actividades personalizadas listas para el aula.",
      desc_en: "Intelligent step-by-step lesson activity generator. The educator selects the pedagogical framework and specific learning needs to produce tailor-made classroom activities in seconds.",
      feature_es: "Diferenciación instantánea para grupos con habilidades mixtas o refuerzo de contenidos específicos.",
      feature_en: "Instant differentiation for mixed-ability classrooms and targeted content reinforcement.",
      img: "assets/image87.png"
    },
    {
      id: "youtube-generator",
      badge: "Authentic Content",
      title_es: "YouTube-Based Content Generator",
      title_en: "YouTube-Based Content Generator",
      desc_es: "Convierte cualquier video auténtico de YouTube (por ejemplo, el galardonado cortometraje animado 'The Present') en una lección completa con tareas de comprensión, debate y práctica lingüística.",
      desc_en: "Transforms any authentic YouTube video (e.g. the award-winning short film 'The Present') into a complete lesson plan with comprehension, debate, and language tasks.",
      feature_es: "Conecta el aula con material cultural contemporáneo alineado a los objetivos de aprendizaje.",
      feature_en: "Brings contemporary authentic video into the classroom aligned to target syllabus outcomes.",
      img: "assets/image89.png"
    },
    {
      id: "cefr-checker",
      badge: "Level Verifier",
      title_es: "CEFR Level Checker",
      title_en: "CEFR Level Checker",
      desc_es: "Verificador de nivel lingüístico. Permite auditar la complejidad de textos, lecturas suplementarias e imágenes antes de llevarlas a clase, confirmando si corresponden a A1, A2, B1, B2 o C1.",
      desc_en: "Language level verifier. Audits text complexity, supplementary readings, and imagery before classroom delivery, confirming precise CEFR calibration from A1 to C1.",
      feature_es: "Garantiza que el input lingüístico sea exactamente el adecuado para la zona de desarrollo próximo del alumno.",
      feature_en: "Guarantees linguistic input aligns precisely with the learner's zone of proximal development.",
      img: "assets/image91.png"
    }
  ]
};

// ==========================================
// 2. STATE CONTROLLER
// ==========================================

const State = {
  lang: "es", // 'es' or 'en'
  currentLevelIndex: 0,
  currentUnitStep: 0,
  currentStudioTab: 0,
  currentSimStep: 0,
  pacingHours: 4,
  pacingEdition: "full" // 'full' or 'split'
};

// ==========================================
// 3. UI INITIALIZATION & RENDERERS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  renderLevelSelector();
  renderUnitWalkthrough();
  renderStudioTabs();
  renderSimulator();
  renderRichmondAI();
  initPacingCalculator();
  initLightbox();
  initMobileMenu();
});

// Switch Language
function setLanguage(newLang) {
  if (State.lang === newLang) return;
  State.lang = newLang;
  
  // Update Buttons
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === newLang);
  });
  
  // Update static localized texts
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[State.lang] && I18N[State.lang][key]) {
      el.textContent = I18N[State.lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (I18N[State.lang] && I18N[State.lang][key]) {
      el.innerHTML = I18N[State.lang][key];
    }
  });

  // Re-render dynamic components with new language
  renderLevelSelector();
  renderUnitWalkthrough();
  renderStudioTabs();
  renderSimulator();
  renderRichmondAI();
  updatePacingCalculation();
}

function initLanguage() {
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang-btn"));
    });
  });
}

// ------------------------------------------
// Level Selector
// ------------------------------------------
function renderLevelSelector() {
  const container = document.getElementById("level-tabs-container");
  const displayCard = document.getElementById("level-display-card");
  if (!container || !displayCard) return;

  container.innerHTML = "";
  PB_DATA.levels.forEach((lvl, idx) => {
    const btn = document.createElement("button");
    btn.className = `level-tab ${idx === State.currentLevelIndex ? "active" : ""}`;
    btn.textContent = lvl.badge;
    btn.addEventListener("click", () => {
      State.currentLevelIndex = idx;
      renderLevelSelector();
    });
    container.appendChild(btn);
  });

  const cur = PB_DATA.levels[State.currentLevelIndex];
  const isEs = State.lang === "es";

  displayCard.innerHTML = `
    <div class="level-book-wrapper" onclick="openLightbox('${cur.img}', '${cur.title_en}')">
      <img src="${cur.img}" alt="${cur.title_en}" class="level-book-img" loading="lazy">
      <span class="level-book-badge">${cur.badge}</span>
    </div>
    <div class="level-info-content">
      <span class="eyebrow">${cur.cefr}</span>
      <h3>${isEs ? cur.title_es : cur.title_en}</h3>
      <p class="section-desc" style="font-size: 1rem;">${isEs ? cur.desc_es : cur.desc_en}</p>
      
      <div class="level-meta-row">
        <span class="level-meta-pill">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          ${cur.units}
        </span>
        <span class="level-meta-pill">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          ${cur.hours}
        </span>
        <span class="level-meta-pill">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          CEFR Aligned
        </span>
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem;">${isEs ? "Puntos Clave del Nivel:" : "Key Level Highlights:"}</h4>
      <ul class="level-features-list">
        ${(isEs ? cur.features_es : cur.features_en).map(f => `
          <li class="level-feature-item">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
            <span>${f}</span>
          </li>
        `).join("")}
      </ul>
      <div style="margin-top: 2rem;">
        <button class="btn btn-primary btn-sm" onclick="openLightbox('${cur.img}', '${cur.title_en}')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          ${isEs ? "Inspeccionar Portada en Alta Resolución" : "Inspect High-Res Cover"}
        </button>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Unit Walkthrough Stepper
// ------------------------------------------
function renderUnitWalkthrough() {
  const stepper = document.getElementById("walkthrough-stepper");
  const stage = document.getElementById("walkthrough-stage");
  if (!stepper || !stage) return;

  const isEs = State.lang === "es";

  stepper.innerHTML = "";
  PB_DATA.unitSteps.forEach((s, idx) => {
    const btn = document.createElement("button");
    btn.className = `stepper-node ${idx === State.currentUnitStep ? "active" : ""}`;
    btn.innerHTML = `
      <div class="stepper-circle">${s.step}</div>
      <span class="stepper-label">${isEs ? s.tab_es : s.tab_en}</span>
    `;
    btn.addEventListener("click", () => {
      State.currentUnitStep = idx;
      renderUnitWalkthrough();
    });
    stepper.appendChild(btn);
  });

  const cur = PB_DATA.unitSteps[State.currentUnitStep];
  stage.innerHTML = `
    <div class="stage-content">
      <span class="eyebrow">${isEs ? `Fase de Unidad ${cur.step} de 5` : `Unit Phase ${cur.step} of 5`}</span>
      <h3>${isEs ? cur.title_es : cur.title_en}</h3>
      <p>${isEs ? cur.desc_es : cur.desc_en}</p>
      
      <ul class="stage-highlights">
        ${(isEs ? cur.highlights_es : cur.highlights_en).map(h => `
          <li class="stage-highlight-item">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${h}</span>
          </li>
        `).join("")}
      </ul>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <button class="btn btn-secondary btn-sm" onclick="prevUnitStep()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          ${isEs ? "Paso Anterior" : "Previous Step"}
        </button>
        <button class="btn btn-primary btn-sm" onclick="nextUnitStep()">
          ${isEs ? "Siguiente Paso" : "Next Step"}
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>

    <div class="stage-media-card" onclick="openLightbox('${cur.img}', '${isEs ? cur.caption_es : cur.caption_en}')">
      <img src="${cur.img}" alt="${isEs ? cur.title_es : cur.title_en}" class="stage-media-img" loading="lazy">
      <div class="stage-media-overlay">
        <span class="stage-media-caption">${isEs ? cur.caption_es : cur.caption_en}</span>
        <span class="stage-zoom-badge">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          ${isEs ? "Clic para ampliar" : "Click to zoom"}
        </span>
      </div>
    </div>
  `;
}

function nextUnitStep() {
  State.currentUnitStep = (State.currentUnitStep + 1) % PB_DATA.unitSteps.length;
  renderUnitWalkthrough();
}

function prevUnitStep() {
  State.currentUnitStep = (State.currentUnitStep - 1 + PB_DATA.unitSteps.length) % PB_DATA.unitSteps.length;
  renderUnitWalkthrough();
}

// ------------------------------------------
// Richmond Studio Tabs
// ------------------------------------------
function renderStudioTabs() {
  const tabsContainer = document.getElementById("studio-tabs");
  const contentContainer = document.getElementById("studio-tab-content");
  if (!tabsContainer || !contentContainer) return;

  const isEs = State.lang === "es";

  tabsContainer.innerHTML = "";
  PB_DATA.studioTabs.forEach((tab, idx) => {
    const btn = document.createElement("button");
    btn.className = `studio-tab-btn ${idx === State.currentStudioTab ? "active" : ""}`;
    btn.textContent = isEs ? tab.title_es : tab.title_en;
    btn.addEventListener("click", () => {
      State.currentStudioTab = idx;
      renderStudioTabs();
    });
    tabsContainer.appendChild(btn);
  });

  const cur = PB_DATA.studioTabs[State.currentStudioTab];
  const isVoiceTab = cur.id === "voice-quizzes";

  contentContainer.innerHTML = `
    <div class="studio-info-col">
      <span class="eyebrow">${cur.badge}</span>
      <h3 style="font-size: 2rem; margin-bottom: 0.85rem;">${isEs ? cur.title_es : cur.title_en}</h3>
      <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">${isEs ? cur.desc_es : cur.desc_en}</p>
      
      <ul class="studio-features-list">
        ${(isEs ? cur.points_es : cur.points_en).map(p => `
          <li class="studio-feature-row">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
            <span>${p}</span>
          </li>
        `).join("")}
      </ul>

      ${isVoiceTab ? `
        <div class="voice-wave-container">
          <div class="voice-wave-header">
            <span>
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:inline; vertical-align:middle; margin-right:4px;"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              ${isEs ? "Simulación de Reconocimiento de Voz Activo" : "Active Speech Recognition Simulation"}
            </span>
            <span style="color:#84cc16;">98% Match</span>
          </div>
          <div class="voice-bars">
            ${Array.from({length: 28}).map(() => `<div class="voice-bar"></div>`).join("")}
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">"${isEs ? 'I think we should protect our oceans for future generations.' : 'I think we should protect our oceans for future generations.'}"</p>
        </div>
      ` : ""}
    </div>

    <div class="studio-media-col">
      <div class="studio-screenshot-card" onclick="openLightbox('${cur.img}', '${isEs ? cur.title_es : cur.title_en}')">
        <img src="${cur.img}" alt="${cur.title_en}" class="studio-screenshot-img" loading="lazy">
        <div class="stage-media-overlay">
          <span class="stage-media-caption">${isEs ? cur.title_es : cur.title_en}</span>
          <span class="stage-zoom-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            ${isEs ? "Ver Pantalla Completa" : "View Fullscreen"}
          </span>
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// Student Onboarding Simulator
// ------------------------------------------
function renderSimulator() {
  const container = document.getElementById("simulator-container");
  if (!container) return;

  const isEs = State.lang === "es";
  const steps = PB_DATA.simSteps;
  const cur = steps[State.currentSimStep];
  const progressPercent = ((State.currentSimStep + 1) / steps.length) * 100;

  container.innerHTML = `
    <div class="sim-header">
      <span class="eyebrow">${isEs ? "Simulador de Inducción para Alumnos" : "Student Onboarding Simulator"}</span>
      <span class="sim-step-indicator">${isEs ? `Paso ${cur.num} de ${steps.length}` : `Step ${cur.num} of ${steps.length}`}</span>
    </div>

    <div class="sim-progress-bar">
      <div class="sim-progress-fill" style="width: ${progressPercent}%;"></div>
    </div>

    <div class="sim-body">
      <div class="sim-content">
        <span style="font-size:0.85rem; color:var(--cyan-primary); font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">${cur.url}</span>
        <h3 style="margin-top:0.4rem;">${isEs ? cur.title_es : cur.title_en}</h3>
        <p>${isEs ? cur.desc_es : cur.desc_en}</p>
        
        <div style="background:rgba(255,255,255,0.04); border-left:3px solid var(--cyan-primary); padding:1rem; border-radius:0 var(--radius-md) var(--radius-md) 0; margin-bottom:1.5rem;">
          <strong style="color:var(--text-white); font-size:0.88rem;">Tip Docente:</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin:0.25rem 0 0;">${isEs ? cur.tip_es : cur.tip_en}</p>
        </div>

        <div class="sim-nav-buttons">
          <button class="btn btn-secondary btn-sm" onclick="prevSimStep()" ${State.currentSimStep === 0 ? "disabled style='opacity:0.5;cursor:not-allowed;'" : ""}>
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
            ${isEs ? "Anterior" : "Previous"}
          </button>
          <button class="btn btn-primary btn-sm" onclick="nextSimStep()">
            ${State.currentSimStep === steps.length - 1 ? (isEs ? "Reiniciar Recorrido" : "Restart Walkthrough") : (isEs ? "Siguiente Paso" : "Next Step")}
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <div class="sim-screenshot-wrapper" onclick="openLightbox('${cur.img}', '${isEs ? cur.title_es : cur.title_en}')">
        <img src="${cur.img}" alt="${cur.title_en}" class="sim-screenshot-img" loading="lazy">
        <div class="stage-media-overlay">
          <span class="stage-media-caption">${isEs ? cur.title_es : cur.title_en}</span>
          <span class="stage-zoom-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            ${isEs ? "Ampliar captura" : "Zoom screenshot"}
          </span>
        </div>
      </div>
    </div>
  `;
}

function nextSimStep() {
  State.currentSimStep = (State.currentSimStep + 1) % PB_DATA.simSteps.length;
  renderSimulator();
}

function prevSimStep() {
  if (State.currentSimStep > 0) {
    State.currentSimStep--;
    renderSimulator();
  }
}

// ------------------------------------------
// Richmond AI Suite
// ------------------------------------------
function renderRichmondAI() {
  const container = document.getElementById("ai-grid-container");
  if (!container) return;

  const isEs = State.lang === "es";

  container.innerHTML = PB_DATA.aiSuite.map(tool => `
    <div class="ai-card">
      <div class="ai-card-media" onclick="openLightbox('${tool.img}', '${isEs ? tool.title_es : tool.title_en}')">
        <img src="${tool.img}" alt="${tool.title_en}" class="ai-card-img" loading="lazy">
        <span class="ai-badge">${tool.badge}</span>
      </div>
      <div class="ai-card-body">
        <h4>${isEs ? tool.title_es : tool.title_en}</h4>
        <p>${isEs ? tool.desc_es : tool.desc_en}</p>
        <div style="margin-top:auto; padding-top:1rem; border-top:1px solid var(--border-subtle); font-size:0.85rem; color:var(--purple-accent);">
          <strong>${isEs ? "Impacto Docente:" : "Teacher Impact:"}</strong> ${isEs ? tool.feature_es : tool.feature_en}
        </div>
      </div>
    </div>
  `).join("");
}

// ------------------------------------------
// Pacing Calculator
// ------------------------------------------
function initPacingCalculator() {
  const slider = document.getElementById("pacing-slider");
  const editionBtns = document.querySelectorAll("[data-pacing-edition]");

  if (slider) {
    slider.addEventListener("input", (e) => {
      State.pacingHours = parseInt(e.target.value);
      updatePacingCalculation();
    });
  }

  editionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      editionBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      State.pacingEdition = btn.getAttribute("data-pacing-edition");
      updatePacingCalculation();
    });
  });

  updatePacingCalculation();
}

function updatePacingCalculation() {
  const sliderVal = document.getElementById("pacing-hours-val");
  const totalWeeksEl = document.getElementById("pacing-total-weeks");
  const totalHoursEl = document.getElementById("pacing-total-hours");
  const pacingTimelineEl = document.getElementById("pacing-timeline-steps");

  if (!sliderVal || !totalWeeksEl || !totalHoursEl || !pacingTimelineEl) return;

  const isEs = State.lang === "es";
  const hoursPerWeek = State.pacingHours;
  sliderVal.textContent = `${hoursPerWeek} hrs`;

  const totalCourseHours = State.pacingEdition === "full" ? 96 : 48;
  const calculatedWeeks = Math.ceil(totalCourseHours / hoursPerWeek);

  totalWeeksEl.textContent = calculatedWeeks;
  totalHoursEl.textContent = `${totalCourseHours}h`;

  const midPointWeek = Math.floor(calculatedWeeks / 2);

  pacingTimelineEl.innerHTML = `
    <div class="timeline-step">
      <span>${isEs ? "Inicio & Diagnóstico Best Start" : "Kick-off & Best Start Diagnostic"}</span>
      <span class="timeline-tag">${isEs ? "Semana 1" : "Week 1"}</span>
    </div>
    <div class="timeline-step">
      <span>${isEs ? "Mid-Term Review & Exam Jam Prep" : "Mid-Term Review & Exam Jam Prep"}</span>
      <span class="timeline-tag">${isEs ? `Semana ${midPointWeek}` : `Week ${midPointWeek}`}</span>
    </div>
    <div class="timeline-step">
      <span>${isEs ? "Evaluación de Mediación Final (Best Finish)" : "Final Mediation Assessment (Best Finish)"}</span>
      <span class="timeline-tag">${isEs ? `Semana ${calculatedWeeks - 1}` : `Week ${calculatedWeeks - 1}`}</span>
    </div>
    <div class="timeline-step">
      <span>${isEs ? "Reporte CEFR & Certificación de Curso" : "CEFR Report & Course Completion"}</span>
      <span class="timeline-tag">${isEs ? `Semana ${calculatedWeeks}` : `Week ${calculatedWeeks}`}</span>
    </div>
  `;
}

// ------------------------------------------
// Universal Lightbox Modal
// ------------------------------------------
function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeLightbox();
    }
  });
}

function openLightbox(src, caption) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!modal || !img || !cap) return;

  img.src = src;
  cap.textContent = caption || "";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Mobile Menu
function initMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.style.display === "flex";
    menu.style.display = isOpen ? "none" : "flex";
    if (!isOpen) {
      menu.style.flexDirection = "column";
      menu.style.position = "absolute";
      menu.style.top = "72px";
      menu.style.left = "0";
      menu.style.right = "0";
      menu.style.background = "rgba(6, 9, 19, 0.98)";
      menu.style.padding = "2rem";
      menu.style.borderBottom = "1px solid var(--border-subtle)";
    }
  });

  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menu.style.display = "none";
      }
    });
  });
}

// ==========================================
// 4. BILINGUAL DICTIONARY (I18N)
// ==========================================
const I18N = {
  es: {
    nav_levels: "Niveles",
    nav_features: "Diferenciadores",
    nav_walkthrough: "Anatomía de Unidad",
    nav_studio: "Richmond Studio",
    nav_simulator: "Inducción Alumnos",
    nav_ai: "Richmond AI",
    nav_authors: "Autores & Metodología",
    nav_pacing: "Pacing",
    nav_demo_btn: "Solicitar Muestra",
    
    hero_eyebrow: "Ecosistema Educativo Richmond Pro",
    hero_title: "Personal Best 2.0 <br><span class='text-gradient'>Deeper Learning.</span> Meaningful Practice.",
    hero_subtitle: "Un ecosistema pedagógico y digital diseñado para transformar el aula de inglés. Práctica intencional en el corazón del aprendizaje, alineación con los ODS de la ONU, mediación CEFR y tecnología Richmond Studio impulsada por IA.",
    hero_btn_explore: "Explorar la Experiencia",
    hero_btn_video: "Ver Video Oficial",
    hero_tag_1: "Marco CEFR A1 a C1",
    hero_tag_2: "Objetivos ONU 2030",
    hero_tag_3: "Voice AI Speech Recognition",
    hero_badge_float_1: "Autores de Clase Mundial",
    hero_badge_float_2: "Herramientas de IA Docente",
    
    nn_title: "Non-Negotiables de Inducción:",
    nn_1: "Capacitación de Serie",
    nn_2: "Capacitación de Plataforma",
    nn_3: "Pacing & Planning de Estructura",
    nn_4: "ODS y Aprendizaje Basado en Proyectos",
    nn_5: "Mediación en el Aula",
    
    levels_eyebrow: "Serie Completa A1 - C1",
    levels_title: "6 Niveles Adaptados a Cada Etapa",
    levels_desc: "Desde principiantes absolutos hasta estudiantes avanzados. Cada nivel cuenta con Student's Book, Workbook, Teacher's iSolutions y suite digital completa en Richmond Studio.",
    
    feat_eyebrow: "Propuesta de Valor Única",
    feat_title: "¿Por Qué Personal Best 2.0 es Diferente?",
    feat_desc: "Cinco pilares pedagógicos que superan los métodos tradicionales de enseñanza del inglés y preparan al estudiante para el mundo global.",
    
    feat_1_title: "Práctica en el Corazón del Aprendizaje",
    feat_1_desc: "Ofrece múltiples oportunidades seguras para experimentar con el idioma. La sección Practice Plus en Teacher's Guides permite jugar con formas y significados, logrando una mayor retención y personalización.",
    
    feat_2_title: "ODS de la ONU y Ciudadanía Global",
    feat_2_desc: "Cada unidad abre con un video de los Objetivos de Desarrollo Sostenible de la ONU. Sensibiliza a los estudiantes sobre problemáticas del mundo real y fomenta su rol como ciudadanos globales activos.",
    
    feat_3_title: "Inglés Internacional Más Allá de UK/USA",
    feat_3_desc: "Exposición a acentos globales auténticos. Las destrezas de Listening y Speaking se presentan mediante Learning Curve y Talking Zone, shows web conducidos por un equipo internacional de presentadores.",
    
    feat_4_title: "Mediación CEFR en el Centro",
    feat_4_desc: "No solo comunicación: los estudiantes aprenden a actuar como mediadores lingüísticos para transferir, resumir y adaptar información para terceros, una competencia indispensable del MCER.",
    
    feat_5_title: "Mini-Proyectos Colaborativos y Life Skills",
    feat_5_desc: "Tareas en equipo tipo mini-proyecto Best Finish que desarrollan habilidades para la vida y el trabajo profesional: resolución de problemas, creatividad, pensamiento crítico y empatía.",

    walk_eyebrow: "Estructura Pedagógica de la Serie",
    walk_title: "Anatomía Interactiva de una Unidad",
    walk_desc: "Descubre la secuencia paso a paso de cada unidad de Personal Best 2.0: desde la apertura temática hasta el proyecto colaborativo final.",

    eco_eyebrow: "Ecosistema Impreso y de Evaluación",
    eco_title: "Workbook, Writing Practice & Assessment",
    eco_desc: "Materiales complementarios diseñados para reforzar cada aspecto del aprendizaje dentro y fuera del aula.",
    eco_card_1_title: "Workbook & Self-Study",
    eco_card_1_desc: "Una página de práctica por cada lección del Student's Book más una sección Review and Practice para repasar el contenido de toda la unidad.",
    eco_card_2_title: "Writing Practice Dedicado",
    eco_card_2_desc: "6 páginas completas por nivel dedicadas a desarrollar destrezas de redacción por géneros (notas, artículos, narrativa, coherencia y conectores).",
    eco_card_3_title: "Evaluación Continua",
    eco_card_3_desc: "Evaluaciones guiadas por el profesor y autoevaluación continua. Pruebas imprimibles y digitales personalizables con Test Manager.",
    eco_card_4_title: "Exam Practice & Exam Jam",
    eco_card_4_desc: "Práctica orientada a exámenes oficiales internacionales (Cambridge, TOEFL, TOEIC) integrada de forma natural en el itinerario.",

    studio_eyebrow: "Hub Digital Todo-en-Uno",
    studio_title: "Richmond Studio: La Plataforma Central",
    studio_desc: "Un entorno digital unificado para la gestión de clase, seguimiento en tiempo real, práctica con reconocimiento de voz y herramientas docentes interactivas.",

    sim_eyebrow: "Paso a Paso",
    sim_title: "Guía de Activación e Inducción de Alumnos",
    sim_desc: "Conoce el flujo exacto que siguen tus alumnos desde el primer día para registrarse, activar su libro y unirse a tu clase en Richmond Studio.",

    ai_eyebrow: "Inteligencia Artificial para Educadores",
    ai_title: "Richmond AI: Superpoderes para el Docente",
    ai_desc: "Herramientas de última generación basadas en IA que automatizan diagnósticos, verifican niveles de complejidad y generan actividades dinámicas a partir de videos.",

    pacing_eyebrow: "Planificación Académica",
    pacing_title: "Calculadora de Pacing & Estructura",
    pacing_desc: "Ajusta la intensidad horaria semanal y el tipo de edición para visualizar el cronograma sugerido de avance, exámenes y entregas de mediación.",
    pacing_hours_lbl: "Horas de clase por semana:",
    pacing_edition_lbl: "Modalidad de Edición:",
    pacing_metric_weeks: "Semanas Estimadas",
    pacing_metric_hours: "Horas de Contacto",

    auth_eyebrow: "Pedagogía Respaldada",
    auth_title: "Autores de Renombre y Metodología",
    auth_desc: "Creado por dos de las figuras más influyentes de la enseñanza del idioma inglés a nivel mundial.",
    auth_1_role: "Referente Mundial en Metodología & Visual Grammar",
    auth_1_bio: "Autor legendario de títulos como 'Classroom Management Techniques' y 'Visual Grammar'. Diseñó la estructura de lecciones claras, dinámicas y centradas en el estudiante de Personal Best 2.0.",
    auth_2_role: "Experto en Pronunciación & Creador del IPA Interactivo",
    auth_2_bio: "Creador del Cuadro Fonémico Interactivo (IPA Chart). Desarrolló el syllabus de connected speech de Personal Best 2.0, enfocándose en ritmo, elisión y habla natural.",

    tbl_title: "Principios de Task-Based Learning (TBL):",
    tbl_1: "La tarea debe ser relevante y significativa para el estudiante.",
    tbl_2: "El foco principal está en el significado y la comprensión.",
    tbl_3: "Los estudiantes aprenden interactuando de forma activa.",
    tbl_4: "Los errores son parte natural e indispensable del proceso.",
    tbl_5: "Prioridad al proceso comunicativo más que al producto final.",
    tbl_6: "La participación y resolución de tareas genera motivación intrínseca.",

    med_title: "Las 3 Dimensiones de la Mediación CEFR:",
    med_1_title: "Mediación Textual",
    med_1_desc: "Resumir, parafrasear, traducir o explicar textos escritos y orales para que sean comprensibles para otros. Tomar notas y expresar respuestas personales.",
    med_2_title: "Mediación Conceptual",
    med_2_desc: "Facilitar la comprensión de ideas y conceptos complejos a través de discusiones colaborativas, resolución de problemas y debates guiados.",
    med_3_title: "Mediación Comunicativa",
    med_3_desc: "Gestionar interacciones delicadas o interculturales, asegurando una comunicación empática y eficaz en contextos pluriculturales.",

    video_eyebrow: "Presentación Oficial",
    video_title: "Descubre Personal Best 2.0 en Acción",
    video_desc: "Observa el video de bienvenida institucional de la serie y visualiza el impacto que generará en tu comunidad educativa.",

    cta_eyebrow: "Siguiente Paso",
    cta_title: "¿Listo para Elevar el Nivel de tu Institución?",
    cta_desc: "Agenda una sesión de inducción personalizada, solicita muestras físicas o digitales de los libros y conoce cómo implementar Personal Best 2.0 en tu programa.",
    cta_btn_demo: "Agendar Demo Académica",
    cta_btn_whatsapp: "Conversar por WhatsApp",
    cta_btn_email: "Escribir a Soporte Richmond"
  },

  en: {
    nav_levels: "Levels",
    nav_features: "Differentiators",
    nav_walkthrough: "Unit Anatomy",
    nav_studio: "Richmond Studio",
    nav_simulator: "Student Onboarding",
    nav_ai: "Richmond AI",
    nav_authors: "Authors & Methodology",
    nav_pacing: "Pacing",
    nav_demo_btn: "Request Sample",

    hero_eyebrow: "Richmond Pro Educational Ecosystem",
    hero_title: "Personal Best 2.0 <br><span class='text-gradient'>Deeper Learning.</span> Meaningful Practice.",
    hero_subtitle: "A pedagogical and digital ecosystem built to transform the English classroom. Intentional practice at the heart of learning, UN SDG alignment, CEFR mediation, and AI-powered Richmond Studio platform.",
    hero_btn_explore: "Explore the Experience",
    hero_btn_video: "Watch Official Video",
    hero_tag_1: "CEFR Framework A1 to C1",
    hero_tag_2: "UN 2030 Global Goals",
    hero_tag_3: "Voice AI Speech Recognition",
    hero_badge_float_1: "World-Class Authors",
    hero_badge_float_2: "Teacher AI Superpowers",

    nn_title: "Onboarding Non-Negotiables:",
    nn_1: "Course Induction",
    nn_2: "Platform Training",
    nn_3: "Pacing & Planning Structure",
    nn_4: "SDGs & Project-Based Learning",
    nn_5: "Mediation in Action",

    levels_eyebrow: "Full Series A1 - C1",
    levels_title: "6 Tailored Levels for Every Stage",
    levels_desc: "From true beginners to advanced students. Every level includes Student's Book, Workbook, Teacher's iSolutions, and full digital suite on Richmond Studio.",

    feat_eyebrow: "Core Differentiators",
    feat_title: "Why is Personal Best 2.0 Different?",
    feat_desc: "Five pedagogical pillars that transcend traditional ELT methodologies, preparing students for the real international world.",

    feat_1_title: "Practice at the Heart of Learning",
    feat_1_desc: "Provides plenty of safe opportunities to try out new language. The Practice Plus feature in Teacher's Guides allows learners to experiment with forms and meanings for deeper retention.",

    feat_2_title: "UN SDGs & Global Citizenship",
    feat_2_desc: "Every unit opens with a video linked to one of the UN Sustainable Development Goals, fostering awareness of global issues and inspiring active global citizenship.",

    feat_3_title: "International English Beyond UK/USA",
    feat_3_desc: "Authentic exposure to global accents. Listening and speaking skills are delivered via Learning Curve and Talking Zone, web shows presented by an international transatlantic team.",

    feat_4_title: "CEFR Mediation at the Core",
    feat_4_desc: "More than simple communication: learners practice acting as language mediators to transfer, summarize, and adapt information for others—a crucial CEFR competency.",

    feat_5_title: "Collaborative Mini-Projects & Life Skills",
    feat_5_desc: "Best Finish collaborative team tasks develop 21st-century life and workplace skills: creative problem-solving, critical thinking, teamwork, and empathy.",

    walk_eyebrow: "Pedagogical Unit Structure",
    walk_title: "Interactive Unit Anatomy",
    walk_desc: "Walk through the exact lesson sequence of Personal Best 2.0: from the thematic opening video to the final collaborative project.",

    eco_eyebrow: "Print & Assessment Ecosystem",
    eco_title: "Workbook, Writing Practice & Assessment",
    eco_desc: "Supplementary course materials engineered to reinforce learning both inside and outside the classroom.",
    eco_card_1_title: "Workbook & Self-Study",
    eco_card_1_desc: "A dedicated practice page for every Student's Book lesson plus a comprehensive Review and Practice spread for whole-unit consolidation.",
    eco_card_2_title: "Dedicated Writing Practice",
    eco_card_2_desc: "6 full pages per level focused on genre-based writing skills (notes, narrative, articles, text cohesion, and connectors).",
    eco_card_3_title: "Continuous Assessment",
    eco_card_3_desc: "Teacher-led and self-assessment routines. Printable and customizable digital test suites generated with Test Manager.",
    eco_card_4_title: "Exam Practice & Exam Jam",
    eco_card_4_desc: "Certification-oriented practice (Cambridge, TOEFL, TOEIC) seamlessly integrated throughout each level's learning path.",

    studio_eyebrow: "All-in-One Digital Hub",
    studio_title: "Richmond Studio: The Central Platform",
    studio_desc: "A unified digital environment for classroom management, real-time analytics, voice-recognition quizzes, and interactive whiteboard teaching tools.",

    sim_eyebrow: "Step-by-Step Walkthrough",
    sim_title: "Student Onboarding & Activation Guide",
    sim_desc: "Walk through the exact onboarding journey students follow from day one to register, activate their book code, and enroll in your Richmond Studio class.",

    ai_eyebrow: "Artificial Intelligence for Educators",
    ai_title: "Richmond AI: Superpowers for Teachers",
    ai_desc: "Cutting-edge AI tools that automate diagnostics, verify linguistic complexity, and generate dynamic classroom activities from authentic videos.",

    pacing_eyebrow: "Academic Planning",
    pacing_title: "Pacing & Planning Calculator",
    pacing_desc: "Adjust weekly contact hours and course edition to visualize the recommended timeline for units, exams, and mediation milestones.",
    pacing_hours_lbl: "Class hours per week:",
    pacing_edition_lbl: "Edition Mode:",
    pacing_metric_weeks: "Estimated Weeks",
    pacing_metric_hours: "Total Contact Hours",

    auth_eyebrow: "World-Class Pedagogy",
    auth_title: "Renowned Authors & Methodology",
    auth_desc: "Authored by two of the most celebrated figures in global English Language Teaching.",
    auth_1_role: "Global Methodology & Visual Grammar Authority",
    auth_1_bio: "Legendary author of 'Classroom Management Techniques' and 'Visual Grammar'. Designed the clear, student-centered lesson architecture of Personal Best 2.0.",
    auth_2_role: "Pronunciation Mastermind & IPA Chart Creator",
    auth_2_bio: "Creator of the Interactive Phonemic Chart (IPA Chart). Developed the connected speech syllabus of Personal Best 2.0, focusing on natural rhythm, elision, and intonation.",

    tbl_title: "Task-Based Learning (TBL) Core Principles:",
    tbl_1: "The task must be meaningful and relevant to the student.",
    tbl_2: "Primary focus remains on meaning and comprehension.",
    tbl_3: "Students learn language actively through interaction.",
    tbl_4: "Errors are an indispensable, natural part of the learning cycle.",
    tbl_5: "Prioritizes the communicative process over a polished product.",
    tbl_6: "Active task completion generates intrinsic motivation.",

    med_title: "The 3 Dimensions of CEFR Mediation:",
    med_1_title: "Textual Mediation",
    med_1_desc: "Summarizing, translating, or explaining written or spoken texts to make them accessible for others. Taking notes and articulating personal responses.",
    med_2_title: "Conceptual Mediation",
    med_2_desc: "Facilitating understanding of complex ideas through collaborative discussions, problem solving, and guided debates.",
    med_3_title: "Communication Mediation",
    med_3_desc: "Managing delicate or pluricultural interactions, ensuring empathetic and effective cross-cultural communication.",

    video_eyebrow: "Official Showcase",
    video_title: "Experience Personal Best 2.0 in Motion",
    video_desc: "Watch the official animated welcome clip of the series and visualize the positive transformation it will bring to your school.",

    cta_eyebrow: "Next Steps",
    cta_title: "Ready to Elevate Your Academic Program?",
    cta_desc: "Schedule a personalized institutional demo, request physical or digital evaluation samples, and discover how to deploy Personal Best 2.0 successfully.",
    cta_btn_demo: "Schedule Academic Demo",
    cta_btn_whatsapp: "Chat on WhatsApp",
    cta_btn_email: "Contact Richmond Support"
  }
};
