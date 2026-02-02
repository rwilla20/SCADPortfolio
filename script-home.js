// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const stringOff = document.querySelector('.string-off');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const demoreelContainer = document.querySelector('.demoreel-container');
const stringSound = document.getElementById('string-sound');

// Click string to turn off lamp and show demo reel
stringOff.addEventListener('click', turnOffLamp);

function turnOffLamp() {
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  // Hide prompt text
  homePrompt.classList.add('hidden');
  
  // Hide lamp
  lampContainer.classList.add('hidden');
  
  // Change background to dark
  scene.classList.remove('scene-light');
  scene.classList.add('scene-dark');
  
  // Show demo reel after transition
  setTimeout(() => {
    demoreelContainer.classList.add('visible');
  }, 800);
}