const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const RelayCompilerWebpackPlugin = require('relay-compiler-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client', './src/index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  target: 'web',
  plugins: [
    new ReactRefreshWebpackPlugin(),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new RelayCompilerWebpackPlugin({
    //  schema: path.resolve(__dirname, './schema/schema.graphql'),
    //  src: path.resolve(__dirname, './src'),
    //  extensions: ['js', 'jsx'],
    //}),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: true,
      hash: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 15000,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                'relay',
                '@babel/plugin-proposal-function-bind',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-arrow-functions',
                '@babel/plugin-transform-runtime',
                '@babel/plugin-transform-modules-commonjs',
                'react-refresh/babel',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
