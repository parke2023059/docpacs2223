const ejs = require('ejs');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
	res.render('tableEntry');
})

app.post('/', (req, res) => {
	let table = req.body.table
	let search = table.search(',')
	
	if(table == ''){
		res.render('error', {
			error: "No data was submitted."
		})
	} else if(search == -1){
		res.render('error', {
			error:"Not in a csv format."
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



const port = 4000
app.listen(port, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Running on port ${port}`);
	}
});