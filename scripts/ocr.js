const Tesseract = require('tesseract.js')
const filename = 'image.png'
const Jimp = require('jimp');
const path = require("path");

// tesseract img ocr
let tesseract = Tesseract.create({
  workerPath: path.join(__dirname, '../lib/tesseract/src/node/worker.js'),
  langPath: path.join(__dirname, '../lib/tesseract/langs/'),
  corePath: path.join(__dirname, '../lib/tesseract/src/index.js')
});

// transfer img to black and white for optimization
Jimp.read("test.png", (err, image) => {
  image
    .contrast(-0.4)
    .greyscale()
    .write(filename);

  tesseract.recognize(filename)
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
      console.log(result.text)
      process.exit(0)
    });
});
