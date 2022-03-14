const favicon = './assets/logo.png';
module.exports = {
	pages: [
		{
			name: 'pagedoc',
			filename: 'index.html',
			template: './pagedoc/index.ejs',
			chunks: ['pagedoc'],
			favicon: favicon,
		},
		{
			name: 'pageabout',
			filename: 'about.html',
			template: './pageabout/index.ejs',
			chunks: ['pageabout'],
			favicon: favicon,
		},
		{
			name: 'pagednd',
			filename: 'dnd.html',
			template: './pagednd/index.ejs',
			chunks: ['pagednd'],
			favicon: favicon,
		},
	],
};
