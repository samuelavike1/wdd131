// Global utilities: nav toggle, active link, year, and lazy loading
export function initGlobal(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Highlight active link (if data-active not present)
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(a => {
    if (!a.hasAttribute('data-active') && a.getAttribute('href') === `./${here}`) {
      a.setAttribute('data-active', '');
    }
  });

  // Lazy load <img data-src> pattern (optional if using loading="lazy")
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting){
          const img = e.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(img => io.observe(img));
  }
}
