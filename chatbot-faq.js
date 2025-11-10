const faqData = {
    es: [
        // --- Preguntas Generales JóvenesSTEM ---
        {
            keywords: ['jovenes', 'stem', 'que es', 'proyecto', 'acerca', 'sobre', 'resumen', 'sirve', 'info', 'informacion'],
            answer: 'JóvenesSTEM es una certificación educativa diseñada por Alberto Yépiz para fomentar el interés en carreras de Ciencia, Tecnología, Ingeniería y Matemáticas (STEM). Utiliza un método de enseñanza divulgativo (fácil de entender) basado en el libro \'BlueBookv1\' para hacer la ciencia accesible y práctica. El objetivo es inspirar a la próxima generación de innovadores y apoyar el desarrollo sostenible.'
        },
        {
            keywords: ['mision', 'origen', 'proposito', 'porque', 'creo', 'visión', 'meta', 'objetivo'],
            answer: 'La **Misión** es apoyar el camino de la sociedad hacia la sustentabilidad mediante el conocimiento. La **Visión** es ser un proyecto reconocido internacionalmente. Se creó para combatir la falta de interés en ciencias \'duras\' (como física o matemáticas) y hacer que la tecnología compleja sea entendible, para que más jóvenes elijan carreras STEM.'
        },
        {
            keywords: ['costo', 'cuesta', 'precio', 'gratis', 'cuanto vale'],
            answer: 'El material del curso, incluyendo el libro digital BlueBook v1, es **totalmente gratuito**. Es una iniciativa sin fines de lucro. El único costo que *podría* existir es si una institución o persona solicita la impresión y entrega de certificados físicos o materiales adicionales.'
        },
        {
            keywords: ['sin fines de lucro', 'negocio', 'modelo de negocio', 'ingresos'],
            answer: 'Es una iniciativa concebida para ser auto-replicable y sin fines de lucro. El plan de negocio indica que los únicos ingresos planeados serían por gratificaciones de instituciones, no por la venta del curso a los estudiantes.'
        },
        {
            keywords: ['publico', 'para quien', 'quien', 'edades', 'segmento', 'nivel'],
            answer: 'El público principal son jóvenes de secundaria y preparatoria (idealmente entre 10 y 19 años) que están en etapa de definición vocacional. El nivel es intermedio. Sin embargo, el contenido también es valioso para adultos como un curso de actualización tecnológica.'
        },
        {
            keywords: ['autor', 'creador', 'fundador', 'quien es alberto yepiz'],
            answer: 'El autor del libro BlueBook y creador del programa es Alberto Yépiz, un profesional sonorense con amplia experiencia en tecnología, habiendo colaborado con empresas como Apple, PepsiCo, AVIS y Santillana.'
        },
        {
            keywords: ['competencia', 'diferencia otros cursos', 'que lo hace unico'],
            answer: 'La ventaja competitiva es el método de enseñanza divulgativo (fácil de entender) y la estructura única del curso (Ciencia -> Tecnología -> Programación). A diferencia de editoriales tradicionales que pueden ser costosas y "aburridas", JóvenesSTEM es gratuito y se enfoca en temas de alto impacto para inspirar.'
        },
        {
            keywords: ['metodo', 'metodologia', 'siip', 'siip nextgen', 'patente'],
            answer: 'El programa utiliza un método innovador llamado **SIIP NextGen** (STEM Intervention for Innovation Program for Next Generations), creado por Alberto Yépiz. Este método tiene una patente en trámite.'
        },

        // --- Preguntas sobre el Contenido (BlueBook) ---
        {
            keywords: ['bluebook', 'libro', 'leer', 'descargar', 'texto base'],
            answer: 'El BlueBook v1 es el libro escrito por Alberto Yépiz que sirve como base para todo el curso (173 páginas de contenido). Está disponible totalmente GRATIS en la sección de enlaces principales. Solo haz click en "📚 Mi libro BlueBook v1 gratis!" para acceder a la versión digital completa.'
        },
        {
            keywords: ['bluebookv2', 'futuro', 'libro 2', 'actualizacion'],
            answer: 'Sí, hay planes para un "BlueBookv2" alrededor de 2027. Esta nueva versión incluirá una guía para el maestro, un Test tecnificado y nuevos apartados como "Maravillas de la Electricidad", "Isotopos fusionables" y "Efectos cuánticos".'
        },
        {
            keywords: ['temas', 'aprender', 'contenido', 'unidades', 'capitulos'],
            answer: 'El curso se divide en 3 unidades (capítulos) principales: **Unidad 1 (Ciencia)**: Fundamentos del universo, materia y física. **Unidad 2 (Tecnología)**: Cómo funcionan los aparatos modernos (5G, WiFi, pantallas, CPU). **Unidad 3 (Programación)**: Lógica de código, web (front/back) e IA.'
        },
        {
            keywords: ['capitulo 1', 'ciencia', 'big bang', 'universo', 'materia', 'fisica'],
            answer: 'El Capítulo 1 (Ciencia) cubre los fundamentos. Aprenderás sobre el Big Bang, la cronología cosmológica, qué es el espacio-tiempo (relatividad), la gravedad, la estructura de la materia (átomos, partículas), la luz (espectro electromagnético) y la materia/energía oscura.'
        },
        {
            keywords: ['capitulo 2', 'tecnologia', '5g', 'wifi', 'oled', 'procesador', 'bateria', 'redes', 'pantallas'],
            answer: 'El Capítulo 2 (Tecnología) explica cómo funcionan las cosas que usamos. Cubre redes (Evolución 1G a 5G, WiFi 6, Bluetooth), tecnologías de pantallas (LCD, OLED, microLED), óptica y sensores de cámaras (CCD/CMOS), procesadores (CPU), memoria (DDR/GDDR), almacenamiento (SSD vs HDD) y baterías (ion-litio).'
        },
        {
            keywords: ['capitulo 3', 'programacion', 'codigo', 'front-end', 'back-end', 'ai', 'ml', 'algoritmos'],
            answer: 'El Capítulo 3 (Programación) es "el idioma de la tecnología." Te introduce a los fundamentos (lógica, algoritmos, paradigmas), la estructura del desarrollo web (cliente-servidor, HTML/CSS/JS, front-end, back-end), APIs, bases de datos, y un panorama de Inteligencia Artificial (AI) y Machine Learning (ML).'
        },

        // --- Preguntas sobre los Formatos del Curso (Online vs FastTrack) ---
        {
            keywords: ['horas', 'duracion', 'cuanto dura', 'tiempo', 'diferencia cursos'],
            answer: '¡Depende de la versión! El **Curso en Línea** completo es de **90 horas** (40h de Ciencia, 30h de Tecnología, 20h de Programación). La versión **Intensiva (FastTrack)** para instituciones es de **20 horas** (5 sesiones de 4 horas).'
        },
        {
            keywords: ['curso en linea', 'online', '90 horas', 'ritmo', 'plataforma'],
            answer: 'Es la versión completa de 90 horas diseñada para individuos. Se puede tomar en plataformas digitales (como Coursera, Udemy, etc.). Está planeado para un ritmo flexible, como 2 horas por semana (semestral) o 1 hora por semana (anual).'
        },
        {
            keywords: ['fasttrack', 'fast track', 'intensivo', '20 horas', 'sesiones'],
            answer: 'Es una guía de implementación **intensiva de 20 horas** diseñada para instituciones (escuelas, gobierno). Se divide en 5 sesiones de 4 horas cada una. Cubre el contenido clave de los tres capítulos de forma concentrada y teórica, sin prácticas de laboratorio.'
        },
        {
            keywords: ['que se ve en el fasttrack', 'contenido fasttrack', 'sesion 1', 'sesion 2', 'sesion 3', 'sesion 4', 'sesion 5'],
            answer: 'El FastTrack de 20 horas se divide en 5 sesiones: **Sesión 1:** Capítulo I (Ciencia). **Sesión 2:** Capítulo II (Tecnología). **Sesión 3:** Capítulo III (Programación). **Sesión 4:** Integración (Ciudades Inteligentes, IoT, Ética, Mercado Laboral). **Sesión 5:** Evaluación, Retroalimentación y Ceremonia.'
        },
        {
            keywords: ['para quien es fasttrack', 'quien toma el fasttrack'],
            answer: 'El FastTrack está diseñado para ser *implementado por instructores* en instituciones, como escuelas públicas o privadas. No es un curso que un individuo toma solo, sino un programa grupal intensivo.'
        },

        // --- Preguntas sobre Certificación y Evaluación ---
        {
            keywords: ['certificado', 'certificacion', 'validez', 'constancia', 'diploma'],
            answer: 'Sí, al finalizar el curso y aprobar las evaluaciones se otorga una constancia o certificado como "jóvenSTEM". Se recomienda que la institución que lo imparte agregue su sello institucional.'
        },
        {
            keywords: ['estandares', 'sep', 'conocer', 'ngss', 'oficial', 'alineado'], // <-- ¡PALABRA AGREGADA!
            answer: 'El programa está alineado con los Estándares de Competencia (EC) del marco CONOCER (SEP México) y con los Next Generation Science Standards (NGSS) de Estados Unidos, garantizando su pertinencia educativa.'
        },
        {
            keywords: ['evaluacion', 'aprobar', 'calificacion', 'examen', 'test'],
            answer: 'Para aprobar, se requiere un **80% o más** en la calificación final. La evaluación se basa en las "actividades integradoras" (tareas) obligatorias, como ensayos, resúmenes y un mapa conceptual. En el curso en línea, es un cuestionario por unidad (80% para pasar).'
        },
        {
            keywords: ['tareas', 'ensayos', 'que tengo que hacer', 'actividad integradora'],
            answer: 'Sí, hay tareas obligatorias para evaluar. Por ejemplo, después del Cap 1 hay un ensayo de 800-1000 palabras. Después del Cap 2, un resumen de 1000-1500 palabras sobre una tecnología. Después del Cap 3, un ensayo de reflexión. Al final, un mapa conceptual.'
        },
        {
            keywords: ['test l1', 'badge', 'insignia', 'nivel 1', 'prueba'],
            answer: 'Es una evaluación basada en el **Capítulo 1 (Ciencia)** del BlueBook v1. Si obtienes más del 80% de respuestas correctas, serás candidato para recibir tu primer badge L1 (Nivel 1) de JóvenesSTEM 🏅 ¡Demuestra tu conocimiento!'
        },

        // --- Preguntas sobre Implementación (Instituciones) ---
        {
            keywords: ['instituciones', 'alianzas', 'escuela', 'gobierno', 'implementar', 'propuesta'],
            answer: 'El programa está diseñado para colaborar con instituciones educativas (públicas y privadas) y gobierno (como HermosilloGob y CoECyT). Si eres una institución, puedes revisar la "Propuesta JóvenesSTEM FastTrack^" en la página principal o contactar a Alberto por WhatsApp.'
        },
        {
            keywords: ['instructor', 'maestro', 'quien da el curso'],
            answer: 'El "FastTrack HMO v1" es una *guía de implementación* para que un instructor (maestro) pueda impartir el curso. El documento le da la estructura pedagógica, tiempos, contenidos y actividades para cada sesión.'
        },
        {
            keywords: ['materiales', 'diapositivas', 'pptx'],
            answer: 'La guía de implementación sugiere que el instructor prepare diapositivas (ej. 25 por sesión) con esquemas visuales y poco texto. Se menciona que se proporcionarán en formato editable .pptx.'
        },

        // --- Preguntas sobre los otros negocios (Preservadas y Mejoradas) ---
        {
            keywords: ['contacto', 'whatsapp', 'comunicar', 'hablar', 'mensaje', 'escribir', 'telefono'],
            answer: 'Claro, puedes contactar a Alberto Yépiz directamente por WhatsApp. Solo haz click en el botón "👋 WhatsApp - Click Aqui!" en la página principal. También está disponible en LinkedIn, Instagram y GitHub.'
        },
        {
            keywords: ['podcast', 'audio', 'escuchar', 'spotify'],
            answer: 'Los podcasts de Alberto Yépiz están disponibles en Spotify. Hablan de tecnología, ciencia y desarrollo. Haz click en "🎙️ Escucha mis Podcasts" en la página principal para acceder a todos los episodios.'
        },
        {
            keywords: ['bose', 'equipo', 'audio', 'renta', 'sonido', 'hidef', 'party', 'fiestas', 'dj'],
            answer: 'HiDef Parties es el servicio de renta de equipo de audio Bose profesional de Alberto. Es perfecto para eventos, fiestas y presentaciones que requieran sonido de alta fidelidad. Visita @hidefparties en Instagram o usa el enlace "🔊 Renta equipo Bose aquí!"'
        },
        {
            keywords: ['experiencia', 'trabajo', 'apple', 'carrera', 'profesional', 'cv', 'background'],
            answer: 'Alberto tiene una amplia carrera en tecnología. Cuenta con más de 15 años de experiencia en Apple, además de haber trabajado con empresas de talla mundial como PepsiCo, Avis y Santillana-Richmond. Es MBA y experto en UX/Agile, EdTech y Customer Experience.'
        },
        {
            keywords: ['radio', 'musica', 'playlist', 'canciones', 'música', 'reproductor'],
            answer: 'Es el reproductor de música integrado en la página con una playlist curada de las canciones favoritas de Alberto. Incluye un ecualizador optimizado para disfrutar cada track al máximo 🎵 ¡Sube el volumen!'
        },
        {
            keywords: ['hola', 'buenos', 'dias', 'tardes', 'saludos', 'ayuda'],
            answer: '¡Hola! 👋 ¿En qué puedo ayudarte hoy? Pregúntame sobre JóvenesSTEM, el BlueBook, las 90 horas del curso en línea, las 20 horas del FastTrack, contacto, o cualquier cosa relacionada con Alberto Yépiz.'
        }
    ],
    en: [
        // --- General JóvenesSTEM Questions ---
        {
            keywords: ['young', 'stem', 'what', 'project', 'about', 'summary', 'purpose', 'info', 'information'],
            answer: 'JóvenesSTEM is an educational certification designed by Alberto Yépiz to foster interest in Science, Technology, Engineering, and Math (STEM) careers. It uses a discursive teaching method (easy to understand) based on the \'BlueBookv1\' book to make science accessible and practical. The goal is to inspire the next generation of innovators and support sustainable development.'
        },
        {
            keywords: ['mission', 'origin', 'why', 'vision', 'goal', 'objective', 'created'],
            answer: 'The **Mission** is to support society\'s path toward sustainability through knowledge. The **Vision** is to be an internationally recognized project. It was created to combat the lack of interest in \'hard\' sciences (like physics or math) and make complex technology understandable, encouraging more young people to choose STEM careers.'
        },
        {
            keywords: ['cost', 'price', 'how much', 'free', 'value'],
            answer: 'The course material, including the BlueBook v1 digital book, is **completely free**. It is a non-profit initiative. The only cost that *might* exist is if an institution or individual requests the printing and delivery of physical certificates or additional materials.'
        },
        {
            keywords: ['non-profit', 'nonprofit', 'business model', 'revenue', 'income'],
            answer: 'It is an initiative conceived to be self-replicating and non-profit. The business plan states that the only planned income would be from gratifications from institutions, not from selling the course to students.'
        },
        {
            keywords: ['audience', 'target', 'who', 'ages', 'for whom', 'level', 'segment'],
            answer: 'The primary audience is middle and high school students (ideally between 10 and 19 years old) who are in the vocational definition stage. The level is intermediate. However, the content is also valuable for adults as a technology update course.'
        },
        {
            keywords: ['author', 'creator', 'founder', 'who is alberto yepiz'],
            answer: 'The author of the BlueBook and creator of the program is Alberto Yépiz, a professional from Sonora with extensive experience in technology, having collaborated with companies like Apple, PepsiCo, AVIS, and Santillana.'
        },
        {
            keywords: ['competition', 'difference', 'other courses', 'what makes it unique'],
            answer: 'The competitive advantage is the discursive teaching method (easy to understand) and the unique structure of the course (Science -> Technology -> Programming). Unlike traditional publishers, which can be expensive and "boring", JóvenesSTEM is free and focuses on high-impact topics to inspire.'
        },
        {
            keywords: ['method', 'methodology', 'siip', 'siip nextgen', 'patent'],
            answer: 'The program uses an innovative method called **SIIP NextGen** (STEM Intervention for Innovation Program for Next Generations), created by Alberto Yépiz. This method is (patent pending).'
        },

        // --- Content Questions (BlueBook) ---
        {
            keywords: ['bluebook', 'book', 'read', 'download', 'textbook', 'base text'],
            answer: 'The BlueBook v1 is the book written by Alberto Yépiz that serves as the basis for the entire course (173 pages of content). It is available completely FREE in the main links section. Just click on "📚 Mi libro BlueBook v1 gratis!" to access the complete digital version.'
        },
        {
            keywords: ['bluebookv2', 'future', 'book 2', 'update', 'version 2'],
            answer: 'Yes, there are plans for a "BlueBookv2" around 2027. This new version will include a teacher\'s guide, a technical Test, and new sections like "Wonders of Electricity," "Fusionable Isotopes," and "Quantum Atomic Effects."'
        },
        {
            keywords: ['topics', 'learn', 'content', 'units', 'chapters', 'syllabus'],
            answer: 'The course is divided into 3 main units (chapters): **Unit 1 (Science)**: Fundamentals of the universe, matter, and physics. **Unit 2 (Technology)**: How modern devices work (5G, WiFi, screens, CPU). **Unit 3 (Programming)**: Logic of code, web (front/back), and AI.'
        },
        {
            keywords: ['chapter 1', 'science', 'big bang', 'universe', 'matter', 'physics'],
            answer: 'Chapter 1 (Science) covers the fundamentals. You will learn about the Big Bang, cosmological chronology, what space-time is (relativity), gravity, the structure of matter (atoms, particles), light (electromagnetic spectrum), and dark matter/energy.'
        },
        {
            keywords: ['chapter 2', 'technology', '5g', 'wifi', 'oled', 'processor', 'battery', 'networks', 'screens'],
            answer: 'Chapter 2 (Technology) explains how the things we use work. It covers networks (Evolution 1G to 5G, WiFi 6, Bluetooth), display technologies (LCD, OLED, microLED), optics and camera sensors (CCD/CMOS), processors (CPU), memory (DDR/GDDR), storage (SSD vs HDD), and batteries (lithium-ion).'
        },
        {
            keywords: ['chapter 3', 'programming', 'code', 'front-end', 'back-end', 'ai', 'ml', 'algorithms'],
            answer: 'Chapter 3 (Programming) is "the language of technology." It introduces you to the fundamentals (logic, algorithms, paradigms), the structure of web development (client-server, HTML/CSS/JS, front-end, back-end), APIs, databases, and an overview of Artificial Intelligence (AI) and Machine Learning (ML).'
        },

        // --- Course Format Questions (Online vs FastTrack) ---
        {
            keywords: ['hours', 'duration', 'how long', 'time', 'difference courses', 'formats'],
            answer: 'It depends on the version! The complete **Online Course** is **90 hours** (40h of Science, 30h of Technology, 20h of Programming). The **Intensive (FastTrack)** version for institutions is **20 hours** (5 sessions of 4 hours).'
        },
        {
            keywords: ['online course', 'online', '90 hours', 'pace', 'platform'],
            answer: 'This is the full 90-hour version designed for individuals. It can be taken on digital platforms (like Coursera, Udemy, etc.). It is planned for a flexible pace, such as 2 hours per week (semester) or 1 hour per week (annual).'
        },
        {
            keywords: ['fasttrack', 'fast track', 'intensive', '20 hours', 'sessions'],
            answer: 'This is a **20-hour intensive** implementation guide designed for institutions (schools, government). It is divided into 5 sessions of 4 hours each. It covers the key content of the three chapters in a concentrated, theoretical way, with no lab-work.'
        },
        {
            keywords: ['what is in fasttrack', 'fasttrack content', 'session 1', 'session 2', 'session 3', 'session 4', 'session 5'],
            answer: 'The 20-hour FastTrack is divided into 5 sessions: **Session 1:** Chapter I (Science). **Session 2:** Chapter II (Technology). **Session 3:** Chapter III (Programming). **Session 4:** Integration (Smart Cities, IoT, Ethics, Job Market). **Session 5:** Evaluation, Feedback, and Ceremony.'
        },
        {
            keywords: ['who is fasttrack for', 'who takes fasttrack'],
            answer: 'The FastTrack is designed to be *implemented by instructors* in institutions, like public or private schools. It is not a course an individual takes alone, but rather an intensive group program.'
        },

        // --- Certification & Evaluation Questions ---
        {
            keywords: ['certificate', 'certification', 'validity', 'proof', 'diploma'],
            answer: 'Yes, upon finishing the course and passing the evaluations, a "jóvenSTEM" certificate or proof of completion is awarded. It is recommended that the institution teaching it add its institutional seal.'
        },
        {
            keywords: ['standards', 'sep', 'conocer', 'ngss', 'official', 'aligned'],
            answer: 'The program is aligned with the Competency Standards (EC) of the CONOCER framework (SEP Mexico) and the Next Generation Science Standards (NGSS) from the United States, ensuring its educational relevance.'
        },
        {
            keywords: ['evaluation', 'pass', 'grade', 'exam', 'test', 'how to pass'],
            answer: 'To pass, an **80% or higher** on the final grade is required. The evaluation is based on mandatory "integrating activities" (homework), such as essays, summaries, and a concept map. In the online course, it\'s a quiz per unit (80% to pass).'
        },
        {
            keywords: ['homework', 'essays', 'what do i have to do', 'assignments', 'integrating activity'],
            answer: 'Yes, there are mandatory assignments for evaluation. For example, after Ch 1, there is an 800-1000 word essay. After Ch 2, a 1000-1500 word summary of a technology. After Ch 3, a reflective essay. At the end, a concept map.'
        },
        {
            keywords: ['l1 test', 'badge', 'level 1', 'assessment'],
            answer: 'It\'s an assessment based on **Chapter 1 (Science)** of the BlueBook v1. If you get more than 80% correct answers, you\'ll be a candidate to receive your first L1 badge (Level 1) from JóvenesSTEM 🏅 Show your knowledge!'
        },

        // --- Implementation Questions (Institutions) ---
        {
            keywords: ['institutions', 'alliances', 'school', 'government', 'implement', 'proposal', 'partner'],
            answer: 'The program is designed to collaborate with educational institutions (public and private) and government (like HermosilloGob and CoECyT). If you are an institution, you can review the "📄 Propuesta JóvenesSTEM FastTrack^" on the main page or contact Alberto via WhatsApp.'
        },
        {
            keywords: ['instructor', 'teacher', 'who teaches the course'],
            answer: 'The "FastTrack HMO v1" is an *implementation guide* for an instructor (teacher) to be able to teach the course. The document provides the pedagogical structure, timing, content, and activities for each session.'
        },
        {
            keywords: ['materials', 'slides', 'pptx', 'presentations'],
            answer: 'The implementation guide suggests the instructor prepare slides (e.g., 25 per session) with visual diagrams and minimal text. It is mentioned that these will be provided in an editable .pptx format.'
        },

        // --- Other Business Questions (Preserved & Enhanced) ---
        {
            keywords: ['contact', 'whatsapp', 'reach', 'talk', 'message', 'write', 'phone'],
            answer: 'Of course, you can contact Alberto Yépiz directly via WhatsApp. Just click the "👋 WhatsApp - Click Aqui!" button on the main page. He\'s also available on LinkedIn, Instagram, and GitHub.'
        },
        {
            keywords: ['podcast', 'audio', 'listen', 'spotify'],
            answer: 'Alberto Yépiz\'s podcasts are available on Spotify. They cover technology, science, and development. Click on "🎙️ Escucha mis Podcasts" on the main page to access all episodes.'
        },
        {
            keywords: ['bose', 'equipment', 'audio', 'rent', 'sound', 'hidef', 'party', 'parties', 'dj'],
            answer: 'HiDef Parties is Alberto\'s professional Bose audio equipment rental service. It\'s perfect for events, parties, and presentations that require high-fidelity sound. Visit @hidefparties on Instagram or use the link "🔊 Renta equipo Bose aquí!"'
        },
        {
            keywords: ['experience', 'work', 'apple', 'career', 'professional', 'resume', 'cv', 'background'],
            answer: 'Alberto has an extensive career in technology. He has over 15 years of experience at Apple, in addition to working with world-class companies like PepsiCo, Avis, and Santillana-Richmond. He is an MBA and an expert in UX/Agile, EdTech, and Customer Experience.'
        },
        {
            keywords: ['radio', 'music', 'playlist', 'songs', 'player'],
            answer: 'It\'s the integrated music player on the page with a curated playlist of Alberto\'s favorite songs. Includes an optimized equalizer to enjoy each track to the max 🎵 Turn it up!'
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'good', 'help'],
            answer: 'Hello! 👋 How can I help you today? Ask me about JóvenesSTEM, the BlueBook, the 90-hour online course, the 20-hour FastTrack, contact info, or anything related to Alberto Yépiz.'
        }
    ]
};

