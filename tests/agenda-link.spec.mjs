import { test, expect, gotoReady } from './support/fixtures.mjs';

const AGENDA_URL = 'https://agenda.jordy-kombi.workers.dev';

test.describe('enlace al sistema de agendamiento', () => {
  test('contacto muestra un botón hacia el agenda junto a los otros contactos', async ({
    page,
  }) => {
    await gotoReady(page, '/contacto.html');

    const button = page.locator('.contact-info').getByRole('link', { name: /agendar cita/i });
    await expect(button).toHaveCount(1);
    await expect(button).toHaveClass(/btn/);
    await expect(button).toHaveAttribute('href', AGENDA_URL);
    await expect(button).toHaveAttribute('target', '_blank');
  });

  test('el CTA del inicio abre el agenda en lugar del calendario interno', async ({ page }) => {
    await gotoReady(page, '/index.html');

    await expect(page.getByRole('link', { name: 'Agendar Cita' })).toHaveAttribute(
      'href',
      AGENDA_URL,
    );
  });

  test('el botón de skills abre el agenda en lugar del calendario interno', async ({ page }) => {
    await gotoReady(page, '/skills.html');

    await expect(page.getByRole('link', { name: 'Agendar Cita' })).toHaveAttribute(
      'href',
      AGENDA_URL,
    );
  });

  test('la tarjeta de portafolio Agendamiento visita el agenda real', async ({ page }) => {
    await gotoReady(page, '/servicios.html');

    const card = page
      .locator('.work-card')
      .filter({ has: page.getByRole('heading', { name: 'Agendamiento' }) });
    await expect(card.getByRole('link', { name: 'Visitar sitio' })).toHaveAttribute(
      'href',
      AGENDA_URL,
    );
  });

  test('el nav ya no ofrece Agendamiento y realza Contacto', async ({ page }) => {
    await gotoReady(page, '/contacto.html');

    await expect(page.locator('.nav-menu .nav-link')).toHaveCount(4);
    await expect(page.getByRole('link', { name: 'Agendamiento' })).toHaveCount(0);
    const active = page.locator('.nav-link[aria-current="page"]');
    await expect(active).toHaveAttribute('href', 'contacto.html');
    await expect(active).toHaveClass(/nav-cta/);
  });
});
