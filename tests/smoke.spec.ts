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

  test('Grouped navigation supports keyboard expansion and Escape dismissal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const letrasButton = page.getByRole('button', { name: 'Letras', exact: true });
    await expect(letrasButton).toHaveAttribute('aria-haspopup', 'menu');
    await expect(letrasButton).toHaveAttribute('aria-expanded', 'false');

    await letrasButton.focus();
    await page.keyboard.press('ArrowDown');
    await expect(letrasButton).toHaveAttribute('aria-expanded', 'true');

    const letrasMenu = page.getByRole('menu', { name: 'Letras' });
    await expect(letrasMenu).toBeVisible();
    await expect(letrasMenu.getByRole('menuitem').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(letrasButton).toHaveAttribute('aria-expanded', 'false');
    await expect(letrasMenu).toBeHidden();
  });

  test('Mobile navigation exposes expanded state and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggle = page.locator('#mobile-menu-toggle-btn');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-primary-menu')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-primary-menu')).toHaveCount(0);
  });

  test('Table of contents only exposes targets that exist on the current page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#tabla-de-contenidos-nav button[aria-controls="toc-list"]').click();

    const tocButtons = page.locator('#toc-list button[data-toc-target]');
    const count = await tocButtons.count();
    expect(count).toBeGreaterThan(3);

    for (let i = 0; i < count; i++) {
      const target = await tocButtons.nth(i).getAttribute('data-toc-target');
      expect(target).toBeTruthy();
      await expect(page.locator(`#${target}`)).toHaveCount(1);
    }

    await expect(page.getByRole('button', { name: /Espacio invisible/i })).toHaveCount(0);
  });

  test('Route-specific table of contents includes enabled anchored modules', async ({ page }) => {
    await page.goto('/letras-para-instagram/');
    await page.locator('#tabla-de-contenidos-nav button[aria-controls="toc-list"]').click();

    await expect(page.getByRole('button', { name: /Espacio invisible/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Símbolos y caracteres/i })).toBeVisible();
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

  test('Broken-character warning only appears for the Unicode replacement character', async ({ page }) => {
    await page.goto('/');
    const inputArea = page.locator('textarea#main-text-input');

    await inputArea.fill('Texto normal');
    await page.locator('#btn-toggle-advanced-tools').click();
    await expect(page.getByText(/carácter de sustitución/)).toHaveCount(0);

    await inputArea.fill('Texto con � roto');
    await expect(page.getByText(/carácter de sustitución/)).toBeVisible();
  });

  test('Ctrl or Cmd + K focuses the main converter input', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
    await expect(page.locator('#main-text-input')).toBeFocused();
  });

  test('Mobile font cards keep secondary actions behind a compact overflow menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const more = page.locator('[id^="btn-more-"]').first();
    await expect(more).toBeVisible();
    await expect(more).toHaveAttribute('aria-expanded', 'false');

    await more.click();
    await expect(more).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('button', { name: 'Vista previa', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Crear imagen', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Compartir', exact: true }).first()).toBeVisible();
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

  test('Advanced converter tools stay out of the primary flow until requested', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#btn-toggle-advanced-tools');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#btn-primary-paste')).toBeVisible();
    await expect(page.locator('#btn-speak-main-text')).toHaveCount(0);
    await expect(page.locator('[id^="btn-select-"]')).toHaveCount(0);
    await expect(page.locator('[id^="btn-fav-"]').first()).toBeVisible();
    await expect(page.locator('[id^="btn-copy-"]').first()).toBeVisible();

    await expect(page.locator('#btn-open-mixer')).toHaveCount(0);
    await expect(page.locator('#btn-view-compact')).toHaveCount(0);
    await expect(page.getByText('Atajos de estilo:', { exact: true })).toHaveCount(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#btn-open-mixer')).toBeVisible();
    await expect(page.locator('[id^="btn-select-"]').first()).toBeVisible();
    await expect(page.locator('#btn-view-compact')).toBeVisible();
    await expect(page.locator('#btn-advanced-image')).toBeVisible();
    await expect(page.locator('#btn-advanced-share-link')).toBeVisible();
    await expect(page.locator('#btn-advanced-preview')).toBeVisible();
    await expect(page.locator('#btn-paste-clipboard')).toHaveCount(0);
    await expect(page.locator('#btn-clear-text')).toHaveCount(0);
    await expect(page.locator('#btn-quick-export-image')).toHaveCount(0);
    await expect(page.locator('#btn-speak-main-text')).toBeVisible();
    await expect(page.getByText('Atajos de estilo:', { exact: true })).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#btn-open-mixer')).toHaveCount(0);
  });

  test('Primary conversion flow reaches input and font results before contextual modules', async ({ page }) => {
    await page.goto('/');

    const input = page.locator('#main-text-input');
    const firstCard = page.locator('[data-font-card]').first();
    await expect(input).toBeVisible();
    await expect(firstCard).toBeVisible();

    const inputBox = await input.boundingBox();
    const firstCardBox = await firstCard.boundingBox();
    expect(inputBox).not.toBeNull();
    expect(firstCardBox).not.toBeNull();
    expect(firstCardBox!.y).toBeGreaterThan(inputBox!.y);

    await expect(page.getByText('Prueba rápida:', { exact: true })).toHaveCount(0);
    await page.locator('#btn-toggle-advanced-tools').click();
    await expect(page.getByText('Prueba rápida:', { exact: true })).toBeVisible();
  });

  test('Sticky input only follows the user while font results are in view', async ({ page }) => {
    await page.goto('/');

    const sticky = page.locator('input[placeholder="Escribe para cambiar todas las fuentes..."]');
    await expect(sticky).toHaveCount(0);

    await page.locator('[data-font-card]').nth(6).scrollIntoViewIfNeeded();
    await expect(sticky).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(sticky).toHaveCount(0);
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

