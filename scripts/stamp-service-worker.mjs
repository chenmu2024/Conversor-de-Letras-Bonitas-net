import fs from 'node:fs';
import path from 'node:path';

const swPath = path.resolve('dist/sw.js');

if (!fs.existsSync(swPath)) {
  throw new Error('dist/sw.js not found. Run Vite build before stamping the service worker.');
}

const rawVersion =
  process.env.CF_PAGES_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  `local-${Date.now()}`;

const version = rawVersion.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 24) || 'build';
const source = fs.readFileSync(swPath, 'utf8');

if (!source.includes('__BUILD_VERSION__')) {
  throw new Error('Service worker build placeholder is missing.');
}

fs.writeFileSync(swPath, source.replaceAll('__BUILD_VERSION__', version), 'utf8');
console.log(`Stamped service worker cache version: ${version}`);
