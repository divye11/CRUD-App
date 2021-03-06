var CACHE_NAME = 'pwa-todo-ver1';
// const staticCacheName = 'site-static-v2';
// const dynamicCacheName = 'site-dynamic-v2';
const self = this;

const assets = [
  '/',
  'index.html',
  '/src/App.js',
  '/src/App.css',
  '/src/index.js',
  '/src/index.css',
  '/src/App.test.js',
  '/static/',
  '/static/js/',
  '/static/css/',
  // 'https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js',
];

// install event
self.addEventListener('install', (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    }),
  );
});

// // activate event
// self.addEventListener('activate', (evt) => {
//   //console.log('service worker activated');
//   evt.waitUntil(
//     caches.keys().then((keys) => {
//       //console.log(keys);
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
//           .map((key) => caches.delete(key)),
//       );
//     }),
//   );
// });

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

// fetch events
// self.addEventListener('fetch', (evt) => {
//   if (
//     evt.request.url.indexOf('jsonplaceholder.typicode.com') > -1
//     // evt.request.url.indexOf('.vercel.app/') > -1
//   ) {
//     return;
//   } else {
//     evt.respondWith(
//       caches
//         .match(evt.request)
//         .then((cacheRes) => {
//           return (
//             cacheRes ||
//             fetch(evt.request).then((fetchRes) => {
//               return caches.open(dynamicCacheName).then((cache) => {
//                 cache.put(evt.request.url, fetchRes.clone());
//                 // check cached items size
//                 // limitCacheSize(dynamicCacheName, 15);
//                 return fetchRes;
//               });
//             })
//           );
//         })
//         .catch(() => {
//           if (evt.request.url.indexOf('.html') > -1) {
//             return caches.match('/pages/fallback.html');
//           }
//         }),
//     );
//   }
// });

// // Install a service worker
// self.addEventListener('install', (event) => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log('Opened cache');
//       return cache.addAll(urlsToCache);
//     }),
//   );
// });

// Cache and return requests
self.addEventListener('fetch', (event) => {
  console.log('fetch', event);
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch((err) => {
          console.log('inside');
          caches.match('/index.html');
        });
      })
      .catch((err) => {
        console.log('could not find in cache', err);
      }),
  );
});

// // Update a service worker
// self.addEventListener('activate', (event) => {
//   var cacheWhitelist = ['pwa-todo-manager'];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         }),
//       );
//     }),
//   );
// });
