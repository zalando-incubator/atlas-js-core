const clientBaseConfig = require('./webpack.config.base').clientBaseConfig;
const nodeBaseConfig = require('./webpack.config.base').nodeBaseConfig;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prodConfig = {
  cache: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      sourceMap: false
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
const clientConfig = webpackMerge(clientBaseConfig, prodConfig);
const nodeConfig = webpackMerge(nodeBaseConfig, prodConfig);

module.exports = [clientConfig, nodeConfig];
