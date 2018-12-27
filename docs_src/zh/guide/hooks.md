# 钩子

### 1. **为什么我们需要:**

虽然 [配置文件](/zh/guide/configuration.md) 提供了完整的定制化爬虫的方法，但在一些场合下，依然会有一些特殊的交互需要更加直接的操作方式来进行干预，比如：

* case 1: 当App 安装，完成首次登陆的滑动式欢迎页面.
* case 2: 在App 进行爬行过程中，需要进入特定入口完成一系列操作后对XX 场景进行识别.

### 2. 触发点:

钩子提供了在每一次爬虫完成操作以后，用户进行干预，选择自己手动进行元素操作的窗口.

![](/NoSmoke/assets/nosmoke-hook-2.0.png)

### 3. 钩子API

以下是钩子API 拦截点的详细说明:

#### 3.1 onActionPerformed

```js
/**
 * Method to perform action for the current platform, invoked when the action is going to perform
 * @Params: action the action which belongs to current active node, user can determine the priority of action execution
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.onActionPerformed = async function(action, crawler) {
  // password input
  if (action.name == "Enter your MPIN") {
  }
};
```

### 4. 编写你的钩子

参考以下方法了解在`onActionPerform` 钩子当中，可以执行的已经完成封装的指令， 它们是: 'click', 'type', 'drag'

```js

/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node, user can determine the priority of action execution
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.onActionPerformed = async function(action, crawler) {
  // password input
  if (action.name == "please input password") {

    // example of type input to a xpath element, you need to use app-inspector to get the correct xpath value
    await this.type({'method':'xpath', 'xpath':'//*[@resource-id="com.github.android_app_bootstrap:id/mobileNoEditText"]', 'value': '中文+Test+12345678'});
    await this.type({'method':'xpath', 'xpath':'//*[@resource-id="com.github.android_app_bootstrap:id/codeEditText"]', 'value': '1111111'});

    // example of trigger click events
    await this.click({'method':'xpath', 'xpath':'//*[@resource-id="com.github.android_app_bootstrap:id/login_button"]'});

    // example of trigger drag
    await this.drag({'location': {'fromX': 100, 'fromY': 100, 'toX': 200, 'toY': 200}, 'duration': 2.0});

    // wait for 2 second
    await this.sleep(2000);
  }
};

```

