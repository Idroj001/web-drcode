const WHATSAPP_NUMBER = '593999806465';

const PARTIALS = {
  header: `<header>
  <div class="header-inner">
    <a href="index.html" class="logo">
      <span class="logo-braces">{</span><span class="logo-text">Dr</span><span class="logo-dot">.</span><span class="logo-text">Code</span><span class="logo-braces">}</span>
    </a>
    <button class="hamburger" aria-label="Menu de navegacion" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav>
      <ul class="nav-menu">
        <li><a href="index.html" class="nav-link" data-page="index">Inicio</a></li>
        <li><a href="servicios.html" class="nav-link" data-page="servicios">Servicios</a></li>
        <li><a href="skills.html" class="nav-link" data-page="skills">Skills</a></li>
        <li><a href="contacto.html" class="nav-link" data-page="contacto">Contacto</a></li>
        <li><a href="calendario.html" class="nav-link nav-cta" data-page="calendario">Agendamiento</a></li>
      </ul>
    </nav>
  </div>
</header>`,
  footer: `<footer>
  <div class="footer-inner">
    <div class="footer-logo">
      <span class="logo-braces">{</span><span class="logo-text">Dr</span><span class="logo-dot">.</span><span class="logo-text">Code</span><span class="logo-braces">}</span>
    </div>
    <p class="footer-copy">Todos los derechos reservados &copy; 2025 {Dr.Code}</p>
    <div class="social-links">
      <a href="#" class="social-link" aria-label="GitHub" title="GitHub">
        <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href="#" class="social-link" aria-label="Facebook" title="Facebook">
        <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href="#" class="social-link" aria-label="Instagram" title="Instagram">
        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href="#" class="social-link" aria-label="TikTok" title="TikTok">
        <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.93 6.24-1.73 1.34-3.85 2.08-6.07 1.75-3.22-.48-5.87-2.99-6.66-6.14-.88-3.51.29-7.19 2.87-9.51 2.6-2.29 6.37-2.98 9.41-1.44V.02z"/></svg>
      </a>
      <a href="#" class="social-link" aria-label="LinkedIn" title="LinkedIn">
        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>
  </div>
</footer>`,
  modal: `<div class="modal-overlay">
  <div class="modal" id="contactModal" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">Solicitar Servicio</h2>
      <button class="modal-close" aria-label="Cerrar">&times;</button>
    </div>
    <form class="contact-form" id="contactForm" novalidate>
      <div class="form-group">
        <label for="name">Nombre <span class="form-required">*</span></label>
        <input type="text" id="name" name="name" required placeholder="Tu nombre completo" autocomplete="name">
      </div>
      <div class="form-group">
        <label for="email">Email <span class="form-required">*</span></label>
        <input type="email" id="email" name="email" required placeholder="tu@email.com" autocomplete="email">
      </div>
      <div class="form-group">
        <label for="phone">Telefono <span class="form-required">*</span></label>
        <input type="tel" id="phone" name="phone" required placeholder="+593 XX XXX XXXX" autocomplete="tel">
      </div>
      <div class="form-group">
        <label for="service">Servicio</label>
        <select id="service" name="service">
          <option value="web">Pagina Web</option>
          <option value="landing">Landing Page</option>
          <option value="carrito">Carrito de Compras</option>
          <option value="menu">Menu Digital</option>
          <option value="tarjeta">Tarjeta de Presentacion</option>
          <option value="automatizacion">Automatizacion</option>
          <option value="agendamiento">Agendamiento de Cita</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" placeholder="Cuentanos sobre tu proyecto..."></textarea>
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
  'agendamiento': 'Agendamiento de Cita',
  'otro': 'Otro'
};

let currentWeekOffset = 0;
let selectedSlots = {};
let isAdmin = false;
const ADMIN_PASSWORD = 'admin123';

function saveSlots() {
  try {
    localStorage.setItem('drcode_slots', JSON.stringify(selectedSlots));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
}

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
  injectWhatsAppFloat();
  initNavigation();
  initModal();
  updateActiveNavLink();
  if (document.getElementById('calendar')) {
    initCalendar();
  }
  if (document.getElementById('skills-carousel')) {
    initSkillsCarousel();
  }
});

function loadPartials() {
  const names = ['header', 'footer'];
  if (!document.querySelector('.modal-overlay')) {
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

  const footer = document.querySelector('#footer-container footer');
  if (footer) {
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('whatsapp-float--above', entry.isIntersecting);
    }, { rootMargin: '0px 0px 48px 0px' });
    observer.observe(footer);
  }
}

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

function updateActiveNavLink() {
  const url = new URL(window.location.href);
  const currentPage = url.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
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
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    bindFieldValidation(contactForm);
  }
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

function openModal(scheduleData = null) {
  const modal = document.getElementById('contactModal');
  const overlay = document.querySelector('.modal-overlay');
  const serviceSelect = document.getElementById('service');
  const messageField = document.getElementById('message');
  
  if (scheduleData && serviceSelect && messageField) {
    serviceSelect.value = 'agendamiento';
    messageField.value = `Cita agendada:\n- Fecha: ${scheduleData.date}\n- Horario: ${scheduleData.time}\n\nMensaje:`;
  }
  
  if (modal && overlay) {
    modal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      const firstInput = modal.querySelector('input:not([type="hidden"])');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeModal() {
  const modal = document.getElementById('contactModal');
  const overlay = document.querySelector('.modal-overlay');
  
  if (modal && overlay) {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    
    const form = document.getElementById('contactForm');
    if (form) {
      form.reset();
      form.querySelectorAll('.has-error').forEach(g => {
        g.classList.remove('has-error');
        const err = g.querySelector('.field-error');
        if (err) err.remove();
      });
    }
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
    submitBtn.innerHTML = 'Enviando...';
  }
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;
  
  const serviceText = SERVICE_LABELS[service] || service;
  
  const whatsappMessage = `*Nueva Solicitud - {Dr.Code}*%0A%0A` +
    `*Nombre:* ${name}%0A` +
    `*Email:* ${email}%0A` +
    `*Telefono:* ${phone}%0A` +
    `*Servicio:* ${serviceText}%0A` +
    `*Mensaje:* ${message}`;
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  
  window.location.href = whatsappUrl;
  
  closeModal();
  showToast('Mensaje enviado correctamente. Te contactaremos pronto.');
  
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

function initCalendar() {
  initAdminLoginUI();
  
  const savedSlots = localStorage.getItem('drcode_slots');
  if (savedSlots) {
    try {
      selectedSlots = JSON.parse(savedSlots);
    } catch (e) {
      selectedSlots = {};
    }
  }
  
  renderCalendar();
  
  const toggleBtn = document.getElementById('weekToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (currentWeekOffset === 0) {
        currentWeekOffset = 1;
        toggleBtn.textContent = '← Semana Anterior';
      } else {
        currentWeekOffset = 0;
        toggleBtn.textContent = 'Siguiente Semana →';
      }
      renderCalendar();
    });
  }
  
  const calClose = document.getElementById('calModalClose');
  const calOverlay = document.getElementById('calendarModalOverlay');
  const calForm = document.getElementById('calendarForm');
  
  if (calClose) {
    calClose.addEventListener('click', closeCalendarModal);
  }
  
  if (calOverlay) {
    calOverlay.addEventListener('click', (e) => {
      if (e.target === calOverlay) closeCalendarModal();
    });
  }
  
  if (calForm) {
    calForm.addEventListener('submit', handleCalendarSubmit);
    bindFieldValidation(calForm);
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const calModal = document.getElementById('calendarModal');
      if (calModal && calModal.classList.contains('open')) {
        closeCalendarModal();
      }
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
      if (isAdmin) {
        isAdmin = false;
        hideAdminBadge();
        updateSlotStates();
        showToast('Sesión admin cerrada');
      }
    }
  });
  
  const h1 = document.querySelector('.container h1');
  if (h1) {
    h1.addEventListener('click', (e) => {
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        promptAdminLogin();
      }
    });
  }
}

function getWeekDates(offset = 0) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (offset * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return;
  
  const weekDates = getWeekDates(currentWeekOffset);
  const weekLabel = document.getElementById('weekLabel');
  
  const startDate = weekDates[0];
  const endDate = weekDates[6];
  const options = { day: 'numeric', month: 'short' };
  
  if (weekLabel) {
    weekLabel.textContent = `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`;
  }
  
  calendar.innerHTML = '';
  
  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  weekDates.forEach((date, index) => {
    const daySlot = document.createElement('div');
    daySlot.className = 'day-slot';
    
    const dateStr = date.toISOString().split('T')[0];
    const dayNum = String(date.getDate()).padStart(2, '0');
    const monthNum = String(date.getMonth() + 1).padStart(2, '0');
    
    daySlot.innerHTML = `
      <div class="day-header">
        <span class="day-name">${dayNames[index]}</span>
        <span class="day-date">${dayNum}/${monthNum}</span>
      </div>
      <div class="day-times">
        <button class="time-slot available" data-date="${dateStr}" data-time="Mañana" aria-label="Seleccionar mañana del ${dayNames[index]} ${dayNum}/${monthNum}">
          <span class="time-label">Mañana</span>
        </button>
        <button class="time-slot available" data-date="${dateStr}" data-time="Tarde" aria-label="Seleccionar tarde del ${dayNames[index]} ${dayNum}/${monthNum}">
          <span class="time-label">Tarde</span>
        </button>
      </div>
    `;
    
    calendar.appendChild(daySlot);
  });
  
  updateSlotStates();
  
  const slots = calendar.querySelectorAll('.time-slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => handleSlotClick(slot));
  });
}

function handleSlotClick(slot) {
  const dateStr = slot.dataset.date;
  const time = slot.dataset.time;
  const key = `${dateStr}_${time}`;
  const status = selectedSlots[key];
  
  if (isAdmin) {
    if (status === 'pending') {
      showAdminActions(slot, key);
    } else if (status === 'confirmed' || status === 'rejected') {
      showAdminRevert(slot, key);
    }
    return;
  }
  
  if (status === 'pending') return;
  
  openCalendarModal(dateStr, time);
}

function openCalendarModal(dateStr, time) {
  const overlay = document.getElementById('calendarModalOverlay');
  const modal = document.getElementById('calendarModal');
  if (!overlay || !modal) return;
  
  overlay.dataset.date = dateStr;
  overlay.dataset.time = time;
  
  const date = new Date(dateStr + 'T12:00:00');
  const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayNum = String(date.getDate()).padStart(2, '0');
  const monthNum = String(date.getMonth() + 1).padStart(2, '0');
  
  document.getElementById('calModalTitle').textContent = `Confirmar Cita – ${dayName} ${dayNum}/${monthNum} – ${time}`;
  
  overlay.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeCalendarModal() {
  const overlay = document.getElementById('calendarModalOverlay');
  const modal = document.getElementById('calendarModal');
  if (!overlay || !modal) return;
  
  overlay.classList.remove('open');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  
  const form = document.getElementById('calendarForm');
  if (form) form.reset();
}

function handleCalendarSubmit(e) {
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
    submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Enviando...';
  }
  
  const name = document.getElementById('calName').value;
  const phone = document.getElementById('calPhone').value;
  const email = document.getElementById('calEmail').value;
  const service = document.getElementById('calService').value;
  const message = document.getElementById('calMessage').value;
  
  const overlay = document.getElementById('calendarModalOverlay');
  const dateStr = overlay.dataset.date;
  const time = overlay.dataset.time;
  
  const serviceText = SERVICE_LABELS[service] || service || 'No especificado';
  
  const date = new Date(dateStr + 'T12:00:00');
  const dayName = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  
  const whatsappMessage = `*Agendamiento - {Dr.Code}*%0A%0A` +
    `*Nombre:* ${name}%0A` +
    `*Teléfono:* ${phone}%0A` +
    `*Email:* ${email}%0A` +
    `*Servicio:* ${serviceText}%0A` +
    `*Día:* ${dayName}%0A` +
    `*Jornada:* ${time}%0A` +
    `*Mensaje:* ${message}`;
  
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  
  window.location.href = whatsappUrl;
  
  const key = `${dateStr}_${time}`;
  selectedSlots[key] = 'pending';
  saveSlots();
  updateSlotStates();
  
  closeCalendarModal();
  showToast('Cita enviada. Te contactaremos para confirmar.');
  
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }
}

function updateSlotStates() {
  const slots = document.querySelectorAll('.time-slot');
  
  slots.forEach(slot => {
    const actions = slot.querySelector('.admin-actions');
    if (actions) actions.remove();
    
    const dateStr = slot.dataset.date;
    const time = slot.dataset.time;
    const key = `${dateStr}_${time}`;
    const status = selectedSlots[key];
    
    slot.classList.remove('available', 'pending', 'confirmed', 'rejected');
    
    if (status === 'confirmed') {
      slot.classList.add('confirmed');
      slot.disabled = !isAdmin;
    } else if (status === 'rejected') {
      slot.classList.add('rejected');
      slot.disabled = !isAdmin;
    } else if (status === 'pending') {
      slot.classList.add('pending');
      slot.disabled = !isAdmin;
    } else {
      slot.classList.add('available');
      slot.disabled = false;
    }
  });
}

function promptAdminLogin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.querySelector('.modal').classList.add('open');
  setTimeout(() => {
    const inp = document.getElementById('adminPass');
    if (inp) inp.focus();
  }, 100);
}

function closeAdminLogin() {
  const overlay = document.getElementById('adminLoginOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.querySelector('.modal').classList.remove('open');
  const inp = document.getElementById('adminPass');
  if (inp) inp.value = '';
}

function handleAdminLogin() {
  const inp = document.getElementById('adminPass');
  if (!inp) return;
  if (inp.value === ADMIN_PASSWORD) {
    isAdmin = true;
    closeAdminLogin();
    showToast('Modo admin activado');
    showAdminBadge();
    updateSlotStates();
  } else {
    showToast('Contraseña incorrecta');
    inp.value = '';
    inp.focus();
  }
}

function showAdminBadge() {
  let badge = document.querySelector('.admin-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.className = 'admin-badge';
    badge.textContent = '👤 Admin Activo';
    document.body.appendChild(badge);
  }
  badge.style.display = 'block';
}

function hideAdminBadge() {
  const badge = document.querySelector('.admin-badge');
  if (badge) badge.style.display = 'none';
}

function showAdminActions(slot, key) {
  const existing = slot.querySelector('.admin-actions');
  if (existing) {
    existing.remove();
    return;
  }
  const actions = document.createElement('div');
  actions.className = 'admin-actions';
  actions.style.cssText = 'display:flex;gap:0.25rem;margin-top:0.25rem;justify-content:center;';
  
  const confirmBtn = document.createElement('button');
  confirmBtn.innerHTML = '✅';
  confirmBtn.title = 'Confirmar cita';
  confirmBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:1rem;padding:0 0.25rem;';
  confirmBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmSlot(key);
  });
  
  const rejectBtn = document.createElement('button');
  rejectBtn.innerHTML = '❌';
  rejectBtn.title = 'Rechazar cita';
  rejectBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:1rem;padding:0 0.25rem;';
  rejectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    rejectSlot(key);
  });
  
  actions.appendChild(confirmBtn);
  actions.appendChild(rejectBtn);
  slot.appendChild(actions);
}

function confirmSlot(key) {
  selectedSlots[key] = 'confirmed';
  saveSlots();
  updateSlotStates();
  showToast('Cita confirmada');
}

function rejectSlot(key) {
  selectedSlots[key] = 'rejected';
  saveSlots();
  updateSlotStates();
  showToast('Cita rechazada');
}

function showAdminRevert(slot, key) {
  const existing = slot.querySelector('.admin-actions');
  if (existing) {
    existing.remove();
    return;
  }
  const actions = document.createElement('div');
  actions.className = 'admin-actions';
  actions.style.cssText = 'display:flex;gap:0.25rem;margin-top:0.25rem;justify-content:center;';
  
  const revertBtn = document.createElement('button');
  revertBtn.innerHTML = '🔄';
  revertBtn.title = 'Liberar horario';
  revertBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:1rem;padding:0 0.25rem;';
  revertBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    revertSlot(key);
  });
  
  actions.appendChild(revertBtn);
  slot.appendChild(actions);
}

function revertSlot(key) {
  delete selectedSlots[key];
  saveSlots();
  updateSlotStates();
  showToast('Horario liberado');
}

function initAdminLoginUI() {
  const loginBtn = document.getElementById('adminLoginBtn');
  const loginClose = document.getElementById('adminLoginClose');
  const loginOverlay = document.getElementById('adminLoginOverlay');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', handleAdminLogin);
  }
  if (loginClose) {
    loginClose.addEventListener('click', closeAdminLogin);
  }
  if (loginOverlay) {
    loginOverlay.addEventListener('click', (e) => {
      if (e.target === loginOverlay) closeAdminLogin();
    });
  }
  const passInput = document.getElementById('adminPass');
  if (passInput) {
    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdminLogin();
    });
  }
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
  let dotsHTML = '<div class="carousel-dots">';
  skills.forEach((s, i) => {
    slidesHTML += `
      <div class="carousel-slide${i === 0 ? ' active' : ''}">
        <div class="carousel-content">
          <img class="carousel-logo" src="${s.icon}" alt="${s.name}"${i > 1 ? ' loading="lazy"' : ''}>
          <span class="carousel-name">${s.name}</span>
          <p class="carousel-desc">${s.desc}</p>
        </div>
      </div>`;
    dotsHTML += `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="${s.name}"></button>`;
  });
  dotsHTML += '</div>';

  container.innerHTML = slidesHTML + dotsHTML;

  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  let current = 0;
  let interval;

  function goTo(index) {
    if (index === current) return;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    current = index;
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function start() {
    stop();
    interval = setInterval(next, 3500);
  }

  function stop() {
    clearInterval(interval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      if (idx !== current) {
        goTo(idx);
        start();
      }
    });
  });

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  start();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.openModalFor = openModalFor;