/** Progressive motion: content remains visible if animation support is unavailable. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  const visual = document.getElementById('heroVisual');
  const atmosphere = document.getElementById('heroAtmosphere');
  let ambientVisible = true;
  function updateAmbient() {
    const paused = !ambientVisible || document.hidden || preference.matches;
    atmosphere.classList.toggle('ambient-running', !paused);
  }
  document.addEventListener('visibilitychange', updateAmbient);
  preference.addEventListener('change', updateAmbient);
  if ('IntersectionObserver' in window) {
    const ambientObserver = new IntersectionObserver(entries => {
      ambientVisible = entries[0].isIntersecting;
      updateAmbient();
    });
    ambientObserver.observe(visual);
  }
  updateAmbient();

  function configureMotion() {
    observer?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
    if (preference.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.view-header, .project-card, .about-narrative-card, .highlight-box, .skill-card, .supporting-tech-banner, .contact-card, .contact-form-card').forEach(el => {
      el.classList.add('reveal-item');
      // Never hide content already on screen, including direct section links.
      if (el.getBoundingClientRect().top < innerHeight) return;
      const siblings = [...el.parentElement.children];
      el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 3) * 65}ms`);
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }

  preference.addEventListener('change', configureMotion);
  configureMotion();
})();
