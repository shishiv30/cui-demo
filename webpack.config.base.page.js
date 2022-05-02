const favicon = './assets/logo.png';
export default {
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
		{
			name: 'pagesurvey',
			filename: 'survey.html',
			template: './pagesurvey/index.ejs',
			chunks: ['pagesurvey'],
			favicon: favicon,
		},
	],
};
