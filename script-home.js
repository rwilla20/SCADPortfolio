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
  setupVideoHandlers(); // Setup video handlers after DOM loads
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
  // Change the lamp SVG source with smooth transition
  if (lampSources[page]) {
    // Smooth fade transition
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
  stringHome.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    turnOffLampWithSound();
  });
}

// Click play button to turn off lamp (NO sound)
if (playButton) {
  playButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    turnOffLampNoSound();
  });
}

function turnOffLampWithSound() {
  // Play sound effect
  if (stringSound) {
    stringSound.currentTime = 0;
    stringSound.play().catch(err => console.log('Audio play failed:', err));
  }
  
  openDemoReel();
}

function turnOffLampNoSound() {
  // No sound, just open demo reel
  openDemoReel();
}

function openDemoReel() {
  // Hide prompt text
  if (homePrompt) {
    homePrompt.classList.add('hidden');
  }
  
  // Hide lamp
  if (lampContainer) {
    lampContainer.classList.add('hidden');
  }
  
  // Change background to dark
  if (scene) {
    scene.classList.remove('scene-light');
    scene.classList.add('scene-dark');
  }
  
  // Show demo reel after transition
  setTimeout(() => {
    if (demoreelContainer) {
      demoreelContainer.classList.add('visible');
    }
    
    // Start playing the video automatically
    const demoVideo = document.getElementById('demo-video');
    if (demoVideo) {
      demoVideo.play().catch(err => console.log('Video autoplay failed:', err));
    }
  }, 800);
}

// Close demo reel and go back to lamp
if (closeReel) {
  closeReel.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeDemoReel();
  });
}

// Setup video click handlers
function setupVideoHandlers() {
  const demoVideo = document.getElementById('demo-video');
  const videoWrapper = document.querySelector('.demoreel-video');
  
  // Make the video clickable to play/pause
  if (demoVideo) {
    demoVideo.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (demoVideo.paused) {
        demoVideo.play().catch(err => console.log('Video play failed:', err));
      } else {
        demoVideo.pause();
      }
    });
  }
  
  // Make the video wrapper clickable too
  if (videoWrapper) {
    videoWrapper.addEventListener('click', (e) => {
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
  // Pause and reset the video
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
  
  // Hide demo reel
  if (demoreelContainer) {
    demoreelContainer.classList.remove('visible');
  }
  
  // Change background back to light
  if (scene) {
    scene.classList.remove('scene-dark');
    scene.classList.add('scene-light');
  }
  
  // Show lamp and prompt again
  setTimeout(() => {
    if (lampContainer) {
      lampContainer.classList.remove('hidden');
    }
    if (homePrompt) {
      homePrompt.classList.remove('hidden');
      homePrompt.classList.add('visible');
    }
    
    // Reset lamp to default
    changeLampImage('home');
  }, 300);
}