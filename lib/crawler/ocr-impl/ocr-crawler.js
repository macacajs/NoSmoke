'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const root = require('window-or-global');
const stringSimilarity = require('string-similarity');
const { createCanvas, loadImage } = require('canvas');
const sizeOf = require('image-size');
const Jimp = require('jimp');
const configure = require('@jimp/custom');
const types = require('@jimp/types');
const plugins = require('@jimp/plugins');
const threshold = require('@jimp/plugin-threshold');

const _ = require('../../common/helper');
const ocr_util = require('./ocr-utils');

configure({
  types: [types],
  plugins: [plugins, threshold]
});

let maxTextSpacingInDP = 30;
let estimatedStatusAndNavBarHeight = 200;
let DPTOPXRatio = 1;

var HOCR = require('./hocr-to-json');
var tesseract = require('./tesseract');

var options = {
  l: 'chi_sim+eng',
  binary: '/usr/local/bin/tesseract',
  psm: 3,
  config: '--oem 1'
};

const maxRepeatCrawlingCount = 4;

const {
  NSAppCrawlingTreeNode
} = require('./models');

function NSCrawler(config, sessionId) {
  this.config = config;
  this.sessionId = sessionId;
  this.crawlingBuffer = [];
  this.currentNode = null;
  this.currentAction = null;
  this.repeatingCrawlingCount = 0;
  this.crawlingExpires = false;
  this.lastRefreshImgPath = '';

  if (this.config.platform.toLocaleLowerCase() === 'android') {
    maxTextSpacingInDP = 30;
    DPTOPXRatio = 1;
  } else if (this.config.platform.toLocaleLowerCase() === 'ios') {
    maxTextSpacingInDP = 10;
    DPTOPXRatio = ocr_util.convert_iOS_DIPToPXRatio(this.config.deviceType);
  } else if (this.config.platform.toLocaleLowerCase() === 'pc-web') {
    this.terminate('ocr model not supporting pc-web, please use default strategies instead');
  }
}

NSCrawler.prototype.initialize = function() {
  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.duration * 1000);

  process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
    this.terminate(err.stack);
  });

  process.on('unhandledRejection', (err, p) => {
    console.log('Rejection: ' + err + ' at promise ' + p);
    this.terminate(err.stack);
  });

  return this;
};

NSCrawler.prototype.crawl = async function() {
  // Terminate under the following cases:
  // 1. the previous node has been finished for continuously count of 8, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= maxRepeatCrawlingCount || this.crawlingExpires) {
    this.terminate('terminate due to timeout');
    return;
  }

  // refresh screen and attempt to analyze
  tick('refresh screen starts');
  let result = await this.refreshScreen()
    .then((imgSrc) => {
      try {
        tick('refresh screen recognise start');

        return new Promise((resolve) => {
          tesseract.process(imgSrc, options, function(err, text) {
            if (err) {
              console.log(`tesseract error occurred: ${JSON.stringify(err)}`);
              this.terminate('tesseract error');
            } else {
              new HOCR(text,  (error, result) => {

                if (error) {
                  this.terminate(`tesseract error hocr error occurred: ${JSON.stringify(error)}`);
                } else {
                  resolve(result[0]);
                }
              });
            }
          });
        });

      } catch (error) {
        console.log(`refresh error occurred: ${JSON.stringify(error)}`);
        return '';
      }
    }, (error) => {
      console.log(`refresh error occurred: ${JSON.stringify(error)}`);
      return '';
    });

  tick('refresh screen end');
  let node = new NSAppCrawlingTreeNode();
  node.text = result.text || ' ';

  // check if page is last one and finished as well
  try {
    if (this.currentNode && stringSimilarity.compareTwoStrings(node.text, this.currentNode.text || ' ') >= 0.90 && this.currentNode.isFinishedBrowsing()) {
      this.repeatingCrawlingCount++;
      if (this.currentNode.parent) {
        this.back();
        console.log(`performing back since current page finished ${this.repeatingCrawlingCount}`);
      } else {
        this.terminate('finished browsing on root node');
      }
      return;
    } else {
      this.repeatingCrawlingCount = 0;
    }
  } catch (e) {
    this.terminate(e.stack);
  }

  // check is new
  let isNew = true;
  for (let index in this.crawlingBuffer) {
    if (this.crawlingBuffer[index] &&
      this.crawlingBuffer[index].text &&
      stringSimilarity.compareTwoStrings(node.text, this.crawlingBuffer[index].text) >= 0.90) {
      isNew = false;
      node = this.crawlingBuffer[index];
      this.currentNode = this.crawlingBuffer[index];
      console.log('similar page exists');
      break;
    }
  }

  // if new, load actions to current node
  if (isNew) {
    // if reaching max depth, avoid crawling for current page
    if (this.currentNode && this.currentNode.depth >= this.config.depth) {
      console.log('exceeding max depth, triggering back');
      this.back();
      return;
    }

    node.parent = this.currentNode;
    node.depth = node.parent ? node.parent.depth + 1 : 0;

    this.currentNode = node;
    this.currentNode.fileName = this.lastRefreshImgPath;
    this.crawlingBuffer.push(node);
    let matches = this.recursiveFilter(result, this.config.triggers, this.config.exclude);
    this.currentNode.actions = this.currentNode.produceNodeActions(matches);

    this.currentNode.checkAndInitReportDataIfNeeded(this);
    this.notifyReportUpdate();
  } else {
    // clean the last image, no node is attached
    fs.unlink(this.lastRefreshImgPath, () => {
      console.log('duplicate resource path removed');
    });
  }

  if (this.currentNode.isFinishedBrowsing()) {
    console.log('current node finished browsing, triggering back');
    this.back();
    return;
  }

  // perform action
  await this.performAction(this.currentNode.actions);

  this.notifyReportUpdate();

  this.crawl();
};

