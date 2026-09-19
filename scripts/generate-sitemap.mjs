import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

register();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function generateSitemap() {
  console.log('🗺️ [Sitemap] Generating dist/sitemap.xml...');

  const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');
  const { SEO_ROUTE_DATA } = await import('../src/data/seoRouteData.ts');

  // Filter out 404 route - exclusively indexable routes from ROUTE_CONFIGS
  const routes = Object.values(ROUTE_CONFIGS).filter((r) => r.route !== '404');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const config of routes) {
    const routeKey = config.route;
    const seo = SEO_ROUTE_DATA[routeKey] || SEO_ROUTE_DATA.inicio;
    const loc = seo.canonical.startsWith('http')
      ? seo.canonical
      : `https://conversordeletrasbonitas.net${seo.canonical}`;

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const distDir = path.join(projectRoot, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, xml, 'utf8');

  console.log(`✅ [Sitemap] Successfully generated clean sitemap with ${routes.length} URLs.`);
}

generateSitemap().catch((err) => {
  console.error('❌ [Sitemap] Failed to generate sitemap:', err);
  process.exit(1);
});
