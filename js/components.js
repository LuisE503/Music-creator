// ============================================
// BeatForge Studio - Reusable Components
// Navigation and Footer for all pages
// ============================================

// ============================================
// NAVIGATION COMPONENT
// ============================================

export function createNavigation(currentPage = 'index', lang = 'es') {
    const translations = {
        es: {
            home: 'Inicio',
            albums: 'Álbumes',
            maker: 'Creador',
            features: 'Características',
            shop: 'Tienda',
            partners: 'Partners',
            blog: 'Blog',
            about: 'Nosotros',
            contact: 'Contacto'
        },
        en: {
            home: 'Home',
            albums: 'Albums',
            maker: 'Creator',
            features: 'Features',
            shop: 'Shop',
            partners: 'Partners',
            blog: 'Blog',
            about: 'About',
            contact: 'Contact'
        },
        pt: {
            home: 'Início',
            albums: 'Álbuns',
            maker: 'Criador',
            features: 'Recursos',
            shop: 'Loja',
            partners: 'Parceiros',
            blog: 'Blog',
            about: 'Sobre',
            contact: 'Contato'
        },
        fr: {
            home: 'Accueil',
            albums: 'Albums',
            maker: 'Créateur',
            features: 'Fonctionnalités',
            shop: 'Boutique',
            partners: 'Partenaires',
            blog: 'Blog',
            about: 'À propos',
            contact: 'Contact'
        },
        de: {
            home: 'Startseite',
            albums: 'Alben',
            maker: 'Ersteller',
            features: 'Funktionen',
            shop: 'Shop',
            partners: 'Partner',
            blog: 'Blog',
            about: 'Über uns',
            contact: 'Kontakt'
        }
    };

    const t = translations[lang] || translations.es;
    const suffix = lang === 'es' ? '' : `-${lang}`;

    return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-darker/85 backdrop-blur-xl border-b border-white/5" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <a href="index${suffix}.html" class="logo-container flex items-center gap-3 group">
                    <div class="logo-icon w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-white">
                        BeatForge <span class="text-primary">Studio</span>
                    </span>
                </a>
                
<<<<<<< HEAD
                <!-- Desktop Navigation (simplified) -->
                <div class="hidden lg:flex items-center gap-2">
=======
                <!-- Desktop Navigation -->
                <div class="hidden lg:flex items-center gap-1">
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                    <a href="index${suffix}.html" class="nav-link ${currentPage === 'index' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'index' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-home text-sm"></i>
                        ${t.home}
                    </a>
                    <a href="albums${suffix}.html" class="nav-link ${currentPage === 'albums' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'albums' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-compact-disc text-sm"></i>
                        ${t.albums}
                    </a>
                    <a href="maker.html" class="nav-link ${currentPage === 'maker' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'maker' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-music text-sm"></i>
                        ${t.maker}
                    </a>
<<<<<<< HEAD
=======
                    <div class="h-6 w-px bg-white/10 mx-1"></div>
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                    <a href="shop${suffix}.html" class="nav-link ${currentPage === 'shop' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'shop' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-shopping-bag text-sm"></i>
                        ${t.shop}
                    </a>
<<<<<<< HEAD

                    <!-- More dropdown for secondary links -->
                    <div class="relative">
                        <button id="moreBtn" class="px-3 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors flex items-center gap-2" aria-haspopup="true" aria-expanded="false">
                            <span>Más</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div id="moreDropdown" class="hidden absolute right-0 mt-2 w-40 bg-dark rounded-xl shadow-2xl border border-white/10 overflow-hidden transition-all transform origin-top-right">
                            <a href="blog${suffix}.html" class="block px-4 py-3 hover:bg-white/5 transition-colors text-sm">${t.blog}</a>
                            <a href="partners${suffix}.html" class="block px-4 py-3 hover:bg-white/5 transition-colors text-sm">${t.partners}</a>
                            <a href="about${suffix}.html" class="block px-4 py-3 hover:bg-white/5 transition-colors text-sm">${t.about}</a>
                        </div>
                    </div>

=======
                    <a href="partners${suffix}.html" class="nav-link ${currentPage === 'partners' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'partners' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-handshake text-sm"></i>
                        ${t.partners}
                    </a>
                    <a href="blog${suffix}.html" class="nav-link ${currentPage === 'blog' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'blog' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-pen-fancy text-sm"></i>
                        ${t.blog}
                    </a>
                    <a href="about${suffix}.html" class="nav-link ${currentPage === 'about' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'about' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-circle-info text-sm"></i>
                        ${t.about}
                    </a>
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                    <a href="contact${suffix}.html" class="nav-link ${currentPage === 'contact' ? 'active text-white font-semibold' : 'text-gray-300'} px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-2" ${currentPage === 'contact' ? 'aria-current="page"' : ''}>
                        <i class="fas fa-envelope text-sm"></i>
                        ${t.contact}
                    </a>
                </div>
                
                <!-- Language Selector & Mobile Menu -->
                <div class="flex items-center gap-3">
                    <!-- Language Dropdown -->
                    <div class="relative">
                        <button id="langBtn" class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium" aria-haspopup="true" aria-expanded="false">
                            <span id="currentLang">${getLangFlag(lang)} ${lang.toUpperCase()}</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="langDropdown" class="absolute right-0 mt-2 w-48 bg-dark rounded-xl shadow-2xl border border-white/10 overflow-hidden opacity-0 invisible transition-all transform -translate-y-2">
                            <a href="index.html" class="block px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                                🇪🇸 Español
                            </a>
                            <a href="index-en.html" class="block px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                                🇺🇸 English
                            </a>
                            <a href="index-pt.html" class="block px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                                🇧🇷 Português
                            </a>
                            <a href="index-fr.html" class="block px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                                🇫🇷 Français
                            </a>
                            <a href="index-de.html" class="block px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
                                🇩🇪 Deutsch
                            </a>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
<<<<<<< HEAD
        <!-- Mobile Menu (primary + More group) -->
        <div id="mobileMenu" class="lg:hidden hidden bg-dark/95 backdrop-blur-xl border-t border-white/5">
            <div class="px-4 py-6 space-y-2">
                <!-- Primary Links -->
=======
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="lg:hidden hidden bg-dark/95 backdrop-blur-xl border-t border-white/5">
            <div class="px-4 py-6 space-y-2">
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                <a href="index${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'index' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-home"></i>
                    ${t.home}
                </a>
                <a href="albums${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'albums' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-compact-disc"></i>
                    ${t.albums}
                </a>
                <a href="maker.html" class="block px-4 py-3 rounded-lg ${currentPage === 'maker' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-music"></i>
                    ${t.maker}
                </a>
<<<<<<< HEAD

                <div class="h-px bg-white/10 my-2"></div>

=======
                <div class="h-px bg-white/10 my-2"></div>
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                <a href="shop${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'shop' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-shopping-bag"></i>
                    ${t.shop}
                </a>
<<<<<<< HEAD
=======
                <a href="partners${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'partners' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-handshake"></i>
                    ${t.partners}
                </a>
                <a href="blog${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'blog' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-pen-fancy"></i>
                    ${t.blog}
                </a>
                <a href="about${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'about' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-circle-info"></i>
                    ${t.about}
                </a>
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
                <a href="contact${suffix}.html" class="block px-4 py-3 rounded-lg ${currentPage === 'contact' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'} transition-colors font-medium flex items-center gap-2">
                    <i class="fas fa-envelope"></i>
                    ${t.contact}
                </a>
<<<<<<< HEAD

                <!-- More group collapsed by default -->
                <div>
                    <button id="mobileMoreBtn" class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between gap-2" aria-expanded="false">
                        <span class="flex items-center gap-2"><i class="fas fa-ellipsis-h"></i> Más</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    <div id="mobileMore" class="hidden mt-2 space-y-1">
                        <a href="blog${suffix}.html" class="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">${t.blog}</a>
                        <a href="partners${suffix}.html" class="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">${t.partners}</a>
                        <a href="about${suffix}.html" class="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">${t.about}</a>
                    </div>
                </div>
=======
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
            </div>
        </div>
    </nav>
    `;
}

function getLangFlag(lang) {
    const flags = {
        es: '🇪🇸',
        en: '🇺🇸',
        pt: '🇧🇷',
        fr: '🇫🇷',
        de: '🇩🇪'
    };
    return flags[lang] || '🇪🇸';
}

// ============================================
// FOOTER COMPONENT
// ============================================

export function createFooter(lang = 'es') {
    const translations = {
        es: {
            description: 'Música generada proceduralmente con inteligencia artificial. Cada reproducción es una experiencia única.',
            navigation: 'Navegación',
            legal: 'Legal',
            home: 'Inicio',
            albums: 'Álbumes',
            maker: 'Beat Maker',
            features: 'Características',
            privacy: 'Privacidad',
            terms: 'Términos',
            licenses: 'Licencias',
            cookies: 'Cookies',
            copyright: 'Todos los derechos reservados.',
            madeWith: 'Música generada con',
            and: 'e IA.'
        },
        en: {
            description: 'Procedurally generated music with artificial intelligence. Every playback is a unique experience.',
            navigation: 'Navigation',
            legal: 'Legal',
            home: 'Home',
            albums: 'Albums',
            maker: 'Beat Maker',
            features: 'Features',
            privacy: 'Privacy',
            terms: 'Terms',
            licenses: 'Licenses',
            cookies: 'Cookies',
            copyright: 'All rights reserved.',
            madeWith: 'Music generated with',
            and: '& AI.'
        },
        pt: {
            description: 'Música gerada proceduralmente com inteligência artificial. Cada reprodução é uma experiência única.',
            navigation: 'Navegação',
            legal: 'Legal',
            home: 'Início',
            albums: 'Álbuns',
            maker: 'Beat Maker',
            features: 'Recursos',
            privacy: 'Privacidade',
            terms: 'Termos',
            licenses: 'Licenças',
            cookies: 'Cookies',
            copyright: 'Todos os direitos reservados.',
            madeWith: 'Música gerada com',
            and: 'e IA.'
        },
        fr: {
            description: 'Musique générée de manière procédurale avec intelligence artificielle. Chaque lecture est une expérience unique.',
            navigation: 'Navigation',
            legal: 'Légal',
            home: 'Accueil',
            albums: 'Albums',
            maker: 'Beat Maker',
            features: 'Fonctionnalités',
            privacy: 'Confidentialité',
            terms: 'Conditions',
            licenses: 'Licences',
            cookies: 'Cookies',
            copyright: 'Tous droits réservés.',
            madeWith: 'Musique générée avec',
            and: 'et IA.'
        },
        de: {
            description: 'Prozedural generierte Musik mit künstlicher Intelligenz. Jede Wiedergabe ist ein einzigartiges Erlebnis.',
            navigation: 'Navigation',
            legal: 'Rechtliches',
            home: 'Startseite',
            albums: 'Alben',
            maker: 'Beat Maker',
            features: 'Funktionen',
            privacy: 'Datenschutz',
            terms: 'Bedingungen',
            licenses: 'Lizenzen',
            cookies: 'Cookies',
            copyright: 'Alle Rechte vorbehalten.',
            madeWith: 'Musik erstellt mit',
            and: 'und KI.'
        }
    };

    const t = translations[lang] || translations.es;
    const suffix = lang === 'es' ? '' : `-${lang}`;

    return `
    <footer class="bg-dark/50 border-t border-white/5 mt-20" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Brand -->
                <div class="footer-section md:col-span-2">
                    <a href="index${suffix}.html" class="logo-container flex items-center gap-3 mb-4 inline-flex">
                        <div class="logo-icon w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                            </svg>
                        </div>
                        <span class="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            BeatForge Studio
                        </span>
                    </a>
                    <p class="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
                        ${t.description}
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub" title="GitHub">
                            <i class="fab fa-github text-lg"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="X (Twitter)" title="X">
                            <i class="fab fa-x-twitter text-lg"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube" title="YouTube">
                            <i class="fab fa-youtube text-lg"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram" title="Instagram">
                            <i class="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="TikTok" title="TikTok">
                            <i class="fab fa-tiktok text-lg"></i>
                        </a>
                        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Spotify" title="Spotify">
                            <i class="fab fa-spotify text-lg"></i>
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Discord" title="Discord">
                            <i class="fab fa-discord text-lg"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn" title="LinkedIn">
                            <i class="fab fa-linkedin text-lg"></i>
                        </a>
                    </div>
                </div>
                
                <!-- Navigation Links -->
                <div class="footer-section">
                    <h3 class="font-semibold mb-4 flex items-center gap-2 text-sm">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                        ${t.navigation}
                    </h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="index${suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.home}
                        </a></li>
                        <li><a href="albums${suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.albums}
                        </a></li>
                        <li><a href="maker.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.maker}
                        </a></li>
                        <li><a href="index${suffix}.html#features" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.features}
                        </a></li>
                    </ul>
                </div>
                
                <!-- Legal Links -->
                <div class="footer-section">
                    <h3 class="font-semibold mb-4 flex items-center gap-2 text-sm">
                        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                        ${t.legal}
                    </h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="privacy${suffix === '' ? '-es' : suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.privacy}
                        </a></li>
                        <li><a href="terms${suffix === '' ? '-es' : suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.terms}
                        </a></li>
                        <li><a href="licenses${suffix === '' ? '-es' : suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.licenses}
                        </a></li>
                        <li><a href="cookies${suffix === '' ? '-es' : suffix}.html" class="footer-link">
                            <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
                            ${t.cookies}
                        </a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-white/5 mt-10 pt-8 text-center text-gray-500 text-xs">
                <p class="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <span>&copy; 2025 BeatForge Studio.</span>
                    <span class="hidden sm:inline">•</span>
                    <span>${t.copyright}</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="flex items-center gap-1.5">
                        ${t.madeWith} 
                        <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                        </svg>
                        ${t.and}
                    </span>
                </p>
            </div>
        </div>
    </footer>
    `;
}

// ============================================
// INITIALIZE NAVIGATION FUNCTIONS
// ============================================

export function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
<<<<<<< HEAD

        // Mobile 'More' collapse
        const mobileMoreBtn = document.getElementById('mobileMoreBtn');
        const mobileMore = document.getElementById('mobileMore');
        if (mobileMoreBtn && mobileMore) {
            mobileMoreBtn.addEventListener('click', () => {
                const isHidden = mobileMore.classList.toggle('hidden');
                mobileMoreBtn.setAttribute('aria-expanded', !isHidden);
            });
        }
=======
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
    }
    
    // Language dropdown
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('opacity-0');
            langDropdown.classList.toggle('invisible');
            langDropdown.classList.toggle('-translate-y-2');
            const expanded = langBtn.getAttribute('aria-expanded') === 'true';
            langBtn.setAttribute('aria-expanded', !expanded);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
                langBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Save language preference when clicking language links
        langDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                let lang = 'es';
                if (href.includes('-en')) lang = 'en';
                else if (href.includes('-pt')) lang = 'pt';
                else if (href.includes('-fr')) lang = 'fr';
                else if (href.includes('-de')) lang = 'de';
                
                localStorage.setItem('beatforge_language', lang);
            });
        });
<<<<<<< HEAD
        
        // 'More' dropdown - secondary navigation (Blog, Partners, About)
        const moreBtn = document.getElementById('moreBtn');
        const moreDropdown = document.getElementById('moreDropdown');
        if (moreBtn && moreDropdown) {
            moreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                moreDropdown.classList.toggle('hidden');
                const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
                moreBtn.setAttribute('aria-expanded', !expanded);
            });

            document.addEventListener('click', (e) => {
                if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
                    moreDropdown.classList.add('hidden');
                    moreBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close with Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    moreDropdown.classList.add('hidden');
                    moreBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
=======
>>>>>>> 99babcb47acba6ce3f1b3080978205561e83b8db
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}
