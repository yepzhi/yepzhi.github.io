/* 
  ProExperience Skeleton Logic
  Handles animations and modal interactions
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Current Year in Footer ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 2. Intersection Observer for Fade-Up Animations ---
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- 3. Lightbox Gallery Logic (Grouped) ---
  const galleryGroups = {
    'MAKING': [
      "assets/gallery/MAKING IT REAL/1771877011679.jpeg",
      "assets/gallery/MAKING IT REAL/1771877011968.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012079.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012128.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012198.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012362.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012365.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012509.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012537.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012540.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012551.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012692.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012717.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012727.jpeg",
      "assets/gallery/MAKING IT REAL/1771877012767.jpeg"
    ],
    'TOEIC': [
      "assets/gallery/TOEIC IN ACTION/1782200867335.jpeg",
      "assets/gallery/TOEIC IN ACTION/1782200871934.jpeg",
      "assets/gallery/TOEIC IN ACTION/1782200872171.jpeg",
      "assets/gallery/TOEIC IN ACTION/1782200873791.jpeg"
    ],
    'UTH': [
      "assets/gallery/UTH/1755913929593.jpeg",
      "assets/gallery/UTH/1755913932839.jpeg",
      "assets/gallery/UTH/1755913933029 (1).jpeg",
      "assets/gallery/UTH/1755913934917.jpeg",
      "assets/gallery/UTH/1755913937016 (1).jpeg",
      "assets/gallery/UTH/1755913939925.jpeg",
      "assets/gallery/UTH/1755913945284.jpeg"
    ],
    'UTN': [
      "assets/gallery/UTN/1771637959320.jpeg",
      "assets/gallery/UTN/1771637959388.jpeg",
      "assets/gallery/UTN/1771637959757.jpeg",
      "assets/gallery/UTN/1771637959859.jpeg",
      "assets/gallery/UTN/1771637960438.jpeg",
      "assets/gallery/UTN/1771637964958.jpeg",
      "assets/gallery/UTN/1771637967014.jpeg",
      "assets/gallery/UTN/1771637967214.jpeg"
    ],
    'UTT': [
      "assets/gallery/UTT/1755814852209.jpeg",
      "assets/gallery/UTT/1755814852217.jpeg",
      "assets/gallery/UTT/1755814852264.jpeg",
      "assets/gallery/UTT/1755814852279.jpeg",
      "assets/gallery/UTT/1755814852302.jpeg"
    ],
    'VIDEOS': [
      "assets/gallery/VIDEO RICHMOND PRO.mp4",
      "assets/gallery/VIDEO UT TIJUANA DAY OF THE TEST.mp4"
    ]
  };

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxContent = document.getElementById('lightbox-content');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  let currentGroup = [];
  let currentImageIndex = 0;

  window.openGallery = function(groupId) {
    if (!galleryGroups[groupId]) return;
    currentGroup = galleryGroups[groupId];
    currentImageIndex = 0;
    renderLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.querySelector('.modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.querySelector('.modal').classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause any playing video when closed
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }

  function renderLightboxContent() {
    if (currentGroup.length === 0) return;
    const file = currentGroup[currentImageIndex];
    const isVideo = file.endsWith('.mp4');
    
    if (isVideo) {
      lightboxContent.innerHTML = `<video src="${file}" controls autoplay playsinline style="max-height: 85vh; width: 100%; object-fit: contain;"></video>`;
    } else {
      lightboxContent.innerHTML = `<img src="${file}" alt="Gallery image">`;
    }
  }

  function prevImage() {
    if (currentGroup.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentGroup.length) % currentGroup.length;
    renderLightboxContent();
  }

  function nextImage() {
    if (currentGroup.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGroup.length;
    renderLightboxContent();
  }

  if (modalClose) modalClose.addEventListener('click', closeLightbox);
  if (modalPrev) modalPrev.addEventListener('click', prevImage);
  if (modalNext) modalNext.addEventListener('click', nextImage);
  
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // --- 4. LinkedIn Slider Logic ---
  const slider = document.getElementById('evidencias-slider');
  const btnPrev = document.querySelector('.slider-prev');
  const btnNext = document.querySelector('.slider-next');

  if (slider && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      const itemWidth = slider.querySelector('.slider-item').offsetWidth + 24; // width + gap
      slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
    
    btnPrev.addEventListener('click', () => {
      const itemWidth = slider.querySelector('.slider-item').offsetWidth + 24;
      slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
  }

  // --- 5. Map Modal Logic (Otras Regiones) ---
  const btnOtrasRegiones = document.getElementById('btn-otras-regiones');
  const mapModal = document.getElementById('map-modal');
  const mapModalClose = document.getElementById('map-modal-close');

  if (btnOtrasRegiones && mapModal) {
    btnOtrasRegiones.addEventListener('click', () => {
      mapModal.classList.add('active');
      mapModal.querySelector('.modal').classList.add('active');
      document.body.style.overflow = 'hidden';
      // Init D3 map if not initialized yet
      if (window.initTeamMap) {
        // Small delay to allow modal display to apply, so D3 can calculate dimensions
        setTimeout(window.initTeamMap, 50);
      }
    });
  }

  if (mapModalClose) {
    mapModalClose.addEventListener('click', () => {
      mapModal.classList.remove('active');
      mapModal.querySelector('.modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  const mapModalBack = document.getElementById('map-modal-back');
  if (mapModalBack) {
    mapModalBack.addEventListener('click', () => {
      mapModal.classList.remove('active');
      mapModal.querySelector('.modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (mapModal) {
    mapModal.addEventListener('click', (e) => {
      if (e.target === mapModal) {
        mapModal.classList.remove('active');
        mapModal.querySelector('.modal').classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 5. Dynamic Footer Year ---
  const dynamicYear = document.getElementById('dynamic-year');
  if (dynamicYear) {
    dynamicYear.innerHTML = `&copy; ${new Date().getFullYear()}, sitio por <a href="https://yepzhi.com" target="_blank" style="color: var(--brand-primary); text-decoration: none;">yepzhi</a>, todos los derechos reservados.`;
  }
});
