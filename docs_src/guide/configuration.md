# Configuration Items

During the [introduction](/guide/README.md) section, we have went through the list of configuration items available in the crawler.config.yml file:

```py
crawlingConfig:
  strategy: 'ocr'
  platform: 'ios'   // platforms to run: Android, iOS.
  triggers:         // specifies click events which needs to be specifically conducted.
    - 'Allow'
    - 'OK'
    - 'Cancel'
  exclude:          // specifies patterns which can be excluded.
    - 'View Detail'

```

Here we will dive into detail and explain on the meaning and example for each of the configuration items.

#### 1. Parameter:  platform

`platform:`

Specifies which platform the crawler is crawling on,  different platform has different driver layer data models provided in [Macaca](https://github.com/macacajs) infrastructure libraries.  In Macaca-NoSmoke app crawler,  the program will based on the chosen platform to erase out the difference between each platforms and conduct crawling based on a unified data model.

`values:`

android, ios \(case insensitive\)


#### 2. Parameter:  strategy

`strategy:`

Specifies the current strategies used for crawling, if this param is not specified, the NoSmoke 1.0 algorithm will be used for crawling. **Note :** to use OCR, you have to add `strategy: 'ocr'` in the config.

`values:`

ocr (otherwise dont speicy this attribute to use NoSmoke V 1)

#### 3. Parameter:  triggers

`triggers:`

Specifies an array of texts which has relatively high priority to be clicked. When one or more texts of high priority is recognised from current page, the rest element will be ignored.

`values:`

array of texts which has high priority to be clicked \(case insensitive\)

#### 4. Parameter:  exclude

`exclude:`

Specifies the array of text patterns which the crawler should avoid to interact with.

`values:`

array of texts which the crawler should avoid to click \(case insensitive\)
