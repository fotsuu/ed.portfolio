// Apply the saved preference before styles paint; otherwise follow the device.
(() => {
  const system = matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try { preference = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be unavailable. */ }
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.setAttribute('name', 'theme-color');
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = theme === 'dark' ? '#0b1220' : '#ffffff';
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to night mode');
    document.getElementById('themeIcon').textContent = dark ? '☀' : '☾';
    document.getElementById('themeLabel').textContent = dark ? 'Light' : 'Night';
  }
  const valid = () => preference === 'dark' || preference === 'light';
  apply(valid() ? preference : system.matches ? 'dark' : 'light');
  system.addEventListener('change', e => { if (!valid()) apply(e.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', e => {
    if (e.key === 'portfolio-theme' || e.key === null) {
      preference = e.newValue;
      apply(valid() ? preference : system.matches ? 'dark' : 'light');
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.getElementById('themeToggle').addEventListener('click', () => {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(preference);
      try { localStorage.setItem('portfolio-theme', preference); } catch { /* Toggle still works for this visit. */ }
    });
  });
})();
