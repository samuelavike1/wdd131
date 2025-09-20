/* Footer: dynamic year and last modified */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

/* Hamburger toggle (mobile) */
const btn = document.getElementById("hamburger");
const list = document.getElementById("primary-nav");
btn.addEventListener("click", () => {
  const open = list.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
  btn.textContent = open ? "✕" : "☰";
  btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

/* Data: sample + 5 more */
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },

  /* Added temples */
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13757.jpg",
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382000,
    imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-8458.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-4598.jpg",
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-7370.jpg",
  },
];

/* Helpers */
const getYear = (dedicatedStr) => {
  // format "YYYY, Month, D"
  const y = parseInt(String(dedicatedStr).split(",")[0].trim(), 10);
  return Number.isFinite(y) ? y : NaN;
};

const toSqFt = (n) => `${Number(n).toLocaleString()} sq ft`;

/* Render */
const album = document.getElementById("album");
const pageTitle = document.getElementById("page-title");

function renderTemples(list) {
  album.innerHTML = "";
  list.forEach((t) => {
    const fig = document.createElement("figure");
    fig.className = "card";

    const img = document.createElement("img");
    img.src = t.imageUrl;
    img.alt = `${t.templeName} Temple`;
    img.loading = "lazy";
    img.width = 400; // hint intrinsic size
    img.height = 250;

    const cap = document.createElement("figcaption");
    cap.innerHTML = `
      <h3 class="card__title">${t.templeName}</h3>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${toSqFt(t.area)}</p>
    `;

    fig.appendChild(img);
    fig.appendChild(cap);
    album.appendChild(fig);
  });
}

/* Filters */
const FILTERS = {
  home: (t) => true,
  old: (t) => getYear(t.dedicated) < 1900,
  new: (t) => getYear(t.dedicated) >= 2000,
  large: (t) => t.area > 90000,
  small: (t) => t.area < 10000,
};

function applyFilter(which) {
  const fn = FILTERS[which] || FILTERS.home;
  const filtered = temples.filter(fn);
  renderTemples(filtered);
  pageTitle.textContent =
    which === "home"
      ? "Home"
      : which.charAt(0).toUpperCase() + which.slice(1) + " Temples";

  // close menu on mobile after choosing a filter
  if (list.classList.contains("open")) btn.click();
}

/* Wire up nav */
document.querySelectorAll('.nav__link[data-filter]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    applyFilter(link.dataset.filter);
  });
});

/* Initial load = Home (all) */
renderTemples(temples);
