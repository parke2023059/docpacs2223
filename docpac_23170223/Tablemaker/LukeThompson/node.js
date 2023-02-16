const express = require('express');
const app = express();
const port = 3000

var bodyParser = require("body-parser");
const e = require('express');
app.use(bodyParser.urlencoded({ extended: true }))
// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('tableEntry');
});


app.post("/", (req, res) => {
    var textArea = req.body.TextAreaToTable;
    if (textArea != '' && textArea.indexOf(", ") > -1) {
        textArea = textArea.split("\r\n")
        for (var row in textArea) {
            textArea[row] = textArea[row].split(", ")
            console.log(textArea);
        }
        console.log(textArea);
        res.render("tableMaker", { Data: textArea })
    }
    else {
        res.render("error")
    }
})



app.listen(port, () => {
    console.log(`listening on ${port}`)
})

/*

name, age, gender, married
Bob, 29, male, true
Susy, 35, female, false

*/


