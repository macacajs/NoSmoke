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
    "revision": "c5ac4fa9e2ee1ad0949437c926f5c565"
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
    "url": "assets/js/12.10dd5098.js",
    "revision": "a4baf03c0deec557a7d0b1db8e2427d8"
  },
  {
    "url": "assets/js/13.72808d1c.js",
    "revision": "93eb2e72ab2754294bf6d3602e7323f1"
  },
  {
    "url": "assets/js/14.32c6dae9.js",
    "revision": "70edc46557e00d919bd99f1f6266688a"
  },
  {
    "url": "assets/js/15.0cd16086.js",
    "revision": "8c83ed27649b2fb2d9bcafdbc6cfc230"
  },
  {
    "url": "assets/js/16.dba68b8f.js",
    "revision": "c88091d21022126535854f7d45300d65"
  },
  {
    "url": "assets/js/17.d2f85871.js",
    "revision": "e44e861fd6e60f2768707569f60e4862"
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
    "url": "assets/js/4.8684e9a4.js",
    "revision": "c3cb2a91cbc534d760603eddcf627531"
  },
  {
    "url": "assets/js/5.91be2d1a.js",
    "revision": "05b6115ee6f5d5ca6662b3bf42004b8f"
  },
  {
    "url": "assets/js/6.a8e2809a.js",
    "revision": "7f069884139e292b4f7a4b36d04bcc9f"
  },
  {
    "url": "assets/js/7.37044084.js",
    "revision": "c3025a256aa1705b8a51a1d78ed316f7"
  },
  {
    "url": "assets/js/8.63446202.js",
    "revision": "07dbf0caaea301c99f272941c7c145eb"
  },
  {
    "url": "assets/js/9.ca3cf66b.js",
    "revision": "b468d9257a63296df90c799a317cff9b"
  },
  {
    "url": "assets/js/app.8b2d8b7b.js",
    "revision": "ef1d475f0081b02c4427deda3599c259"
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
    "revision": "55607d86bcd03f27deb38b38319e8323"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "a2853644a8dc7ee790732bd387de27d2"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "21edc98bc3c609b34069025b2e09ac4f"
  },
  {
    "url": "guide/hooks.html",
    "revision": "e98a8f12b16563fe45da6b9467707920"
  },
  {
    "url": "guide/index.html",
    "revision": "9b7e7cbd1d45db14b7db7d3a30fcd8ce"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "f40ca9f4efe0d67320209e7797929953"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "f790e5f272e941a2aae887963a94fb40"
  },
  {
    "url": "index.html",
    "revision": "d98ec09cbe08408fe82ee6762eb87003"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "e7608fa4969eea66e8e74f36f7daa837"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "8da3d104432438123f376f6fc0ef9ef2"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "54206ad9a278e8d6b8b329879b2c5e90"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "60db59c690813b9250017005a367f74e"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "61296f37854f093cd7334b99ebe71bc8"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "0ab49a16ff3b40a167decf5a9c07d7e6"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "6f92205f19ee21654a05fc564edce59f"
  },
  {
    "url": "zh/index.html",
    "revision": "3649b9438324290928cdd9e9e1d11176"
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
