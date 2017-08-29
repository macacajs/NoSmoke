'use strict';

const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'assets', 'index')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'index.js'
  },
  node: {
    fs: 'empty'
  },
  externals: {
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      }, {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
