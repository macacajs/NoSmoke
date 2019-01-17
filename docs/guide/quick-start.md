# Quick-Start

### 1. Requirements:

* iOS simulator 11.0 and xcode 10.0 and above.
* Android 6.0 and above, supporting both device and simulator. For real device testing please install null-keyboard.
* Running on MAC OS is recommended, which provide the lowest integration cost of tesseract.
* Ensure tesseract has been properly installed on your machine: `brew install tesseract --all-languages`.

### 2. Setup & Run:

##### **Step 1.** Setup Macaca - NoSmoke dependends on the following macaca components:

```
npm i macaca-android -g
npm i macaca-ios -g
npm i macaca-cli -g
```

##### **Step 2.** Setup NoSmoke

Install the nosmoke command line from npmjs

```
npm i nosmoke -g
```

Open the terminal and initialize macaca server:

```
 macaca server --verbose
```

Then in your workspace directory, execute the following command and run the default macaca demo (Android), you may need to create a emulator first. Please refer [here](/zh/guide/cross-platform.md) to see how to configure and run on your own target app.

```
nosmoke
```

For full set of command please type the following lines in terminal.

```
nosmoke --help
```

### 3. What you will see

When the npm program starts to execute and browser will automatically open the reporter-monitor, it may take several seconds for the program to start simulator. Once the testing target app installed, the crawler program will start execution and reporter's content will be updated.

If there is an error:

Please kindly [drop an issue](https://github.com/macacajs/NoSmoke/issues)
