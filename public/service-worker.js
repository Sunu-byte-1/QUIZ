const CACHE_NAME = 'quiz-cache-v3';
const RUNTIME_CACHE = 'quiz-runtime-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/culture_10053855.png',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      console.log('[SW] Cleaning old caches');
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const { request } = event;
  const url = new URL(request.url);

  // API calls: network-first with fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            // Cache successful responses
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline: try cache
          return caches.match(request).then(cached => {
            if (cached) return cached;
            // If API endpoint not cached, return offline fallback
            return new Response(
              JSON.stringify({ offline: true, message: 'Mode hors ligne' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Static assets: cache-first strategy
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then(networkResponse => {
        // Don't cache opaque responses or non-ok responses
        try {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            const cacheName = request.url.includes('/assets/') ? CACHE_NAME : RUNTIME_CACHE;
            caches.open(cacheName).then(cache => {
              cache.put(request, responseClone);
            });
          }
        } catch (err) {
          // ignore
        }
        return networkResponse;
      }).catch(() => {
        // Offline fallback: serve cached or index.html for SPA
        return caches.match(request)
          .then(cached => cached || caches.match('/index.html'))
          .then(response => response || new Response('Offline', { status: 503 }));
      });
    })
  );
});
