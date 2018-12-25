# 跨平台支持

拷贝以下任何一段平台的代码， 按照[快速开始](/zh/guide/quick-start.md) 中的指令运行.

### **iOS Demo 配置**
对于iOS, 用户可以选择声明 `app` 参数指明安装包路径或者 `bundleId` 参数
`bundleId: '${your-package-name}'` 指明启动已经安装了的App.

```py
---
# 1. Initialisation option
desiredCapabilities:
  platformName: 'iOS'
  deviceName: 'iPhone 6 Plus'
  app: 'https://npmcdn.com/ios-app-bootstrap@latest/build/ios-app-bootstrap.zip'

# 2. Crawling option
crawlingConfig:
  strategy: 'ocr'
  platform: 'ios'
  triggers:
    - 'please input password'
...
```

### **Android Demo 配置**
对于Android, 用户可选择 `app` 参数声明安装包路径, 或者声明启动已经在本地安装的package 名称:
`package: '${name-of-package}'` . 用户可执行以下命令获取设备上已安装的package 列表  `adb shell 'pm list packages -f'`

```py
---
# 1. Initialisation option
desiredCapabilities:
  platformName: 'android'
  autoAcceptAlerts: false
  app: 'https://npmcdn.com/android-app-bootstrap@latest/android_app_bootstrap/build/outputs/apk/android_app_bootstrap-debug.apk'

# 2. Crawling option
crawlingConfig:
  strategy: 'ocr'
  platform: 'android'
  triggers:
    - 'please input password'
...
```
