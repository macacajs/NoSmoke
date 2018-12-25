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
    "revision": "36468f9a9e97cb9b87191f08916b9c78"
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
    "url": "assets/js/16.d3c1520b.js",
    "revision": "54cc4c4f76c8cbb21a1b2199b4b0a47f"
  },
  {
    "url": "assets/js/17.8bef122e.js",
    "revision": "7c751d878e858fc206f5ea8aed46d69e"
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
    "url": "assets/js/4.4ec1662c.js",
    "revision": "6be9036f50587a902740c932bd19e439"
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
    "url": "assets/js/9.bbea1f90.js",
    "revision": "8c5ed8b04d8071ee7da3af8b6a364c50"
  },
  {
    "url": "assets/js/app.f650dd06.js",
    "revision": "685e19bbd7f86ed31198c0f7a0880942"
  },
  {
    "url": "guide/configuration.html",
    "revision": "45c8b8f4edbc41b971d9898b46904be9"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "2f1e4ad654acf122db9ffd988adb2abe"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "30958a51099e3f662b7e00316691d600"
  },
  {
    "url": "guide/hooks.html",
    "revision": "fd7c3ca17eb4dfd17ca6121e645d9952"
  },
  {
    "url": "guide/index.html",
    "revision": "22202d8ae54ea9004fba079100ee33db"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "d183d57b69ed5b1dc7b79c2f82f456b2"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "26970a4bd0abbf1b4ac5c646d04af9a9"
  },
  {
    "url": "index.html",
    "revision": "93d1efe61498b0ea845322bca1f98a81"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "e8a0b594183cbb3ca56eecad4f9716dc"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "c57d21e01389f17790f8b4d7a3a3efab"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "240f021139c903cf6a81aec4ef88a070"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "472cc238e883f49678407d97514a8782"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "40853f5255d7c11a4f27eb39700b0ea4"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "226dc72ac267a8bd5bfce4bae9318c75"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "e42ce3e4d46cf829398fba5f6077746c"
  },
  {
    "url": "zh/index.html",
    "revision": "d177caf9ee45e8dc9bbc88ab21acb810"
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
