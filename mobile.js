// ===== mobile.js =====
// Mobile menu toggle functionality

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  // Toggle menu when hamburger is clicked
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('menu-open');
  });

  // Close menu when clicking a nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('menu-open');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('menu-open')) {
      navLinks.classList.remove('menu-open');
    }
  });
}