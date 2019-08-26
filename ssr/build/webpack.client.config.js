const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLplugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.config.js')

const isDev = process.env.NODE_ENV === 'development'
const config = webpackMerge(baseConfig, {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/index.js')
    ]
  },
  output: {
    filename: '[name].[hash].js',
  },
  mode: 'production',
  plugins: [
    // HTMLplugin能自己或根据template配置项生成一个html文件，
    // 并自动插入build出来的js文件（路径是output里的publicPath内容）
    new HTMLplugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})
// devServer启动的服务器在文件修改时会自动在内存里重新编译，不用手动build
// hot module replacement能在browser里无刷新的自动更新页面
if (isDev) {
  config.mode = 'development';
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    // 在dist目录下启动服务，没有下面的publicPath会导致index.html里引入的/public/...js会404
    contentBase: path.join(__dirname, '../dist'),
    // publicePath的设置对在server端用proxy代理静态文件很有用
    publicPath: '/public/',
    // 没有historyApiFallback会导致localhost:8888返回404
    historyApiFallback: {
      index: '/public/index.html' // 404的路径都返回这个index
    },
    hot: true,
    // 在browser的页面里显示编译错误
    overlay: {
      errors: true
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
