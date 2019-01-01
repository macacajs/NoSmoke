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
    "revision": "66b32cce7a0c93231ab7b86863f5c87d"
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
    "url": "assets/js/app.ccbe6590.js",
    "revision": "cdb152dbc27ad4d345dab800a311707e"
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
    "revision": "b74a76e1a9ae591ce97ed23fc7e84d2f"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "5b455e88e958b30456d4b67679492ab5"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "5b73a7b1c1df8e68b7bdaab78e9ac642"
  },
  {
    "url": "guide/hooks.html",
    "revision": "818f8fb653a930c56a98feaab6371389"
  },
  {
    "url": "guide/index.html",
    "revision": "bcfa1b365d0c51e1700e5d96af959cd8"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "07c7b2662a6e5cc547cb5fe1c07820ad"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "509b6b2cb61cc4710a66a7508f6d4adb"
  },
  {
    "url": "index.html",
    "revision": "6e3e24d5b3e1ad7216882722b058d732"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "2eae32c12ef1a7707f51e980e80b22f2"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "c1b41081f62ffb3c4b3c8beefb99318f"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "5da5a9a580132a52f35f740ef992ea27"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "25d6bd023c4549077f06df31e77b3939"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "0b147fcb429ed5c99d9cd67257ba1415"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "5bd628b302250c52bbc7d63770713c12"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "2995f853c939f729a6974a04911f23ae"
  },
  {
    "url": "zh/index.html",
    "revision": "290f34636ccdd5934836b89838ebf4ee"
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
