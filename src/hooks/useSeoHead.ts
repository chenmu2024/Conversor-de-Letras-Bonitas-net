import { useEffect } from 'react';
import { PageRoute } from '../types';
import { SEO_ROUTE_DATA } from '../data/seoRouteData';

export function useSeoHead(currentRoute: PageRoute) {
  useEffect(() => {
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

    // Standard SEO Meta Tags
    const keywordsStr = Array.isArray(routeData.keywords) ? routeData.keywords.join(', ') : routeData.keywords;
    setMetaTag('name', 'description', routeData.metaDescription);
    setMetaTag('name', 'keywords', keywordsStr);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Conversor de Letras Bonitas');

    // OpenGraph (Facebook / WhatsApp / LinkedIn)
    setMetaTag('property', 'og:title', routeData.title);
    setMetaTag('property', 'og:description', routeData.metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:locale', 'es_ES');
    setMetaTag('property', 'og:site_name', 'Conversor de Letras Bonitas');
    setMetaTag('property', 'og:image', `${origin}/og-image.svg`);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', 'image/svg+xml');
    setMetaTag('property', 'og:image:alt', 'Conversor de Letras Bonitas y Fuentes para Redes Sociales');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', routeData.title);
    setMetaTag('name', 'twitter:description', routeData.metaDescription);
    setMetaTag('name', 'twitter:image', `${origin}/og-image.svg`);

    // Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // Multi-regional hreflang annotations for Latin America and Spain
    const regionalLocales = ['es', 'es-ES', 'es-MX', 'es-CO', 'es-AR', 'es-PE', 'es-CL', 'es-US', 'x-default'];
    regionalLocales.forEach((locale) => {
      setLinkTag('alternate', canonicalUrl, locale);
    });

    // 4. Inject Dynamic Schema.org JSON-LD (WebSite + WebApplication + FAQPage + HowTo + BreadcrumbList + DefinedTermSet)
    const scriptId = 'dynamic-seo-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: 'Conversor de Letras Bonitas',
          description: 'Generador y conversor gratuito de letras bonitas, fuentes cursivas, góticas y símbolos para redes sociales.',
          inLanguage: 'es',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${origin}/?text={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: 'Conversor de Letras Bonitas',
          url: origin,
          logo: `${origin}/favicon.svg`,
          image: `${origin}/og-image.svg`,
          description: 'Plataforma líder en español de conversión de fuentes y estilos tipográficos Unicode para redes sociales.',
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
          softwareVersion: '3.8.0',
          dateModified: new Date().toISOString().split('T')[0],
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '#seo-h1', '#faq-heading', '.faq-question'],
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            "ratingValue": "4.9",
            "bestRating": "5.0",
            "worstRating": "1.0",
            "ratingCount": "15420",
            "reviewCount": "15420"
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            'Conversión instantánea a 80+ fuentes Unicode',
            'Copiado con 1 clic al portapapeles',
            'Espacio invisible para Free Fire e Instagram',
            'Generador de letras cursivas, góticas y para tatuajes',
            'Nicks Free Fire con alas ꧁༺ ༻꧂, coronas 亗 y verificado ⓥ',
            'Letras chinas y kanji japoneses simulados',
            'Letras en círculos, invertidas y texto tachado',
            'Simulador visual para perfiles de redes sociales',
          ],
        },
        {
          '@type': 'DefinedTermSet',
          '@id': `${canonicalUrl}#glossary`,
          name: 'Glosario Enciclopédico de Tipografía Unicode',
          hasDefinedTerm: [
            {
              '@type': 'DefinedTerm',
              name: 'Hangul Filler U+3164 (Espacio Invisible)',
              description: 'Carácter tipográfico coreano que produce espacio en blanco transparente ideal para nicks de Free Fire y biografías.',
              inDefinedTermSet: `${canonicalUrl}#glossary`,
            },
            {
              '@type': 'DefinedTerm',
              name: 'Mathematical Alphanumeric Symbols',
              description: 'Bloque Unicode (U+1D400-U+1D7FF) con variantes cursivas, negritas, dobles trazos y sans-serif.',
              inDefinedTermSet: `${canonicalUrl}#glossary`,
            },
            {
              '@type': 'DefinedTerm',
              name: 'Fraktur & Góticas Medievales',
              description: 'Glifos basados en caligrafía alemana medieval para nombres de clanes y estética dark.',
              inDefinedTermSet: `${canonicalUrl}#glossary`,
            },
            {
              '@type': 'DefinedTerm',
              name: 'Combining Diacritical Marks (Zalgo & Glitch)',
              description: 'Marcas diacríticas apilables verticalmente para generar efectos visuales distorsionados y de terror.',
              inDefinedTermSet: `${canonicalUrl}#glossary`,
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': `${canonicalUrl}#fontlist`,
          name: `Estilos Populares de Letras - ${routeData.badge}`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Cursiva Elegante Script',
              description: 'Transforma texto en caligrafía manuscrita fina para biografías de Instagram.',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Gótica Medieval Fraktur',
              description: 'Tipografía gótica antigua con caracteres ornamentales.',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Doble Trazo Matemático',
              description: 'Fuentes de doble línea matemática para destacar títulos.',
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'Círculos Negros Sólidos',
              description: 'Caracteres circulares rellenos para nicks y nombres.',
            },
            {
              '@type': 'ListItem',
              position: 5,
              name: 'Nick con Alas Gamer',
              description: 'Adornos con alas laterales y coronas para Free Fire.',
            },
          ],
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
            ...(currentRoute !== 'inicio'
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
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: routeData.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'HowTo',
          '@id': `${canonicalUrl}#howto`,
          name: routeData.guideTitle,
          description: `Guía detallada paso a paso para utilizar el conversor de letras bonitas en ${routeData.badge}.`,
          step: routeData.guideSteps.map((s) => ({
            '@type': 'HowToStep',
            position: s.step,
            name: s.title,
            text: s.text,
          })),
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(structuredData);
  }, [currentRoute]);
}
