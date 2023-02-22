const ejs = require('ejs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

const port = 3000
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("tableEntry")
})

app.post("/", (req, res) => {
    var textArea = req.body.areaofsometext;
    if (textArea == null || textArea == false){
        res.render('error')
    }else if (textArea.indexOf(", ") > -1){
        let partialSplit = textArea.split("\r\n");
        let fullSplit = []
        for (let i = 0; i < partialSplit.length; i++){
            fullSplit.push(partialSplit[i].split(", "))
        }
        res.render('tableMaker', {data: fullSplit})
    }else if (textArea.indexOf(",") > -1){
        let partialSplit = textArea.split("\r\n");
        let fullSplit = []
        for (let i = 0; i < partialSplit.length; i++){
            fullSplit.push(partialSplit[i].split(","))
        }
        res.render('tableMaker', {data: fullSplit})
    }else{
        res.render('error')
    }
})
app.listen(port, () => {
    console.log(`listening on ${port}`)
})