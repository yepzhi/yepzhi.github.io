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

  // --- 3. Modals Logic ---
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTemplate = document.getElementById('modal-template');
  const modalCloseBtn = modalTemplate.querySelector('.modal-close');

  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Prevent button click inside card from bubbling if needed
      if (e.target.tagName.toLowerCase() === 'button') {
        // e.preventDefault();
      }
      
      const badgeText = trigger.querySelector('.card-badge')?.textContent || 'Caso';
      const titleText = trigger.querySelector('.card-title')?.textContent || 'Título';
      
      // Update template content (just a demo)
      modalTemplate.querySelector('.modal-badge').textContent = badgeText;
      modalTemplate.querySelector('.modal-title').textContent = titleText;
      
      // Show modal
      modalOverlay.classList.add('active');
      modalTemplate.classList.add('active');
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalTemplate.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalTemplate && modalTemplate.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 4. Slider Logic ---
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

  // --- 5. Dynamic Footer Year ---
  const dynamicYear = document.getElementById('dynamic-year');
  if (dynamicYear) {
    dynamicYear.innerHTML = `&copy; ${new Date().getFullYear()}, sitio por <a href="https://yepzhi.com" target="_blank" style="color: var(--brand-primary); text-decoration: none;">yepzhi</a>, todos los derechos reservados.`;
  }
});
