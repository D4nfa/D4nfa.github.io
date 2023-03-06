

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let height = 10;

let playField = {x: 800, y: 800};

const flock = [];
let tickInterval = setInterval(doTick, 10);


spawnBoids(150);


function doTick(){
    clearScreen();
    flock.forEach(boid => {
        boidLogic(boid);
        drawBoid(boid);
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
        flock.push(new Boid({x: Math.random() * canvas.width, y: Math.random() * canvas.height}));
    }
}

let sepForce = .5;
let atractForce = 1;
let alignForce = .5
let viewRange = 20;


function boidLogic(boid){
	
    let boidInView = getBoidsInRange(boid, viewRange);

	let angle = Math.atan2(boid.vel.x, boid.vel.y);
	angle = (angle < 0) ? (radToDegree(angle) + 360) : radToDegree(angle);

	boid.rot = angle;

	boid.pos.x += boid.vel.x * 0.1;
	boid.pos.y += boid.vel.y * 0.1;

	boid.rot = angle;

    if (boid.pos.x > canvas.width) {
        boid.pos.x -= canvas.width;
      }
      if (boid.pos.x < 0) {
        boid.pos.x += canvas.width
      }
      if (boid.pos.y > canvas.height) {
        boid.pos.y -= canvas.height;
      }
      if (boid.pos.y < 0) {
        boid.pos.y += canvas.height;
      }

    if(boidInView.length == 1){
        return;
    }

    //SEPERATION
    //boid.rot += seperation(boidInView, boid);

    //ALIGNMENT
    //boid.rot += alignRot(boidInView, boid);

    //COHESION
    //boid.rot += cohesion(boidInView, boid);
}

function alignRot(boidInView, boid){
    
}

function seperation(boidInView, boid){
    
}

function cohesion(boidInView, boid)
{
    
}


function getBoidsInRange(origin, range){
    let boidsInRange = [];
    for(let boid of flock){
        if(getDist(origin, boid) <= range){
            boidsInRange.push(boid);
        }
    }
    return boidsInRange;
}

function getDist(boid1, boid2){ return Math.sqrt(Math.pow(boid2.pos.y - boid1.pos.y, 2) + Math.pow(boid2.pos.x - boid1.pos.x, 2)); }

function clearScreen(){
    ctx.clearRect(0, 0, 800, 800);
}

function drawBoid(boid)
{
    let angle = 90;
    let middle = {x: boid.pos.x, y: boid.pos.y};
    let point1 = {
        x: (boid.height / 2) * Math.cos(degreeToRad(boid.rot)) + middle.x,
        y: (boid.height / 2) * Math.sin(degreeToRad(boid.rot)) + middle.y,
    };
    let point2 = {
        x: ((point1.x - middle.x) * Math.cos(angle) - (point1.y - middle.y) * Math.sin(angle)) + middle.x,
        y: ((point1.y - middle.y) * Math.cos(angle) + (point1.x - middle.x) * Math.sin(angle)) + middle.y
    };
    let point3 = {
        x: ((point1.x - middle.x) * Math.cos(-angle) - (point1.y - middle.y) * Math.sin(-angle)) + middle.x,
        y: ((point1.y - middle.y) * Math.cos(-angle) + (point1.x - middle.x) * Math.sin(-angle)) + middle.y
    };


    ctx.fillStyle = boid.col
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.closePath();

    ctx.fill();
    
    ctx.fillStyle = 'white';
    ctx.fillRect(point1.x, point1.y, 1, 1);
}


//turn degrees into it's radians equiviliant
function degreeToRad(degrees){ return degrees * Math.PI / 180; }

//turn radians into it's degrees equiviliant
function radToDegree(radians){ return radians * 180 / Math.PI; }

//get direction from radians
function getDir(radians){ return {x: Math.cos(radians), y: Math.sin(radians)}; }