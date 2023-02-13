const express = require('express')
const app = express()


app.get('/', function(req,res){
    res.render('tableEntry.ejs')
})

app.listen(1000, function(){
    console.log("Server up")
})