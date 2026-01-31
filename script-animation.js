// =============================================
// script-animation.js
// (copy everything below into a separate file)
// =============================================
const defaultLampColor = 'green';

const scene = document.querySelector('.scene');
const lampContainer = document.querySelector('.lamp-container');
const stringOn = document.querySelector('.string-on');
const navbar = document.querySelector('.navbar');
const content = document.querySelector('.content');
const navItems = document.querySelectorAll('.nav-item');
const stringSound = document.getElementById('string-sound');
const menuToggle = document.querySelector('.menu-toggle');

let isVisible = true;
let menuOpen = false;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle('menu-open', menuOpen);
  });
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && menuOpen) {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector(`.lamp-${defaultLampColor}`).classList.add('active');
  stringOn.classList.add('active', 'clickable');
  scene.classList.add('lit');
  navbar.classList.add('visible');
  setTimeout(() => { slideLampOff(); }, 1000);
});

function slideLampOff() {
  lampContainer.classList.add('slide-off');
  setTimeout(() => {
    content.classList.add('visible');
    content.classList.add('centered');
  }, 300);
  isVisible = false;
}

stringOn.addEventListener('click', toggleLamp);

function toggleLamp() {
  stringSound.currentTime = 0;
  stringSound.play().catch(err => console.log('Audio play failed:', err));
  if (isVisible) {
    slideLampOff();
  } else {
    content.classList.remove('visible');
    content.classList.remove('centered');
    setTimeout(() => { lampContainer.classList.remove('slide-off'); }, 300);
    isVisible = true;
  }
}

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (!isVisible) return;
    changeLampColor(item.dataset.color);
  });
  item.addEventListener('mouseleave', () => {
    if (!isVisible) return;
    changeLampColor(defaultLampColor);
  });
  item.addEventListener('click', (e) => {
    if (item.getAttribute('href') === 'index.html') {
      localStorage.setItem('cameFromColorPage', 'true');
    }
  });
});

function changeLampColor(color) {
  document.querySelectorAll('.lamp-on').forEach(lamp => lamp.classList.remove('active'));
  if (color === 'home') {
    document.querySelector('.lamp-home-noshadows').classList.add('active');
    setTimeout(() => {
      document.querySelector('.lamp-home-noshadows').classList.remove('active');
      document.querySelector('.lamp-home').classList.add('active');
    }, 5000);
  } else {
    document.querySelector(`.lamp-${color}`).classList.add('active');
  }
}