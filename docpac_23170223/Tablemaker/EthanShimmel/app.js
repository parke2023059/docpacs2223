const e = require('express');
const express = require('express');

var app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.render('tableEntry', {

    })
})
app.post('/', (req, res) => {
    if (req.body.csvData) {
        let csvData = req.body.csvData
        if (csvData.includes(',')) {
            csvData = csvData.split('\r\n')
            var csvArray = []
            csvData.forEach(element => {
                csvArray.push(element.split(', '))
            });
            
            console.log(csvArray);
            res.render('tableMaker', {
                data: csvArray
            })
        } else {
            res.render('error', {
                err: "Input text was not valid"
            })
        }
    } else {
        res.render('error', {
            err: "Please enter data"
        })
    }
})


app.listen('4000')