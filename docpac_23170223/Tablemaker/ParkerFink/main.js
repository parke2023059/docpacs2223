const express = require('express')
const app = express()

let port = 1300

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', function(req,res){
    res.render('tableEntry.ejs', {
        alert: ""
    })
})

app.post('/', function(req,res){
    let textArea = req.body.text_area
    if (textArea == ""){
        res.render('tableEntry.ejs', {
            alert: "Must Fill Out Form"
        })
    } else {
        let newTable = []
        let splitted = textArea.split('\r\n')
        splitted.forEach(element => {
            newTable.push(element.split(', ')
        )});
        
        console.table(newTable)
        res.redirect('/')

    }
})






app.listen(port, function(){
    console.log(`Server Running on PORT: ${port}`)
})