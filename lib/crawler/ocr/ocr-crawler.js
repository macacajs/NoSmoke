'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const root = require('window-or-global');
const stringSimilarity = require('string-similarity');
const Tesseract = require('../../tesseract/src/index');
const Jimp = require('jimp');
const _ = require('../../common/helper');
const { createCanvas, loadImage } = require('canvas');
var sizeOf = require('image-size');

const maxTextSpacingInDP = 10;
const DPTOPXRatio = 3;

let tesseract = Tesseract.create({
  workerPath: path.join(__dirname, '../../tesseract/src/node/worker.js'),
  langPath: path.join(__dirname, '../../tesseract/langs/'),
  corePath: path.join(__dirname, '../../tesseract/src/index.js')
});

let Hooks;

if (root.cmdArgs && root.cmdArgs.hooks) {
  if (_.isExistedFile(root.cmdArgs.hooks)) {
    Hooks = require(root.cmdArgs.hooks).Hooks;
  } else {
    process.exit();
  }
} else {
  Hooks = require('../../../public/hooks').Hooks;
}

const hooks = new Hooks();
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
  let result = await this.refreshScreen()
    .then((imgSrc) => {
      try {
        return tesseract.recognize(imgSrc)
          .catch(err => console.error(err));
      } catch (error) {
        console.log(`refresh error occurred: ${JSON.stringify(error)}`);
        return '';
      }
    }, (error) => {
      console.log(`refresh error occurred: ${JSON.stringify(error)}`);
      return '';
    });

  let node = new NSAppCrawlingTreeNode();
  node.text = result.text;

  // check if page is last one and finished as well
  if (this.currentNode && stringSimilarity.compareTwoStrings(node.text, this.currentNode.text) >= 0.90 && this.currentNode.isFinishedBrowsing()) {
    this.repeatingCrawlingCount++;
    this.back();
    console.log(`performing back since current page finished ${this.repeatingCrawlingCount}`);
    return;
  } else {
    console.log('loaded to a different page');
    this.repeatingCrawlingCount = 0;
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
      console.log(`similar page exists: ${this.crawlingBuffer[index].text}`);
      break;
    }
  }

  // if new, load actions to current node
  if (isNew) {
    // if reaching max depth, avoid crawling for current page
    if (this.currentNode && this.currentNode.depth >= this.config.depth) {
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
  root.eventEmmiter.emit('terminateCrawling');
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
  let action = null;
  for (let i = 0; i < actions.length; i++) {
    let candidate = actions[i];
    if (!candidate.isTriggered) {
      candidate.isTriggered = true;

      /** log and only log in the current progress */
      this.currentAction = candidate;
      this.currentAction.markActionStart(this);
      root.updatePassedTestsCount();
      console.log('performing action: ' + JSON.stringify(candidate));

      action = candidate;
      break;
    }
  }

  if (!action) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  let customizedAction = hooks.performAction(action, this);
  if (customizedAction) {
    /** 0. invoke interceptor **/
    await customizedAction;
  } else {
    /** 1. perform action **/
    await root.wdclient.send('/wd/hub/session/' + this.sessionId + '/actions', 'post', {'actions': [
      {
        'type': 'tap',
        'x': action.location.origin.x + action.location.size.w / 2,
        'y': action.location.origin.y + action.location.size.h / 2
      }
    ]}, null);
  }

  let destFilename = await this.highlightAction(this.currentNode, action);
  this.currentAction.markActionFinish(this, destFilename);

  /** 2. by default if not interceptor called, set timout and then crawl **/
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, this.config.newCommandTimeout * 1000);
  });
};

NSCrawler.prototype.recursiveFilter = function (source, matches, exclusive) {

  let prioritisedAction = [];
  let normalAction = [];
  for (let index in source.lines) {
    // ignore the first line of text, usually the status bar
    if (index === 0) {
      continue;
    }

    let currentLine = source.lines[index];
    let currentWord = {input: '', location: {origin: {x: 0, y: 0}, size: {w: 0, h: 0}}, name: ''};

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
          name: word.text};
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

    if (currentWord.location.origin.x > 0) {
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
    if (word.name && match.see && match.see === word.name) {
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

  return excludedList.indexOf(word.name) !== -1;
};

NSCrawler.prototype.refreshScreen = function (currentAction) {
  /** Based on environment, choose the way of refresh screen */
  let that = this;
  return root.wdclient.send('/wd/hub/session/' + this.sessionId + '/screenshot', 'get', null, null)
    .then((data) => {
      if (!data.value || data.value.length === 0) {
        return null;
      }

      const screenshootsDir = path.join(process.cwd(), 'reports', root.crawlingDateStamp);
      const fileName = `${_.uuid()}.png`;
      that.lastRefreshImgPath = path.join('.', root.crawlingDateStamp, fileName);
      _.mkdir(screenshootsDir);

      return new Promise((resolve, reject) => {
        let filePath = path.join(screenshootsDir, fileName);
        fs.writeFile(filePath, data.value, 'base64', (error) => {
          Jimp.read(filePath, (err, image) => {

            if (err || !image) {
              console.log('error in process image');
            } else {
              image
                .contrast(-0.4)
                .greyscale()
                .write(path.join(screenshootsDir, fileName));
            }

            setTimeout(() => {
              console.log(`file generated with error: ${JSON.stringify(error)} at path: ${filePath}`);
              resolve(filePath);
            }, 500);
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
    let destFileName = path.join(process.cwd(), 'reports', releativeFilePath);
    originFileName = path.join(process.cwd(), 'reports', originFileName);
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

exports.NSCrawler = NSCrawler;
