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
    setActiveState();
  });
});

function changeLampImage(page) {
  if (lampSources[page] && lampHome) {
    lampHome.style.opacity = '0';
    setTimeout(() => {
      lampHome.src = lampSources[page];
      lampHome.style.opacity = '1';
    }, 300);
  }
}

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#5a7359',
    production: '#de6f5f',
    'fine-arts': 'rgb(234, 190, 123)',
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

// STRING CLICK - opens demo reel
stringHome.addEventListener('click', function() {
  openDemoReel();
});

function openDemoReel() {
  lampContainer.classList.add('hidden');
  scene.classList.remove('scene-light');
  scene.classList.add('scene-dark');
  closeReel.classList.add('visible');

  // Small delay so dark transition happens first, then video appears
  setTimeout(() => {
    demoreelContainer.classList.add('playing');
    const demoVideo = document.getElementById('demo-video');
    if (demoVideo) demoVideo.play();
  }, 400);

  if (stringSound) {
    stringSound.currentTime = 0;
    stringSound.play();
  }
}

// CLOSE BUTTON
document.querySelector('.close-reel').addEventListener('click', function(e) {
  e.stopPropagation();
  closeDemoReel();
});

function closeDemoReel() {
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }

  demoreelContainer.classList.remove('playing');
  closeReel.classList.remove('visible');

  // Delay light coming back so video disappears first
  setTimeout(() => {
    scene.classList.remove('scene-dark');
    scene.classList.add('scene-light');
  }, 300);

  if (stringSound) {
    stringSound.currentTime = 0;
    stringSound.play();
  }

  setTimeout(() => {
    lampContainer.classList.remove('hidden');
    changeLampImage('home');
  }, 600);
}

const demoVideo = document.getElementById('demo-video');
if (demoVideo) {
  demoVideo.addEventListener('click', function() {
    // If background isn't dark yet, trigger full open
    if (!scene.classList.contains('scene-dark')) {
      openDemoReel();
    }
  });
}