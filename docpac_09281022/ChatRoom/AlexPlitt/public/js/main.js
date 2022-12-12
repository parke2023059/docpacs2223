const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const userList = document.getElementById("users");


socket.emit("joinChat", { username });

socket.on("chatUsers", ({ users }) => {
    outputUsers(users);
});

socket.on("message", message => {
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `                <div class="message">
    <p class="meta">${message.username}</p>
    <p class="text">${message.text}</p>
</div>`;
document.querySelector(".chat-messages").appendChild(div);
};

function outputUsers(users) {
    for (user in users) {
        userText = document.createElement("li");
        if (document.getElementById(users[user]) == null) {
            userText.id = users[user];
            userText.innerHTML = `<li> ${users[user]} </li><br>`;
            userList.appendChild(userText);
        };
    };
};