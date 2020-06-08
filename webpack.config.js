
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const merge = require('webpack-merge');

const configs = [
  {
    target: 'web',
    entry: './src/debugGraphScript.ts',
  },
  {
    target: 'node',
    entry: './src/extension.ts',
  }
];

module.exports = configs.map(config => merge(config, {
  output: {
    filename: stripExtensions(config.entry) + '.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  externals: {
    'vscode': 'commonjs vscode',
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, loader: "ts-loader", options: { transpileOnly: true } },
      { test: /\.m?js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
}));


function stripExtensions(filepath) {
  const basename = path.basename(filepath);
  const i = basename.indexOf('.');
  if (i === -1) {
    return basename;
  }
  if (i === 1) {
    return basename.substring(1);
  }
  return basename.substring(0, i);
}

