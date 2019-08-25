const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLplugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.config.js')

const isDev = process.env.NODE_ENV==='development'

const config = webpackMerge(baseConfig, {
	entry: {
		app:[
			'react-hot-loader/patch', 
			path.join(__dirname, '../client/index.js')
		]
		},
	output: {
		filename: '[name].[hash].js',
	},
  mode: 'production',
	plugins: [
		new HTMLplugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
})

if(isDev) {
	config.mode = 'development';
	config.devServer = {
		host: '0.0.0.0',
		port: '8888',
		contentBase: path.join(__dirname, '../dist'),
		publicPath: '/public/',
		historyApiFallback: {
			index: '/public/index.html'
		},
		hot: true,
		overlay: {
      errors: true
    }
	};
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config
