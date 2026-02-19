// ===== mobile.js =====
// Mobile menu toggle functionality

console.log('Mobile.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  console.log('Menu toggle:', menuToggle);
  console.log('Nav links:', navLinks);

  if (menuToggle && navLinks) {
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hamburger clicked!');
      navLinks.classList.toggle('menu-open');
      console.log('Menu open?', navLinks.classList.contains('menu-open'));
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
  } else {
    console.error('Menu toggle or nav links not found!');
  }
});