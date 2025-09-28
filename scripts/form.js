// Populate select with products and set last modified footer.
// No star animations; radios are plain circles.

const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("product");
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;          // value is the product id (per spec)
    opt.textContent = p.name;  // display the product name
    select.appendChild(opt);
  });

  // Footer last modified (matches screenshot behavior)
  const last = new Date(document.lastModified);
  const pad = n => String(n).padStart(2, "0");
  const formatted = `${pad(last.getMonth()+1)}/${pad(last.getDate())}/${last.getFullYear()} ${pad(last.getHours())}:${pad(last.getMinutes())}:${pad(last.getSeconds())}`;
  document.getElementById("last-mod").textContent = formatted;
});
