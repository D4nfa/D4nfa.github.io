

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let height = 10;

let playField = {x: 800, y: 800};

const flock = [];
let tickInterval = setInterval(doTick, 10);


spawnBoids(100);

function doTick(){
	clearScreen();
	flock.forEach(boid => {
		boid.applyLogic();
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

function getBoidsInRange(origin, range){
	let boidsInRange = [];
	for(let boid of flock){
		if(	boid != origin && getDist(origin, boid) <= range + boid.height){
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