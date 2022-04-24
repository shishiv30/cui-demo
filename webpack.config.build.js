import baseConfig from './webpack.config.base.js';
import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer').BundleAnalyzerPlugi;
import WebpackPwaManifest from 'webpack-pwa-manifest';
import WorkboxPlugin from 'workbox-webpack-plugin';

export default (env) => {
	const publicPath = env.production
		? 'https://shishiv30.github.io/cui-demo/'
		: 'http://localhost:8080/';
	var config = baseConfig(env);
	return merge(config, {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js',
			publicPath: publicPath,
			clean: true,
		},
		recordsPath: path.join(__dirname, 'records.json'),
		optimization: {
			splitChunks: {
				chunks: 'all',
			},
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			// new WorkboxPlugin.GenerateSW({
			// 	exclude: [/\.(?:png|jpg|jpeg|svg)$/],
			// 	clientsClaim: true,
			// 	skipWaiting: true,
			// }),
			//todo https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin  InjectManifest  vs webpack-pwa-manifest  https://www.youtube.com/watch?v=e-fgUJ4Qcf0
			new WebpackPwaManifest({
				name: 'CUI',
				short_name: 'CUI framework',
				description: 'UI solution base on jQuery and CUI.',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				start_url: publicPath + 'index.html',
				icons: [
					{
						src: path.resolve('./assets/logo.png'),
						sizes: [48, 96, 192, 256, 384, 512],
						purpose: 'any maskable',
					},
				],
			}),
			new WorkboxPlugin.InjectManifest({
				swSrc: './sw.js',
			}),
		],
	});
};
