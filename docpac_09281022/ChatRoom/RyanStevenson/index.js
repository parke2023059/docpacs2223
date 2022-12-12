const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const port = 3000;

var chat = [];
var users = [];

app.get('/', (request, response) => {
	response.redirect('/login');
})

app.get('/chat', (request, response) => {
	response.sendFile(__dirname + '/chat.html');
})

app.get('/login', (request, response) => {
	response.sendFile(__dirname + '/login.html');
})

io.on('connection', (socket) => {
	socket.on('login', (username) => {
		if (!users.includes(username)) {
			socket.username = username;
			chat.push(username + ' has joined the chat.');
			users.push(username);
		}
		io.emit('users', users);
		io.emit('chat', chat);
	});

	socket.on('message', (message) => {
		chat.push(message);
		io.emit('chat', chat);
	});

	socket.on('Disconnect', (user) => {
		if (user) {
			users.splice(users.indexOf(user), 1)
			chat.push(user + ' left the chat.');
			io.emit('chat', chat);
		}
	})
})

httpServer.listen(port, '192.168.10.26', (error) => {
	if (error) {
		console.error(error);
	} else {
		console.log('Running on port', port);
	}
})