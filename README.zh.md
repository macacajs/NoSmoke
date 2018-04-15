# NoSmoke

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/nosmoke.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nosmoke
[travis-image]: https://img.shields.io/travis/macacajs/NoSmoke.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/NoSmoke
[coveralls-image]: https://img.shields.io/coveralls/macacajs/NoSmoke.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/NoSmoke?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/nosmoke.svg?style=flat-square
[download-url]: https://npmjs.org/package/nosmoke

---

NoSmoke 是跨平台 UI 自动遍历工具，能够自动生成并执行 UI 测试用例。

[English Edition](README.md)

使用 NoSmoke 有如下好处：

- 自动生成用例，不需编写UI 测试脚本！
- 比传统的 Monkey Test 工具更精确！
- 一套工具，支持多个终端平台!

## 运行原理

![image](https://user-images.githubusercontent.com/8198256/31303704-aa26c68a-ab44-11e7-9346-02db403edc48.png)

延续 Macaca 工具体系的特点，跨平台的 NoSmoke 整体架构分为三层。

- **通信代理层** 代理层通过对终端原生测试技术栈进行统一实现并对外围暴露标准服务，遵从 [W3C webdriver 标准](//www.w3.org/TR/webdriver/)。

- **Macaca Server 层** 是 Node.js 的 Server 服务，运行在宿主机上，并提供各平台的驱动模块。Server 层会直接与代理层进行通信。

- **NoSmoke 工具层** NoSmoke 会与 Macaca Server 层进行通信和交互，NoSmoke 会将遍历过程抽象为算法，并结合用户端的配置和扩展。

## 名字由来

`NoSmoke` 引申自软件测试概念中的冒烟测试 `smoke testing`。

## 特性

### a. 跨平台

NoSmoke supports UI crawling and testing for **iOS**, **Android** and **PC Web**, [macaca-reporter](//github.com/macacajs/macaca-reporter) is used to gather and present the crawling process. During the execution of nosmoke, the current page and relevent action info will be revealed on reporter:

#### Android 端

![macaca-android](https://user-images.githubusercontent.com/8198256/31303578-988f5db2-ab42-11e7-8b96-52175fe4ba92.gif)

#### iOS 端

![macaca-ios](https://user-images.githubusercontent.com/8198256/31303576-98897564-ab42-11e7-9a12-36e5aaf5161d.gif)

#### 桌面浏览器

![web-pc](https://user-images.githubusercontent.com/8198256/31303577-988df9c2-ab42-11e7-8c60-1bd456cedddd.gif)

### b. 配置

配置项可以参考工程 `public` 目录的 `crawler.config.yml` 文件。首先你要选择遍历爬虫任务运行的平台类型：

```
desiredCapabilities:
  platformName: 'iOS'
    deviceName: 'iPhone 6 Plus'
 	  app: 'https://npmcdn.com/ios-app-bootstrap@latest/build/ios-app-bootstrap.zip'
```

和遍历器在应用端运行的相应配置：

```
crawlingConfig:
    platform: 'ios'   // platforms to run: android, ios, pc-web
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

### c. 扩展接口

NoSmoke 提供了若干扩展点便于使用者能够方便地定制。
通过可以覆盖 `performAction` 方法，来定制每次 UI 执行

```
/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node, and is going to be performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: your own promise to indicate that the performAction method has been fully customized
 * */
Hooks.prototype.performAction = (action, crawler) => {
  return new Promise((resolve, reject) => {
    ... execute your async tasks here
    ... and then call resolve to continue the framework's crawling process
  });
};

```

`afterActionPerformed` 是生命周期的下一个方法，能够在 UI 操作后做一些定制。

```
/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: a promise to indicate the action has been handled and other wise the default logic will bypass it
 * */
Hooks.prototype.afterActionPerformed = function(action, crawler) {
  // Customize this action to wire through sliding view
  if ("verify whether to intercept the process and conduct manual opperation") {
    return new Promise(resolve, reject) => {
      ... execute your async tasks here
      ... and then call resolve to continue the framework's crawling process
    };
  } else {
    return null;
  }
};
```

## 快速上手

### 1. 依赖环境：

* Xcode 9.0 及以上版本。
* Android 6.0 以上版本，同时支持模拟器和真机。Android 真机请安装 `null-keyboard`

**注意** 如果你熟悉 Macaca 命令行工具，可以通过 Doctor 进行检查环境是否有问题：

```bash
$ npm i macaca-cli -g
$ macaca doctor
```

### 2. 安装运行：

##### **第一步** 安装驱动 - 请通过 npm 安装 Macaca 依赖的驱动模块：

```bash
$ npm i macaca-android -g
$ npm i macaca-ios -g
$ npm i macaca-cli -g
$ npm i macaca-electron -g
```

##### **第二步** 运行 NoSmoke - 你可以通过如下几种方式运行：

**方式一** 请通过 npm 安装 NoSmoke 命令行工具

```bash
$ npm i nosmoke -g
```

在终端启动 Macaca Server：

```bash
$ macaca server --verbose
```

然后进入项目路径，执行如下命令：

```bash
$ nosmoke -h path-of-your-hook.js -c path-of-your-config.yml
```

通过 `--help` 命令可以看到全部命令行配置：

```bash
$ nosmoke --help
```

```
nosmoke --help

  Usage: nosmoke [options]

  Options:

    -p, --port <d>    port to use (5678 default)
    -u, --udid <s>    udid of device
    -h, --hooks <s>   location of the hook.js file
    -c, --config <s>  location of the configuration file
    -s, --silent      start without opening reporter
    --verbose         show more debugging information
    -v, --versions    output version infomation
    -h, --help        output usage information
```

**方式二**: 通过源码方式运行

```bash
$ git clone git@github.com:macacajs/NoSmoke.git --depth=1
```

在终端启动 Macaca Server：

```bash
$ macaca server --verbose
```

然后进入项目路径，执行如下命令：

```bash
$ nosmoke -h path-of-your-hook.js -c path-of-your-config.yml
```

**注意：** `-h` 是可选项而 `-c` \(配置文件的路径\) 是必须要传入的

**方式三**： Android 平台支持在 Docker 容器内运行

```bash
$ docker run  --privileged -v  nosmoke-reporter:/root/reports --name nosmoke-1 -p 5037:5037 -it macacajs/nosmoke-android:1.0.0
```

Docker 只是为工具运行时提供了一体化环境，你还可以传入配置文件，hook 文件，设备
id。

注意：Docker 运行方式需要连接真机，而且需要保证 ADB 在 Dokcer 环境里有读写权限，否则会出现下面的错误：

```
Error: Command failed: /opt/android-sdk-linux/platform-tools/adb -s 4fea3345 forward tcp:9001 tcp:9001
  error: device unauthorized.
  This adb server's $ADB_VENDOR_KEYS is not set
  Try 'adb kill-server' if that seems wrong.
  Otherwise check for a confirmation dialog on your device.
```

### 3. 运行结果

NoSmoke 运行的过程中会开启 `macaca-reporter` 并实时显示遍历进度和通过率，如果选择了模拟器等配置，在启动前会稍微等几十秒。启动成功后，`macaca-reporter` 的显示界面将会发生变化。

如果遇到使用上的问题请 [提 issue](//github.com/macacajs/NoSmoke/issues)

## License

The MIT License (MIT)
