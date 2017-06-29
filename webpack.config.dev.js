const { clientBaseConfig, nodeBaseConfig } = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const devConfig = {
  cache: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};
const clientConfig = webpackMerge(clientBaseConfig, devConfig);
const nodeConfig = webpackMerge(nodeBaseConfig, devConfig);

module.exports = [clientConfig, nodeConfig];
