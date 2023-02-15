const express = require('express')
const app = express()
const port = 3000
let ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.render('tableEntry')

})

app.post('/', (req, res) => {
let table = req.body.table
let search = table.search(',')

if(table == ''){
    res.render('error', {
        error: "No data submitted"
    })
}else if(search == -1){
    res.render('error', {
        error:"Not in csv format"
    })
} else{

let newTable = []
let splitted = table.split('\r\n')
splitted.forEach(element => {
    newTable.push(element.split(', '))
});
console.table(newTable);
res.render('tableMaker', {
    table: newTable
})
}
})



app.listen(port, () => console.log(`App listening on port ${port}!`))