// ===== script-fine-arts.js =====
const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'fine-arts';

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
  initSlideshow();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = 'rgb(234, 190, 123)'; // Yellow accent
    } else {
      item.classList.remove('active');
      item.style.color = '#ffefcc';
    }
  });
}

// Navbar hover - change nav item colors
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const page = item.dataset.page;
    changeNavColor(page);
  });
  
  item.addEventListener('mouseleave', () => {
    setActiveState();
  });
});

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#5a7359',
    production: '#de6f5f',
    'fine-arts': 'rgb(234, 190, 123)', // Yellow
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

// PDF Slideshow Functionality
const totalSlides = 10; // UPDATE THIS NUMBER based on how many PDFs you have
const pdfBasePath = 'assets/fine-arts/';
const pdfFiles = [
  'artwork-1.pdf',
  'artwork-2.pdf',
  'artwork-3.pdf',
  'artwork-4.pdf',
  'artwork-5.pdf',
  'artwork-6.pdf',
  'artwork-7.pdf',
  'artwork-8.pdf',
  'artwork-9.pdf',
  'artwork-10.pdf'
];

let currentSlide = 1;

const pdfIframe = document.getElementById('current-pdf');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlidesNum = document.getElementById('total-slides');
const pdfDownload = document.getElementById('pdf-download');
const thumbnailContainer = document.getElementById('thumbnail-container');

function initSlideshow() {
  totalSlidesNum.textContent = pdfFiles.length;
  updateSlide();
  generateThumbnails();
}

function updateSlide() {
  // Update PDF source
  const pdfPath = pdfBasePath + pdfFiles[currentSlide - 1];
  pdfIframe.src = pdfPath + '#view=FitH&toolbar=0&navpanes=0';
  
  // Update download link
  pdfDownload.href = pdfPath;
  pdfDownload.download = pdfFiles[currentSlide - 1];
  
  // Update counter
  currentSlideNum.textContent = currentSlide;
  
  // Update button states
  prevButton.disabled = currentSlide === 1;
  nextButton.disabled = currentSlide === pdfFiles.length;
  
  // Update active thumbnail
  updateActiveThumbnail();
}

function generateThumbnails() {
  pdfFiles.forEach((filename, index) => {
    const thumb = document.createElement('button');
    thumb.className = 'thumbnail';
    thumb.setAttribute('data-slide', index + 1);
    thumb.textContent = index + 1;
    thumb.addEventListener('click', () => {
      currentSlide = index + 1;
      updateSlide();
    });
    thumbnailContainer.appendChild(thumb);
  });
}

function updateActiveThumbnail() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, index) => {
    if (index + 1 === currentSlide) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Previous slide
prevButton.addEventListener('click', () => {
  if (currentSlide > 1) {
    currentSlide--;
    updateSlide();
  }
});

// Next slide
nextButton.addEventListener('click', () => {
  if (currentSlide < pdfFiles.length) {
    currentSlide++;
    updateSlide();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentSlide > 1) {
    currentSlide--;
    updateSlide();
  } else if (e.key === 'ArrowRight' && currentSlide < pdfFiles.length) {
    currentSlide++;
    updateSlide();
  }
});