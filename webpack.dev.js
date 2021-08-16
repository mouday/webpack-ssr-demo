const path = require('path');
//引入webpack-merge插件进行合并
const { merge } = require('webpack-merge');
//引入webpack.base.conf.js文件
const baseConfig = require('./webpack.config');

function resolve(dirname) {
  return path.resolve(__dirname, dirname);
}

// 监听变化的文件夹
const watchDirnames = ['app', 'config'];

//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports = merge(baseConfig, {
  //模块参数
  mode: 'development',

  devServer: {
    // 将产生的文件写入硬盘
    writeToDisk: (filePath) => {
      return /\.html$/.test(filePath);
    },

    port: '8383',
    // liveReload: true,
    open: true,
    
    contentBase: 'dist',
    // watchContentBase: true,

    // 监控文件变化, 不好使，ignored排除不掉
    // watchOptions: {
    //   aggregateTimeout: 600,
    //   poll: false,
    //   ignored: [
    //     'node_modules/**',
    //     'runtime/**',
    //     'runtime/**/*.log',
    //     'vendor/**',
    //   ],
    // },
  },

  //启用source-map方便调试
  devtool: 'eval-cheap-module-source-map',
  // plugins: [],
});
