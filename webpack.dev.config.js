const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    Comments: './comments.js',
    test: './test.js',
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].browser.js',
    publicPath: '/dist/',
    libraryTarget: 'var',
    library: "[name]",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /^node_mocules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    contentBase: './',
  },
}
