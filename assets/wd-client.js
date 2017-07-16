'use strict';

let $ = require('jQuery');
let YAML = require('yamljs');

function WDClient(options) {
  this.server = options.server;
  this.init();
}

let sessionId = null;

WDClient.prototype.init = function() {
  let that = this;
  console.log(this.server);
  let desiredCapabilities = YAML.load('crawler.config.yml').desiredCapabilities

  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: desiredCapabilities
  }, function(data) {
    sessionId = data.sessionId;
    that.sessionId = sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      let base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });

    window.eventEmmiter.emitEvent('onSessionCreated',[data]);
  });
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
