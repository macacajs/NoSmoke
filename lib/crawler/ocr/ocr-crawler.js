'use strict';

const fs = require('fs');
const path = require('path');
const root = require('window-or-global');
const stringSimilarity = require('string-similarity');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');
const _ = require('../../common/helper');

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
}

NSCrawler.prototype.initialize = function() {
  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.testingPeriod * 1000);

  process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
    this.terminate(err);
  });

  process.on('unhandledRejection', (err, p) => {
    console.log('Rejection: ' + err + ' at promise ' + p);
    this.terminate(err);
  });

  return this;
};

NSCrawler.prototype.crawl = async function () {
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
      return tesseract.recognize(imgSrc)
        .catch(err => console.error(err));
    }, (error) => {
      return null
    });

  let node = new NSAppCrawlingTreeNode();
  node.text = result.text;

  // check if page is last one and finished as well
  if (this.currentNode && stringSimilarity.compareTwoStrings(node.text, this.currentNode.text) >= 0.90 && this.currentNode.isFinishedBrowsing()) {
    this.repeatingCrawlingCount ++;
    this.back();
    console.log(`performing back since current page finished ${this.repeatingCrawlingCount}`);
    return;
  } else {
    console.log(`loaded to a different page`);
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
      console.log(`similar page exists: ${this.crawlingBuffer[index].text}, is finished ${node.isFinishedBrowsing()}`);
      break;
    }
  }

  // if new, load actions to current node
  if (isNew) {
    // if reaching max depth, avoid crawling for current page
    if (this.currentNode && this.currentNode.depth >= this.config.testingDepth) {
      this.back();
      return;
    }

    node.parent = this.currentNode;
    node.depth = node.parent? node.parent.depth + 1 : 0;
    this.currentNode = node;
    this.crawlingBuffer.push(node);
    let matches = this.recursiveFilter(result, this.config.targetElements, this.config.exclusivePattern);
    this.currentNode.actions = this.currentNode.produceNodeActions(matches);
  }

  // perform action
  await this.performAction(this.currentNode.actions);

  this.crawl();
};

NSCrawler.prototype.terminate = function(description) {
  console.log(`-----> Crawling Finished: <----- \n ${description}`);
  root.eventEmmiter.emit('terminateCrawling');
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();
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
      this.currentNode.checkAndInitReportDataIfNeeded(this);
      this.currentAction = candidate;
      this.currentAction.markActionStart(this);
      root.updatePassedTestsCount();
      console.log("performing action: " + JSON.stringify(candidate));

      action = candidate;
      break;
    }
  }

  if (!action) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /** 0. invoke interceptor **/
  let customizedAction = hooks.performAction(action, this);
  if (customizedAction) {
    return customizedAction;
  }

  /** 1. perform action **/
  await root.wdclient.send('/wd/hub/session/' + this.sessionId + '/actions', 'post', {'actions': [
        {
          'type': 'tap',
          'x': action.location.origin.x + action.location.size.w/2,
          'y': action.location.origin.y + action.location.size.h/2
        }
      ]}, null);

  this.currentAction.markActionFinish(this);

  /** 2. invoke after interceptor **/
  let customizedAfterPerformHook = hooks.afterActionPerformed(action, this);
  if (customizedAfterPerformHook) {
    return customizedAfterPerformHook;
  }

  /** 3. by default if not interceptor called, set timout and then crawl **/
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
    if (index == 0) {
      continue;
    }

    let currentLine = source.lines[index];
    let currentWord = {input:'', location:{origin:{x: 0, y:0}, size:{w:0, h:0}}, name:''};

    // check regular action
    for (let wordIndex in currentLine.words) {
      let word = currentLine.words[wordIndex];
      if ((word.bbox.x0/DPTOPXRatio - (currentWord.location.origin.x + currentWord.location.size.w)) > maxTextSpacingInDP) {
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
          input:'',
          location:{
              origin:{
                x: (word.bbox.x0/DPTOPXRatio).toFixed(2),
                y: (word.bbox.y0/DPTOPXRatio).toFixed(2)
              },
              size:{
                w:((word.bbox.x1 - word.bbox.x0)/DPTOPXRatio).toFixed(2),
                h:((word.bbox.y1 - word.bbox.y0)/DPTOPXRatio).toFixed(2)
              }
            },
          name:word.text};
      } else {
        currentWord = {
          input: '',
          location:{
            origin: {
              x: currentWord.location.origin.x.toFixed(2),
              y: currentWord.location.origin.y.toFixed(2)
            },
            size: {
              w: (word.bbox.x1/DPTOPXRatio - currentWord.location.origin.x).toFixed(2),
              h: (word.bbox.y1/DPTOPXRatio - currentWord.location.origin.y).toFixed(2)
            }
          },
          name: `${currentWord.name} ${word.text}`
        };
      }
    }

    if (currentWord.location.origin.x > 0) {
      if (!this.checkShouldBeExcluded(this.config.exclusivePattern, currentWord)) {
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
  for (let matchItemIndex in matches) {
    if (word.name && matches[matchItemIndex] && matches[matchItemIndex].searchValue == word.name) {
      prioritisedAction.push(word);
      console.log(`matching prioritized action: ${JSON.stringify(word)}`)
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
      _.mkdir(screenshootsDir);

      return new Promise((resolve, reject) => {
        let filePath = path.join(screenshootsDir, fileName);
        fs.writeFile(filePath, data.value, 'base64', (error) => {
          Jimp.read(filePath, (err, image) => {
            image
              .contrast(-0.4)
              .greyscale()
              .write(path.join(screenshootsDir, fileName));

            console.log(`file generated with error: ${JSON.stringify(error)} at path: ${filePath}`);
            resolve(filePath);
          });
        });
      });
    }, () => {
      throw 'screenshot failure';
    });
};

exports.NSCrawler = NSCrawler;