// --- Detección de Idioma MEJORADA ---
function detectLanguage(text) {
    const lowerText = text.toLowerCase();
    
    // Lista de palabras comunes para identificar el idioma
    // (Se agregaron palabras de función comunes en español como 'el', 'la', 'un', 'es', 'por')
    const spanishWords = ['que', 'como', 'donde', 'hola', 'gracias', 'cuanto', 'cuesta', 'precio', 'implementar', 'es', 'el', 'la', 'un', 'una', 'si', 'por', 'con'];
    const englishWords = ['what', 'how', 'where', 'hello', 'thanks', 'much', 'cost', 'price', 'is', 'the', 'a', 'an', 'by', 'with'];
    
    let spanishScore = 0;
    let englishScore = 0;
    
    spanishWords.forEach(word => {
        if (lowerText.includes(word)) spanishScore += 2; // Damos más peso a estas palabras
    });
    
    englishWords.forEach(word => {
        if (lowerText.includes(word)) englishScore += 2;
    });
    
    // Desempate y verificación de caracteres únicos (ñ, tildes, ¿, ¡)
    if (spanishScore === englishScore) {
        // Si hay empate en la puntuación, los caracteres únicos del español ganan
        return /[áéíóúñ¿¡]/i.test(text) ? 'es' : 'en';
    }
    
    return spanishScore > englishScore ? 'es' : 'en';
}

