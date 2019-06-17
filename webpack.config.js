const clientBaseConfig = require('./webpack.config.base').clientBaseConfig;
const nodeBaseConfig = require('./webpack.config.base').nodeBaseConfig;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin-legacy');

const prodConfig = {
  cache: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false
        },
        compress: {
          warnings: false,
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
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
const clientConfig = webpackMerge(clientBaseConfig, prodConfig);
const nodeConfig = webpackMerge(nodeBaseConfig, prodConfig);

module.exports = [clientConfig, nodeConfig];
