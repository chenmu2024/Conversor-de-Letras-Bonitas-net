import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const DIST_DIR = path.resolve('dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
const ENTRY_RAW_LIMIT = 500 * 1024;
const ENTRY_GZIP_LIMIT = 150 * 1024;

if (!fs.existsSync(INDEX_HTML)) {
  throw new Error('dist/index.html not found. Run the production build before checking the performance budget.');
}

const html = fs.readFileSync(INDEX_HTML, 'utf8');
const firstPattern = /<script[^>]+type=[\"']module[\"'][^>]+src=[\"']([^\"']+\\.js)[\"']/i;
const secondPattern = /<script[^>]+src=[\"']([^\"']+\\.js)[\"'][^>]+type=[\"']module[\"']/i;
const scriptMatch = html.match(firstPattern) || html.match(secondPattern);

if (!scriptMatch) {
  throw new Error('Unable to locate the production module entry script in dist/index.html.');
}

const src = scriptMatch[1].replace(/^\\//, '');
const entryPath = path.join(DIST_DIR, src);

if (!fs.existsSync(entryPath)) {
  throw new Error('Entry bundle not found: ' + entryPath);
}

const buffer = fs.readFileSync(entryPath);
const rawBytes = buffer.byteLength;
const gzipBytes = zlib.gzipSync(buffer, { level: 9 }).byteLength;
const kb = (bytes) => (bytes / 1024).toFixed(1);

console.log(
  'Performance budget: ' + src + ' = ' + kb(rawBytes) + ' KB raw / ' + kb(gzipBytes) +
  ' KB gzip (limits: ' + kb(ENTRY_RAW_LIMIT) + ' KB raw / ' + kb(ENTRY_GZIP_LIMIT) + ' KB gzip)'
);

const failures = [];
if (rawBytes > ENTRY_RAW_LIMIT) failures.push('entry bundle raw size ' + kb(rawBytes) + ' KB exceeds ' + kb(ENTRY_RAW_LIMIT) + ' KB');
if (gzipBytes > ENTRY_GZIP_LIMIT) failures.push('entry bundle gzip size ' + kb(gzipBytes) + ' KB exceeds ' + kb(ENTRY_GZIP_LIMIT) + ' KB');

if (failures.length) {
  throw new Error('Performance budget failed: ' + failures.join('; '));
}

console.log('Performance budget passed.');
