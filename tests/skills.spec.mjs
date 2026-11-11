import { test, expect, gotoReady } from './support/fixtures.mjs';

const SKILLS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'OpenCode',
  'Warp',
  'Obsidian',
  'Hostinger',
  'GitHub',
];

async function openSkills(page) {
  await gotoReady(page, '/skills.html');
  await expect(page.locator('.carousel-slide')).toHaveCount(SKILLS.length);
}

test.describe('carrusel de skills', () => {
  test('muestra las 8 habilidades y arranca en la primera', async ({ page }) => {
    await openSkills(page);

    await expect(page.locator('.carousel-name')).toHaveText(SKILLS);
    await expect(page.locator('.carousel-dot')).toHaveCount(SKILLS.length);
    await expect(page.locator('.carousel-slide.active')).toHaveCount(1);
    await expect(page.locator('.carousel-slide').first()).toHaveClass(/active/);
    await expect(page.locator('.carousel-slide').first()).toHaveAttribute('aria-hidden', 'false');
  });

  test('no hay botones de control, solo los puntos', async ({ page }) => {
    await openSkills(page);

    await expect(page.locator('.carousel-controls')).toHaveCount(0);
    await expect(page.locator('.carousel-btn')).toHaveCount(0);
    await expect(page.locator('button[data-carousel]')).toHaveCount(0);
  });

  test('los puntos cambian de habilidad y actualizan los aria', async ({ page }) => {
    await openSkills(page);
    const slides = page.locator('.carousel-slide');
    const dots = page.locator('.carousel-dot');

    await dots.nth(4).click();
    await expect(slides.nth(4)).toHaveClass(/active/);
    await expect(slides.nth(4)).toHaveAttribute('aria-hidden', 'false');
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'true');

    await dots.nth(2).click();
    await expect(slides.nth(2)).toHaveClass(/active/);
    await expect(dots.nth(2)).toHaveAttribute('aria-current', 'true');
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'false');
  });

  test('avanza solo cada 3 segundos', async ({ page }) => {
    await page.clock.install();
    await openSkills(page);
    await page.locator('#skills-carousel').scrollIntoViewIfNeeded();
    const slides = page.locator('.carousel-slide');

    await expect(slides.nth(0)).toHaveClass(/active/);

    await page.clock.fastForward(3100);
    await expect(slides.nth(1)).toHaveClass(/active/);

    await page.clock.fastForward(3000);
    await expect(slides.nth(2)).toHaveClass(/active/);
  });
});

test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('arranca pausado y no avanza solo', async ({ page }) => {
    await page.clock.install();
    await openSkills(page);
    const slides = page.locator('.carousel-slide');

    await expect(slides.first()).toHaveClass(/active/);

    await page.clock.fastForward(9000);
    await expect(slides.first()).toHaveClass(/active/);
  });
});
