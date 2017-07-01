;(function(global) {

  'use strict';

  if (!~navigator.userAgent.indexOf('xdf')) {
    return;
  }

  var addToDOMReadyEvent = function(callback) {
    var readyRE = /complete|loaded|interactive/;

    if (readyRE.test(document.readyState)) {
      setTimeout(function() {
        callback();
      }, 16);
    } else {
      document.defaultView.addEventListener('DOMContentLoaded', function() {
        callback();
      }, false);
    }
  };

  var Util = {
    slice: Array.prototype.slice
  };

  if (global.JsBridge) {
    return;
  }

  function BridgeConstructor() {
    this.iframe = null;
    this.execStack = [];
    this._init();
  };

  BridgeConstructor.prototype._init = function() {

  };

  BridgeConstructor.prototype._renderIframe = function() {
    if (this.iframe) {
      return;
    }
    try {
      var iframe = document.createElement('iframe');
      iframe.id = '__JSBridgeIframe';
      iframe.style.display = 'none';
      document.documentElement.appendChild(iframe);
      this.iframe = iframe;
    } catch(e) {
      console.log(e.stack);
    }
  };

  BridgeConstructor.prototype._invoke = function() {

  };

  BridgeConstructor.prototype.call = function() {
    this._renderIframe();

    var args = Util.slice.call(arguments);

    var method = args[0];

    if (!method) {
      return;
    }

    var href = 'jsbridge://call?method=' + method;
  
    var data = args[1];

    if (data) {
      href += '&data=' + encodeURIComponent(JSON.stringify(data));
    }
    /*
    this.execStack.push({
      id: method + '_' + new Date().getTime(),
      method: method,
      options: args[1],
      callback: args[2]
    });

    this.iframe.src = 'jsbridge://dispatch';
    */

    document.location.href = href;
  };

  global.JsBridge = new BridgeConstructor();

  var bridgeReadyEvent = document.createEvent('Events');
  bridgeReadyEvent.initEvent('JSBridgeReady', false, false);
  document.dispatchEvent(bridgeReadyEvent);

})(this);
