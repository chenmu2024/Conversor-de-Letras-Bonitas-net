import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'tsx/esm/api';

// Register TSX loader for importing TS/TSX files into Node.js
register();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function runPrerender() {
  console.log('🚀 [Prerender] Starting static prerender build...');

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('❌ [Prerender] Error: dist/index.html template not found. Run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  // Dynamically load React SSR and app modules using React 19 Static prerender API
  const React = (await import('react')).default;
  const { prerender } = await import('react-dom/static');
  const App = (await import('../src/App.tsx')).default;
  const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');
  const { SEO_ROUTE_DATA } = await import('../src/data/seoRouteData.ts');

  const routes = Object.values(ROUTE_CONFIGS);
  console.log(`📋 [Prerender] Found ${routes.length} routes to prerender from ROUTE_CONFIGS.`);

  let successCount = 0;

  for (const routeConfig of routes) {
    const routeKey = routeConfig.route;
    const seo = SEO_ROUTE_DATA[routeKey] || SEO_ROUTE_DATA.inicio;
    const canonicalUrl = seo.canonical.startsWith('http')
      ? seo.canonical
      : `https://conversordeletrasbonitas.net${seo.canonical}`;

    // 1. Render App component to static HTML with React 19 prerender static API (waits for Suspense & lazy components)
    let appHtml = '';
    try {
      const { prelude } = await prerender(React.createElement(App, { initialRoute: routeKey }));
      const reader = prelude.getReader();
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      appHtml = Buffer.concat(chunks).toString('utf8');
    } catch (renderError) {
      console.error(`⚠️ [Prerender] Failed to SSR render route "${routeKey}":`, renderError);
      appHtml = '';
    }

    // 2. Build Schema.org JSON-LD (clean, NO fake AggregateRating)
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://conversordeletrasbonitas.net/#website',
          url: 'https://conversordeletrasbonitas.net/',
          name: 'Conversor de Letras Bonitas',
          description: 'Fuentes y tipografías bonitas para copiar y pegar',
          inLanguage: 'es',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://conversordeletrasbonitas.net/?text={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebApplication',
          '@id': `${canonicalUrl}#webapp`,
          name: seo.h1 || routeConfig.label,
          alternateName: 'Conversor de Letras Bonitas y Fuentes Online',
          url: canonicalUrl,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All (iOS, Android, Windows, macOS, Linux)',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          inLanguage: 'es',
          isAccessibleForFree: true,
          description: seo.metaDescription,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://conversordeletrasbonitas.net/',
            },
            ...(routeKey !== 'inicio' && routeKey !== '404'
              ? [
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: routeConfig.label,
                    item: canonicalUrl,
                  },
                ]
              : []),
          ],
        },
      ],
    };

    // Add FAQ schema if route has FAQs
    if (seo.faqs && seo.faqs.length > 0) {
      structuredData['@graph'].push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: seo.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // 3. Inject SEO metadata into HTML template
    let pageHtml = baseTemplate;

    // Replace Title
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

    // Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(seo.metaDescription)}" />`
    );

    // Replace Meta Keywords
    const keywordsStr = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : (seo.keywords || '');
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="keywords" content="${escapeHtml(keywordsStr)}" />`
    );

    // Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace OpenGraph meta tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(seo.metaDescription)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Replace Twitter meta tags
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(seo.metaDescription)}" />`
    );

    // Replace JSON-LD Schema Script
    pageHtml = pageHtml.replace(
      /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n    </script>`
    );

    // Replace root element content with SSR rendered React markup
    const rootStart = pageHtml.indexOf('<div id="root">');
    const bodyEnd = pageHtml.indexOf('</body>');
    if (rootStart !== -1 && bodyEnd !== -1) {
      pageHtml = pageHtml.slice(0, rootStart) + `<div id="root">${appHtml}</div>` + pageHtml.slice(bodyEnd);
    } else {
      pageHtml = pageHtml.replace(
        /<div\s+id=["']root["']>[\s\S]*?<\/div>/i,
        `<div id="root">${appHtml}</div>`
      );
    }

    // 4. Determine destination file path
    let targetFilePath;
    if (routeConfig.path === '/') {
      targetFilePath = path.join(distDir, 'index.html');
    } else if (routeConfig.path === '/404.html') {
      targetFilePath = path.join(distDir, '404.html');
    } else {
      const cleanPath = routeConfig.path.replace(/^\/+|\/+$/g, '');
      const targetDir = path.join(distDir, cleanPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      targetFilePath = path.join(targetDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, pageHtml, 'utf8');
    successCount++;

    // If routeKey has a short alias that differs from the path (e.g. 'goticas' vs 'letras-goticas'),
    // generate an alias index.html so both URLs work seamlessly and have canonical pointing to canonicalUrl
    const cleanPathSlug = routeConfig.path.replace(/^\/+|\/+$/g, '');
    if (routeKey !== 'inicio' && routeKey !== '404' && routeKey !== cleanPathSlug) {
      const aliasDir = path.join(distDir, routeKey);
      if (!fs.existsSync(aliasDir)) {
        fs.mkdirSync(aliasDir, { recursive: true });
      }
      fs.writeFileSync(path.join(aliasDir, 'index.html'), pageHtml, 'utf8');
    }
  }

  console.log(`✅ [Prerender] Successfully prerendered ${successCount} pages with complete SEO & HTML!`);
}

runPrerender().catch((err) => {
  console.error('❌ [Prerender] Fatal error during prerendering:', err);
  process.exit(1);
});
