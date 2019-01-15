'use strict';

const utils = require('macaca-utils');
const childProcess = require('child_process');
const root = global;
const _ = utils.merge({}, utils);

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.spawn = function() {
  let args = Array.prototype.slice.call(arguments);
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    let child = childProcess.spawn.apply(childProcess, args);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');

    child.on('error', error => {
      reject(error);
    });

    child.stdout.on('data', data => {
      stdout += data;
    });

    child.stderr.on('data', data => {
      stderr += data;
    });

    child.on('close', code => {
      if (code) {
        let error = new Error(stderr);
        error.code = code;
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
};

_.sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

_.retry = function(func, interval, num) {
  return new Promise((resolve, reject) => {
    func().then(resolve, err => {
      if (num > 0 || typeof num === 'undefined') {
        _.sleep(interval).then(() => {
          resolve(_.retry(func, interval, num - 1));
        });
      } else {
        reject(err);
      }
    });
  });
};

_ .shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
};

_.randomSubarray = function(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

_.addHookAPIs = function(hook, crawler) {

  hook.click = async function(data) {
    if (data.method === 'xpath') {

      // trigger tap based on location
      let element = await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
        using: 'xpath',
        value: `${data.xpath}`
      }, null);

      await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + element.value.ELEMENT + '/click', 'post', {}, null);

    } else if (data.method === 'location') {

      // trigger tap based on location
      await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/actions', 'post', {'actions': [
        {
          'type': 'tap',
          'x': data.location.x,
          'y': data.location.y
        }
      ]}, null);

    } else {

      // log for invalid args
      console.log(`invalid input params: ${JSON.stringify(data)}`);

    }
  };

  hook.type = async function(data) {
    if (data.method === 'xpath') {

      // log for invalid args
      let element = await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element', 'post', {
        using: 'xpath',
        value: `${data.xpath}`
      }, null);

      // send keys to specific element
      await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/element/' + element.value.ELEMENT + '/value', 'post', {'value': [data.value]}, null);

    } else {

      // trigger input without knowing for element
      await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/keys', 'post', {'value': [data.value]}, null);

    }
  };

  hook.drag = async function(data) {
    // drag based on coordinates
    await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/actions', 'post', {'actions': [
      {
        'type': 'drag',
        'fromX': data.location.fromX,
        'fromY': data.location.fromY,
        'toX': data.location.toX,
        'toY': data.location.toY,
        'duration': data.duration
      }
    ]}, null);
  };

  hook.press = async function(data) {
    // press based on coordinates
    await root.wdclient.send('/wd/hub/session/' + crawler.sessionId + '/actions', 'post', {'actions': [
      {
        'type': 'press',
        'x': data.location.x,
        'y': data.location.y,
        'duration': data.duration
      }
    ]}, null);
  };

  hook.exec = _.exec;

  hook.sleep = _.sleep;
};

module.exports = _;
