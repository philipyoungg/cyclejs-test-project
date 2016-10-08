/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');


const PATH = {
  SRC: path.join(__dirname, 'src/'),
  DEST: path.join(__dirname, 'dist/'),
};

const config = {
  entry: PATH.SRC,

  output: {
    path: PATH.DEST,
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  devServer: {
    contentBase: PATH.DEST,
    inline: true,
  },

  module: {
    loaders: [{
      test: /\.js?$/,
      include: PATH.SRC,
      loaders: ['babel'],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    // new NpmInstallPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = config;
