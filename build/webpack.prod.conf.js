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
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/index.js'
        },
        {
          module: 'axios',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'
        }
      ],
      files: ['login.html']
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.runtime.min.js'
        },
        {
          module: 'element-ui',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.7/index.js'
        },
        {
          module: 'vue-router',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js'
        },
        {
          module: 'vuex',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.0.1/vuex.min.js'
        },
        {
          module: 'axios',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js'
        },
        {
          module: 'lodash',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js'
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
