const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const layerIn = document.querySelector('.layerIn');
const layersIn = document.querySelector('.layersIn');
const widthIn = document.querySelector('.widthIn');
const heightIn = document.querySelector('.heightIn');
const mapName = document.querySelector('.mapName');

let cellSize = 15;

let mapSize = {x: 50, y: 50};

let mName = "";
let mRooms = [
	{
		x: 0,
		z: 0,
		y: 0,
		layouts: [],
		roominfo: []
	}
];


let map;

function start(){
	this.canvas.addEventListener('mousedown', function(e) {
		getMouseSquare(e);
	})
	

	canvas.width = mapSize.x * cellSize;
	canvas.height = mapSize.y * cellSize;

	drawMap();
}

function loadMap(e){
	layerIn.value = 1;

	/*var reader = new FileReader();
  	reader.addEventListener('load', function() {
		console.log(this.result);
	});
	reader.readAsText(e.files[0]);*/
	
}

function constructMap()
{
	layerIn.value = 1;
	map = new Map();
	map.rooms[0].layouts.push({
		x: 50,
		z: 50,
		layout: Array.from(Array(mapSize.x), () => new Array(mapSize.y).fill(false))
	},);
}

function updateValues()
{
	mName = mapName.value;
	if(layersIn.value == '') {layersIn.value = 1;}
	if(layerIn.value == '' || layerIn.value < 0 || layerIn.value > layersIn.value ){layerIn.value = 1;}

}

function updateSize(){
	map = Array.from(Array(mapSize.x), () => new Array(mapSize.y).fill(false));
}

function drawMap(){
	ctx.strokeStyle = "#b8b8b8";
	clearScreen();
	for(let x = 0; x < mapSize.x; x++){
		for(let y = 0; y < mapSize.y; y++){
			if(map.rooms[0].layouts[layerIn.value - 1].layout[x][y]) {
				ctx.fillStyle = "silver";
				ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
			}

			ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
		}
	}
}

function createGrid(){

}

function clearScreen(){
	ctx.clearRect(0, 0, canvas.height, canvas.width);
}

function getMouseSquare(event) {
	const rect = this.canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	map.rooms[0].layouts[layerIn.value - 1].layout[Math.floor(x / cellSize)][Math.floor(y / cellSize)] = !map.rooms[0].layouts[layerIn.value - 1].layout[Math.floor(x / cellSize)][Math.floor(y / cellSize)];
	drawMap();
}