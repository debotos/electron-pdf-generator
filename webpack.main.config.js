/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

function srcPaths(src) {
	return path.join(__dirname, src)
}

module.exports = {
	/**
	 * This is the main entry point for your application, it's the first file
	 * that runs in the main process.
	 */
	mode: 'development',
	devtool: 'source-map',
	target: 'electron-main',
	entry: ['react-hot-loader/patch', './src/main/index.ts'],
	// Put your normal webpack config below here
	module: {
		rules: require('./webpack.rules'),
	},
	resolve: {
		alias: {
			'@': srcPaths('src'),
			'@main': srcPaths('src/main'),
			'@renderer': srcPaths('src/renderer'),
			'@assets': srcPaths('./src/assets'),
			'@utils': srcPaths('./src/utils'),
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
	},
}
