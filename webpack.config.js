/* eslint-disable  */

var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'app', 'static'),
    filename: 'bundle.js',
    publicPath: 'static/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname,
    }],
  },
  devServer: {
        // root folder to serve the app
        contentBase: './app',

        publicPath: '/static/',

        // To support html5 router.
        historyApiFallback: false,
        // Suppress boring information.
        noInfo: true,
        // Proxy api to API Server
        proxy: {
            '/api/*': 'http://localhost:3000/',
        },
        // Limit logging
        stats: {
            version: false,
            colors: true,
            chunks: false,
            children: false,
        },
    },
};

