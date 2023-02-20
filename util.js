



function moveTo(x,y){
    food.x = x;
    food.y = y;
}

//update food position to mouse event
function moveFoodEvent(event){
    moveTo(event.clientX, event.clientY);
}

function drawLine(event, x2,y2){
    ctx.fillstyle = 'red';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
}