const navItems = document.querySelectorAll('.nav-item');
const currentPage = 'fine-arts';

window.addEventListener('DOMContentLoaded', () => {
  setActiveState();
  initBook();
  initMobile();
});

function setActiveState() {
  navItems.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
      item.style.color = 'rgb(234, 190, 123)';
    } else {
      item.classList.remove('active');
      item.style.color = '#ffefcc';
    }
  });
}

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => changeNavColor(item.dataset.page));
  item.addEventListener('mouseleave', () => setActiveState());
});

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
    item.style.color = item.dataset.page === page ? colors[page] : '#ffefcc';
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
let menuOpen = false;

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navbar.classList.toggle('menu-open', menuOpen);
  });
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && menuOpen) {
      menuOpen = false;
      navbar.classList.remove('menu-open');
    }
  });
}

// Lightbox
const lightbox = document.getElementById('book-lightbox');
const lightboxImg = document.getElementById('book-lightbox-img');
const lightboxClose = document.getElementById('book-lightbox-close');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
}

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

function initBook() {
  const artworkTotal = 31;
  const paintingsTotal = 7;
  const bookEl = document.getElementById('book');

  let artIdx = 1;
  let paintIdx = 1;
  let spreadCount = 0;

  // Pattern per 2 spreads:
  // Spread A: artwork, artwork
  // Spread B: artwork, painting (or painting, artwork — alternates sides)
  // Then repeat

  while (artIdx <= artworkTotal || paintIdx <= paintingsTotal) {
    const isEvenCycle = spreadCount % 4;

    let leftSrc, leftLabel, rightSrc, rightLabel;

    if (isEvenCycle === 0 || isEvenCycle === 2) {
      // Both artwork
      leftSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
      artIdx++;
      rightSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
      artIdx++;
    } else if (isEvenCycle === 1) {
      // art left, paint right — if paint gone, use art instead
      leftSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
      artIdx++;
      if (paintIdx <= paintingsTotal) {
        rightSrc = `assets/fine-arts/paintings/paint-${paintIdx}.png`;
        paintIdx++;
      } else {
        rightSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
        artIdx++;
      }
    } else {
      // paint left, art right — if paint gone, use art instead
      if (paintIdx <= paintingsTotal) {
        leftSrc = `assets/fine-arts/paintings/paint-${paintIdx}.png`;
        paintIdx++;
      } else {
        leftSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
        artIdx++;
      }
      rightSrc = artIdx <= artworkTotal ? `assets/fine-arts/artwork/artwork-${artIdx}.png` : null;
      artIdx++;
    }

    // Left page
    const leftPage = document.createElement('div');
    leftPage.className = 'page';
    if (leftSrc) {
      leftPage.innerHTML = `
        <div class="page-inner">
          <img src="${leftSrc}" class="page-img" data-src="${leftSrc}" alt="">
        </div>`;
    } else {
      leftPage.innerHTML = `<div class="page-inner page-blank"></div>`;
    }
    bookEl.appendChild(leftPage);

    // Right page
    const rightPage = document.createElement('div');
    rightPage.className = 'page';
    if (rightSrc) {
      rightPage.innerHTML = `
        <div class="page-inner">
          <img src="${rightSrc}" class="page-img" data-src="${rightSrc}" alt="">
        </div>`;
    } else {
      rightPage.innerHTML = `<div class="page-inner page-blank"></div>`;
    }
    bookEl.appendChild(rightPage);

    spreadCount++;
  }

  // Click to zoom
  bookEl.addEventListener('click', (e) => {
    const img = e.target.closest('.page-img');
    if (img) openLightbox(img.dataset.src);
  });

  const pageFlip = new St.PageFlip(bookEl, {
    width: 450,
    height: 580,
    showCover: false,
    mobileScrollSupport: false,
    usePortrait: false,
    autoSize: true,
    startPage: 0,
  });
  const allPages = document.querySelectorAll('#book .page');
  pageFlip.loadFromHTML(allPages);

  const counter = document.getElementById('book-counter');
  const totalSpreads = spreadCount;
  counter.textContent = `1 / ${totalSpreads}`;

  pageFlip.on('flip', (e) => {
    const spread = Math.floor(e.data / 2) + 1;
    counter.textContent = `${spread} / ${totalSpreads}`;
  });

  const prevBtn = document.getElementById('book-prev');
  const nextBtn = document.getElementById('book-next');

  prevBtn.addEventListener('click', () => {
    pageFlip.flipPrev('top');
  });

  nextBtn.addEventListener('click', () => {
    pageFlip.flipNext('top');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') pageFlip.flipPrev('top');
    if (e.key === 'ArrowRight') pageFlip.flipNext('top');
  });
}

