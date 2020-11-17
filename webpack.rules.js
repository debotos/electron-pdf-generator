module.exports = [
	// Add support for native node modules
	{
		test: /\.node$/,
		use: 'node-loader',
	},
	{
		test: /\.(m?js|node)$/,
		exclude: /(.webpack|node_modules)/,
		parser: { amd: false },
		use: {
			loader: '@marshallofsound/webpack-asset-relocator-loader',
			options: {
				outputAssetBase: 'native_modules',
			},
		},
	},
	{
		test: /\.tsx?$/,
		exclude: /(node_modules|.webpack)/,
		loaders: [
			{
				loader: 'babel-loader',
			},
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
		],
	},
	{
		test: /\.(scss|css)$/,
		use: ['style-loader', 'css-loader', 'sass-loader'],
	},
	{
		test: /\.(svg|ico|icns)$/,
		loader: 'file-loader',
		options: {
			name: '[path][name].[ext]',
		},
	},
	{
		test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
		loader: 'url-loader',
		options: {
			name: '[path][name].[ext]',
		},
	},
	{
		test: /\.less$/,
		use: [
			{
				loader: 'style-loader',
			},
			{
				loader: 'css-loader', // translates CSS into CommonJS
			},
			{
				loader: 'less-loader', // compiles Less to CSS
				options: {
					lessOptions: {
						// If you are using less-loader@5 please spread the lessOptions to options directly
						modifyVars: {
							/* https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */
							'@font-family':
								"'FiraSans-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'",
							'@primary-color': '#6459F5', // primary color for all components
							'@link-color': '#1890ff', // link color
							'@success-color': '#52c41a', // success state color
							'@warning-color': '#faad14', // warning state color
							'@error-color': '#f5222d', // error state color
							'@font-size-base': '12px', // major text font size
							'@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
							'@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
							'@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
							'@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
							'@border-radius-base': '2px', // major border radius
							'@border-color-base': '#d9d9d9', // major border color
							'@btn-font-weight': 500, // button font weight
							'@box-shadow-base':
								'0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
						},
						javascriptEnabled: true,
					},
				},
			},
		],
	},
]
