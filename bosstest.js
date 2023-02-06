const canvas = document.getElementById('gameworld');
const ctx = canvas.getContext('2d');
//const gravity = 10

canvas.width = 1024
canvas.height = 576
ctx.fillStyle = 'black'
ctx.fillRect(0,0, canvas.width, canvas.height)
let x = canvas.width/2;
let y = canvas.height/2;
let radius = 20;
P_SPEED = 10;
class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    draw() {

        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, radius, 0, 2*Math.PI)
        ctx.fill()
        ctx.closePath();
    }
    update() {
        this.draw()
        // this.position.y++
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //lock border
        // if (this.position.y + 2*radius + this.velocity.y < canvas.height) {
        //     //update position with key
        // } else {
        //     this.velocity.y = 0
        // }

    }
}

class Boss {
    constructor(position, player) {
        this.player = player
        this.position = position
        this.head = {
            x: this.position.x,
            y: this.position.y,
            speed: 2,
            direction: .5
        }
        this.body = [];
    }

    drawHead() {

        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.arc(this.head.x, this.head.y, radius*1.2, 0, 2*Math.PI)
        ctx.fill()
        ctx.closePath();
    }


    update() {
        this.drawHead()


        // Update the head's position
        this.head.x += this.head.speed * Math.cos(this.head.direction);
        this.head.y += this.head.speed * Math.sin(this.head.direction);

        //Update the position of each body segment
        // for (let i = 0; i < this.body.length; i++) {
        //     let segment = this.body[i];
        //     let prevSegment = this.body[i - 1] || this.head;
        //
        //     // Move the segment towards the previous segment
        //     let dx = prevSegment.x - segment.x;
        //     let dy = prevSegment.y - segment.y;
        //     segment.x += dx * 0.1;
        //     segment.y += dy * 0.1;
        // }

        // let angle = Math.atan2(this.player.position.y - this.head.position.y,
        //     this.player.position.x - this.head.position.y);
        console.log(this.player.position.x, this.player.position.y)
        //Move the worm head towards the player
        this.head.x += this.head.speed * Math.cos(angle);
        this.head.y += this.head.speed * Math.sin(angle);

        //Rotate the worm head towards the player
        this.head.rotation = angle * (180 / Math.PI);
        this.head.position.x += this.player.position.x
        this.head.position.y += this.player.position.y

        //lock border
        // if (this.position.y + 2*radius + this.velocity.y < canvas.height) {
        //     //update position with key
        // } else {
        //     this.velocity.y = 0
        // }
    }
}

class BossBody {
    constructor(head) {
        this.head = head
        this.player = player
        this.position = this.head.position
        this.body = [];
    }

    drawBody(){
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.head.x, this.head.y, radius*0.7, 0, 2*Math.PI)
        ctx.fill()
        ctx.closePath();
    }

    update() {
        this.drawBody()

    }
}
const player = new Player({
    x: canvas.width/3,
    y: canvas.height/2
})

const boss = new Boss({
    x: 50,
    y: 50
}, this.player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    },
    w: {
        pressed: false
    }
}
function update() {

    this.player.update()
    this.boss.update()
}
function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    boss.update()
    player.velocity.x = 0
    player.velocity.y = 0

    if (keys.d.pressed) {
        player.velocity.x = P_SPEED
    } else if (keys.a.pressed) {
        player.velocity.x = -P_SPEED
    }

    if (keys.w.pressed) {
        player.velocity.y = -P_SPEED
    } else if (keys.s.pressed) {
        player.velocity.y = P_SPEED
    }

}

animate()
// update()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'd':
            console.log("press d key")
            keys.d.pressed = true
            // player.velocity.x  = 1
            //keys.a.pressed = false
            break
        case 'a':
            keys.a.pressed = true
            // player.velocity.x = -1
            break
        case 'w':
            keys.w.pressed = true
            // player.velocity.y = 1
            break
        case 's':
            keys.s.pressed = true
            // player.velocity.y = -1
    }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            // player.velocity.x = 0

            break
        case 'a':
            keys.a.pressed = false
            // player.velocity.x = 0
            break
        case 'w':
            keys.w.pressed = false
            // player.velocity.y = 0
            break
        case 's':
            keys.s.pressed = false
            // player.velocity.y = 0
    }

})
