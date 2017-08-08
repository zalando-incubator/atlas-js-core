const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const srcPath = path.join(__dirname, 'src');

const baseConfig = {
  entry: [path.join(srcPath, 'index.js')],
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'AtlasSDK',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      models: path.join(srcPath, 'models')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: srcPath,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          'eslint-loader'
        ]
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: srcPath,
        options: {
          plugins: [
            'syntax-dynamic-import'
          ]
        }
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
