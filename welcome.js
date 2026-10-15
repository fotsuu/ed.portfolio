/** Bounded automatic loading intro with immediate keyboard/skip escape. */
(() => {
  const dialog = document.getElementById('welcomeIntro');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  if (location.hash && location.hash !== '#home') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let leaving = false;
  let frame = 0;
  let exitTimer;
  let autoTimer;
  let priorOverflow;
  function finish() {
    clearTimeout(exitTimer);
    clearTimeout(autoTimer);
    cancelAnimationFrame(frame);
    dialog.close();
    document.documentElement.classList.remove('welcome-active');
    document.body.style.overflow = priorOverflow;
    // Move into the page without leaving a keyboard outline on the header logo.
    document.getElementById('mainContent').focus({ preventScroll: true });
  }
  function enter() {
    if (leaving) return;
    leaving = true;
    clearTimeout(autoTimer);
    if (reduced.matches) { finish(); return; }
    dialog.classList.add('welcome-leaving');
    exitTimer = setTimeout(finish, 520);
  }
  document.getElementById('welcomeSkip').addEventListener('click', enter);
  dialog.addEventListener('cancel', event => { event.preventDefault(); enter(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); enter(); }
  });
  dialog.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType !== 'mouse' || leaving) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      dialog.style.setProperty('--welcome-x', `${Math.round(event.clientX / innerWidth * 100)}%`);
      dialog.style.setProperty('--welcome-y', `${Math.round(event.clientY / innerHeight * 100)}%`);
    });
  }, { passive: true });
  window.addEventListener('hashchange', () => { if (dialog.open) enter(); });
  priorOverflow = document.body.style.overflow;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  document.documentElement.classList.add('welcome-active');
  // Brand animation, not a fabricated download percentage; external assets never block entry.
  autoTimer = setTimeout(enter, reduced.matches ? 200 : 2600);
})();
