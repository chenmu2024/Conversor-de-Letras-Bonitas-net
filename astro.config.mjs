import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://conversordeletrasbonitas.net',
  integrations: [react()],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      modulePreload: {
        polyfill: false,
        resolveDependencies: () => [],
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
              return 'react-core';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide-icons';
            }
          },
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
