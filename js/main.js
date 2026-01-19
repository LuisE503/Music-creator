// ============================================
// BeatForge AI - Main Application
// Pure JavaScript - No frameworks
// Compatible with VS Code Live Server
// ============================================

import { albums } from './data.js';

// ============================================
// Internationalization Data
// ============================================

const translations = {
    es: {
        'hero.title': '<span class="block">Crea Música.</span><span class="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Define Tu Sonido.</span>',
        'hero.subtitle': 'El generador de música procedural más avanzado. Crea beats únicos al instante con IA o hazlo manualmente. Música 100% libre de derechos de autor.',
        'hero.cta1': '🎹 Empezar a Crear Beats',
        'hero.cta2': '🎧 Explorar Álbumes',
        'stats.albums': 'Álbumes',
        'stats.tracks': 'Pistas',
        'stats.beats': 'Beats por Crear',
        'features.title': 'Características Principales',
        'features.subtitle': 'Todo lo que necesitas para crear música profesional, directamente en tu navegador. Música sin derechos de autor, lista para usar.',
        'features.ai.title': 'Generación con IA',
        'features.ai.desc': 'Generación de beats con un clic usando patrones inteligentes. Múltiples géneros soportados. Cada beat es único y libre de derechos.',
        'features.export.title': 'Exportar a WAV',
        'features.export.desc': 'Descarga tus beats en formato WAV de alta calidad. Úsalos en tus proyectos sin restricciones.',
        'features.free.title': '100% Gratis y Sin Copyright',
        'features.free.desc': 'Sin suscripción, sin costos ocultos. Todos los beats son música libre de derechos de autor.',
        'albums.title': 'Álbumes Destacados',
        'albums.subtitle': 'Descubre nuestro hub de música sin copyright. 10 álbumes exclusivos de diferentes géneros, creados como ejemplos con nuestro generador procedural.',
        'cta.title': '¿Listo para Crear Tu Música Sin Restricciones?',
        'cta.subtitle': 'Únete a miles de creadores que usan BeatForge AI para hacer música libre de derechos cada día.',
        'cta.button': '🚀 Abrir Music Studio',
        'footer.desc': 'El hub de música sin copyright #1. Generador procedural de música con IA. Todos los beats son 100% libres de derechos de autor.',
        'footer.product': 'Producto',
        'footer.legal': 'Legal',
        'listen': 'Escuchar',
        'tracks': 'pistas'
    },
    en: {
        'hero.title': '<span class="block">Create Music.</span><span class="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Define Your Sound.</span>',
        'hero.subtitle': 'The most advanced procedural music generator. Create unique beats instantly with AI or manually. 100% copyright-free music.',
        'hero.cta1': '🎹 Start Creating Beats',
        'hero.cta2': '🎧 Explore Albums',
        'stats.albums': 'Albums',
        'stats.tracks': 'Tracks',
        'stats.beats': 'Beats to Create',
        'features.title': 'Key Features',
        'features.subtitle': 'Everything you need to create professional music, right in your browser. Copyright-free music, ready to use.',
        'features.ai.title': 'AI Generation',
        'features.ai.desc': 'One-click beat generation with intelligent patterns. Multiple genres supported. Every beat is unique and royalty-free.',
        'features.export.title': 'Export to WAV',
        'features.export.desc': 'Download your beats in high-quality WAV format. Use them in your projects without restrictions.',
        'features.free.title': '100% Free & Copyright-Free',
        'features.free.desc': 'No subscription, no hidden fees. All beats are copyright-free music.',
        'albums.title': 'Featured Albums',
        'albums.subtitle': 'Discover our #1 copyright-free music hub. 10 exclusive albums of different genres, created as examples with our procedural generator.',
        'cta.title': 'Ready to Create Your Restriction-Free Music?',
        'cta.subtitle': 'Join thousands of creators who use BeatForge AI to make royalty-free music every day.',
        'cta.button': '🚀 Launch Music Studio',
        'footer.desc': 'The #1 copyright-free music hub. Procedural music generator with AI. All beats are 100% royalty-free.',
        'footer.product': 'Product',
        'footer.legal': 'Legal',
        'listen': 'Listen',
        'tracks': 'tracks'
    },
    pt: {
        'hero.title': '<span class="block">Crie Música.</span><span class="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Defina Seu Som.</span>',
        'hero.subtitle': 'O gerador de música procedural mais avançado. Crie beats únicos instantaneamente com IA. Música 100% livre de direitos autorais.',
        'hero.cta1': '🎹 Começar a Criar Beats',
        'hero.cta2': '🎧 Explorar Álbuns',
        'stats.albums': 'Álbuns',
        'stats.tracks': 'Faixas',
        'stats.beats': 'Beats para Criar',
        'features.title': 'Recursos Principais',
        'features.subtitle': 'Tudo o que você precisa para criar música profissional, diretamente no seu navegador. Música livre de direitos, pronta para usar.',
        'features.ai.title': 'Geração com IA',
        'features.ai.desc': 'Geração de beats com um clique usando padrões inteligentes. Múltiplos gêneros suportados. Cada beat é único e livre de direitos.',
        'features.export.title': 'Exportar para WAV',
        'features.export.desc': 'Baixe seus beats em formato WAV de alta qualidade. Use-os em seus projetos sem restrições.',
        'features.free.title': '100% Grátis e Sem Copyright',
        'features.free.desc': 'Sem assinatura, sem taxas ocultas. Todos os beats são música livre de direitos autorais.',
        'albums.title': 'Álbuns em Destaque',
        'albums.subtitle': 'Descubra nosso hub de música sem copyright. 10 álbuns exclusivos de diferentes gêneros, criados como exemplos com nosso gerador procedural.',
        'cta.title': 'Pronto para Criar Sua Música Sem Restrições?',
        'cta.subtitle': 'Junte-se a milhares de criadores que usam BeatForge AI para fazer música livre de direitos todos os dias.',
        'cta.button': '🚀 Abrir Music Studio',
        'footer.desc': 'O hub de música sem copyright #1. Gerador de música procedural com IA. Todos os beats são 100% livres de direitos autorais.',
        'footer.product': 'Produto',
        'footer.legal': 'Legal',
        'listen': 'Ouvir',
        'tracks': 'faixas'
    },
    fr: {
        'hero.title': '<span class="block">Créez de la Musique.</span><span class="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Définissez Votre Son.</span>',
        'hero.subtitle': 'Le générateur de musique procédurale le plus avancé. Créez des beats uniques instantanément avec l\'IA. Musique 100% libre de droits.',
        'hero.cta1': '🎹 Commencer à Créer des Beats',
        'hero.cta2': '🎧 Explorer les Albums',
        'stats.albums': 'Albums',
        'stats.tracks': 'Pistes',
        'stats.beats': 'Beats à Créer',
        'features.title': 'Fonctionnalités Principales',
        'features.subtitle': 'Tout ce dont vous avez besoin pour créer de la musique professionnelle, directement dans votre navigateur. Musique libre de droits, prête à l\'emploi.',
        'features.ai.title': 'Génération par IA',
        'features.ai.desc': 'Génération de beats en un clic avec des motifs intelligents. Plusieurs genres supportés. Chaque beat est unique et libre de droits.',
        'features.export.title': 'Exporter en WAV',
        'features.export.desc': 'Téléchargez vos beats en format WAV haute qualité. Utilisez-les dans vos projets sans restrictions.',
        'features.free.title': '100% Gratuit et Sans Copyright',
        'features.free.desc': 'Pas d\'abonnement, pas de frais cachés. Tous les beats sont de la musique libre de droits d\'auteur.',
        'albums.title': 'Albums en Vedette',
        'albums.subtitle': 'Découvrez notre hub de musique sans copyright. 10 albums exclusifs de différents genres, créés comme exemples avec notre générateur procédural.',
        'cta.title': 'Prêt à Créer Votre Musique Sans Restrictions?',
        'cta.subtitle': 'Rejoignez des milliers de créateurs qui utilisent BeatForge AI pour faire de la musique libre de droits chaque jour.',
        'cta.button': '🚀 Lancer Music Studio',
        'footer.desc': 'Le hub de musique sans copyright #1. Générateur de musique procédurale avec IA. Tous les beats sont 100% libres de droits d\'auteur.',
        'footer.product': 'Produit',
        'footer.legal': 'Juridique',
        'listen': 'Écouter',
        'tracks': 'pistes'
    },
    de: {
        'hero.title': '<span class="block">Musik Erstellen.</span><span class="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Definiere Deinen Sound.</span>',
        'hero.subtitle': 'Der fortschrittlichste prozedurale Musikgenerator. Erstelle einzigartige Beats sofort mit KI. 100% urheberrechtsfreie Musik.',
        'hero.cta1': '🎹 Beats Erstellen',
        'hero.cta2': '🎧 Alben Entdecken',
        'stats.albums': 'Alben',
        'stats.tracks': 'Titel',
        'stats.beats': 'Beats zum Erstellen',
        'features.title': 'Hauptmerkmale',
        'features.subtitle': 'Alles, was du brauchst, um professionelle Musik direkt in deinem Browser zu erstellen. Lizenzfreie Musik, einsatzbereit.',
        'features.ai.title': 'KI-Generierung',
        'features.ai.desc': 'Beat-Generierung mit einem Klick mit intelligenten Mustern. Mehrere Genres unterstützt. Jeder Beat ist einzigartig und lizenzfrei.',
        'features.export.title': 'Als WAV Exportieren',
        'features.export.desc': 'Lade deine Beats in hochwertigem WAV-Format herunter. Verwende sie in deinen Projekten ohne Einschränkungen.',
        'features.free.title': '100% Kostenlos und Urheberrechtsfrei',
        'features.free.desc': 'Kein Abonnement, keine versteckten Gebühren. Alle Beats sind urheberrechtsfreie Musik.',
        'albums.title': 'Vorgestellte Alben',
        'albums.subtitle': 'Entdecke unseren führenden lizenzfreien Musik-Hub. 10 exklusive Alben verschiedener Genres, als Beispiele mit unserem prozeduralen Generator erstellt.',
        'cta.title': 'Bereit, Deine Musik Ohne Einschränkungen zu Erstellen?',
        'cta.subtitle': 'Schließe dich Tausenden von Kreativen an, die jeden Tag BeatForge AI nutzen, um lizenzfreie Musik zu erstellen.',
        'cta.button': '🚀 Music Studio Starten',
        'footer.desc': 'Der führende lizenzfreie Musik-Hub. Prozeduraler Musikgenerator mit KI. Alle Beats sind 100% urheberrechtsfrei.',
        'footer.product': 'Produkt',
        'footer.legal': 'Rechtlich',
        'listen': 'Anhören',
        'tracks': 'Titel'
    }
};

