importScripts("precache-manifest.0ad4aa7ed2c5c9daea185bd42679dd51.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

!function () { "use strict"; try { self["workbox:sw:4.3.1"] && _() } catch (t) { } const t = "https://storage.googleapis.com/workbox-cdn/releases/4.3.1", e = { backgroundSync: "background-sync", broadcastUpdate: "broadcast-update", cacheableResponse: "cacheable-response", core: "core", expiration: "expiration", googleAnalytics: "offline-ga", navigationPreload: "navigation-preload", precaching: "precaching", rangeRequests: "range-requests", routing: "routing", strategies: "strategies", streams: "streams" }; self.workbox = new class { constructor() { return this.v = {}, this.t = { debug: "localhost" === self.location.hostname, modulePathPrefix: null, modulePathCb: null }, this.s = this.t.debug ? "dev" : "prod", this.o = !1, new Proxy(this, { get(t, s) { if (t[s]) return t[s]; const o = e[s]; return o && t.loadModule(`workbox-${o}`), t[s] } }) } setConfig(t = {}) { if (this.o) throw new Error("Config must be set before accessing workbox.* modules"); Object.assign(this.t, t), this.s = this.t.debug ? "dev" : "prod" } loadModule(t) { const e = this.i(t); try { importScripts(e), this.o = !0 } catch (s) { throw console.error(`Unable to import module '${t}' from '${e}'.`), s } } i(e) { if (this.t.modulePathCb) return this.t.modulePathCb(e, this.t.debug); let s = [t]; const o = `${e}.${this.s}.js`, r = this.t.modulePathPrefix; return r && "" === (s = r.split("/"))[s.length - 1] && s.splice(s.length - 1, 1), s.push(o), s.join("/") } } }();
//# sourceMappingURL=workbox-sw.js.map
console.log(456465)
var CACHE_NAME = "H5X_cache_v1.0.0";
var cacheList = [
	"vue.min.js",
	"jquery.min.js",
	"rem.js"
]

self.addEventListener('fetch', function (e) {
	console.log(fetch)
})

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

if (workbox) {
	console.log(456465465797)
}

workbox.routing.registerRoute(
	/\.min\.js$/,
	new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: CACHE_NAME,
	}),
);

workbox.routing.registerRoute(
	/\.(?:js|css|json)$/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: CACHE_NAME,
	})
);

workbox.routing.registerRoute(
	/\.(?:png|jpg|jpeg|svg|gif)$/,
	// Use the cache if it's available.
	new workbox.strategies.CacheFirst({
		cacheName: CACHE_NAME,
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 60,
				maxAgeSeconds: 7 * 24 * 60 * 60,
			})
		],
	})
);

self.addEventListener('beforeinstallprompt', function (e) {
	// 这个 `event.userChoice` 是一个 Promise ，在用户选择后 resolve
	e.userChoice.then(result => {
		console.log(result.outcome)
		// 'accepted': 添加到主屏
		// 'dismissed': 用户不想理你并向你扔了个取消
	})
})
