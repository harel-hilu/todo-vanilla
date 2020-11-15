const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, '../../server/newServer/public'),
  },
};