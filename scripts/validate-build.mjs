import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

register();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

async function validateBuild() {
  console.log('🔍 [Validate] Starting post-build validation...');

  const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');
  const { SEO_ROUTE_DATA } = await import('../src/data/seoRouteData.ts');
  const { FONT_COUNT, FONT_COUNT_PLUS } = await import('../src/constants/siteStats.ts');
  const { UNICODE_COMPATIBILITY_DATA } = await import('../src/data/unicodeCompatibility.ts');
  const { COMPATIBILITY_TEST_LOG } = await import('../src/data/compatibilityTestLog.ts');

  const expectedFontBucket = `${Math.floor(FONT_COUNT / 10) * 10}+`;
  console.log(`ℹ️ [Validate] Font stats: FONT_COUNT=${FONT_COUNT}, FONT_COUNT_PLUS=${FONT_COUNT_PLUS} (Bucket: ${expectedFontBucket})`);

  // Unicode Compatibility Lab Data Integrity Validation
  const validStatuses = new Set(['verified', 'reference', 'partial', 'unsupported', 'unknown']);
  const platformKeys = ['chrome', 'safari', 'android', 'ios', 'instagram', 'whatsapp', 'tiktok', 'freeFire'];
  let verifiedCount = 0;
  let referenceCount = 0;

  for (const item of UNICODE_COMPATIBILITY_DATA) {
    if (!item.id || !item.name || !item.unicodeRange) {
      errors.push(`[Unicode Compatibility] Incomplete item data for "${item.name || 'unnamed'}"`);
    }
    for (const pKey of platformKeys) {
      const res = item[pKey];
      if (!res || !validStatuses.has(res.status)) {
        errors.push(`[Unicode Compatibility] Invalid status "${res?.status}" for item "${item.id}" on platform "${pKey}"`);
      }
      if (res?.status === 'verified') {
        verifiedCount++;
      }
      if (res?.status === 'reference') {
        referenceCount++;
      }
    }
  }

  console.log(`ℹ️ [Validate] Unicode items: ${UNICODE_COMPATIBILITY_DATA.length}, reference: ${referenceCount}, verified: ${verifiedCount}, empirical log records: ${COMPATIBILITY_TEST_LOG.length}`);

  // Strict rule: verified status MUST have corresponding empirical test log evidence
  if (verifiedCount > 0 && COMPATIBILITY_TEST_LOG.length === 0) {
    errors.push(`[Unicode Compatibility] Found ${verifiedCount} 'verified' statuses but COMPATIBILITY_TEST_LOG is empty! Fake verification without evidence is prohibited.`);
  }

  // Validate any evidence screenshot files if present in COMPATIBILITY_TEST_LOG
  for (const logRecord of COMPATIBILITY_TEST_LOG) {
    if (logRecord.evidence && typeof logRecord.evidence === 'string') {
      const evidenceFilePath = path.join(projectRoot, logRecord.evidence.replace(/^\//, ''));
      if (!fs.existsSync(evidenceFilePath)) {
        errors.push(`[Unicode Compatibility] Test log evidence file does not exist: "${logRecord.evidence}"`);
      }
    }
  }

  const routes = Object.values(ROUTE_CONFIGS);
  const indexableRoutes = routes.filter((r) => r.route !== '404');
  const expectedIndexableCount = indexableRoutes.length;

  console.log(`Checking ${routes.length} total routes (${expectedIndexableCount} indexable) in ${distDir}...`);

  let errors = [];

  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const validInternalPaths = new Set(routes.map((r) => r.path));

  for (const routeConfig of routes) {
    const routeKey = routeConfig.route;
    const seo = SEO_ROUTE_DATA[routeKey] || SEO_ROUTE_DATA.inicio;

    let targetFilePath;
    if (routeConfig.path === '/') {
      targetFilePath = path.join(distDir, 'index.html');
    } else if (routeConfig.path === '/404.html') {
      targetFilePath = path.join(distDir, '404.html');
    } else {
      const cleanPath = routeConfig.path.replace(/^\/+|\/+$/g, '');
      targetFilePath = path.join(distDir, cleanPath, 'index.html');
    }

    if (!fs.existsSync(targetFilePath)) {
      errors.push(`Missing file: ${targetFilePath}`);
      continue;
    }

    const html = fs.readFileSync(targetFilePath, 'utf8');

    // 1. Verify H1 tag (must be exactly 1)
    const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
    if (h1Matches.length !== 1) {
      errors.push(`[${routeKey}] Expected exactly 1 H1, found ${h1Matches.length}`);
    }

    // 2. Verify Canonical tag (must be exactly 1)
    const canonicalMatches = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi) || [];
    if (canonicalMatches.length !== 1) {
      errors.push(`[${routeKey}] Expected exactly 1 canonical tag, found ${canonicalMatches.length}`);
    }
    const expectedCanonical = seo.canonical.startsWith('http')
      ? seo.canonical
      : `https://conversordeletrasbonitas.net${seo.canonical}`;
    if (!html.includes(`href="${expectedCanonical}"`)) {
      errors.push(`[${routeKey}] Canonical URL mismatch: expected ${expectedCanonical}`);
    }

    // 3. Verify JSON-LD (must be exactly 1 and have id="seo-jsonld")
    const jsonLdMatches = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi) || [];
    if (jsonLdMatches.length !== 1) {
      errors.push(`[${routeKey}] Expected exactly 1 JSON-LD script, found ${jsonLdMatches.length}`);
    }
    if (!html.includes('id="seo-jsonld"')) {
      errors.push(`[${routeKey}] Missing id="seo-jsonld" on JSON-LD script tag`);
    }

    // 4. Verify Title uniqueness among indexable routes
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) {
      errors.push(`[${routeKey}] Missing <title> tag`);
    } else if (routeKey !== '404') {
      if (seenTitles.has(title)) {
        errors.push(`[${routeKey}] Duplicate title with route [${seenTitles.get(title)}]: "${title}"`);
      } else {
        seenTitles.set(title, routeKey);
      }
    }

    // 5. Verify Meta Description uniqueness among indexable routes
    const descMatch = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : '';
    if (!description) {
      errors.push(`[${routeKey}] Missing meta description`);
    } else if (routeKey !== '404') {
      if (seenDescriptions.has(description)) {
        errors.push(`[${routeKey}] Duplicate meta description with route [${seenDescriptions.get(description)}]: "${description}"`);
      } else {
        seenDescriptions.set(description, routeKey);
      }
    }

    // Verify robots tag
    if (routeKey === '404') {
      if (!html.includes('content="noindex')) {
        errors.push(`[${routeKey}] 404 page must have noindex in robots meta tag`);
      }
    } else {
      if (!html.includes('name="robots"')) {
        errors.push(`[${routeKey}] Missing robots tag`);
      }
      if (html.includes('noindex')) {
        errors.push(`[${routeKey}] Indexable page must not contain noindex`);
      }
    }

    // Verify OpenGraph
    if (!html.includes('property="og:title"')) {
      errors.push(`[${routeKey}] Missing og:title`);
    }

    // Verify Vite bundle script tag
    if (!html.includes('<script type="module" crossorigin src="/assets/')) {
      errors.push(`[${routeKey}] Vite main script tag missing or corrupted!`);
    }

    // Verify root is populated
    if (html.includes('<div id="root"></div>')) {
      errors.push(`[${routeKey}] Empty <div id="root"></div> detected - SSR failed to render!`);
    }

    // 7. Check for forbidden legacy hash routing
    const forbiddenHashes = ['#/instagram', '#/tiktok', '#/whatsapp', '#/free-fire', '#/facebook', 'window.location.hash ='];
    for (const forbidden of forbiddenHashes) {
      if (html.includes(forbidden)) {
        errors.push(`[${routeKey}] Contains forbidden legacy hash routing pattern: "${forbidden}"`);
      }
    }

    // 8. Check internal <a href="/..."> links validity
    const hrefMatches = [...html.matchAll(/<a\b[^>]*\bhref=["'](\/[^"'#?]*)["']/gi)].map((m) => m[1]);
    for (const internalHref of hrefMatches) {
      // Ignore static assets or root
      if (
        internalHref.startsWith('/assets/') ||
        internalHref.startsWith('/fonts/') ||
        internalHref.endsWith('.svg') ||
        internalHref.endsWith('.png') ||
        internalHref.endsWith('.ico') ||
        internalHref.endsWith('.json') ||
        internalHref.endsWith('.txt') ||
        internalHref.endsWith('.xml')
      ) {
        continue;
      }
      if (!validInternalPaths.has(internalHref) && !validInternalPaths.has(`${internalHref}/`)) {
        errors.push(`[${routeKey}] Broken internal link detected: href="${internalHref}"`);
      }
    }
  }

  // 5b. Font Count Build Guard (P2-7): Verify home page includes correct font bucket
  const homeHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(homeHtmlPath)) {
    const homeHtml = fs.readFileSync(homeHtmlPath, 'utf8');
    if (!homeHtml.includes(expectedFontBucket)) {
      errors.push(`[home] Index HTML does not include expected font count bucket "${expectedFontBucket}"`);
    }
  }

  // 6. Check Sitemap completeness and validity
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('dist/sitemap.xml is missing');
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const sitemapUrlCount = locMatches.length;

    if (sitemapUrlCount !== expectedIndexableCount) {
      errors.push(`dist/sitemap.xml has ${sitemapUrlCount} URLs instead of ${expectedIndexableCount}`);
    }

    // Check no duplicate URLs
    const uniqueUrls = new Set(locMatches);
    if (uniqueUrls.size !== sitemapUrlCount) {
      errors.push(`dist/sitemap.xml contains duplicate URLs`);
    }

    // Check all indexable routes are in sitemap
    for (const r of indexableRoutes) {
      const seo = SEO_ROUTE_DATA[r.route] || SEO_ROUTE_DATA.inicio;
      const expectedLoc = seo.canonical.startsWith('http')
        ? seo.canonical
        : `https://conversordeletrasbonitas.net${seo.canonical}`;
      if (!uniqueUrls.has(expectedLoc)) {
        errors.push(`dist/sitemap.xml missing indexable route canonical: ${expectedLoc}`);
      }
    }

    // Check no unexpected URLs outside ROUTE_CONFIGS
    const expectedUrlsSet = new Set(
      indexableRoutes.map((r) => {
        const seo = SEO_ROUTE_DATA[r.route] || SEO_ROUTE_DATA.inicio;
        return seo.canonical.startsWith('http')
          ? seo.canonical
          : `https://conversordeletrasbonitas.net${seo.canonical}`;
      })
    );
    for (const url of locMatches) {
      if (!expectedUrlsSet.has(url)) {
        errors.push(`dist/sitemap.xml contains unexpected URL outside ROUTE_CONFIGS: ${url}`);
      }
    }

    // Check no 404 URL in sitemap
    if (sitemapContent.includes('404')) {
      errors.push('dist/sitemap.xml must not contain 404 page');
    }

    // Check no regional hreflang links
    if (sitemapContent.includes('hreflang') || sitemapContent.includes('xhtml:link')) {
      errors.push('dist/sitemap.xml must not contain xhtml:link hreflang tags');
    }

    // Check no legacy alias URLs in sitemap
    const legacyAliases = [
      '/instagram/',
      '/tiktok/',
      '/whatsapp/',
      '/free-fire/',
      '/facebook/',
      '/letras-tatuajes/',
      '/nicks-free-fire/',
      '/nombres-parejas/',
      '/abecedario/',
      '/cursiva/',
      '/goticas/',
      '/invertidas/',
      '/circulos/',
      '/glitch/',
      '/simbolos/',
      '/decorador/',
      '/contador-bio/',
    ];

    for (const alias of legacyAliases) {
      if (sitemapContent.includes(`https://conversordeletrasbonitas.net${alias}`) || sitemapContent.includes(`conversordeletrasbonitas.net${alias}`)) {
        errors.push(`dist/sitemap.xml contains legacy alias URL: ${alias}`);
      }
    }
  }

  // Check that legacy aliases do NOT have generated HTML directories in dist
  const legacyAliases = [
    '/instagram/',
    '/tiktok/',
    '/whatsapp/',
    '/free-fire/',
    '/facebook/',
    '/letras-tatuajes/',
    '/nicks-free-fire/',
    '/nombres-parejas/',
    '/abecedario/',
    '/cursiva/',
    '/goticas/',
    '/invertidas/',
    '/circulos/',
    '/glitch/',
    '/simbolos/',
    '/decorador/',
    '/contador-bio/',
  ];

  for (const alias of legacyAliases) {
    const aliasDir = alias.replace(/^\/|\/$/g, '');
    const aliasFile = path.join(distDir, aliasDir, 'index.html');
    if (fs.existsSync(aliasFile)) {
      errors.push(`Legacy alias generated as HTML: ${alias}`);
    }
  }

  // Check _redirects
  const redirectsPath = path.join(distDir, '_redirects');
  if (!fs.existsSync(redirectsPath)) {
    errors.push('dist/_redirects is missing');
  } else {
    const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
    const expectedRedirects = [
      ['/instagram/', '/letras-para-instagram/'],
      ['/tiktok/', '/letras-para-tiktok/'],
      ['/whatsapp/', '/letras-para-whatsapp/'],
      ['/free-fire/', '/letras-para-free-fire/'],
      ['/facebook/', '/letras-para-facebook/'],
      ['/letras-tatuajes/', '/letras-para-tatuajes/'],
      ['/nicks-free-fire/', '/generador-de-nicks-free-fire/'],
      ['/nombres-parejas/', '/nombres-para-parejas/'],
      ['/abecedario/', '/abecedario-letras-bonitas/'],
      ['/cursiva/', '/traductor-cursiva/'],
      ['/goticas/', '/letras-goticas/'],
      ['/invertidas/', '/letras-tachadas-e-invertidas/'],
      ['/circulos/', '/letras-en-circulos-y-cuadros/'],
      ['/glitch/', '/letras-glitch-zalgo/'],
      ['/simbolos/', '/simbolos-y-emojis/'],
      ['/decorador/', '/decorador-de-nicks/'],
      ['/contador-bio/', '/contador-de-caracteres-bio/'],
    ];

    for (const [from, to] of expectedRedirects) {
      const rule = `${from} ${to} 301`;
      if (!redirectsContent.includes(rule)) {
        errors.push(`Missing redirect rule: ${rule}`);
      }
    }
  }

  // Check robots.txt
  const robotsPath = path.join(distDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    errors.push('dist/robots.txt is missing');
  } else {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (robotsContent.includes('Host:')) {
      errors.push('dist/robots.txt should not contain non-standard Host: directive');
    }
    if (!robotsContent.includes('Sitemap: https://conversordeletrasbonitas.net/sitemap.xml')) {
      errors.push('dist/robots.txt missing valid Sitemap directive');
    }
  }

  // Check ads.txt if present
  const adsPath = path.join(distDir, 'ads.txt');
  if (fs.existsSync(adsPath)) {
    const adsContent = fs.readFileSync(adsPath, 'utf8');
    if (adsContent.includes('pub-XXXXXXXXXXXXXXXX')) {
      errors.push('ads.txt contains placeholder AdSense publisher ID (pub-XXXXXXXXXXXXXXXX)');
    }
  }

  if (errors.length > 0) {
    console.error('❌ [Validate] Build validation failed with errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(`✅ [Validate] All ${expectedIndexableCount} indexable SEO pages + 404 page verified successfully.`);
}

validateBuild().catch((err) => {
  console.error('❌ [Validate] Unexpected validation error:', err);
  process.exit(1);
});
