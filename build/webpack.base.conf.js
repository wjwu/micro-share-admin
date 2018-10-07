var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var ip = require('ip');

var src = path.join(__dirname, '..', 'src');

module.exports = {
  entry: {
    app: './src/app/index.js',
    login: './src/login/index.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: src,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [src]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [src]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        include: src,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login/index.html',
      inject: 'body',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/app/index.html',
      inject: 'body',
      chunks: ['app']
    })
    // new CopyWebpackPlugin([
    //   { from: './src/common/lib/ckeditor', to: './vendor/ckeditor' }
    // ])
  ],
  resolve: {
    extensions: ['.js', '.vue']
  },
  devServer: {
    host: ip.address()
  }
};
