//Defining all variables Here
const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');
const PORT = "6755"
var customerData = JSON.parse(fs.readFileSync('customers.json'));


//Setting all app products
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs');

// Home 'get' endpoint.
app.get('/', (req, res) => {
    res.render('home', {
        ejsData: customerData
    })
});

// New order 'get' endpoint. Can write to a JSON file and will then show up on home.ejs.
app.get('/neworder', (req, res) => {
    res.render('neworder')
});
app.post('/createorder', (req, res) => {
    let newOrder = {
        id: customerData.lastOrder++,
        name: req.body.customerName,
        items: []
    }
    customerData.orders.push(newOrder)
    fs.writeFileSync('customers.json', JSON.stringify(customerData))
    console.log(customerData);
    res.send('it worked')
});


//Starts listen server
app.listen(PORT, () => {
    console.log('server started');
})