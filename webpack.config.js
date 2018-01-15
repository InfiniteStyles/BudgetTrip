const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client/prod',
  entry: ['webpack-hot-middleware/client?reload=true', './index.jsx'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators', 'transform-class-properties'],
        },
      },
    ],
  },
  output: {
    path: __dirname + '/client/dist',
    filename: 'budgetTripBundle.min.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devtool: 'cheap-eval-source-map',
};
