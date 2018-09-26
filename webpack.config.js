const path = require('path');

/**
 * Webpack Plugins
 */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader',
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../'
            // },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new WebpackMd5Hash(),
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
    new CopyWebpackPlugin([
      { from: './src/assets', to: './assets/' },
    ], {
      debug: isDev,
      ignore: ['*.tsx?', '*.css'],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: './src/serviceWorker.js',
    }),
  ],
};
