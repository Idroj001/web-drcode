import { test, expect, gotoReady, openedWhatsAppText } from './support/fixtures.mjs';

test.describe('formulario de contacto', () => {
  test('bloquea el envío vacío y muestra errores accesibles', async ({ page }) => {
    await gotoReady(page, '/contacto.html');

    await page.locator('#contactForm button[type="submit"]').click();

    await expect(page.locator('#name').locator('..')).toHaveClass(/has-error/);
    await expect(page.locator('#name').locator('..').locator('.field-error')).toBeVisible();
    expect(await page.evaluate(() => window.__openedUrls)).toHaveLength(0);
  });

  test('rechaza un email inválido', async ({ page }) => {
    await gotoReady(page, '/contacto.html');

    await page.fill('#name', 'Ana Pérez');
    await page.fill('#email', 'no-es-un-email');
    await page.fill('#phone', '+593 999 111 222');
    await page.fill('#message', 'Hola');
    await page.locator('#contactForm button[type="submit"]').click();

    await expect(page.locator('#email').locator('..')).toHaveClass(/has-error/);
    await expect(page.locator('#email').locator('..').locator('.field-error')).toBeVisible();
    expect(await page.evaluate(() => window.__openedUrls)).toHaveLength(0);
  });

  test('genera el mensaje de WhatsApp con los datos del formulario', async ({ page }) => {
    await gotoReady(page, '/contacto.html');

    await page.fill('#name', 'Ana Pérez');
    await page.fill('#email', 'ana@example.com');
    await page.fill('#phone', '+593 999 111 222');
    await page.selectOption('#service', 'web');
    await page.fill('#message', 'Necesito una página web');
    await page.locator('#contactForm button[type="submit"]').click();

    const text = await openedWhatsAppText(page);
    expect(text).toContain('*Nueva Solicitud - {Dr.Code}*');
    expect(text).toContain('*Nombre:* Ana Pérez');
    expect(text).toContain('*Email:* ana@example.com');
    expect(text).toContain('*Teléfono:* +593 999 111 222');
    expect(text).toContain('*Servicio:* Página Web');
    expect(text).toContain('*Mensaje:* Necesito una página web');
  });
});
