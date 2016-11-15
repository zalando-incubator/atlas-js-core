const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, 'src');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  debug: false,
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      models: `${srcPath}/models/`
    }
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  module: {
    preLoaders: [{
      test: /\.(js)$/,
      include: srcPath,
      loader: 'eslint-loader'
    }],
    loaders: [
      {
        test: /\.(js)$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      }
    ]
  },

  cache: false,
  devtool: 'module-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]

};
