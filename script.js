// ROI Calculator
const budgetSlider = document.getElementById('budgetSlider');
const budgetDisplay = document.getElementById('budgetDisplay');
const smsCount = document.getElementById('smsCount');
const conversions = document.getElementById('conversions');
const revenue = document.getElementById('revenue');
const roi = document.getElementById('roi');

if (budgetSlider) {
    // Set initial progress
    const updateSliderProgress = (slider) => {
        const min = slider.min || 0;
        const max = slider.max || 100;
        const val = slider.value;
        const progress = ((val - min) / (max - min)) * 100;
        slider.style.setProperty('--slider-progress', `${progress}%`);
    };
    
    // Initialize slider progress
    updateSliderProgress(budgetSlider);
    
    budgetSlider.addEventListener('input', function() {
        const budget = parseInt(this.value);
        const smsNumber = Math.floor(budget / 0.05);
        const conversionNumber = Math.floor(smsNumber * 0.10);
        const revenueAmount = conversionNumber * 20;
        const roiPercent = Math.floor(((revenueAmount - budget) / budget) * 100);
        
        budgetDisplay.textContent = budget + '€';
        smsCount.textContent = smsNumber.toLocaleString('fr-FR').replace(/\s/g, ' ');
        conversions.textContent = conversionNumber.toLocaleString('fr-FR').replace(/\s/g, ' ');
        revenue.textContent = revenueAmount.toLocaleString('fr-FR').replace(/\s/g, ' ') + '€';
        roi.textContent = roiPercent.toLocaleString('fr-FR').replace(/\s/g, ' ') + '%';
        
        // Update slider progress
        updateSliderProgress(this);
    });
}

// SMS Generator
let smsTemplates = {};
let lastTemplateIndices = {}; // Stocke le dernier index pour chaque combinaison campaignType+tone

// Charger les templates depuis le fichier JSON
fetch('templates.json')
    .then(response => response.json())
    .then(data => {
        smsTemplates = data;
        // Ne pas générer automatiquement, attendre le clic de l'utilisateur
    })
    .catch(error => {
        console.error('Erreur lors du chargement des templates:', error);
        // Fallback avec un template par défaut en cas d'erreur
        smsTemplates = {
            promo: {
                friendly: ["🎉 Hey {prenom} ! Offre spéciale : -30% avec le code {code} ! 🛍️"]
            }
        };
    });

