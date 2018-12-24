/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "7d4a72ec6c3203cd1a226b1a74ad0e73"
  },
  {
    "url": "assets/css/0.styles.8e39f4b2.css",
    "revision": "5eba800fc16b5e98ef7a619d4a71993a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6d5bd9ca.js",
    "revision": "3c06673fdac82219fd8f927d06a576f6"
  },
  {
    "url": "assets/js/11.523fd163.js",
    "revision": "786c5e3d42c93d5772be8cf0cfb78f52"
  },
  {
    "url": "assets/js/12.86eba68e.js",
    "revision": "a7d6d439d2a37e69717a60ceafe30212"
  },
  {
    "url": "assets/js/13.5a665939.js",
    "revision": "c9824885e2bc1838f3b09bdae4e82c2e"
  },
  {
    "url": "assets/js/14.0d4ea378.js",
    "revision": "1cc1dbfa19c5da69517210adef10cc83"
  },
  {
    "url": "assets/js/15.463a23f4.js",
    "revision": "008e7438c45a4d36822b9fc9f78a917c"
  },
  {
    "url": "assets/js/16.32744790.js",
    "revision": "ad62427569f3137311b29a71daf9b87f"
  },
  {
    "url": "assets/js/17.39e6630e.js",
    "revision": "a7c95d964005023c293f1a1190763ade"
  },
  {
    "url": "assets/js/18.a8890420.js",
    "revision": "4f50688539899b4388d881c46e57861c"
  },
  {
    "url": "assets/js/19.7c6b100c.js",
    "revision": "298adcd61658692efb297ae533dac49b"
  },
  {
    "url": "assets/js/2.97b0ee9c.js",
    "revision": "b1f0a096318f66d8186d8e62d8085f33"
  },
  {
    "url": "assets/js/3.89746d3f.js",
    "revision": "da3adb740373c444527a03135e088abf"
  },
  {
    "url": "assets/js/4.b4e0275f.js",
    "revision": "a15b084712d6ba7300ac6f22a9481600"
  },
  {
    "url": "assets/js/5.f293d95c.js",
    "revision": "4d39f5125776a7d86c1c28010b0a8817"
  },
  {
    "url": "assets/js/6.1d7a308c.js",
    "revision": "e87cc490ba28e84ac9b63711e77e0fdf"
  },
  {
    "url": "assets/js/7.4ade7488.js",
    "revision": "9c385110df0d0ba01be52f099ade07b0"
  },
  {
    "url": "assets/js/8.2b557126.js",
    "revision": "d83513a7657110225cee760a5b273e60"
  },
  {
    "url": "assets/js/9.68dc9d8c.js",
    "revision": "56994a55a93f794d32934c70546043db"
  },
  {
    "url": "assets/js/app.291d2c51.js",
    "revision": "102827a385dfb487e598ec6261b9ce40"
  },
  {
    "url": "guide/configuration.html",
    "revision": "f75471a9fdf6c582ef36ffa12017db44"
  },
  {
    "url": "guide/continous-integration.html",
    "revision": "94e17118974d0186a957718eba4da45a"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "b6bb112535a385f4ef788f0f78a20024"
  },
  {
    "url": "guide/hooks.html",
    "revision": "3e7d678a31c18a99a67be68e6e9db55d"
  },
  {
    "url": "guide/index.html",
    "revision": "c4d678dc3c575d52e5eb45175f4236a7"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "998b8ac4d7ba9f06c2580b8f41bb928b"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "66bece8092a7cc64ac7784aa89049ef2"
  },
  {
    "url": "index.html",
    "revision": "ccadc2ebb2c225d767f7c2f5f43822c5"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "8eb59845f7c68fcb9b1bc694511bb67c"
  },
  {
    "url": "zh/guide/continous-integration.html",
    "revision": "c4af9ab3b333717787de6d3aee3a3ec7"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "0dec6ba321d05515c5ae30b1a28d7813"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "6f2b203d88c35ff09ba8cf1b695b71a5"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "72db84f94c6ea74eb21cc73aca735afc"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "831beedfb9a0c0ad68b1212d4e65a57b"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "1fa487bcf5c376eee44dc6496b0219aa"
  },
  {
    "url": "zh/index.html",
    "revision": "23737f107ffa53cbfebc0f6d82611183"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
