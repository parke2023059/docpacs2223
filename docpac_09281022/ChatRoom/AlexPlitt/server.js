const express = require("express");
const app = express();
const port = 3000 || process.env.port;
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const formatMessage = require("./utils/messages");
const botName = "Server Updates";
const { userJoin, getCurrentUser, userLeave} = require("./utils/users");
const users = [];

server.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    socket.on("joinChat", ({username}) => {
        const user = userJoin(socket.id, username);
        users.push(user.username);
        console.log(users);
        socket.emit("message", formatMessage(botName, "Welcome to the chatroom!"));
        socket.broadcast.emit("message", formatMessage(botName, `${user.username} has joined the chat!`));
        io.emit("chatUsers", {users: users});
    });
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.emit("message", formatMessage(user.username, msg));
    });
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        users.splice(user);
        if(user){
            io.emit("message", formatMessage(botName, `${user.username} has left the chat.`));
        };
        io.emit("chatUsers", { users: users });
    });
});