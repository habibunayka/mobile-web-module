const CACHE_NAME = "my-cache-v6";
const urlsToCache = [
    "/",
    "/vite.svg",
    "/settings",
    "/index.html",
    "/manifest.json",
    "/assets/index.js",
    "/assets/index.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cache) => {
            if (cache) return cache;
            return fetch(event.request)
        })
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name != CACHE_NAME)
                .map((cache) => cache.delete())
            )
        })
    )
})