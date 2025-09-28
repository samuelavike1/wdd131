// Build a simple summary and bump a localStorage counter
function getFormData() {
  const p = new URLSearchParams(location.search);
  return {
    product: p.get("product"),
    rating: p.get("rating"),
    installed: p.get("installed"),
    features: p.getAll("features"),
    review: p.get("review") || "",
    username: p.get("username") || ""
  };
}

function escapeHtml(s){
  return s
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

function renderSummary(data){
  // map id back to name for display
  const map = {
    "fc-1888":"flux capacitor",
    "fc-2050":"power laces",
    "fs-1987":"time circuits",
    "ac-2000":"low voltage reactor",
    "jj-1969":"warp equalizer"
  };
  const name = map[data.product] || data.product || "—";

  const el = document.getElementById("summary");
  el.style.fontSize = "20px";
  el.innerHTML = `
    <p><strong>Product Name:</strong> ${name}</p>
    <p><strong>Overall Rating:</strong> ${data.rating ? data.rating + " / 5" : "—"}</p>
    <p><strong>Date of Installation:</strong> ${data.installed || "—"}</p>
    <p><strong>Useful Features:</strong> ${data.features.length ? data.features.join(", ") : "—"}</p>
    <p><strong>Written Review:</strong> ${data.review ? escapeHtml(data.review) : "—"}</p>
    <p><strong>Your Name:</strong> ${data.username || "—"}</p>
  `;
}

function bumpCounter(){
  const KEY = "reviewsCount";
  const n = Number(localStorage.getItem(KEY) || 0) + 1;
  localStorage.setItem(KEY, n);
  document.getElementById("counter").textContent =
    n === 1 ? "You have submitted 1 review from this browser."
            : `You have submitted ${n} reviews from this browser.`;
}

function setFooterDate(){
  const last = new Date(document.lastModified);
  const pad = n => String(n).padStart(2,"0");
  const formatted = `${pad(last.getMonth()+1)}/${pad(last.getDate())}/${last.getFullYear()} ${pad(last.getHours())}:${pad(last.getMinutes())}:${pad(last.getSeconds())}`;
  document.getElementById("last-mod").textContent = formatted;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary(getFormData());
  bumpCounter();
  setFooterDate();
});
