// ---------- NAV ----------
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  });
}

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
if (burgerBtn && mobileMenu && menuClose) {
  burgerBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
}

// ---------- LOGO FALLBACK ----------
// Looks for assets/logo.png. If it's not there yet, the inline seal mark
// (already in the HTML) stays visible instead. Once you save your real
// logo file as assets/logo.png, it will replace the seal automatically.
const LOGO_PATH = (window.ASSET_PREFIX || '') + 'assets/logo.png';
document.querySelectorAll('.logo-slot').forEach(slot => {
  const img = new Image();
  img.onload = () => {
    slot.querySelector('svg').style.display = 'none';
    const logoImg = document.createElement('img');
    logoImg.src = LOGO_PATH;
    logoImg.alt = 'T.R. Sithole Attorneys';
    logoImg.className = 'seal-mark';
    logoImg.style.width = getComputedStyle(slot.querySelector('svg')).width;
    logoImg.style.objectFit = 'contain';
    slot.prepend(logoImg);
  };
  img.src = LOGO_PATH;
});

// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
