
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const merge = require('webpack-merge');

const configs = [
  {
    target: 'web',
    entry: './src/debugGraph.ts',
  },
  {
    target: 'node',
    entry: './src/extension.ts',
  }
]

module.exports = configs.map(config => merge(config, {
  output: {
    filename: path.basename(config.entry),
    path: path.resolve(__dirname, 'dist'),
  },
  externals: ['vscode'],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", options: { transpileOnly: true } },
      { test: /\.m?js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }
}));

