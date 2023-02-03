/* eslint-disable */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	devtool: 'source-map',
	optimization: {
		usedExports: true,
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '..', 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						// disable type checker - we will use it in fork plugin
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.(scss|css)$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|mp3)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: '../ui-kit/src/assets/rps-favicon.png'
		}),
		new ForkTsCheckerWebpackPlugin(),
	],
};
