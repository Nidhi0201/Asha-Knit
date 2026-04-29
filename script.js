/* ── Config ── Replace with your actual WhatsApp number (digits only, with country code, no + or spaces) */
const WA = '919879655156';
const waLink = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* ── Nav scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', scrollY > 40), {passive:true});

/* ── Hamburger ── */
const hamburger = document.querySelector('.hamburger');
const navEl = document.querySelector('nav');
hamburger?.addEventListener('click', () => {
  navEl?.classList.toggle('menu-open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.nav-center a').forEach(a => a.addEventListener('click', () => {
  navEl?.classList.remove('menu-open');
  hamburger?.classList.remove('open');
}));

/* ── WhatsApp links ── */
function applyWaLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    const href = waLink(el.dataset.wa);
    if (el.tagName === 'A') el.href = href;
    else el.addEventListener('click', () => window.open(href, '_blank'));
  });
}

/* ── Float WA button ── */
function initFloatBtn() {
  const btn = document.querySelector('.wa-float');
  if (btn) btn.href = waLink("Hi Asha! 🌸 I'd love to learn more about your handmade pieces and place an order.");
}

/* ── Lightbox ── */
let lbImgs = [], lbIdx = 0, lbCat = '';
const lb     = document.getElementById('lightbox');
const lbImg  = document.getElementById('lb-img');
const lbOrd  = document.getElementById('lb-order');

function openLb(imgs, i, cat) {
  lbImgs = imgs; lbIdx = i; lbCat = cat;
  showLb();
  lb?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function showLb() {
  if (!lbImg) return;
  lbImg.src = lbImgs[lbIdx];
  if (lbOrd) lbOrd.href = waLink(`Hi Asha! 🌸 I saw this piece in your ${lbCat} collection and I'd love to order it. Can you share details?`);
}
function closeLb() { lb?.classList.remove('open'); document.body.style.overflow = ''; }

document.getElementById('lb-close')?.addEventListener('click', closeLb);
document.getElementById('lb-prev')?.addEventListener('click', () => { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; showLb(); });
document.getElementById('lb-next')?.addEventListener('click', () => { lbIdx = (lbIdx + 1) % lbImgs.length; showLb(); });
lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLb();
  if (e.key === 'ArrowLeft')  { lbIdx = (lbIdx - 1 + lbImgs.length) % lbImgs.length; showLb(); }
  if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbImgs.length; showLb(); }
});

/* ── Gallery init ── */
function initGallery() {
  const items = [...document.querySelectorAll('.m-item[data-src]')];
  if (!items.length) return;
  const imgs = items.map(el => el.dataset.src);
  const cat  = document.querySelector('.page-header h1')?.textContent ?? 'Collection';
  items.forEach((el, i) => el.addEventListener('click', () => openLb(imgs, i, cat)));
}

/* ── Collection filter ── */
function initFilter() {
  const btns  = [...document.querySelectorAll('.filter-btn[data-cat]')];
  const cards = document.querySelectorAll('.prod-card[data-cat]');
  if (!btns.length) return;

  function applyFilter(cat) {
    cards.forEach(c => { c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none'; });
  }

  // Apply filter on click
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.cat);
  }));

  // Apply filter on load based on the active button
  const activeBtn = btns.find(b => b.classList.contains('active'));
  if (activeBtn) applyFilter(activeBtn.dataset.cat);
}

/* ── Cat cards ── */
function initCatCards() {
  document.querySelectorAll('.cat-card[data-href]').forEach(c => {
    c.addEventListener('click', () => { window.location.href = c.dataset.href; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyWaLinks();
  initFloatBtn();
  initGallery();
  initFilter();
  initCatCards();
});
