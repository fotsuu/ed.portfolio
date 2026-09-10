/**
 * Eric E. Diamante - Modern Developer & AI Integration Portfolio
 * Interactive Functionality & Agent Simulation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initScreenshotLightbox();
  initDynamicTyping();
  initMinimalShowcases();
  initDenrModal();
  initProjectFiltering();
  initEmailCopy();
  initContactForm();
  initNavbarScroll();
  initMobileNav();
  initScrollReveal();
  initBackgroundAnimation();
  initCvModal();
  initAiVoiceBot();
});


/* ==========================================================================
   1. Dynamic Roles Typing Effect
   ========================================================================== */
function initDynamicTyping() {
  const target = document.getElementById('typedRole');
  if (!target) return;

  const roles = [
    'full-stack web applications',
    'custom AI automation workflows',
    'robust database systems',
    'high-performance software'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. Projects Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. One-Click Copy Email & Toast System
   ========================================================================== */
function initEmailCopy() {
  const copyButtons = [
    document.getElementById('quickCopyEmailNav'),
    document.getElementById('copyEmailBtn'),
    document.getElementById('copyDirectEmail')
  ];

  copyButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'diamanteeric0501@gmail.com';
      copyToClipboard(email);
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✓ Copied: ${text}`);
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`✓ Copied: ${text}`);
  } catch (err) {
    showToast(`Email: ${text}`);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   9. Contact Form Simulation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('senderMessage').value;

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Message Prepared!</span>`;
      showToast(`Thank you, ${name}! Your inquiry has been processed.`);

      const subject = encodeURIComponent(`Opportunity regarding ${projectType} from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nFocus: ${projectType}\n\nMessage:\n${message}`);
      window.open(`mailto:diamanteeric0501@gmail.com?subject=${subject}&body=${body}`, '_blank');

      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   10. Sticky Navbar Scroll & Active Section Indicator
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   11. Local Time Indicator (GMT+8 Davao del Sur)
   ========================================================================== */
function initLocalTime() {
  const timeEl = document.getElementById('footerLocalTime');
  if (!timeEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    try {
      const formatted = new Intl.DateTimeFormat([], options).format(now);
      timeEl.textContent = `Davao del Sur (GMT+8): ${formatted}`;
    } catch (err) {
      timeEl.textContent = `Philippines (GMT+8)`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   12. Mobile Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   13. Scroll Reveal Animations (Essential & Performant)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.section-header, .project-card, .skills-category-card, .pipeline-card, .timeline-item, .contact-card, .metric-item'
  );

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  elements.forEach(el => el.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '150px 0px 50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   14. Full-Page Dynamic Interactive Background Animation
   ========================================================================== */
function initBackgroundAnimation() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Particle configuration
  const particleCount = Math.min(Math.floor((width * height) / 22000), 75);
  const particles = [];
  const colors = [
    'rgba(34, 211, 238, ',  // Cyan
    'rgba(99, 102, 241, ',  // Indigo
    'rgba(147, 197, 253, ', // Sky
    'rgba(168, 85, 247, '   // Violet
  ];

  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    radius: 140,
    isActive: false
  };

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 1.5 + 0.8;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
      this.alpha = this.baseAlpha;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -(Math.random() * 0.45 + 0.15); // gentle upward drift
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.12;

      // Mouse interactive deflection
      if (mouse.isActive) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.7;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.reset(false);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${Math.max(0, this.alpha)})`;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connect close particles with faint network web lines
  function drawConnections() {
    const maxDist = 105;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.11;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  // Draw soft cursor spotlight glow on the canvas
  function drawCursorGlow() {
    if (!mouse.isActive) return;
    const gradient = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      0,
      mouse.x,
      mouse.y,
      180
    );
    gradient.addColorStop(0, 'rgba(34, 211, 238, 0.05)');
    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.02)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
    ctx.fill();
  }

  let animationFrameId;
  let isRunning = true;

  function animate() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse coordinates
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    drawCursorGlow();
    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  animate();

  // Mouse move listener
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isActive = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.length = 0;
      const newCount = Math.min(Math.floor((width * height) / 22000), 75);
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle());
      }
    }, 150);
  });

  // Pause when tab not visible to save battery/CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      if (!prefersReducedMotion) {
        animate();
      }
    }
  });
}

/* ==========================================================================
   10. Interactive CV Modal Viewer
   ========================================================================== */
function initCvModal() {
  const modal = document.getElementById('cvModal');
  const closeBtn = document.getElementById('cvModalClose');
  const triggerBtns = document.querySelectorAll('.view-cv-btn');

  if (!modal) return;

  function openCvModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', openCvModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCvModal();
    });
  }

  // Close when clicking outside the window
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCvModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCvModal();
    }
  });
}

/* ==========================================================================
   11. Interactive 3D Cyber Model Bot Engine with Real-Time Subtitles
   ========================================================================== */
function initAiVoiceBot() {
  const botContainer = document.getElementById('aiModelBot');
  if (!botContainer) return;

  const modelEntity = document.getElementById('modelBotEntity');
  const subtitlePill = document.getElementById('aiSubtitlePill');
  const subtitleText = document.getElementById('aiSubtitleText');
  const botTagText = document.getElementById('botTagText');

  // Warm, natural conversational sentences spoken like a human
  const scriptSentences = [
    "Hi there! Welcome to Eric's portfolio.",
    "I'm his AI companion, and I'm excited to show you around.",
    "Eric is a skilled Software Developer and AI Integration Specialist.",
    "He builds full-stack web apps, database systems, and custom AI automations.",
    "Feel free to click me anytime to pause, or explore his projects and CV below!"
  ];

  let currentSentenceIndex = 0;
  let isSpeaking = false;
  let hasAutoPlayed = false;
  let availableVoices = [];

  const synth = window.speechSynthesis;

  function loadVoices() {
    if (!synth) return;
    availableVoices = synth.getVoices();
  }

  if (synth) {
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }

  function getBestVoice() {
    if (!availableVoices || availableVoices.length === 0) {
      if (synth) availableVoices = synth.getVoices();
    }
    if (!availableVoices || availableVoices.length === 0) return null;

    const enVoices = availableVoices.filter(v => v.lang && v.lang.startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : availableVoices;

    // Prioritize high-definition human neural & natural voices (Edge/Chrome/macOS/Windows 11)
    const humanVoicePreferences = [
      'Christopher Online (Natural)',
      'Guy Online (Natural)',
      'Eric Online (Natural)',
      'Jenny Online (Natural)',
      'Aria Online (Natural)',
      'Natural',
      'Neural',
      'Google US English',
      'Google UK English Male',
      'Google UK English Female',
      'Samantha',
      'Daniel',
      'Alex',
      'Microsoft Zira',
      'Microsoft Mark'
    ];

    for (const pref of humanVoicePreferences) {
      const match = pool.find(v => v.name && v.name.includes(pref));
      if (match) return match;
    }

    // Avoid legacy robotic Windows SAPI desktop David if another English voice is available
    const nonRobotic = pool.find(v => !v.name.includes('David') && !v.name.includes('Desktop'));
    return nonRobotic || pool[0];
  }

  function setPlayingState(playing) {
    isSpeaking = playing;
    if (playing) {
      botContainer.classList.add('speaking');
      if (botTagText) botTagText.textContent = 'SPEAKING...';
      if (subtitlePill) subtitlePill.classList.remove('hidden');
    } else {
      botContainer.classList.remove('speaking');
      if (botTagText) botTagText.textContent = 'CLICK TO TALK';
      if (subtitlePill) subtitlePill.classList.add('hidden');
    }
  }

  function speakNextSentence() {
    if (!synth) return;

    if (currentSentenceIndex >= scriptSentences.length) {
      setPlayingState(false);
      currentSentenceIndex = 0;
      return;
    }

    const currentLine = scriptSentences[currentSentenceIndex];
    if (subtitleText) {
      subtitleText.textContent = `"${currentLine}"`;
    }

    const utterance = new SpeechSynthesisUtterance(currentLine);
    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || 'en-US';
    }

    // Human conversational tuning: articulate speed with warm vocal pitch
    utterance.rate = 0.96;
    utterance.pitch = 1.02;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setPlayingState(true);
    };

    utterance.onend = () => {
      if (!isSpeaking) return;
      currentSentenceIndex++;
      // Small natural pause between sentences
      setTimeout(() => {
        if (isSpeaking) {
          speakNextSentence();
        }
      }, 250);
    };

    utterance.onerror = () => {
      setPlayingState(false);
      currentSentenceIndex = 0;
    };

    synth.speak(utterance);
  }

  function startSpeech() {
    if (!synth) return;
    synth.cancel();
    currentSentenceIndex = 0;
    isSpeaking = true;
    speakNextSentence();
  }

  function stopSpeech() {
    isSpeaking = false;
    currentSentenceIndex = 0;
    if (synth) {
      synth.cancel();
    }
    setPlayingState(false);
  }

  // Attempt automatic speech on arrival
  function triggerAutoIntro() {
    if (hasAutoPlayed) return;
    hasAutoPlayed = true;

    setTimeout(() => {
      startSpeech();
    }, 700);
  }

  // Browser Autoplay Policy: Listen for first interaction to unlock audio
  function handleFirstUserGesture() {
    if (hasAutoPlayed) return;
    triggerAutoIntro();
    removeGestureListeners();
  }

  function removeGestureListeners() {
    document.removeEventListener('click', handleFirstUserGesture);
    document.removeEventListener('touchstart', handleFirstUserGesture);
    document.removeEventListener('keydown', handleFirstUserGesture);
    window.removeEventListener('scroll', handleFirstUserGesture);
  }

  document.addEventListener('click', handleFirstUserGesture);
  document.addEventListener('touchstart', handleFirstUserGesture);
  document.addEventListener('keydown', handleFirstUserGesture);
  window.addEventListener('scroll', handleFirstUserGesture);

  // Immediate attempt for browsers with autoplay granted
  setTimeout(() => {
    if (!hasAutoPlayed) {
      try {
        triggerAutoIntro();
      } catch (e) {
        // Fallback waiting for gesture
      }
    }
  }, 900);

  // Click on the 3D Robot Model Entity to toggle talking / pause
  if (modelEntity) {
    modelEntity.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isSpeaking) {
        stopSpeech();
      } else {
        startSpeech();
      }
    });
  }
}


/* ==========================================================================
   MINIMALIST SHOWCASE ENGINE: Animated Slideshow & Dynamic Lightbox
   ========================================================================== */
function initMinimalShowcases() {
  // 1. FeedWise Animated Slideshow
  const carousel = document.getElementById('feedwiseCarousel');
  if (carousel) {
    const track = document.getElementById('fwTrack');
    const viewport = document.getElementById('fwViewport');
    const prevBtn = document.getElementById('fwPrevBtn');
    const nextBtn = document.getElementById('fwNextBtn');
    const slides = carousel.querySelectorAll('.minimal-slide');
    const dots = carousel.querySelectorAll('.minimal-dot');
    const totalSlides = slides.length;

    let currentSlide = 0;
    const AUTOPLAY_DELAY = 4500;
    let autoplayTimer = null;
    let isHovered = false;

    function setSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;

      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }

      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      const counterEl = document.getElementById('fwSlideCounter');
      if (counterEl) {
        counterEl.textContent = `Slide ${currentSlide + 1} / ${totalSlides}`;
      }
    }

    function goNext() {
      setSlide(currentSlide + 1);
    }

    function goPrev() {
      setSlide(currentSlide - 1);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goPrev();
        restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goNext();
        restartAutoplay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlide(idx);
        restartAutoplay();
      });
    });

    function startAutoplay() {
      stopAutoplay();
      if (!isHovered) {
        autoplayTimer = setInterval(goNext, AUTOPLAY_DELAY);
      }
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    carousel.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });

    carousel.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoplay();
    });

    // Touch Swipe Support for Mobile Devices
    let touchStartX = 0;
    let touchEndX = 0;
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 40) {
          if (swipeDistance < 0) {
            goNext();
          } else {
            goPrev();
          }
          restartAutoplay();
        }
      }, { passive: true });
    }

    // Keyboard navigation when hovering or focusing the carousel
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        goNext();
        restartAutoplay();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
        restartAutoplay();
      }
    });

    // Slide click triggers universal lightbox
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        const src = slide.getAttribute('data-src') || slide.querySelector('img')?.src;
        const title = slide.getAttribute('data-title') || 'FeedWise';
        if (src && typeof openLightbox === 'function') {
          openLightbox(src, title, 'Full-resolution interface screenshot of FeedWise.');
        }
      });
    });

    // Fullscreen Action Button on FeedWise card
    const fwFullscreenBtn = document.getElementById('fwOpenLightboxBtn');
    if (fwFullscreenBtn) {
      fwFullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const activeSlide = slides[currentSlide];
        const src = activeSlide?.getAttribute('data-src') || 'feedwise-hero.png';
        const title = activeSlide?.getAttribute('data-title') || 'FeedWise';
        if (typeof openLightbox === 'function') {
          openLightbox(src, title, 'Full-resolution interface screenshot of FeedWise.');
        }
      });
    }

    // Initialize first slide and start autoplay
    setSlide(0);
    startAutoplay();
  }

  // 2. RLTA Barangay Inventory Frame & Fullscreen Button Click to Lightbox
  const rltaFrame = document.getElementById('rltaPreviewFrame');
  const rltaFullscreenBtn = document.getElementById('rltaOpenLightboxBtn');

  function openRltaModal(e) {
    if (e) e.stopPropagation();
    const src = rltaFrame?.getAttribute('data-src') || 'denr-dashboard.png';
    const title = rltaFrame?.getAttribute('data-title') || 'RLTA Barangay Inventory of Davao del Sur';
    if (typeof openLightbox === 'function') {
      openLightbox(
        src,
        title,
        'Cadastral land inventory and assessment platform deployed at DENR-CENRO Davao del Sur.'
      );
    }
  }

  if (rltaFrame) {
    rltaFrame.addEventListener('click', openRltaModal);
  }

  if (rltaFullscreenBtn) {
    rltaFullscreenBtn.addEventListener('click', openRltaModal);
  }
}

/* ==========================================================================
   DENR-CENRO DAVAO DEL SUR: Deployed System Modal Presentation
   ========================================================================== */
function initDenrModal() {
  const modal = document.getElementById('denrModal');
  const openBtn = document.getElementById('openDenrModalBtn');
  const cardTrigger = document.getElementById('denrCardTrigger');
  const closeBtn = document.getElementById('denrModalClose');
  const imgWrap = document.getElementById('denrModalImgWrap');

  if (!modal) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (cardTrigger) cardTrigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Clicking on screenshot in modal triggers full resolution lightbox
  if (imgWrap) {
    imgWrap.addEventListener('click', () => {
      openLightbox(
        'denr-dashboard.png',
        'DENR CENRO Davao del Sur: Land Inventory & RLTA Dashboard',
        'Cadastral database system deployed at DENR-CENRO Davao del Sur. Shows 7 municipalities tracking with automated barangay remaining & balance computations.'
      );
    });
  }
}

/* ==========================================================================
   Universal Screenshot Lightbox Modal Engine
   ========================================================================== */
let openLightbox = null;

function initScreenshotLightbox() {
  const lightboxModal = document.getElementById('screenshotLightboxModal');
  const overlay = document.getElementById('lightboxOverlay');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  const newTabBtn = document.getElementById('lightboxNewTabBtn');

  if (!lightboxModal || !imgEl) return;

  openLightbox = function(src, title, caption) {
    imgEl.src = src;
    imgEl.alt = title || 'Project Screenshot';
    if (titleEl) titleEl.textContent = title || 'System Screenshot';
    if (captionEl) captionEl.textContent = caption || '';
    if (newTabBtn) newTabBtn.href = src;

    lightboxModal.classList.add('is-open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    // Only restore scroll if denr modal isn't open
    const denrModal = document.getElementById('denrModal');
    if (!denrModal || !denrModal.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  }

  if (overlay) overlay.addEventListener('click', closeLightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Attach click listener to all zoom buttons and screenshot containers
  const zoomBtns = document.querySelectorAll('.btn-zoom-screenshot');
  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-img-src');
      const title = btn.getAttribute('data-title');
      const caption = btn.getAttribute('data-caption');
      if (src && openLightbox) {
        openLightbox(src, title, caption);
      }
    });
  });

  const screenshotWraps = document.querySelectorAll('.screenshot-img-wrap');
  screenshotWraps.forEach(wrap => {
    wrap.addEventListener('click', () => {
      const src = wrap.getAttribute('data-img-src');
      const title = wrap.getAttribute('data-title');
      const caption = wrap.getAttribute('data-caption');
      if (src && openLightbox) {
        openLightbox(src, title, caption);
      }
    });
  });
}



