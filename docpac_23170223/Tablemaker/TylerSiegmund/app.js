const express = require('express')
const ejs = require('ejs')
const path = require('path')

var app = express()
var port = 1000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

let newTable = " "
let textArea = ''

app.get('/', function(req,res) {
    res.render('tableEntry.ejs', {newTable: newTable})
})



app.post('/', function(req,res) {
    textArea = req.body.text_area
    res.redirect('/maker')
})

app.get('/maker', function(req,res) {
    if (textArea == '') {
        res.render('error.ejs', {
            error: 'The field was empty'
        })
    }
    else {
        
        if (textArea.includes('\r\n')) {
            newTable = []
            textArea = textArea.split('\r\n')
            textArea.forEach(Element => {
                newTable.push(Element.split(','))
            })
            

        

            if (newTable[0].length == 1) {
                res.render('error.ejs', {
                    error: 'Please separate words with commas'
                })
            }
            else {
                res.render('tableMaker.ejs', {newTable: newTable})
            }
        
        }

        else {
            res.render('error.ejs', {
                error: "Make seperate lines for columns in table"
            })
        }
            }
})

app.listen(port, function() {
    console.log('listening on ' + port)
})