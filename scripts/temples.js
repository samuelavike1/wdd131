// Footer: dynamic year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Hamburger toggle (mobile)
const btn = document.getElementById("hamburger");
const list = document.getElementById("primary-nav");

btn.addEventListener("click", () => {
  const open = list.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
  btn.textContent = open ? "✕" : "☰";
  btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// OPTIONAL: simple filter demo (Old/New/Large/Small)
// You can remove this block if you don't want filtering behavior yet
document.querySelectorAll('.nav__link[data-filter]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.dataset.filter; // "old" | "new" | "large" | "small"
    const cards = document.querySelectorAll('#album .card');

    // very simple rules; adapt as you like
    cards.forEach(card => {
      const year = Number(card.dataset.year);
      const size = String(card.dataset.size);

      let show = true;
      if (filter === 'old') show = year < 2000;
      if (filter === 'new') show = year >= 2000;
      if (filter === 'large') show = size === 'large';
      if (filter === 'small') show = size === 'small';

      card.style.display = show ? '' : 'none';
    });

    // close menu on mobile after choosing a filter
    if (list.classList.contains('open')) btn.click();
  });
});
