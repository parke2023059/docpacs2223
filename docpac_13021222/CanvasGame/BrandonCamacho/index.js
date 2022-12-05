const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

var x = 100;
var y = 100;
var radius = 50;
var speed = 35;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

function drawGame() {
    requestAnimationFrame(drawGame);
    inputs();
    boundryCheck();
    drawBlob();
}

function boundryCheck() {
    //up
    if (y < radius) {
        y = radius;
    }
    //down
    if (y > canvas.height - radius) {
        y = canvas.height - radius;
    }
    //left
    if (x < radius) {
        x = radius;
    }
    //right
    if (x > canvas.width - radius) {
        x = canvas.width - radius;
    }
}

function inputs() {
    if (upPressed) {
        y = y - speed;
    }
    if (downPressed) {
        y = y + speed;
    }
    if (leftPressed) {
        x = x - speed;
    }
    if (rightPressed) {
        x = x + speed;
    }
}

function drawBlob() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        upPressed = true;
    }

    //down
    if (event.keyCode == 40) {
        downPressed = true;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = true;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = true;
    }
}

function keyUp(event) {
    //up
    if (event.keyCode == 38) {
        upPressed = false;
    }

    //down
    if (event.keyCode == 40) {
        downPressed = false;
    }
    //left
    if (event.keyCode == 37) {
        leftPressed = false;
    }

    //right
    if (event.keyCode == 39) {
        rightPressed = false;
    }
}

// Controller Support
var direction = 0
window.addEventListener('gamepadconnected', (event) => {
    // Update Controller
    const update = () => {
        //Only read the first controller
        const cont = navigator.getGamepads()[0];
        if (cont.axes[1] >= 0.3) { //Down
            y = y + speed;
        }
        if (cont.axes[1] <= -0.3) { //Up
            y = y - speed;
        }
        if (cont.axes[0] >= 0.3) { //Right
            x = x + speed;
        }
        if (cont.axes[0] <= -0.3) { //Left
            x = x - speed;
        }
        //This will loop the update every "animation frame"
        requestAnimationFrame(update);
    }; //End Update Controller
    //Kick off the loop
    update();
});

drawGame();