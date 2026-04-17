const CACHE_NAME = 'v5_cache_scor';
// Adaugă aici TOATE fișierele pe care vrei să le salvezi offline
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json'
];

// Instalarea: Salvează fișierele în memoria telefonului
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Am salvat fișierele în cache!');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activarea: Șterge cache-ul vechi dacă faci update
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Interceptarea cererilor: Dacă nu e net, ia-le din cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
