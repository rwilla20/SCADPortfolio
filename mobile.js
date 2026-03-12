// ===== mobile.js =====
// Mobile menu toggle functionality

console.log('Mobile.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

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
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('menu-open');
      });
    });

    // Mobile: Add touch support for navigation color preview
    if (window.innerWidth <= 768) {
      const colors = {
        home: '#000000',
        animation: '#5a7359',
        production: '#de6f5f',
        'fine-arts': 'rgb(234, 190, 123)',
        resume: '#836190',
        about: '#6f6dac'
      };

      navItems.forEach(item => {
        item.addEventListener('touchstart', (e) => {
          const page = item.dataset.page;
          if (colors[page]) {
            item.style.color = colors[page];
          }
        });

        item.addEventListener('touchend', (e) => {
          // Reset color after touch if not active
          if (!item.classList.contains('active')) {
            item.style.color = '#ffefcc';
          }
        });
      });
    }

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