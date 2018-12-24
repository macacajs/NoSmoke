# NoSmoke 2.0 Cookbook

NoSmoke 是一款基于source-XML-tree/OCR 为基础的多端UI自动化测试框架，服务于持续集成环境中的冒烟测试 并尊从[WDA 规范](https://www.w3.org/TR/webdriver/). 本文档介绍NoSmoke 2.0 的使用方式.

## 1. NoSmoke 的优势:

NoSmoke 提供一下能力:

* [x] 以 **最轻便的配置能力** 以及 **最简化的脚本** 执行 **自动化UI测试**.

* [x] **基于深度遍历算法** 精确定位测试UI元素， 提供 **高于猴子测试的测试精度**.

* [x] 支持多端运行： **iOS, Android** !! :\]

* [x] **测试结果可视化**  [Macaca-Reporter](https://github.com/macacajs/macaca-reporter).

## 2. 工作原理介绍

### 自 NoSmoke 1.0

从 NoSmoke 1.0 起， 爬虫程序通过客户端本地SDK驱动，获取UI source tree 信息，并识别操作点.

### 自 NoSmoke 2.0

从 NoSmoke 2.0 起， 爬虫程序通过OCR 扫描客户端App 窗口图片对可操作点进行分析，规避了大量的xml 计算成本，从而提升效率.

![](./assets/macaca-architecture-2.0.png)

### 版本差异一览:

| 指标    | 版本 1.0   |  版本 2.0
|-              | -           | -
| 支持平台  | Android iOS Web  |  Android iOS  |
| 可配置项  |  14 配置  |  4 项简化配置
| 拦截钩子  |  5 个  |     1 个并简化
| 钩子实现  | 无API，需要用户实现restful 指令  |  封装API 提供点击/输入/拖拽能力 |
| 迭代长度  | 12 秒/轮 | 5 秒/轮 |
| 稳定评分  | 0.6  |  0.95  |
| 模块依赖  |  Macaca Drivers  | Macaca/Appium Drivers (基础层可选) |

## 3. 功能表

### a. 多端

NoSmoke 支持多端UI测试： **iOS**, **Android**, 爬行记录通过 [macaca-reporter](https://github.com/macacajs/macaca-reporter) 进行展示.

![](./assets/new_report_layout.png)

### b. 可配置

参考以下配置文件. 可选择对应的iOS/android OS 类型，安装包/packageId/bundleId 以及该次执行时的其他配置信息.

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

### c. 钩子

NoSmoke 2.0 减少了钩子的数量，从而进一步降低了接入以及理解成本. 在每一次动作执行后，以下钩子接口会触发，用户可检查当前执行的动作信息，并决定是否进行干预.

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

阅读后续篇章以便了解 [如何快速开始](/guide/quick-start.md) 以及 [各个平台的配置方法](/guide/cross-platform.md) 并且懂得 [如何进一步通过勾子进行定制](/guide/hooks.md).

### 案例展示
TBD

### License

The MIT License \(MIT\)
