/* global describe it */

'use strict';

const Jimp = require('jimp');
const configure = require('@jimp/custom');
const types = require('@jimp/types');
const plugins = require('@jimp/plugins');
const threshold = require('@jimp/plugin-threshold');
const mock = require('./mock');

configure({
  types: [types],
  plugins: [plugins, threshold]
});

var HOCR = require('../lib/crawler/ocr-impl/hocr-to-json');

const filePath = './test/1.png';
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

        new HOCR(mock.mockTesseractResult,  (err, result) => {

          if (err) {
            assert.fail(err, null, 'tesseract fails');
          }

          console.log(JSON.stringify(result));
          resolve();
        });
      });
    });

    return finish;
  });
});
