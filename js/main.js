const WHATSAPP_NUMBER = '593999806465';

const PARTIALS = {
  header: `<header>
  <div class="header-inner">
    <a href="index.html" class="logo">
      <span class="logo-braces">{</span><span class="logo-text">Dr</span><span class="logo-dot">.</span><span class="logo-text">Code</span><span class="logo-braces">}</span>
    </a>
    <button class="hamburger" aria-label="Menú de navegación" aria-expanded="false" aria-controls="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav id="nav-menu" aria-label="Navegación principal">
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link" data-page="index">Inicio</a></li>
        <li><a href="servicios.html" class="nav-link" data-page="servicios">Servicios</a></li>
        <li><a href="skills.html" class="nav-link" data-page="skills">Skills</a></li>
        <li><a href="contacto.html" class="nav-link nav-cta" data-page="contacto">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>`,
  footer: `<footer>
  <div class="footer-inner">
    <div class="footer-logo">
      <span class="logo-braces">{</span><span class="logo-text">Dr</span><span class="logo-dot">.</span><span class="logo-text">Code</span><span class="logo-braces">}</span>
    </div>
    <p class="footer-copy">Todos los derechos reservados &copy; ${new Date().getFullYear()} {Dr.Code}</p>
    <a href="index.html" class="footer-home" aria-label="Volver al inicio" title="Inicio">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/></svg>
    </a>
  </div>
</footer>`,
  modal: `<div class="modal-overlay" aria-hidden="true">
  <div class="modal" id="contactModal" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">Solicitar Servicio</h2>
      <button class="modal-close" aria-label="Cerrar">&times;</button>
    </div>
    <form class="contact-form" id="contactForm" novalidate>
      <div class="form-group">
        <label for="name">Nombre <span class="form-required">*</span></label>
        <input type="text" id="name" name="name" required placeholder="Tu nombre completo" autocomplete="name" data-autofocus>
      </div>
      <div class="form-group">
        <label for="email">Email <span class="form-required">*</span></label>
        <input type="email" id="email" name="email" required placeholder="tu@email.com" autocomplete="email">
      </div>
      <div class="form-group">
        <label for="phone">Teléfono <span class="form-required">*</span></label>
        <input type="tel" id="phone" name="phone" required placeholder="+593 XX XXX XXXX" autocomplete="tel">
      </div>
      <div class="form-group">
        <label for="service">Servicio</label>
        <select id="service" name="service">
          <option value="web">Página Web</option>
          <option value="landing">Landing Page</option>
          <option value="carrito">Carrito de Compras</option>
          <option value="menu">Menú Digital</option>
          <option value="tarjeta">Tarjeta de Presentación</option>
          <option value="automatizacion">Automatización</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" placeholder="Cuéntame sobre tu proyecto..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Enviar Solicitud</button>
    </form>
  </div>
</div>`
};

const SERVICE_LABELS = {
  'web': 'Página Web',
  'landing': 'Landing Page',
  'carrito': 'Carrito de Compras',
  'menu': 'Menú Digital',
  'tarjeta': 'Tarjeta de Presentación',
  'automatizacion': 'Automatización',
  'otro': 'Otro'
};

/* ---------------------------------------------------------------------------
   Tema claro / oscuro
   --------------------------------------------------------------------------- */

const THEME_KEY = 'drcode_theme';

const THEME_ICONS = {
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
};

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function getPreferredTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.querySelector('.theme-toggle-float');
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.innerHTML = isDark ? THEME_ICONS.sun : THEME_ICONS.moon;
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
  btn.setAttribute('title', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
}

function initThemeToggle() {
  const attr = document.documentElement.getAttribute('data-theme');
  const current = attr === 'dark' || attr === 'light' ? attr : getPreferredTheme();

  if (!document.querySelector('.theme-toggle-float')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle-float';
    btn.innerHTML = THEME_ICONS.moon;
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* almacenamiento no disponible: el tema dura la sesión */
      }
      applyTheme(next);
    });
    document.body.appendChild(btn);
  }

  applyTheme(current);

  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
    }
  }
}

