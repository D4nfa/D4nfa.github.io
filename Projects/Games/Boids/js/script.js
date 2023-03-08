

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
        boid.update();
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
        flock.push(new Boid(new vector2(Math.random() * canvas.width, Math.random() * canvas.height)));
    }
}

let sepForce = document.getElementById('seperation');
let atractForce = document.getElementById('cohesion');
let alignForce = document.getElementById('align')
let viewRange = 20;


function boidLogic(boid){
	
    let boidInView = getBoidsInRange(boid, viewRange);

	let angle = Math.atan2(boid.vel.y, boid.vel.x);
    angle = (angle < 0) ? (radToDegree(angle) + 360) : radToDegree(angle);

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

    boid.accel = new vector2();
    //SEPERATION
    let sepVal = seperation(boidInView, boid);
    sepVal = sepVal.mult(sepForce.value);
    boid.accel = boid.accel.addVect(sepVal);

    //ALIGNMENT
    let alignVal = align(boidInView, boid);
    alignVal = alignVal.mult(alignForce.value);
    boid.accel = boid.accel.addVect(alignVal);

    //COHESION
    let attractVal = cohesion(boidInView, boid);
    attractVal = attractVal.mult(atractForce.value);
    boid.accel = boid.accel.addVect(attractVal);
    
}

function align(boidInView, boid)
{
    if(boidInView.length < 2){return new vector2();}

    let avgVect = new vector2(0, 0);
	boidInView.forEach(_boid => {
        if(_boid != boid){
            avgVect = avgVect.addVect(_boid.vel);
        }
	});
	avgVect = avgVect.div(boidInView.length - 1)
    
	return limitVect(avgVect.subVect(boid.vel).setMag(boid.maxAccel), boid.maxAccel);
}

function seperation(boidInView, boid)
{
    if(boidInView.length < 2){return new vector2();}

    let avgVect = new vector2(0, 0);
	boidInView.forEach(_boid => {
        if(_boid != boid){
            let diff = boid.pos.subVect(_boid.pos);
            
            diff = diff.div(getDist(boid, _boid));
            avgVect = avgVect.addVect(diff);
        }
	});
	avgVect = avgVect.div(boidInView.length - 1)

	return limitVect(avgVect.subVect(boid.vel).setMag(boid.maxAccel), boid.maxAccel);
}

function cohesion(boidInView, boid)
{
    if(boidInView.length < 2){return new vector2();}

    let avgPos = new vector2(0, 0);
	boidInView.forEach(_boid => {
        if(_boid != boid){
            avgPos = avgPos.addVect(_boid.pos);
        }
	});

	avgPos = avgPos.div(boidInView.length - 1)

    avgPos = avgPos.subVect(boid.pos);

    avgPos = avgPos.subVect(boid.vel).setMag(boid.maxAccel);

    return limitVect(avgPos, boid.maxAccel);
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