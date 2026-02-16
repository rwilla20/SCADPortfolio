// ===== script-production.js =====
const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'production';

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = '#de6f5f';
    } else {
      item.classList.remove('active');
      item.style.color = '#ffefcc';
    }
  });
}

// Navbar hover - change nav item colors on all pages
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const page = item.dataset.page;
    changeNavColor(page);
  });
  
  item.addEventListener('mouseleave', () => {
    setActiveState(); // Reset to current page state
  });
});

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#5a7359',
    production: '#de6f5f',
    resume: '#836190',
    about: '#6f6dac'
  };
  navItems.forEach(item => {
    if (item.dataset.page === page) {
      item.style.color = colors[page];
    } else {
      item.style.color = '#ffefcc';
    }
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
let menuOpen = false;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle('menu-open', menuOpen);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && menuOpen) {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    }
  });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.getElementById('lightbox-close');
const productionImages = document.querySelectorAll('.production-item img');
const productionVideos = document.querySelectorAll('.production-item video');

// Open lightbox when clicking on images
productionImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.style.display = 'block';
    lightboxVideo.style.display = 'none';
    lightboxVideo.pause();
  });
});

// Open lightbox when clicking on videos
productionVideos.forEach(video => {
  video.addEventListener('click', () => {
    lightbox.classList.add('active');
    
    // Get video source from either src attribute or source tag
    const videoSrc = video.querySelector('source') ? video.querySelector('source').src : video.src;
    lightboxVideo.src = videoSrc;
    
    lightboxVideo.style.display = 'block';
    lightboxImg.style.display = 'none';
    lightboxVideo.load(); // Load the video with controls
    lightboxVideo.play(); // Auto-play in lightbox
  });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.src = ''; // Clear source to stop loading
});

// Close lightbox when clicking outside the image/video
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.src = '';
  }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.src = '';
  }
});

// Slide Viewer Functionality
const prevSlide = document.getElementById('prev-slide');
const nextSlide = document.getElementById('next-slide');
const currentSlideImg = document.getElementById('current-slide');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlidesNum = document.getElementById('total-slides');

// Configure your slides here - update the total number and folder path
const totalSlides = 20; // Update this to match your actual number of slides
const slideFolder = 'assets/production/slides/';

let currentSlide = 1;

// Update slide display
function updateSlide() {
  currentSlideImg.src = `${slideFolder}slide-${currentSlide}.png`;
  currentSlideNum.textContent = currentSlide;
  
  // Disable/enable buttons
  prevSlide.disabled = currentSlide === 1;
  nextSlide.disabled = currentSlide === totalSlides;
}

// Previous slide
prevSlide.addEventListener('click', () => {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlide();
  }
});

// Next slide
nextSlide.addEventListener('click', () => {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updateSlide();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentSlide > 1) {
    currentSlide--;
    updateSlide();
  } else if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
    currentSlide++;
    updateSlide();
  }
});

// Initialize
totalSlidesNum.textContent = totalSlides;
updateSlide();