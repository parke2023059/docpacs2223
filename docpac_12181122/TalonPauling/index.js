const fs = require('fs');
const express = require('express');
const app = express();
var parsedData = ''


dataAltName = fs.readFileSync('data.json')
parsedData = JSON.parse(dataAltName);
console.log(parsedData);
console.log(parsedData.users[0].name)



// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('index', { users: parsedData.users });
});

app.listen(3000);
console.log('Server is listening on port 3000');