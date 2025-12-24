const translations = {
    es: {
        nav: {
            jovenes: "Conoce más de JóvenesSTEM aquí 🚀",
            tools: "🔨 Tools Hub"
        },
        profile: {
            bio: "🚀 Visionario STEM con +15 años de experiencia en <strong>Apple</strong>, <strong>PepsiCo</strong>, <strong>AVIS</strong> y <strong>Santillana/Richmond</strong>.<br><br>💼 MBA con Background financiero, Full Cycle CX/UX, desarrollo web aplicado a innovación, estrategia y producto digital. 📊 Certificado en <strong>Data Science & Agile Systems for Product Management</strong> University of Maryland✨ <strong>+ English CEFR B2 🇺🇸</strong> by ETS.<br><br>💻 <strong>Fundador de <a href=\"https://www.instagram.com/jovenesstem/\" target=\"_blank\">JóvenesSTEM 🚀</strong></a> — conectando ciencia y tecnología con las nuevas generaciones."
        },
        links: {
            whatsapp: "👋 WhatsApp - Click Aqui!",
            proposal: "📄 Propuesta JóvenesSTEM FastTrack^",
            book: "📚 Mi libro BlueBook v1 gratis!",
            podcast: "🎙️ Escucha mis Podcasts",
            bose: "🔊 Renta equipo Bose aquí!"
        },
        radio: {
            title: "🎵 @yepzhi Radio",
            now_playing: "Sonando ahora / Now Playing",
            select: "Selecciona una pista",
            turn_up: "🔊 Turn it up!",
            playlist: "📋 Playlist",
            live_btn: "hopRadio en vivo 🔴"
        },
        jovenes: {
            title: "🚀 ¿Conoces JóvenesSTEM?",
            text: "Estás listo para conocer más de JóvenesSTEM, toma el test y descubre que tanto sabes de Ciencia, a su ves conocerás los contenidos del capítulo 1.",
            note: "*Test basado solo en el capítulo 1 del libro BlueBookv1.",
            btn_more: "Conoce más de JóvenesSTEM aquí 🚀",
            btn_test: "Tomar Test Ahora",
            badge: "Si sacas más de 80% serás candidato a recibir tu primer badge L1 de JóvenesSTEM 🏅"
        },
        footer: {
            developed: "Developed by <a href=\"https://github.com/yepzhi\" target=\"_blank\">@yepzhi</a>",
            visitors: "Visitors 👀",
            rights: "© 2025 Alberto Yépiz • All Rights Reserved"
        }
    },
    en: {
        nav: {
            jovenes: "Learn more about JóvenesSTEM here 🚀",
            tools: "🔨 Tools Hub"
        },
        profile: {
            bio: "🚀 STEM Visionary with +15 years of experience at <strong>Apple</strong>, <strong>PepsiCo</strong>, <strong>AVIS</strong> and <strong>Santillana/Richmond</strong>.<br><br>💼 MBA with Financial Background, Full Cycle CX/UX, web development applied to innovation, strategy and digital product. 📊 Certified in <strong>Data Science & Agile Systems for Product Management</strong> University of Maryland✨ <strong>+ English CEFR B2 🇺🇸</strong> by ETS.<br><br>💻 <strong>Founder of <a href=\"https://www.instagram.com/jovenesstem/\" target=\"_blank\">JóvenesSTEM 🚀</strong></a> — connecting science and technology with new generations."
        },
        links: {
            whatsapp: "👋 WhatsApp - Click Here!",
            proposal: "📄 JóvenesSTEM FastTrack Proposal^",
            book: "📚 My BlueBook v1 for free!",
            podcast: "🎙️ Listen to my Podcasts",
            bose: "🔊 Rent Bose equipment here!"
        },
        radio: {
            title: "🎵 @yepzhi Radio",
            now_playing: "Now Playing",
            select: "Select a jam",
            turn_up: "🔊 Turn it up!",
            playlist: "📋 Playlist",
            live_btn: "hopRadio Live 🔴"
        },
        jovenes: {
            title: "🚀 Do you know JóvenesSTEM?",
            text: "Ready to learn more about JóvenesSTEM? Take the test and discover how much you know about Science, while exploring the contents of Chapter 1.",
            note: "*Test based only on Chapter 1 of the BlueBook v1.",
            btn_more: "Learn more about JóvenesSTEM here 🚀",
            btn_test: "Take Test Now",
            badge: "Score over 80% to be eligible for your first JóvenesSTEM L1 Badge 🏅"
        },
        footer: {
            developed: "Developed by <a href=\"https://github.com/yepzhi\" target=\"_blank\">@yepzhi</a>",
            visitors: "Visitors 👀",
            rights: "© 2025 Alberto Yépiz • All Rights Reserved"
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'es';

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let text = translations[lang];

            keys.forEach(k => {
                if (text) text = text[k];
            });

            if (text) {
                element.innerHTML = text;
            }
        });

        // Update Button - show opposite language option
        if (langBtn) {
            if (lang === 'es') {
                langBtn.innerHTML = '<span class="lang-flag">🇺🇸</span><span class="lang-text" style="font-weight:700; font-size:12px; margin-left:4px;">ENG</span>';
                langBtn.title = "Switch to English";
            } else {
                langBtn.innerHTML = '<span class="lang-flag">🇲🇽</span><span class="lang-text" style="font-weight:700; font-size:12px; margin-left:4px;">ESP</span>';
                langBtn.title = "Cambiar a Español";
            }
        }

        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    updateLanguage(currentLang);

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'es' ? 'en' : 'es';
            updateLanguage(newLang);
        });
    }
});
