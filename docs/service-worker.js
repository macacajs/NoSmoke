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
    "revision": "bf26871b45dec136ecfd592ce0a6d2e6"
  },
  {
    "url": "assets/css/0.styles.49467085.css",
    "revision": "5d2bbe9ebb038a366166a56efc93a82f"
  },
  {
    "url": "assets/generated_output.png",
    "revision": "f3c20eaa6ef4fddae066f67a7d7707e8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.637a82e0.js",
    "revision": "ce5f3fdb8aedd2e490941b4e0a9f72f1"
  },
  {
    "url": "assets/js/11.afbfaff8.js",
    "revision": "5d3b73d2b889c8d06f25990a3341615e"
  },
  {
    "url": "assets/js/12.d3b6b468.js",
    "revision": "f5aaec6a44f390c8dacd734fc08a5551"
  },
  {
    "url": "assets/js/13.72808d1c.js",
    "revision": "93eb2e72ab2754294bf6d3602e7323f1"
  },
  {
    "url": "assets/js/14.efee9695.js",
    "revision": "6911c11433e622229346e88591097ea5"
  },
  {
    "url": "assets/js/15.ee9ab771.js",
    "revision": "262c8a92f9b540c71b32637f3a3fc86f"
  },
  {
    "url": "assets/js/16.da04399c.js",
    "revision": "f835b1c9bdbeb39aaf728475ac2cc9b3"
  },
  {
    "url": "assets/js/17.f519d8c7.js",
    "revision": "589a259149d8e130a22787d88ed79650"
  },
  {
    "url": "assets/js/18.8c4e3c16.js",
    "revision": "b608690f96ed3a73a7dc9023bfad983a"
  },
  {
    "url": "assets/js/19.c6cdb075.js",
    "revision": "298adcd61658692efb297ae533dac49b"
  },
  {
    "url": "assets/js/2.17c5b991.js",
    "revision": "2b2cb8dfc9d1cac46680b7a52053d552"
  },
  {
    "url": "assets/js/3.6be11723.js",
    "revision": "f0a089b525da75d0b2d269f08c2a61f4"
  },
  {
    "url": "assets/js/4.9ed5604e.js",
    "revision": "da9779b3eae1610b752f5b300a29ba13"
  },
  {
    "url": "assets/js/5.91be2d1a.js",
    "revision": "05b6115ee6f5d5ca6662b3bf42004b8f"
  },
  {
    "url": "assets/js/6.6b34c5d0.js",
    "revision": "0a421546cc16900efbd005da9053a899"
  },
  {
    "url": "assets/js/7.f2b906b1.js",
    "revision": "a1ab68cc0597d4bbfc6ca37aa47c5467"
  },
  {
    "url": "assets/js/8.57ef387f.js",
    "revision": "0b5aaafdeeb8da7c11d0c08e7b594134"
  },
  {
    "url": "assets/js/9.40a95c48.js",
    "revision": "c6537ff58c02fc2d91ec0ac45c921679"
  },
  {
    "url": "assets/js/app.f2d5c09a.js",
    "revision": "f866b07028d84525e41e2efc6950ad98"
  },
  {
    "url": "assets/macaca-architecture-2.0.png",
    "revision": "196aa63a061930c2c838d05cf3f088ec"
  },
  {
    "url": "assets/new_report_layout.png",
    "revision": "6b89e34146bf9b2bb3902528c87e2042"
  },
  {
    "url": "assets/nosmoke-2.0.png",
    "revision": "21d85f66bc9b95fa843e2d828a89b6f5"
  },
  {
    "url": "assets/nosmoke-hook-2.0.png",
    "revision": "85fbe8277bcac3d90500caaf804a7c37"
  },
  {
    "url": "guide/configuration.html",
    "revision": "f54977d539242ef6c2f5b0b70e5ffe1f"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "0c133f1fd939c627cf9b89ad57a01984"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "6f4806dbc64c24422d61b1722c19ae26"
  },
  {
    "url": "guide/hooks.html",
    "revision": "d70a30be12b696a5fa5c48ec47b0b450"
  },
  {
    "url": "guide/index.html",
    "revision": "a40f5d6b306cdde87514f54a83fd279b"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "40a36af52a9a6d64ae2fddc04694c359"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "6405ee1638385d9a5ac77a99afd7dcc9"
  },
  {
    "url": "index.html",
    "revision": "bc6b393b58ae4a807e23bfe68ae3463b"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "f0b5723989cb09253f34c4f7433bbf5d"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "5fe07ff915edb240c004c070246e6752"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "3ba4810e61e8e34cd9fc576b7d94db00"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "9b50e4149a48a14373beecf011e5e156"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "bf0674bf1cd0d23c10ea9d71377d2e4c"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "f5083528e0cb44ff64ba5c1af66b1b95"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "976180cc35511d89e457327769b0541f"
  },
  {
    "url": "zh/index.html",
    "revision": "63e10196aaacf20d9b39fad73db5d90c"
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