function generateSMS() {
    if (!smsTemplates || Object.keys(smsTemplates).length === 0) {
        return; // Attendre que les templates soient chargés
    }
    
    const previewElement = document.getElementById('smsPreview');
    const charCountElement = document.getElementById('charCount');
    
    const campaignType = document.getElementById('campaignType').value;
    const tone = document.getElementById('tone').value;
    const includePromo = document.getElementById('includePromo').checked;
    
    const templates = smsTemplates[campaignType][tone];
    
    // Récupérer le SMS actuellement affiché
    const currentDisplayedSMS = previewElement.textContent;
    
    // Clé unique pour cette combinaison de paramètres
    const comboKey = `${campaignType}-${tone}-${includePromo}`;
    
    // Récupérer le dernier index utilisé pour cette combinaison
    const lastIndex = lastTemplateIndices[comboKey] ?? -1;
    
    // Variations aléatoires
    const prenoms = ['Marie', 'Sophie', 'Julie', 'Emma', 'Laura', 'Léa', 'Chloé', 'Alice', 'Clara', 'Nina', 'Lucie', 'Camille', 'Sarah', 'Lisa'];
    const jours = ['dimanche', 'ce week-end', 'aujourd\'hui', 'demain', 'cette semaine', 'samedi', 'vendredi', 'ce soir', 'maintenant'];
    const codes = ['PROMO30', 'DEAL20', 'VIP25', 'HAPPY30', 'FLASH20', 'SAVE25', 'EXTRA15', 'SUPER40', 'BEST50', 'TOP35'];
    
    let sms = '';
    let templateIndex;
    let attempts = 0;
    const maxAttempts = 500;
    
    // Générer jusqu'à obtenir un SMS différent du texte affiché
    do {
        // Choisir un index différent du dernier si possible
        if (templates.length === 1) {
            templateIndex = 0;
        } else {
            do {
                templateIndex = Math.floor(Math.random() * templates.length);
            } while (templateIndex === lastIndex && attempts < 10);
        }
        
        const randomPrenom = prenoms[Math.floor(Math.random() * prenoms.length)];
        const randomJour = jours[Math.floor(Math.random() * jours.length)];
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        
        const template = templates[templateIndex];
        sms = template
            .replace('{prenom}', randomPrenom)
            .replace('{date}', randomJour)
            .replace('{code}', includePromo ? randomCode : '');
        
        if (!includePromo) {
            sms = sms.replace(/avec le code [A-Z0-9]+/gi, '')
                      .replace(/Code[: ]*[A-Z0-9]+/gi, '')
                      .replace(/\{code\}/g, '')
                      .replace(/  +/g, ' ')
                      .trim();
        }
        
        attempts++;
    } while (sms === currentDisplayedSMS && attempts < maxAttempts && currentDisplayedSMS !== '' && currentDisplayedSMS !== 'Cliquez sur "Générer le SMS" pour voir votre message...');
    
    // Si on a encore le même après 500 tentatives (très improbable), log pour debug
    if (sms === currentDisplayedSMS && attempts === maxAttempts) {
        console.error('Failed to generate different SMS after', maxAttempts, 'attempts');
        console.log('Templates available:', templates.length);
    }
    
    // Sauvegarder cet index
    lastTemplateIndices[comboKey] = templateIndex;
    
    // Animation visuelle FORCÉE
    previewElement.style.transition = 'none';
    previewElement.style.opacity = '0';
    
    // Force reflow
    void previewElement.offsetHeight;
    
    setTimeout(() => {
        previewElement.textContent = sms;
        previewElement.style.transition = 'opacity 0.15s ease';
        previewElement.style.opacity = '1';
        charCountElement.textContent = sms.length + '/160 caractères';
    }, 50);
}

function sendSMS() {
    const phoneInput = document.getElementById('phoneNumber');
    const smsPreview = document.getElementById('smsPreview');
    const confirmationDiv = document.getElementById('sendConfirmation');
    
    const phoneNumber = phoneInput.value.trim();
    const smsText = smsPreview.textContent;
    
    // Vérifier si un SMS est généré
    if (!smsText || smsText === 'Cliquez sur "Générer le SMS" pour voir votre message...') {
        confirmationDiv.textContent = '⚠️ Veuillez d\'abord générer un SMS';
        confirmationDiv.className = 'send-confirmation error show';
        setTimeout(() => {
            confirmationDiv.classList.remove('show');
        }, 3000);
        return;
    }
    
    // Vérifier si le numéro est rempli
    if (!phoneNumber) {
        confirmationDiv.textContent = '⚠️ Veuillez entrer un numéro de téléphone';
        confirmationDiv.className = 'send-confirmation error show';
        setTimeout(() => {
            confirmationDiv.classList.remove('show');
        }, 3000);
        phoneInput.focus();
        return;
    }
    
    // Validation basique du numéro (peut contenir +, espaces, chiffres)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phoneNumber)) {
        confirmationDiv.textContent = '⚠️ Numéro de téléphone invalide';
        confirmationDiv.className = 'send-confirmation error show';
        setTimeout(() => {
            confirmationDiv.classList.remove('show');
        }, 3000);
        phoneInput.focus();
        return;
    }
    
    // Simuler l'envoi (succès)
    confirmationDiv.textContent = '✅ SMS envoyé !';
    confirmationDiv.className = 'send-confirmation success show';
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
        confirmationDiv.classList.remove('show');
    }, 3000);
}

