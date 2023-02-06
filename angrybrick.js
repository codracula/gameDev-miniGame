const canvas = document.getElementById("gameworld");
const ctx = canvas.getContext("2d");
GRAVITY = 0.98;
let gameLaunch = false;
let launchX = 300;
let launchY = 300;
let brickMerge = false;
let distance = 0;
// Create a brick object
let brick = {
    x: 300,
    y: 300,
    width: 20,
    height: 20,
    velocityX: 0,
    velocityY: 0,
    color: "red",

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    drawMerge: function() {
        this.color = 'green'
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};

// Create a block object
let block = {
    x: canvas.width - 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: "green",
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// Game loop
function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!gameLaunch){
        brick.velocityX = 2;
        brick.velocityY = launchY - brick.y;
            // Math.abs((launchY - brick.y),2)/100
    }

    distance = Math.sqrt(Math.pow(brick.x -launchX,2) + Math.pow(brick.y - launchY,2))

    if (gameLaunch) {
        if (brick.y < canvas.height && gameLaunch){
            brick.velocityY += GRAVITY;
            brick.y += brick.velocityY;

        }
        brick.x += brick.velocityX;
        console.log("brick.velocityX", "brick.velocityY")
        console.log(brick.velocityX, brick.velocityY)
        // brick.x += 20;
        // Check for collision with the block
        if (brick.x + brick.width > block.x && brick.x < block.x + block.width && brick.y + brick.height > block.y && brick.y < block.y + block.height) {
            brick.velocityY = 0;
            brick.velocityX = 0;
            brickMerge = true;
        }
    }
    if (!brickMerge){
        brick.draw();
    } else {
        brick.drawMerge();
    }

    // if (brick.y > canvas.height)
    block.draw();
    requestAnimationFrame(gameLoop);
}

addEventListener('mouseup', (event) => {

    if (event.clientX < brick.x && event.clientY > brick.y && !gameLaunch) {
        brick.x = event.clientX;
        brick.y = event.clientY;
        gameLaunch = true;
    }

    console.log(launchX, launchY);
});
// Start the game
function startGame() {
    gameLoop();
}