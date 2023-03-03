const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let rot = 90;

let Boids = [];
Boids.push({x: 100, y: 100, height: 40, rot: 0});
Boids.push({x: 200, y: 200, height: 40, rot: 0});
Boids.push({x: 300, y: 300, height: 40, rot: 0});
Boids.push({x: 400, y: 400, height: 40, rot: 0});
Boids.push({x: 500, y: 500, height: 40, rot: 0});
Boids.push({x: 600, y: 600, height: 40, rot: 0});
Boids.push({x: 700, y: 700, height: 40, rot: 0});
let tickInterval = setInterval(doTick, 10);

let speed = 10;



function doTick(){
    clearScreen();
    
    Boids.forEach(boid => {
        boid.rot++;
        boid.x += (speed * 0.1) * getDir(degreeToRan(boid.rot)).x;
        boid.y += (speed * 0.1) * getDir(degreeToRan(boid.rot)).y;
        if(boid.x > canvas.width){boid.x -= canvas.width;}
        if(boid.x < 0){boid.x += canvas.width;}
        if(boid.y > canvas.height){boid.y -= canvas.width;}
        if(boid.y < 0){boid.y += canvas.height;}
        if(boid.rot > 360 ){boid.rot = 0;}
        drawTriangle(boid.x, boid.y, boid.height, degreeToRan(boid.rot));
    });
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
    
    ctx.fillRect(point1.x, point1.y, 1, 1);
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(middle.x, middle.y, 1, 1)
}


//turn degrees into it's radians equiviliant
function degreeToRan(degrees){ return degrees * Math.PI / 180; }

//turn radians into it's degrees equiviliant
function ranToDegree(radians){ return radians * 180 / Math.PI; }

//get direction from radians
function getDir(radians){ return {x: Math.cos(radians), y: Math.sin(radians)}; }