/* ---------------------------------------------------------------------------
   Diálogos accesibles: foco atrapado, fondo inerte y retorno de foco
   --------------------------------------------------------------------------- */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

const dialogStates = new Map();
let dialogStack = [];

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(el => el.getClientRects().length > 0);
}

function setBackgroundInert(inert) {
  const targets = document.querySelectorAll(
    'header, main, footer, .whatsapp-float, .theme-toggle-float, .admin-badge'
  );
  targets.forEach(el => {
    if (inert) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  });
}

function openDialog(overlay, modal, closeFn) {
  if (!overlay || !modal) return;
  if (overlay.classList.contains('open')) return;

  const state = {
    overlay,
    modal,
    close: closeFn,
    opener: document.activeElement instanceof HTMLElement ? document.activeElement : null
  };
  dialogStates.set(overlay, state);
  dialogStack.push(state);

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  setBackgroundInert(true);
  document.body.style.overflow = 'hidden';

  window.setTimeout(() => {
    if (!overlay.classList.contains('open')) return;
    const target = modal.querySelector('[data-autofocus]') || getFocusable(modal)[0] || modal;
    if (!modal.hasAttribute('tabindex') && target === modal) modal.setAttribute('tabindex', '-1');
    target.focus();
  }, 80);
}

function closeDialog(overlay, modal) {
  if (!overlay) return;
  const state = dialogStates.get(overlay);
  const opener = state ? state.opener : null;

  overlay.classList.remove('open');
  if (modal) modal.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  dialogStates.delete(overlay);
  dialogStack = dialogStack.filter(item => item.overlay !== overlay);

  if (!dialogStack.length) {
    document.body.style.overflow = '';
    setBackgroundInert(false);
  }

  const canRestoreFocus = opener && document.contains(opener) && !opener.disabled &&
    typeof opener.matches === 'function' && opener.matches(FOCUSABLE_SELECTOR);

  if (canRestoreFocus) {
    window.setTimeout(() => opener.focus(), 0);
  } else {
    window.setTimeout(() => {
      const fallback = document.querySelector('main h1') || document.querySelector('main');
      if (!fallback) return;
      if (!fallback.hasAttribute('tabindex')) fallback.setAttribute('tabindex', '-1');
      fallback.focus();
    }, 0);
  }
}

function trapDialogFocus(event) {
  const state = dialogStack[dialogStack.length - 1];
  if (!state) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    if (typeof state.close === 'function') state.close();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = getFocusable(state.modal);
  if (!focusable.length) {
    event.preventDefault();
    state.modal.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !state.modal.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (active === last || !state.modal.contains(active))) {
    event.preventDefault();
    first.focus();
  }
}

document.addEventListener('keydown', trapDialogFocus);

document.addEventListener('focusin', (event) => {
  const state = dialogStack[dialogStack.length - 1];
  if (!state || state.modal.contains(event.target)) return;
  const focusable = getFocusable(state.modal);
  if (focusable.length) focusable[0].focus();
});

function bindFieldValidation(form) {
  if (!form) return;
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('invalid', handleFieldError);
    field.addEventListener('blur', handleFieldBlur);
    field.addEventListener('input', handleFieldInput);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();
  initThemeToggle();
  injectWhatsAppFloat();
  syncFloatsWithFooter();
  initNavigation();
  initModal();
  initContactForm();
  updateActiveNavLink();
  if (document.getElementById('skills-carousel')) {
    initSkillsCarousel();
  }
});

function loadPartials() {
  const names = ['header', 'footer'];
  const pageHasOwnForm = !!document.querySelector('main form');
  if (!document.querySelector('.modal-overlay') && !pageHasOwnForm) {
    names.push('modal');
  }
  names.forEach(name => {
    const container = document.getElementById(`${name}-container`);
    if (container) {
      container.innerHTML = PARTIALS[name];
    }
  });
}

function injectWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float')) return;

  const el = document.createElement('div');
  el.className = 'whatsapp-float';
  el.innerHTML = `<a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp">
    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>`;
  document.body.appendChild(el);
}

