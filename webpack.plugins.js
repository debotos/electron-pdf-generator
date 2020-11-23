const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// fork-ts-checker-webpack-plugin will run the typescript type checker in a separate process significantly increasing build time.
module.exports = [
	new CopyWebpackPlugin({
		patterns: [{ from: 'public', to: '../public' }],
	}),
	new ForkTsCheckerWebpackPlugin(),
]
