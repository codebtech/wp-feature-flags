/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const config = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		index: path.resolve(__dirname, 'src/index.ts'),
		// settings: path.resolve(__dirname, 'src/entry-points/settings.tsx'),
	},
	output: {
		...defaultConfig.output,
		// publicPath: '/wp-content/plugins/tm-wp-desknet/build',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			src: path.resolve(__dirname, 'src'),
		},
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			'.jsx',
			...(defaultConfig.resolve.extensions || []),
		],
	},
};

module.exports = config;
