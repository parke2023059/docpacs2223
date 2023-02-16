const express = require('express')
const app = express()

let port = 1300

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', function(req,res){
    res.render('tableEntry.ejs', {
        alert: "",
        newTable: ""
    })
})


app.get('/tablemaker', function(req,res){
    
    if (textArea == ""){
        res.render('tableEntry.ejs', {
            alert: "Must Fill Out Form"
        })
    } else {
        let newTable = []
        let splitted = textArea.split('\r\n')
        splitted.forEach(function(element){
            newTable.push(element.split(','))
           
        })

      

        res.render('tableMaker.ejs', {
            alert: "", 
            newTable : newTable
        })
        console.table(newTable)
})






app.post('/', function(req,res){
    let textArea = req.body.text_area
        res.redirect('/tablemaker')
        
    })






app.listen(port, function(){
    console.log(`Server Running on PORT: ${port}`)
})