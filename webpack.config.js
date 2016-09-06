/* Customize these */
var outputPath = './static';
var inputPath = './frontend/';

/* Webpack dependencies */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// Add an entry here for each unique page to keep things separated
	entry: {
		global: inputPath + 'global.ts',
		index: inputPath + 'index/index.ts',
		about: inputPath + 'about/about.ts',
	},
	// Output everything into the app's static/ directory as individual files
	output: {
		filename: '[name].js',
		path: outputPath
	},
	// Generate source maps
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss']
	},
	plugins: [
		// Uglify resulting JS files
		new webpack.optimize.UglifyJsPlugin(),
		// This will extract processed, inlined `scss` files into separate `css` files
		new ExtractTextPlugin('[name].css')
	],
	module: {
		loaders: [
			// Handle TypeScript
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			},
			// Handle SCSS
			{
				test: /\.scss$/,
				// `?sourceMap` tells sass-loader to output source maps for each css file
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap')
			}
		]
	},
	// sass-loader settings
	sassLoader: {
		outputStyle: "compressed",
		outFile: outputPath
	}
}