const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('tableEntry');
});

app.post('/', (req, res) => {
    var textArea = req.body.AreaOfText;
    console.log(textArea)
    if (textArea != '' && textArea.indexOf(', ') > -1)
    {
        var newText = textArea.split('\n');
        console.log(newText)
        for (var row in newText)
        {
            newText[row] = newText[row].split(', ')
        }
        console.log(newText)
        res.render('tableMaker', { Data: newText });
    }
    else
    {
        res.render('error');
    }
})

app.listen(3000,
    () => { console.log('server started') }
);