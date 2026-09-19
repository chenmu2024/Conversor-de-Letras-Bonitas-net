#!/usr/bin/env node

/**
 * Script de envío automático a IndexNow
 * Protocolo compatible con Bing, Yandex, Naver y motores participantes.
 */

import { register } from 'tsx/esm/api';
register();

const { ROUTE_CONFIGS } = await import('../src/data/routeConfigs.ts');

const HOST = 'conversordeletrasbonitas.net';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'conversordeletrasbonitas2026';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Filter all valid indexable routes (exclude 404)
const urlList = Object.values(ROUTE_CONFIGS)
  .filter(config => config.route !== '404')
  .map(config => {
    const path = config.path.endsWith('/') ? config.path : `${config.path}/`;
    return `https://${HOST}${path}`;
  });

console.log(`[IndexNow] Preparando envío para ${urlList.length} URLs indexables...`);

const payload = {
  host: HOST,
  key: INDEXNOW_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
};

const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
  console.log('[IndexNow] Modo Dry-Run activado. Payload preparado:');
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
      console.log(`[IndexNow] Éxito: URLs enviadas correctamente a IndexNow (HTTP ${response.status}).`);
    } else {
      console.warn(`[IndexNow] Respuesta del servidor IndexNow: HTTP ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('[IndexNow] Error al conectar con el endpoint de IndexNow:', error.message);
  }
}

submitIndexNow();
