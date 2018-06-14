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
[中文版](README.zh.md)

---

A cross platform UI crawler which scans view trees then generate and execute UI test cases. For full set of documentation, please refer to:
[wiki](https://github.com/macacajs/NoSmoke/wiki)

## 1. Advantages of NoSmoke:

With it you can:

* [x] **Automated UI test** with simple configuration
* [x] **More accurate than monkey test** with view tree crawling
* [x] **Multiple platforms** iOS, Android and Web !! :\]
* [x] **Testing result visualisation** via [Macaca-Reporter](https://github.com/macacajs/macaca-reporter)

## 2. How it works?

In order to design a multiplatform UI automation tool, the overall architcture is devided into 3 different layers.

* The **Proxy** layer, which are tester drivers wrapping local platform testing tool like UIAutomator, XCUITest. They establishes sockets which recieve and executes requests in format of [web driver](https://www.w3.org/TR/webdriver/) protocol.
* The **Macaca-Server** layer, which are node server created on PC. It provides a set of cli-command based on which users can install the testing app and init the proxy on a specific device. Further it routes http request to proxies in various platforms.
* The **NoSmoke** layer, it contains a node client which posting various crawling and analysis commands to **Macaca-Server** layer. The crawling algorithm in this module utilizes the node client to fetch window sources and convert it to a DFS tree model, then eventually send out a UI action to the target app via **macaca-server** and **proxy**.

![](https://raw.githubusercontent.com/wiki/macacajs/NoSmoke/assets/macaca-architecture.png)

## 3. Why the name?

Since all the good ones are taken, `NoSmoke` comes from the ideas across `smoke testing`, but smoke is not good for health ...

## 4. Features

### 4.1 Muliplatform

NoSmoke supports UI crawling and testing for **iOS**, **Android** and **PC Web**, [macaca-reporter](//github.com/macacajs/macaca-reporter) is used to gather and present the crawling process. During the execution of nosmoke, the current page and relevent action info will be revealed on reporter:

#### For Android

![macaca-android](https://user-images.githubusercontent.com/8198256/31303578-988f5db2-ab42-11e7-8b96-52175fe4ba92.gif)

#### For iOS

![macaca-ios](https://user-images.githubusercontent.com/8198256/31303576-98897564-ab42-11e7-9a12-36e5aaf5161d.gif)

#### For PC-Web

![web-pc](https://user-images.githubusercontent.com/8198256/31303577-988df9c2-ab42-11e7-8c60-1bd456cedddd.gif)

### 4.2 Configurable
Confirguration params and configuration templates for android/iOS/web demos
[templates](https://github.com/macacajs/NoSmoke/wiki/configuration-templates)
[list of configuration](https://github.com/macacajs/NoSmoke/wiki/configuration-parameters)

### 4.3 Hooks

There are several hook API provided to provide further space to realize your own customization.
[hooks reference](https://github.com/macacajs/NoSmoke/wiki/hook-templates)

## 5. Setup

### 5.1. Requirements:

* iOS simulator 11.0 and xcode 9.0 and above.
* Android 6.0 and above, supporting both device and simulator. For real device testing please install null-keyboard

**Note** You could also check environment by `macaca doctor`:

```bash
$ npm i macaca-cli -g
$ macaca doctor
```

### 5.2. Setup & Run:

##### **Step 1.** Setup:

Full list of dependencies:

```bash
$ npm i macaca-android -g
$ npm i macaca-ios -g
$ npm i macaca-cli -g
$ npm i macaca-electron -g
```

Install nosmoke in a single line:

```bash
$ npm i nosmoke -g
```

##### **Step 2.** Run it:

In your workspace directory, execute the following command

```bash

# initialize macaca server
macaca server --verbose &

# initialize nosmoke
nosmoke
```

**Note:** For full set of command please check: `nosmoke --help` <br/>
**Note:** Invoking nosmoke itself will simply run the default demo application. To run your own application, you should put -h \(setup hooks ,optional\) and -c \(the path of the configuration file is a must\) in order to run the crawler

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars0.githubusercontent.com/u/8198256?v=4" width="100px;"/><br/><sub><b>SamuelZhaoY</b></sub>](https://github.com/SamuelZhaoY)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/26514264?v=4" width="100px;"/><br/><sub><b>butterflyingdog</b></sub>](https://github.com/butterflyingdog)<br/>
| :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Thu Jun 14 2018 12:15:53 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
