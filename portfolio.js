// js/main.js

// Año en footer
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Menú móvil =====
const toggleBtn = document.querySelector(".nav__toggle");
const navLinks = document.getElementById("navLinks");

toggleBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar menú al clicar un link (en móvil)
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  });
});

// ===== Tema (oscuro/claro) =====
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") document.body.classList.add("light");
setThemeIcon();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  setThemeIcon();
});

function setThemeIcon(){
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}

// ===== Contadores animados (cuando entran en pantalla) =====
const counters = document.querySelectorAll("[data-count]");

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    animateCount(el, target, 900);
    obs.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => obs.observe(c));

function animateCount(el, to, duration){
  const start = performance.now();
  const from = 0;

  function tick(now){
    const p = Math.min((now - start) / duration, 1);
    const value = Math.round(from + (to - from) * easeOut(p));
    el.textContent = String(value);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function easeOut(t){
  return 1 - Math.pow(1 - t, 3);
}

// ===== Filtro de proyectos =====
const search = document.getElementById("projectSearch");
const projectGrid = document.getElementById("projectGrid");

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  projectGrid.querySelectorAll(".project").forEach(card => {
    const title = (card.dataset.title || "").toLowerCase();
    card.style.display = title.includes(q) ? "" : "none";
  });
});

// ===== Formulario (fake submit + validación simple) =====
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "";

  if (!form.checkValidity()){
    msg.textContent = "Revisa los campos: faltan datos o el formato no es correcto.";
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();

  msg.textContent = `¡Gracias, ${name}! (esto es una demo, no se envía de verdad)`;
  form.reset();
});