/**
 * ERIC DIAMANTE — PORTFOLIO JAVASCRIPT
 * Interactions, Smooth Navigation, Modals & Toast Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // ────────────────── TOAST UTILITY ──────────────────
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // ────────────────── MOBILE NAVIGATION ──────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ────────────────── SMOOTH CONTINUOUS SCROLL & NAVIGATION ──────────────────
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section');
  const NAV_HEIGHT = 72;
  let triggerMeshResize = null;

  function scrollToSection(targetId, updateHash = true) {
    if (!targetId || targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveNavLink('home');
      if (updateHash && window.location.hash !== '#home') {
        history.pushState(null, '', '#home');
      }
      return;
    }

    const section = document.getElementById(targetId);
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;
    window.scrollTo({ top: Math.max(0, Math.round(sectionTop)), behavior: 'smooth' });
    setActiveNavLink(targetId);

    if (updateHash && window.location.hash !== `#${targetId}`) {
      history.pushState(null, '', `#${targetId}`);
    }
  }

  function setActiveNavLink(targetId) {
    navLinks.forEach(link => {
      const page = link.getAttribute('data-page') || link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', page === targetId);
    });
  }

  // Navigation Links click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-page') || link.getAttribute('href')?.replace('#', '');
      if (target) scrollToSection(target);

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Buttons/links with data-navigate
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-navigate');
      if (target) scrollToSection(target);
    });
  });

  // Brand Logo navigates to Home
  const brandLogo = document.getElementById('brandLogo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('home');
    });
  }

  // ScrollSpy: Automatically update active nav link as user scrolls
  let isScrollSpyPending = false;
  function onScrollSpy() {
    if (isScrollSpyPending) return;
    isScrollSpyPending = true;
    requestAnimationFrame(() => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // When near the top, always highlight Home
      if (scrollY < 80) {
        setActiveNavLink('home');
        isScrollSpyPending = false;
        return;
      }

      // When near the bottom of the page, highlight Contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveNavLink('contact');
        isScrollSpyPending = false;
        return;
      }

      let currentSection = 'home';
      sections.forEach(section => {
        const top = section.offsetTop - NAV_HEIGHT - 120;
        if (scrollY >= top) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveNavLink(currentSection);
      isScrollSpyPending = false;
    });
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });

  // Handle browser back/forward buttons
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      scrollToSection(hash, false);
    } else {
      scrollToSection('home', false);
    }
  });

  // Initial page load from URL hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && initialHash !== 'home' && document.getElementById(initialHash)) {
    setTimeout(() => {
      scrollToSection(initialHash, false);
    }, 150);
  } else {
    setActiveNavLink('home');
  }

  // ────────────────── MODAL MANAGEMENT ──────────────────
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Setup close buttons and backdrops for all modals
  document.querySelectorAll('.app-modal').forEach(modal => {
    const id = modal.getAttribute('id');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const backdrop = modal.querySelector('.modal-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(id));
    if (backdrop) backdrop.addEventListener('click', () => closeModal(id));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.app-modal.active').forEach(modal => {
        closeModal(modal.getAttribute('id'));
      });
    }
  });

  // ────────────────── MODAL & NAVIGATION TRIGGERS ──────────────────
  // All Projects Modal
  const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
  if (viewAllProjectsBtn) {
    viewAllProjectsBtn.addEventListener('click', () => openModal('allProjectsModal'));
  }

  // CV Modal Triggers
  ['modalCvBtn', 'aboutCvBtn', 'contactPageCvBtn'].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        closeModal('contactModal');
        openModal('cvModal');
      });
    }
  });

  // DENR Screenshot Preview inside All Projects Modal
  const openDenrPreviewBtn = document.getElementById('openDenrPreviewBtn');
  if (openDenrPreviewBtn) {
    openDenrPreviewBtn.addEventListener('click', () => {
      openModal('denrModal');
    });
  }

  // Project Cards Click opens All Projects modal for more info
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking carousel controls
      if (e.target.closest('.carousel-controls')) return;
      openModal('allProjectsModal');
    });
  });

  // ────────────────── QUICK EMAIL COPY ──────────────────
  function setupEmailCopy(btnId, textId) {
    const btn = document.getElementById(btnId);
    const text = document.getElementById(textId);
    const emailVal = 'diamanteeric0501@gmail.com';
    if (!btn) return;

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(emailVal);
        if (text) text.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          if (text) text.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        const input = document.createElement('input');
        input.value = emailVal;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        if (text) text.textContent = 'Copied!';
        showToast('Email copied to clipboard!');
        setTimeout(() => {
          if (text) text.textContent = 'Copy';
        }, 2000);
      }
    });
  }

  setupEmailCopy('copyEmailBtn', 'copyEmailText');
  setupEmailCopy('contactPageCopyEmailBtn', 'contactPageCopyEmailText');

  // ────────────────── CONTACT FORM HANDLER ──────────────────
  function setupContactSubmission(formId, nameId, emailId, messageId, btnId, modalToClose) {
    const formEl = document.getElementById(formId);
    if (!formEl) return;

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById(nameId)?.value || '';
      const email = document.getElementById(emailId)?.value || '';
      const message = document.getElementById(messageId)?.value || '';

      const submitBtn = document.getElementById(btnId);
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
      }

      if (window.emailjs && typeof window.emailjs.send === 'function') {
        window.emailjs.send('service_default', 'template_default', {
          from_name: name,
          from_email: email,
          message: message,
          to_name: 'Eric Diamante'
        }).then(() => {
          showToast('Message sent successfully! Eric will reply soon.');
          formEl.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          if (modalToClose) closeModal(modalToClose);
        }).catch(() => {
          window.location.href = `mailto:diamanteeric0501@gmail.com?subject=Contact%20from%20Portfolio%20(${encodeURIComponent(name)})&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
          showToast('Opened your email client with pre-filled message.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          if (modalToClose) closeModal(modalToClose);
        });
      } else {
        window.location.href = `mailto:diamanteeric0501@gmail.com?subject=Contact%20from%20Portfolio%20(${encodeURIComponent(name)})&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
        showToast('Opened your email client with pre-filled message.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        if (modalToClose) closeModal(modalToClose);
      }
    });
  }

  setupContactSubmission('contactForm', 'formSenderName', 'formSenderEmail', 'formMessage', 'sendEmailBtn', 'contactModal');
  setupContactSubmission('contactPageForm', 'contactPageSenderName', 'contactPageSenderEmail', 'contactPageMessage', 'contactPageSendBtn', null);

  // ────────────────── 3D HERO INTERACTIVE PARALLAX ──────────────────
  const heroVisual = document.getElementById('heroVisual');
  const hero3dScene = document.getElementById('hero3dScene');
  const hero3dGlow = document.getElementById('hero3dGlow');
  const heroPortrait = document.getElementById('heroPortraitImg');

  if (heroVisual && hero3dScene) {
    let ticking = false;

    heroVisual.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroVisual.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Normalized tilt ratios (-1 to +1)
          const normX = (x - centerX) / centerX;
          const normY = (y - centerY) / centerY;

          const rotateX = normY * -14; // Pitch tilt
          const rotateY = normX * 14;  // Yaw tilt

          hero3dScene.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

          if (hero3dGlow) {
            hero3dGlow.style.transform = `translate(calc(-50% + ${(normX * 28).toFixed(1)}px), calc(-50% + ${(normY * 28).toFixed(1)}px)) translateZ(-40px)`;
          }

          if (heroPortrait) {
            heroPortrait.style.filter = `drop-shadow(${(-normX * 14).toFixed(1)}px ${(25 + normY * 10).toFixed(1)}px 35px rgba(37, 99, 235, 0.2)) drop-shadow(0 10px 15px rgba(15, 23, 42, 0.08))`;
          }

          ticking = false;
        });
        ticking = true;
      }
    });

    heroVisual.addEventListener('mouseleave', () => {
      hero3dScene.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (hero3dGlow) hero3dGlow.style.transform = 'translate(-50%, -50%) translateZ(-40px)';
      if (heroPortrait) {
        heroPortrait.style.filter = 'drop-shadow(0 25px 35px rgba(37, 99, 235, 0.14)) drop-shadow(0 10px 15px rgba(15, 23, 42, 0.08))';
      }
    });
  }

  // ────────────────── FEEDWISE CARD CAROUSEL (SHOWS BOTH IN 1 CARD) ──────────────────
  const fwCarousel = document.getElementById('feedwiseCarousel');
  if (fwCarousel) {
    const slides = fwCarousel.querySelectorAll('.carousel-slide');
    const dots = fwCarousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('fwPrevBtn');
    const nextBtn = document.getElementById('fwNextBtn');
    let currentSlide = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide + 1);
        resetAutoPlay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = parseInt(dot.getAttribute('data-index') || '0', 10);
        goToSlide(target);
        resetAutoPlay();
      });
    });

    function startAutoPlay() {
      autoPlayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4000);
    }

    function resetAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    fwCarousel.addEventListener('mouseenter', () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    });

    fwCarousel.addEventListener('mouseleave', () => {
      startAutoPlay();
    });

    startAutoPlay();
  }

  // ────────────────── DELICATE AMBIENT PARTICLE MESH (HERO) ──────────────────
  const heroMeshCanvas = document.getElementById('heroMeshCanvas');
  let meshAnimId = null;

  if (heroMeshCanvas && heroMeshCanvas.getContext) {
    const ctx = heroMeshCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    const mousePos = { x: -9999, y: -9999, active: false };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeMeshCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = heroMeshCanvas.getBoundingClientRect();
      width = rect.width || 480;
      height = rect.height || 480;
      heroMeshCanvas.width = Math.round(width * dpr);
      heroMeshCanvas.height = Math.round(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resizeMeshCanvas();
    triggerMeshResize = resizeMeshCanvas;
    window.addEventListener('resize', resizeMeshCanvas, { passive: true });

    // Track mouse position over heroVisual relative to canvas
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroMeshCanvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
        mousePos.active = true;
      }, { passive: true });

      heroVisual.addEventListener('mouseleave', () => {
        mousePos.active = false;
        mousePos.x = -9999;
        mousePos.y = -9999;
      });
    }

    // Initialize particle nodes
    const NODE_COUNT = 32;
    const nodes = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        radius: 1.2 + Math.random() * 1.4,
        baseAlpha: 0.28 + Math.random() * 0.35,
        accent: Math.random() > 0.75
      });
    }

    let isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !meshAnimId) {
          meshLoop();
        }
      }, { threshold: 0.05 });
      observer.observe(heroVisual || heroMeshCanvas);
    }

    function meshLoop() {
      if (!isVisible) {
        meshAnimId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update positions & physics
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle bounds bounce
          if (p.x < 10) { p.x = 10; p.vx = Math.abs(p.vx); }
          if (p.x > width - 10) { p.x = width - 10; p.vx = -Math.abs(p.vx); }
          if (p.y < 10) { p.y = 10; p.vy = Math.abs(p.vy); }
          if (p.y > height - 10) { p.y = height - 10; p.vy = -Math.abs(p.vy); }

          // Mouse gentle repulsion
          if (mousePos.active) {
            const dx = p.x - mousePos.x;
            const dy = p.y - mousePos.y;
            const dist = Math.hypot(dx, dy);
            const repelRadius = 95;

            if (dist < repelRadius && dist > 0.1) {
              const force = (repelRadius - dist) / repelRadius;
              const angle = Math.atan2(dy, dx);
              p.x += Math.cos(angle) * force * 1.8;
              p.y += Math.sin(angle) * force * 1.8;
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.accent) {
          ctx.fillStyle = `rgba(96, 165, 250, ${p.baseAlpha})`;
        } else {
          ctx.fillStyle = `rgba(37, 99, 235, ${p.baseAlpha})`;
        }
        ctx.fill();
      }

      // Draw hairline connecting lines between nearby nodes
      const maxConnectDist = 92;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const p1 = nodes[i];
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.16;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Subtle hairline tether to mouse
        if (mousePos.active) {
          const dx = nodes[i].x - mousePos.x;
          const dy = nodes[i].y - mousePos.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.18;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
          }
        }
      }

      meshAnimId = requestAnimationFrame(meshLoop);
    }

    meshLoop();
  }

  // ────────────────── 3D DYNAMIC GLARE & TILT (PROJECT CARDS) ──────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    let cardTicking = false;

    card.addEventListener('mousemove', (e) => {
      if (!cardTicking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const normX = (x - centerX) / centerX;
          const normY = (y - centerY) / centerY;

          const rotateX = -normY * 7;  // Pitch tilt
          const rotateY = normX * 7;   // Yaw tilt

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) translateZ(8px)`;
          card.style.setProperty('--glare-x', `${x.toFixed(1)}px`);
          card.style.setProperty('--glare-y', `${y.toFixed(1)}px`);

          const shadowX = (-normX * 8).toFixed(1);
          const shadowY = (14 + normY * 6).toFixed(1);
          card.style.boxShadow = `${shadowX}px ${shadowY}px 32px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(37, 99, 235, 0.07)`;

          cardTicking = false;
        });
        cardTicking = true;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateZ(0px)';
      card.style.boxShadow = '';
    });
  });

  // ────────────────── MAGNETIC PHYSICS (BUTTONS & ICONS) ──────────────────
  const magneticElements = document.querySelectorAll('.magnetic-btn');

  if (magneticElements.length > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const PULL_RADIUS = 35; // Magnetize within 35px

    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      magneticElements.forEach(el => {
        const rect = el.getBoundingClientRect();

        // Quick bounding box check + padding
        if (
          mouseX < rect.left - PULL_RADIUS ||
          mouseX > rect.right + PULL_RADIUS ||
          mouseY < rect.top - PULL_RADIUS ||
          mouseY > rect.bottom + PULL_RADIUS
        ) {
          if (el._isMagnetized) {
            el.style.transform = 'translate(0px, 0px)';
            el.classList.remove('is-magnetized');
            el._isMagnetized = false;
          }
          return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        const dist = Math.hypot(deltaX, deltaY);
        const maxDist = Math.max(rect.width, rect.height) / 2 + PULL_RADIUS;

        if (dist < maxDist) {
          const power = 1 - (dist / maxDist);
          // Icons are lighter and more agile; buttons have slightly firmer resistance
          const intensity = el.classList.contains('social-btn') ? 0.42 : 0.28;
          const pullX = deltaX * intensity * power;
          const pullY = deltaY * intensity * power;

          el.classList.add('is-magnetized');
          el.style.transform = `translate(${pullX.toFixed(2)}px, ${pullY.toFixed(2)}px)`;
          el._isMagnetized = true;
        } else if (el._isMagnetized) {
          el.style.transform = 'translate(0px, 0px)';
          el.classList.remove('is-magnetized');
          el._isMagnetized = false;
        }
      });
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      magneticElements.forEach(el => {
        if (el._isMagnetized) {
          el.style.transform = 'translate(0px, 0px)';
          el.classList.remove('is-magnetized');
          el._isMagnetized = false;
        }
      });
    });
  }
});