/* Ambos flotantes suben juntos al llegar al footer: misma altura,
   mismo desplazamiento y mismo punto de parada. El levantamiento se
   calcula del alto real del footer (varía entre desktop y móvil). */
function syncFloatsWithFooter() {
  const floats = [
    { el: document.querySelector('.whatsapp-float'), cls: 'whatsapp-float--above' },
    { el: document.querySelector('.theme-toggle-float'), cls: 'theme-toggle-float--above' }
  ].filter(item => item.el);

  const footer = document.querySelector('#footer-container footer');
  if (!footer || !floats.length) return;

  let overFooter = false;

  const applyLift = () => {
    const bottom = overFooter ? `${footer.offsetHeight + 16}px` : '';
    floats.forEach(({ el, cls }) => {
      el.classList.toggle(cls, overFooter);
      el.style.bottom = bottom;
    });
  };

  const observer = new IntersectionObserver(([entry]) => {
    overFooter = entry.isIntersecting;
    applyLift();
  }, { rootMargin: '0px 0px 48px 0px' });

  observer.observe(footer);

  window.addEventListener('resize', () => {
    if (overFooter) applyLift();
  });
}

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  const setOpen = (open) => {
    navMenu.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    setOpen(!navMenu.classList.contains('active'));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      setOpen(false);
      hamburger.focus();
    }
  });
}

