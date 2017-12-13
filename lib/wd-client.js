'use strict';

const YAML = require('yamljs');
const root = require('window-or-global');

function WDClient(options) {
  this.server = options.server;
  this.config = options.config;
  this.init();
}

let sessionId = null;

WDClient.prototype.init = function() {
  let that = this;

  root.fetch = require('node-fetch');
  let desiredCapabilities = YAML.load(this.config.configFile).desiredCapabilities;

  // override udid from cmd args
  if (root.cmdArgs.udid) {
    desiredCapabilities.udid = root.cmdArgs.udid;
  }

  // override app path from cmd args
  if (root.cmdArgs.app) {
    desiredCapabilities.app = root.cmdArgs.app;
  }

  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: desiredCapabilities
  }, function(data) {
    sessionId = data.sessionId;
    that.sessionId = sessionId;

    /** for desktop, shall open the url*/
    if (desiredCapabilities.platformName === 'Desktop') {
      that.send(`/wd/hub/session/${sessionId}/url`, 'POST', {
        url: desiredCapabilities.url
      }, () => {
        that.onSessionCreated(data);
      });
    } else {
      that.onSessionCreated(data);
    }
  });
};

WDClient.prototype.onSessionCreated = function(data) {
  root.eventEmmiter.emit('onSessionCreated', data);
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json();
  }

  if (method.toLowerCase() === 'post') {
    return fetch(`${this.server}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
        return data;
      });
  } else {
    return fetch(`${this.server}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
        return data;
      });
  }
};

module.exports = WDClient;
