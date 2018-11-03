'use strict';

const fs = require('fs');
const path = require('path');
const root = require('window-or-global');
const stringSimilarity = require('string-similarity');
const Tesseract = require('tesseract.js');
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
const maxRepeatCrawlingCount = 8;

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
  if (this.currentNode && node.text === this.currentNode.text && this.currentNode.isFinishedBrowsing()) {
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
      stringSimilarity.compareTwoStrings(node.text, this.crawlingBuffer[index].text) >= 0.9) {
      console.log(`similar page exists: ${this.crawlingBuffer[index].text}`);
      isNew = false;
      node = this.crawlingBuffer[index];
      break;
    }
  }

  // if new, load actions to current node
  if (isNew) {
    node.parent = this.currentNode;
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
      this.refreshScreen();
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

  await root.wdclient.send('/wd/hub/session/' + this.sessionId + '/actions', 'post', {'actions': [
        {
          'type': 'tap',
          'x': action.location.origin.x + action.location.size.w/2,
          'y': action.location.origin.y + action.location.size.h/2
        }
      ]}, null);

  this.currentAction.markActionFinish(this);

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

    // check prioritized action
    for (let matchItemIndex in matches) {
      if (currentLine.text.indexOf(matches[matchItemIndex].searchValue) !== -1) {
        // get the location of this

      }
    }

    // check regular action
    currentWord = {input:'', location:{origin:{x: 0, y:0}, size:{w:0, h:0}}, name:''};
    for (let wordIndex in currentLine.words) {
      let word = currentLine.words[wordIndex];
      if (word.bbox.x0 - (currentWord.location.origin.x + currentWord.location.size.w) > maxTextSpacingInDP) {
        if (currentWord.location.origin.x > 0) {
          normalAction.push(currentWord);
          console.log(`filtering out action: ${JSON.stringify(currentWord)}`);
        }

        // check out the new word
        currentWord = {
          input:'',
          location:{
              origin:{
                x: word.bbox.x0/DPTOPXRatio,
                y:word.bbox.y0/DPTOPXRatio
              },
              size:{
                w:(word.bbox.x1 - word.bbox.x0)/DPTOPXRatio,
                h:(word.bbox.y1 - word.bbox.y0)/DPTOPXRatio
              }
            },
          name:word.text};
      } else {
        currentWord = {
          input: '',
          location:{
            origin: {
              x: currentWord.location.origin.x,
              y: currentWord.location.origin.y
            },
            size: {
              w: word.bbox.x1/DPTOPXRatio - currentWord.location.origin.x,
              h: word.bbox.y1/DPTOPXRatio - currentWord.location.origin.y
            }
          },
          name: `${currentWord.name} ${word.text}`
        };
      }
    }

    if (currentWord.location.origin.x > 0) {
      normalAction.push(currentWord);
      console.log(`filtering out action: ${JSON.stringify(currentWord)}`);
    }
  }

  // check if contains prioritized action
  if (prioritisedAction.length) {
    _.shuffleArray(prioritisedAction);
    return prioritisedAction;
  } else {
    _.shuffleArray(normalAction);
    return normalAction;
  }
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
        fs.writeFile(path.join(screenshootsDir, fileName), data.value, 'base64', (error) => {
          console.log(`file generated with error: ${JSON.stringify(error)}`);
          resolve(path.join(screenshootsDir, fileName));
        });
      });
    }, () => {
      throw 'screenshot failure';
    });
};

exports.NSCrawler = NSCrawler;
