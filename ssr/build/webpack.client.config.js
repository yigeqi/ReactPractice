const path = require('path');
const HTMLplugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV==='development'
const config = {
	entry: {
		app: path.join(__dirname, '../client/app.js')
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public'
	},
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
		overlay: {
      errors: true
    }
	}
}

module.exports = config