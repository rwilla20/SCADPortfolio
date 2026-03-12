// ===== script-animation.js =====
const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'animation';

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = '#5a7359';
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
    setActiveState();
  });
});

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#5a7359',
    production: '#de6f5f',
    'fine-arts': 'rgb(234, 190, 123)',   // ← ADD THIS LINE
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

// When a video is clicked, pause all OTHER videos
const allVideos = document.querySelectorAll('video');
allVideos.forEach(video => {
  video.addEventListener('play', () => {
    // Pause all other videos when this one plays
    allVideos.forEach(otherVideo => {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

// Mobile: Make ALL process grid videos collapsible (start collapsed)
if (window.innerWidth <= 768) {
  const processBoxes = document.querySelectorAll('.animation-process-grid .process-box');
  
  processBoxes.forEach(box => {
    const heading = box.querySelector('h3');
    
    // Start all process videos as collapsed
    box.classList.add('collapsed');
    
    // Make heading clickable to toggle
    heading.addEventListener('click', () => {
      box.classList.toggle('collapsed');
    });
  });
}