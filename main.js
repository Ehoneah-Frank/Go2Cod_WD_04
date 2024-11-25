import { galleryImages } from './src/images.js';
import { initializeGallery } from './src/gallery.js';

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeButton = document.querySelector('.lightbox-close');

// Initialize gallery
const galleryItems = initializeGallery(galleryImages, gallery);

// Open lightbox
gallery.addEventListener('click', (e) => {
  const clickedImage = e.target.closest('img');
  if (!clickedImage) return;

  lightboxImg.src = clickedImage.src;
  lightboxImg.alt = clickedImage.alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Close lightbox
const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

// Add intersection observer for lazy loading
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial styles and observe gallery items
galleryItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `all 0.5s ease ${index * 0.1}s`;
  observer.observe(item);
});