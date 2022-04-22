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
    "revision": "6f3b5161c294cfb83301ae4998a3a09a"
  },
  {
    "url": "assets/css/0.styles.e9b188c9.css",
    "revision": "a22d36ed7c9762f03078ae9ab24f77a4"
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
    "url": "assets/js/10.025de4d6.js",
    "revision": "06f2a956e7ede78b4cc05d42b28b8aa3"
  },
  {
    "url": "assets/js/11.bc24fa92.js",
    "revision": "c448b653d57c13f6addd9bd2d73e6d40"
  },
  {
    "url": "assets/js/12.64ecf6d4.js",
    "revision": "488b5bed5c95d8748a26a79ef36de27d"
  },
  {
    "url": "assets/js/13.1e9e8c63.js",
    "revision": "49d30fcf9cc6478005583ebe1ec15f13"
  },
  {
    "url": "assets/js/14.eec4627f.js",
    "revision": "3260dd15f990b3f8628fc4ae1f9a9f3e"
  },
  {
    "url": "assets/js/15.d1551a03.js",
    "revision": "d3e373a774be3b1b5044397e9b69b6cd"
  },
  {
    "url": "assets/js/16.16d4dd64.js",
    "revision": "d7a0ea5158de5bc1ba817167ce8748aa"
  },
  {
    "url": "assets/js/17.2f91eb03.js",
    "revision": "e5da68248b2bac44258dde7ae5ec990e"
  },
  {
    "url": "assets/js/18.dc1f8745.js",
    "revision": "42826d2920bc624fe3beac68055a3c00"
  },
  {
    "url": "assets/js/19.5e2912d2.js",
    "revision": "8d836237fb10eb1cb2d02dfe05a54198"
  },
  {
    "url": "assets/js/2.858e80da.js",
    "revision": "59b9e09855a16d382db7d8ff58d74b0d"
  },
  {
    "url": "assets/js/3.94232de2.js",
    "revision": "0f9b16a9f179e762d4258b5c668f2b9b"
  },
  {
    "url": "assets/js/4.5edbedc1.js",
    "revision": "f62e15ca7c0a4c89ea5de1af0eef3ab0"
  },
  {
    "url": "assets/js/5.8742d00d.js",
    "revision": "2f8aeebc8f2835898eb323c302aa38ab"
  },
  {
    "url": "assets/js/6.48566aba.js",
    "revision": "9a1aafa12896d375b084f74a83ab9aab"
  },
  {
    "url": "assets/js/7.59f66fce.js",
    "revision": "c9791273304ec330ab6a7c948f638332"
  },
  {
    "url": "assets/js/8.b014c280.js",
    "revision": "9761b6ca8a13a42c2a0b624abc98e464"
  },
  {
    "url": "assets/js/9.73ca13a5.js",
    "revision": "49301a537c10687c829b8d790d3885a9"
  },
  {
    "url": "assets/js/app.3638565b.js",
    "revision": "f6ece00d84637c203b20e72c81d43af6"
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
    "revision": "ba27947681986e4d5c8580af7a430194"
  },
  {
    "url": "guide/continious-integration.html",
    "revision": "e37a00d48ff9e62d7a1286276e3328b9"
  },
  {
    "url": "guide/cross-platform.html",
    "revision": "259ff134a01a203257bab7fb7ead4408"
  },
  {
    "url": "guide/hooks.html",
    "revision": "edb5bcbe4d2cc7dfc31866f060c5a855"
  },
  {
    "url": "guide/index.html",
    "revision": "268497f5f79172abb07ad3b4caa7801a"
  },
  {
    "url": "guide/quick-start.html",
    "revision": "61a82df97d6ba6152a7b40997f195760"
  },
  {
    "url": "guide/roadmap.html",
    "revision": "feb2c8a3fa161cd82b0170ddfeed005a"
  },
  {
    "url": "index.html",
    "revision": "58ab94849804957d7c494d1601d7a610"
  },
  {
    "url": "zh/guide/configuration.html",
    "revision": "f254ce42b54527c6cdc6bf36036ad92c"
  },
  {
    "url": "zh/guide/continious-integration.html",
    "revision": "411c4d9cf11fcc2a9398f91e1a9b872e"
  },
  {
    "url": "zh/guide/cross-platform.html",
    "revision": "3cb1730b45db662332902082e74d1f3a"
  },
  {
    "url": "zh/guide/hooks.html",
    "revision": "84091421e89fa6fd41bf959c5d88d387"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "1eb396f305cbebd8154da19a6e3d552e"
  },
  {
    "url": "zh/guide/quick-start.html",
    "revision": "581860ec2a24f0278be4c8d5d50cd8c7"
  },
  {
    "url": "zh/guide/roadmap.html",
    "revision": "809c25375ded69b21f1ca9aae561c868"
  },
  {
    "url": "zh/index.html",
    "revision": "e2ecebf5dfd9876e19836c4468995262"
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
