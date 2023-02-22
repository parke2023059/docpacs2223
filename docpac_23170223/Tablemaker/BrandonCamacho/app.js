const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('tableEntry');
});

app.post('/', (req, res) => {
    var textarea = req.body.textarea;
    console.log(req.body.textarea);

    if (textarea != '') {
        var tableText = textarea.split('\n');
        console.log(tableText);
        for (var row in tableText) {
            tableText[row] = tableText[row].split(', ');
        }
        console.log(tableText);
        res.render('tableMaker', { Data: tableText });
    } else {
        res.render('error');
    }
});

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Started server on port 3000')
    }
});