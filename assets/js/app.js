'use strict';
// ------- Osmo [https://osmo.supply/] ------- //

// GSAP & Parallax Layers
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});

/* Lenis for smooth scrolling */
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll animation
  const header = document.querySelector('header');
  if (header) { 
    const scrollThreshold = 50;
    window.addEventListener('scroll', function() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Section scroll animations
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        const elements = entry.target.querySelectorAll('.animate-on-scroll');
        elements.forEach((el, index) => {
          setTimeout(() => { el.classList.add('visible'); }, 150 * index);
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px'
  });
  sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
  });

  // Trouble Cards Animation
  const troubleCards = document.querySelectorAll('.trouble-card');
  troubleCards.forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${0.1 * index}s`;
    card.addEventListener('mouseenter', function() { this.classList.add('hovered'); });
    card.addEventListener('mouseleave', function() { this.classList.remove('hovered'); });
  });

  // Animate Text Blocks, Video Placeholders & Image Containers
  document.querySelectorAll('.text-block, .video-placeholder, .image-container').forEach((element, index) => {
    element.classList.add('animate-on-scroll');
    element.style.transitionDelay = `${0.1 * index}s`;
  });
  document.querySelectorAll('h3, p').forEach((element, index) => {
    element.classList.add('animate-on-scroll');
    element.style.transitionDelay = `${0.05 * index}s`;
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ----- Depression Effect -----
  const depressionCard = document.getElementById('depression-card');
  const depressionTroublesSection = document.querySelector('.troubles-section');
  if (depressionCard && depressionTroublesSection) {
    depressionCard.addEventListener('mouseenter', function() {
      depressionTroublesSection.classList.add('depression-effect-active');
    });
    depressionCard.addEventListener('mouseleave', function() {
      // Utiliser setTimeout pour créer un délai avant de retirer la classe
      // Cela permet une transition plus douce à la sortie
      setTimeout(() => {
        depressionTroublesSection.classList.remove('depression-effect-active');
      }, 100);
    });
  }

  // ----- PTSD Effect & Sound -----
  const ptsdCard = document.getElementById('ptsd-card');
  const heartbeatSound = document.getElementById('heartbeat-sound');
  const ptsdTroublesSection = document.querySelector('.troubles-section');
  
  if (ptsdCard && heartbeatSound && ptsdTroublesSection) {
    heartbeatSound.volume = 0.4; // Volume légèrement réduit pour être moins intrusif
    
    // Fonction pour gérer l'entrée de la souris sur le bloc PTSD
    ptsdCard.addEventListener('mouseenter', function() {
      // Jouer le son de battement de cœur
      if (!document.body.classList.contains('effects-disabled-mode')) {
        heartbeatSound.currentTime = 0;
        const playPromise = heartbeatSound.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => { console.log("La lecture automatique a été bloquée par le navigateur."); });
        }
      }
      
      // Ajouter la classe pour activer l'effet
      ptsdTroublesSection.classList.add('ptsd-effect-active');
    });
    
    // Fonction pour gérer la sortie de la souris du bloc PTSD
    ptsdCard.addEventListener('mouseleave', function() {
      // Arrêter le son de battement de cœur avec un fade out
      if (!heartbeatSound.paused) {
        // Créer un fade out du son
        const fadeOutInterval = setInterval(function() {
          if (heartbeatSound.volume > 0.05) {
            heartbeatSound.volume -= 0.05;
          } else {
            heartbeatSound.pause();
            heartbeatSound.currentTime = 0;
            heartbeatSound.volume = 0.4; // Réinitialiser le volume
            clearInterval(fadeOutInterval);
          }
        }, 50);
      }
      
      // Retirer la classe avec un délai pour une transition plus douce
      setTimeout(() => {
        ptsdTroublesSection.classList.remove('ptsd-effect-active');
      }, 1500); // Délai plus long pour un retour plus progressif à la normale
    });
    
    // Initialiser l'audio pour éviter les problèmes d'autoplay
    document.addEventListener('click', function initAudio() {
      heartbeatSound.play().then(() => {
        heartbeatSound.pause();
        heartbeatSound.currentTime = 0;
      }).catch(e => { console.log("Erreur lors de l'initialisation du son:", e); });
      document.removeEventListener('click', initAudio);
    }, { once: true });
  }

  // ----- Anxiety Effect & Sound -----
  const anxietyCard = document.getElementById('anxiety-card');
  const breathingSound = document.getElementById('breathing-sound');
  const anxietyTroublesSection = document.querySelector('.troubles-section');
  if (anxietyCard && breathingSound && anxietyTroublesSection) {
    breathingSound.volume = 0.3;
    anxietyCard.addEventListener('mouseenter', function() {
      if (!document.body.classList.contains('effects-disabled-mode')) {
        breathingSound.currentTime = 0;
        const playPromise = breathingSound.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => { console.log("La lecture automatique a été bloquée par le navigateur."); });
        }
      }
      anxietyTroublesSection.classList.add('anxiety-effect-active');
    });
    anxietyCard.addEventListener('mouseleave', function() {
      if (!breathingSound.paused) {
        breathingSound.pause();
        breathingSound.currentTime = 0;
      }
      anxietyTroublesSection.classList.remove('anxiety-effect-active');
    });
  }

  // ----- Image Container Hover (for personnage section) -----
  const imagePlaceholder = document.querySelector('.image-container');
  if (imagePlaceholder) {
    imagePlaceholder.addEventListener('mouseenter', function() { this.classList.add('image-hover'); });
    imagePlaceholder.addEventListener('mouseleave', function() { this.classList.remove('image-hover'); });
  }

  // ----- Logo Hover Animation -----
  const logo = document.querySelector('.logo img');
  if (logo) {
    logo.addEventListener('mouseenter', function() { this.style.animation = 'rotateIn 0.5s ease-out'; });
    logo.addEventListener('mouseleave', function() { this.style.animation = 'pulse 2s infinite'; });
  }

  // ----- Parallax Effect on Sections -----
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.querySelectorAll('section').forEach(section => {
      const speed = 0.05;
      const yPos = -(scrollPosition * speed);
      section.style.backgroundPosition = `center ${yPos}px`;
    });
  });

  // ----- Toggle Effects Button -----
  const toggleEffectsBtn = document.getElementById('toggle-effects');
  if (toggleEffectsBtn) {
    // Vérifier si l'état est enregistré dans le localStorage
    const effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';
    
    // Appliquer l'état initial
    if (effectsDisabled) {
      document.body.classList.add('effects-disabled-mode');
      toggleEffectsBtn.classList.add('effects-disabled');
      toggleEffectsBtn.textContent = 'Augmenter l\'effet';
      // Arrêter tous les sons
      document.querySelectorAll('audio').forEach(audio => { 
        audio.pause(); 
        audio.currentTime = 0; 
      });
    } else {
      // S'assurer que le bouton est dans l'état correct
      document.body.classList.remove('effects-disabled-mode');
      toggleEffectsBtn.classList.remove('effects-disabled');
      toggleEffectsBtn.textContent = 'Réduire l\'effet';
    }
    
    // Ajouter l'écouteur d'événement avec animation
    toggleEffectsBtn.addEventListener('click', function() {
      const isCurrentlyDisabled = document.body.classList.contains('effects-disabled-mode');
      
      // Animation du bouton au clic
      this.classList.add('button-clicked');
      setTimeout(() => {
        this.classList.remove('button-clicked');
      }, 300);
      
      if (isCurrentlyDisabled) {
        // Activer les effets
        document.body.classList.remove('effects-disabled-mode');
        toggleEffectsBtn.classList.remove('effects-disabled');
        toggleEffectsBtn.textContent = 'Réduire l\'effet';
        localStorage.setItem('effectsDisabled', 'false');
        
        // Animation de transition
        document.querySelectorAll('.trouble-card, .text-block').forEach(el => {
          el.style.transition = 'all 0.5s ease';
        });
      } else {
        // Désactiver les effets
        document.body.classList.add('effects-disabled-mode');
        toggleEffectsBtn.classList.add('effects-disabled');
        toggleEffectsBtn.textContent = 'Augmenter l\'effet';
        localStorage.setItem('effectsDisabled', 'true');
        
        // Arrêter tous les sons
        document.querySelectorAll('audio').forEach(audio => { 
          audio.pause(); 
          audio.currentTime = 0; 
        });
      }
    });
  }

  // ----- Animation pour les Shorts YouTube -----
  const shortItems = document.querySelectorAll('.short-item');
  
  shortItems.forEach((item, index) => {
    // Ajouter un délai progressif pour l'apparition
    item.style.animationDelay = `${0.3 + (index * 0.2)}s`;
    
    // Ajouter un effet de survol avec classe
    item.addEventListener('mouseenter', function() {
      this.classList.add('short-hovered');
    });
    
    item.addEventListener('mouseleave', function() {
      this.classList.remove('short-hovered');
    });
  });
  
  // Observer pour les animations au scroll
  const shortsSection = document.querySelector('.shorts-section');
  if (shortsSection) {
    const shortsSectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        shortsSection.classList.add('shorts-visible');
      }
    }, {
      threshold: 0.2
    });
    
    shortsSectionObserver.observe(shortsSection);
  }
});

// ----- Suppression des erreurs de console liées aux publicités -----
// Intercepter les erreurs de console liées aux bloqueurs de publicités
const originalConsoleError = console.error;
console.error = function() {
  // Filtrer les erreurs liées à googleads ou doubleclick
  if (arguments[0] && typeof arguments[0] === 'string' && 
      (arguments[0].includes('googleads') || arguments[0].includes('doubleclick'))) {
    // Ne pas afficher ces erreurs
    return;
  }
  // Sinon, utiliser le comportement normal
  return originalConsoleError.apply(console, arguments);
};

/* ---------- Particle Background (Ashes) ---------- */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size on window resize
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particle settings
const particleCount = 150;
const particles = [];

// Mouse object for interactivity
const mouse = {
  x: null,
  y: null,
  radius: 100 // Interaction radius
};

// Update mouse position on movement
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particle constructor: each "ash" is a small circle with a random gray shade.
function Particle(x, y, radius, vx, vy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.vx = vx;
  this.vy = vy;
  const shade = Math.floor(Math.random() * 100) + 100;
  this.color = 'rgba(' + shade + ',' + shade + ',' + shade + ',0.7)';
}

// Draw the particle
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// Update particle position and interaction
Particle.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x > canvas.width) this.x = 0;
  if (this.x < 0) this.x = canvas.width;
  if (this.y > canvas.height) this.y = 0;
  if (this.y < 0) this.y = canvas.height;
  let dx = mouse.x - this.x;
  let dy = mouse.y - this.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < mouse.radius) {
    let angle = Math.atan2(dy, dx);
    let force = (mouse.radius - distance) / mouse.radius;
    this.x -= force * Math.cos(angle) * 5;
    this.y -= force * Math.sin(angle) * 5;
  }
  this.draw();
};

// Create particles
function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    let radius = Math.random() * 2 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = (Math.random() - 0.5) * 0.5;
    particles.push(new Particle(x, y, radius, vx, vy));
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
}

initParticles();
animate();
