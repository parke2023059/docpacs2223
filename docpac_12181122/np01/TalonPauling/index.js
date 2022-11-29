const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser= require("body-parser")
var parsedData = ''
app.use( bodyParser.urlencoded( {extended: true} ) );

dataAltName = fs.readFileSync('data.json')
parsedData = JSON.parse(dataAltName);
console.log(parsedData);
console.log(parsedData.users[0].name)

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { users: parsedData.users });
});

app.post('/', function (req, res) {
    parsedData.users.push({name:req.body.name, id: parsedData.users.length})
    fs.writeFileSync("data.json",JSON.stringify(parsedData))
    res.redirect("/")
});

app.listen(3000);
console.log('Server is listening on port 3000');