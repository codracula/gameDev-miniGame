// Jeep Naarkom
// feed the angry hippo - mini game prototype

const canvas = document.getElementById("gameworld");
const ctx = canvas.getContext("2d");
let happyHippo = 0;
let gravity = 0.98;
let gameLaunch = false;
let levelComplete = false;
let foodSubtract = false;
let oobY = false;
const LAUNCHX = 300;
const LAUNCHY = 300;
let foodMerge = false;
let distance = 0;
const TOTALFOOD = 5;
let currentFood = TOTALFOOD;
let currentLvl = 1;
let hippoX = 0;
let hippoY = 0;

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
        this.color = hippo.colorHappy;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.velocityY = 0;
    }

};

// Create the hippo
let hippo = {

    x: 800 + Math.random()*(canvas.width/4),
    y: Math.random()*canvas.height/2,
    width: 50,
    height: 50,
    color: "#E66901",
    colorHappy: "#77B446",
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    drawHappy: function() {

        ctx.fillStyle = this.colorHappy;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

let block = {
    x: 650,
    y: 50+ Math.random()*canvas.height/3,
    width: 50,
    height: 180,
    velocityX: 0,
    velocityY: 0,
    color: "#6B6C84",

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};

let sling = {
    x: 300,
    y: 320,
    width: 75,
    height: 200,
    color: "#6B6C84",

    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

};

let menu = {
    draw: function() {
        ctx.font = "normal 40px Irish Grover";
        ctx.fillStyle = '#8800C2'
        ctx.fillText("Happy hippos:", 20, 40);
        ctx.fillText(happyHippo + " ", 290, 40);
        ctx.fillText("Level:", 20, 80);
        ctx.fillText(currentLvl + " ", 125, 80);
        ctx.fillText("Food:", 20, 120);
        ctx.fillText(currentFood + " ", 125, 120);
        if (currentFood <= 0){
            ctx.fillStyle = '#C52929'
            ctx.fillText("Game Over", 20, 160);
        }
        //press space bar to contiinue between each shot
        // if (currentFood > 0 && levelComplete || oobY){
        //     ctx.fillStyle = '#8800C2'
        //     ctx.fillText("Press space to continue", 20, 160);
        // }

    }
}

//turn gravity on off
let gravityCtrl = {
    gravityOn: function (){
        gravity = 0.98;
    },
    gravityOff: function (){
        gravity = 0;
    }
}

function motionUpdate() {
    if (gameLaunch) {
        if (food.y < canvas.height) {
            food.velocityY += gravity;
            food.y += food.velocityY;
            food.x += food.velocityX;
        } else {
            oobY = true;  //add out of bound Y to true;
        }

        if (food.x + food.width > hippo.x
                        && food.x < hippo.x + hippo.width
                        && food.y + food.height > hippo.y
                        && food.y < hippo.y + hippo.height) {
            food.velocityY = 0;
            food.velocityX = 0;
            foodMerge = true;
            gravityCtrl.gravityOff();
            levelComplete = true;
            happyHippo++;
        }

        if (food.x + food.width > block.x
                        && food.x < block.x + block.width
                        && food.y + food.height > block.y
                        && food.y < block.y + block.height) {
            food.velocityY = 0;
            food.velocityX *= -1/2;

            // gravityCtrl.gravityOff()
            // levelComplete = true;
        }

    }
}
function gameObjectDraw() {

    menu.draw();
    block.draw();
    sling.draw();
    if (!foodMerge){

        hippo.draw();
        food.draw();
    } else if (foodMerge){
        hippo.drawHappy();
        food.drawMerge()
    }
}

function gameInit(){
    hippoX = hippo.x;
    hippoY = hippo.y;
}

//update the game loop
function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!levelComplete){
        motionUpdate()
        gameObjectDraw()
    }
    //add condition to restart the lvl if game is completed or out of bound
    if (levelComplete || oobY){
        if (keys.z.pressed){
            if (currentFood > 0){
                food.x = LAUNCHX;
                food.y = LAUNCHY;
                oobY = false;
                levelComplete = false;

            } else{
                //restart the game with max score
                food.x = LAUNCHX;
                food.y = LAUNCHY;
                currentFood = TOTALFOOD;
                currentLvl = 1;
                levelComplete = false;
                oobY = false;
                console.log("current food1", currentFood);
            }
        }

        // food.x = LAUNCHX;
        // food.y = LAUNCHY;
        gameObjectDraw()
    }

    //check distance ---not currently in use
    distance = Math.sqrt(Math.pow(food.x -LAUNCHX,2)
                            + Math.pow(food.y - LAUNCHY,2))

    console.log("foodX", food.x, "foodY", food.y, "ooby", oobY, "lvlcmpt", levelComplete);
    requestAnimationFrame(update);
}

//move food to xy postition
function moveTo(x,y){
    food.x = x;
    food.y = y;
}

//update food position to mouse event
function moveFoodEvent(event){
    moveTo(event.clientX, event.clientY);
}

//check mouse up event to draw delta for x/y velocity
//also subtract food
addEventListener('mouseup', (event) => {
    if (!gameLaunch) {
        if (0 < event.clientX && event.clientX < food.x
                    && event.clientY > food.y) {
            food.x = event.clientX;
            food.y = event.clientY;
            food.velocityY = (LAUNCHY - food.y)/6;
            food.velocityX = -(food.x - LAUNCHX)/6;
            gameLaunch = true;
            currentFood--;
            console.log("current food", currentFood);
            foodSubtract = true;
        }
    }
    // console.log(LAUNCHX, LAUNCHY);
});

//key boolean mapping
const keys = {
    z: {
        pressed: false
    }
}

//draw a line between points
function drawLine(event, x2,y2){
    ctx.fillstyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}

addEventListener('mouseover', (event) =>{
    if (0 < event.clientX && event.clientX < food.x
        && event.clientY > food.y) {
            drawLine(event, LAUNCHX,LAUNCHY)
        }
});

// addEventListener('keyup',(event) => {
//     switch (event.key) {
//         case 'space':
//             keys.space.pressed = false;
//             break;
//     }
// });
addEventListener('keydown',(event) => {
    switch (event.key) {
        case 'space':
            keys.z.pressed = true;
            break;
    }
    console.log(event.key);
});

// Start the game
function startGame() {
    gameInit();
    update();
    // motionUpdate()
    // console.log("gameLaunch", gameLaunch);
    // console.log(gameLaunch);
    console.log(currentFood);
}


