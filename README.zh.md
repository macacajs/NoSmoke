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
[English](README.md)

---

一款跨平台的UI 自动化遍历测试工具，全套文档请见 [wiki](https://github.com/macacajs/NoSmoke/wiki)

## 1. NoSmoke 的优势:

* [x] **自动化UI 遍历** 成本低廉
* [x] **高精度测试** DFS 算法
* [x] **跨平台支持** iOS，安卓，以及PC Web!! :\]
* [x] **测试结果可视化** 见 [Macaca-Reporter](https://github.com/macacajs/macaca-reporter)

## 2. How it works?

In order to design a multiplatform UI automation tool, the overall architcture is devided into 3 different layers.

* The **Proxy** layer, which are tester drivers wrapping local platform testing tool like UIAutomator, XCUITest. They establishes sockets which recieve and executes requests in format of [web driver](https://www.w3.org/TR/webdriver/) protocol.
* The **Macaca-Server** layer, which are node server created on PC. It provides a set of cli-command based on which users can install the testing app and init the proxy on a specific device. Further it routes http request to proxies in various platforms.
* The **NoSmoke** layer, it contains a node client which posting various crawling and analysis commands to **Macaca-Server** layer. The crawling algorithm in this module utilizes the node client to fetch window sources and convert it to a DFS tree model, then eventually send out a UI action to the target app via **macaca-server** and **proxy**.

![](https://raw.githubusercontent.com/wiki/macacajs/NoSmoke/assets/macaca-architecture.png)

## 3. Why the name?

Since all the good ones are taken, `NoSmoke` comes from the ideas across `smoke testing`, but smoke is not good for health ...

## 4. 功能

### 4.1 跨平台

同时支持 **iOS**, **Android** and **PC Web**, [macaca-reporter](//github.com/macacajs/macaca-reporter) 的测试， 测试结果可通过macaca-reporter 收集

#### For Android

![macaca-android](https://user-images.githubusercontent.com/8198256/31303578-988f5db2-ab42-11e7-8b96-52175fe4ba92.gif)

#### For iOS

![macaca-ios](https://user-images.githubusercontent.com/8198256/31303576-98897564-ab42-11e7-9a12-36e5aaf5161d.gif)

#### For PC-Web

![web-pc](https://user-images.githubusercontent.com/8198256/31303577-988df9c2-ab42-11e7-8c60-1bd456cedddd.gif)

### 4.2 可配置

配置能力可见 [这里](https://github.com/macacajs/NoSmoke/wiki)， 同时提供各个平台运行的[模版](https://github.com/macacajs/NoSmoke/wiki/configuration-templates)

### 4.3 可插庄

插庄说明以及模版见 [这里](https://github.com/macacajs/NoSmoke/wiki/hook-templates)

## 5. 设置

### 5.1. 依赖声明:

* iOS simulator 11.0 and xcode 9.0 and above.
* Android 6.0 and above, supporting both device and simulator. For real device testing please install null-keyboard

**Note** 可在5.2 后执行一下命令检查依赖是否正确安装:

```bash
$ npm i macaca-cli -g
$ macaca doctor
```

### 5.2. 运行:

##### **Step 1.** 安装:

所有依赖的安装:

```bash
$ npm i macaca-android -g
$ npm i macaca-ios -g
$ npm i macaca-cli -g
$ npm i macaca-electron -g
```

一键安装nosmoke:

```bash
$ npm i nosmoke -g
```

##### **Step 2.** 运行:

在工作路径，运行一下指令

```bash

# initialize macaca server
macaca server --verbose &

# initialize nosmoke
nosmoke
```

**Note:** nosmoke 提供了详细的运行参数说明，请见: `nosmoke --help`
**Note:** 单独执行nosmoke 不带其他参数只会启动默认的demo app， 运行特定的app 需要提供配置文件， nosmoke -c '配置文件地址'

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars0.githubusercontent.com/u/8198256?v=4" width="100px;"/><br/><sub><b>SamuelZhaoY</b></sub>](https://github.com/SamuelZhaoY)<br/>
| :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Sat Apr 21 2018 11:05:32 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
