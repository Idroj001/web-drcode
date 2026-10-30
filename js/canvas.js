const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const fontSize = 16;
let drops = Array(Math.floor(canvas.width / fontSize)).fill(0);

let animId = null;
let paused = false;

const gradCache = ctx.createLinearGradient(0, -fontSize, 0, 0);
gradCache.addColorStop(0, '#39ff75');
gradCache.addColorStop(0.5, '#008f11');
gradCache.addColorStop(1, '#007f4f');

function draw() {
  if (paused) {
    animId = requestAnimationFrame(draw);
    return;
  }

  ctx.fillStyle = 'rgba(240, 240, 240, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = gradCache;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    
    ctx.fillText(char, x, y);
    drops[i] += 0.7 + Math.random() * 0.5;

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
  }

  animId = requestAnimationFrame(draw);
}

draw();

document.addEventListener('visibilitychange', () => {
  paused = document.hidden;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newColumns = Math.floor(canvas.width / fontSize);
  drops = Array(newColumns).fill(0);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (animId) cancelAnimationFrame(animId);
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#008f11';
  ctx.font = `${fontSize}px monospace`;
  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, Math.random() * canvas.height);
  }
}