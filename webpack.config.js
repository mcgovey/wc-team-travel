const path = require('path');
const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  entry: {
    app: resolve('./src/index.js')
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  node: {
    fs: "empty"
 }
}
