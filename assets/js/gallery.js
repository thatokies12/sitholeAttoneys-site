// Edit this list to match your real filenames in the "gallery/" folder.
// Default assumes you've batch-renamed to gallery.jpg, gallery (1).jpg ... gallery (29).jpg
// (see step-by-step instructions in chat). If you'd rather keep the original
// PHOTO-2026-08-17-... names, just replace the "file" values below with those.
const GALLERY_ITEMS = [
  { file: "gallery.jpg", cap: "Office Exterior" },
  { file: "gallery (1).jpg", cap: "Reception" },
  { file: "gallery (2).jpg", cap: "Consultation Room" },
  { file: "gallery (3).jpg", cap: "Boardroom" },
  { file: "gallery (4).jpg", cap: "Signing of Documents" },
  { file: "gallery (5).jpg", cap: "Team Meeting" },
  { file: "gallery (6).jpg", cap: "Client Consultation" },
  { file: "gallery (7).jpg", cap: "Filing & Archives" },
  { file: "gallery (8).jpg", cap: "Court Appearance" },
  { file: "gallery (9).jpg", cap: "Director's Office" },
  { file: "gallery (10).jpg", cap: "Community — Football Sponsorship" },
  { file: "gallery (11).jpg", cap: "Tournament Day" },
  { file: "gallery (12).jpg", cap: "Reception Desk" },
  { file: "gallery (13).jpg", cap: "Waiting Area" },
  { file: "gallery (14).jpg", cap: "Working Session" },
  { file: "gallery (15).jpg", cap: "Contract Review" },
  { file: "gallery (16).jpg", cap: "Case Preparation" },
  { file: "gallery (17).jpg", cap: "Staff Portrait" },
  { file: "gallery (18).jpg", cap: "Community Outreach" },
  { file: "gallery (19).jpg", cap: "Office Corridor" },
  { file: "gallery (20).jpg", cap: "Consultation Room II" },
  { file: "gallery (21).jpg", cap: "Legal Library" },
  { file: "gallery (22).jpg", cap: "Meeting with Client" },
  { file: "gallery (23).jpg", cap: "Signing Ceremony" },
  { file: "gallery (24).jpg", cap: "Team at Work" },
  { file: "gallery (25).jpg", cap: "Community Event" },
  { file: "gallery (26).jpg", cap: "Boardroom Discussion" },
  { file: "gallery (27).jpg", cap: "Office Detail" },
  { file: "gallery (28).jpg", cap: "Front Entrance" },
  { file: "gallery (29).jpg", cap: "Practice Team" }
];

const spanPattern = ["wide", "", "", "tall", "", "", "", "wide", "", "tall"];

function renderGallery(containerId, limit, galleryPath) {
  const grid = document.getElementById(containerId);
  if (!grid) return [];
  const items = limit ? GALLERY_ITEMS.slice(0, limit) : GALLERY_ITEMS;
  const built = [];

  items.forEach((entry, i) => {
    const span = spanPattern[i % spanPattern.length];
    const item = document.createElement('div');
    item.className = 'g-item' + (span ? ' ' + span : '');
    item.dataset.cap = entry.cap;

    const src = galleryPath + entry.file;
    const img = document.createElement('img');
    img.src = src;
    img.alt = entry.cap;
    img.loading = 'lazy';
    img.onerror = function () {
      this.remove();
      const ph = document.createElement('div');
      ph.className = 'g-placeholder';
      ph.innerHTML = `<span>${String(i + 1).padStart(2, '0')}</span>`;
      item.prepend(ph);
    };
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
    built.push({ src, cap: entry.cap });
  });

  return built;
}

// ---------- LIGHTBOX (shared by home preview + full gallery page) ----------
let galleryItemsForLightbox = [];
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function renderLightbox() {
  const data = galleryItemsForLightbox[lbIndex];
  const wrap = document.getElementById('lbImageWrap');
  wrap.innerHTML = '';
  const img = new Image();
  img.src = data.src;
  img.alt = data.cap;
  img.onerror = () => {
    wrap.innerHTML = `<div class="g-placeholder" style="width:520px; max-width:80vw; aspect-ratio:4/3; margin:0 auto;"><span>${data.cap}</span></div>`;
  };
  wrap.appendChild(img);
  document.getElementById('lbCap').textContent = data.cap;
}

function initLightboxControls() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + galleryItemsForLightbox.length) % galleryItemsForLightbox.length;
    renderLightbox();
  });
  document.getElementById('lbNext').addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % galleryItemsForLightbox.length;
    renderLightbox();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
    if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  });
}
