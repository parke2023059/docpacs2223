const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

var PORT = 4000;

app.set('view engine', 'ejs')

var server = app.listen(PORT, function() {
    console.log("Server is running on port:" + PORT)
});

var userData = JSON.parse(fs.readFileSync('users.json'));

app.get('/', (req, res) => {
    res.render('index', { ejsData: userData});
});

app.post('/update', (req, res) => {
    let newOrder = {
        id: userData.lastOrder++,
        name: req.body.name,
        items: []
    }
    userData.orders.push(newOrder);
    fs.writeFileSync('users.json', JSON.stringify(userData))
    res.send('it wurked')
});

var jsonData = '{"name":"Phil","id":"9"}';

var jsonObj = JSON.parse(jsonData);
 
var jsonContent = JSON.stringify(jsonObj);

fs.writeFile("phil.json", jsonContent, 'utf8', function (err) {
    if (err) {
    console.log(err);
    }
    console.log("JSON file has been saved.");
});

fs.readFile('users.json', function (err, data) {
    if (err) {
     console.log(err);
    } else {
     var parseData = JSON.parse(data);
     console.log(parseData)
 }
});