NSCrawler.prototype.notifyReportUpdate = function() {
  // update current data
  let data = {};
  data.fileName = this.currentNode.fileName;
  data.currentNode = this.currentNode;
  root.eventEmmiter.emit('screenRefresh', data);
};

NSCrawler.prototype.terminate = function(description) {

  console.log(`-----> Crawling Finished: <----- \n ${description}`);

  if (typeof root.hooks.afterCrawlingFinish === 'function') {
    root.hooks.afterCrawlingFinish().then(() => {
      root.eventEmmiter.emit('terminateCrawling');
    });
  } else {
    root.eventEmmiter.emit('terminateCrawling');
  }
};

NSCrawler.prototype.explore = function(source) {

};

NSCrawler.prototype.back = function () {
  root.wdclient.send('/wd/hub/session/' + this.sessionId + '/back', 'post', {}, null).then(() => {
    setTimeout(() => {
      this.crawl();
    }, this.config.newCommandTimeout * 1000);
  });
};

NSCrawler.prototype.performAction = async function(actions) {
  tick('perform action starts');
  let action = null;
  for (let i = 0; i < actions.length; i++) {
    let candidate = actions[i];
    if (!candidate.isTriggered || candidate.repeatable) {

      if (!candidate.repeatable) {
        candidate.isTriggered = true;
      }

      /** log and only log in the current progress */
      this.currentAction = candidate;
      this.currentAction.markActionStart(this);
      root.updatePassedTestsCount();
      console.log('performing action: ' + JSON.stringify(candidate));

      action = candidate;
      break;
    }
  }

  if (!action || !action.location || !action.location.origin) {
    console.log('bypass action due to null content');
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /** 1. perform action **/
  await root.wdclient.send('/wd/hub/session/' + this.sessionId + '/actions', 'post', {'actions': [
    {
      'type': 'tap',
      'x': action.location.origin.x + action.location.size.w / 2,
      'y': action.location.origin.y + action.location.size.h / 2
    }
  ]}, null);

  await root.hooks.onActionPerformed(action, this);

  let destFilename = await this.highlightAction(this.currentNode, action);
  this.currentAction.markActionFinish(this, destFilename);

  /** 2. by default if not interceptor called, set timout and then crawl **/
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, this.config.newCommandTimeout * 1000);
  });

  tick('perform action finish');
};

