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
    "revision": "7e80761d9d165189c78240247d4e161e"
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
    "url": "assets/js/app.c2386da1.js",
    "revision": "1a78ed7fd3b62528d45e833537f58909"
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
    "revision": "9504c15aff1286fa21b1ee8fbdf1dd7d"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "40b5c284d4b78d0a50816f854ebcf8f5"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "21fba3a0b910f0c3914b7a7a25c23402"
  },
  {
    "url": "guide/hooks.html",
    "revision": "1a08f43308261be1c23d3245f3a2b9f7"
  },
  {
    "url": "guide/index.html",
    "revision": "134529c9bbed458b9bd7562265565e93"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "c3543ad8329541b17b54f32bf6c171fc"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "006c604ac5586d6c33bcfec82939bea3"
  },
  {
    "url": "index.html",
    "revision": "95bc390df5d5152604a741423bb9b910"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "5c852e451f5689513fd6f7f3717e3ea0"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "36f58467ed2fc4ea18bdd9b65d09a11d"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "bc35fd8b84f7b2edf71dce601751b2bd"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "ed78c083b0c03ae338a922b98ff27ebc"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "d27ee65159c59ce0c08f9bce55feebf1"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "813438a3c07c21706fdd5731dc4d5329"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "a0abafa72baf6477195616596b331d33"
  },
  {
    "url": "zh/index.html",
    "revision": "987780ddfc9cf726e465e5e9b83943ba"
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
