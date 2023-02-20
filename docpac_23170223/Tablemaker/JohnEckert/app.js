// Setting up modules
const {
  table
} = require('console')
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
})

// Endpoint for the table itself. Takes the data and makes a table. If there's
// an error, print a message on screen and redirect to the root endpoint.
app.get('/make', (req, res) {
  if (table == "") {
    alert("Form empty")
    res.redirect('/')
  } else {
    let newTable = []
    let splitTable = table.split('\r\n')
    splitTable.forEach(element => {
      newTable.push(element.split(','))
    });
  };
});
// Prints the port the server is running from, and acts as a quick check
// to see if the website has any bugs to start
app.listen(port, () => {
  console.log(`Running at localhost: ${port}`)
})