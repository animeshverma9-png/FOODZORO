document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero 6-Package Slider Carousel Engine
  const track = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('#carouselDots .dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const totalSlides = 6;
  let currentIndex = 0;
  let autoSlideTimer = null;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Hardware accelerated smooth sliding transform
    if (track) {
      const offsetPercent = (currentIndex * 100) / totalSlides;
      track.style.transform = `translateX(-${offsetPercent}%)`;
    }

    // Synchronize bullet indicators
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3200);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoSlide();
    });
  });

  const stage = document.querySelector('.hero-slider-stage');
  if (stage) {
    stage.addEventListener('mouseenter', stopAutoSlide);
    stage.addEventListener('mouseleave', startAutoSlide);
  }

  // Initialize Hero Carousel
  goToSlide(0);
  startAutoSlide();

  // 2. Global Navbar Active Link Helper
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-center .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('highlight');
    } else if (currentPath === '' && href === 'index.html') {
      link.classList.add('highlight');
    }
  });
});