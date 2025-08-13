// ===== AOS Init =====
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 900, once: true });
});

// ===== Scroll to Top =====
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  scrollToTopBtn.classList.toggle('show', window.scrollY > 260);
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Tilt Effect =====
const tiltEls = document.querySelectorAll('[data-tilt]');
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

tiltEls.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotX = clamp((0.5 - py) * 14, -10, 10);
    const rotY = clamp((px - 0.5) * 18, -14, 14);
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'rotateX(0) rotateY(0)';
  });
});

// ===== Hero Parallax =====
const hero = document.querySelector('.hero .container');
hero.addEventListener('mousemove', (e) => {
  const r = hero.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  hero.style.transform = `rotateX(${(-py * 2)}deg) rotateY(${(px * 2)}deg)`;
});
hero.addEventListener('mouseleave', () => {
  hero.style.transform = 'rotateX(0) rotateY(0)';
});

// ===== Particles Background =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ['#6a00ff', '#ff00ea', '#00f5ff'];
const numParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ===== Mobile Navbar Toggle =====
const navToggle = document.createElement('button');
navToggle.classList.add('nav-toggle');
navToggle.innerHTML = '☰';
document.querySelector('.nav-container').appendChild(navToggle);

navToggle.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('show');
});
