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

function copySMS() {
    const smsText = document.getElementById('smsPreview').textContent;
    navigator.clipboard.writeText(smsText).then(() => {
        alert('SMS copié dans le presse-papier ! ✓');
    });
}

// Attendre que tout soit chargé avant d'initialiser le carrousel
window.addEventListener('load', initCarousel);

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

