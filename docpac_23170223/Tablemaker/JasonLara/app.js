const express = require('express');
const app = express()
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get("/", function(req,res){
    res.render('tableEntry')
})
app.post("/", function(req,res) {
    let error = " "
    let data = req.body.input
    datatable = data.split('\n')
    for (let index = 0; index < datatable.length; index++) {
        let headerlength = datatable[0].split(',').length
            datatable[index];
           // console.log(datatable);
            datatable[index].replace(/\r/,"")
         if (/,,+/gm.test(data)) {
            error += "there is two or more commas right next to each other. either remove one or add somthing between "
            res.render('error', {
                message : error,
                userinput : data
            })

        } else if(datatable[index] == ""){
            error += "there is a extra input in the code"
            res.render('error', {
                message : error,
                userinput : data
            })}
            else if(/,$/gm.test(datatable[index])){
                error += `there is a uncessary comma at the end of the line. located at row ${index+1}`
                res.render('error', {
                    message : error,
                    userinput : data
                })
        } else if (headerlength != datatable[index].split(',').length){
            error += `There is a extra or missing data in the table. if there is no data please add in a space.`
                res.render('error', {
                    message : error,
                    userinput : data
                })
        }
    }

    //console.log(data);
    datatable = data.split('\n')
    //console.log(datatable[0].split(',')[0]);
    res.render('tableMaker', {
        data: datatable
    })
})

app.listen(621,function(){
    console.log("listen on port 621");
})