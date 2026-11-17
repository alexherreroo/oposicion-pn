// Service worker: permite abrir la app sin conexión. Sube el número de versión al cambiar archivos.
const CACHE = 'pn-v1';
const APP = ['./', 'index.html', 'css/styles.css', 'js/app.js', 'js/logic.js', 'js/store.js', 'firebase-config.js',
  'vendor/preact-htm.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP))); self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  const own = url.origin === location.origin;
  const sdk = url.hostname === 'www.gstatic.com';
  if (!own && !sdk) return; // Firestore/Auth van directos a la red.
  // Red primero (para recibir actualizaciones), caché si no hay conexión.
  e.respondWith(fetch(e.request).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || (e.request.mode === 'navigate' ? caches.match('index.html') : undefined))));
});
