const CACHE_NAME = "my-cache-v9";
const urlsToAdd = [
    '/',
    '/index.html',
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToAdd))
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(respond => {
            if (respond) return respond;
            return fetch(event.request);
        })
    )
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(cachesName => {
            return Promise.all(
                cachesName.filter(cache => cache != CACHE_NAME)
                    .map(cache => caches.delete(cache))
            )
        })
    )
});