const express = require("express")
const app = express()
const fs = require('fs')
app.set('view engine', 'ejs ')
app.use(express.urlencoded({extended: true}))






app.get('/', function(req,res){
    res.render('index.ejs')
    fs.readFileSync('names.json')
})
app.get('/update', function(req,res){
    res.render('update.ejs',{
        mssg: ""
    })
})

let students = []
app.post('/update', function(req,res){
    let studLen = students.length
    console.log(studLen);
    let student = {
        name : req.body.name,
        id : studLen
    }
    if (student.name === ""){
        res.render('update.ejs', {
            mssg: "Must Fill Out Every Form"
        })
    } else {
        res.redirect('/')
        students.push(student)
        let stringStudent = JSON.stringify(students)
        fs.writeFileSync('names.json', stringStudent)
    }
})


app.listen(7000, "127.0.0.1", function(){
    console.log("Server Running")
})