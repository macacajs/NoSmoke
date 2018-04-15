# NoSmoke Cookbook

NoSmoke is a cross platform UI crawler which scans view trees then generate and execute UI test cases.  Used for smoke testing under continuous integration. Following [WDA](https://www.w3.org/TR/webdriver/) protocol and utilizes

## 1. Advantages of NoSmoke:

With it you can:

* [x] Conduct** automated UI test** with **simple configuration** and **minimum testing scripts** manually created.

* [x] **More accurate than monkey test**, because it analysis the view tree and transform it into data model before take UI action. And for each action performed, **UI assertion** is supported for providing fundamental UI display test.

* [x] One tool and configuration, **multiple platforms - iOS, Android and Web** !! :\]

* [x] Integrate into your **continuous integration environment **for your server side for smoking test.

* [x] **Visualize \(automation\) testing result** and validate the testing history via [Macaca-Reporter](https://github.com/macacajs/macaca-reporter)

## 2. How it works?

In order to design a multiplatform UI automation tool, the overall architcture is devided into 3 different layers.

* The **Proxy **layer, which are tester drivers wrapping local platform testing tool like UIAutomator, XCUITest. They establishes sockets which recieve and executes requests in format of [web driver](https://www.w3.org/TR/webdriver/) protocol.

* The **Macaca-Server **layer, which are node server created on PC. It provides a set of cli-command based on which users can install the testing app and init the proxy on a specific device. Further it routes http request to proxies in various platforms.

* The **NoSmoke **layer, it contains a node client which posting various crawling and analysis commands to **Macaca-Server **layer. The crawling algorithm in this module utilizes the node client to fetch window sources and convert it to a DFS tree model, then eventually send out a UI action to the target app via **macaca-server **and **proxy**.

![](/assets/macaca-architecture.png)

## 3.  List of features

### a. Muliplatform

NoSmoke supports UI crawling and testing for **iOS**, **Android** and **PC Web**, [macaca-reporter](https://github.com/macacajs/macaca-reporter) is used to gather and present the crawling process. During the execution of nosmoke, the crawling history will be recorded and stored in a report which you can view later. \(View Tree is sourced from [d3-tree](https://github.com/xudafeng/d3-tree), a [d3.js](https://d3js.org/) based visualization library\)

![](/assets/report-navigation-panel.png)![](/assets/tree.png)![](/assets/suite-case-trigger.png)

### b. Configurable

Refer to the crawler.config.yml file in the NoSmoke/public folder as a example. You can choose which platform to conduct the crawling task:

```ruby
desiredCapabilities:
    platformName: 'iOS'
    deviceName: 'iPhone 6 Plus'
    app: 'https://npmcdn.com/ios-app-bootstrap@latest/build/ios-app-bootstrap.zip'
```

And the corresponding configuration for crawling the app:

```ruby
crawlingConfig:
  platform: 'ios'   // platforms to run: android, ios, pc-web
  packages:         // scope of android packages where NoSmoke is allowed to crawl, execeeding which the process will terminate
  testingPeriod:    // maximun testing period for a crawling task, after which the task will terminate
  testingDepth :    // maximum testing depth of the UI window tree, exeeding which 'Back' navigation will be triggered
  newCommandTimeout:// time interval takes to examine current window source after a crawling UI action has been performed
  launchTimeout:    // time interval to wait after app has been launched.
  maxActionPerPage: // max UI actions filtered and performed perpage, this will provide greate memory optimization and prevent an Page for staying too long   
  targetElements:   // array of hight priority UI element to perform
  asserts:          // provide for regex assert test cases for windows
  exclusivePattern: // specify the pattern hence you can let those element which contain the regex pattern be excluded from exection
  clickTypes:       // specify the types of UI element which can handle click events
  editTypes:        // specify the types of UI element which can handle edit events
  horizontalScrollTypes: // specify the types of UI element which can handle horizontal scroll
  tabBarTypes:      // specify the types of UI element may act as a control widget in master-detail pattern
  exclusiveTypes:   // specify the types of UI element in which all the sub-views will be exclueded from scanning and crawl
```

### c. Hookable

There are several hook api provided to provide further space to realize your own customization.  
You can intercept the 'performAction' function which is called everytime a UI action is executing,  
you can return your own promise object to replace the existing default performAction method.

```js
/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node, and is going to be performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: your own promise to indicate that the performAction method has been fully customized
 * */
Hooks.prototype.performAction = function(action, crawler) {
      return new Promise((resolve, reject) => {
          ... execute your async tasks here ... and then call resolve to continue the framework's crawling process
      });
};
```

After an certain UI action has been performed, you can intercept the crawling task and manually execute any UI operation. After you are done, you can resume the crawling automation process.

```js
/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: a Promise to indicate the action has been handled and otherwise the default logic will bypass it
 * */
Hooks.prototype.afterActionPerformed = function(action, crawler) {
  // Customize this action to wire through sliding view
  if ("verify whether to intercept the process and conduct manual operation") {
    return new Promise((resolve, reject) => {
      ... create a async task execute and call resolve, then the crawling process will continue
    });
  } else {
    return null;
  }
};
```

Read the following chapters to know [how to setup](/0. Setup.md) , [experimenting on different platforms](/1.  configuration-templates.md) and [further customize](/4. writing-your-hooks.md) your own desired crawling behaviour.

### License

The MIT License \(MIT\)

