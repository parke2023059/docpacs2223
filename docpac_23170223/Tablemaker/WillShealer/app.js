const express = require('express')
var app = express()


app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var port = 1000

app.get('/', function (req,res) {
    res.render('tableEntry.ejs')
})

app.post('/', function (req, res) {
    let table = req.body.table
    if (table == "") {
        res.render('tableEntry.ejs')
    } else {
        let splitted = table.split("\r\n")
        splitted.forEach(function(element){            
        })
        console.table(splitted);
        res.render('tableMaker.ejs')
    }
})

app.listen(port, function(){
    console.log("server is up");
})
