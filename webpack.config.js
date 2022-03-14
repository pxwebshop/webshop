const path = require('path');
const uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production', //development, production
	cache: true,
	entry: {
		'bundle': './dev/js/main.js'
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'root/assets/js')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	resolve: {
		extensions: ['.js']
	},
	plugins: [
		new uglifyjs({
			sourceMap: false,
			uglifyOptions: {
				mangle: false,
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		})
	],
	devtool: 'source-map'
};
