const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const srcPath = path.join(__dirname, 'src');

const baseConfig = {
  target: 'node',
  entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.node.js',
    libraryTarget: 'umd',
    library: 'AtlasSDK',
    umdNamedDefine: 'atlas_sdk'
  },
  debug: true,
  resolve: {
    extensions: ['', '.js'],
    alias: {
      models: `${srcPath}/models/`
    }
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  cache: true,
  devtool: 'module-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new webpack.NormalModuleReplacementPlugin(/iconv-loader$/, 'node-noop')
  ]

};

const clientConfig = webpackMerge(baseConfig, {
  target: 'web',
  output: {
    filename: 'index.js'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
});

module.exports = [clientConfig, baseConfig];
