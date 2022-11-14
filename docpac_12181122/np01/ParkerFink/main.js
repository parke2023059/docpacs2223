const express = require("express")
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))


app.get('/', function(req,res){
    res.render('index.ejs',{

    })
})

app.post('/', function(req,res){
    res.render('index.ejs',{

    })
})



app.listen(8080, '127.0.0.1')