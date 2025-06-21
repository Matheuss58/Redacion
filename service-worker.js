const CACHE_NAME = 'redacionmil-cache-v1';
const FILES_TO_CACHE = [
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  // Adicione aqui arquivos essenciais e ícones
  './icons/icon-192.png',
  './icons/icon-512.png',
  // Se usar fonts do Google, pode querer cachear ou deixar online
];

// Instalando o SW e armazenando os arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(FILES_TO_CACHE))
    .then(() => self.skipWaiting())
  );
});

// Ativação do SW e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
    .then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    ))
    .then(() => self.clients.claim())
  );
});

// Interceptando requisições para servir do cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
