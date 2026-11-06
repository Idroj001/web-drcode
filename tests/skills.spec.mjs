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

  test('siguiente, anterior y puntos actualizan el slide y los aria', async ({ page }) => {
    await openSkills(page);
    const slides = page.locator('.carousel-slide');
    const dots = page.locator('.carousel-dot');

    await page.locator('[data-carousel="next"]').click();
    await expect(slides.nth(1)).toHaveClass(/active/);
    await expect(slides.nth(1)).toHaveAttribute('aria-hidden', 'false');
    await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');

    await page.locator('[data-carousel="prev"]').click();
    await expect(slides.nth(0)).toHaveClass(/active/);
    await expect(dots.nth(0)).toHaveAttribute('aria-current', 'true');

    await dots.nth(4).click();
    await expect(slides.nth(4)).toHaveClass(/active/);
    await expect(dots.nth(4)).toHaveAttribute('aria-current', 'true');
  });

  test('pausa detiene el avance automático', async ({ page }) => {
    await page.clock.install();
    await openSkills(page);
    const slides = page.locator('.carousel-slide');
    const pause = page.locator('[data-carousel="pause"]');

    await page.clock.fastForward(3600);
    await expect(slides.nth(1)).toHaveClass(/active/);

    await pause.click();
    await expect(pause).toHaveAttribute('aria-pressed', 'true');
    await expect(pause).toHaveAttribute('aria-label', 'Reanudar cambio automático');

    await page.clock.fastForward(8000);
    await expect(slides.nth(1)).toHaveClass(/active/);
  });
});

test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('arranca pausado y no avanza solo', async ({ page }) => {
    await page.clock.install();
    await openSkills(page);
    const slides = page.locator('.carousel-slide');

    await expect(page.locator('[data-carousel="pause"]')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(slides.first()).toHaveClass(/active/);

    await page.clock.fastForward(8000);
    await expect(slides.first()).toHaveClass(/active/);
  });
});
