'use strict';

const webpack = require('webpack');
const path = require('path');
const webpackUtils = require('./webpack-utils.js');
// console.log(webpackUtils);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const WriteFilePlugin = require('write-file-webpack-plugin');

// 多页面入口
const entries = webpackUtils.getEntries('./src/pages/*/*.js');
const plugins = webpackUtils.getHtmlWebpackPlugins(entries);

console.log(entries);

module.exports = {
  // 打包入口
  entry: entries,

  // 指定输出地址及打包出来的文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true, // 每次构建前清理 /dist 文件夹
    // futureEmitAssets: false
  },
  // 配置引入别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        // 执行的时候是先加载css-loader，将css解析好后再将css传递给style-loader
        use: [
          // MiniCssExtractPlugin.loader,
          // 'style-loader',
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      // less
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          // 'style-loader',
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
          // 引入全局变量
          {
            loader: 'style-resources-loader',
            options: {
              patterns: ['src/style/variables.less'],
            },
          },
        ],
      },

      // sass
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          // 'style-loader',
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg|woff|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 如果图片大小小于这个值，就会被打包为base64格式
              limit: 10 * 1000, // 10 kb
              name: 'imgs/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        // js 需要进行语法转换
        test: /\.js$/, //普通的loader
        //不包括node_modules
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },

      // https://github.com/bazilio91/ejs-compiled-loader
      // https://github.com/tj/ejs
      // https://ejs.bootcss.com/
      // 默认使用的是 lodash template
      // 需要改为 EJS templating engine
      // {
      //   test: /\.html$/,
      //   loader: 'ejs-compiled-loader',
      // },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader',
      // },

      // 解决相对引入模板问题
      // https://github.com/emaphp/underscore-template-loader
      {
        test: /\.html$/,
        loader: 'underscore-template-loader',
      },
    ],
  },

  plugins: [
    ...plugins,

    // new HtmlWebpackHarddiskPlugin(),

    // css抽离
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    // vue
    new VueLoaderPlugin(),

    // 清空dist
    // new CleanWebpackPlugin(),

    // 拷贝模板文件
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'src/components/**/*.html',

    //       // 修改输出路径
    //       to({ context, absoluteFilename }) {
    //         return `views/${path
    //           .relative(context, absoluteFilename)
    //           .replace('src/', '')}`;
    //       },
    //     },
    //   ],
    // }),
    // new WriteFilePlugin({
    //   test: /\.html$/,
    // }),

    // new BundleAnalyzerPlugin()
  ],

  optimization: {},
};
