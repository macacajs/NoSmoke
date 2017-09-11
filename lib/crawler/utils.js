'use strict';

exports.isNodeRuntime = () => {
  let isNode=new Function("try {return this===global;}catch(e){return false;}");
  return isNode();
};

exports.isWebRuntime = () => {
  let isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
  return isBrowser();
};

exports.isArray = Array.isArray; 
