import { test, expect, gotoReady, openedWhatsAppText, readSlots } from './support/fixtures.mjs';

// Miércoles 4 de noviembre de 2026, 12:30 en Ecuador.
const NOW = new Date('2026-11-04T12:30:00-05:00');

const slot = (page, date, time) =>
  page.locator(`.time-slot[data-date="${date}"][data-time="${time}"]`);

async function openCalendar(page, slots) {
  await page.clock.setFixedTime(NOW);
  if (slots) {
    await page.addInitScript((data) => {
      localStorage.setItem('drcode_slots', JSON.stringify(data));
    }, slots);
  }
  await gotoReady(page, '/calendario.html');
  await expect(page.locator('.day-slot')).toHaveCount(7);
}

async function loginAdmin(page) {
  await page.locator('h1').click({ modifiers: ['Control', 'Shift'] });
  await expect(page.locator('#adminLoginOverlay')).toHaveClass(/open/);
  await page.fill('#adminPass', 'admin123');
  await page.click('#adminLoginBtn');
  await expect(page.locator('.admin-badge')).toBeVisible();
}

test.describe('calendario', () => {
  test('la semana actual empieza en lunes y muestra 7 días', async ({ page }) => {
    await openCalendar(page);

    await expect(page.locator('.day-name')).toHaveText([
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ]);
    await expect(page.locator('.day-date')).toHaveText([
      '02/11',
      '03/11',
      '04/11',
      '05/11',
      '06/11',
      '07/11',
      '08/11',
    ]);
    await expect(page.locator('#weekLabel')).toHaveText(/2\s+nov.*8\s+nov/);
  });

  test('deshabilita turnos pasados y deja disponibles los futuros', async ({ page }) => {
    await openCalendar(page);

    const mondayMorning = slot(page, '2026-11-02', 'Mañana');
    const wednesdayMorning = slot(page, '2026-11-04', 'Mañana');
    const wednesdayAfternoon = slot(page, '2026-11-04', 'Tarde');

    await expect(mondayMorning).toBeDisabled();
    await expect(mondayMorning).toHaveClass(/past/);
    await expect(wednesdayMorning).toBeDisabled();
    await expect(wednesdayMorning).toHaveClass(/past/);
    await expect(wednesdayAfternoon).toBeEnabled();
    await expect(wednesdayAfternoon).toHaveClass(/available/);
  });

  test('el botón avanza y retrocede una semana', async ({ page }) => {
    await openCalendar(page);

    await page.click('#weekToggle');
    await expect(page.locator('.day-date').first()).toHaveText('09/11');
    await expect(page.locator('.day-date').last()).toHaveText('15/11');
    await expect(page.locator('#weekToggle')).toHaveText('← Semana Anterior');

    await page.click('#weekToggle');
    await expect(page.locator('.day-date').first()).toHaveText('02/11');
    await expect(page.locator('#weekToggle')).toHaveText('Siguiente Semana →');
  });

  test('reserva un turno, lo guarda y lo mantiene al recargar', async ({ page }) => {
    await openCalendar(page);
    const target = slot(page, '2026-11-04', 'Tarde');

    await target.click();
    await expect(page.locator('#calendarModal')).toHaveClass(/open/);
    await expect(page.locator('#calModalTitle')).toContainText('miércoles 04/11');
    await expect(page.locator('#calModalTitle')).toContainText('Tarde');

    await page.fill('#calName', 'Ana Pérez');
    await page.fill('#calPhone', '+593 999 111 222');
    await page.fill('#calEmail', 'ana@example.com');
    await page.selectOption('#calService', 'web');
    await page.fill('#calMessage', 'Quiero una página web');
    await page.locator('#calendarForm button[type="submit"]').click();

    const text = await openedWhatsAppText(page);
    expect(text).toContain('*Agendamiento - {Dr.Code}*');
    expect(text).toContain('*Nombre:* Ana Pérez');
    expect(text).toContain('*Teléfono:* +593 999 111 222');
    expect(text).toContain('*Servicio:* Página Web');
    expect(text).toContain('*Día:* miércoles, 4 de noviembre');
    expect(text).toContain('*Jornada:* Tarde');

    await expect(target).toHaveClass(/pending/);
    expect(await readSlots(page)).toMatchObject({ '2026-11-04_Tarde': 'pending' });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('header')).toBeVisible();
    await expect(target).toHaveClass(/pending/);
    await expect(target).toBeDisabled();
  });

  test('un turno pendiente no se puede reservar sin admin', async ({ page }) => {
    await openCalendar(page, { '2026-11-05_Mañana': 'pending' });
    const target = slot(page, '2026-11-05', 'Mañana');

    await expect(target).toBeDisabled();
    await expect(target).toHaveClass(/pending/);
    await expect(page.locator('#calendarModal')).not.toHaveClass(/open/);
  });
});

