// Home page (Demo Reel) script
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

// Navbar hover - change lamp SVG and nav item colors (SMOOTH FADE)
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
    // Fade out completely
    lampHome.style.opacity = '0';
    
    // Wait for fade out, then change image and fade in
    setTimeout(() => {
      lampHome.src = lampSources[page];
      lampHome.style.opacity = '1';
    }, 600); // Wait for full fade out (0.6s transition)
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

// STRING CLICK - opens demo reel, NO sound
stringHome.addEventListener('click', function() {
  openDemoReel();
});

// PLAY BUTTON CLICK - opens demo reel, NO sound
playButton.addEventListener('click', function() {
  openDemoReel();
});

function openDemoReel() {
  // Hide prompt and lamp
  homePrompt.classList.add('hidden');
  lampContainer.classList.add('hidden');
  
  // Change background to dark
  scene.classList.remove('scene-light');
  scene.classList.add('scene-dark');
  
  // Show demo reel after transition
  setTimeout(() => {
    demoreelContainer.classList.add('visible');
    
    // Start video and play sound when video opens
    const demoVideo = document.getElementById('demo-video');
    if (demoVideo) {
      demoVideo.play();
    }
    
    // Play lamp sound when demo reel opens
    if (stringSound) {
      stringSound.currentTime = 0;
      stringSound.play();
    }
  }, 800);
}

// CLOSE BUTTON - closes demo reel and plays sound
closeReel.addEventListener('click', function() {
  closeDemoReel();
});

function closeDemoReel() {
  // Pause and reset video
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
  
  // Hide demo reel
  demoreelContainer.classList.remove('visible');
  
  // Change background back to light
  scene.classList.remove('scene-dark');
  scene.classList.add('scene-light');
  
  // Play lamp sound when closing
  if (stringSound) {
    stringSound.currentTime = 0;
    stringSound.play();
  }
  
  // Show lamp and prompt again
  setTimeout(() => {
    lampContainer.classList.remove('hidden');
    homePrompt.classList.remove('hidden');
    homePrompt.classList.add('visible');
    
    // Reset lamp to default
    changeLampImage('home');
  }, 300);
}

// VIDEO CLICK to pause/play
const demoVideo = document.getElementById('demo-video');
if (demoVideo) {
  demoVideo.addEventListener('click', function() {
    if (demoVideo.paused) {
      demoVideo.play();
    } else {
      demoVideo.pause();
    }
  });
}

// VIDEO WRAPPER CLICK
const videoWrapper = document.querySelector('.demoreel-video');
if (videoWrapper) {
  videoWrapper.addEventListener('click', function() {
    if (demoVideo) {
      if (demoVideo.paused) {
        demoVideo.play();
      } else {
        demoVideo.pause();
      }
    }
  });
}