// Current language
let currentLang = localStorage.getItem('beatforge-lang') || 'es';

// ============================================
// Utility Functions
// ============================================

function translate(key) {
    return translations[currentLang]?.[key] || translations['es'][key] || translations['en'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translate(key);
        if (translation) {
            if (key.includes('title') && translation.includes('<span')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `px-4 py-3 rounded-lg shadow-lg text-white animate-fade-in ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-primary'
    }`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        
        // Animate icon
        const icon = mobileMenuBtn.querySelector('svg');
        if (icon) {
            if (!isOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        }
    });
    
    // Close mobile menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        });
    });
}

// ============================================
// Language Selector
// ============================================

function initLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLangEl = document.getElementById('currentLang');
    const langSelectorMobile = document.getElementById('langSelectorMobile');
    
    const langFlags = {
        es: '🇪🇸 ES',
        en: '🇺🇸 EN',
        pt: '🇧🇷 PT',
        fr: '🇫🇷 FR',
        de: '🇩🇪 DE'
    };
    
    // Set current language display
    if (currentLangEl) {
        currentLangEl.textContent = langFlags[currentLang] || langFlags['es'];
    }
    
    // Toggle dropdown
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !langDropdown.classList.contains('invisible');
            if (isOpen) {
                langDropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
            } else {
                langDropdown.classList.remove('opacity-0', 'invisible', '-translate-y-2');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
        });
        
        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Desktop dropdown buttons
    langDropdown?.querySelectorAll('button[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            langDropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
        });
    });
    
    // Mobile selector
    if (langSelectorMobile) {
        langSelectorMobile.value = currentLang;
        langSelectorMobile.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('beatforge-lang', lang);
        document.documentElement.lang = lang;
        
        if (currentLangEl) {
            currentLangEl.textContent = langFlags[lang] || langFlags['es'];
        }
        
        applyTranslations();
        
        // Re-render albums with new language
        const grid = document.getElementById('album-grid');
        if (grid) {
            renderAlbums(grid, currentFilter);
        }
        
        showToast(`Idioma cambiado a ${langFlags[lang]}`, 'success');
    }
}

