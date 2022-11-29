const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

var customerData = JSON.parse(fs.readFileSync('customers.json'));

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
        items: req.body.customerOrder
    }
    customerData.orders.push(newOrder);
    fs.writeFileSync('customers.json', JSON.stringify(customerData));
    res.render('index', { ejsData: customerData });
});

app.listen(3000,
    () => { console.log("Server Started. Don't terminate the batch job to delete the node_modules.") }
);