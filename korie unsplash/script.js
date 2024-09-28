// API Keys
const randomGalleryKey = 'D0VoBabslhk-aM9VW1sHXbY-sO_CVsZDpsM8yDvKQkY';

// DOM Elements
const galleryContainer = document.getElementById('gallery-container');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const downloadBtn = document.getElementById('download-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const searchBar = document.getElementById('search-bar');
const categoryLinks = document.querySelectorAll('.category-link');

// State
let images = [];
let currentIndex = 0;
let currentCategory = 'nature'; // Default category for initial load
let page = 1; // Page for infinite scrolling
const limit = 20; // Images per page

// Fetch Random Images
async function fetchImages(query = currentCategory) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${randomGalleryKey}&page=${page}&per_page=${limit}`);
    const data = await response.json();
    images = data.results;
    displayImages(images);
}

// Display Images
function displayImages(images) {
    images.forEach((image, index) => {
        const imgElement = document.createElement('div');
        imgElement.className = 'image-item';
        imgElement.innerHTML = `<img src="${image.urls.small}" data-index="${index}">`;
        imgElement.querySelector('img').addEventListener('click', () => showPopup(index));
        galleryContainer.appendChild(imgElement);
    });
}

// Show Popup
function showPopup(index) {
    currentIndex = index;
    popup.style.display = 'flex';
    updatePopup();
}

// Update Popup Image
function updatePopup() {
    popupImage.src = images[currentIndex].urls.regular;
}

// Previous Image
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updatePopup();
});

// Next Image
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updatePopup();
});

// Close Popup
popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
});

// Download Image
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = images[currentIndex].urls.full; // Full resolution image
    link.download = 'downloaded-image.jpg';
    link.click();
});

// Add to Favorites (simple local storage implementation)
favoriteBtn.addEventListener('click', () => {
    const favoriteImages = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favoriteImages.includes(images[currentIndex].id)) {
        favoriteImages.push(images[currentIndex].id);
        localStorage.setItem('favorites', JSON.stringify(favoriteImages));
        alert('Added to favorites!');
    } else {
        alert('Already in favorites!');
    }
});

// Search Functionality
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    galleryContainer.innerHTML = '';
    page = 1; // Reset page for new search
    fetchImages(searchTerm);
});

// Category Selection
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentCategory = e.target.dataset.category;
        galleryContainer.innerHTML = '';
        fetchImages(currentCategory);
    });
});

// Infinite Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        page++;
        fetchImages(currentCategory);
    }
});

// Initial Fetch
fetchImages(currentCategory);