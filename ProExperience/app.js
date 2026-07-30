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

  // --- 3. Gallery & Lightbox Logic ---
  const galleryFiles = [
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
    "assets/gallery/MAKING IT REAL/1771877012767.jpeg",
    "assets/gallery/TOEIC IN ACTION/1782200867335.jpeg",
    "assets/gallery/TOEIC IN ACTION/1782200871934.jpeg",
    "assets/gallery/TOEIC IN ACTION/1782200872171.jpeg",
    "assets/gallery/TOEIC IN ACTION/1782200873791.jpeg",
    "assets/gallery/UTH/1755913929593.jpeg",
    "assets/gallery/UTH/1755913932839.jpeg",
    "assets/gallery/UTH/1755913933029 (1).jpeg",
    "assets/gallery/UTH/1755913934917.jpeg",
    "assets/gallery/UTH/1755913937016 (1).jpeg",
    "assets/gallery/UTH/1755913939925.jpeg",
    "assets/gallery/UTH/1755913945284.jpeg",
    "assets/gallery/UTN/1771637959320.jpeg",
    "assets/gallery/UTN/1771637959388.jpeg",
    "assets/gallery/UTN/1771637959757.jpeg",
    "assets/gallery/UTN/1771637959859.jpeg",
    "assets/gallery/UTN/1771637960438.jpeg",
    "assets/gallery/UTN/1771637964958.jpeg",
    "assets/gallery/UTN/1771637967014.jpeg",
    "assets/gallery/UTN/1771637967214.jpeg",
    "assets/gallery/UTT/1755814852209.jpeg",
    "assets/gallery/UTT/1755814852217.jpeg",
    "assets/gallery/UTT/1755814852264.jpeg",
    "assets/gallery/UTT/1755814852279.jpeg",
    "assets/gallery/UTT/1755814852302.jpeg",
    "assets/gallery/VIDEO RICHMOND PRO.mp4",
    "assets/gallery/VIDEO UT TIJUANA DAY OF THE TEST.mp4"
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxContent = document.getElementById('lightbox-content');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');
  let currentImageIndex = 0;

  if (galleryGrid) {
    // Render Gallery
    galleryFiles.forEach((file, index) => {
      const isVideo = file.endsWith('.mp4');
      const item = document.createElement('div');
      item.className = 'gallery-item fade-up';
      // stagger animation slightly based on index
      item.style.transitionDelay = `${(index % 5) * 0.1}s`;
      
      let mediaHtml = '';
      if (isVideo) {
        mediaHtml = `<video src="${file}" preload="metadata" muted playsinline></video>`;
      } else {
        mediaHtml = `<img src="${file}" loading="lazy" alt="Gallery image">`;
      }
      
      item.innerHTML = `
        ${mediaHtml}
        <div class="gallery-item-overlay">
          <div class="gallery-icon">${isVideo ? '▶' : '🔍'}</div>
        </div>
      `;
      
      item.addEventListener('click', () => openLightbox(index));
      galleryGrid.appendChild(item);
      
      // Observe new items for fade up
      if (fadeObserver) fadeObserver.observe(item);
    });
  }

  function openLightbox(index) {
    currentImageIndex = index;
    renderLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.querySelector('.modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.querySelector('.modal').classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause any playing video when closed
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }

  function renderLightboxContent() {
    const file = galleryFiles[currentImageIndex];
    const isVideo = file.endsWith('.mp4');
    
    if (isVideo) {
      lightboxContent.innerHTML = `<video src="${file}" controls autoplay playsinline></video>`;
    } else {
      lightboxContent.innerHTML = `<img src="${file}" alt="Gallery image">`;
    }
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryFiles.length) % galleryFiles.length;
    renderLightboxContent();
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryFiles.length;
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

  // --- 5. Dynamic Footer Year ---
  const dynamicYear = document.getElementById('dynamic-year');
  if (dynamicYear) {
    dynamicYear.innerHTML = `&copy; ${new Date().getFullYear()}, sitio por <a href="https://yepzhi.com" target="_blank" style="color: var(--brand-primary); text-decoration: none;">yepzhi</a>, todos los derechos reservados.`;
  }
});
