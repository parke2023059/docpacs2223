const express = require('express');
const app = express();
const http = require("http")
const path = require("path")
const server = http.createServer(app);
const socketio = require("socket.io")
const io = socketio(server)

app.use(express.static(path.join(__dirname, "public")))

const PORT = 42069 || process.env.PORT;
io.on("connection", socket => {
    console.log("hgfgskfwgfwuyhj")
    socket.emit("message", "HI HOW ARE U")
    socket.broadcast.emit("message", "HIII :)");

    socket.on("disconnect", () => {
        io.emit("message", "BYYEEEEEEEEEEE :,(")
    });
    socket.on("chatMessage", (msg) => {
        io.emit("message", msg);
    })
})
server.listen(PORT, () => console.log(`Server running on ${PORT}`));