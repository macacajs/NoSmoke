'use strict';

function Hooks(config, sessionId) {}

/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: a Promise to indicate the action has been handled and otherwise the default logic will bypass it
 * */
Hooks.prototype.onActionPerformed = async function(action, crawler) {
  return null;
};

exports.Hooks = Hooks;
