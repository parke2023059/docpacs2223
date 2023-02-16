const ejs = require('ejs');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./static'))

app.get('/', (req, res) => {
	res.render('tableEntry');
})





const port = 4000
app.listen(port, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Running on port ${port}`);
	}
});