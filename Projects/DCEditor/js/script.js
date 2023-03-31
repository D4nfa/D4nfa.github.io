const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let cellSize = 15;

let mapSize = {x: 50, y: 50};

let map;

function start(){
	updateSize();

	canvas.width = mapSize.x * cellSize;
	canvas.height = mapSize.y * cellSize;

	drawMap();
}

function loadMap(e){
	var reader = new FileReader();
  	reader.addEventListener('load', function() {
		console.log(this.result);
	});
	reader.readAsText(e.files[0]);
	
}

function updateSize(){
	map = Array.from(Array(mapSize.x), () => new Array(mapSize.y).fill('.'));
}

function drawMap(){
	ctx.strokeStyle = "#b8b8b8";
	for(let x = 0; x < mapSize.x; x++){
		for(let y = 0; y < mapSize.y; y++){
			ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
		}
	}
}

function createGrid(){

}

function clearScreen(){
	ctx.clearRect(0, 0, 800, 800);
}


//turn degrees into it's radians equiviliant
function degreeToRad(degrees){ return degrees * Math.PI / 180; }

//turn radians into it's degrees equiviliant
function radToDegree(radians){ return radians * 180 / Math.PI; }

//get direction from radians
function getDir(radians){ return {x: Math.cos(radians), y: Math.sin(radians)}; }