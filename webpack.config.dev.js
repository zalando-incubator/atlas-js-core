const { clientBaseConfig, nodeBaseConfig } = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const devConfig = {
  debug: true,
  cache: true,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
};
const clientConfig = webpackMerge(clientBaseConfig, devConfig);
const nodeConfig = webpackMerge(nodeBaseConfig, devConfig);

module.exports = [clientConfig, nodeConfig];
