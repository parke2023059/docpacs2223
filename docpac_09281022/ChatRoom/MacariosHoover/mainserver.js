const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./public/utils/messages');
const { userJoin, getCurrentUser, userLeave, getUsers } = require('./public/utils/users');
const botName = "ChatBot"

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'htmls')))

// Run when a client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username }) => {
        const user = userJoin(socket.id, username);

        //Work on
        socket.join(user);

        //Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the ChatRoom!'));

        // Broadcast when a user connects (Difference between socket.emit and socket.broadcast.emit is broadcast emits to everyone but you
        socket.broadcast.emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.emit('roomUsers', {
            users: getUsers()
        })

        // Runs when client disconnects (It's weird but it needs to be inside the connect io.on piece)
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user) {
                io.emit('message', formatMessage(botName, `${user.username} has left the chat`));
            }

            io.emit('roomUsers', {
                users: getUsers()
            })

        });
    });
    //Might need to move

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.emit('message', formatMessage(user.username, msg));
    });

    // Broadcast to everyone would be
    //io.emit()
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
