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
    "revision": "4542f6a7ec38657c0a60751b3a13f621"
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
    "url": "assets/js/12.94bc775e.js",
    "revision": "11126bc840c6aacb26adce5da727669f"
  },
  {
    "url": "assets/js/13.72808d1c.js",
    "revision": "93eb2e72ab2754294bf6d3602e7323f1"
  },
  {
    "url": "assets/js/14.0a8f3a95.js",
    "revision": "1cae1ff2a859a10e882cce86b034e1bd"
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
    "url": "assets/js/4.f4a441d9.js",
    "revision": "b3eeafb765a4aa029cf577f144f255af"
  },
  {
    "url": "assets/js/5.91be2d1a.js",
    "revision": "05b6115ee6f5d5ca6662b3bf42004b8f"
  },
  {
    "url": "assets/js/6.8d1abef6.js",
    "revision": "2c94d02be8b5f03445500cef16fc6176"
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
    "url": "assets/js/app.1627ba50.js",
    "revision": "cca1d84ff01305c0aa4c16374778ac89"
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
    "revision": "b48ff7d6722d8b7bbd513c4965d43181"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "b6d5f627bd3756ef79d4453600e611c9"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "53a3655d2b0cb7da49d6ede996a5c731"
  },
  {
    "url": "guide/hooks.html",
    "revision": "165fc36aacb779627c87d233fdccfdfe"
  },
  {
    "url": "guide/index.html",
    "revision": "b9f842f8599bce92643269cf407bee75"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "81d9eeb9278313f23f37fec4b4041f7a"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "65d436f9c88ac2a4f3d6be2742e4815a"
  },
  {
    "url": "index.html",
    "revision": "81764a01b2d26f5973bbbe359e9b548c"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "6739b1d15dfc7929605840645ba216a8"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "c7ab3a92251290d9916d2c34194b8bb6"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "36040df0ac38f72f08a5d5402725df44"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "d4366958236ad5026c2391e585d6830b"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "016ad317c4460dfe5b70fbe933412919"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "d9e59520c9450cfd1e1e019f25bf0e32"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "967663d4f8ba2924c87691b24f36c732"
  },
  {
    "url": "zh/index.html",
    "revision": "6d94698a3a274d0f4d210c0dbe029f24"
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
