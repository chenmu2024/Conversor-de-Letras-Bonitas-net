import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for offline PWA capabilities & instant caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch(console.warn);
  });
}

const rootElement = document.getElementById('root');

if (rootElement) {
  // If the container already contains prerendered HTML nodes (production prerender), hydrate them
  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    // Development mode or unrendered fallback
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}
