'use strict';
const root = global;

function Hooks(config, sessionId) {}

/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node, user can determine the priority of action execution
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: true to indicate the action has been handled and the default logic will not execute
 * */
Hooks.prototype.performAction = function(actions, crawler) {
  // password input
  if (action.name == "Enter your 4—digit MPIN") {
    return postPerform((next) => {
      root.wdclient
        .send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
          using: 'xpath',
          value: '//*[@name="2"]'
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
                value: '//*[@name="5"]'
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
                value: '//*[@name="8"]'
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

function postPerform(func , milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      func(resolve);
    }, milliseconds);
  });
}

exports.Hooks = Hooks;
