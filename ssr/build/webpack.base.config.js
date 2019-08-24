const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.jsx?$/,
      //   exclude: path.join(__dirname, '../node_modules'),
      //   loader: "eslint-loader"
      // },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        exclude: path.join(__dirname, '../node_modules'),
        loader: 'babel-loader'
      }
    ]
  }  
}
