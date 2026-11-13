import { test, expect, gotoReady } from './support/fixtures.mjs';

async function floatPositions(page) {
  return page.evaluate(() => {
    const read = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.getBoundingClientRect().bottom : null;
    };
    return {
      whatsapp: read('.whatsapp-float'),
      theme: read('.theme-toggle-float'),
    };
  });
}

test.describe('botones flotantes', () => {
  test('tema y WhatsApp están a la misma altura y suben juntos al llegar al footer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await gotoReady(page, '/index.html');

    const whatsapp = page.locator('.whatsapp-float');
    const theme = page.locator('.theme-toggle-float');
    await expect(whatsapp).toBeVisible();
    await expect(theme).toBeVisible();

    const rest = await floatPositions(page);
    expect(Math.abs(rest.whatsapp - rest.theme)).toBeLessThan(1);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(whatsapp).toHaveClass(/whatsapp-float--above/);
    await expect(theme).toHaveClass(/theme-toggle-float--above/);

    // El desplazamiento es idéntico: mismo delta y misma altura final,
    // esperando a que termine la transición de 0.3s.
    await expect
      .poll(async () => {
        const raised = await floatPositions(page);
        return {
          sameHeight: Math.abs(raised.whatsapp - raised.theme) < 1,
          sameDelta: Math.abs((rest.whatsapp - raised.whatsapp) - (rest.theme - raised.theme)) < 1,
          movedUp: rest.whatsapp - raised.whatsapp > 40,
        };
      })
      .toEqual({ sameHeight: true, sameDelta: true, movedUp: true });
  });

  test('vuelven a su sitio al alejarse del footer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await gotoReady(page, '/index.html');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('.theme-toggle-float')).toHaveClass(/theme-toggle-float--above/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator('.whatsapp-float')).not.toHaveClass(/whatsapp-float--above/);
    await expect(page.locator('.theme-toggle-float')).not.toHaveClass(/theme-toggle-float--above/);
  });

  test('en móvil los flotantes quedan fuera del footer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await gotoReady(page, '/index.html');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.locator('.whatsapp-float')).toHaveClass(/whatsapp-float--above/);
    await expect(page.locator('.theme-toggle-float')).toHaveClass(/theme-toggle-float--above/);

    const whatsapp = await page.locator('.whatsapp-float').boundingBox();
    const theme = await page.locator('.theme-toggle-float').boundingBox();
    const footerBox = await page.locator('footer').boundingBox();

    expect(Math.round(whatsapp.y + whatsapp.height))
      .toBeLessThanOrEqual(Math.round(footerBox.y));
    expect(Math.round(theme.y + theme.height))
      .toBeLessThanOrEqual(Math.round(footerBox.y));
  });

  test('los flotantes no se superponen entre sí en móvil angosto', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await gotoReady(page, '/index.html');

    const whatsapp = await page.locator('.whatsapp-float').boundingBox();
    const theme = await page.locator('.theme-toggle-float').boundingBox();

    expect(Math.round(theme.x + theme.width)).toBeLessThanOrEqual(Math.round(whatsapp.x));
  });
});
