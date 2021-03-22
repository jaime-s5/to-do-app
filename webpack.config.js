const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  // Default config
  mode: 'development',
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    contentBase: './build',
  },
  // Modified config
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To-Do App',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  devtool: 'source-map', // Maps output code to input (debug purposes)
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|build)/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