// ============================================
// Album Rendering
// ============================================

let currentFilter = 'all';

function getGenreCategory(genre) {
    const lower = genre.toLowerCase();
    if (lower.includes('lo-fi') || lower.includes('lofi') || lower.includes('hip hop')) return 'lofi';
    if (lower.includes('trap') || lower.includes('drill')) return 'trap';
    if (lower.includes('synth') || lower.includes('retro')) return 'synth';
    if (lower.includes('techno') || lower.includes('house')) return 'techno';
    if (lower.includes('ambient') || lower.includes('chill')) return 'ambient';
    if (lower.includes('reggaeton')) return 'reggaeton';
    if (lower.includes('indie')) return 'indie';
    if (lower.includes('cyber') || lower.includes('punk')) return 'cyber';
    if (lower.includes('jazz')) return 'jazz';
    if (lower.includes('cine') || lower.includes('epic')) return 'cinematic';
    return 'other';
}

function renderAlbums(container, filter = 'all') {
    const filteredAlbums = filter === 'all' 
        ? albums 
        : albums.filter(album => getGenreCategory(album.genre) === filter);

    container.innerHTML = filteredAlbums.map(album => `
        <article class="album-card group relative bg-dark/50 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300" role="listitem">
            <a href="album.html?id=${album.id}" class="block">
                <div class="aspect-square overflow-hidden relative">
                    <img 
                        src="${album.cover}" 
                        alt="${album.title} - ${album.artist}" 
                        class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                        loading="lazy"
                        decoding="async"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                        <span class="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-center text-sm">
                            ${translate('listen')} →
                        </span>
                    </div>
                    <!-- Play Button Overlay -->
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div class="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50 transform group-hover:scale-110 transition">
                            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>
            </a>
            <div class="p-5">
                <div class="text-xs font-bold text-primary mb-2 uppercase tracking-wider">${album.genre}</div>
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-primary transition line-clamp-1">${album.title}</h3>
                <p class="text-gray-400 text-sm mb-3">${album.artist}</p>
                <p class="text-gray-500 text-xs line-clamp-2">${album.description}</p>
                <div class="mt-4 flex items-center gap-2 text-xs text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                    </svg>
                    ${album.songs.length} ${translate('tracks')}
                </div>
            </div>
        </article>
    `).join('');
}

// ============================================
// Genre Filter
// ============================================

function initGenreFilter() {
    const filters = document.querySelectorAll('.genre-filter');
    const grid = document.getElementById('album-grid');
    
    if (!filters.length || !grid) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filters.forEach(f => {
                f.classList.remove('bg-primary', 'text-white');
                f.classList.add('bg-white/10', 'text-gray-300');
                f.setAttribute('aria-selected', 'false');
            });
            btn.classList.remove('bg-white/10', 'text-gray-300');
            btn.classList.add('bg-primary', 'text-white');
            btn.setAttribute('aria-selected', 'true');

            // Filter albums
            currentFilter = btn.dataset.genre;
            renderAlbums(grid, currentFilter);
        });
    });
}

// ============================================
// Smooth Scroll
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// Animations
// ============================================

function initAnimations() {
    // Add fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.album-card, section').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('album-grid');
    
    if (grid) {
        renderAlbums(grid);
    }

    initMobileMenu();
    initLanguageSelector();
    initGenreFilter();
    initSmoothScroll();
    initAnimations();
    applyTranslations();

    console.log('🎵 BeatForge AI initialized successfully');
});
