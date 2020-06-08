
const merge = require('webpack-merge');
const configs = require('./webpack.config');

module.exports = configs.map(config => merge(config, {
  mode: 'development',
  devtool: 'source-map',
}));

