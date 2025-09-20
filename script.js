// Mobile menu toggle & year
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
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
