//
// var HtmlWebpackPlugin = require('html-webpack-plugin')
// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/src/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });
//
// const path = require('path');
// const webpack = require('webpack');
// module.exports = {
//   context: path.resolve(__dirname, './src'),
//   entry: {
//     app: './app.js',
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].bundle.js',
//   },
//   module:{
//     rules:[
//       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
//       {test: /\.(jpg|png)$/, loader: "file-loader"},
//       {
//         test: /\.(sass|scss)$/,
//         use: [
//           'style-loader',
//           {
//             loader:'css-loader',
//             options: {
//               modules: true,
//               localIdentName: '[name]__[local]__[hash:base64:5]'
//             }
//           },
//           'sass-loader',
//         ]
//       }
//     ]
//   },
//   plugins: [HTMLWebpackPluginConfig]
// };

'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'webapp/app.js')
  ],
  output: {
    path: path.join(__dirname, '/webapp/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'webapp/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015"]
      }
    },{test: /\.(jpg|png)$/, loader: "file-loader"},
    {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        {
          loader:'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        },
        'sass-loader',
      ]
    }]
  }
};
