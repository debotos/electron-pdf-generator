/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

function srcPaths(src) {
	return path.join(__dirname, src)
}

module.exports = {
	module: { rules },
	plugins: plugins,
	devtool: 'source-map',
	mode: 'development',
	target: 'electron-renderer',
	resolve: {
		alias: {
			'@': srcPaths('src'),
			'@main': srcPaths('src/main'),
			'@assets': srcPaths('./src/assets'),
			'@utils': srcPaths('./src/utils'),
			'@renderer': srcPaths('src/renderer'),
			'@app': srcPaths('./src/renderer/app'),
			'@components': srcPaths('./src/renderer/components'),
			'@screens': srcPaths('./src/renderer/screens'),
			'react-dom': '@hot-loader/react-dom',
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
	},
}