function initMobile() {
  const artworkTotal = 31;
  const paintingsTotal = 7;

  const vol1 = document.getElementById('mobile-vol-1');
  const vol2 = document.getElementById('mobile-vol-2');
  const counter = document.getElementById('mobile-counter');

  // Build Vol. 1 - artwork
  for (let i = 1; i <= artworkTotal; i++) {
    const slide = document.createElement('div');
    slide.className = 'mobile-slide';
    const src = `assets/fine-arts/artwork/artwork-${i}.png`;
    slide.innerHTML = `
      <div style="position:relative;">
        <img src="${src}" alt="Artwork ${i}" style="width:100%;height:auto;border-radius:8px;">
        <button class="mobile-fullscreen-btn" data-src="${src}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>`;
    vol1.appendChild(slide);
  }

  // Build Vol. 2 - paintings
  for (let i = 1; i <= paintingsTotal; i++) {
    const slide = document.createElement('div');
    slide.className = 'mobile-slide';
    const src = `assets/fine-arts/paintings/paint-${i}.png`;
    slide.innerHTML = `
      <div style="position:relative;">
        <img src="${src}" alt="Painting ${i}" style="width:100%;height:auto;border-radius:8px;">
        <button class="mobile-fullscreen-btn" data-src="${src}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>`;
    vol2.appendChild(slide);
  }

  // Fullscreen button clicks open lightbox
  document.querySelector('.mobile-book').addEventListener('click', (e) => {
    const btn = e.target.closest('.mobile-fullscreen-btn');
    if (btn) openLightbox(btn.dataset.src);
  });

  let currentVol = 1;
  let currentSlide = 0;

  function getCurrentContainer() {
    return currentVol === 1 ? vol1 : vol2;
  }

  function getTotal() {
    return currentVol === 1 ? artworkTotal : paintingsTotal;
  }

  function showSlide(index) {
    const container = getCurrentContainer();
    const slides = container.querySelectorAll('.mobile-slide');
    slides.forEach(s => s.style.display = 'none');
    if (slides[index]) {
      slides[index].style.display = 'block';
    }
    counter.textContent = `${index + 1} / ${getTotal()}`;
    currentSlide = index;
  }

  function switchVol(vol) {
    currentVol = vol;
    currentSlide = 0;
    vol1.style.display = vol === 1 ? 'block' : 'none';
    vol2.style.display = vol === 2 ? 'block' : 'none';
    document.querySelectorAll('.mobile-tab').forEach(t => {
      t.classList.toggle('active', parseInt(t.dataset.vol) === vol);
    });
    showSlide(0);
  }

  document.getElementById('mobile-prev').addEventListener('click', () => {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  });

  document.getElementById('mobile-next').addEventListener('click', () => {
    if (currentSlide < getTotal() - 1) showSlide(currentSlide + 1);
  });

  document.querySelectorAll('.mobile-tab').forEach(tab => {
    tab.addEventListener('click', () => switchVol(parseInt(tab.dataset.vol)));
  });

  // Swipe support
  let touchStartX = 0;
  document.querySelector('.mobile-book').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  document.querySelector('.mobile-book').addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < getTotal() - 1) showSlide(currentSlide + 1);
      if (diff < 0 && currentSlide > 0) showSlide(currentSlide - 1);
    }
  });

  // Init — show vol 1, slide 0
  vol2.style.display = 'none';
  showSlide(0);
}