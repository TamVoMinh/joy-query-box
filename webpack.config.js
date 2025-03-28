const webpack = require('webpack');
const publicPath = '/static';
module.exports = {
  mode:'development',
  entry: [
    './src/example/index.jsx',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],
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
  output: {
    path: __dirname + '/build',
    publicPath,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    hot: true,
    open: true, 
    port: 3000,
    static: './src/example/public',
    historyApiFallback: true
  }
};