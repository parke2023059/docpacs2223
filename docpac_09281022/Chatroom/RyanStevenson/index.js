const express = require('express')
const app = express()
// const socket = require('socket.io');


app.get('/', (request, response) => { response.sendFile(__dirname + '/index.html') })

app.listen(5000)