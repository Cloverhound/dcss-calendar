const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
      CleanWebpackPlugin = require('clean-webpack-plugin');
      webpackDashboard = require('webpack-dashboard/plugin');

module.exports = {
  entry: {
    app: ['./src/app/index.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '/js/[name].bundle.js',
    publicPath: '/',
  },
  watch: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  devServer: {
    hot: true
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: 'source-map-loader',
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
    }),
    new webpackDashboard(),
  ],
};
