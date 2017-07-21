const path = require('path')

module.exports = function (env) {
  return {
    context: path.join(__dirname, 'src'),
    entry: './gitment.js',
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: (env&&env.production)?'gitment.browser.min.js':'gitment.browser.js',
      libraryTarget: 'var',
      library: 'Gitment',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
      ],
    },
  }
};
