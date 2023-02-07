// Jeep Naarkom
// feed the angry hippo - mini game prototype

const canvas = document.getElementById("gameworld");
const ctx = canvas.getContext("2d");
let gravity = 0.98;
let gravityBool = true;
let gameLaunch = false;
let levelComplete = false;
let level = 1;
let launchX = 300;
let launchY = 300;
let foodMerge = false;
let distance = 0;
let totalFood = 5;
let currentLvl = 1;
// Create a food block
let food = {
    x: 300,
    y: 300,
    width: 20,
    height: 20,
    velocityX: 0,
    velocityY: 0,
    color: "green",

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    //instant poop  --need to look like it consumes the food.
    drawMerge: function() {
        this.color = hippo.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.velocityY = 0;
    }

};

// Create the hippo
let hippo = {

    x: 500 + Math.random()*(canvas.width/2),
    y: Math.random()*canvas.height/2,
    width: 50,
    height: 50,
    color: "#9F8676",
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};
let menu = {
    draw: function() {
        ctx.font = "normal 40px Irish Grover";
        ctx.fillStyle = '#FFA200'
        ctx.fillText("Level:", 20, 40);
        ctx.fillText(level + " ", 125, 40);
        ctx.fillText("Food:", 20, 80);
        ctx.fillText(totalFood + " ", 125, 80);

    }
}
let gravityCtrl = {
    gravityOn: function (){
        gravity = 0.98;
    },
    gravityOff: function (){
        gravity = 0;
    }
}
//update the game loop
function update() {
    // while(totalFood > 0){
    //
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!gameLaunch){


            // Math.abs((launchY - food.y),2)/100
    }

    distance = Math.sqrt(Math.pow(food.x -launchX,2) + Math.pow(food.y - launchY,2))

    if (gameLaunch) {
        if (food.y < canvas.height && gameLaunch){
            food.velocityY += gravity;
            food.y += food.velocityY;
            food.x += food.velocityX;
        }

        console.log("food.velocityX", "food.velocityY")
        console.log(food.velocityX, food.velocityY)
        // food.x += 20;
        // Check for collision with the hippo
        if (food.x + food.width > hippo.x && food.x < hippo.x + hippo.width && food.y + food.height > hippo.y && food.y < hippo.y + hippo.height) {
            food.velocityY = 0;
            food.velocityX = 0;
            foodMerge = true;

            gravityCtrl.gravityOff()
            levelComplete = true;

        }
    }
    if (totalFood){
        if (!foodMerge){
            food.draw();
        } else {
            food.drawMerge();
        }
    }

    // if (food.y > canvas.height)
    hippo.draw();
    menu.draw();
    requestAnimationFrame(update);
}

//check mouse up event
addEventListener('mouseup', (event) => {

    if (event.clientX < food.x && event.clientY > food.y && !gameLaunch) {
        food.x = event.clientX;
        food.y = event.clientY;

        food.velocityY = (launchY - food.y)/6;
        food.velocityX = -(food.x - launchX)/6;
        gameLaunch = true;
        totalFood--;
    }

    console.log(launchX, launchY);
});
// Start the game
function startGame() {

    update();

    console.log(totalFood);
}


