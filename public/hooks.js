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
 * Method to perform action for the current platform.
 * @Params: $actions the actions which belongs to current active node, user can determine the priority of action execution
 * @Params: $crawler the crawler instance which contains the context information as well as crawler config
 * @Returns: $true to indicate the action has been handled and the default logic will not execute
 * */
Hooks.prototype.performAction = function(actions, crawler) {
  return false;
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