import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const assetsDir = path.resolve('dist/assets');
const budgetKb = Number(process.env.MAIN_JS_GZIP_BUDGET_KB || 155);

if (!fs.existsSync(assetsDir)) {
  throw new Error('dist/assets not found. Run the production build before checking the performance budget.');
}

const candidates = fs
  .readdirSync(assetsDir)
  .filter((name) => /^index-[^/]+\.js$/.test(name))
  .map((name) => {
    const filePath = path.join(assetsDir, name);
    const source = fs.readFileSync(filePath);
    return {
      name,
      rawBytes: source.byteLength,
      gzipBytes: gzipSync(source, { level: 9 }).byteLength,
    };
  })
  .sort((a, b) => b.rawBytes - a.rawBytes);

if (candidates.length === 0) {
  throw new Error('No Vite main index JavaScript bundle was found in dist/assets.');
}

const mainBundle = candidates[0];
const gzipKb = mainBundle.gzipBytes / 1024;
const rawKb = mainBundle.rawBytes / 1024;

console.log(
  `Main JS bundle: ${mainBundle.name} — ${rawKb.toFixed(1)} KB raw / ${gzipKb.toFixed(1)} KB gzip (budget: ${budgetKb} KB gzip)`
);

if (gzipKb > budgetKb) {
  throw new Error(
    `Performance budget exceeded: main JavaScript is ${gzipKb.toFixed(1)} KB gzip, above the ${budgetKb} KB limit.`
  );
}
