const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractCSS = new ExtractTextPlugin({
  filename: 'bundle.css',
  allChunks: true
});

const ExtractCSV = new ExtractTextPlugin({
  filename: 'data.csv',
  allChunks: true
})

module.exports = {
  context: __dirname,
  entry: ['./app.js'],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    ExtractCSS,
    ExtractCSV,
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: [path.resolve('src/js')]
      },
      {
        test: /\.css$/,
        loader: ExtractCSS.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractCSS.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.csv$/,
        loader: ExtractCSV.extract(['raw-loader'])
      }
    ]
  }
};
