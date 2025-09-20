// Mobile menu toggle & year
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); nav?.classList.remove('show'); }
  });
});

// Contact form UX
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', ()=> setTimeout(()=> alert('Το πρόγραμμα email σας θα ανοίξει για να στείλετε το μήνυμα.'),200));

// Calculator fallback if iframe is blocked by X-Frame-Options
setTimeout(()=>{
  const iframe = document.getElementById('calcFrame');
  const fallback = document.getElementById('calcFallback');
  if (!iframe) return;
  let loaded = false;
  iframe.addEventListener('load', ()=> { loaded = true; });
  setTimeout(()=>{ if (!loaded && fallback) fallback.style.display = 'block'; }, 3000);
}, 300);
