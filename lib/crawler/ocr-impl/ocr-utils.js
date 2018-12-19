'use strict';

let convert_iOS_DIPToPXRatio = function (deviceType) {

  // return 1 for default value
  if (!deviceType || !deviceType.length) {
    console.log('invalid device type input');
    return 2;
  }

  // iterate through all possible device types, https://i.stack.imgur.com/c6l4f.png
  deviceType = deviceType.toLowerCase();
  deviceType = deviceType.replace(/\s/g, '');

  // for iphone 'plus' devices, the ratio is 3, for regular devices like iphone 4,4s,5,5s,5c,se,6,6s,7,8,xr
  if (deviceType.indexOf('+') !== -1 || deviceType.indexOf('plus') !== -1) {
    return 3;
  }

  // for iphone x and onwards, the standard is migrating to 3 in general, except for for iphone xr
  if (deviceType.indexOf('xsmax') !== -1) {
    return 3;
  }

  if (deviceType.indexOf('xr') !== -1) {
    return 2;
  }

  if (deviceType.indexOf('x') !== -1 || deviceType.indexOf('x') !== -1) {
    return 3;
  }

  console.log(`default dip-px ration returned, current device: ${deviceType}`);
  return 2;

};

module.exports.convert_iOS_DIPToPXRatio = convert_iOS_DIPToPXRatio;
