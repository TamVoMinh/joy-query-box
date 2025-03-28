var path = require('path');
var webpack = require('webpack');
var _ = require("lodash");

var config =  {
  devtool: 'source-map',
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.pegjs$/i,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
   externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    'ace-builds': {
      root: 'ace-builds',
      commonjs: 'ace-builds',
      commonjs2: 'ace-builds',
      amd: 'ace-builds',
    },
    'brace': {
      root: 'brace',
      commonjs: 'brace',
      commonjs2: 'brace',
      amd: 'brace',
    },
    'pegjs': {
      root: 'pegjs',
      commonjs: 'pegjs',
      commonjs2: 'pegjs',
      amd: 'pegjs',
    }
  },

  optimization: {
    minimize: true
  },
  stats: {
    all: true,
    modules: true,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  },
  output: {
    path: path.join(__dirname, '.'),
    filename: 'index.js',
    library: 'joy-query-box',
    libraryTarget: 'commonjs2'
  },
}

module.exports = config;
