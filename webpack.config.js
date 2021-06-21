const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  // Default config
  mode: 'development',
  entry: './src/scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  // Modified config
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To-Do App',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }],
    }),
  ],
  devtool: 'source-map', // Maps output code to input (debug purposes)
  module: {
    rules: [
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
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
