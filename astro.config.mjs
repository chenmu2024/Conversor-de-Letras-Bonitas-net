import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://conversordeletrasbonitas.net',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide-icons';
            }
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
              return 'react-vendor';
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
