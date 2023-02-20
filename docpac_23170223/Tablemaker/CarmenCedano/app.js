const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('tableEntry');
});

app.post('/', (req, res) => {
    var textarea = req.body.textarea;
    console.log(textarea);
    if (textarea != '') {
        var tableData = textarea.split('\n');
        console.log(tableData);
        for (let row in tableData) {
            tableData[row] = tableData[row].split(', ');
        }
        console.log(tableData)
        res.render('tableMaker', { Data: tableData } );
    } else {
        res.render("error");
    }
})

app.post('/home', (req, res) => {
    res.render('tableEntry');
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Server started on Port", PORT)
    }
});