// Fonction pour scroller vers le générateur de SMS
function scrollToGenerator() {
    const generatorSection = document.querySelector('.sms-generator');
    if (!generatorSection) return;
    
    const isMobileView = window.innerWidth <= 768;
    const header = document.querySelector('.main-header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Position de la section
    const sectionTop = generatorSection.getBoundingClientRect().top + window.pageYOffset;
    
    // Sur mobile : positionner en haut avec offset pour le header
    // Sur desktop : centrer la section
    let scrollPosition;
    if (isMobileView) {
        scrollPosition = sectionTop - headerHeight - 20; // 20px de marge
    } else {
        const windowHeight = window.innerHeight;
        const sectionHeight = generatorSection.offsetHeight;
        scrollPosition = sectionTop - (windowHeight / 2) + (sectionHeight / 2);
    }
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

// Fonction pour retourner en haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Gestion du menu mobile
function toggleMobileMenu(event) {
    // Empêcher la propagation de l'événement
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const nav = document.querySelector('.header-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    const isActive = nav.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const nav = document.querySelector('.header-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    nav.classList.add('active');
    toggle.classList.add('active');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Ajouter listener pour la touche Escape
    document.addEventListener('keydown', handleEscapeKey);
}

function closeMobileMenu(event) {
    // Empêcher la propagation de l'événement si présent
    if (event) {
        event.stopPropagation();
    }
    
    const nav = document.querySelector('.header-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!nav || !toggle || !overlay) return;
    
    nav.classList.remove('active');
    toggle.classList.remove('active');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    
    // Retirer listener Escape
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
}

// Fonction pour gérer le scroll avec offset pour le header fixe
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (!section) return;
    
    const isMobileView = window.innerWidth <= 768;
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const extraOffset = 20; // Marge supplémentaire
    
    // Position de la section
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    
    // Calculer la position finale
    const scrollPosition = isMobileView 
        ? sectionTop - headerHeight - extraOffset 
        : sectionTop - headerHeight;
    
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

// Initialiser la gestion du menu mobile
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.header-nav a');
    
    // Ajouter listener au bouton toggle
    if (toggle) {
        toggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fermer le menu au clic sur l'overlay
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Fermer le menu au clic sur un lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si c'est une ancre interne
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // Fermer le menu d'abord
                closeMobileMenu();
                
                // Puis scroller avec un délai pour permettre la fermeture du menu
                setTimeout(() => {
                    scrollToSection(href);
                }, 300);
            }
        });
    });
}

// ==================== ANIMATIONS DE SCROLL ====================

// Détection mobile
function isMobile() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Détection tactile
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Créer la barre de progression
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);
    return progressBar;
}

// Mettre à jour la barre de progression
function updateScrollProgress(progressBar) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight);
    progressBar.style.transform = `scaleX(${scrollPercentage})`;
}

