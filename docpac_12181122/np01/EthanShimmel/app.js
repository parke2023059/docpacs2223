const express = require('express');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))


var allUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'))
console.log(allUsers);


app.get('/', (req, res) => {
    res.render('index', {
        users: allUsers.users
    })
})


app.post('/update', (req, res) => {
    if (req.body.username) {
        username = req.body.username
        allUsers.users.push({name: username, id:allUsers.users.length})
        fs.writeFile('users.json', JSON.stringify(allUsers), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Wrote to file");
                res.render('index', {
                    users: allUsers.users
                })
            }
        })
    } else {
        res.send('Please fill out the form')
    }

})

app.listen(4000)