// Variable setup
const fs = require('fs')
const ejs = require('ejs')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}));

var data = JSON.parse(fs.readFileSync('userlist,json'));

// Setting EJS as my view engine
app.set('view engine', 'ejs')

// Get endpoint. Renders an EJS file, and 
app.get('/', (req, res) => {
    ejs.render('home.ejs')

});