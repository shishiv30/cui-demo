const favicon = './assets/logo.png';
//default names
const pageConfig = {
	pages: [
		{
			name: 'doc',
			filename: 'index.html',
		},
		{
			name: 'about',
		},
		{
			name: 'dnd',
		},
		{
			name: 'survey',
		},
	],
};
pageConfig.pages.forEach((page) => {
	if (page.name) {
		if (!page.entry) {
			page.entry = `./client/${page.name}/src/js/index.js`;
		}
		if (!page.template) {
			page.template = `./client/${page.name}/index.ejs`;
		}
		if (!page.chunks) {
			page.chunks = [page.name];
		}
		if (!page.favicon) {
			page.favicon = favicon;
		}
		if (!page.filename) {
			page.filename = `${page.name}.html`;
		}
	}
});

export default pageConfig;
