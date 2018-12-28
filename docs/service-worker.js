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
    "revision": "04a873f7c9fbe1a4c44bcb3344c9a06f"
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
    "url": "assets/js/12.0d03a7ea.js",
    "revision": "84989347dca160b382fce4c0521d80b6"
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
    "url": "assets/js/4.e341252e.js",
    "revision": "d3cfb7512f4f460c8114cd28f2a71d09"
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
    "url": "assets/js/app.a26b4cce.js",
    "revision": "e569e6711d853538ba0dd1aa2e4e914d"
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
    "revision": "04f79ef368d869c447ba66b567a05c88"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "0e1f09071ed353eaccf61d8061e503bc"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "16c6c120e0c958d338b6cc3f506f4706"
  },
  {
    "url": "guide/hooks.html",
    "revision": "9a54af5650562d3aab67019fe1db6835"
  },
  {
    "url": "guide/index.html",
    "revision": "a98892284de9671a91d78b156e8e108f"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "a284ae5484312c2ca3a36805aedef4f4"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "df8d97c1c1708e29d6bcedfaf33daa89"
  },
  {
    "url": "index.html",
    "revision": "f06a7aed5dab0c95d64078482a9510df"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "ce8027506dd294c9f30ba08b8abd283c"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "c9177ff7ee7050fd0dc333986153695d"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "8cad07fdba242e289c39f5ba3c7bc9e4"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "3da01d25dba5e0181714d89d66398e08"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "1423041efb0fe2fa13778fc3ebd90cd5"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "e238c1b0d6ae966cb6318d038ed13181"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "8b00343f428232e336c45e782a7842a2"
  },
  {
    "url": "zh/index.html",
    "revision": "502e454b120e06bab404a23ac20b45a5"
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
