/** Progressive motion: content remains visible if animation support is unavailable. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let pendingFrame;
  const scene = document.getElementById('hero3dScene');
  const visual = document.getElementById('heroVisual');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

  function resetPortrait() {
    scene.style.setProperty('--portrait-x', '0px');
    scene.style.setProperty('--portrait-y', '0px');
  }

  function configureMotion() {
    observer?.disconnect();
    document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
    resetPortrait();
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

  visual.addEventListener('pointermove', event => {
    if (preference.matches || !finePointer.matches) return;
    cancelAnimationFrame(pendingFrame);
    pendingFrame = requestAnimationFrame(() => {
      const box = visual.getBoundingClientRect();
      // Whole-pixel translation avoids rotating or blurring the repaired eyes.
      scene.style.setProperty('--portrait-x', `${Math.round((event.clientX - box.left - box.width / 2) / box.width * 10)}px`);
      scene.style.setProperty('--portrait-y', `${Math.round((event.clientY - box.top - box.height / 2) / box.height * 8)}px`);
    });
  }, { passive: true });
  visual.addEventListener('pointerleave', () => { cancelAnimationFrame(pendingFrame); resetPortrait(); });
  preference.addEventListener('change', configureMotion);
  configureMotion();
})();
