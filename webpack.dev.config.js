const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, 'src');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  debug: true,
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

  cache: true,
  devtool: 'module-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]

};
