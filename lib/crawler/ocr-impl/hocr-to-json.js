'use strict';

const htmlparser = require('htmlparser2');

function Hocr(html, callback) {
  this.html = html;
  this.callback = callback;
  this.result = [];
  this.textBody = '';
  this.parse();
}

Hocr.prototype.processBox = function(str) {
  var coords;
  var semiColonPosition = str.indexOf(';');

  if (semiColonPosition >= 0) {
    str = str.substring(0, semiColonPosition);
  }

  if (str.indexOf('bbox') === 0) {
    coords = str.split(' ');
    if (coords.length !== 5) {
      return str;
    } else {
      return {
        x0: coords[1],
        y0: coords[2],
        x1: coords[3],
        y1: coords[4]
      };
    }
  } else {
    return str;
  }
};

Hocr.prototype.getDataFromChildren = function(dom) {
  if (dom.children && dom.children[0]) {
    return this.getDataFromChildren(dom.children[0]);
  } else {
    return dom.data;
  }
};

Hocr.prototype.processWord = function(dom, idxPage, idxPar, idxLine) {
  return this.result[idxPage].lines[idxPar].line[idxLine].words.push({
    id: dom.attribs.id,
    bbox: this.processBox(dom.attribs.title),
    text: this.getDataFromChildren(dom)
  });
};

Hocr.prototype.processLine = function(dom, idxPage, idxPar) {
  var elem, _i, _len, _ref, _results, _text;
  _ref = dom.children;
  _results = [];
  _text = '';

  this.result[idxPage].lines[idxPar].line.push({
    id: dom.attribs.id,
    bbox: this.processBox(dom.attribs.title),
    words: []
  });

  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    elem = _ref[_i];
    if (elem.attribs['class'] === 'ocrx_word') {
      let idxLine = this.result[idxPage].lines[idxPar].line.length - 1;
      let currentLength = this.processWord(elem, idxPage, idxPar, idxLine);
      let newWord = this.result[idxPage].lines[idxPar].line[idxLine].words[currentLength - 1];

      if (newWord && newWord.text) {
        _text = _text.concat(newWord.text).concat(' ');
      }

      _results.push(currentLength);
    }
  }

  _text = _text.concat('\n');
  this.textBody = this.textBody.concat(_text);
  return _results;
};

Hocr.prototype.processPar = function(dom, idxPage) {
  var elem, _i, _len, _results;
  this.result[idxPage].lines.push({
    line: []
  });
  _results = [];
  for (_i = 0, _len = dom.length; _i < _len; _i++) {
    elem = dom[_i];
    if (elem.attribs['class'] === 'ocr_line') {
      _results.push(this.processLine(elem, idxPage, this.result[idxPage].lines.length - 1));
    }
  }
  return _results;
};

Hocr.prototype.processPage = function(dom) {
  var carea, line, _i, _len, _ref, _results;
  if (dom.attribs.title.indexOf(';') > 0) {
    dom.attribs.title = dom.attribs.title.split(';')[1].replace(/^\s+/g, '').replace(/\s+$/g, '');
  }

  let page = {
    id: dom.attribs.id,
    bbox: this.processBox(dom.attribs.title),
    lines: [],
    text: ''
  };

  this.result.push(page);
  _ref = dom.children;
  _results = [];

  if (_ref == null) {
    return _results;
  }

  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    carea = _ref[_i];
    if (carea.attribs['class'] === 'ocr_carea') {
      _results.push(function() {
        var _j, _len2, _ref2, _results2;
        _ref2 = carea.children;
        _results2 = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          line = _ref2[_j];
          if (line.attribs['class'] === 'ocr_par') {
            if (line.children) {
              _results2.push(this.processPar(line.children, this.result.length - 1));
            } else {
              _results2.push(void 0);
            }
          }
        }

        page.text = this.textBody;
        return _results2;
      }.call(this));
    }
  }

  return _results;
};

Hocr.prototype.processBody = function(dom) {
  var elem, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = dom.length; _i < _len; _i++) {
    elem = dom[_i];
    if (elem.attribs['class'] === 'ocr_page') {
      _results.push(this.processPage(elem));
    }
  }
  return _results;
};

Hocr.prototype.processHtml = function(dom) {
  var elem, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = dom.length; _i < _len; _i++) {
    elem = dom[_i];
    if (elem.name === 'body') {
      _results.push(this.processBody(elem.children));
    }
  }
  _results.text = this.textBody;
  return _results;
};

Hocr.prototype.toJSON = function(dom) {
  var elem, _i, _len, _results;
  _results = [];

  for (_i = 0, _len = dom.length; _i < _len; _i++) {
    elem = dom[_i];
    if (elem.name === 'html') {
      _results.push(this.processHtml(elem.children));
    }
  }
  return _results;
};

Hocr.prototype.parse = function() {
  var handler, parser, that;
  that = this;
  handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error) {
      return that.callback(error, false);
    } else {
      that.toJSON(dom);
      return that.callback(false, that.result);
    }
  }, {
    verbose: false,
    ignoreWhitespace: true
  });
  parser = new htmlparser.Parser(handler);
  return parser.parseComplete(this.html);
};

module.exports = Hocr;
