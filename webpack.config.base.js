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
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(js)$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['add-module-exports', 'transform-es2015-modules-umd']
          }
        }
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
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
