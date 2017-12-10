'use strict';

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
  return actions;
};

/**
 * Method to perform action for the current platform.
 * @Params: action the action which belongs to current active node
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: a Promise to indicate the action has been handled and the default logic will not execute
 * */
Hooks.prototype.performAction = function(action, crawler) {
  return null;
};

/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * @Params: resolve during the calling of this function, the overall crawling process is pending until the resolve is finally called
 * */
Hooks.prototype.afterActionPerformed = function(action, crawler, resolve) {
  resolve();
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

exports.Hooks = Hooks;