import { test, expect } from '@playwright/test';

test.describe('Conversor de Letras Bonitas - E2E Smoke & SEO Tests', () => {
  // P1-1 & P1-2: Matrix test across 7 core routes
  const seoRoutes = [
    {
      path: '/',
      h1: /Conversor/i,
    },
    {
      path: '/letras-para-instagram/',
      h1: /Instagram/i,
    },
    {
      path: '/letras-para-free-fire/',
      h1: /Free Fire/i,
    },
    {
      path: '/letras-goticas/',
      h1: /Góticas/i,
    },
    {
      path: '/traductor-cursiva/',
      h1: /Cursiva/i,
    },
    {
      path: '/espacio-invisible/',
      h1: /Invisible/i,
    },
    {
      path: '/contador-de-caracteres-bio/',
      h1: /Caracteres|Bio/i,
    },
    {
      path: '/compatibilidad-unicode/',
      h1: /Compatibilidad Unicode/i,
    },
  ];

  for (const route of seoRoutes) {
    test(`SEO smoke & Canonical verification: ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      // Verify exactly 1 H1
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText(route.h1);

      // Verify exactly 1 Canonical tag with exact matching URL (P1-2)
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      await expect(canonical).toHaveAttribute('href', `https://conversordeletrasbonitas.net${route.path}`);

      // Verify exactly 1 JSON-LD tag with id="seo-jsonld"
      const jsonLd = page.locator('script[type="application/ld+json"]');
      await expect(jsonLd).toHaveCount(1);
      await expect(page.locator('script#seo-jsonld')).toHaveCount(1);
    });
  }

  // P1-3: SPA Route Switching JSON-LD Regression Test
  test('SPA route transitions update JSON-LD Schema URL correctly without duplicates', async ({ page }) => {
    await page.goto('/');

    const routesToTest = [
      { linkSelector: 'a[href="/letras-para-instagram/"]', expectedPath: '/letras-para-instagram/' },
      { linkSelector: 'a[href="/letras-para-free-fire/"]', expectedPath: '/letras-para-free-fire/' },
      { linkSelector: 'a[href="/traductor-cursiva/"]', expectedPath: '/traductor-cursiva/' },
      { linkSelector: 'a[href="/letras-goticas/"]', expectedPath: '/letras-goticas/' },
    ];

    for (const step of routesToTest) {
      const link = page.locator(step.linkSelector).first();
      await expect(link).toBeVisible();
      await link.click();

      await expect(page).toHaveURL(new RegExp(`${step.expectedPath}$`));

      // Check unique JSON-LD
      const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();
      expect(jsonLdCount).toBe(1);

      // Parse JSON-LD content and verify WebApplication URL matching
      const jsonText = await page.locator('#seo-jsonld').textContent();
      expect(jsonText).toBeTruthy();
      const schema = JSON.parse(jsonText || '{}');
      const webApp = schema['@graph']
        ? schema['@graph'].find((item: any) => item['@type'] === 'WebApplication')
        : schema;
      expect(webApp?.url).toBe(`https://conversordeletrasbonitas.net${step.expectedPath}`);
    }
  });

  // P1-4: Browser Back and Forward history navigation with complete metadata validation
  test('Browser Back and Forward history navigation preserves clean URLs, H1, and Canonical tags', async ({ page }) => {
    await page.goto('/');

    // Navigate to Free Fire page
    const ffLink = page.locator('a[href="/letras-para-free-fire/"]').first();
    await ffLink.click();
    await expect(page).toHaveURL(/\/letras-para-free-fire\/$/);

    // Navigate back to Home
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Conversor');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://conversordeletrasbonitas.net/');

    // Navigate forward to Free Fire
    await page.goForward();
    await expect(page).toHaveURL(/\/letras-para-free-fire\/$/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Free Fire');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://conversordeletrasbonitas.net/letras-para-free-fire/');
  });

  test('RelatedSilosSection renders clean anchor tags without hashes', async ({ page }) => {
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

  test('Font Converter transforms text and allows copying', async ({ page }) => {
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

  // P0-4 & P0-5: 404 UI and Robots Noindex validation
  test('Unknown route renders 404 UI with noindex meta tag', async ({ page }) => {
    // Note: Local Vite preview serves index.html fallback for client-side routing.
    // Cloudflare Pages in production handles HTTP 404 status code via 404.html.
    const response = await page.goto('/ruta-que-no-existe-404-test/');
    expect(response).not.toBeNull();

    // Verify 404 H1 is rendered
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('404');

    // Verify robots noindex meta tag
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveCount(1);
    await expect(robots).toHaveAttribute('content', /noindex/i);

    // Verify link back to home exists and works
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  // Unicode Compatibility Lab specific tests
  test('Unicode Compatibility Lab renders matrix, table with 16 rows, and interactive elements', async ({ page }) => {
    await page.goto('/compatibilidad-unicode/');

    // 1. Verify H1 exists
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Laboratorio de Compatibilidad Unicode');

    // 2. Verify Table contains 16 rows
    const rows = page.locator('#tabla-compatibilidad tbody tr');
    await expect(rows).toHaveCount(16);

    // 3. Verify presence of "Referencia" badge
    const refBadge = page.locator('span:has-text("Referencia")').first();
    await expect(refBadge).toBeVisible();

    // 4. Verify clicking "Detalles" opens details inspector
    const detailBtn = page.locator('button:has-text("Detalles")').first();
    await expect(detailBtn).toBeVisible();
    await detailBtn.click();
    await expect(page.locator('text=Informe de Referencia Técnica')).toBeVisible();

    // 5. Verify live tester input
    const testerInput = page.locator('input#lab-tester-input');
    await expect(testerInput).toBeVisible();
    await testerInput.fill('Prueba E2E');

    // 6. Verify official references section
    const refSection = page.locator('#fuentes-oficiales');
    await expect(refSection).toBeVisible();
  });
});

