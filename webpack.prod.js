
const configs = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = configs.map(config => merge(config, {
  mode: 'production',
}));

