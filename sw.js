/* Belivery service worker — v5.3
   Strategy: app shell = network-first (naya version turant milega, net na ho to cache se)
              fonts/icons = cache-first (fast) */
var CACHE = 'belivery-v5.3';
var CORE = ['./', './index.html', './app.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); })
  );
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  var sameOrigin = new URL(e.request.url).origin === location.origin;
  if(sameOrigin){
    e.respondWith(
      fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      }).catch(function(){
        return caches.match(e.request).then(function(r){ return r || caches.match('./'); });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(r){
        return r || fetch(e.request).then(function(res){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
          return res;
        });
      })
    );
  }
});
