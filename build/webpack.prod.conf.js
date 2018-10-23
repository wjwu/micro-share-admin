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
    vue: 'Vue',
    'element-ui': 'ELEMENT',
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
        NODE_ENV: '"production"',
        API_HOST: '"http://web.j-coder.com"'
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
          entry: 'http://static.fangzhoubuluo.com/js/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'http://static.fangzhoubuluo.com/js/element-ui-index.js'
        },
        {
          module: 'axios',
          entry: 'http://static.fangzhoubuluo.com/js/axios.min.js'
        }
      ],
      files: ['login.html']
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'http://static.fangzhoubuluo.com/js/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'http://static.fangzhoubuluo.com/js/element-ui-index.js'
        },
        {
          module: 'vue-router',
          entry: 'http://static.fangzhoubuluo.com/js/vue-router.min.js'
        },
        {
          module: 'vuex',
          entry: 'http://static.fangzhoubuluo.com/js/vuex.min.js'
        },
        {
          module: 'axios',
          entry: 'http://static.fangzhoubuluo.com/js/axios.min.js'
        },
        {
          module: 'lodash',
          entry: 'http://static.fangzhoubuluo.com/js/lodash.min.js'
        },
        // {
        //   module: 'ckeditor',
        //   entry: {
        //     path: 'ckeditor.js',
        //     cwpPatternConfig: {
        //       context: path.resolve(__dirname, '../src/common/lib')
        //     }
        //   }
        // }
      ],
      files: ['index.html']
    })
  ]
});

module.exports = config;
