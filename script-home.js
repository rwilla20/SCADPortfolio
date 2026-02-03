// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const stringHome = document.querySelector('.string-home');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const demoTitle = document.querySelector('.demo-title');
const demoreelContainer = document.querySelector('.demoreel-container');
const closeReel = document.querySelector('.close-reel');
const stringSound = document.getElementById('string-sound');
const navItems = document.querySelectorAll('.nav-item');
const lampHome = document.querySelector('.lamp-home');
const currentPage = 'home';

// Lamp SVG sources for different colors
const lampSources = {
  home: 'assets/lampon_home_noshadow.svg',
  animation: 'assets/lampon_green.svg',
  production: 'assets/lampon_peach.svg',
  resume: 'assets/lampon_purple.svg',
  about: 'assets/lampon_blue.svg'
};

// Set initial colors on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = '#ffefcc';
    } else {
      item.classList.remove('active');
      item.style.color = '#ffefcc';
    }
  });
}

// Navbar hover - change lamp SVG and nav item colors
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const page = item.dataset.page;
    changeLampImage(page);
    changeNavColor(page);
  });
  
  item.addEventListener('mouseleave', () => {
    changeLampImage('home');
    setActiveState(); // Reset to current page state
  });
});

function changeLampImage(page) {
  // Change the lamp SVG source with smooth transition
  if (lampSources[page]) {
    // Fade out
    lampHome.style.opacity = '0';
    
    // Change image after fade out
    setTimeout(() => {
      lampHome.src = lampSources[page];
      // Fade in
      lampHome.style.opacity = '1';
    }, 200);
  }
}

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#000000',
    production: '#000000',
    resume: '#000000',
    about: '#000000'
  };
  navItems.forEach(item => {
    if (item.dataset.page === page) {
      item.style.color = colors[page];
    } else {
      item.style.color = '#ffefcc';
    }
  });
}

// Click string to turn off lamp and show demo reel
stringHome.addEventListener('click', turnOffLamp);

function turnOffLamp() {
  // Play sound effect
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  
  // Hide prompt text and demo title
  homePrompt.classList.add('hidden');
  if (demoTitle) demoTitle.classList.add('hidden');
  
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
    if (demoTitle) {
      demoTitle.classList.remove('hidden');
    }
    
    // Reset lamp to default
    changeLampImage('home');
  }, 300);
}