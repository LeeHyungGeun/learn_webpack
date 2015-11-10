var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');
var dependencies = _.keys(JSON.parse(fs.readFileSync('package.json')).dependencies);

var app = path.join(__dirname + '/app');
var output = path.join(__dirname + '/');
var config = {
  context: app,
  entry: {
    app: ['webpack/hot/dev-server', './entry'],
    vendors: dependencies
  },
  output: {
    path: path.join(output, 'assets'),  // it is an absolute path.
    publicPath: './', // it is a path from the view of html.
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(png|jpg|gif)$/i,
      loader: 'file?name=images/[name].[ext]'
    }, {
      test: /\.html/,
      loader: 'raw'
    }]
  },
  resolve: {  // optional.
    root: app // The directory (absolute path) that contains your modules. May also be an array of directories. This setting should be used to add individual directories to the search path.
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running without a page reload.
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity), // vendor chunk to vendor.js. If it wasn't, you will get a conflict error between app and vendor.
    new webpack.optimize.UglifyJsPlugin() // To minimise your scripts.
  ]
};

module.exports = config;
