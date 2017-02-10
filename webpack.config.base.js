const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const srcPath = path.join(__dirname, 'src');

const baseConfig = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'AtlasSDK',
    umdNamedDefine: 'atlas_sdk'
  },
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

  devtool: 'module-source-map',
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/iconv-loader$/, 'node-noop')
  ]
};

const clientBaseConfig = webpackMerge(baseConfig, {
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

const nodeBaseConfig = webpackMerge(baseConfig, {
  target: 'node',
  output: {
    filename: 'index.node.js'
  }
});

module.exports = { clientBaseConfig, nodeBaseConfig };
