const CACHE = 'silas-v2';
const ASSETS = [
  '/silas-pwa/',
  '/silas-pwa/index.html',
  '/silas-pwa/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('railway.app')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
