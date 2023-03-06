const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let height = 10;

let playField = {x: 800, y: 800};

let Boids = [];
let tickInterval = setInterval(doTick, 10);


spawnBoids(150);


function doTick(){
    clearScreen();
    Boids.forEach(boid => {
        boidLogic(boid);
        drawTriangle(boid.x, boid.y, boid.height, degreeToRad(boid.rot), boid.col);
        //BOID BE SPINNIN
        /*
        boid.rot++;
        boid.x += (speed * 0.1) * getDir(degreeToRad(boid.rot)).x;
        boid.y += (speed * 0.1) * getDir(degreeToRad(boid.rot)).y;
        if(boid.x > canvas.width){boid.x -= canvas.width;}
        if(boid.x < 0){boid.x += canvas.width;}
        if(boid.y > canvas.height){boid.y -= canvas.width;}
        if(boid.y < 0){boid.y += canvas.height;}
        if(boid.rot > 360 ){boid.rot = 0;}
        */
    });
}

function spawnBoids(amount){
    for(let i = 0; i < amount; i++){
        Boids.push(
            {
                x: Math.random() * playField.x, 
                y: Math.random() * playField.y, 
                height: height, 
                rot: Math.random() *  360,
                col: 'red'
            }
        );
    }
}

let speed = 10;
let sepForce = .5;
let atractForce = 1;
let alignForce = .5
let viewRange = 20;


function boidLogic(boid){
    boidInView = getBoidsInRange(boid, viewRange);

    boid.x += (speed * 0.1) * getDir(degreeToRad(boid.rot)).x;
    boid.y += (speed * 0.1) * getDir(degreeToRad(boid.rot)).y;

    if (boid.x > canvas.width) {
        boid.x -= canvas.width;
      }
      if (boid.x < 0) {
        boid.x += canvas.width
      }
      if (boid.y > canvas.height) {
        boid.y -= canvas.height;
      }
      if (boid.y < 0) {
        boid.y += canvas.height;
      }


    if(boidInView.length == 1){
        return;
    }

    //SEPERATION
    //boid.rot += seperation(boidInView, boid);

    //ALIGNMENT
    boid.rot += alignRot(boidInView, boid);

    //COHESION
    //boid.rot += cohesion(boidInView, boid);
}

function alignRot(boidInView, boid){
    let avgRot = 0;
    boidInView.forEach(_boid => {
            if(_boid != boid){

                avgRot += _boid.rot;
            }
    });
    avgRot = avgRot / boidInView.length;

    let delta = avgRot - boid.rot;

    
    return Math.max(Math.min(delta / 5, alignForce), -alignForce) + Math.max(Math.min(delta, 1), -1);
}

function seperation(boidInView, boid){
    let avgPos = {x:0, y:0};
    boidInView.forEach(_boid => {
        avgPos.x += _boid.x;
        avgPos.y += _boid.y;
    });
    avgPos.x = avgPos.x / boidInView.length;
    avgPos.y = avgPos.y / boidInView.length;

    let rot = Math.atan2(boid.y - avgPos.y, boid.x - avgPos.x);
    if (rot < 0) rot += 2 * Math.PI;
    
    ctx.fillStyle = 'green';
    ctx.fillRect(avgPos.x, avgPos.y, 1, 1);
    

    let delta = rot - degreeToRad(boid.rot);
    delta = Math.atan2(Math.sin((delta)), Math.cos((delta)));
    delta = Math.max(Math.min(delta / 5, sepForce), -sepForce) + Math.max(Math.min(delta, 1), -1);
    
    boid.rot += delta;
}

function cohesion(boidInView, boid)
{
    let avgPos = {x:0, y:0};
    boidInView.forEach(_boid => {
        avgPos.x += _boid.x;
        avgPos.y += _boid.y;
    });
    avgPos.x = avgPos.x / boidInView.length;
    avgPos.y = avgPos.y / boidInView.length;

    let rot = Math.atan2(boid.y - avgPos.y, boid.x - avgPos.x);
    if (rot < 0) rot += 2 * Math.PI;

    ctx.fillStyle = 'green';
    ctx.fillRect(avgPos.x, avgPos.y, 1, 1);
    

    let delta = rot - degreeToRad(boid.rot);
    delta = Math.atan2(Math.sin((delta)), Math.cos((delta)));
    delta = Math.max(Math.min(delta / 5, atractForce), -atractForce) + Math.max(Math.min(delta, 1), -1);
    
    return -delta;
}

function getBoidsInRange(origin, range){
    let boidsInRange = [];
    for(let boid of Boids){
        if(getDist(origin, boid) <= range){
            boidsInRange.push(boid);
        }
    }
    return boidsInRange;
}

function getDist(boid1, boid2){ return Math.sqrt(Math.pow(boid2.y - boid1.y, 2) + Math.pow(boid2.x - boid1.x, 2)); }

function clearScreen(){
    ctx.clearRect(0, 0, 800, 800);
}

function drawTriangle(_x, _y, _height, _rot, _col)
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


    ctx.fillStyle = _col
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
function degreeToRad(degrees){ return degrees * Math.PI / 180; }

//turn radians into it's degrees equiviliant
function radToDegree(radians){ return radians * 180 / Math.PI; }

//get direction from radians
function getDir(radians){ return {x: Math.cos(radians), y: Math.sin(radians)}; }