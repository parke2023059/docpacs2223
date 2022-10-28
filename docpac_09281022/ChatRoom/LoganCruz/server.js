// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./ul/messages')
const app = express();
const server = http.createServer(app);
const io = socketio(server)
const PORT = 3000 || process.env.PORT
app.use(express.static(path.join(__dirname, 'public')));
const userJoin = require('./ul/users')
const botName = 'Sans'
// note to to self, keep in mind this helps other computers connect to it


io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formatMessage(botName,'A room appears in front of you.'))

        socket.broadcast.to(user.room).emit(
            'message',
            formatMessage(botName, 'A monster appears in a room with you.')
        )
    
        socket.on('disconnect', () => {
            io.emit('message', formatMessage(botName, 'A monster has fleed from battle...'))
        })
    
    })
    socket.on('chatMessage', (msg) => {
        io.emit('message',formatMessage(botName, msg))
    })
})
server.listen(PORT, () => console.log(`Server running on ${PORT}`));