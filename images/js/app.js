document.addEventListener('DOMContentLoaded', () => {
  // 1. Location Dropdown Picker Logic
  const locationToggle = document.getElementById('locationToggle');
  const cityDropdown = document.getElementById('cityDropdown');
  const selectedCityText = document.getElementById('selectedCityText');

  if (locationToggle && cityDropdown) {
    locationToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      cityDropdown.classList.toggle('show');
    });

    cityDropdown.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', (e) => {
        const city = e.target.getAttribute('data-city');
        if (selectedCityText) {
          selectedCityText.innerHTML = `${city} <i class="fa-solid fa-chevron-down"></i>`;
        }
        localStorage.setItem('user_city', city);
        cityDropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', () => {
      cityDropdown.classList.remove('show');
    });

    const savedCity = localStorage.getItem('user_city');
    if (savedCity && selectedCityText) {
      selectedCityText.innerHTML = `${savedCity} <i class="fa-solid fa-chevron-down"></i>`;
    }
  }

  // 2. Shopping Cart Badge Sync
  const currentCart = JSON.parse(localStorage.getItem('user_cart') || '[]');
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    cartBadge.textContent = currentCart.length;
  }

  // 3. Photo Carousel Engine for Landing Page
  const photoSlides = document.querySelectorAll('.photo-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const carouselWrapper = document.getElementById('heroCarousel');

  if (photoSlides.length > 0) {
    let currentIdx = 0;
    let timer = null;
    const INTERVAL = 2200;

    function showPhoto(index) {
      if (index >= photoSlides.length) currentIdx = 0;
      else if (index < 0) currentIdx = photoSlides.length - 1;
      else currentIdx = index;

      photoSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIdx);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
      });
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => showPhoto(currentIdx + 1), INTERVAL);
    }

    function stopTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPhoto(currentIdx + 1);
        startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPhoto(currentIdx - 1);
        startTimer();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const target = parseInt(e.target.getAttribute('data-index'), 10);
        showPhoto(target);
        startTimer();
      });
    });

    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopTimer);
      carouselWrapper.addEventListener('mouseleave', startTimer);
    }

    showPhoto(0);
    startTimer();
  }

  // 4. Welcome Entry Modal Display Controller
  const welcomeModal = document.getElementById('welcomeModalBackdrop');
  const welcomeClose = document.getElementById('welcomeModalClose');
  const welcomeDismiss = document.getElementById('welcomeDismissLink');

  if (welcomeModal) {
    const hasSeenWelcome = sessionStorage.getItem('foodzoro_welcomed');

    if (!hasSeenWelcome) {
      setTimeout(() => {
        welcomeModal.classList.add('show');
      }, 600);
    }

    const dismissModal = () => {
      welcomeModal.classList.remove('show');
      sessionStorage.setItem('foodzoro_welcomed', 'true');
    };

    welcomeClose?.addEventListener('click', dismissModal);
    welcomeDismiss?.addEventListener('click', dismissModal);

    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        dismissModal();
      }
    });
  }
});