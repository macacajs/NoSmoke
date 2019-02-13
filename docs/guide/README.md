# NoSmoke 2.0 Cookbook

NoSmoke is a cross platform UI crawler which scans view trees/conduct ocr operations and then generate and execute UI test cases.  Used for smoke testing under continuous integration. Following [Webdriver](https://www.w3.org/TR/webdriver/) protocol. This document is written as a manual for NoSmoke 2.0.

## 1. Advantages of NoSmoke:

With it you can:

* [x] Conduct **automated UI test** with **simple configuration** and **minimum testing scripts** manually created.

* [x] **More accurate than monkey test**, instead of generate randomised UI test action, crawler analyse current screens potential UI elements and triggers action targeting those elements.

* [x] One tool, **multiple platforms - iOS and Android** !! :\]

* [x] **Visualise \(automation\) testing result** and validate the testing history via [Macaca-Reporter](https://github.com/macacajs/macaca-reporter)

## 2. How it works?

### From version 1.0

From NoSmoke version 1.0, it relies on retrieving source information from local drivers in xml format.

### From version 2.0

From NoSmoke version 2.0, OCR is introduced to NoSmoke, by retrieving textual information directly from image, previously tons of calculation of xml view hierarchy on driver process has been removed.

![](/NoSmoke/assets/macaca-architecture-2.0.png)

### Difference between versions:

| Attributes    | Version 1   | Version 2
|-              | -           | -
| Support Platform  | Android iOS Web  |  Android iOS  |
| Configurable Items |  14 configuration  |  4 simplified configuration
| Hook APIs     |   5 hooks   |     1 simplified hooks
| Hook implementation  |  Raw restful wd request  |  Encapsulated APIs for click/input/drag  |
| Duration per iteration  | 12 Second / Round  |  5 Second / Round |
| Stability Factor  | 0.6  |  0.95  |
| Module Dependencies  |  Macaca Drivers  | Macaca/Appium Drivers |

## 3.  List of Features

### a. Muliplatform

NoSmoke supports UI crawling and testing for **iOS**, **Android**, [macaca-reporter](https://github.com/macacajs/macaca-reporter) is used to gather and present the crawling process.

![](/NoSmoke/assets/new_report_layout.png)

### b. Configurable

Refer to the crawler.config.yml file in the NoSmoke/public folder as a example. You can choose which platform to conduct the crawling task:

```ruby
desiredCapabilities:
    platformName: 'iOS/Android'
    deviceName: 'iPhone 6 Plus'
    app: '${downloadable address of .ipa/.apk file}'
```

And the corresponding configuration for crawling the app:

```ruby
crawlingConfig:
  strategy: 'ocr'
  platform: '${platform: android/ios}'
  triggers:
    - '${prioritised trigger point}'
  exclude:
    - '${exclude text patten}'
```

### c. Hookable

NoSmoke 2.0 Reduced the number of Hooks provided for app crawling process, which also reduces the cost of integration.

After an certain UI action has been performed, you can intercept the crawling task and manually execute any UI operation. After you are done, you can resume the crawling automation process.

```js
/**
 * Method to perform action for the current platform, invoked when the action is going to perform
 * @Params: action the action which belongs to current active node, user can determine the priority of action execution
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.onActionPerformed = async function(action, crawler) {
  // password input
  if (action.name == "Enter your MPIN") {

    // here hook provides API for click/type/drag.
    await this.click({'method':'xpath', 'xpath':'${xpath of element}'});
    await this.type({'method':'xpath', 'xpath':'${xpath of element}', 'value': '2580'});

  }
};
```

Read the following chapters to know [how to setup](/guide/quick-start.md) then [you can start on different platforms](/guide/cross-platform.md) and [further customization](/guide/hooks.md) to fullfil your own desired crawling behaviour.

### Demos

Execution Examples of NoSmoke OCR.

| App  | Platform  | Device Type |  Report |  Configuration  |
| :--- | :---  |  :---  | :--- | :--- |
| Macaca Demo  | iOS  | Simulator   | [link](https://upbeat-shannon-0947ed.netlify.com/reports/2018-12-28-13-50-36-report.html#mode=image)  |   [configuration](https://upbeat-shannon-0947ed.netlify.com/crawler.config-ios.yml) [cmd](https://upbeat-shannon-0947ed.netlify.com/run-ios.yml) |
| Macaca Demo  | Android  | Simulator  | [link](https://upbeat-shannon-0947ed.netlify.com/reports/2018-12-28-14-4-26-report.html#mode=image)  |   [configuration](https://upbeat-shannon-0947ed.netlify.com/crawler.config-android.yml) [cmd](https://upbeat-shannon-0947ed.netlify.com/run-android.yml) |
| Dash-iOS  | iOS  |  Simulator  | [link](https://compassionate-mclean-9beb64.netlify.com/reports/2018-12-28-14-40-38-report.html#mode=image)  |   [configuration](https://compassionate-mclean-9beb64.netlify.com/crawler.config-ios.yml) [cmd](https://compassionate-mclean-9beb64.netlify.com/run-ios.yml) |
| YouDao-Dict   | Android  |  Device  | [link](https://compassionate-mclean-9beb64.netlify.com/reports/2018-12-28-14-52-24-report.html#mode=image)  |   [configuration](https://compassionate-mclean-9beb64.netlify.com/crawler.config-android.yml) [cmd](https://upbeat-shannon-0947ed.netlify.com/run-android.yml) |

### License

The MIT License \(MIT\)
