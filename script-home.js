// Home page (Demo Reel) script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  
  // Get all elements
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
  const demoVideo = document.getElementById('demo-video');
  
  console.log('Play button found:', !!playButton);
  console.log('String found:', !!stringHome);
  
  // Lamp SVG sources
  const lampSources = {
    home: 'assets/lampon_home_noshadow.svg',
    animation: 'assets/lampon_green.svg',
    production: 'assets/lampon_peach.svg',
    resume: 'assets/lampon_purple.svg',
    about: 'assets/lampon_blue.svg'
  };
  
  // Set active nav colors
  function setActiveState() {
    navItems.forEach(item => {
      if (item.dataset.page === 'home') {
        item.classList.add('active');
        item.style.color = '#ffefcc';
      } else {
        item.classList.remove('active');
        item.style.color = '#ffefcc';
      }
    });
  }
  
  setActiveState();
  
  // Navbar hover effects
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
  
  // STRING CLICK - with sound
  if (stringHome) {
    stringHome.addEventListener('click', function() {
      console.log('String clicked!');
      if (stringSound) {
        stringSound.currentTime = 0;
        stringSound.play();
      }
      openDemoReel();
    });
  }
  
  // PLAY BUTTON CLICK - no sound
  if (playButton) {
    playButton.addEventListener('click', function() {
      console.log('Play button clicked!');
      openDemoReel();
    });
  }
  
  // Open demo reel function
  function openDemoReel() {
    console.log('Opening demo reel...');
    
    if (homePrompt) homePrompt.classList.add('hidden');
    if (lampContainer) lampContainer.classList.add('hidden');
    if (scene) {
      scene.classList.remove('scene-light');
      scene.classList.add('scene-dark');
    }
    
    setTimeout(() => {
      if (demoreelContainer) {
        demoreelContainer.classList.add('visible');
      }
      if (demoVideo) {
        demoVideo.play();
      }
    }, 800);
  }
  
  // CLOSE BUTTON
  if (closeReel) {
    closeReel.addEventListener('click', function() {
      console.log('Close clicked!');
      closeDemoReel();
    });
  }
  
  // Close demo reel function
  function closeDemoReel() {
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
      if (lampContainer) lampContainer.classList.remove('hidden');
      if (homePrompt) {
        homePrompt.classList.remove('hidden');
        homePrompt.classList.add('visible');
      }
      changeLampImage('home');
    }, 300);
  }
  
  // VIDEO CLICK to pause/play
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
});