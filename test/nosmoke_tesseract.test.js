/* global describe it */

'use strict';

const Jimp = require('jimp');
const path = require('path');

const configure = require('@jimp/custom');
const types = require('@jimp/types');
const plugins = require('@jimp/plugins');
const threshold = require('@jimp/plugin-threshold');

configure({
  types: [types],
  plugins: [plugins, threshold]
});

var HOCR = require('../lib/crawler/ocr-impl/hocr-to-json');
var tesseract = require('../lib/crawler/ocr-impl/tesseract');

var options = {
  l: 'chi_sim',
  binary: '/usr/local/bin/tesseract',
  psm: 3,
  config: '--oem 1'
};

let filePath = './test/1.png';
const fs = require('fs');

const assert = require('assert');

describe('#Load Template', function() {

  it('scan and recognize', async function() {
    this.timeout(10000);
    let finish = new Promise((resolve) => {
      Jimp.read(filePath, (err, image) => {

        assert.ok(err === null && image !== null);

        image
          .grayscale()
          .invert()
          .threshold({ max: 50, replace: 255, autoGreyscale: false })
          .invert()
          .write('./temp/temp.png');

        tesseract.process(path.join(process.cwd(), './temp/temp.png'), options, function(err, text) {

          if (err) {
            assert.fail(err, null, 'tesseract fails');
          }

          new HOCR(text,  (err, result) => {

            if (err) {
              assert.fail(err, null, 'tesseract fails');
            }

            console.log(JSON.stringify(result));
            console.log('The file was saved!');

            fs.writeFile('./temp/result.json', JSON.stringify(text), function(err) {

              assert.ok(err === null);

              resolve();
            });
          });
        });
      });
    });

    return finish;
  });
});
