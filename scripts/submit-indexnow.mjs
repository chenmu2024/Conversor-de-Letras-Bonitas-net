#!/usr/bin/env node

/**
 * Script de envío oficial a IndexNow
 * Protocolo compatible con Bing, Yandex, Naver y motores participantes.
 */

import { register } from 'tsx/esm/api';
register();

const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');

const HOST = 'conversordeletrasbonitas.net';
// Clave fija verificada en /public/conversordeletrasbonitas2026.txt
const INDEXNOW_KEY = 'conversordeletrasbonitas2026';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Filtrar únicamente URLs indexables válidas (excluir 404 y rutas no públicas)
const urlList = Object.values(ROUTE_CONFIGS)
  .filter(config => config.route !== '404')
  .map(config => {
    let cleanPath = config.path.trim();
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
    if (!cleanPath.endsWith('/')) cleanPath = `${cleanPath}/`;
    return `https://${HOST}${cleanPath}`;
  });

console.log(`[IndexNow] Preparando envío para ${urlList.length} URLs canónicas...`);

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
};

const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
  console.log('[IndexNow] Modo Dry-Run activado. Payload verificado con éxito:');
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

async function submitIndexNow() {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] Éxito: ${urlList.length} URLs enviadas correctamente a IndexNow (HTTP ${response.status}).`);
      process.exit(0);
    } else {
      console.error(`[IndexNow] Error HTTP recibido de IndexNow: HTTP ${response.status} - ${response.statusText}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('[IndexNow] Error de red o conexión al endpoint IndexNow:', error?.message || error);
    process.exit(1);
  }
}

submitIndexNow();
