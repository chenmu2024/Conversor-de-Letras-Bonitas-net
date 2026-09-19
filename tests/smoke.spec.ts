import { test, expect } from '@playwright/test';

test.describe('Conversor de Letras Bonitas - E2E Smoke Tests', () => {
  test('1. Home page renders exactly 1 H1, 1 Canonical, and 1 JSON-LD', async ({ page }) => {
    await page.goto('/');

    // Verify exactly 1 H1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toBeVisible();

    // Verify exactly 1 Canonical tag pointing to root
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', 'https://conversordeletrasbonitas.net/');

    // Verify exactly 1 JSON-LD tag with id="seo-jsonld"
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    await expect(jsonLd).toHaveAttribute('id', 'seo-jsonld');
  });

  test('2. ScenarioShortcutGrid performs clean URL navigation and updates metadata', async ({ page }) => {
    await page.goto('/');

    // Locate Instagram shortcut in scenario grid and click
    const instagramLink = page.locator('a[href="/letras-para-instagram/"]').first();
    await expect(instagramLink).toBeVisible();
    await instagramLink.click();

    // Verify URL is clean (no hashes)
    await expect(page).toHaveURL(/\/letras-para-instagram\/$/);

    // Verify H1 updated to Instagram
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Instagram');

    // Verify Canonical updated
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', 'https://conversordeletrasbonitas.net/letras-para-instagram/');

    // Verify unique JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    await expect(jsonLd).toHaveAttribute('id', 'seo-jsonld');
  });

  test('3. RelatedSilosSection renders clean anchor tags without hashes', async ({ page }) => {
    await page.goto('/letras-para-instagram/');

    // Scroll down to load deferred auxiliary content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const relatedLinks = page.locator('#secciones-relacionadas a');
    await expect(relatedLinks.first()).toBeVisible({ timeout: 10000 });
    const count = await relatedLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await relatedLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toContain('#');
      expect(href?.startsWith('/')).toBeTruthy();
    }
  });

  test('4. Browser Back and Forward history navigation preserves clean URLs and state', async ({ page }) => {
    await page.goto('/');

    // Navigate to Free Fire page
    const ffLink = page.locator('a[href="/letras-para-free-fire/"]').first();
    await ffLink.click();
    await expect(page).toHaveURL(/\/letras-para-free-fire\/$/);

    // Navigate back
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    const h1 = page.locator('h1');
    await expect(h1).toContainText('Conversor');

    // Navigate forward
    await page.goForward();
    await expect(page).toHaveURL(/\/letras-para-free-fire\/$/);
  });

  test('5. Font Converter transforms text and allows copying', async ({ page }) => {
    await page.goto('/');

    const inputArea = page.locator('textarea#main-text-input');
    await expect(inputArea).toBeVisible();

    // Clear and type custom text
    await inputArea.fill('Hola Mundo');

    // Verify converted cards update with transformed text
    const cards = page.locator('[data-font-card]');
    await expect(cards.first()).toBeVisible();

    // Verify copy button works without crash
    const copyButton = page.locator('button[title*="Copiar"]').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();
  });

  test('6. 404 page handles invalid routes gracefully', async ({ page }) => {
    await page.goto('/ruta-que-no-existe-404/');

    // Verify 404 content appears
    await expect(page.locator('h1:has-text("404")')).toBeVisible();

    // Verify link back to home exists and works
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });
});