// Intersection Observer pour les animations au scroll
function initScrollAnimations() {
    // Ajuster les options selon l'appareil
    const observerOptions = {
        threshold: isMobile() ? 0.05 : 0.1, // Réduit pour commencer plus tôt
        rootMargin: isMobile() ? '0px 0px -30px 0px' : '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter un petit délai pour éviter trop d'animations simultanées
                requestAnimationFrame(() => {
                    entry.target.classList.add('revealed');
                });
                // Une fois révélé, on peut arrêter d'observer cet élément
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec les classes scroll-reveal
    const revealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    
    // Observer progressivement pour éviter la surcharge initiale
    revealElements.forEach((el, index) => {
        // Petit délai entre chaque observation
        setTimeout(() => {
            observer.observe(el);
        }, index * 10); // 10ms entre chaque
    });
}

// Effet parallax subtil sur les éléments de fond (désactivé sur mobile)
function initParallax() {
    // Désactiver le parallax sur mobile pour de meilleures performances
    if (isMobile()) {
        return;
    }
    
    const parallaxElements = document.querySelectorAll('.hero::before, .stats-section::before, .features-section::before, .use-cases::before, .pricing::before');
    
    // Utiliser Intersection Observer pour n'animer que les éléments visibles
    const observerOptions = {
        threshold: 0,
        rootMargin: '100px'
    };
    
    const visibleSections = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const beforeElement = entry.target.querySelector('::before') || entry.target;
            if (entry.isIntersecting) {
                visibleSections.add(entry.target);
            } else {
                visibleSections.delete(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les sections parentes
    parallaxElements.forEach(el => {
        const section = el.parentElement;
        if (section) {
            observer.observe(section);
        }
    });
    
    let ticking = false;
    let lastScrollPos = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        
        // N'animer que si le scroll a changé significativement (throttling)
        if (Math.abs(currentScrollPos - lastScrollPos) < 5) {
            return;
        }
        
        lastScrollPos = currentScrollPos;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Animer seulement les sections visibles
                parallaxElements.forEach((el) => {
                    const section = el.parentElement;
                    if (visibleSections.has(section)) {
                        const sectionTop = section.offsetTop;
                        const offset = (currentScrollPos - sectionTop) * 0.2; // Réduit de 0.3 à 0.2
                        el.style.transform = `translateY(${offset}px) translateY(-50%)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

// Animation fluide pour les stats au scroll
function animateStatsOnScroll() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsSection.dataset.animated) {
                statsSection.dataset.animated = 'true';
                
                // Animer les chiffres
                const statNumbers = statsSection.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 300);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

// Animation du header - maintenant géré dans initOptimizedScrollHandler
// Cette fonction est conservée pour compatibilité mais ne fait plus rien
function animateHeaderOnScroll() {
    // Déprécié - Géré par initOptimizedScrollHandler
}

// Animation pour les transitions entre sections
function animateSectionTransitions() {
    const transitions = document.querySelectorAll('.section-transition');
    
    transitions.forEach(transition => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transition.style.transform = 'scale(1.02)';
                } else {
                    transition.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(transition);
    });
}

// Gestion du redimensionnement
function handleResize() {
    let resizeTimer;
    let lastWidth = window.innerWidth;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentWidth = window.innerWidth;
            
            // Réinitialiser certaines animations si changement significatif
            if (Math.abs(currentWidth - lastWidth) > 100) {
                lastWidth = currentWidth;
                
                // Recalculer les positions du carrousel
                if (typeof updateCarousel === 'function') {
                    updateCarousel(false);
                }
            }
        }, 250);
    }, { passive: true });
}

// Optimiser le scroll sur mobile
function optimizeMobileScroll() {
    if (isMobile() && isTouchDevice()) {
        // Améliorer la fluidité du scroll sur iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // S'assurer que les inputs ont la bonne taille de font (16px minimum)
        // pour éviter le zoom automatique sur iOS
        const inputs = document.querySelectorAll('input:not([type="range"]), select, textarea');
        inputs.forEach(input => {
            const computedStyle = window.getComputedStyle(input);
            const fontSize = parseFloat(computedStyle.fontSize);
            
            // Si la taille de police est inférieure à 16px, la forcer à 16px
            if (fontSize < 16) {
                input.style.fontSize = '16px';
            }
        });
    }
}

// Gestionnaire de scroll unique et optimisé
function initOptimizedScrollHandler() {
    const progressBar = createScrollProgress();
    const header = document.querySelector('.main-header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    let ticking = false;
    let lastKnownScrollPosition = 0;
    
    // Fonction unique pour tous les traitements de scroll
    function handleScroll(scrollPos) {
        // Barre de progression
        updateScrollProgress(progressBar);
        
        // Header
        if (scrollPos > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Bouton back-to-top
        if (backToTopBtn) {
            if (scrollPos > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }
    
    // Event listener optimisé avec requestAnimationFrame
    window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Initialiser toutes les animations au chargement
function initAllScrollAnimations() {
    // Utiliser le gestionnaire de scroll optimisé
    initOptimizedScrollHandler();
    
    // Initialiser les animations
    initScrollAnimations();
    
    // Parallax seulement sur desktop
    if (!isMobile()) {
        initParallax();
    }
    
    animateStatsOnScroll();
    animateSectionTransitions();
    handleResize();
    optimizeMobileScroll();
}

// Initialisation progressive pour de meilleures performances
window.addEventListener('DOMContentLoaded', () => {
    // Initialiser les éléments critiques immédiatement
    initMobileMenu();
    initOptimizedScrollHandler();
    
    // Initialiser les animations après un court délai
    setTimeout(() => {
        initScrollAnimations();
        animateStatsOnScroll();
        animateSectionTransitions();
        optimizeMobileScroll();
    }, 100);
    
    // Initialiser le parallax (desktop uniquement) après les animations
    if (!isMobile()) {
        setTimeout(() => {
            initParallax();
        }, 300);
    }
    
    // Initialiser le carousel en dernier (chargement différé)
    setTimeout(() => {
        initCarousel();
    }, 500);
    
    // Gestion du redimensionnement
    handleResize();
});

function initCarousel() {
    // Carrousel infini centré
    const track = document.querySelector('.carousel-track');
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const itemsOriginal = Array.from(document.querySelectorAll('.use-case-item'));
    
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let isAnimating = false;

    // Créer un carrousel infini en clonant les items
    function createInfiniteCarousel() {
        // Cloner les items 3 fois (avant, original, après)
        const clonesBefore = itemsOriginal.map(item => item.cloneNode(true));
        const clonesAfter = itemsOriginal.map(item => item.cloneNode(true));
        
        // Ajouter les clones avant
        clonesBefore.reverse().forEach(clone => {
            track.insertBefore(clone, track.firstChild);
        });
        
        // Ajouter les clones après
        clonesAfter.forEach(clone => {
            track.appendChild(clone);
        });
        
        // Position initiale sur les vrais items
        currentIndex = itemsOriginal.length;
        updateCarousel(false);
    }
    
    // Créer les dots
    function createDots() {
        dotsContainer.innerHTML = '';
        itemsOriginal.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Mettre à jour le carrousel
    function updateCarousel(animated = true) {
        const items = Array.from(track.children);
        const itemWidth = items[0].offsetWidth;
        const gap = 15;
        const containerWidth = track.parentElement.offsetWidth;
        const offset = containerWidth / 2 - itemWidth / 2 - currentIndex * (itemWidth + gap);
        
        if (animated) {
            isAnimating = true;
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            track.classList.add('transitioning');
            
            // Réactiver les transitions des cards après l'animation du track
            setTimeout(() => {
                track.classList.remove('transitioning');
                // Forcer le recalcul des styles des cards
                items.forEach(item => {
                    item.style.transition = 'all 0.4s ease';
                });
                
                // Vérifier si on doit boucler APRÈS l'animation
                checkLoop();
                
                // Remettre isAnimating à false APRÈS checkLoop
                setTimeout(() => {
                    isAnimating = false;
                }, 50);
            }, 400);
        } else {
            track.style.transition = 'none';
            track.classList.remove('transitioning');
            items.forEach(item => {
                item.style.transition = 'none';
            });
            
            // Réactiver les transitions après le saut instantané
            setTimeout(() => {
                items.forEach(item => {
                    item.style.transition = 'all 0.4s ease';
                });
            }, 50);
        }
        
        track.style.transform = `translateX(${offset}px)`;
        currentTranslate = offset;
        prevTranslate = offset;
        
        // Mettre à jour les classes center et appliquer les transformations 3D
        items.forEach((item, index) => {
            const isCentered = index === currentIndex;
            item.classList.toggle('center', isCentered);
            
            if (!isCentered) {
                // Calculer la distance par rapport au centre
                const distance = index - currentIndex;
                const absDistance = Math.abs(distance);
                
                // Rotation basée sur la position (gauche ou droite)
                const rotationY = distance < 0 ? 8 : -8;
                
                // Réduire l'opacité et l'échelle en fonction de la distance
                const scale = Math.max(0.75, 0.85 - (absDistance - 1) * 0.05);
                const opacity = Math.max(0.3, 0.5 - (absDistance - 1) * 0.1);
                const translateZ = -80 - (absDistance - 1) * 20;
                
                item.style.transform = `scale(${scale}) rotateY(${rotationY}deg) translateZ(${translateZ}px)`;
                item.style.opacity = opacity;
                item.style.filter = 'brightness(0.9)';
            } else {
                item.style.transform = 'scale(1.08) translateZ(50px)';
                item.style.opacity = '1';
                item.style.filter = 'brightness(1)';
            }
        });
        
        // Mettre à jour les dots
        updateDots();
    }
    
    // Vérifier si on doit boucler
    function checkLoop() {
        if (currentIndex < itemsOriginal.length) {
            // On est dans les clones du début, aller à la vraie position
            currentIndex += itemsOriginal.length;
            updateCarousel(false);
        } else if (currentIndex >= itemsOriginal.length * 2) {
            // On est dans les clones de fin, revenir à la vraie position
            currentIndex -= itemsOriginal.length;
            updateCarousel(false);
        }
    }
    
    // Mettre à jour les dots
    function updateDots() {
        const dots = Array.from(dotsContainer.children);
        const realIndex = ((currentIndex - itemsOriginal.length) % itemsOriginal.length + itemsOriginal.length) % itemsOriginal.length;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    // Aller à une slide spécifique
    function goToSlide(index) {
        currentIndex = itemsOriginal.length + index;
        updateCarousel(true);
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel(true);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel(true);
    });
    
    // Touch/Mouse events pour le drag
    function touchStart(index) {
        return function(event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            track.classList.add('dragging');
        }
    }
    
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }
    
    function touchEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        cancelAnimationFrame(animationID);
        track.classList.remove('dragging');
        
        const movedBy = currentTranslate - prevTranslate;
        
        // Calculer quelle card est la plus proche du centre après le drag
        const items = Array.from(track.children);
        const itemWidth = items[0].offsetWidth;
        const gap = 15;
        const containerWidth = track.parentElement.offsetWidth;
        const centerPosition = containerWidth / 2;
        
        // Trouver la card la plus proche du centre
        let closestIndex = currentIndex;
        let closestDistance = Infinity;
        
        items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + itemWidth / 2 - Math.abs(currentTranslate);
            const distance = Math.abs(itemCenter - centerPosition);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        
        // Si on a bougé significativement ou si une autre card est plus proche, naviguer
        if (Math.abs(movedBy) > 50 || closestIndex !== currentIndex) {
            currentIndex = closestIndex;
        }
        
        updateCarousel(true);
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Click sur les cards pour naviguer
    function setupCardClicks() {
        const items = Array.from(track.children);
        items.forEach((item, index) => {
            // Supprimer les anciens listeners s'ils existent
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
        });
        
        // Réattacher sur les nouveaux items
        const newItems = Array.from(track.children);
        newItems.forEach((item, index) => {
            item.addEventListener('click', function(e) {
                // Ne pas naviguer si on est en train de drag
                if (Math.abs(currentTranslate - prevTranslate) > 10) {
                    return;
                }
                
                // Si ce n'est pas la card centrée, naviguer vers elle
                if (index !== currentIndex) {
                    currentIndex = index;
                    updateCarousel(true);
                }
            }, { capture: false });
            
            // Ajouter le style pointer
            item.style.cursor = 'pointer';
        });
    }
    
    // Ajouter les event listeners
    track.addEventListener('mousedown', touchStart(currentIndex));
    track.addEventListener('touchstart', touchStart(currentIndex));
    
    // Les événements mousemove et mouseup sur document pour continuer le drag même hors du track
    document.addEventListener('mousemove', touchMove);
    track.addEventListener('touchmove', touchMove);
    
    document.addEventListener('mouseup', touchEnd);
    track.addEventListener('touchend', touchEnd);
    
    // Empêcher le comportement par défaut
    track.addEventListener('contextmenu', e => e.preventDefault());
    track.addEventListener('dragstart', e => e.preventDefault());
    
    // Support clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
    
    // Responsive
    window.addEventListener('resize', () => {
        updateCarousel(false);
    });
    
    // Initialisation
    createInfiniteCarousel();
    createDots();
    
    // Petit délai pour s'assurer que tout est bien calculé
    setTimeout(() => {
        updateCarousel(false);
        setupCardClicks();
        
        // Afficher le carrousel avec un fade-in
        setTimeout(() => {
            wrapper.classList.add('loaded');
        }, 50);
    }, 100);
}
