// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const lampContainer = document.querySelector('.lamp-container');
const stringOff = document.querySelector('.string-off');
const lampOff = document.querySelector('.lamp-off');
const navbar = document.querySelector('.navbar');
const homePrompt = document.querySelector('.home-prompt');
const demoreelContainer = document.querySelector('.demoreel-container');
const stringSound = document.getElementById('string-sound');
const menuToggle = document.querySelector('.menu-toggle');

let lampIsOff = true;
let menuOpen = false;

// Mobile menu toggle
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

// Wait a beat, then show the prompt text
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    homePrompt.classList.add('visible');
  }, 800);
});

// Click string to turn off lamp and show demo reel
stringOff.addEventListener('click', turnOffLamp);

function turnOffLamp() {
  if (!lampIsOff) return;
  
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  lampIsOff = false;
  
  // Hide prompt
  homePrompt.classList.remove('visible');
  homePrompt.classList.add('hidden');
  
  // Fade out lamp
  lampOff.classList.remove('active');
  stringOff.classList.remove('active', 'clickable');
  
  // Slide lamp off screen
  setTimeout(() => {
    lampContainer.classList.add('slide-off-home');
    scene.classList.add('lights-off');
  }, 300);
  
  // Show navbar and demo reel
  setTimeout(() => {
    navbar.classList.add('visible');
    demoreelContainer.classList.add('visible');
  }, 1500);
}