// Buscar respuesta
function findAnswer(userInput, language) {
    const input = userInput.toLowerCase();
    const faqs = faqData[language];
    
    for (let faq of faqs) {
        for (let keyword of faq.keywords) {
            if (input.includes(keyword)) {
                return faq.answer;
            }
        }
    }
    
    if (language === 'es') {
        return 'Hmm, no estoy seguro de cómo responder a eso. 🤔 Intenta preguntar sobre: JóvenesSTEM, el BlueBook, el test L1, contacto, podcasts, o HiDef Parties. También puedes contactar directamente a Alberto por WhatsApp.';
    } else {
        return 'Hmm, I\'m not sure how to answer that. 🤔 Try asking about: JóvenesSTEM, the BlueBook, L1 test, contact, podcasts, or HiDef Parties. You can also contact Alberto directly via WhatsApp.';
    }
}

// Variables globales
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotOverlay = document.getElementById('chatbotOverlay');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
let messages = [];

// Agregar mensaje
function addMessage(text, type) {
    const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    messages.push({ text, type, time });
    renderMessages();
}

// Renderizar mensajes
function renderMessages() {
    chatbotMessages.innerHTML = '';
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${msg.type}`;
        messageDiv.innerHTML = `
            <div class="chatbot-message-content">
                <p class="chatbot-message-text">${msg.text}</p>
                <p class="chatbot-message-time">${msg.time}</p>
            </div>
        `;
        chatbotMessages.appendChild(messageDiv);
    });
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Mostrar "escribiendo..."
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.innerHTML = '<div class="chatbot-typing">Escribiendo...</div>';
    typingDiv.id = 'typing-indicator';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) typingDiv.remove();
}

// Enviar mensaje
function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatbotInput.value = '';
    
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        const lang = detectLanguage(text);
        const answer = findAnswer(text, lang);
        addMessage(answer, 'bot');
    }, 800);
}

// Event Listeners
chatbotBtn.addEventListener('click', () => {
    chatbotOverlay.classList.add('active');
    if (messages.length === 0) {
        addMessage('¡Hola! 👋 / Hello! 👋\n\nSoy el asistente virtual de yepzhi.com.\nI\'m yepzhi.com\'s virtual assistant.\n\n¿En qué puedo ayudarte? / How can I help you?', 'bot');
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotOverlay.classList.remove('active');
});

chatbotOverlay.addEventListener('click', (e) => {
    if (e.target === chatbotOverlay) {
        chatbotOverlay.classList.remove('active');
    }
});

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});