const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devServer: {
    static: './dist',
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
  },
};