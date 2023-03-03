const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let rot = 90 * (Math.PI/180);


let tickInterval = setInterval(doTick, 100);

function doTick(){
    clearScreen();
    drawTriangle(200, 200, 20, rot);

    rot += 0.05;
    if(rot > 6.28 ){rot = 0; console.log('full revolution');}
}

function clearScreen(){
    ctx.clearRect(0, 0, 800, 800);
}

function drawTriangle(_x, _y, _height, _rot, col)
{
    let angle = 90;
    let middle = {x: _x, y: _y};
    let point1 = {
        x: (_height / 2) * Math.cos(_rot) + middle.x,
        y: (_height / 2) * Math.sin(_rot) + middle.y,
    };
    let point2 = {
        x: ((point1.x - middle.x) * Math.cos(angle) - (point1.y - middle.y) * Math.sin(angle)) + middle.x,
        y: ((point1.y - middle.y) * Math.cos(angle) + (point1.x - middle.x) * Math.sin(angle)) + middle.y
    };
    let point3 = {
        x: ((point1.x - middle.x) * Math.cos(-angle) - (point1.y - middle.y) * Math.sin(-angle)) + middle.x,
        y: ((point1.y - middle.y) * Math.cos(-angle) + (point1.x - middle.x) * Math.sin(-angle)) + middle.y
    };


    ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();

    ctx.fill();
    
    ctx.fillStyle = 'white';
    
    ctx.fillRect(point1.x, point1.y, _height / 4, _height / 4);
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(middle.x, middle.y, 1, 1)
}
