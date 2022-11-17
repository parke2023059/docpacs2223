const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

var parsedData = '';

// This is how you read files synchronously
var data = fs.readFileSync('users.json');
// Convert buffer to Js object
var parsedData = JSON.parse(data);

app.get('/', (request, response) => {
	response.render('users', { users: parsedData.users })
})

app.post('/update', (request, response) => {
	if (request.body.name) {
		console.log({ name: request.body.name, id: parsedData.users.length - 1 });
		parsedData.users.push({ name: request.body.name, id: parsedData.users.length })
		let json = JSON.stringify(parsedData)
		fs.writeFileSync('users.json', json)
		response.redirect('/')
	} else response.send('you need to add a name')
})


app.listen(3000);