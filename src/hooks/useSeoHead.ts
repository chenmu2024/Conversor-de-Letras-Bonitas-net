import { useEffect, useRef } from 'react';
import { PageRoute } from '../types';
import { SEO_ROUTE_DATA } from '../data/seoRouteData';

export function useSeoHead(currentRoute: PageRoute) {
  const prevRouteRef = useRef<PageRoute | null>(null);

  useEffect(() => {
    // Skip initial mount if server already generated static meta tags for this route
    if (prevRouteRef.current === null) {
      prevRouteRef.current = currentRoute;
      return;
    }
    if (prevRouteRef.current === currentRoute) return;
    prevRouteRef.current = currentRoute;

    const routeData = SEO_ROUTE_DATA[currentRoute] || SEO_ROUTE_DATA.inicio;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://conversordeletrasbonitas.net';
    const canonicalUrl = routeData.canonical.startsWith('http') ? routeData.canonical : `${origin}${routeData.canonical}`;

    // 1. Update Title only if changed
    if (document.title !== routeData.title) {
      document.title = routeData.title;
    }

    // 2. Helper to set/update meta tags safely without redundant reflows
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      } else if (element.getAttribute('content') !== content) {
        element.setAttribute('content', content);
      }
    };

    // 3. Helper to set/update link tags
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]` 
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      } else if (element.getAttribute('href') !== href) {
        element.setAttribute('href', href);
      }
    };

    // Remove any legacy regional hreflang links if present
    const legacyHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    legacyHreflangs.forEach((el) => el.remove());

    // Standard SEO Meta Tags
    const keywordsStr = Array.isArray(routeData.keywords) ? routeData.keywords.join(', ') : routeData.keywords;
    setMetaTag('name', 'description', routeData.metaDescription);
    setMetaTag('name', 'keywords', keywordsStr);

    if (currentRoute === '404') {
      setMetaTag('name', 'robots', 'noindex, follow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    setMetaTag('name', 'author', 'Conversor de Letras Bonitas');

    // OpenGraph (Facebook / WhatsApp / LinkedIn)
    setMetaTag('property', 'og:title', routeData.title);
    setMetaTag('property', 'og:description', routeData.metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:locale', 'es_ES');
    setMetaTag('property', 'og:site_name', 'Conversor de Letras Bonitas');
    setMetaTag('property', 'og:image', `${origin}/og-image.png`);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', 'image/png');
    setMetaTag('property', 'og:image:alt', 'Conversor de Letras Bonitas y Fuentes para Redes Sociales');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', routeData.title);
    setMetaTag('name', 'twitter:description', routeData.metaDescription);
    setMetaTag('name', 'twitter:image', `${origin}/og-image.png`);

    // Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // 4. Inject Simplified Schema.org JSON-LD (WebSite + WebApplication + BreadcrumbList + Organization)
    const scriptId = 'dynamic-seo-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const graphItems: any[] = [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'Conversor de Letras Bonitas',
        description: 'Generador y conversor gratuito de letras bonitas, fuentes cursivas, góticas y símbolos para redes sociales.',
        inLanguage: 'es',
      },
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Conversor de Letras Bonitas',
        url: origin,
        logo: `${origin}/favicon.svg`,
        image: `${origin}/og-image.png`,
      },
      {
        '@type': 'WebApplication',
        '@id': `${canonicalUrl}#webapp`,
        name: routeData.h1,
        alternateName: 'Conversor de Letras Bonitas y Fuentes Online',
        url: canonicalUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All (iOS, Android, Windows, macOS, Linux)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description: routeData.metaDescription,
        inLanguage: 'es',
        isAccessibleForFree: true,
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
            item: origin,
          },
          ...(currentRoute !== 'inicio' && currentRoute !== '404'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: routeData.badge,
                  item: canonicalUrl,
                },
              ]
            : []),
        ],
      },
    ];

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graphItems,
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [currentRoute]);
}