NSCrawler.prototype.recursiveFilter = function (source, matches, exclusive) {

  let prioritisedAction = [];
  let normalAction = [];

  // check if current source contains head bar
  let shift_items = 0;
  for (const line of source.lines) {
    if (line.line[0].bbox.y0 < estimatedStatusAndNavBarHeight / DPTOPXRatio) {
      shift_items++;
    }
  }

  source.lines = source.lines.slice(shift_items);

  for (let paramIndex = 0; paramIndex < source.lines.length; paramIndex++) {

    let param = source.lines[paramIndex].line;
    for (let index = 0; index < param.length; index++) {

      let currentLine = param[index];
      let currentWord = {input: '', location: {origin: {x: 0, y: 0}, size: {w: 0, h: 0}}, name: '', repeatable: false};

      // check regular action
      for (let wordIndex in currentLine.words) {
        let word = currentLine.words[wordIndex];
        if (word.bbox.x0 / DPTOPXRatio - (currentWord.location.origin.x + currentWord.location.size.w) > maxTextSpacingInDP) {
          if (currentWord.location.origin.x > 0) {
            if (!this.checkShouldBeExcluded(this.config.exclusivePattern, currentWord)) {
              normalAction.push(currentWord);
              this.checkContentMatch(matches, currentWord, prioritisedAction);
              console.log(`filtering out action: ${JSON.stringify(currentWord)}`);
            } else {
              console.log(`action ignored: ${JSON.stringify(currentWord)}`);
            }
          }

          // check out the new word
          currentWord = {
            input: '',
            location: {
              origin: {
                x: Number.parseFloat((word.bbox.x0 / DPTOPXRatio).toFixed(1)),
                y: Number.parseFloat((word.bbox.y0 / DPTOPXRatio).toFixed(1))
              },
              size: {
                w: Number.parseFloat(((word.bbox.x1 - word.bbox.x0) / DPTOPXRatio).toFixed(1)),
                h: Number.parseFloat(((word.bbox.y1 - word.bbox.y0) / DPTOPXRatio).toFixed(1))
              }
            },
            name: word.text
          };
        } else {
          currentWord = {
            input: '',
            location: {
              origin: {
                x: Number.parseFloat(currentWord.location.origin.x.toFixed(1)),
                y: Number.parseFloat(currentWord.location.origin.y.toFixed(1))
              },
              size: {
                w: Number.parseFloat((word.bbox.x1 / DPTOPXRatio - currentWord.location.origin.x).toFixed(1)),
                h: Number.parseFloat((word.bbox.y1 / DPTOPXRatio - currentWord.location.origin.y).toFixed(1))
              }
            },
            name: `${currentWord.name} ${word.text}`
          };
        }
      }

      if (!this.checkShouldBeExcluded(this.config.exclude, currentWord)) {
        normalAction.push(currentWord);
        this.checkContentMatch(matches, currentWord, prioritisedAction);
        console.log(`filtering out action: ${JSON.stringify(currentWord)}`);
      } else {
        console.log(`action ignored: ${JSON.stringify(currentWord)}`);
      }
    }
  }

  // check if contains prioritized action
  if (prioritisedAction.length) {

    _.shuffleArray(prioritisedAction);
    if (prioritisedAction.length > this.config.maxActionPerPage) {
      prioritisedAction = _.randomSubarray(prioritisedAction, this.config.maxActionPerPage);
    }
    return prioritisedAction;

  } else {

    _.shuffleArray(normalAction);
    if (normalAction.length > this.config.maxActionPerPage) {
      normalAction = _.randomSubarray(normalAction, this.config.maxActionPerPage);
    }

    return normalAction;
  }
};

NSCrawler.prototype.checkContentMatch = function (matches, word, prioritisedAction) {
  // check prioritized action
  for (let match in matches) {
    if (word.name && matches[match] && matches[match].toLowerCase().replace(/\s/g, '') === word.name.toLowerCase().replace(/\s/g, '')) {
      word.repeatable = true;
      prioritisedAction.push(word);
      console.log(`matching prioritized action: ${JSON.stringify(word)}`);
      break;
    }
  }
};

