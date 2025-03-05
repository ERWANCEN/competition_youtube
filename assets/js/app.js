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
  const scrollThreshold = 50;
  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

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
      depressionTroublesSection.classList.remove('depression-effect-active');
    });
  }

  // ----- PTSD Effect & Sound -----
  const ptsdCard = document.getElementById('ptsd-card');
  const heartbeatSound = document.getElementById('heartbeat-sound');
  const ptsdTroublesSection = document.querySelector('.troubles-section');
  if (ptsdCard && heartbeatSound && ptsdTroublesSection) {
    heartbeatSound.volume = 0.5;
    ptsdCard.addEventListener('mouseenter', function() {
      if (!document.body.classList.contains('effects-disabled-mode')) {
        heartbeatSound.currentTime = 0;
        const playPromise = heartbeatSound.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => { console.log("La lecture automatique a été bloquée par le navigateur."); });
        }
      }
      ptsdTroublesSection.classList.add('ptsd-effect-active');
    });
    ptsdCard.addEventListener('mouseleave', function() {
      if (!heartbeatSound.paused) {
        heartbeatSound.pause();
        heartbeatSound.currentTime = 0;
      }
      ptsdTroublesSection.classList.remove('ptsd-effect-active');
    });
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
    const effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';
    if (effectsDisabled) {
      document.body.classList.add('effects-disabled-mode');
      toggleEffectsBtn.classList.add('effects-disabled');
      toggleEffectsBtn.textContent = 'Augmenter l\'effet';
      document.querySelectorAll('audio').forEach(audio => { audio.pause(); audio.currentTime = 0; });
    }
    toggleEffectsBtn.addEventListener('click', function() {
      const isCurrentlyDisabled = document.body.classList.contains('effects-disabled-mode');
      if (isCurrentlyDisabled) {
        document.body.classList.remove('effects-disabled-mode');
        toggleEffectsBtn.classList.remove('effects-disabled');
        toggleEffectsBtn.textContent = 'Réduire l\'effet';
        localStorage.setItem('effectsDisabled', 'false');
      } else {
        document.body.classList.add('effects-disabled-mode');
        toggleEffectsBtn.classList.add('effects-disabled');
        toggleEffectsBtn.textContent = 'Augmenter l\'effet';
        localStorage.setItem('effectsDisabled', 'true');
      }
      document.querySelectorAll('audio').forEach(audio => { audio.pause(); audio.currentTime = 0; });
    });
  }
});

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
