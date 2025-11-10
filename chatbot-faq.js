// ============================================
// CHATBOT FAQ BILINGÜE
// Para agregar más preguntas, edita el objeto faqData
// ============================================

const faqData = {
    es: [
        {
            keywords: ['jovenes', 'stem', 'que es', 'proyecto', 'acerca', 'sobre'],
            answer: 'JóvenesSTEM es un proyecto educativo fundado por Alberto Yépiz enfocado en acercar la ciencia, tecnología, ingeniería y matemáticas a jóvenes de forma accesible y práctica. Incluye el libro BlueBook v1 y recursos educativos.'
        },
        {
            keywords: ['bluebook', 'libro', 'leer', 'descargar', 'gratis'],
            answer: 'El BlueBook v1 está disponible totalmente GRATIS en la sección de enlaces principales. Solo haz click en "📚 Mi libro BlueBook v1 gratis!" para acceder a la versión digital completa.'
        },
        {
            keywords: ['test', 'examen', 'evaluacion', 'badge', 'insignia', 'nivel', 'prueba'],
            answer: 'Es una evaluación basada en el capítulo 1 del BlueBook v1. Si obtienes más del 80% de respuestas correctas, serás candidato para recibir tu primer badge L1 (Nivel 1) de JóvenesSTEM 🏅'
        },
        {
            keywords: ['contacto', 'whatsapp', 'comunicar', 'hablar', 'mensaje', 'escribir'],
            answer: 'Puedes contactarlo directamente por WhatsApp haciendo click en el botón "👋 WhatsApp - Click Aqui!" en la página principal. También está disponible en LinkedIn, Instagram y GitHub.'
        },
        {
            keywords: ['podcast', 'audio', 'escuchar', 'spotify'],
            answer: 'Los podcasts están disponibles en Spotify. Haz click en "🎙️ Escucha mis Podcasts" en la página principal para acceder a todos los episodios.'
        },
        {
            keywords: ['bose', 'equipo', 'audio', 'renta', 'sonido', 'hidef', 'party', 'fiestas'],
            answer: 'HiDef Parties es el servicio de renta de equipo de audio Bose profesional de Alberto. Perfecto para eventos, fiestas y presentaciones. Visita @hidefparties en Instagram o usa el enlace "🔊 Renta equipo Bose aquí!"'
        },
        {
            keywords: ['experiencia', 'trabajo', 'apple', 'carrera', 'profesional', 'cv'],
            answer: 'Alberto cuenta con más de 15 años de experiencia en Apple, además de trabajar con empresas como PepsiCo, Avis y Santillana-Richmond. Es MBA, experto en UX/Agile, EdTech y Customer Experience.'
        },
        {
            keywords: ['propuesta', 'fasttrack', 'colaboracion', 'proyecto', 'instituciones'],
            answer: 'Es la propuesta comercial de JóvenesSTEM FastTrack para instituciones educativas. Puedes revisarla completa haciendo click en "📄 Propuesta JóvenesSTEM FastTrack^" en la página principal.'
        },
        {
            keywords: ['radio', 'musica', 'playlist', 'canciones', 'música'],
            answer: 'Es el reproductor de música integrado en la página con una playlist curada de las canciones favoritas de Alberto. Incluye ecualizador optimizado para disfrutar cada track al máximo 🎵'
        },
        {
            keywords: ['hola', 'buenos', 'dias', 'tardes', 'saludos'],
            answer: '¡Hola! 👋 ¿En qué puedo ayudarte hoy? Pregúntame sobre JóvenesSTEM, el BlueBook, contacto, o cualquier cosa relacionada con Alberto Yépiz.'
        }
    ],
    en: [
        {
            keywords: ['young', 'stem', 'what', 'project', 'about'],
            answer: 'JóvenesSTEM is an educational project founded by Alberto Yépiz focused on bringing science, technology, engineering, and mathematics closer to young people in an accessible and practical way. It includes the BlueBook v1 and educational resources.'
        },
        {
            keywords: ['bluebook', 'book', 'read', 'download', 'free'],
            answer: 'The BlueBook v1 is available completely FREE in the main links section. Just click on "📚 Mi libro BlueBook v1 gratis!" to access the complete digital version.'
        },
        {
            keywords: ['test', 'exam', 'evaluation', 'badge', 'level', 'assessment'],
            answer: 'It\'s an assessment based on Chapter 1 of BlueBook v1. If you get more than 80% correct answers, you\'ll be a candidate to receive your first L1 badge (Level 1) from JóvenesSTEM 🏅'
        },
        {
            keywords: ['contact', 'whatsapp', 'reach', 'talk', 'message', 'write'],
            answer: 'You can contact him directly via WhatsApp by clicking the "👋 WhatsApp - Click Aqui!" button on the main page. He\'s also available on LinkedIn, Instagram, and GitHub.'
        },
        {
            keywords: ['podcast', 'audio', 'listen', 'spotify'],
            answer: 'The podcasts are available on Spotify. Click on "🎙️ Escucha mis Podcasts" on the main page to access all episodes.'
        },
        {
            keywords: ['bose', 'equipment', 'audio', 'rent', 'sound', 'hidef', 'party', 'parties'],
            answer: 'HiDef Parties is Alberto\'s professional Bose audio equipment rental service. Perfect for events, parties, and presentations. Visit @hidefparties on Instagram or use the link "🔊 Renta equipo Bose aquí!"'
        },
        {
            keywords: ['experience', 'work', 'apple', 'career', 'professional', 'resume', 'cv'],
            answer: 'Alberto has over 15 years of experience at Apple, plus work with companies like PepsiCo, Avis, and Santillana-Richmond. He\'s an MBA, expert in UX/Agile, EdTech, and Customer Experience.'
        },
        {
            keywords: ['proposal', 'fasttrack', 'collaboration', 'project', 'institutions'],
            answer: 'It\'s the JóvenesSTEM FastTrack commercial proposal for educational institutions. You can review it completely by clicking "📄 Propuesta JóvenesSTEM FastTrack^" on the main page.'
        },
        {
            keywords: ['radio', 'music', 'playlist', 'songs'],
            answer: 'It\'s the integrated music player on the page with a curated playlist of Alberto\'s favorite songs. Includes an optimized equalizer to enjoy each track to the max 🎵'
        },
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'good'],
            answer: 'Hello! 👋 How can I help you today? Ask me about JóvenesSTEM, the BlueBook, contact info, or anything related to Alberto Yépiz.'
        }
    ]
};

// Detectar idioma
function detectLanguage(text) {
    const lowerText = text.toLowerCase();
    const spanishWords = ['que', 'como', 'donde', 'cuando', 'por', 'para', 'qué', 'cómo', 'dónde', 'hola', 'gracias', 'favor', 'puedo', 'sobre', 'más'];
    const englishWords = ['what', 'how', 'where', 'when', 'can', 'about', 'hello', 'hi', 'thanks', 'please', 'more', 'help'];
    
    let spanishScore = 0;
    let englishScore = 0;
    
    spanishWords.forEach(word => {
        if (lowerText.includes(word)) spanishScore++;
    });
    
    englishWords.forEach(word => {
        if (lowerText.includes(word)) englishScore++;
    });
    
    if (spanishScore === englishScore) {
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