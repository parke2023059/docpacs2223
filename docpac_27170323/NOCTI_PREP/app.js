// "NPxx" refers to a bulleted point on the NOCTI Prep documents

// Part 1: Import modules
const express = require('express');

// Part 2: Configure expressJS application
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

class Item {
    constructor(name, qty, unitPrice) {
        // The constructor will handle the code for
        // Backend NP4a through NP4c
        this.name = name;
        this.qty = qty;
        this.unitPrice = unitPrice;
        this.profit = unitPrice * 0.40;
        this.retailPrice = unitPrice + this.profit;
        this.subtotal = this.retailPrice * qty;
        this.salesTax = this.subtotal * 0.06;
    }
}

// You should round each dollar calculation to the nearest penny after making it
function round(value) {
    value *= 100;
    value = Math.round(value);
    value /= 100;
    return value;
}

// Store the orders in the global scopes
var orders = [];

// Part 3: Set up endpoints
app.get('/', (req, res) => {
    // Frontend NP1a - NP1b
    res.render('index.ejs');
});

app.get('/vieworders', (req, res) => {
    // Frontend NP2a - NP2c
    res.render('vieworders.ejs', {
        orders: orders
    });
});

app.post('/createorder', (req, res) => {

    // Create a temporary order object to add to the orders list
    let order = {
        items: [],
        name: req.body.customerName, // From the HTML form
        address: req.body.customerAddress, // From the HTML form
        subtotal: 0,
        salesTax: 0,
        profit: 0,
        shipping: 0,
        total: 0
    }

    // Read how many (if any) of each item they want to buy
    // Backend NP1a - NP1c
    if (req.body.battlepass) order.items.push(new Item("Battlepass", req.body.battlepass, 7.13));
    if (req.body.nineteenDollar) order.items.push(new Item("$19 Fortnite Card", req.body.nineteenDollar, 14.28));
    if (req.body.DLC) order.items.push(new Item("DLC", req.body.DLC, 49.78))

    // Backend NP4d
    for (const item of order.items) {
        // Here is where we round before adding to order totals
        item.subtotal = round(item.subtotal);
        item.salesTax = round(item.salesTax);
        item.retailPrice = round(item.retailPrice);
        item.profit = round(item.profit);

        order.subtotal += item.subtotal;
        order.salesTax += item.salesTax;
        order.profit += item.profit;
    }

    //Backend NP5a - NP5c
    if (order.subtotal < 40) order.shipping = 15;
    else if (order.subtotal < 150) order.shipping = 10;

    // Backend NP6a - NP6b
    order.total = order.subtotal + order.salesTax + order.shipping;
    order.total = round(order.total);

    // Backend NP7
    orders.push(order);
    res.redirect('/vieworders');
});

// Part 4: Start HTTP listen server
app.listen(3000, () => {
    console.log(`Server started on 3000`);
});