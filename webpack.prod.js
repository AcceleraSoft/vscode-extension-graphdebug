
const configs = require('./webpack.config');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = configs.map(config => merge(config, {
  mode: 'production',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}));

