var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var dist = path.join(__dirname, '..', 'dist');

var config = merge(baseConfig, {
  output: {
    path: dist,
    filename: '[name].[hash:8].js',
    publicPath: './'
  },
  externals: {
    axios: 'axios',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    lodash: '_'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            unused: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin('./dist', {
      root: path.join(__dirname, '..'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.bootcss.com/vue/2.5.13/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'https://cdn.bootcss.com/element-ui/2.0.11/index.js'
        },
        {
          module: 'axios',
          entry: 'https://cdn.bootcss.com/axios/0.17.1/axios.min.js'
        }
      ],
      files: ['login.html']
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.bootcss.com/vue/2.5.13/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'https://cdn.bootcss.com/element-ui/2.0.11/index.js'
        },
        {
          module: 'vue-router',
          entry: 'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js'
        },
        {
          module: 'vuex',
          entry: 'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js'
        },
        {
          module: 'axios',
          entry: 'https://cdn.bootcss.com/axios/0.17.1/axios.min.js'
        },
        {
          module: 'lodash',
          entry: 'https://cdn.bootcss.com/lodash.js/4.17.9/lodash.min.js'
        },
        {
          module: 'ckeditor',
          entry: {
            path: 'ckeditor.js',
            cwpPatternConfig: {
              context: path.resolve(__dirname, '../src/common/lib')
            }
          }
        }
      ],
      files: ['index.html']
    })
  ]
});

module.exports = config;
