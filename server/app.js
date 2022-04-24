import express from 'express';
import compression from 'compression';
import cms from './router/cms.js';
const app = express();

app.use('/cms', cms);
app.use(compression());
app.use(express.static('dist'));

// Serve the files on port 8080.
app.listen(8080, function () {
	console.log('Example app listening on port http://localhost:8080');
});
