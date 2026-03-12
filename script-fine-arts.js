// ===== script-fine-arts.js =====
const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'fine-arts';

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
  initSlideshows();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = 'rgb(234, 190, 123)';
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
    'fine-arts': 'rgb(234, 190, 123)',
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

// Track which slideshow is active for keyboard navigation
let activeSlideshow = null;

// Dual Slideshow Functionality
function initSlideshows() {
  // Artwork slideshow (31 PDFs)
  initSlideshow({
    name: 'artwork',
    total: 31,
    basePath: 'assets/fine-arts/artwork/',
    filePrefix: 'artwork-',
    pdfElement: document.getElementById('artwork-pdf'),
    prevButton: document.getElementById('artwork-prev'),
    nextButton: document.getElementById('artwork-next'),
    currentDisplay: document.getElementById('artwork-current'),
    totalDisplay: document.getElementById('artwork-total')
  });

  // Paintings slideshow (10 PDFs)
  initSlideshow({
    name: 'paintings',
    total: 10,
    basePath: 'assets/fine-arts/paintings/',
    filePrefix: 'paint-',
    pdfElement: document.getElementById('paintings-pdf'),
    prevButton: document.getElementById('paintings-prev'),
    nextButton: document.getElementById('paintings-next'),
    currentDisplay: document.getElementById('paintings-current'),
    totalDisplay: document.getElementById('paintings-total')
  });
}

function initSlideshow(config) {
  let currentSlide = 1;

  const container = document.querySelector(
    config.name === 'artwork' ? '.left-slideshow' : '.right-slideshow'
  );

  // Clicking anywhere in the slideshow makes it active
  container.addEventListener('click', () => {
    activeSlideshow = config.name;
    document.querySelectorAll('.scrapbook-slideshow').forEach(el => {
      el.classList.remove('slideshow-active');
    });
    container.classList.add('slideshow-active');
  });

  config.totalDisplay.textContent = config.total;

  function updateSlide() {
    const pdfPath = `${config.basePath}${config.filePrefix}${currentSlide}.pdf#view=FitH&toolbar=0&navpanes=0`;
    config.pdfElement.src = pdfPath;
    config.currentDisplay.textContent = currentSlide;
    config.prevButton.disabled = currentSlide === 1;
    config.nextButton.disabled = currentSlide === config.total;
  }

  config.prevButton.addEventListener('click', () => {
    if (currentSlide > 1) { currentSlide--; updateSlide(); }
  });

  config.nextButton.addEventListener('click', () => {
    if (currentSlide < config.total) { currentSlide++; updateSlide(); }
  });

  // Keyboard navigation - only fires for the active slideshow
  document.addEventListener('keydown', (e) => {
    if (activeSlideshow !== config.name) return;
    if (e.key === 'ArrowLeft' && currentSlide > 1) { currentSlide--; updateSlide(); }
    if (e.key === 'ArrowRight' && currentSlide < config.total) { currentSlide++; updateSlide(); }
  });

  updateSlide();
}