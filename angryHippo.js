// Jeep Naarkom
// feed the angry hippo - mini game

const canvas = document.getElementById("gameworld");
const ctx = canvas.getContext("2d");
let hippoFed = 0;
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

function resetFood(){
    currentFood = TOTALFOOD;
}
// Create a food block
let food = new Sprite({
    sprite: './img/food.png',
    position:  {
        x: 300,
        y: 300
    },
    scale: 0.2,
    frameTotal: 4,
    frameHeight: 262,
    frameWidth: 259
});

console.log(food);

const bg = new Sprite({
    sprite: './img/bg4.png',
    position: {
        x: 0,
        y: 0
    },
    scale: 1,
    frameTotal: 1
});

const sling = new Sprite({
    sprite: './img/sling.png',
    position: {
        x: 200,
        y: 300
    },
    scale: 1
});

let wall = new Sprite({
    sprite: './img/wall2.png',
    position: {
        x: 600,
        y: 50+ Math.random()*canvas.height/3
    },
    scale: 1
});

// Create the hippo
let hippo = new Sprite({
    sprite: './img/hippo2.png',
    position: {
        x: 700 + Math.random()*(canvas.width/3),
        y: Math.random()*(canvas.height -150)
    },
    scale: 0.2,
    frameTotal: 1
})

let menu = {
    draw: function() {
        ctx.font = "normal 40px Irish Grover";
        ctx.fillStyle = '#8800C2'
        ctx.fillText("Hippos fed:", 20, 40);
        ctx.fillText(hippoFed + " ", 290, 40);
        ctx.fillText("Level:", 20, 80);
        ctx.fillText(currentLvl + " ", 125, 80);
        ctx.fillText("Food:", 20, 120);
        ctx.fillText(currentFood + " ", 125, 120);
        if (currentFood <= 0 && oobY){
            ctx.fillStyle = '#C52929'
            ctx.fillText("Game Over", 20, 160);
            ctx.fillStyle = '#8800C2'
            ctx.fillText("Press z to continue", 20, 200);
        }
        //press space bar to continue between each shot
        if (currentFood > 0 && (levelComplete || oobY)){
            ctx.fillStyle = '#8800C2'
            ctx.fillText("Press z to continue", 20, 160);
        }
    }
}

//turn gravity on and off
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
        if (food.position.y < canvas.height) {

            food.velocityY += gravity;
            food.position.y += food.velocityY;
            food.position.x += food.velocityX;
        } else {
            oobY = true;  //add out of bound Y to true;
        }

        if (food.position.x + food.width > hippo.position.x
                        && food.position.x < hippo.position.x + hippo.width
                        && food.position.y + food.height > hippo.position.y
                        && food.position.y < hippo.position.y + hippo.height
                        && !levelComplete) {
            food.velocityY = 0;
            food.velocityX = 0;
            foodMerge = true;
            gravityCtrl.gravityOff();
            levelComplete = true;
            hippoFed++;
        }

        if (food.position.x + food.width > wall.position.x
                        && food.position.x < wall.position.x + wall.width
                        && food.position.y + food.height > wall.position.y
                        && food.position.y < wall.position.y + wall.height) {
            food.velocityY = 0;
            food.velocityX *= -1/2;
        }
    }
}

function lvlReset() {
    food.velocityX = 0;
    food.velocityY = 0;
    gravityCtrl.gravityOff();
    food = new Sprite({
        sprite: './img/food.png',
        position:  {
            x: 300,
            y: 300
        },
        scale: 0.2,
        frameTotal: 4,
        frameHeight: 262,
        frameWidth: 259
    });
    hippo = new Sprite({
        sprite: './img/hippo2.png',
        position: {
            x: 700 + Math.random()*(canvas.width/3),
            y: Math.random()*(canvas.height -150)
        },
        scale: 0.2,
        frameTotal: 1
    })
    wall = new Sprite({
        sprite: './img/wall2.png',
        position: {
            x: 600,
            y: 50+ Math.random()*canvas.height/3
        },
        scale: 1
    });
    levelComplete = false;
    gameLaunch = false;
    oobY = false;
}

//update the game loop
function update() {
    motionUpdate();
    bg.update()
    sling.update()
    wall.update()
    menu.draw()
    hippo.draw()
    food.update()

    //add condition to restart the lvl if game is completed or out of bound
    if (levelComplete){
        console.log("waiting for key z");
        console.log("current food", currentFood);
        console.log("z keys", keys.z.pressed);

        if (currentFood > 0 && keys.z.pressed) {
            console.log("execute food reset");
            lvlReset()
            currentLvl++;
            resetFood()
        }
        //missing condition that if the lvl complete but currentfood = 0
    }
    if (oobY){
        if (currentFood > 0 && keys.z.pressed) {
            console.log("execute food reset");
            lvlReset()

        } else if (currentFood == 0 && keys.z.pressed) {
            hippoFed = 0;
            currentLvl = 0;
            resetFood();
            lvlReset();
        }
    }
    if (currentFood == 0 && keys.z.pressed) {
        hippoFed = 0;
        currentLvl = 0;
        resetFood();
        lvlReset();
    }
    //check distance ---not currently in use
    distance = Math.sqrt(Math.pow(food.position.x -LAUNCHX,2)
                            + Math.pow(food.position.y - LAUNCHY,2))

    console.log("foodX", food.position.x, "foodY", food.position.y, "ooby", oobY, "lvlcmpt", levelComplete);
    requestAnimationFrame(update);
}

//move food to xy postition


//check mouse up event to draw delta for x/y velocity
//also subtract food
addEventListener('mouseup', (event) => {
    if (!gameLaunch) {
        if (0 < event.clientX && event.clientX < food.position.x
                    && event.clientY > food.position.y) {
            food.position.x = event.clientX;
            food.position.y = event.clientY;
            food.velocityY = (LAUNCHY - food.position.y)/6;
            food.velocityX = -(food.position.x - LAUNCHX)/6;
            gameLaunch = true;
            currentFood--;
            gravityCtrl.gravityOn()
            console.log("current food", currentFood);
            foodSubtract = true;
            console.log('event key', event.key);
        }
    }
    console.log(LAUNCHX, LAUNCHY);
    console.log('eventclient', event.clientX, event.clientY);
    console.log('food velocity', food.velocityX, food.velocityY);
});

//key boolean mapping
const keys = {
    z: {
        pressed: false
    }
}

addEventListener('mouseover', (event) =>{
    if (0 < event.clientX && event.clientX < food.position.x
        && event.clientY > food.position.y) {
            drawLine(event, LAUNCHX,LAUNCHY)

        }
});

addEventListener('keydown',(event) => {
    switch (event.key) {
        case 'z':
            keys.z.pressed = true;
            break;
    }
});

addEventListener('keyup',(event) => {
    switch (event.key) {
        case 'z':
            keys.z.pressed = false;
            break;
    }
});

// Start the game
function startGame() {
    update();
    console.log(currentFood);
}


