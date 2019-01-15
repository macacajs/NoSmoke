'use strict';

function Hooks(config, sessionId) {}

/**
 * Method to intercept before the crawling process starts
 * @Params: crawler, the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.beforeCrawlingStart = async function(crawler) {
  return null;
};

/**
 * Method to intercept the crawling process after an specific action has been performed
 * @Params: action the action which belongs to current active node, and has just been performed
 * @Params: crawler the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.onActionPerformed = async function(action, crawler) {
  return null;
};

/**
 * Method to intercept after the crawling process finish, this is called exactly before the crawler process terminates
 * @Params: crawler, the crawler instance which contains the context information as well as crawler config
 * */
Hooks.prototype.afterCrawlingFinish = async function(crawler) {
  return null;
};

exports.Hooks = Hooks;
