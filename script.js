/**
 * Eric E. Diamante - Modern Developer & AI Integration Portfolio
 * Interactive Functionality & Agent Simulation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicTyping();
  initProjectFiltering();
  initEmailCopy();
  initContactForm();
  initNavbarScroll();
  initLocalTime();
  initMobileNav();
  initScrollReveal();
  initBackgroundAnimation();
});


/* ==========================================================================
   1. Dynamic Roles Typing Effect
   ========================================================================== */
function initDynamicTyping() {
  const target = document.getElementById('typedRole');
  if (!target) return;

  const roles = [
    'Software Developer',
    'AI Workflow Engineer',
    'Database Systems Builder',
    'Data Quality Specialist'
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
          card.style.display = 'block';
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
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
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

