// ===== script-resume.js =====
const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'resume';

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = '#836190';
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
    home: '#ffefcc',
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