// Set the default lamp color for this page
const defaultLampColor = 'home';

// Get all elements
const scene = document.querySelector('.scene');
const lampContainer = document.querySelector('.lamp-container');
const stringOff = document.querySelector('.string-off');
const lampOff = document.querySelector('.lamp-off');
const stringOn = document.querySelector('.string-on');
const navbar = document.querySelector('.navbar');
const content = document.querySelector('.content');
const navItems = document.querySelectorAll('.nav-item');
const stringSound = document.getElementById('string-sound');
const menuToggle = document.querySelector('.menu-toggle');

// Track state
let isLit = false;
let currentColor = defaultLampColor;
let shadowTimeout = null;
let menuOpen = false;

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle('menu-open', menuOpen);
  });

  // Close menu when clicking nav items
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && menuOpen) {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    }
  });
}

// Check if coming from another page IMMEDIATELY (before DOM loads)
const cameFromColorPage = localStorage.getItem('cameFromColorPage');

if (cameFromColorPage === 'true') {
  // Add class to HTML element immediately
  document.documentElement.className += ' from-color-page';
}

window.addEventListener('DOMContentLoaded', () => {
  if (cameFromColorPage === 'true') {
    // Auto turn on lamp without animation
    turnOnLampInstantly();
    // Clear the flag
    localStorage.removeItem('cameFromColorPage');
    // Remove the class after setup
    document.documentElement.classList.remove('from-color-page');
  }
});

function turnOnLampInstantly() {
  isLit = true;
  
  // Show ON state immediately
  document.querySelector('.lamp-home-noshadows').classList.add('active');
  
  // Fade to shadows version after 1.5 seconds
  shadowTimeout = setTimeout(() => {
    document.querySelector('.lamp-home-noshadows').classList.remove('active');
    document.querySelector('.lamp-home').classList.add('active');
  }, 1500);
  
  stringOn.classList.add('active', 'clickable');
  scene.classList.add('lit');
  lampContainer.classList.add('slide-left');
  navbar.classList.add('visible');
  content.classList.add('visible');
}

// Turn on lamp when OFF string is clicked
stringOff.addEventListener('click', turnOnLamp);

// Turn off lamp when ON string is clicked
stringOn.addEventListener('click', turnOffLamp);

function turnOnLamp() {
  if (isLit) return;
  
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  isLit = true;
  
  // Fade out OFF state
  lampOff.classList.remove('active');
  stringOff.classList.remove('active', 'clickable');
  
  // Fade in ON state with default color
  setTimeout(() => {
    // Start with no-shadows version
    document.querySelector('.lamp-home-noshadows').classList.add('active');
    
    // Fade to shadows version after 1.5 seconds
    shadowTimeout = setTimeout(() => {
      document.querySelector('.lamp-home-noshadows').classList.remove('active');
      document.querySelector('.lamp-home').classList.add('active');
    }, 1500);
    
    stringOn.classList.add('active', 'clickable');
    scene.classList.add('lit');
    
    // Slide lamp to the left
    lampContainer.classList.add('slide-left');
    
    // Show navbar and slide in content
    navbar.classList.add('visible');
    content.classList.add('visible');
  }, 300);
}

function turnOffLamp() {
  if (!isLit) return;

  // Close mobile menu if open
  menuOpen = false;
  navbar.classList.remove('menu-open');
  
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  isLit = false;
  
  // Hide navbar and slide out content first
  navbar.classList.remove('visible');
  content.classList.remove('visible');
  
  // Slide lamp back to center
  lampContainer.classList.remove('slide-left');
  
  setTimeout(() => {
    // Fade out ON state
    if (currentColor === 'home') {
      document.querySelector('.lamp-home').classList.remove('active');
      document.querySelector('.lamp-home-noshadows').classList.remove('active');
    } else {
      document.querySelector(`.lamp-${currentColor}`).classList.remove('active');
    }
    stringOn.classList.remove('active', 'clickable');
    scene.classList.remove('lit');
    
    // Reset to default color
    currentColor = defaultLampColor;
    
    // Clear shadow timeout
    if (shadowTimeout) {
      clearTimeout(shadowTimeout);
      shadowTimeout = null;
    }
    
    // Fade in OFF state
    setTimeout(() => {
      lampOff.classList.add('active');
      stringOff.classList.add('active', 'clickable');
    }, 300);
  }, 500);
}

// Change lamp color on navbar hover
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (!isLit) return;
    
    const color = item.dataset.color;
    changeLampColor(color);
  });
  
  // Return to default color when mouse leaves
  item.addEventListener('mouseleave', () => {
    if (!isLit) return;
    
    changeLampColor(defaultLampColor);
  });
  
  // Block navigation when lamp is off
  item.addEventListener('click', (e) => {
    if (!isLit) {
      e.preventDefault(); // Prevent navigation when lamp is off
    }
    // When lamp is lit, let the link work normally
  });
});

function changeLampColor(color) {
  if (currentColor === color) return;
  
  // Clear any existing shadow timeout
  if (shadowTimeout) {
    clearTimeout(shadowTimeout);
    shadowTimeout = null;
  }
  
  // Hide current lamp color
  if (currentColor === 'home') {
    document.querySelector('.lamp-home').classList.remove('active');
    document.querySelector('.lamp-home-noshadows').classList.remove('active');
  } else {
    document.querySelector(`.lamp-${currentColor}`).classList.remove('active');
  }
  
  // Show new lamp color
  if (color === 'home') {
    // Show no-shadows version initially
    document.querySelector('.lamp-home-noshadows').classList.add('active');
    
    // Set timeout to fade back to shadows version after 1.5 seconds
    shadowTimeout = setTimeout(() => {
      document.querySelector('.lamp-home-noshadows').classList.remove('active');
      document.querySelector('.lamp-home').classList.add('active');
    }, 1500);
  } else {
    document.querySelector(`.lamp-${color}`).classList.add('active');
  }
  
  currentColor = color;
}
