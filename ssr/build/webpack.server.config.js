const path = require('path');

module.exports = {
	target: 'node',
	entry: {
		app: path.join(__dirname, '../client/server-entry.js')
	},
	output: {
		filename: 'server-entry.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/public',
		libraryTarget: 'commonjs2'
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
	}
}