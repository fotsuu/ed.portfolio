/** Portfolio navigation, project case studies, accessible dialogs and email drafts. */
document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.getElementById('navMenu');
  const menuButton = document.getElementById('mobileMenuBtn');
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main > section')];
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    navigate('home');
    document.getElementById('brandLogo').focus({ preventScroll: true });
  });
  let toastTimer;
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 4000);
  }
  function closeMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  function navigate(id, updateHistory = true) {
    const section = document.getElementById(id);
    if (!section) return;
    if (updateHistory && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    closeMenu();
    section.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  }
  document.querySelectorAll('.nav-link, [data-navigate], #brandLogo').forEach(link => {
    link.addEventListener('click', e => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(link.dataset.navigate || link.hash.slice(1));
    });
  });
  window.addEventListener('popstate', () => navigate(location.hash.slice(1) || 'home', false));
  let scrollPending = false;
  function updateNavigation() {
    backToTop.hidden = scrollY < 500;
    let current = 'home';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section.id; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8) current = 'contact';
    links.forEach(link => {
      const active = link.dataset.page === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();

  let activeModal = null;
  let returnFocus = null;
  const modalStack = [];
  const background = [...document.querySelectorAll('body > header, body > main, body > footer, body > .skip-link, #backToTop')];
  function openModal(id) {
    const modal = document.getElementById(id);
    if (activeModal) {
      modalStack.push({ modal: activeModal, trigger: returnFocus });
      activeModal.inert = true;
      activeModal.setAttribute('aria-hidden', 'true');
    }
    returnFocus = document.activeElement;
    activeModal = modal;
    background.forEach(el => { el.inert = true; });
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close-btn').focus();
  }
  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove('active');
    activeModal.setAttribute('aria-hidden', 'true');
    const focusTarget = returnFocus;
    const previous = modalStack.pop();
    if (previous) {
      activeModal = previous.modal;
      returnFocus = previous.trigger;
      activeModal.inert = false;
      activeModal.setAttribute('aria-hidden', 'false');
      focusTarget?.focus({ preventScroll: true });
      return;
    }
    document.body.style.overflow = '';
    background.forEach(el => { el.inert = false; });
    activeModal = null;
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => {
    if (activeModal?.id === 'galleryModal' && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      renderGallery(galleryIndex + (e.key === 'ArrowRight' ? 1 : -1));
    }
    if (e.key === 'Escape') {
      if (activeModal) closeModal();
      else if (nav.classList.contains('open')) { closeMenu(); menuButton.focus(); }
    }
    if (e.key === 'Tab' && activeModal) {
      const focusable = [...activeModal.querySelectorAll('button, a[href], input, textarea, iframe')].filter(el => !el.disabled && el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  document.querySelectorAll('#aboutCvBtn, #contactPageCvBtn').forEach(btn => btn.addEventListener('click', () => {
    const frame = document.getElementById('cvFrame');
    if (!frame.src) frame.src = frame.dataset.src;
    openModal('cvModal');
  }));

  const cases = {
    denr: {
      eyebrow: 'Selected work / 01 · Production GovTech',
      title: 'DENR Land Inventory & RLTA',
      facts: [['Role', 'Software developer'], ['Context', 'DENR-CENRO, Davao del Sur'], ['Scope', '7 municipalities']],
      body: `<section class="case-section"><h3>The problem</h3><p>Land inventory work brings together parcel records, barangay metrics, and remaining lot calculations. Staff need a centralized way to find records and work with incoming spreadsheet data.</p></section>
        <figure><img class="case-image" src="denr-dashboard.png" alt="DENR land inventory dashboard showing municipality and land assessment information" /><figcaption class="case-caption">The deployed land inventory and assessment dashboard.</figcaption></figure>
        <section class="case-section"><h3>What I built</h3><ul><li>A centralized cadastral inventory with parcel lookup.</li><li>Automated barangay overview metrics and remaining land calculations.</li><li>Bulk Excel ingestion for bringing existing records into the system.</li></ul></section>
        <section class="case-section"><h3>Implementation</h3><p>PHP and MySQL support the application and relational records, with JavaScript and Bootstrap for the interface. Excel processing connects existing data workflows to the inventory.</p></section>
        <section class="case-section"><h3>Result & scope</h3><p>Deployed at DENR-CENRO Davao del Sur, supporting land inventory and assessment across 7 municipalities.</p></section>`
    },
    feedwise: {
      eyebrow: 'Selected work / 02 · Capstone platform',
      title: 'FeedWise Platform & Simulator',
      facts: [['Role', 'Lead developer'], ['Platforms', 'Web & mobile'], ['Focus', 'Least-cost feed formulation']],
      body: `<section class="case-section"><h3>The problem</h3><p>Poultry feed formulation needs to balance ingredient costs with nutritional requirements. Changing market prices make comparing ingredient combinations an ongoing challenge.</p></section>
        <figure><img class="case-image" src="feedwise-hero.png" alt="FeedWise poultry feed formulation platform overview" /><figcaption class="case-caption">FeedWise brings feed formulation into a web and mobile workflow.</figcaption></figure>
        <section class="case-section"><h3>What I built</h3><ul><li>Algorithmic feed formulation and ingredient ratio optimization.</li><li>Nutrient balance charts aligned with PhilSAN requirements.</li><li>An interactive simulator for ingredient combinations and market price changes.</li><li>Web and mobile interfaces for exploring formulation results.</li></ul></section>
        <figure><img class="case-image" src="feedwise-simulator.png" alt="FeedWise simulator interface for ingredient costs and nutrient balance" loading="lazy" /><figcaption class="case-caption">The simulator supports cost and nutrient balance comparisons.</figcaption></figure>
        <section class="case-section"><h3>Implementation</h3><p>The project combines Laravel, PHP, Flutter, Python, and data modeling, with Chart.js visualizations and a Tailwind CSS web interface.</p></section>
        <section class="case-section"><h3>Result & scope</h3><p>A capstone platform combining formulation with interactive simulations, including nutrient balance scores and estimated per-kilogram savings.</p></section>`
    }
  };
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => {
    const project = cases[button.dataset.case];
    document.getElementById('caseEyebrow').textContent = project.eyebrow;
    document.getElementById('caseTitle').textContent = project.title;
    document.getElementById('caseBody').innerHTML = `<dl class="case-facts">${project.facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>${project.body}`;
    document.getElementById('caseBody').scrollTop = 0;
    enableScreenshots(document.getElementById('caseBody'), button.dataset.case);
    openModal('caseModal');
  }));

  const slides = [...document.querySelectorAll('#feedwiseCarousel .carousel-slide')];
  const dots = [...document.querySelectorAll('#feedwiseCarousel .carousel-dot')];
  let slideIndex = 0;
  function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === slideIndex);
      slide.setAttribute('aria-hidden', String(i !== slideIndex));
      slide.inert = i !== slideIndex;
    });
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === slideIndex); dot.setAttribute('aria-pressed', String(i === slideIndex)); });
  }
  document.getElementById('fwPrevBtn').addEventListener('click', () => showSlide(slideIndex - 1));
  document.getElementById('fwNextBtn').addEventListener('click', () => showSlide(slideIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  showSlide(0);

  const galleries = {
    denr: [{ src: 'denr-dashboard.png', caption: 'DENR — land inventory dashboard' }],
    feedwise: [
      { src: 'feedwise-hero.png', caption: 'FeedWise — platform overview' },
      { src: 'feedwise-simulator.png', caption: 'FeedWise — feed formulation simulator' },
      { src: 'feedwise-capabilities.png', caption: 'FeedWise — platform capabilities' },
      { src: 'feedwise-process.png', caption: 'FeedWise — formulation process' }
    ]
  };
  let galleryKey = 'denr';
  let galleryIndex = 0;
  function renderGallery(index) {
    const entries = galleries[galleryKey];
    galleryIndex = (index + entries.length) % entries.length;
    const item = entries[galleryIndex];
    const image = document.getElementById('galleryImage');
    image.src = item.src;
    image.alt = item.caption;
    document.getElementById('galleryTitle').textContent = galleryKey === 'denr' ? 'DENR screenshots' : 'FeedWise screenshots';
    document.getElementById('galleryCaption').textContent = item.caption;
    document.getElementById('galleryCount').textContent = `${galleryIndex + 1} / ${entries.length}`;
    document.getElementById('galleryOriginal').href = item.src;
    document.getElementById('galleryPrev').disabled = entries.length === 1;
    document.getElementById('galleryNext').disabled = entries.length === 1;
  }
  function enableScreenshots(container, key) {
    container.querySelectorAll('img.project-img, img.case-image').forEach(image => {
      if (image.closest('.screenshot-trigger')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'screenshot-trigger';
      button.setAttribute('aria-label', `Enlarge ${image.alt}`);
      const hint = document.createElement('span');
      hint.className = 'screenshot-hint';
      hint.textContent = '⤢ Enlarge';
      hint.setAttribute('aria-hidden', 'true');
      image.replaceWith(button);
      button.append(image, hint);
      button.addEventListener('click', () => {
        galleryKey = key;
        const index = galleries[key].findIndex(item => image.getAttribute('src') === item.src);
        renderGallery(Math.max(0, index));
        openModal('galleryModal');
      });
    });
  }
  document.querySelectorAll('.project-card').forEach(card => enableScreenshots(card, card.dataset.project));
  document.getElementById('galleryPrev').addEventListener('click', () => renderGallery(galleryIndex - 1));
  document.getElementById('galleryNext').addEventListener('click', () => renderGallery(galleryIndex + 1));

  document.getElementById('contactPageCopyEmailBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('diamanteeric0501@gmail.com');
      toast('Email address copied.');
    } catch {
      toast('Please select and copy the email address, or use the email link.');
    }
  });
  document.getElementById('contactPageForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactPageSenderName');
    const email = document.getElementById('contactPageSenderEmail');
    const message = document.getElementById('contactPageMessage');
    [name, email, message].forEach(input => { input.value = input.value.trim(); });
    if (!e.currentTarget.reportValidity()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.value}`);
    const body = encodeURIComponent(`${message.value}\n\nFrom: ${name.value}\nEmail: ${email.value}`);
    document.getElementById('contactStatus').textContent = 'Your draft is ready. Complete sending in your email app. If no app opens, use the email link below. Your message stays here until you leave the page.';
    window.location.href = `mailto:diamanteeric0501@gmail.com?subject=${subject}&body=${body}`;
  });
});
