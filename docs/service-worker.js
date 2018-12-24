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
    "revision": "2b43566d75889cdf49f897fce7eb7a2d"
  },
  {
    "url": "assets/css/0.styles.7957c06f.css",
    "revision": "e6e807ddc8cab365731e74165eb3064b"
  },
  {
    "url": "assets/img/generated_output.f3c20eaa.png",
    "revision": "f3c20eaa6ef4fddae066f67a7d7707e8"
  },
  {
    "url": "assets/img/macaca-architecture-2.0.196aa63a.png",
    "revision": "196aa63a061930c2c838d05cf3f088ec"
  },
  {
    "url": "assets/img/new_report_layout.6b89e341.png",
    "revision": "6b89e34146bf9b2bb3902528c87e2042"
  },
  {
    "url": "assets/img/nosmoke-2.0.21d85f66.png",
    "revision": "21d85f66bc9b95fa843e2d828a89b6f5"
  },
  {
    "url": "assets/img/nosmoke-hook-2.0.85fbe827.png",
    "revision": "85fbe8277bcac3d90500caaf804a7c37"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.780f4c1f.js",
    "revision": "26917aab51c3a9ea5e1737b6923b46f5"
  },
  {
    "url": "assets/js/11.3c055967.js",
    "revision": "23cad3b8a62265c3f2d5d17221ca9b79"
  },
  {
    "url": "assets/js/12.c4f14b62.js",
    "revision": "f76093d1018443d7c107cbcce20a9802"
  },
  {
    "url": "assets/js/13.1e1b7680.js",
    "revision": "169f272afe4abdd92db5f61e575be6cc"
  },
  {
    "url": "assets/js/14.79c06c4a.js",
    "revision": "60cfccc803983b4fb571fdf8309723cf"
  },
  {
    "url": "assets/js/15.f30ca4d7.js",
    "revision": "b4fb5ed08653b64d01b615e6de54ce69"
  },
  {
    "url": "assets/js/16.99190381.js",
    "revision": "6bc09c45bd1fdfe6f3f69877d427cae5"
  },
  {
    "url": "assets/js/17.efa63776.js",
    "revision": "9ad638d1d6950992856f66f3cf17dfd4"
  },
  {
    "url": "assets/js/18.3477e6e9.js",
    "revision": "33917bbeb00fa06561ac1be0c6af5653"
  },
  {
    "url": "assets/js/19.b8fcc81e.js",
    "revision": "b1d19c0ddb570b70eea58cb0658476c9"
  },
  {
    "url": "assets/js/2.a6b43ca8.js",
    "revision": "f982299e3462916c2d66bb0625cb5ac2"
  },
  {
    "url": "assets/js/3.4911016e.js",
    "revision": "afdeb3b34849f0e4e6ca21d1d1f5cd14"
  },
  {
    "url": "assets/js/4.5fe76eaa.js",
    "revision": "32da3801a29f6861d034b730fcf3118a"
  },
  {
    "url": "assets/js/5.6d91363c.js",
    "revision": "c70f53f5dde3c5f019352db76cdfe70f"
  },
  {
    "url": "assets/js/6.7acd0d92.js",
    "revision": "333c5b9c0955af63ebab0a2b5f65d309"
  },
  {
    "url": "assets/js/7.bcb8b56f.js",
    "revision": "e543a7cecadac77edaef0df921486b03"
  },
  {
    "url": "assets/js/8.307705c1.js",
    "revision": "c19b9420ab5d0075d6063c961b82ef17"
  },
  {
    "url": "assets/js/9.c58c7b7f.js",
    "revision": "4ac266766e5cc75664892e63f7320741"
  },
  {
    "url": "assets/js/app.dc236b63.js",
    "revision": "cbaf25aeb4dca0ce644f7cc0c8564e6c"
  },
  {
    "url": "guide/configuration.html",
    "revision": "8e9363b0514a2badbefb46ed87d12052"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "e751e76105656da9113702613aa8f990"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "94587a2934e7c3cb4428e5bf84752ca3"
  },
  {
    "url": "guide/hooks.html",
    "revision": "948fa74e441085fe399ec05d2f687f86"
  },
  {
    "url": "guide/index.html",
    "revision": "24f3f6505ec15eb521083424cd24fd79"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "ba7b00b4f042ad0b99f4b18fffcdf81a"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "2739b8c408b12484304b404b27eebfa0"
  },
  {
    "url": "index.html",
    "revision": "de861ef8f857f2e76adb089db3cb0538"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "9dc014e13fd8b30cfcf118afe6c5990b"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "0fb53392c0bef0eed2096fd6f38fa1bf"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "df06396c72365ee9c7d0a23a23c98855"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "11f85d5ccfb9c53892217a2fcb1e2673"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "1c9de1a16975424320ec78362d2784a3"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "2d9b95329e79015059e73d2ce82cb764"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "d68ae4cb51b991308bc2366c421e611a"
  },
  {
    "url": "zh/index.html",
    "revision": "20d27d3b521aecdc90b94b2887d81436"
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
