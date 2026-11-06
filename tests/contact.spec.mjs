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

test.describe('modal de solicitud', () => {
  test('abre con el servicio preseleccionado y cierra con Escape restaurando el foco', async ({
    page,
  }) => {
    await gotoReady(page, '/servicios.html');
    const opener = page.locator('.service-card').first().locator('button', { hasText: 'Solicitar' });

    await opener.click();
    await expect(page.locator('#contactModal')).toHaveClass(/open/);
    await expect(page.locator('#service')).toHaveValue('web');
    await expect(page.locator('#name')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.locator('#contactModal')).not.toHaveClass(/open/);
    await expect(opener).toBeFocused();
  });

  test('al reabrir el modal el formulario está vacío', async ({ page }) => {
    await gotoReady(page, '/servicios.html');
    const opener = page.locator('.service-card').first().locator('button', { hasText: 'Solicitar' });

    await opener.click();
    await page.fill('#name', 'Texto temporal');
    await page.keyboard.press('Escape');

    await opener.click();
    await expect(page.locator('#name')).toHaveValue('');
  });

  test('valida los campos obligatorios antes de abrir WhatsApp', async ({ page }) => {
    await gotoReady(page, '/servicios.html');
    await page.locator('.service-card').first().locator('button', { hasText: 'Solicitar' }).click();

    await page.locator('#contactModal button[type="submit"]').click();

    await expect(page.locator('#contactForm .form-group.has-error').first()).toBeVisible();
    await expect(page.locator('#contactForm .field-error').first()).toHaveText(/.+/);
    expect(await page.evaluate(() => window.__openedUrls)).toHaveLength(0);
  });

  test('envía la solicitud desde el modal', async ({ page }) => {
    await gotoReady(page, '/servicios.html');
    const opener = page.locator('.service-card').first().locator('button', { hasText: 'Solicitar' });
    await opener.click();

    await page.fill('#name', 'Luis Vera');
    await page.fill('#email', 'luis@example.com');
    await page.fill('#phone', '+593 988 777 666');
    await page.fill('#message', 'Quiero una landing');
    await page.locator('#contactModal button[type="submit"]').click();

    const text = await openedWhatsAppText(page);
    expect(text).toContain('*Nombre:* Luis Vera');
    expect(text).toContain('*Servicio:* Página Web');
    expect(text).toContain('*Mensaje:* Quiero una landing');
    await expect(page.locator('#contactModal')).not.toHaveClass(/open/);
    await expect(opener).toBeFocused();
  });
});
