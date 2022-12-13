class Sprite {
    constructor({position, velocity, height}){
        this.height = 150
        this.position = position
        this.velocity = velocity
    }
    draw() {
        v.fillStyle = 'red'
        v.fillRect(this.position.x, this.position.y, 40, 150, this.height)
    }
    update(){

        this.draw()
        
        this.position.y += this.velocity.y
        if (this.position.y + this.height +this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }
    }
}
const gravity = 0.2
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
function animate(){
    v.fillStyle = 'black'
    window.requestAnimationFrame(animate)
    v.fillRect(0,0, canvas.width, canvas.height)
    player1.update()
    enemy.update()
}
animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
})