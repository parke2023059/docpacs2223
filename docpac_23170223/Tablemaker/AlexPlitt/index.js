const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("tableEntry");
});

app.post("/", (req, res) => {
    let csvData = req.body.csvData;
    if (csvData == null || csvData == false) {
        res.render("error");
    } else if (csvData.indexOf(', ') > -1) {
        let partialSplitData = csvData.split("\r\n");
        let fullSplitData = [];
        for (let i = 0; i < partialSplitData.length; i++) {
            fullSplitData.push(partialSplitData[i].split(", "));
        };
        res.render("tableMaker", {data: fullSplitData});
    } else if (csvData.indexOf(",") > -1) {
        let partialSplitData = csvData.split("\r\n");
        let fullSplitData = [];
        for (let i = 0; i < partialSplitData.length; i++) {
            fullSplitData.push(partialSplitData[i].split(","));
        };
        res.render("tableMaker", {data: fullSplitData});
    } else {
        res.render("error");
    }
});

app.listen(3000, () => {
    console.log("server started");
});

/*

name, age, cats, married
Bob, 37, 0, true
Susy, 35, 7, false

*/