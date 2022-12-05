const express = require('express');
const port = 8000
const app = express()
const path = require('path');
const ejs = require('ejs');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Hello World'
    });
})

app.listen(8000)