NSCrawler.prototype.checkShouldBeExcluded = function (excludedList, word) {
  if (!excludedList || !word) {
    return false;
  }

  // check if current word is not valid
  if (!word.name || !word.name.length) {
    return true;
  }

  // check if word is one of the components in list, if so directly mark as need to be excluded.
  var shouldBeExcluded = excludedList.indexOf(word.name) !== -1;

  // check if the word is a substring of the excluding word, or the excluding word is part of the word.
  if (!shouldBeExcluded) {
    for (let i = 0; i < excludedList.length; i++) {
      let pattern = excludedList[i];
      if (pattern.toLowerCase().includes(word.name.toLowerCase()) || word.name.toLowerCase().includes(pattern.toLowerCase())) {
        shouldBeExcluded = true;
        break;
      }
    }
  }

  return shouldBeExcluded;
};

NSCrawler.prototype.refreshScreen = function (currentAction) {
  /** Based on environment, choose the way of refresh screen */
  let that = this;
  return root.wdclient.send('/wd/hub/session/' + this.sessionId + '/screenshot', 'get', null, null)
    .then((data) => {

      tick('refresh screen recieving data');

      if (!data.value || data.value.length === 0) {
        return null;
      }

      const screenshootsDir = path.join(process.cwd(), 'reports', root.crawlingDateStamp, 'screenshots');
      const fileName = `${_.uuid()}.png`;
      that.lastRefreshImgPath = path.join('.', 'screenshots', fileName);
      _.mkdir(screenshootsDir);

      return new Promise((resolve, reject) => {
        let filePath = path.join(screenshootsDir, fileName);
        fs.writeFile(filePath, data.value, 'base64', (error) => {
          Jimp.read(filePath, (err, image) => {
            if (err || !image) {
              console.log('error in process image');
              resolve(filePath);
            } else {
              image
                .grayscale()
                .invert()
                .threshold({ max: 50, replace: 255, autoGreyscale: false })
                .invert()
                .write(filePath);
              setTimeout(() => {
                console.log(`file generated with error: ${JSON.stringify(error)} at path: ${filePath}`);
                tick('refresh screen image ready');
                resolve(filePath);
              }, 400);
            }
          });
        });
      });
    }, () => {
      throw new Error('screenshot failure');
    });
};

NSCrawler.prototype.highlightAction = async function (currentNode, currentAction) {
  try {
    // 1. make a copy for current action.
    if (!currentNode.fileName || !currentAction) {
      return '';
    }

    let index = currentNode.actions.findIndex((action) => {
      return action === currentAction;
    });

    let originFileName = currentNode.fileName;
    let releativeFilePath = originFileName.split('.').slice(0, -1).join('').concat(`_${index}.png`);
    let destFileName = path.join(process.cwd(), 'reports', root.crawlingDateStamp, releativeFilePath);
    originFileName = path.join(process.cwd(), 'reports', root.crawlingDateStamp, originFileName);
    console.log(`copy to path ${destFileName}`);

    await fse.copy(originFileName, destFileName);

    // 2. high-light action areas
    var dimensions = sizeOf(destFileName);

    const canvas = createCanvas(dimensions.width, dimensions.height, 'png');
    const ctx = canvas.getContext('2d');

    await loadImage(originFileName).then((image) => {
      ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    });

    ctx.lineWidth = '5';
    ctx.strokeStyle = 'red';

    console.log(`draw path: ${JSON.stringify(currentAction.location)}`);

    ctx.rect(currentAction.location.origin.x * DPTOPXRatio, currentAction.location.origin.y * DPTOPXRatio,
      currentAction.location.size.w * DPTOPXRatio, currentAction.location.size.h * DPTOPXRatio);
    ctx.stroke();

    // 3. save back image
    var buf = canvas.toBuffer();
    fs.writeFileSync(destFileName, buf);

    console.log(`action path: ${releativeFilePath}`);

    return path.join('.', releativeFilePath);
  } catch (err) {
    console.error(err);
  }
};

function tick(name) {
  var ts = Math.round((new Date()).getTime() / 1000);
  console.log(`=======> event ${name}:  ${ts}`);
}

exports.NSCrawler = NSCrawler;
