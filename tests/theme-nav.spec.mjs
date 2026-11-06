import { test, expect, gotoReady } from './support/fixtures.mjs';

const REAL_PAGES = [
  ['/index.html', 'index.html'],
  ['/servicios.html', 'servicios.html'],
  ['/skills.html', 'skills.html'],
  ['/contacto.html', 'contacto.html'],
  ['/calendario.html', 'calendario.html'],
];

test.describe('tema', () => {
  test('arranca en claro cuando el sistema prefiere claro', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('.theme-toggle-float')).toHaveAttribute('aria-pressed', 'false');
  });

  test.describe('sistema en oscuro', () => {
    test.use({ colorScheme: 'dark' });

    test('respeta prefers-color-scheme si no hay preferencia guardada', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
      await expect(page.locator('.theme-toggle-float')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  test('el toggle cambia el tema y persiste al recargar', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const toggle = page.locator('.theme-toggle-float');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => localStorage.getItem('drcode_theme'))).toBe('dark');

    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('.theme-toggle-float')).toHaveAttribute('aria-pressed', 'true');
  });

  test('un cambio del sistema no pisa la preferencia guardada', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.theme-toggle-float').click();

    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('el toggle está presente en todas las páginas reales', async ({ page }) => {
    for (const [path] of REAL_PAGES) {
      await gotoReady(page, path);
      await expect(page.locator('.theme-toggle-float')).toBeVisible();
    }
  });
});

test.describe('navegación', () => {
  test('marca el link activo en cada página', async ({ page }) => {
    for (const [path, expectedHref] of REAL_PAGES) {
      await gotoReady(page, path);
      await expect(page.locator('.nav-link[aria-current="page"]')).toHaveAttribute(
        'href',
        expectedHref,
      );
    }
  });

  test('la hamburguesa abre el menú y Escape lo cierra devolviendo el foco', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoReady(page, '/index.html');
    const hamburger = page.locator('.hamburger');
    const menu = page.locator('ul.nav-menu');

    await expect(menu).not.toHaveClass(/active/);
    await hamburger.click();
    await expect(menu).toHaveClass(/active/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveClass(/active/);
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburger).toBeFocused();
  });
});
