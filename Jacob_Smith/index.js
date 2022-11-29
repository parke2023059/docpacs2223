const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded());
//
/*fs.readFile('users.json', function (err, data) {
    //validate the data
    if (err) {
        console.log(err);
    } else {
        //convert raw bites into data with json parse
        var parsedData = JSON.parse(data);
        //log the parsed data
        console.log(parsedData); 
    }
});
*/
//this is how you read json correctly

var data = fs.readFileSync('users.json');

parsedData = JSON.parse(data);
console.log(parsedData);
console.log(parsedData.users[0].name);

app.get('/', (req, res) => {
  if (req.query.amount != undefined) {
    users.users = req.query.amount;
    fs.writeFileSync('users.json', JSON.stringify(users))
    res.redirect('/')
  } else {
    res.render('/', { message: "horrrible" })
  }

  res.render('/')
})

app.post('/people', (req, res) => {
  console.log(req.body.amount);
  if (req.body.amount != undefined) {
    users.users = req.body.amount;
    fs.writeFileSync('users.json', JSON.stringify(users))
    res.redirect('/')
  } else {
    res.render('/', { message: "AUUUUUUUUUUUUUUUUUUUUUUUUUHHHHGHGHHGGH" })
  }
  res.render('/')
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
