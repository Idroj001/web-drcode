const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const fontSize = 16;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let drops = [];
let animId = null;
let gradient = null;

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function buildGradient() {
  gradient = ctx.createLinearGradient(0, -fontSize, 0, 0);
  gradient.addColorStop(0, '#39ff75');
  gradient.addColorStop(0.5, isDark() ? '#2bff6e' : '#008f11');
  gradient.addColorStop(1, isDark() ? '#00c853' : '#007f4f');
}

function trailColor() {
  return isDark() ? 'rgba(14, 17, 15, 0.07)' : 'rgba(244, 246, 245, 0.07)';
}

function sizeCanvas() {
  const previous = drops;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.max(1, Math.ceil(canvas.width / fontSize));
  drops = Array.from({ length: columns }, (_, i) =>
    i < previous.length ? previous[i] : Math.random() * (canvas.height / fontSize)
  );
}

function draw() {
  ctx.fillStyle = trailColor();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = gradient;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(char, x, y);
    drops[i] += 0.35 + Math.random() * 0.35;

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.976) {
      drops[i] = 0;
    }
  }

  animId = requestAnimationFrame(draw);
}

function stop() {
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function start() {
  if (reduceMotion.matches) {
    stop();
    return;
  }
  if (!animId) draw();
}

sizeCanvas();
buildGradient();
start();

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stop();
  } else {
    start();
  }
});

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    sizeCanvas();
    buildGradient();
    if (reduceMotion.matches) stop();
  }, 150);
});

new MutationObserver(() => {
  buildGradient();
  if (reduceMotion.matches) stop();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

if (typeof reduceMotion.addEventListener === 'function') {
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) stop();
    else start();
  });
}
