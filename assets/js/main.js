const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

if (hamburger && navbarNav) {
  hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    navbarNav.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  };

  // BUG FIX: Tutup menu saat klik link navbar
  navbarNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navbarNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
      hamburger.classList.remove("active"); // BUG FIX: hamburger icon juga di-reset
      navbarNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// ================= SCROLL REVEAL =================
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ================= JAM KERJA HIDUP =================
function updateJamKerja() {
  const statusEl = document.getElementById("jamKerjaStatus");
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day === 0) {
    statusEl.innerHTML = "Hari ini <b>TUTUP</b> (Minggu libur)";
    statusEl.style.color = "red";
    return;
  }

  if (hour >= 8 && hour < 17) {
    statusEl.innerHTML = "Sekarang <b>BUKA</b> • Bisa langsung konsultasi";
    statusEl.style.color = "#25d366";
  } else {
    statusEl.innerHTML = "Sekarang <b>TUTUP</b> • Buka jam 08:00";
    statusEl.style.color = "orange";
  }
}

updateJamKerja();
setInterval(updateJamKerja, 60000);

// ================= MOUSE GLOW =================
const glow = document.querySelector(".mouse-glow");
if (glow) {
  // BUG FIX: guard null check
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ================= SCROLL BAR PROGRESS =================
const scrollBar = document.querySelector(".scroll-bar");
if (scrollBar) {
  // BUG FIX: guard null check
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (scrollTop / height) * 100;
    scrollBar.style.width = progress + "%";
  });
}

// ================= PARTICLES =================
const particles = document.querySelector(".particles");
if (particles) {
  // BUG FIX: guard null check — particles hanya ada di halaman index
  for (let i = 0; i < 25; i++) {
    const span = document.createElement("span");
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 5 + Math.random() * 10 + "s";
    particles.appendChild(span);
  }
}

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.dataset.target;
  let count = 0;
  const speed = target / 60;

  const update = () => {
    count += speed;
    if (count < target) {
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };

  update();
};

if (counters.length > 0) {
  // BUG FIX: guard jika tidak ada counter
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}
