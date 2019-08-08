const path = require('path');
const HTMLplugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public'
	},
	mode: 'development',
	module: {
		rules: [
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
	},
	plugins: [
		new HTMLplugin({
			template: path.join(__dirname, '../client/template.html')
		})
	]
}