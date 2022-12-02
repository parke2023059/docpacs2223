const fs = require('fs')
const ejs = require('ejs')
var express = require('express')
var bodyParser = require("body-parser")
const path = require('path')
var app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
var data = fs.readFileSync("users.json")
var parsedData = JSON.parse(data)
var length = Object.keys(parsedData.users).length





app.get('/', function(req, res) {
    data = fs.readFileSync("users.json")
    parsedData = JSON.parse(data)
    length = parsedData.users.length
    

    res.render('index.ejs', {
        user: parsedData.users
    })
})

app.post('/update', function(req, res) {
    var name = req.body.name
    var id = JSON.stringify(length)
    userObjects = {name: name, id: id}
    if (userObjects.name) {
        var data = fs.readFileSync('users.json')
        var users = JSON.parse(data)
        users['users'].push(userObjects)
        var users = JSON.stringify(users)
        fs.writeFile('users.json', users, 'utf-8', function() {
            console.log('File written')
        })
        res.redirect('/')
    } else {
        res.send("user's name is missing")
    }
    
    
})



app.listen(3000, function() {
    console.log("Listening on port 3000")
})