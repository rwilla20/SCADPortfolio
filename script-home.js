// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const stringHome = document.querySelector('.string-home');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const demoreelContainer = document.querySelector('.demoreel-container');
const closeReel = document.querySelector('.close-reel');
const stringSound = document.getElementById('string-sound');
const navItems = document.querySelectorAll('.nav-item');
const lampHome = document.querySelector('.lamp-home');

// Lamp SVG sources for different colors
const lampSources = {
  home: 'assets/lampon_home_noshadow.svg',
  animation: 'assets/lampon_green.svg',
  production: 'assets/lampon_peach.svg',
  resume: 'assets/lampon_purple.svg',
  about: 'assets/lampon_blue.svg'
};

// Navbar hover - change lamp SVG and nav item colors
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const page = item.dataset.page;
    changeLampImage(page);
    changeNavColor(page);
  });
  
  item.addEventListener('mouseleave', () => {
    changeLampImage('home');
    changeNavColor('home');
  });
});

function changeLampImage(page) {
  // Change the lamp SVG source
  if (lampSources[page]) {
    lampHome.src = lampSources[page];
  }
  
  // Add glow effect
  const colors = {
    home: '#ffefcc',
    animation: '#6d8b6c',
    production: '#de6f5f', 
    resume: '#836190',
    about: '#6f6dac'
  };
  lampHome.style.filter = `drop-shadow(0 0 20px ${colors[page]})`;
}

function changeNavColor(page) {
  const colors = {
    home: '#ffffff',
    animation: '#6d8b6c',
    production: '#de6f5f',
    resume: '#836190',
    about: '#6f6dac'
  };
  navItems.forEach(item => {
    if (item.dataset.page === page) {
      item.style.color = colors[page];
    } else {
      item.style.color = '#ffffff';
    }
  });
}

// Click string to turn off lamp and show demo reel
stringHome.addEventListener('click', turnOffLamp);

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

// Close demo reel and go back to lamp
closeReel.addEventListener('click', closeDemoReel);

function closeDemoReel() {
  // Hide demo reel
  demoreelContainer.classList.remove('visible');
  
  // Change background back to light
  scene.classList.remove('scene-dark');
  scene.classList.add('scene-light');
  
  // Show lamp and prompt again
  setTimeout(() => {
    lampContainer.classList.remove('hidden');
    homePrompt.classList.remove('hidden');
    homePrompt.classList.add('visible');
    
    // Reset lamp to default
    changeLampImage('home');
  }, 300);
}