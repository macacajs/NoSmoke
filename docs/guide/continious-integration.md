# Continous Integration

Based on previous information we have provided,  we have talked about how to [install](/guide/quick-start.md), customize nosmoke testing via [hooks](/guide/hooks.md) and [configuration](/guide/configuration.md) files. Here is the last step in the series of documents, where you can see how a living CI instance of NoSmoke is scripted.

### Before Run:

Before run, you may terminate the process which occupies the current process id and then start macaca service and

```bash

lsof -i :${process-port-which-you-need-to-close} | awk '{print $2}' | tail -1 | xargs kill -9

```

### For Android

Ensure you have setup macaca server first.

```bash

macaca server --verbose -p 3554 &

```

Then execute the following command to start the crawling process.

```bash

nosmoke -s -c ${path-of-file}/crawler.config-android.yml \
        -h ${path-of-file}/hooks-android.js \
        --server http://localhost:3554 \
        -p 3564

```

### For iOS

Ensure you have setup macaca server first.
```bash
macaca server --verbose -p 3684 &
```

Then execute the following command to start the crawling process.
```bash
xcrun simctl launch booted com.apple.springboard
xcrun simctl terminate booted com.apple.test.XCTestWDUITests-Runner
xcrun simctl terminate booted ${your-bundle-id}   # bundle id of your current app.

sleep 2

nosmoke   -s --server http://localhost:3684  \
          -h ${path-of-file}/hooks-ios.js \
          -c ${path-of-file}/crawler.config-ios.yml \
          -p 3694

```

After this is executed, the report file will be generated at the dir where the script has been executed.

![](/NoSmoke/assets/generated_output.png)
