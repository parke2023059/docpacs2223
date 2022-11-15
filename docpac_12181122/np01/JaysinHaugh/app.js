const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const bodyParser = require('body-parser');
const port = 4000;
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.get('/', (req, res) =>{
    let rawdata = fs.readFileSync('data.json');
    let feedback = JSON.parse(rawdata);
    res.render('home', {
        users: feedback.users
    })
})


app.post('/update', (req, res) =>{
    let rawdata = fs.readFileSync('data.json');
    let feedback = JSON.parse(rawdata);
let id = 0;
    if(req.body.name){

id += feedback.users.length
        let saveData = {
            name : req.body.name,
            id : id
          }
          feedback.users.push(saveData);
          fs.writeFile('data.json', JSON.stringify(feedback), function(){
            console.log("Wrote data to the file");
          })

          res.redirect('/')
          } else {
            res.send('Fill in all info');
        }
    })

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
