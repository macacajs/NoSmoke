# 持续集成

本文在快速启动，以及配置项，钩子等内容基础上，介绍在CI 环境中完成相关配置部署的一些tips.

### 运行前准备

在运行前，可检查macaca 以及 nosmoke 将要执行的端口上是否已有相关程序，可执行以下指令将对应程序进行清理

```bash
lsof -i :${process-port-which-you-need-to-close} | awk '{print $2}' | tail -1 | xargs kill -9
```

### 运行安卓

在运行安卓前，先唤起macaca 服务.

```bash

macaca server --verbose -p 3554 &

```

接着执行对应的nosmoke 指令开始nosmoke 运行.

```bash
nosmoke -s -c ${path-of-file}/crawler.config-android.yml \
        -h ${path-of-file}/hooks-android.js \
        --server http://localhost:3554 \
        -p 3564

```

### 运行iOS

在运行iOS前，先唤起macaca 服务.
```bash
macaca server --verbose -p 3684 &
```

接着执行对应的nosmoke 指令开始nosmoke 运行.

```bash
xcrun simctl launch booted com.apple.springboard
xcrun simctl terminate booted com.apple.test.XCTestWDUITests-Runner
xcrun simctl terminate booted ${your-bundle-id}.-   # bundle id of your current app.

sleep 2

nosmoke   -s --server http://localhost:3684  \
          -h ${path-of-file}/hooks-ios.js \
          -c ${path-of-file}/crawler.config-ios.yml \
          -p 3694

```

在以上指令执行后，该执行路径下会生成对应的reports 路径，可点击并查看运行报告.

![](/NoSmoke/assets/generated_output.png)