test.describe('modo admin', () => {
  test('rechaza una contraseña incorrecta y acepta la correcta', async ({ page }) => {
    await openCalendar(page);

    await page.locator('h1').click({ modifiers: ['Control', 'Shift'] });
    await expect(page.locator('#adminLoginOverlay')).toHaveClass(/open/);
    await expect(page.locator('#adminPass')).toBeFocused();

    await page.fill('#adminPass', 'incorrecta');
    await page.click('#adminLoginBtn');
    await expect(page.locator('.toast')).toContainText('Contraseña incorrecta');
    await expect(page.locator('#adminLoginOverlay')).toHaveClass(/open/);
    await expect(page.locator('#adminPass')).toHaveValue('');

    await page.fill('#adminPass', 'admin123');
    await page.click('#adminLoginBtn');
    await expect(page.locator('#adminLoginOverlay')).not.toHaveClass(/open/);
    await expect(page.locator('.admin-badge')).toBeVisible();
    await expect(page.locator('.admin-badge')).toContainText('Admin Activo');
  });

  test('confirma un turno pendiente y lo libera', async ({ page }) => {
    await openCalendar(page, { '2026-11-05_Mañana': 'pending' });
    const target = slot(page, '2026-11-05', 'Mañana');
    await expect(target).toBeDisabled();

    await loginAdmin(page);
    await expect(target).toBeEnabled();

    await target.click();
    await page.locator('.admin-actions button[title="Confirmar cita"]').click();
    await expect(target).toHaveClass(/confirmed/);
    expect(await readSlots(page)).toMatchObject({ '2026-11-05_Mañana': 'confirmed' });

    await target.click();
    await page.locator('.admin-actions button[title="Liberar horario"]').click();
    await expect(target).toHaveClass(/available/);
    expect(await readSlots(page)).not.toHaveProperty('2026-11-05_Mañana');
  });

  test('rechaza un turno pendiente', async ({ page }) => {
    await openCalendar(page, { '2026-11-06_Tarde': 'pending' });
    const target = slot(page, '2026-11-06', 'Tarde');

    await loginAdmin(page);
    await target.click();
    await page.locator('.admin-actions button[title="Rechazar cita"]').click();

    await expect(target).toHaveClass(/rejected/);
    expect(await readSlots(page)).toMatchObject({ '2026-11-06_Tarde': 'rejected' });
  });

  test('Ctrl+Shift+L cierra la sesión admin', async ({ page }) => {
    await openCalendar(page);
    await loginAdmin(page);

    await page.keyboard.press('Control+Shift+L');
    await expect(page.locator('.admin-badge')).toBeHidden();
  });

  test('el diálogo de admin se expone a tecnologías de asistencia', async ({ page }) => {
    await openCalendar(page);
    await page.locator('h1').click({ modifiers: ['Control', 'Shift'] });

    await expect(page.locator('#adminLoginOverlay')).toHaveAttribute('aria-hidden', 'false');
    await expect(page.locator('#adminLoginModal')).not.toHaveAttribute('aria-hidden', 'true');
  });
});
