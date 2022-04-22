# NoSmoke 2.0

[![NPM version][npm-image]][npm-url]
[![CI][CI-image]][CI-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/nosmoke.svg
[npm-url]: https://npmjs.org/package/nosmoke
[CI-image]: https://github.com/macacajs/NoSmoke/actions/workflows/ci.yml/badge.svg
[CI-url]: https://github.com/macacajs/NoSmoke/actions/workflows/ci.yml
[coveralls-image]: https://img.shields.io/coveralls/macacajs/NoSmoke.svg
[coveralls-url]: https://coveralls.io/r/macacajs/NoSmoke?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/nosmoke.svg
[download-url]: https://npmjs.org/package/nosmoke
[中文版](README.zh.md)

---

A cross platform UI crawler which generate and execute UI test cases. [Docs](https://macacajs.github.io/NoSmoke/guide/).

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/8198256?v=4" width="100px;"/><br/><sub><b>SamuelZhaoY</b></sub>](https://github.com/SamuelZhaoY)<br/>|[<img src="https://avatars.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars.githubusercontent.com/u/26514264?v=4" width="100px;"/><br/><sub><b>butterflyingdog</b></sub>](https://github.com/butterflyingdog)<br/>|[<img src="https://avatars.githubusercontent.com/u/1380777?v=4" width="100px;"/><br/><sub><b>wusphinx</b></sub>](https://github.com/wusphinx)<br/>|[<img src="https://avatars.githubusercontent.com/u/11460601?v=4" width="100px;"/><br/><sub><b>zivyangll</b></sub>](https://github.com/zivyangll)<br/>|[<img src="https://avatars.githubusercontent.com/u/31232146?v=4" width="100px;"/><br/><sub><b>wanglipeng8</b></sub>](https://github.com/wanglipeng8)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/52845048?v=4" width="100px;"/><br/><sub><b>snapre</b></sub>](https://github.com/snapre)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Wed Mar 16 2022 14:57:38 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## 1. Advantages:

* ✅ automated ui tests with light configuration
* ✅ high accuracy
* ✅ cross-platform: android & ios
* ✅ testing result visualization

## 2. Why the name?

Since all the good ones are taken, `NoSmoke` comes from the ideas across `smoke testing`, but smoke is not good for health ...

## 3. How it works

![macaca-ios](https://user-images.githubusercontent.com/8198256/31303576-98897564-ab42-11e7-9a12-36e5aaf5161d.gif)

## 4. Quick Start

Ensure [tesseract](https://github.com/tesseract-ocr/tesseract) and macaca drivers have been properly installed and then install nosmoke:

```bash
$ npm i nosmoke -g
```

and then run:

```bash
$ macaca server --verbose &
$ nosmoke
```

## License

The MIT License (MIT)
