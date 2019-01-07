const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');
      CleanWebpackPlugin = require('clean-webpack-plugin');
      webpackDashboard = require('webpack-dashboard/plugin');
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');
      ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
      AutoDllPlugin = require('autodll-webpack-plugin');
      SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports = {
  entry: {
    app: ['./src/app/index.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    pathinfo: false
  },
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
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
          experimentalWatchApi: true
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          booleans: false,
          collapse_vars: false,
          comparisons: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: false,
          inline: false,
          join_vars: false,
          keep_infinity: true,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          sequences: false,
          side_effects: false,
          switches: false,
          top_retain: false,
          toplevel: false,
          typeofs: false,
          unused: false,
    
          // Switch off all types of compression except those needed to convince
          // react-devtools that we're using a production build
          conditionals: true,
          dead_code: true,
          evaluate: true,
        },
        mangle: true,
      },
      parallel: true,
      cache: true,
    })],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom'
        ]
      }
    }),
    new webpackDashboard(),
    new ForkTsCheckerWebpackPlugin()
  ],
};
