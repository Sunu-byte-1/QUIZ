// Cache offline fallback pour iOS (quand Service Worker n'est pas disponible)
const OFFLINE_CACHE_KEY = 'quiz-offline-cache';

export const initialiserCacheOffline = async () => {
  // Si le navigateur supporte Service Worker, on le laisse gérer
  if ('serviceWorker' in navigator) {
    return;
  }

  // Fallback pour iOS et anciens navigateurs : cacher les assets vitaux
  try {
    const cacheKey = OFFLINE_CACHE_KEY;
    const cacheData = localStorage.getItem(cacheKey);
    
    if (!cacheData) {
      // Première visite : initialiser le cache
      const assetsVitaux = {
        html: document.documentElement.outerHTML,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(assetsVitaux));
      console.log('[Offline Cache] Assets vitaux stockés en localStorage');
    }
  } catch (error) {
    console.warn('[Offline Cache] Impossible d\'accéder localStorage:', error);
  }
};

export const obtenirCacheOffline = () => {
  try {
    const cacheData = localStorage.getItem(OFFLINE_CACHE_KEY);
    return cacheData ? JSON.parse(cacheData) : null;
  } catch (error) {
    console.warn('[Offline Cache] Erreur lors de la récupération du cache:', error);
    return null;
  }
};

export const estServiceWorkerActif = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      return registrations.length > 0 && registrations.some(reg => reg.active);
    } catch (error) {
      return false;
    }
  }
  return false;
};

export const mettreAJourCacheOffline = async () => {
  try {
    if (!navigator.onLine) return; // Ne pas faire de requête si offline

    // Vérifier si le Service Worker est actif
    const swActif = await estServiceWorkerActif();
    if (swActif) return; // Si SW actif, il gère le caching

    // Fallback : mettre à jour le cache localStorage
    const response = await fetch('/');
    if (response.ok) {
      const html = await response.text();
      const cacheData = {
        html,
        timestamp: Date.now()
      };
      localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(cacheData));
      console.log('[Offline Cache] Cache mis à jour');
    }
  } catch {
    console.warn('[Offline Cache] Impossible de mettre à jour le cache');
  }
};
