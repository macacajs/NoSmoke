'use strict';
const root = global;

function Hooks(config, sessionId) {}

/**
 * Method to generate a unique digest which can identify a window, change the node.digest if you want.
 * @Params: $platform the name of the platform "iOS/android/web"
 * @Params: $source the raw json source of the current page
 * @Params: $node the node which needs to settle digest
 * @Returns: true to indicate the action has been handled and the default logic will not execute
 * to indicate the action has been handled
 * */
Hooks.prototype.checkDigest = function(platform, source, node, crawler) {
  return false;
};

/**
 * Method to sort a list of actions which will be later bind to a crawling node object, return the list of actions.
 * @Params: actions the array of actions which can be further sorted.
 * @Params: crawler the crawler instance which contains the context information as well as crawler config.
 * @Returns: actions the sorted actions which should be bind to the crawling node.
 * */
Hooks.prototype.sortActionPriority = function(actions, crawler) {
  actions.sort((action1, action2) => {
    if (crawler.config.horizontalScrollTypes.indexOf(action1.source.type)) {
      if (crawler.config.horizontalScrollTypes.indexOf(action2.source.type)) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (crawler.config.horizontalScrollTypes.indexOf(action2.source.type)) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  let shallowCopy = actions.slice();
  for (let i = 1; i < shallowCopy.length; i++) {
    let action = shallowCopy[i];
    if (!action.source.value
      && !action.source.label
      && !action.source.name
      && !action.source.text) {
      let index = actions.indexOf(action);
      if (index > -1) {
        actions.splice(index, 1);
      }
    }
  }

  return actions;
};

/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node, user can determine the priority of action execution
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: true to indicate the action has been handled and the default logic will not execute
 * */
Hooks.prototype.performAction = function(actions, crawler) {
  return null;
};

/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Params: resolve during the calling of this function, the overall crawling process is pending until the resolve is finally called
 * */
Hooks.prototype.afterActionPerformed = function(action, crawler) {
  // password input
  if (action.source.label === "Enter your 4-digit MPIN") {
    return postPerform((next) => {
      root.wdclient
        .send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
          using: 'xpath',
          value: '//*[@name="3"]'
        }, null)
        .then((data) => {
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + data.value.ELEMENT + '/click', 'post', {}, () => {
                resolve();
            });
          })
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            root.wdclient
              .send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
                using: 'xpath',
                value: '//*[@name="6"]'
              }, (data) => {
                  resolve(data);
              });
          });
        })
        .then((data) => {
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + data.value.ELEMENT + '/click', 'post', {}, () => {
                resolve();
            });
          })
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            root.wdclient
              .send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
                using: 'xpath',
                value: '//*[@name="9"]'
              }, (data) => {
                  resolve(data);
              });
          });
        })
        .then((data) => {
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + data.value.ELEMENT + '/click', 'post', {}, () => {
                resolve();
            });
          })
        })
        .then(() => {
          return new Promise((resolve, reject) => {
            root.wdclient
              .send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
                using: 'xpath',
                value: '//*[@name="0"]'
              }, (data) => {
                  resolve(data);
              });
          });
        })
        .then((data) => {
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + data.value.ELEMENT + '/click', 'post', {}, () => {
              next();
            });
          })
        });
    }, 2000);
  }

  return null;
};

/**
 * Method to analysis and insert tab nodes for a master-detail view structure.
 * @Params: sourceArray the array of elements which belongs to the candidate tab node.
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: true to indicate the action has been handled and the default logic will not execute
 * */
Hooks.prototype.insertTabNode = function (sourceArray, crawler) {
  return false;
};

function postPerform(func , milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      func(resolve);
    }, milliseconds);
  });
}

exports.Hooks = Hooks;
