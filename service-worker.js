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
    "revision": "8fd886bf5f88012132e91128b34a210f"
  },
  {
    "url": "assets/css/0.styles.27f93d3c.css",
    "revision": "51e4deea9fcb7787519ca5d0fe058aa8"
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
    "url": "assets/js/10.9f9a5061.js",
    "revision": "1effc6a328557d741629157b576af724"
  },
  {
    "url": "assets/js/11.dcf74817.js",
    "revision": "660f70c79157945e07d931a0950ff5b5"
  },
  {
    "url": "assets/js/12.83130eb6.js",
    "revision": "1c64c3e22c721b997bc4fda59adb9fdb"
  },
  {
    "url": "assets/js/13.3a81d0c1.js",
    "revision": "caf21b25b9a890eefa2361e789b72ccd"
  },
  {
    "url": "assets/js/14.6d2b8a0f.js",
    "revision": "bcf8c53320aec69fe5bd35dfd1ee1a16"
  },
  {
    "url": "assets/js/15.6710082d.js",
    "revision": "63d7d4be9e820670cec8781149c6d19c"
  },
  {
    "url": "assets/js/16.0ca627e0.js",
    "revision": "416f2cd25fb80c4e32ec3ee951efb275"
  },
  {
    "url": "assets/js/17.490bcfc1.js",
    "revision": "4554ab67fe5ce13ec504bab3ad867071"
  },
  {
    "url": "assets/js/18.84cf9041.js",
    "revision": "93bdda50034ece33b224a815c3c0b24d"
  },
  {
    "url": "assets/js/19.5e2912d2.js",
    "revision": "8d836237fb10eb1cb2d02dfe05a54198"
  },
  {
    "url": "assets/js/2.857aeefe.js",
    "revision": "f4da8d88186e364fc3711377b67d1494"
  },
  {
    "url": "assets/js/3.09dc5a2f.js",
    "revision": "cc49689dbf19172881f84e3918059e89"
  },
  {
    "url": "assets/js/4.698d5a76.js",
    "revision": "e631c22c84ccfd8c745eea8affe2ff20"
  },
  {
    "url": "assets/js/5.557760bd.js",
    "revision": "7b831d217c1cf51524fb121b8167de9e"
  },
  {
    "url": "assets/js/6.3a2c6c50.js",
    "revision": "59ae92931592e8fb31f0156a6b43b1a5"
  },
  {
    "url": "assets/js/7.7bb786db.js",
    "revision": "69f22e1290c595aec89156f9bce74f84"
  },
  {
    "url": "assets/js/8.308b7f50.js",
    "revision": "1817c2a2aa360ead7424815d7cbc4c5f"
  },
  {
    "url": "assets/js/9.f281b274.js",
    "revision": "03181598bcc49d0f0e5367ff1b8473f7"
  },
  {
    "url": "assets/js/app.b342df93.js",
    "revision": "0c8ff7d606853db61a576d2f981d67e0"
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
    "revision": "b6e0bdb7ea3c5952767e169121e2f4a9"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "d2b6b2a68ce6816aad20637b0ebe93ab"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "4293f22838e3f7fed000456cad372af3"
  },
  {
    "url": "guide/hooks.html",
    "revision": "1d3a3a5020211d53927d3394eae9833e"
  },
  {
    "url": "guide/index.html",
    "revision": "f92e389e988c4fb59cbb131ec666fd59"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "10319177d43c186df278d31751a9588a"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "3062496c68a31faf514b4e714022a363"
  },
  {
    "url": "index.html",
    "revision": "25582523753e4ab6151018a8aa956c78"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "584e1606835c694132addfba2834133a"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "31ac995acdd7be66c02db96220f4bd24"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "8a6482fe0672ae175d25c309e6fc9e1e"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "d57fda4dfe36decdb1ed3af57b7b3d81"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "964bbcf9ac2363c1370bc47704d5e69a"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "776ea4e68df6eb9c058652a7c0014a46"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "727f085abd5b7bae7e5e8d1464c38224"
  },
  {
    "url": "zh/index.html",
    "revision": "b02f164fe08d24b388a682750d9acc33"
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
