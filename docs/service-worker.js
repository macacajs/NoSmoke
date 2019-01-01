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
    "revision": "822e933caaf8c23f994cb52fc7b91673"
  },
  {
    "url": "assets/css/0.styles.d7d8e012.css",
    "revision": "0834184c2298435694f0dd85dbd5ee90"
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
    "url": "assets/js/10.c28b1319.js",
    "revision": "ce5f3fdb8aedd2e490941b4e0a9f72f1"
  },
  {
    "url": "assets/js/11.e9751804.js",
    "revision": "5d3b73d2b889c8d06f25990a3341615e"
  },
  {
    "url": "assets/js/12.17a22869.js",
    "revision": "f5aaec6a44f390c8dacd734fc08a5551"
  },
  {
    "url": "assets/js/13.ac63320d.js",
    "revision": "93eb2e72ab2754294bf6d3602e7323f1"
  },
  {
    "url": "assets/js/14.47fb9066.js",
    "revision": "6911c11433e622229346e88591097ea5"
  },
  {
    "url": "assets/js/15.b51c23c3.js",
    "revision": "262c8a92f9b540c71b32637f3a3fc86f"
  },
  {
    "url": "assets/js/16.da0a277e.js",
    "revision": "f835b1c9bdbeb39aaf728475ac2cc9b3"
  },
  {
    "url": "assets/js/17.c83a9ca4.js",
    "revision": "589a259149d8e130a22787d88ed79650"
  },
  {
    "url": "assets/js/18.e134ae05.js",
    "revision": "b608690f96ed3a73a7dc9023bfad983a"
  },
  {
    "url": "assets/js/19.c6cdb075.js",
    "revision": "298adcd61658692efb297ae533dac49b"
  },
  {
    "url": "assets/js/2.119ce5e7.js",
    "revision": "ed1111a4c75e39d3ea39c8bc4e1f74d0"
  },
  {
    "url": "assets/js/3.d21776a1.js",
    "revision": "f0a089b525da75d0b2d269f08c2a61f4"
  },
  {
    "url": "assets/js/4.a9bfd751.js",
    "revision": "da9779b3eae1610b752f5b300a29ba13"
  },
  {
    "url": "assets/js/5.813a0cd0.js",
    "revision": "05b6115ee6f5d5ca6662b3bf42004b8f"
  },
  {
    "url": "assets/js/6.6d6d1839.js",
    "revision": "0a421546cc16900efbd005da9053a899"
  },
  {
    "url": "assets/js/7.d2fd7b8d.js",
    "revision": "a1ab68cc0597d4bbfc6ca37aa47c5467"
  },
  {
    "url": "assets/js/8.afd392cc.js",
    "revision": "0b5aaafdeeb8da7c11d0c08e7b594134"
  },
  {
    "url": "assets/js/9.fe5959e6.js",
    "revision": "c6537ff58c02fc2d91ec0ac45c921679"
  },
  {
    "url": "assets/js/app.74fcd6d7.js",
    "revision": "fa73b227831d63713b6f67ebc84f2cb2"
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
    "revision": "f2f33db65dbe808def954abd01815e2b"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "299ca23d95b1f6d1082ee2727702a43a"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "adf962f90fdbed45287d8f4607a48416"
  },
  {
    "url": "guide/hooks.html",
    "revision": "ce5ff3ad012075a95f5d695ebdc0dfde"
  },
  {
    "url": "guide/index.html",
    "revision": "c95147cd0c1eb6cdc2f6033c41fd5134"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "d4af380dd68066cb8549b221a652f375"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "e51d19f424c5c7443e30e8df6f067a93"
  },
  {
    "url": "index.html",
    "revision": "40e8d713342c4ef22c82bfc77db0b25a"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "e75057a39a99525c22cd8ef33fea505a"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "2805502ecfff912fa9c174be37d07b5e"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "02f88b5d42105021256e521d66b90716"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "bcd529ab71a53ec0fe82a3413cf33025"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "98f72c72a15ae05a637751fc6ab096b1"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "4978c38d896a0d4452122cf6359321bb"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "2645e82c338d802be80ead2b546c5cc7"
  },
  {
    "url": "zh/index.html",
    "revision": "4e965dc644ae46ddee420ae65b1ee0d2"
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
