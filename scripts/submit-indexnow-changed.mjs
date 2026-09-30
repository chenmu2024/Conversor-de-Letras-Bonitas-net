#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { register } from 'tsx/esm/api';

register();

const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');

const HOST = 'conversordeletrasbonitas.net';
const INDEXNOW_KEY = 'conversordeletrasbonitas2026';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const beforeArg = getArg('--before');
const afterArg = getArg('--after') || 'HEAD';
const isDryRun = args.includes('--dry-run');

const allIndexableRoutes = Object.values(ROUTE_CONFIGS).filter((config) => config.route !== '404');
const toolRoutes = allIndexableRoutes.filter((config) =>
  !['sobre-nosotros', 'politica-de-privacidad', 'politica-de-cookies', 'terminos-y-condiciones', 'contacto'].includes(config.route)
);

const routeByKey = new Map(allIndexableRoutes.map((config) => [config.route, config]));

const exactFileRoutes = new Map([
  ['src/components/AboutUsPage.tsx', ['sobre-nosotros']],
  ['src/components/PrivacyPolicyPage.tsx', ['politica-de-privacidad']],
  ['src/components/CookiePolicyPage.tsx', ['politica-de-cookies']],
  ['src/components/TermsAndConditionsPage.tsx', ['terminos-y-condiciones']],
  ['src/components/ContactPage.tsx', ['contacto']],
  ['src/components/UnicodeCompatibilityLab.tsx', ['compatibilidad-unicode']],
]);

const allRouteFiles = new Set([
  'src/data/seoRouteData.ts',
  'src/data/routeConfigs.ts',
  'src/hooks/useSeoHead.ts',
  'src/components/Header.tsx',
  'src/components/Footer.tsx',
  'src/components/RelatedSilosSection.tsx',
  'public/robots.txt',
  'public/_redirects',
]);

const toolRouteFiles = new Set([
  'src/components/SeoContent.tsx',
  'src/components/AuxiliarySections.tsx',
  'src/components/TableOfContents.tsx',
  'src/components/QuickAnswerSection.tsx',
  'src/components/AuthorEditorialBox.tsx',
  'src/data/quickAnswers.ts',
  'src/data/contextualLinks.ts',
  'src/data/routeModules.ts',
  'src/data/routeFreshness.ts',
]);

const ignoredPrefixes = [
  '.github/',
  'tests/',
  'scripts/',
  'README.md',
  '.env.example',
  'package.json',
  'bun.lock',
  'playwright.config.ts',
  'tsconfig.json',
  'vite.config.ts',
];

const normalizeUrl = (config) => {
  let cleanPath = config.path.trim();
  if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
  if (!cleanPath.endsWith('/')) cleanPath = `${cleanPath}/`;
  return `https://${HOST}${cleanPath}`;
};

const safeBefore = beforeArg && !/^0+$/.test(beforeArg) ? beforeArg : undefined;
let changedFiles = [];

try {
  const diffArgs = ['diff', '--name-only'];
  if (safeBefore) {
    diffArgs.push(safeBefore, afterArg);
  } else {
    diffArgs.push('HEAD^', afterArg);
  }

  changedFiles = execFileSync('git', diffArgs, { encoding: 'utf8' })
    .split('\n')
    .map((file) => file.trim())
    .filter(Boolean);
} catch (error) {
  console.warn('[IndexNow Changed] No se pudo calcular el diff exacto; se omite el envío automático.');
  console.warn(error?.message || error);
  process.exit(0);
}

const routeKeys = new Set();
let submitAll = false;
let submitTools = false;

for (const file of changedFiles) {
  if (allRouteFiles.has(file)) {
    submitAll = true;
    break;
  }

  if (toolRouteFiles.has(file)) {
    submitTools = true;
    continue;
  }

  const exactRoutes = exactFileRoutes.get(file);
  if (exactRoutes) {
    exactRoutes.forEach((route) => routeKeys.add(route));
    continue;
  }

  if (ignoredPrefixes.some((prefix) => file === prefix || file.startsWith(prefix))) {
    continue;
  }

  // Shared application/content components can affect multiple indexable tool pages.
  if (file.startsWith('src/components/') || file.startsWith('src/data/')) {
    submitTools = true;
  }
}

if (submitAll) {
  allIndexableRoutes.forEach((config) => routeKeys.add(config.route));
} else if (submitTools) {
  toolRoutes.forEach((config) => routeKeys.add(config.route));
}

const urlList = [...routeKeys]
  .map((route) => routeByKey.get(route))
  .filter(Boolean)
  .map(normalizeUrl);

console.log('[IndexNow Changed] Archivos modificados:');
changedFiles.forEach((file) => console.log(` - ${file}`));

if (urlList.length === 0) {
  console.log('[IndexNow Changed] No hay URLs indexables afectadas; no se envía nada.');
  process.exit(0);
}

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

console.log(`[IndexNow Changed] URLs afectadas: ${urlList.length}`);
urlList.forEach((url) => console.log(` - ${url}`));

if (isDryRun) {
  console.log('[IndexNow Changed] Dry run:');
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok && response.status !== 202) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  console.log(`[IndexNow Changed] Envío aceptado (HTTP ${response.status}).`);
} catch (error) {
  console.error('[IndexNow Changed] Falló la notificación:', error?.message || error);
  process.exit(1);
}
