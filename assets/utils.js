'use strict';

exports.a = () => {
  alert(1);
};

exports.isArray = (what) => {
  return Object.prototype.toString.call(what) === '[object Array]';
}
