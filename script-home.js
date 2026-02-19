// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const stringHome = document.querySelector('.string-home');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const playButton = document.querySelector('.play-button');
const demoreelContainer = document.querySelector('.demoreel-container');
const closeReel = document.querySelector('.close-reel');
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

// Crossfade lamp: create a second img on top, fade it in, then swap
function changeLampImage(page) {
  if (!lampSources[page] || !lampHome) return;
  const newSrc = lampSources[page];
  if (lampHome.src.endsWith(newSrc)) return; // already showing this lamp

  // Create overlay image for crossfade
  const overlay = document.createElement('img');
  overlay.src = newSrc;
  overlay.style.cssText = `
    position: absolute;
    bottom: ${lampHome.style.bottom || '80px'};
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: 70%;
    max-width: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
    pointer-events: none;
    z-index: 3;
  `;

  lampContainer.appendChild(overlay);

  // Trigger fade-in on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  });

  // After crossfade completes, swap the main lamp src and remove overlay
  setTimeout(() => {
    lampHome.src = newSrc;
    overlay.remove();
  }, 650);
}

// Set initial nav state on page load
window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
});

function setActiveState() {
  navItems.forEach(item => {
    item.style.color = '#ffefcc';
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Navbar hover — crossfade lamp and change nav colors
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    changeLampImage(item.dataset.page);
    changeNavColor(item.dataset.page);
  });

  item.addEventListener('mouseleave', () => {
    changeLampImage('home');
    setActiveState();
  });
});

function changeNavColor(page) {
  const colors = {
    home: '#000000',
    animation: '#5a7359',
    production: '#de6f5f',
    resume: '#836190',
    about: '#6f6dac'
  };
  navItems.forEach(item => {
    item.style.color = item.dataset.page === page ? colors[page] : '#ffefcc';
  });
}

// STRING CLICK — opens demo reel, NO sound
stringHome.addEventListener('click', function () {
  openDemoReel();
});

// PLAY BUTTON CLICK — opens demo reel, NO sound
playButton.addEventListener('click', function () {
  openDemoReel();
});

function openDemoReel() {
  homePrompt.classList.add('hidden');
  lampContainer.classList.add('hidden');

  scene.classList.remove('scene-light');
  scene.classList.add('scene-dark');

  setTimeout(() => {
    demoreelContainer.classList.add('visible');
    const demoVideo = document.getElementById('demo-video');
    if (demoVideo) demoVideo.play();
  }, 800);
}

// CLOSE BUTTON — closes demo reel, NO sound
closeReel.addEventListener('click', function () {
  closeDemoReel();
});

function closeDemoReel() {
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }

  demoreelContainer.classList.remove('visible');

  scene.classList.remove('scene-dark');
  scene.classList.add('scene-light');

  setTimeout(() => {
    lampContainer.classList.remove('hidden');
    homePrompt.classList.remove('hidden');
    homePrompt.classList.add('visible');
    changeLampImage('home');
  }, 300);
}