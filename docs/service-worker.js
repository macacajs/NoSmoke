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
    "revision": "3a93fc3feae55af1948b8315e883dc76"
  },
  {
    "url": "assets/css/0.styles.7957c06f.css",
    "revision": "e6e807ddc8cab365731e74165eb3064b"
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
    "url": "assets/js/11.58336d05.js",
    "revision": "9e40d91c70f66d0a1cde539117153a9a"
  },
  {
    "url": "assets/js/12.ce1f53be.js",
    "revision": "023a2971572bfa2b2f4cbb1dccf4aac2"
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
    "url": "assets/js/3.e5eb65bc.js",
    "revision": "0fdcce36cf0c250cf373d5428f779748"
  },
  {
    "url": "assets/js/4.d8129c02.js",
    "revision": "92f4e456d84862ec0899a9ef37ca33d6"
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
    "url": "assets/js/app.085bbc4d.js",
    "revision": "817080ce4ced80554f8092e89f89fb67"
  },
  {
    "url": "assets/macaca_logo.png",
    "revision": "be63e48bfbd7e7aad9f48cac6d03a0c2"
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
    "revision": "4b8052cf7502976ebe064b5e7c82f358"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "1e70318af6eeb6e649126099bebbb671"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "94ccc1b719fb5d7e5d44168d55690f92"
  },
  {
    "url": "guide/hooks.html",
    "revision": "70ace57cabc190d57368f9c58a942f9b"
  },
  {
    "url": "guide/index.html",
    "revision": "27be2e9e7c761e8910b690678eba42f6"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "d6b08a71d0ba20a98f809e85c27cddae"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "3dd23962981fdafb5c8b3f38507e1b5a"
  },
  {
    "url": "index.html",
    "revision": "995921642024636ff2ab93c397ed94d2"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "2d6ea84296081f19e335de7b8e399c1b"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "6fcef5efb4724227ce3a00f0569a58e8"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "ce08d0f16fd70381276be00e9b7ced5c"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "385a73945650de18ea363e1d13abd4ab"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "2ee636868d7c1c5018411a56d27c51a5"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "0dfb2bfcc0cbddf37b7432246387f3ab"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "f0af9f6d6447b30968fce12508ad270b"
  },
  {
    "url": "zh/index.html",
    "revision": "5b8c97eef25dc25ad2e20cbba4ceb0cb"
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
