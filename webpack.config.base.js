import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import pageSettings from './webpack.config.base.page.js';
const entry = {};
const plugins = [
	new MiniCssExtractPlugin({
		filename: '[name].min.css',
		chunkFilename: '[id].css',
	}),
];

pageSettings.pages.forEach((page) => {
	entry[page.name] = {
		import: `./${page.name}/src/js/index.js`,
	};
	plugins.push(new HtmlWebpackPlugin(page));
});

export default (env) => {
	return {
		entry: entry,
		module: {
			rules: [
				{
					test: /\.(woff2?|ttf|eot)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'font.[name][ext]',
					},
				},
				{
					test: /\.(svg|png|jpe?g|gif|ico|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'img.[name][ext]',
					},
				},
				{
					test: /\.scss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.m?js$/i,
					include: path.resolve(__dirname, 'src'),
					loader: 'babel-loader',
				},
				{
					test: /\.html$/i,
					loader: 'html-loader',
					options: {
						sources: {
							list: [
								'...',
								{
									tag: 'img',
									attribute: 'data-src',
									type: 'src',
								},
							],
						},
					},
				},
			],
		},
		plugins: plugins,
	};
};
