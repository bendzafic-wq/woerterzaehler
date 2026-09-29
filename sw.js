// Legt die App-Dateien einmal ab, damit sie danach ohne Internet startet.
var CACHE = 'woerterzaehler-v1';
var FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })); })); self.clients.claim(); });
self.addEventListener('fetch', function (e) { e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); })); });
