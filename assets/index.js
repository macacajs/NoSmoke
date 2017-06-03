'use strict';

function WDClient(options) {
  this.server = options.server;
  this.init();
};

WDClient.prototype.init = function() {
  var that = this;
  console.log(this.server);
  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      app: '~/.macaca-temp/ios-app-bootstrap.app'
    }
  }, function(data) {
    var sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      var base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });
  });
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json()
  }
  if (method.toLowerCase() === 'post') {
    fetch(`${this.server}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(parseJSON)
      .then(function(data) {
        callback(data);
      });
  } else {
    fetch(`${this.server}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(parseJSON)
      .then(function(data) {
        callback(data);
      });
  }
};

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});