function updateActiveNavLink() {
  const path = window.location.pathname.replace(/\\/g, '/');
  const currentPage = path.split('/').pop() || 'index.html';
  const demoPages = [
    'demo-web.html',
    'demo-landing.html',
    'demo-carrito.html',
    'demo-menu.html',
    'demo-tarjeta.html',
    'demo-automatizacion.html'
  ];
  const targetPage = demoPages.includes(currentPage) ? 'servicios.html' : currentPage;

  document.querySelectorAll('.nav-link').forEach(link => {
    const isActive = link.getAttribute('href') === targetPage;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.closest('.modal-overlay');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  const modalForm = modal.querySelector('form');
  if (modalForm) {
    modalForm.addEventListener('submit', handleFormSubmit);
    bindFieldValidation(modalForm);
  }
}

function initContactForm() {
  const pageForm = document.querySelector('main form#contactForm');
  if (!pageForm) return;

  pageForm.addEventListener('submit', handleFormSubmit);
  bindFieldValidation(pageForm);
}

function handleFieldError(e) {
  e.preventDefault();
  const field = e.target;
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const existing = group.querySelector('.field-error');
  if (existing) existing.remove();
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = field.validationMessage;
  err.setAttribute('role', 'alert');
  group.appendChild(err);
}

function handleFieldBlur(e) {
  const field = e.target;
  if (field.checkValidity()) {
    const group = field.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      const err = group.querySelector('.field-error');
      if (err) err.remove();
    }
  }
}

function handleFieldInput(e) {
  const field = e.target;
  const group = field.closest('.form-group');
  if (!group) return;
  if (group.classList.contains('has-error') && field.checkValidity()) {
    group.classList.remove('has-error');
    const err = group.querySelector('.field-error');
    if (err) err.remove();
  }
}

function openModalFor(service) {
  const serviceSelect = document.getElementById('service');
  if (serviceSelect && SERVICE_LABELS[service]) {
    serviceSelect.value = service;
  }
  openModal();
}

function openModal() {
  const modal = document.getElementById('contactModal');
  const overlay = modal ? modal.closest('.modal-overlay') : null;

  if (modal && overlay) {
    openDialog(overlay, modal, closeModal);
  }
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  const overlay = modal ? modal.closest('.modal-overlay') : null;

  if (modal && overlay) {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      form.querySelectorAll('.has-error').forEach(g => {
        g.classList.remove('has-error');
        const err = g.querySelector('.field-error');
        if (err) err.remove();
      });
    }
    closeDialog(overlay, modal);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  if (!form.checkValidity()) {
    const firstInvalid = form.querySelector(':invalid');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Abriendo WhatsApp...';
  }

  const value = (name) => {
    const field = form.elements[name];
    return field ? field.value.trim() : '';
  };

  const service = value('service');
  const serviceText = SERVICE_LABELS[service] || service || 'No especificado';

  const whatsappMessage = [
    '*Nueva Solicitud - {Dr.Code}*',
    '',
    `*Nombre:* ${value('name')}`,
    `*Email:* ${value('email')}`,
    `*Teléfono:* ${value('phone')}`,
    `*Servicio:* ${serviceText}`,
    `*Mensaje:* ${value('message')}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappUrl, '_blank', 'noopener');
  closeModal();
  showToast('Abriendo WhatsApp con tu solicitud...');

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }
}

function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 4000);
}

function initSkillsCarousel() {
  const container = document.getElementById('skills-carousel');
  if (!container) return;

  const skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', desc: 'Estructura semántica y contenido web accesible' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', desc: 'Estilos modernos, animaciones y diseño responsivo' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', desc: 'Interactividad dinámica y lógica del lado del cliente' },
    { name: 'OpenCode', icon: 'assets/skills/opencode.svg', desc: 'Agente de IA open source para desarrollo asistido' },
    { name: 'Warp', icon: 'https://cdn.simpleicons.org/warp/01A4FF', desc: 'Terminal moderna con productividad aumentada' },
    { name: 'Obsidian', icon: 'https://cdn.simpleicons.org/obsidian/7C3AED', desc: 'Gestión de conocimiento y notas interconectadas' },
    { name: 'Hostinger', icon: 'https://cdn.simpleicons.org/hostinger/673DE6', desc: 'Hosting web rápido y panel de control intuitivo' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', desc: 'Control de versiones y colaboración en equipo' },
  ];

  let slidesHTML = '';
  let dotsHTML = '<div class="carousel-dots" role="group" aria-label="Seleccionar habilidad">';
  skills.forEach((s, i) => {
    slidesHTML += `
      <div class="carousel-slide${i === 0 ? ' active' : ''}" aria-hidden="${i === 0 ? 'false' : 'true'}">
        <div class="carousel-content">
          <img class="carousel-logo" src="${s.icon}" alt="${s.name}"${i > 1 ? ' loading="lazy"' : ''}>
          <span class="carousel-name">${s.name}</span>
          <p class="carousel-desc">${s.desc}</p>
        </div>
      </div>`;
    dotsHTML += `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="${s.name} (${i + 1} de ${skills.length})"></button>`;
  });
  dotsHTML += '</div>';

  container.innerHTML = slidesHTML + dotsHTML;

  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let interval = null;

  function goTo(index) {
    if (index === current) return;
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-current', 'false');
    slides[index].classList.add('active');
    slides[index].setAttribute('aria-hidden', 'false');
    dots[index].classList.add('active');
    dots[index].setAttribute('aria-current', 'true');
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function start() {
    stop();
    if (reduceMotion.matches) return;
    interval = setInterval(next, 3000);
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      goTo(idx);
      syncAutoplay();
    });
  });

  let inView = true;
  let hovering = false;
  let focused = false;

  function syncAutoplay() {
    if (document.hidden || !inView || hovering || focused) stop();
    else start();
  }

  container.addEventListener('mouseenter', () => { hovering = true; syncAutoplay(); });
  container.addEventListener('mouseleave', () => { hovering = false; syncAutoplay(); });
  container.addEventListener('focusin', () => { focused = true; syncAutoplay(); });
  container.addEventListener('focusout', (e) => {
    if (!container.contains(e.relatedTarget)) { focused = false; syncAutoplay(); }
  });

  /* Pausa silenciosa: sin botones visibles, el carrusel no avanza
     mientras está fuera de pantalla (compensación de WCAG 2.2.2). */
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      syncAutoplay();
    }, { threshold: [0, 0.25] });
    visibility.observe(container);
  }

  document.addEventListener('visibilitychange', syncAutoplay);

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', syncAutoplay);
  }

  start();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.openModalFor = openModalFor;