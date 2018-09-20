var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var src = path.join(__dirname, '..', 'src');
var resolve = function(dir) {
  return path.join(__dirname, '..', dir);
};

module.exports = {
  entry: {
    app: './src/app/index.js',
    login: './src/login/index.js',
    nav: './src/nav/index.js'
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
        include: [src, resolve('node_modules/element-ui/packages')]
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
    }),
    new HtmlWebpackPlugin({
      filename: 'app.html',
      template: './src/nav/index.html',
      inject: 'body',
      chunks: ['nav']
    }),
    new CopyWebpackPlugin([
      { from: './src/common/lib/ckeditor', to: './vendor/ckeditor' }
    ])
  ],
  resolve: {
    extensions: ['.js', '.vue']
  }
};
