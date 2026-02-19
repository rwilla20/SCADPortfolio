// Home page (Demo Reel) script
console.log('Script loaded');

const scene = document.querySelector('.scene');
const stringHome = document.querySelector('.string-home');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const playButton = document.querySelector('.play-button');
const demoreelContainer = document.querySelector('.demoreel-container');
const closeReel = document.querySelector('.close-reel');
const stringSound = document.getElementById('string-sound');
const navItems = document.querySelectorAll('.nav-item');
const lampHome = document.querySelector('.lamp-home');
const currentPage = 'home';

console.log('Elements found:', {
  stringHome: !!stringHome,
  playButton: !!playButton,
  demoreelContainer: !!demoreelContainer
});

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
  console.log('DOM loaded');
  setActiveState();
  setupVideoHandlers();
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
    lampHome.style.transition = 'opacity 0.6s ease-in-out';
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

// Click string to turn off lamp (with sound)
if (stringHome) {
  console.log('Adding string click listener');
  stringHome.addEventListener('click', function(e) {
    console.log('String clicked!');
    e.preventDefault();
    e.stopPropagation();
    turnOffLampWithSound();
  });
} else {
  console.error('String element not found!');
}

// Click play button to turn off lamp (NO sound)
if (playButton) {
  console.log('Adding play button listener');
  playButton.addEventListener('click', function(e) {
    console.log('Play button clicked!');
    e.preventDefault();
    e.stopPropagation();
    turnOffLampNoSound();
  });
} else {
  console.error('Play button not found!');
}

function turnOffLampWithSound() {
  console.log('turnOffLampWithSound called');
  if (stringSound) {
    stringSound.currentTime = 0;
    stringSound.play().catch(err => console.log('Audio play failed:', err));
  }
  openDemoReel();
}

function turnOffLampNoSound() {
  console.log('turnOffLampNoSound called');
  openDemoReel();
}

function openDemoReel() {
  console.log('openDemoReel called');
  
  if (homePrompt) {
    homePrompt.classList.add('hidden');
  }
  
  if (lampContainer) {
    lampContainer.classList.add('hidden');
  }
  
  if (scene) {
    scene.classList.remove('scene-light');
    scene.classList.add('scene-dark');
  }
  
  setTimeout(() => {
    if (demoreelContainer) {
      demoreelContainer.classList.add('visible');
      console.log('Demo reel now visible');
    }
    
    const demoVideo = document.getElementById('demo-video');
    if (demoVideo) {
      console.log('Starting video');
      demoVideo.play().catch(err => console.log('Video autoplay failed:', err));
    } else {
      console.error('Video element not found!');
    }
  }, 800);
}

// Close demo reel
if (closeReel) {
  closeReel.addEventListener('click', function(e) {
    console.log('Close button clicked');
    e.preventDefault();
    e.stopPropagation();
    closeDemoReel();
  });
}

// Setup video click handlers
function setupVideoHandlers() {
  const demoVideo = document.getElementById('demo-video');
  const videoWrapper = document.querySelector('.demoreel-video');
  
  if (demoVideo) {
    demoVideo.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (demoVideo.paused) {
        demoVideo.play().catch(err => console.log('Video play failed:', err));
      } else {
        demoVideo.pause();
      }
    });
  }
  
  if (videoWrapper) {
    videoWrapper.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (demoVideo) {
        if (demoVideo.paused) {
          demoVideo.play().catch(err => console.log('Video play failed:', err));
        } else {
          demoVideo.pause();
        }
      }
    });
  }
}

function closeDemoReel() {
  console.log('closeDemoReel called');
  
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
  
  if (demoreelContainer) {
    demoreelContainer.classList.remove('visible');
  }
  
  if (scene) {
    scene.classList.remove('scene-dark');
    scene.classList.add('scene-light');
  }
  
  setTimeout(() => {
    if (lampContainer) {
      lampContainer.classList.remove('hidden');
    }
    if (homePrompt) {
      homePrompt.classList.remove('hidden');
      homePrompt.classList.add('visible');
    }
    changeLampImage('home');
  }, 300);
}