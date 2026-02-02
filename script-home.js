// Home page (Demo Reel) script
const scene = document.querySelector('.scene');
const stringHome = document.querySelector('.string-home');
const lampContainer = document.querySelector('.lamp-home-container');
const homePrompt = document.querySelector('.home-prompt');
const demoreelContainer = document.querySelector('.demoreel-container');
const stringSound = document.getElementById('string-sound');
const navItems = document.querySelectorAll('.nav-item');
const lampHome = document.querySelector('.lamp-home');

// Navbar hover - change lamp and nav item colors
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const page = item.dataset.page;
    changeLampColor(page);
    changeNavColor(page);
  });
  
  item.addEventListener('mouseleave', () => {
    changeLampColor('home');
    changeNavColor('home');
  });
});

function changeLampColor(page) {
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
    home: '#2a2a2a',
    animation: '#6d8b6c',
    production: '#de6f5f',
    resume: '#836190',
    about: '#6f6dac'
  };
  navItems.forEach(item => {
    if (item.dataset.page === page) {
      item.style.color = colors[page];
    } else {
      item.style.color = '#2a2a2a';
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