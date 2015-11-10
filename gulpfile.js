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
    contentBase: './',
    publicPath: '/assets/',
    stats: {
      hot: true,
      colors: true
    }
  }).listen(9000, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:9000/webpack-dev-server/index.html');
  });
});
gulp.task('default', ['webpack-dev-server']);
