const express= require('express')
const ejs = require('ejs')
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    res.render('tableentry',)
})

app.post('/',(req,res)=>{
    var textArea = req.body.CSVinfo
    console.log('eh')
    if (textArea != ''){
        var tableText = textArea.split('\n');
        for(var row in tableText){
            tableText[row] = tableText[row].split(',')

        }
        console.log(tableText)
        res.render('tableMaker', {Data: tableText})
    }
    else{
        res.render('error')
    }
    
})





app.listen(3000,
    () => { console.log('server started')}
);