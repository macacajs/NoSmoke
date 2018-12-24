# Cross Platform

If you simply want to verify how NoSmoke works, there is a fast way to do it. Copy the following sections of code and save it as a .yml file.  Run your code with the instruction given [previously](/guide/quick-start.md) .  You will see how the NoSmoke app-crawler performs on [Macaca Demos ](https://github.com/macaca-sample)

### **Configuration For iOS**
For iOS, instead of using `app` param, you can specify bundleID as well, like:
`bundleId: '${your-package-name}'`

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

### **Configuration For Android**
For Android, instead of using `app` param, you can specify package as well, like:
`package: '${name-of-package}'` . You may get the list of package names installed on android device like: `adb shell 'pm list packages -f'`

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
