# Hooks

### 1. **Why do we need it:**

Even though the configuration file's [parameters](/guide/configuration.md)  provides comprehensive ways of customizing the crawling behavior for your target app, there may be some tricky scenes that you need a more direct control on the crawling process. For example:

* case 1: if your app contains a login page and after the first time you login you have to slide down until end of an agreement and tick a check box and then click the confirm button before you can enter the home panel of your app.  You may have to write a complicated list of specific actions in your configuration parameter to perform these series of behavior.

* case 2: during the middle of crawling, if you want to test a very specific section of your app which is embedded inside of deep layers of  activities/view controllers, it will also be like hell if you can only make it via a set of actions in configuration file.

### 2. Trigger points:

Hooks provides a direct way for user to take full control of the crawling process in the following stage.

![](/NoSmoke/assets/nosmoke-hook-2.0.png)

### 3. Hook APIs

This sections gives you an overview about hook methods and their input output params.

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

### 4. Writing your hooks

Refer to the following code on how to operate in side of the hook method.

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

