const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
app.use( bodyParser.urlencoded( {extended: true} ) );
app.set('view engine', 'ejs');
var customerData = JSON.parse(fs.readFileSync('customers.json'));
app.get('/', (req, res) => {
    res.render('index', { ejsData: customerData});
});
app.post('/createorder', (req, res)=>{
  let newOrder = {
    id: customerData.lastOrder++,
    name:req.body.customerName,
    item:[]
  }
  customerData.orders.push(newOrder)
  fs.writeFileSync('customer.json', JSON.stringify(customerData))
  console.log(req.body)
  res.send('It worked boss.')
})
app.get('/vieworder', (req,res) =>{

  console.log(req.query.id)
  let thisOrder = customerData.orders.find((order)=> order.id == req.query.id)
  console.log(thisOrder)
  res.render('vieworder')
})
app.get('/neworder', (req,res)=>{
  res.render('neworder')
})
app.listen(3000,
    () => { console.log('server started')}
);
