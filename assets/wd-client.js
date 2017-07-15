'use strict';

const {
  NSCrawler
} = require('./crawler');

function WDClient(options) {
  this.server = options.server;
  this.init();
}

let sessionId = null;
let crawlerConfig = new NSCrawlerConfig();

WDClient.prototype.init = function() {
  let that = this;
  console.log(this.server);
  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      // app: '~/.macaca-temp/ios-app-bootstrap.app'
      app: ''
    }
  }, function(data) {
    sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      let base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });

    // Start crawling
    let crawler = new NSCrawler(crawlerConfig, sessionId).initialize();
    setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
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
