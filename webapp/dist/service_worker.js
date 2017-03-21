var cacheName = 'aurora';
var dataCacheName = 'aurora-data';
var filesToCache = [
  '/',
  '/main.js',
  "/assets/home.jpg"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
function cache_on_fail_fetch(request){
  return fetch(request)
  .then(function(r){
    cache.put(request.url, r.clone());
    return r;
  })
  .catch(function() {
    caches.match(request).then(function(response) {
      if(response){
        return response;
      }
  })
})
}

//network then cache strategy
function fetch_and_cache(request){
  return caches.open(dataCacheName)
  .then(function(cache) {
    return fetch(request)
    .then(function(r){
      cache.put(request.url, r.clone());
      return r;
    });
  })
}
self.addEventListener('fetch', function(e) {
  if(e.request.method=="GET"){
    let url=e.request.url;
  //  console.log('[ServiceWorker] Fetch', url);
    //check assets, like icons, images, etc
    //cache first strategy for assets
    if (url.indexOf("/assets") > -1) {
      not_found=false;
      e.respondWith(
        caches.match(e.request).then(function(response) {
          if(response){
            return response;
          }else{
            //if not found in cache, fetch and then cache the response
            return fetch_and_cache(e.request);
          }
        })
      );
    }else{
      //don't cache webpack hot reload call.
      if(url.indexOf("webpack")>-1 || url.indexOf("hot-update.js")>-1){
        return e.respondWith(fetch(e.request));
      }else{
        //network then cache for files like API calls
        if(url.indexOf("api")>-1){
          e.respondWith(cache_on_fail_fetch(e.request));
        }else{
          //the request is inside app shell? return immediately the cache
          e.respondWith(
            caches.match(e.request).then(function(response) {
              return response || fetch_and_cache(e.request);
            })
          );
        }

      }

    }
  }else{
    fetch(e.request)
  }

});
