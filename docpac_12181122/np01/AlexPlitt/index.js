const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var customerData = JSON.parse(fs.readFileSync("customers.json"));

app.get("/", (req, res) => {
    res.render("index", {ejsData: customerData});
});

app.get("/neworder", (req, res) => {
    res.render("neworder");
});

app.get("/vieworder", (req, res) => {
    console.log(req.query.id);
    let thisUser = customerData.users.find(user => user.id == req.query.id)
    console.log(thisUser);
    res.render("vieworder");
});

app.post("/update", (req, res) => {
    let newUser = {
        id: customerData.lastUser++,
        name: req.body.customerName
    };
    if (newUser.name == null || newUser.name == false) {
        res.render("newIndex", {ejsData: customerData});
        customerData.lastUser--;
    } else {
        customerData.users.push(newUser);
        fs.writeFileSync("customers.json", JSON.stringify(customerData));
        res.send("it worked");        
    };
});

app.listen(3000, () => {
    console.log("server started");
});