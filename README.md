# Conversor de Letras Bonitas (conversordeletrasbonitas.net)

Proyecto de referencia tipográfica Unicode y conversor de estilos de texto en español optimizado para SEO, GEO y rendimiento web.

---

## 🏗️ Arquitectura del Proyecto

- **Framework**: React 19 + TypeScript + Vite 6 + Tailwind CSS v4.
- **Renderizado Estático (SSG)**: Generación estática previa mediante `scripts/prerender.mjs` que genera archivos `index.html` completos para cada una de las rutas canónicas del sitio.
- **Hosting**: Compatible con Cloudflare Pages, Netlify y servidores estáticos mediante `_redirects` y `_headers`.
- **Sitemap & SEO**: Generador automático de `dist/sitemap.xml` y validador post-build (`scripts/validate-build.mjs`).

---

## 📋 Reglas de Compatibilidad Unicode & GEO Trust

Para garantizar la máxima autoridad y confianza técnica (GEO / AI Search / Google):

1. **Estados de Compatibilidad (`CompatibilityStatus`)**:
   - `verified` (✅ Comprobado): Requiere evidencia empírica manual registrada en `src/data/compatibilityTestLog.ts`.
   - `reference` (📘 Referencia): Basado en la especificación formal del Consorcio Unicode o documentación oficial, sin comprobación manual específica en dicha plataforma.
   - `partial` (⚠️ Variable): Comportamiento irregular o dependiente de la versión/fuente.
   - `unsupported` (❌ No compatible): La plataforma o el sistema rechaza o no dibuja el carácter.
   - `unknown` (— Sin datos): Sin datos o sin pruebas documentadas.
2. **Validación en Build**:
   - El script `scripts/validate-build.mjs` falla automáticamente si existen elementos con estado `verified` sin registro correspondiente en `COMPATIBILITY_TEST_LOG`.
   - Quedan prohibidas versiones simuladas o fechas futuras ficticias.

---

## 🚀 Comandos Principales

```bash
# Desarrollo local
npm run dev

# Verificación de tipos TypeScript
npm run lint

# Compilación completa (Vite Build + Prerender SSG + Sitemap + Validación)
npm run build

# Pruebas End-to-End con Playwright
npm run test:e2e

# IndexNow (comprobación en seco / Dry Run)
npm run submit:indexnow:dry-run

# Envío oficial de URLs canónicas a IndexNow
npm run submit:indexnow
```

---

## 📌 Lista de Verificación antes de Crear una Nueva Ruta SEO

Antes de registrar una nueva página o ruta en el proyecto, se deben completar todos estos pasos:

1. [ ] **`src/data/routeConfigs.ts`**: Definir la nueva clave de ruta, path canónico (terminado en `/`), título y categoría.
2. [ ] **`src/data/seoRouteData.ts`**: Configurar `title`, `metaDescription` (única y entre 120-160 caracteres), `canonical` exacto y keywords.
3. [ ] **`src/data/routeHeaders.tsx`**: Añadir el título de cabecera visible y descripción de soporte.
4. [ ] **`src/data/routeModules.ts`**: Mapear la carga del componente o sub-estudio correspondiente.
5. [ ] **`src/components/SeoContent.tsx`**: Redactar el contenido editorial enriquecido y tips técnicos.
6. [ ] **`src/components/RelatedSilosSection.tsx`**: Vincular la ruta en la matriz de interlinking contextual.
7. [ ] **Validación**: Ejecutar `npm run build` para comprobar que la página genera exactamente 1 etiqueta `<h1>`, 1 canonical coincidente, 1 esquema JSON-LD `WebApplication` y aparece en el sitemap sin errores.
