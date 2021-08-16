var glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取指定路径下的入口文件
function getEntries(globPath) {
  var files = glob.sync(globPath),
    entries = {};

  // console.log(files);

  files.forEach(function (filepath) {
    // 文件夹名称作为入口文件
    var split = filepath.split('/');
    let name = split[split.length - 2];
    entries[name] = filepath;
  });

  return entries;
}

function getHtmlWebpackPlugins(entries) {
  let plugins = [];

  for (let [key, value] of Object.entries(entries)) {
    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
      // 生成出来的html文件名
      filename: 'views/' + key + '.html',
      // 每个html的模版，这里多个页面使用同一个模版
      template: value.replace('js', 'html'),
      // 自动将引用插入html
      inject: true,
      hash: true,
      publicPath: process.env.NODE_ENV !== 'production' ? 'http://localhost:8383': '/static',
      scriptLoading: 'blocking',
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: ['common', key],
      // alwaysWriteToDisk: true
    });
    // webpackConfig.plugins.push(plugin);
    plugins.push(plugin);
  }

  return plugins;
}

module.exports = { getEntries, getHtmlWebpackPlugins };
