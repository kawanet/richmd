const path = require('path');
const ROOT_DIR = __dirname;
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const ENTRY_FILE = path.resolve(SRC_DIR, 'index.js');
const OUT_FILENAME = 'index.js';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const app = {
  mode: 'development',
  entry: ENTRY_FILE,
  output: {
    path: DIST_DIR,
    filename: OUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 
          { 
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, 
          'css-loader'
        ],
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader',
        options: {
          limit: 10000
        } 
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.css' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = app;
