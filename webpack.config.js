const path = require('path')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './comments.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'comments.browser.js',
    libraryTarget: 'var',
    library: 'Comments',
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
}
