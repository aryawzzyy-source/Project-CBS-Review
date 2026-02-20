// ===== SLIDER GALERI =====
const slider = document.getElementById("galeriSlider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn && slider) {
  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: 400, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -400, behavior: "smooth" });
  });
}

// ===== LIGHTBOX =====
const images = document.querySelectorAll(".galeri-slider img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".close-lightbox");

images.forEach((img) => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return; // BUG FIX: guard null
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    if (lightbox) lightbox.style.display = "none";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}

// ===== AUTO SLIDE GALERI =====
const sliderGaleri = document.getElementById("galeriSlider");

if (sliderGaleri) {
  let autoSlide;
  let isPaused = false;

  const startSlide = () => {
    if (isPaused) return;
    autoSlide = setInterval(() => {
      const maxScroll = sliderGaleri.scrollWidth - sliderGaleri.clientWidth;

      // BUG FIX: Gunakan scrollLeft aktual dari DOM, bukan variabel lokal scrollAmount
      // yang tidak sinkron saat user scroll manual atau klik prev/next
      if (sliderGaleri.scrollLeft >= maxScroll - 1) {
        sliderGaleri.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderGaleri.scrollBy({ left: 370, behavior: "smooth" });
      }
    }, 2500);
  };

  const stopSlide = () => {
    clearInterval(autoSlide);
  };

  // BUG FIX: isPaused flag agar startSlide tidak restart saat masih di-pause
  const pauseSlide = () => {
    isPaused = true;
    stopSlide();
  };

  const resumeSlide = () => {
    isPaused = false;
    startSlide();
  };

  startSlide();

  sliderGaleri.addEventListener("mouseenter", pauseSlide);
  sliderGaleri.addEventListener("mouseleave", resumeSlide);

  sliderGaleri.addEventListener("touchstart", pauseSlide);
  sliderGaleri.addEventListener("touchend", resumeSlide);

  // BUG FIX: Pause auto slide juga saat klik tombol prev/next manual
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopSlide();
      // Resume setelah 3 detik idle
      clearTimeout(nextBtn._resumeTimer);
      nextBtn._resumeTimer = setTimeout(resumeSlide, 3000);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopSlide();
      clearTimeout(prevBtn._resumeTimer);
      prevBtn._resumeTimer = setTimeout(resumeSlide, 3000);
    });
  }
}
