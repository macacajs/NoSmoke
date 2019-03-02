'use strict';

let os = require('os');
let childProcess = require('child_process');

// preinstall tesseract if possible
if (os.platform().includes('darwin')) {
  console.log('install libs for Mac OS');
  childProcess.execSync('brew ls --versions tesseract || brew install tesseract --with-all-languages');
  childProcess.execSync('brew ls --versions libimobiledevice || brew install libimobiledevice');

  console.log('updating ios-deploy...');
  childProcess.execSync('npm list -g ios-deploy || npm install ios-deploy -g');
} else {
  console.log(`platform type: ${os.platform()}, no preinstall actions configured, please install tesseract manually, please go https://github.com/tesseract-ocr/tesseract/wiki#windows for details`);
}

// preinstall macaca dependencies
console.log('updating macaca-ios...');
childProcess.execSync('npm list -g macaca-ios || npm install macaca-ios -g');

console.log('updating macaca-android...');
childProcess.execSync('npm list -g macaca-android || npm install macaca-android -g');

console.log('updating macaca...');
childProcess.execSync('npm list -g macaca-cli || npm install macaca-cli -g');
