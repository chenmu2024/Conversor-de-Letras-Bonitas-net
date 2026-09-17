import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

register();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function generateSitemap() {
  console.log('🗺️ [Sitemap] Generating public/sitemap.xml...');

  const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');
  const { SEO_ROUTE_DATA } = await import('../src/data/seoRouteData.ts');

  const today = new Date().toISOString().split('T')[0];
  const routes = Object.values(ROUTE_CONFIGS).filter((r) => r.route !== '404');

  // Priority and changefreq logic
  function getPriority(route) {
    if (route === 'inicio') return '1.0';
    if (['instagram', 'free-fire', 'tiktok', 'whatsapp'].includes(route)) return '0.9';
    if (['goticas', 'cursivas', 'letras-chidas', 'aesthetic', 'espacio-invisible'].includes(route)) return '0.85';
    if (['sobre-nosotros', 'contacto', 'politica-de-privacidad', 'terminos-y-condiciones', 'politica-de-cookies'].includes(route)) return '0.5';
    return '0.8';
  }

  function getChangefreq(route) {
    if (route === 'inicio') return 'daily';
    if (['sobre-nosotros', 'contacto', 'politica-de-privacidad', 'terminos-y-condiciones', 'politica-de-cookies'].includes(route)) return 'monthly';
    return 'weekly';
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const config of routes) {
    const routeKey = config.route;
    const seo = SEO_ROUTE_DATA[routeKey] || SEO_ROUTE_DATA.inicio;
    const loc = seo.canonical.startsWith('http')
      ? seo.canonical
      : `https://conversordeletrasbonitas.net${seo.canonical}`;

    const priority = getPriority(routeKey);
    const changefreq = getChangefreq(routeKey);

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const publicSitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf8');

  // Also write to dist/sitemap.xml if dist exists
  const distSitemapPath = path.join(projectRoot, 'dist', 'sitemap.xml');
  if (fs.existsSync(path.join(projectRoot, 'dist'))) {
    fs.writeFileSync(distSitemapPath, xml, 'utf8');
  }

  console.log(`✅ [Sitemap] Successfully generated sitemap with ${routes.length} URLs (lastmod: ${today}) without regional hreflangs.`);
}

generateSitemap().catch((err) => {
  console.error('❌ [Sitemap] Failed to generate sitemap:', err);
  process.exit(1);
});
