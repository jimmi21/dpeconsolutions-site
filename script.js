// Mobile menu toggle & year
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
}
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); nav?.classList.remove('show'); }
  });
});

// Simple submit UX for mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', () => {
    setTimeout(() => alert('Άνοιξε το πρόγραμμα email σας για αποστολή. Ευχαριστούμε!'), 200);
  });
}
