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
[node-image]: https://img.shields.io/badge/node.js-%3E=_7-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/nosmoke.svg?style=flat-square
[download-url]: https://npmjs.org/package/nosmoke

> A cross platform UI crawler which scans view trees then generate and execute UI test cases. with it you can:
- conduct automated UI test without writing a single UI test scripts!!
- more accurate than mokey test!!
- one tool and configuration, multiple platform!

## Features
### a. Muliplatform
NoSmoke supports UI crawling and testing for **iOS**, **Android** and **PC Web**, [macaca-reporter](https://github.com/macacajs/macaca-reporter) is used to gather and present the crawling process. During the execution of nosmoke, the current page and relevent action info will be revealed on reporter:

#### Running on android 
![macaca-android](https://user-images.githubusercontent.com/8198256/31303578-988f5db2-ab42-11e7-8b96-52175fe4ba92.gif)

#### Running on iOS
![macaca-ios](https://user-images.githubusercontent.com/8198256/31303576-98897564-ab42-11e7-9a12-36e5aaf5161d.gif)

#### Running on web-pc
![web-pc](https://user-images.githubusercontent.com/8198256/31303577-988df9c2-ab42-11e7-8c60-1bd456cedddd.gif)

### b. Configurable 
Refer to the crawler.config.yml file in the NoSmoke/public folder as a example. The structure of the configuration file can be described as below:

```
# 1. Initialization option
desiredCapabilities:
  platformName: 'platform iOS/Android'
  deviceName: 'name of the device'
  app: 'url for downloading app here'

# 2. Crawling option
crawlingConfig:
  platform: 'iOS'
  targetElements:
    loginAccount:
      actionType  : 'action type: 1-click; 2-input'
      searchValue : 'the value to search'
      actionValue : 'the value to input'
  exclusivePattern: 'pushView/popView'
  clickTypes: 
    - 'array of clickable UI types: StaticText/Button'
  editTypes:
    - 'array of editable UI types: SecureTextField/TextFiled'
  horizontalScrollTypes:
    - 'array of horizontal scrollable UI types: PageIndicator'
  verticalScrollTypes:
    - 'array of vertical scrollable UI types: ScrollView'
  tabBarTypes:
    - 'array of control widget which behaves like a master in the 
    master-detail view structures: TabBar'
  exclusiveTypes:
    - 'array of disabled and esclusive UI types: NavigationBar'
  navigationBackKeyword:
    - 'array of words on which items should be regarded 
    as a back button: back'
```

### c. Customizable Hooks
Different applications provides various design of UI layers. Hence it becomes extremely difficult to provide a generic crawling algorithm which can suites into all scenarios, especially when it is also required to support multiplatform crawlings. Hence a series of hooks are provided to provide further customizablility. 

## Install & Run
Since current project is still under development, you can run the following command to see current crawling implementation.

a. Open the terminal and initialize macaca server `macaca server --verbose`

b. Execute npm command in the project dir `npm run dev`

When the npm program starts to execute and browser opens macaca-reporter. In case the reporter fails to refresh, after crawling process intializes, manualy refresh the reported page.

## License

The MIT License (MIT)
