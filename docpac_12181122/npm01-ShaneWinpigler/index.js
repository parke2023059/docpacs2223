const fs = require('fs');

var parsedData = ''

/* This is how you read files asymchronously
fs.readFileSync('users.json', function (err, data) {
    //Validate the data
    if (err) {
        console.log(err);
    } else {
        //Convert raw bytes into JS object with JSON.parse()
        parsedData = JSON.parse(data);
        console.log(parsedData);
    }
})
*/

//This is how you read files synchronously
var data = fs.readFileSync('users.json')
//Convert buffer to JS object
parsedData = JSON.parse(data)

console.log(parsedData);

console.log(parsedData.users[0].name);