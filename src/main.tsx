import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initialiserCacheOffline, mettreAJourCacheOffline } from './utilitaires/cacheOfflineIOS';

// Initialiser le cache offline pour iOS
initialiserCacheOffline();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Mettre à jour le cache offline toutes les 30 secondes si on est en ligne
if (import.meta.env.PROD) {
  setInterval(() => {
    mettreAJourCacheOffline();
  }, 30000);
}

// Register service worker in production
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
