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

// ===== Trading Chart Background =====
const canvas = document.getElementById('particles'); // reuse same canvas id
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let chartData = [];
const chartLines = 3; // number of animated lines
const colors = ['#6a00ff', '#ff00ea', '#00f5ff'];

function initChart() {
  chartData = [];
  for (let i = 0; i < chartLines; i++) {
    const points = [];
    for (let x = 0; x < canvas.width; x += 20) {
      points.push({
        x,
        y: canvas.height / 2 + Math.sin(x * 0.01 + i) * 50 + (Math.random() * 40 - 20)
      });
    }
    chartData.push(points);
  }
}

function animateChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  chartData.forEach((points, index) => {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      points[i].y += Math.sin(Date.now() / 500 + i) * 0.3; // wave effect
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = colors[index % colors.length];
    ctx.stroke();
  });

  requestAnimationFrame(animateChart);
}

initChart();
animateChart();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initChart();
});

// ===== Mobile Navbar Toggle =====
const navToggle = document.createElement('button');
navToggle.classList.add('nav-toggle');
navToggle.innerHTML = '☰';
document.querySelector('.nav-container').appendChild(navToggle);

navToggle.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('show');
});

window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


