import { test, expect, gotoReady } from './support/fixtures.mjs';

const REAL_PAGES = [
  '/index.html',
  '/servicios.html',
  '/skills.html',
  '/contacto.html',
  '/calendario.html',
];

const DEMO_PAGES = [
  'demo-web',
  'demo-landing',
  'demo-carrito',
  'demo-menu',
  'demo-tarjeta',
  'demo-automatizacion',
];

test.describe('estructura compartida', () => {
  for (const path of REAL_PAGES) {
    test(`${path} carga con header, footer, canvas y WhatsApp`, async ({ page }) => {
      await gotoReady(page, path);

      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
      await expect(page.locator('main#main')).toHaveAttribute('tabindex', '-1');

      const size = await page.locator('#matrix').evaluate((canvas) => ({
        width: canvas.width,
        height: canvas.height,
      }));
      expect(size.width).toBeGreaterThan(0);
      expect(size.height).toBeGreaterThan(0);

      await expect(page.locator('.whatsapp-float a')).toHaveAttribute(
        'href',
        'https://wa.me/593999806465',
      );
    });
  }

  test('ninguna página real tiene IDs duplicados', async ({ page }) => {
    for (const path of REAL_PAGES) {
      await gotoReady(page, path);
      const duplicates = await page.evaluate(() => {
        const ids = Array.from(document.querySelectorAll('[id]'), (el) => el.id);
        return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      });
      expect(duplicates, `IDs duplicados en ${path}`).toEqual([]);
    }
  });

  test('el modal se inyecta solo donde hace falta y no duplica formularios', async ({ page }) => {
    // servicios.html tiene #modal-container y no un formulario propio.
    await gotoReady(page, '/servicios.html');
    await expect(page.locator('#contactModal')).toHaveCount(1);

    // contacto.html ya trae su propio formulario: no se inyecta el modal.
    await gotoReady(page, '/contacto.html');
    await expect(page.locator('#contactModal')).toHaveCount(0);
    await expect(page.locator('main form#contactForm')).toHaveCount(1);

    // calendario.html ya trae sus propios overlays: no se inyecta el modal.
    await gotoReady(page, '/calendario.html');
    await expect(page.locator('#contactModal')).toHaveCount(0);
  });

  test('servicios.html no repite la llamada "Ver demo"', async ({ page }) => {
    await gotoReady(page, '/servicios.html');

    await expect(page.locator('.service-card--detailed')).toHaveCount(6);
    await expect(page.locator('.service-preview')).toHaveCount(6);
    await expect(page.locator('.service-preview').first()).toHaveAttribute('href', 'demo-web.html');
    await expect(page.locator('.service-badge')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Ver demo', exact: true })).toHaveCount(6);
  });

  test('las páginas demo cargan y marcan Servicios como activo', async ({ page }) => {
    for (const name of DEMO_PAGES) {
      await gotoReady(page, `/${name}.html`);
      await expect(page.locator('h1')).toContainText('Demo:');
      await expect(page.locator('.nav-link[aria-current="page"]')).toHaveAttribute(
        'href',
        'servicios.html',
      );
    }
  });
});
