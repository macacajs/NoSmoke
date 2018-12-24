# 配置项

在 [介绍](/guide/README.md) 部分, 我们提到了在 crawler.config.yml 文件中的可配置项:

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

本文会着重讲解各个配置项的定义以及使用方式.

#### 1. 参数:  platform

`platform:`

声明爬行的平台类型.

`values:`

android, ios \(大小写无差异\)


#### 2. 参数:  strategy

`strategy:`

声明本次爬虫运行的策略, 默认为NoSmoke 1.0 版本实现. **Note :** 为了使用NoSmoke 2.0, strategt 值需要为ocr. 否则内部将会运行老版本的NoSmoke 实现.

`values:`

ocr (otherwise dont speicy this attribute to use NoSmoke V 1)

#### 3. 参数:  triggers

`triggers:`

声明在遍历页面元素中的高优先级文本，当页面存在高优先级文本时，其他文本内容相关的交互将被忽略, 大小写不敏感，空格不敏感.

`values:`

高优先级的文本数列，用于执行点击操作 \(大小写无差异\)

#### 4. 参数:  exclude

`exclude:`

声明在遍历元素中，需要规避的文本信息，可以是某些文本的片段，当扫描出的文本含有exclue 数列中特定的值时，整段文本将被忽略.

`values:`

会被屏蔽掉的文本数列，用于执行点击操作 \(大小写无差异\)
