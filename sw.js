var CACHE_NAME = "H5X_cache_v1.0.0";
var cacheList = [
	"./mods/lib/vue.min.js",
	"./mods/lib/jquery.min.js",
	"./mods/common/rem.js"
]

self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(cacheList))
			.then(() => self.skipWaiting())
	)
})

self.addEventListener('activate', function (e) {
	e.waitUntil(
		Promise.all(
			caches.keys().then(cacheNames => {
				return cacheNames.map(name => {
					if (name != CACHE_NAME) {
						return caches.delete(name)
					}
				})
			})
		)
	).then(() => {
		return self.clients.claim()
	})
})

self.addEventListener('fetch', function (e) {
	console.log(fetch)
})