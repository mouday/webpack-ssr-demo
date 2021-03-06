const { merge } = require('webpack-merge');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const path = require('path');

// DeprecationWarning
// const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// DeprecationWarning
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'production',

  optimization: {
    // runtimeChunk: {
    //   name: 'runtime',
    // },

    // splitChunks: {

    // },

    runtimeChunk: 'single',

    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },

    minimizer: [
      //压缩CSS代码
      // new OptimizeCss(),
      new CssMinimizerPlugin(),

      //压缩js代码
      // new UglifyJsPlugin({
      //   //启用文件缓存
      //   cache: true,
      //   //使用多线程并行运行提高构建速度
      //   parallel: true,
      //   //使用 SourceMaps 将错误信息的位置映射到模块
      //   // sourceMap: true,
      // }),
      new TerserPlugin(),
    ],
  },

  plugins: [
    // new CleanWebpackPlugin(),
    //使用插件定义全局变量DEV
    // new webpack.DefinePlugin({
    //     DEV: JSON.stringify('production')
    // })
    // new CopyPlugin({
    //   patterns: [{ from: 'dist/*', to: 'public/static/dist/*' }],
    // }),
  ],
});
