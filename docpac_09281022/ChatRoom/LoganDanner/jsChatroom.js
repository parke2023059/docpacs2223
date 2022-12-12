const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages.js')
const { userJoin, getCurrentUser, userLeave, getUsers } = require('./utils/users.js')


const app = express();
const server = http.createServer(app)
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'BotMan';
// run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username }) => {
        const user = userJoin(socket.id, username)

        socket.join(user)
        //welcome current user
        socket.emit('message', formatMessage(botName,'Welcome Users'));

        //broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        //sends user info
        io.emit('roomUsers', {
            users: getUsers()
        })

        //run when client disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.emit('message', formatMessage(botName, `${user.username} has left the chat`));

                //sends user info
                io.emit('getUsers', {
                    users: getUsers()
                })

            }

        });

        // Listen for chatMessage
        socket.on('chatMessage', (msg) => {
            const user = getCurrentUser(socket.id);

            io.emit('message', formatMessage(user.username, msg));
        });
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));