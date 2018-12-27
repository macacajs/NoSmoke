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
    "revision": "b8960755e6ad802e6f290e7a3081271d"
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
    "url": "assets/js/12.9be312b1.js",
    "revision": "59b6a77b34c712c3346560a6c694e42b"
  },
  {
    "url": "assets/js/13.ac63320d.js",
    "revision": "93eb2e72ab2754294bf6d3602e7323f1"
  },
  {
    "url": "assets/js/14.d380f929.js",
    "revision": "70edc46557e00d919bd99f1f6266688a"
  },
  {
    "url": "assets/js/15.cb727cc4.js",
    "revision": "8c83ed27649b2fb2d9bcafdbc6cfc230"
  },
  {
    "url": "assets/js/16.01bbe2a3.js",
    "revision": "c88091d21022126535854f7d45300d65"
  },
  {
    "url": "assets/js/17.43b0679f.js",
    "revision": "e44e861fd6e60f2768707569f60e4862"
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
    "url": "assets/js/4.306efd00.js",
    "revision": "01725630ca92aac32d2fb04d7bad45e2"
  },
  {
    "url": "assets/js/5.813a0cd0.js",
    "revision": "05b6115ee6f5d5ca6662b3bf42004b8f"
  },
  {
    "url": "assets/js/6.a54b5a6c.js",
    "revision": "7f069884139e292b4f7a4b36d04bcc9f"
  },
  {
    "url": "assets/js/7.9d10effb.js",
    "revision": "c3025a256aa1705b8a51a1d78ed316f7"
  },
  {
    "url": "assets/js/8.ea98f1e9.js",
    "revision": "07dbf0caaea301c99f272941c7c145eb"
  },
  {
    "url": "assets/js/9.29322f65.js",
    "revision": "b468d9257a63296df90c799a317cff9b"
  },
  {
    "url": "assets/js/app.a722887b.js",
    "revision": "61e1eae6b50833da56357785254f9c6d"
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
    "revision": "46033d5cb5b385af2da9ed6af9b95b07"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "ed1707e47a67179e390df3325c9d8583"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "17994ee427381f1c84c34d462d47c8a8"
  },
  {
    "url": "guide/hooks.html",
    "revision": "123edef64081fa0cc343b25e8d7c7848"
  },
  {
    "url": "guide/index.html",
    "revision": "6d2453f6dd48528db82570be7fec2c4f"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "879b01650b0f1d9c5a8293b295cd35e6"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "c8504efe7e9e901167b3079cf5c5f718"
  },
  {
    "url": "index.html",
    "revision": "627979edb7a81c7509c8d877c890160d"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "6f28c1fcd495a1f104893d6a7ef82454"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "8c9f450ac2325cd9e910713ab9cd82a5"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "202e94b275ae9b8a6d71d451dc510413"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "ecb27b552669f20157c3f3c2b3a5926f"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "cb17ca967549ce28e5650458d63ce871"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "6dd42a1be17b7206043135c0af5fddfe"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "617a0ed97065692bc6cda1165a0cca8e"
  },
  {
    "url": "zh/index.html",
    "revision": "cc68218bee190770f2de830be21aeb85"
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
