export function createGalleryItem(image) {
  return `
    <div class="gallery-item">
      <img src="${image.url}" alt="${image.alt}" loading="lazy" />
    </div>
  `;
}

export function initializeGallery(images, galleryElement) {
  const galleryHTML = images.map(createGalleryItem).join('');
  galleryElement.innerHTML = galleryHTML;
  
  return galleryElement.querySelectorAll('.gallery-item');
}