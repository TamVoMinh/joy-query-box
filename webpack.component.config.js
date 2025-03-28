const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/components/QueryBox/index.ts',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      name: 'joy-query-box',
      type: 'umd',
      umdNamedDefine: true
    },
    globalObject: 'this'
  },
  optimization: {
    minimize: true
  }
};
