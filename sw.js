/*  DOS.KZ — Service Worker v2
    Cache-first for static assets, network-first for HTML.          */

var CACHE = 'dos-v2';

var SHELL = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/og-image.png',
  '/avatar.jpg',
  '/avatar.webp',
  '/kz-outline.svg',
  '/case-styles.css',
  '/main.js'
];

/* ---------- Install: pre-cache the shell ---------- */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL);
    })
  );
  self.skipWaiting();
});

/* ---------- Activate: purge old caches ---------- */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (n) { return n !== CACHE; })
          .map(function (n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

/* ---------- Fetch strategy ---------- */
self.addEventListener('fetch', function (e) {
  var req = e.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Network-first for HTML (navigation requests)
  var accept = req.headers.get('accept');
  if (req.mode === 'navigate' || (accept && accept.indexOf('text/html') !== -1)) {
    e.respondWith(
      fetch(req)
        .then(function (res) {
          var clone = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, clone); });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (cached) {
            return cached || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache-first for static assets
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        // Cache successful responses for static asset types
        if (res.ok && isStaticAsset(req.url)) {
          var clone = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, clone); });
        }
        return res;
      });
    })
  );
});

function isStaticAsset(url) {
  return /\.(css|js|png|jpg|jpeg|webp|svg|woff2?|ttf|ico)(\?|$)/i.test(url);
}
