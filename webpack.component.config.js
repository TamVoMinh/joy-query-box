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
  },

  
  output: {
    path: path.join(__dirname, ''),
    filename: 'index.js',
    library: 'joy-query-box',
    libraryTarget: 'commonjs2'
  },
}

module.exports = config;
