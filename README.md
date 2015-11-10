# learn_webpack
It is introduced how to set webpack up on your projects.

## 0. Paths
I recommend the file paths to do webpack.
```file
- app
- gulpfile.js
- webpack.config.js
- package.json
- index.html
```

## 1. webpack.config.js
Let's start to set it up.
```javascript
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
    // The directory (absolute path) that contains your modules. May also be an array of directories. 
    // This setting should be used to add individual directories to the search path.
    root: app 
  },
  plugins: [
    // Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running -
    // without a page reload.
    new webpack.HotModuleReplacementPlugin(), 
    // vendor chunk to vendor.js. If it wasn't, you will get a conflict error between app and vendor.
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity), 
    new webpack.optimize.UglifyJsPlugin() // To minimise your scripts.
  ]
};

module.exports = config;
```

## 2. gulpfile.js
Webpack is implemented with gulp.
```javascript
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack-dev-server', function (callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  new WebpackDevServer(webpack(myConfig), {
    contentBase: './',  // it is a base path.
    publicPath: '/assets/', // it is a path of assets.
    // below is for log on command by gulp.
    stats: {
      hot: true,
      colors: true
    }
  }).listen(9000, 'localhost', function (err) { // port, host, callback
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:9000/webpack-dev-server/index.html'); // it is a just gulp's log.
  });
});
gulp.task('default', ['webpack-dev-server']);
```

## 3. Developing by the developer mode.
You can develop with gulp on developer mode. 
```terminal
gulp
```

## 4. Getting a assets by webpack.
You can get assets for the real server by webpack command.
```terminal
webpack
```
