class Sprite {
    constructor({position, velocity, height}){
        this.height = 150
        this.position = position
        this.velocity = velocity
        this.lastKey
        this.attackBox = {
            position,
            width,
            height
        }
    }
    draw() {
        v.fillStyle = 'red'
        v.fillRect(this.position.x, this.position.y, 40, 150, this.height)
    }
    update(){

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height +this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }
    }
}
const gravity = 0.6
const canvas = document.querySelector('canvas')
const v = canvas.getContext('2d');
const player1 = new Sprite({
    position:{
    
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 2.5
    },
    attackBox:{
        
    }
})
const enemy = new Sprite({
    position:{
    
        x: 450,
        y: 100
        },
        velocity: {
            x: 0,
            y: 2.65
        }
    })
canvas.width = 1800
canvas.height = 900
v.fillRect(0,0,canvas.width,canvas.height)

console.log(player1)

const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowUp:{
        pressed:false
    },
    p:{
        pressed:false
    }
}
let lastKey
function animate(){
    v.fillStyle = 'black'
    window.requestAnimationFrame(animate)
    v.fillRect(0,0, canvas.width, canvas.height)
    player1.update()
    enemy.update()
    player1.velocity.x = 0
    enemy.velocity.x = 0
    //player 1 movement
    if (keys.a.pressed && lastKey ==='a'){
        player1.velocity.x = -6
    }else if (keys.d.pressed && lastKey ==='d'){
        player1.velocity.x = 6
    }
    //else if (keys.w.pressed && lastKey ==='w'){
      //  player1.velocity.y = 1
    //}
    //Enemy movements
    if (keys.ArrowLeft.pressed && enemy.lastKey ==='ArrowLeft'){
        enemy.velocity.x = -6
    }else if (keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight'){
        enemy.velocity.x = 6
    }
}
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            player1.velocity.y = -17
            break
    }
    switch(event.key){

    
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                
                break
            case 'ArrowUp':
                enemy.velocity.y = -17
                break
    }

})
    window.addEventListener('keyup', (event) => {
        switch (event.key){
            case 'd':
                keys.d.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 'w':
                keys.w.pressed = false
                break
        }
        //for the enemy
        switch (event.key){
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false
                    break
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false
                    break
                case 'ArrowUp':
                    keys.ArrowUp.pressed = false
                    break
        }  
    console.log(event.key)
})