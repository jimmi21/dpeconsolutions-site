// Mobile menu toggle & year
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
}
document.getElementById('year').textContent = new Date().getFullYear();

// Optional: prevent default mailto submit on some browsers to show a small confirmation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', () => {
    // Basic UX hint; mail client will open
    setTimeout(() => alert('Άνοιξε το πρόγραμμα email σας για αποστολή. Ευχαριστούμε!'), 200);
  });
}
