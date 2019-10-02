var CACHE_NAME = "H5X_cache_v1.0.0";
var cacheList = [
	"./mods/lib/vue.min.js",
	"./mods/lib/jquery.min.js",
	"./mods/common/rem.js",
	"./static/favicon.ico",
	"./static/favicon64.ico"
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
		Promise.all([
			self.clients.claim(),
			caches.keys().then(keys => {
				Promise.all(
					keys.filter(key => !key.startsWith(CACHE_NAME))
						.map(key => caches.delete(key))
				)
			})
		]).catch(error => {
			console.log(error)
		})
	)
})

self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request)
			.then(hit => {
				if (hit) return hit;
				const fetchRequest = e.request.clone();
				return onlineRequest(fetchRequest);
			})
	)
})

function onlineRequest(fetchRequest) {
	return fetch(fetchRequest).then(response => {
		if (!response || response.status !== 200
			|| !response.headers.get('Content-type').match(/image|javascript|test\/css/i)) {
			return response;
		}
		const responseClone = response.clone();
		caches.open(CACHE_NAME)
			.then(function (cache) {
				cache.put(fetchRequest.request, responseClone);
			});
		return response;
	}).catch(() => {
	});
}
