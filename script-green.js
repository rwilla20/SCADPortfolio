// Set the default lamp color for this page
// Change this for each page: 'blue', 'green', 'peach', 'purple'
const defaultLampColor = 'green';

// Get all elements
const scene = document.querySelector('.scene');
const lampContainer = document.querySelector('.lamp-container');
const stringOn = document.querySelector('.string-on');
const navbar = document.querySelector('.navbar');
const content = document.querySelector('.content');
const navItems = document.querySelectorAll('.nav-item');
const stringSound = document.getElementById('string-sound');

// Track state
let isVisible = true; // Lamp starts visible on the left

// Initialize page with lamp ON
window.addEventListener('DOMContentLoaded', () => {
  // Show the default lamp color
  document.querySelector(`.lamp-${defaultLampColor}`).classList.add('active');
  
  stringOn.classList.add('active', 'clickable');
  scene.classList.add('lit');
  navbar.classList.add('visible');
  
  // After 2 seconds, automatically slide lamp off and show content
  setTimeout(() => {
    slideLampOff();
  }, 1000);
});

function slideLampOff() {
  // Slide lamp completely off screen to the left
  lampContainer.classList.add('slide-off');
  
  // Show and center content as lamp slides off
  setTimeout(() => {
    content.classList.add('visible');
    content.classList.add('centered');
  }, 300);
  
  isVisible = false;
}

// Optional: Keep string clickable if you want manual control too
stringOn.addEventListener('click', toggleLamp);

function toggleLamp() {
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  if (isVisible) {
    slideLampOff();
  } else {
    // Hide content first
    content.classList.remove('visible');
    content.classList.remove('centered');
    
    // Slide lamp back to left side
    setTimeout(() => {
      lampContainer.classList.remove('slide-off');
    }, 300);
    
    isVisible = true;
  }
}

// Change lamp color on navbar hover (only when lamp is visible)
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (!isVisible) return;
    
    const color = item.dataset.color;
    changeLampColor(color);
  });
  
  item.addEventListener('mouseleave', () => {
    if (!isVisible) return;
    
    changeLampColor(defaultLampColor);
  });
  
  // Set flag when navigating to home
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href') === 'index.html') {
      localStorage.setItem('cameFromColorPage', 'true');
    }
  });
});

function changeLampColor(color) {
  // Hide all lamps
  document.querySelectorAll('.lamp-on').forEach(lamp => {
    lamp.classList.remove('active');
  });
  
  // Show new lamp color
  if (color === 'home') {
    document.querySelector('.lamp-home-noshadows').classList.add('active');
    
    setTimeout(() => {
      document.querySelector('.lamp-home-noshadows').classList.remove('active');
      document.querySelector('.lamp-home').classList.add('active');
    }, 5000);
  } else {
    document.querySelector(`.lamp-${color}`).classList.add('active');
  }
}