const fs = require('fs')
const json = require('./users.json')
const ejs = require('ejs')
const express = require('express')
const http = require ('http')
const port = 3000
const app = express()
var parsedData
 // this is how you read files asynchromonously
 fs.readFile('users.json', function (err, data) {
   // Validate the data
   if (err){
    console.log(err);
   }else{
    //convert raw bytes into JS object with JSON.parse();
     parsedData = JSON.parse(data)
     console.log(parsedData);
}
});
app.set('view engine', 'ejs')
// GET method route
app.get('/', (req, res) => {
  res.render('index'), {
    users : parsedData
  }
})

app.listen(port, () => {
  console.log(`server listening at port ${port}`)
})

//this is how you read files synchromously
/*
var data = fs.readFileSync('users.json')
//convert buffer to js dara
parsedData = JSON.parse(data)


console.log(parsedData);

console.log(parsedData.users[0].name)
*/

//html = ejs.render('<% ')
