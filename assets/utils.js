'use strict';

exports.a = () => {
  alert(1);
};

exports.isNodeRuntime = () => {
  let isNode=new Function("try {return this===global;}catch(e){return false;}");
  return isNode();
};

exports.isWebRuntime = () => {
  let isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
  return isBrowser();
};

exports.isArray = (what) => {
  return Object.prototype.toString.call(what) === '[object Array]';
}
