// Setting up modules

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

// Root endpoint. Loads the table entry page, allowing you to insert CSV and
// make a table out of it.
app.get('/', (req, res) => {
  res.render('tableEntry')
})

// Post endpoint. Validates the data provided in the tableentry data, and 
// if there is an error, loads the error page.
app.post('/', (req, res) => {
  let table = req.body.table
  if (table == "") {
    res.render('tableEntry.ejs')
  } else {
    let tableSplit = table.split('\r\n')
    tableSplit.forEach(element => {
      console.table(tableSplit)
    });
  }
})

// Prints the port the server is running from, and acts as a quick check
// to see if the website has any bugs to start
app.listen(port, () => {
  console.log(`Running at localhost: ${port}`)
})