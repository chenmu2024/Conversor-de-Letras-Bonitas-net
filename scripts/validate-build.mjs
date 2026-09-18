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

  const routes = Object.values(ROUTE_CONFIGS);
  console.log(`Checking ${routes.length} routes in ${distDir}...`);

  let errors = [];

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

    // Verify title
    if (!html.includes('<title>') || !html.includes('</title>')) {
      errors.push(`[${routeKey}] Missing <title> tag`);
    }

    // Verify meta description
    if (!html.includes('name="description"')) {
      errors.push(`[${routeKey}] Missing meta description`);
    }

    // Verify canonical
    const expectedCanonical = seo.canonical.startsWith('http')
      ? seo.canonical
      : `https://conversordeletrasbonitas.net${seo.canonical}`;
    if (!html.includes('rel="canonical"')) {
      errors.push(`[${routeKey}] Missing canonical tag`);
    } else if (!html.includes(`href="${expectedCanonical}"`)) {
      errors.push(`[${routeKey}] Canonical URL mismatch: expected ${expectedCanonical}`);
    }

    // Verify robots
    if (routeKey === '404') {
      if (!html.includes('content="noindex')) {
        errors.push(`[${routeKey}] 404 page must have noindex in robots meta tag`);
      }
    } else {
      if (!html.includes('name="robots"')) {
        errors.push(`[${routeKey}] Missing robots tag`);
      }
    }

    // Verify H1 tag exists
    if (!html.includes('<h1') || !html.includes('</h1>')) {
      errors.push(`[${routeKey}] Missing <h1> tag`);
    }

    // Verify OpenGraph
    if (!html.includes('property="og:title"')) {
      errors.push(`[${routeKey}] Missing og:title`);
    }

    // Verify script tags are preserved (Vite bundle)
    if (!html.includes('<script type="module" crossorigin src="/assets/')) {
      errors.push(`[${routeKey}] Vite main script tag missing or corrupted!`);
    }

    // Verify root is populated
    if (html.includes('<div id="root"></div>')) {
      errors.push(`[${routeKey}] Empty <div id="root"></div> detected - SSR failed to render!`);
    }
  }

  // Check sitemap
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    errors.push('dist/sitemap.xml is missing');
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const sitemapUrlCount = locMatches.length;

    if (sitemapUrlCount !== 28) {
      errors.push(`dist/sitemap.xml has ${sitemapUrlCount} URLs instead of 28`);
    }

    // Check no duplicate URLs
    const uniqueUrls = new Set(locMatches);
    if (uniqueUrls.size !== sitemapUrlCount) {
      errors.push(`dist/sitemap.xml contains duplicate URLs`);
    }

    // Check no 404 URL
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

  if (errors.length > 0) {
    console.error('❌ [Validate] Build validation failed with errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('✅ [Validate] All 28 indexable SEO pages + 404 page verified successfully.');
}

validateBuild().catch((err) => {
  console.error('❌ [Validate] Unexpected validation error:', err);
  process.exit(1);
});
