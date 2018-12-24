# 快速开始

### 1. 要求:

* iOS 模拟器 11.0 以及 xcode 10.0 或以上.
* Android 6.0 或以上, 支持设备以及模拟器. 对于设备，请确认使用了null keyboard 等类似的虚拟键盘工具去除键盘展示.
* 由于目前Tesseract 的OCR 依赖，目前建议使用mac os. (后续会进一步优化).
* 确保Tesseract 在本地环境完成正确安装: `brew install tesseract --all-languages`.

### 2. 设置 & 运行:

##### **第一步.** 安装NoSmoke相关依赖

```
npm i macaca-android -g
npm i macaca-ios -g
npm i macaca-cli -g
npm i macaca-electron -g
```

##### **第二步.** 安装NoSmoke

npm命令行安装NoSmoke.

```
npm i nosmoke -g
```

在命令行中启动macaca 服务:  `macaca server --verbose`


并执行以下命令

```
nosmoke -h path-of-your-hook.js -c path-of-your-config.yml
```

为使用全套指令，可在命令行中输入帮助指令:

```
nosmoke --help

  Usage: nosmoke [options]

  Options:

    -p, --port <d>    port to use (5678 default)
    -u, --udid <s>    udid of device
    -h, --hooks <s>   location of the hook.js file
    -c, --config <s>  location of the configuration file
    -s, --silent      start without opening browser
    --verbose         show more debugging information
    -v, --versions    output version infomation
    -h, --help        output usage information
```

### 3. 执行效果:

当NoSmoke开始稳定运行, 在不使用 `-s` (静默运行)的模式下，游览器会自动打开报告，模拟器/真机上的爬虫会打开目标应用，并开始执行, 报告会开始自动同步爬行进度.

如有发现任何问题，欢迎[提交问题](https://github.com/macacajs/NoSmoke/issues).
