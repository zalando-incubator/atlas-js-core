const { clientBaseConfig, nodeBaseConfig } = require('./webpack.config.base');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prodConfig = {
  debug: false,
  cache: false,
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
const clientConfig = webpackMerge(clientBaseConfig, prodConfig);
const nodeConfig = webpackMerge(nodeBaseConfig, prodConfig);

module.exports = [clientConfig, nodeConfig];
