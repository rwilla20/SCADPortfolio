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
const animationVideos = document.querySelectorAll('.process-box video, .final-animation video, .rendered-animation video, .animation-process-grid video');

// Open lightbox when clicking on videos
animationVideos.forEach(video => {
  video.addEventListener('click', () => {
    lightbox.classList.add('active');
    
    // Pause ALL videos on the page to prevent echo
    document.querySelectorAll('video').forEach(v => v.pause());
    
    // Get video source from either src attribute or source tag
    const videoSrc = video.querySelector('source') ? video.querySelector('source').src : video.src;
    lightboxVideo.src = videoSrc;
    
    lightboxVideo.style.display = 'block';
    lightboxImg.style.display = 'none';
    lightboxVideo.load();
    // Removed autoplay - user can click play if they want
  });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.src = '';
});

// Close lightbox when clicking outside the video
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