const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
var customerData = JSON.parse(fs.readFileSync('users.json'));
app.get('/', (req, res) => {
    res.render('index', { ejsData: customerData });
});
app.get('/neworder', (req, res) => {
    res.render('neworder');
});
app.post('/createorder', (req, res) => {
    let newOrder = {
        id: customerData.lastOrder++,
        name: req.body.customerName,
        items: []
    }
    customerData.orders.push(newOrder)
    fs.writeFileSync('users.json', JSON.stringify(customerData))
    res.render("index", { ejsData: customerData })
});
app.post('/bana', (req, res) => {
    console.log("eee")
    customerData = { "lastOrder": 0, "orders": [] }
    fs.writeFileSync('users.json', JSON.stringify(customerData))
    res.render("index", { ejsData: customerData })
})
app.listen(3000,
    () => { console.log('server started') }
);