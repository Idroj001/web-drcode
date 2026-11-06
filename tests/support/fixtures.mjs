import { test as base, expect } from '@playwright/test';

// Todo lo externo (CDNs, fuentes, iconos) se responde localmente para que los
// tests sean rápidos, deterministas y funcionen sin red.
const EXTERNAL = /^https?:\/\/(?!127\.0\.0\.1|localhost)/;

export const test = base.extend({
  page: async ({ page }, use) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error));

    await page.addInitScript(() => {
      window.__openedUrls = [];
      window.open = (url) => {
        window.__openedUrls.push(String(url));
        return null;
      };
    });

    await page.route(EXTERNAL, async (route) => {
      const type = route.request().resourceType();
      if (type === 'stylesheet') {
        return route.fulfill({ status: 200, contentType: 'text/css', body: '' });
      }
      if (type === 'image') {
        return route.fulfill({
          status: 200,
          contentType: 'image/svg+xml',
          body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
        });
      }
      return route.fulfill({ status: 204, body: '' });
    });

    await use(page);

    expect(
      pageErrors,
      `Errores JS no capturados: ${pageErrors.map(String).join('; ')}`,
    ).toEqual([]);
  },
});

export { expect };

export async function gotoReady(page, path) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('header')).toBeVisible();
}

export async function openedWhatsAppText(page) {
  const urls = await page.evaluate(() => window.__openedUrls);
  expect(urls).toHaveLength(1);
  const url = new URL(urls[0]);
  expect(url.origin + url.pathname).toBe('https://wa.me/593999806465');
  return url.searchParams.get('text');
}

export async function readSlots(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('drcode_slots') || '{}'));
}
