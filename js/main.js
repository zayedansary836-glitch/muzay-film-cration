// js/main.js
// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // theme toggle
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('mfc_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
    if (localStorage.getItem('mfc_theme') === 'dark') {
      document.body.classList.add('dark');
      toggle.textContent = '☀️';
    }
  }

  // slider simple
  const slides = document.querySelector('.slides');
  const imgs = document.querySelectorAll('.slides img');
  if (slides && imgs.length) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % imgs.length;
      slides.style.transform = `translateX(${-idx * 100}%)`;
    }, 4000);
  }

  // inject sample creators (you can replace with DB-driven list later)
  const creators = [
    {name:'Sarah Lens', img:'https://i.pravatar.cc/200?img=12'},
    {name:'Mike Frame', img:'https://i.pravatar.cc/200?img=8'},
    {name:'Raj Edits', img:'https://i.pravatar.cc/200?img=5'},
    {name:'Anita Shots', img:'https://i.pravatar.cc/200?img=3'},
    {name:'Zahid Films', img:'https://i.pravatar.cc/200?img=10'}
  ];
  const carousel = document.getElementById('creatorCarousel');
  if (carousel) {
    carousel.innerHTML = creators.map(c => `
      <div class="creator">
        <img src="${c.img}" alt="${c.name}" style="width:100%;height:110px;object-fit:cover;border-radius:8px">
        <h4 style="margin:8px 0 0;color:var(--primary)">${c.name}</h4>
      </div>
    `).join('');
  }
});
