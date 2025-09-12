/* Footer: year and last modified */
const yearEl = document.getElementById("year");
const lastModEl = document.getElementById("lastModified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

/* Weather values (static for this assignment) */
const tempC = 10;      // °C
const windKmh = 5;     // km/h

document.getElementById("temp").textContent = tempC;
document.getElementById("wind").textContent = windKmh;

/**
 * calculateWindChill (Celsius + km/h version from Environment Canada)
 * Returns wind chill in °C (one-liner as required).
 * WCI = 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
 */
const calculateWindChill = (t, v) =>
  13.12 + 0.6215 * t - 11.37 * (v ** 0.16) + 0.3965 * t * (v ** 0.16);

/* Only compute when conditions are viable (<=10°C and >4.8 km/h) */
const windChillEl = document.getElementById("windchill");
if (tempC <= 10 && windKmh > 4.8) {
  const wc = calculateWindChill(tempC, windKmh);
  windChillEl.textContent = `${wc.toFixed(1)} °C`;
} else {
  windChillEl.textContent = "N/A";
}
