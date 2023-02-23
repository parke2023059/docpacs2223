const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (request, response) {
    response.render("tableEntry");
});
app.post('/', (request, response) => {
    if (request.body.text) {
        let table = request.body.text
        table = table.split('\n')
        for (row in table) {
            table[row] = table[row].split(', ')
        }
        response.render('tableMaker', { table: table })
    }
    else {
        response.render("error")
    }
})

app.listen(3000);