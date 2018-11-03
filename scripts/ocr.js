var Tesseract = require('tesseract.js')
var filename = '/Users/Gangdooz/private/Web/NoSmoke/reports/2018-11-3-16-39-43/9bbee6c1-841a-4a76-a211-4d0291af1b7d.png'
const path = require("path");

let tesseract = Tesseract.create({
  workerPath: path.join(__dirname, '../lib/tesseract/src/node/worker.js'),
  langPath: path.join(__dirname, '../lib/tesseract/langs/'),
  corePath: path.join(__dirname, '../lib/tesseract/src/index.js')
});

tesseract.recognize(filename)
  .progress(function  (p) { console.log('progress', p)  })
  .catch(err => console.error(err))
  .then(function (result) {
    console.log(result.text)
    process.exit(0)
  });
