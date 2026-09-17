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
    if (!html.includes('rel="canonical"')) {
      errors.push(`[${routeKey}] Missing canonical tag`);
    }

    // Verify robots
    if (!html.includes('name="robots"')) {
      errors.push(`[${routeKey}] Missing robots tag`);
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
    const sitemapUrlCount = (sitemapContent.match(/<loc>/g) || []).length;
    if (sitemapUrlCount !== 28) {
      errors.push(`dist/sitemap.xml has ${sitemapUrlCount} URLs instead of 28`);
    }
  }

  if (errors.length > 0) {
    console.error('❌ [Validate] Build validation failed with errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('✅ [Validate] All 28 SEO routes, canonical tags, titles, descriptions, scripts, and sitemap verified successfully!');
}

validateBuild().catch((err) => {
  console.error('❌ [Validate] Unexpected validation error:', err);
  process.exit(1);
});
