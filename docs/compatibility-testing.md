# Protocolo de pruebas de compatibilidad Unicode

Este documento define cómo convertir una afirmación de compatibilidad de "referencia" a "verificada" sin inventar evidencia.

## Regla principal

Un carácter o estilo solo puede marcarse como `verified` para una plataforma cuando existe una entrada real en `src/data/compatibilityTestLog.ts` con resultado `pass`.

## Datos mínimos por prueba

Cada registro debe incluir:

- `styleId`: el mismo id usado por la matriz de compatibilidad.
- `platform`: navegador, sistema o aplicación realmente probada.
- `testedAt`: fecha ISO `YYYY-MM-DD`.
- `input`: texto exacto usado en la prueba.
- `result`: `pass`, `partial` o `fail`.
- `notes`: qué se observó y en qué campo de la aplicación.
- `device` y `osVersion` cuando la prueba depende de un dispositivo.
- `appVersion` cuando se prueba Instagram, WhatsApp, TikTok o Free Fire.
- `evidence`: ruta a una captura o evidencia del proyecto cuando exista.

## Procedimiento

1. Seleccionar un estilo y un texto corto que incluya letras, números y al menos un carácter problemático conocido.
2. Copiar exactamente ese texto desde la versión desplegada.
3. Probarlo en el campo objetivo real: nombre, bio, estado, nick, chat, etc.
4. Registrar si la plataforma lo acepta, lo normaliza, lo reemplaza o lo bloquea.
5. Guardar versión del sistema/aplicación.
6. Añadir el registro al log.
7. Solo después, cambiar el estado correspondiente de la matriz a `verified` si el resultado fue `pass`.

## Límites de la evidencia

Una prueba positiva demuestra únicamente el entorno documentado. No implica compatibilidad universal con todos los dispositivos, regiones, versiones o campos de una plataforma.

## Evidencia negativa

Los resultados `partial` y `fail` también deben conservarse. Son útiles para GEO porque muestran límites reales y evitan afirmaciones absolutas.
