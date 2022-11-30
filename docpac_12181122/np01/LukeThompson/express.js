const { render } = require('ejs');
var express = require('express');
var app = express();
app.set("view engine", "ejs");
const fs = require("fs");
fs.readFile('users.json', function (err, data) {
    // Validate the data
    if (err) {
        console.log(err);
    }
    else {
        // Convert raw bytes into JS object with JSON.parse()
        var parsedData = JSON.parse(data);
        //console.log(parsedData);
        //console.log(parsedData.users[0].name);
    }
});

app.get("/", function(req, res) {
    res.render("index")
});
/*app.get("/about", function(req, res) {
    res.render("about")
});*/
app.listen(3000); 
console.log("Server is listening on port 3000");
