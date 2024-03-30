const canvas = document.querySelector("#glcanvas");

const gl = canvas.getContext("webgl");

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
		attribute vec3 position;
		void main() {
			gl_Position = vec4(position, 1);
		}
	`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
		void main() {
			gl_FragColor = vec4(1, 1, 0, 1);
		}
	`);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const position = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const triPos = [
	0, 0
]

const triSize = 150;
Math.random()
function drawLoop() {
	// Only continue if WebGL is available and working
	if (gl === null) {
		alert(
			"Unable to initialize WebGL. Your browser or machine may not support it.",
		);
	}

	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);

	let recalcedPos = [ triPos[0] / gl.canvas.width, triPos[1] / gl.canvas.height ]
	let tri = [
		recalcedPos[0], recalcedPos[1] + triHeight, 0,
		recalcedPos[0] + triWidth, recalcedPos[1] - triHeight, 0,
		recalcedPos[0] - triWidth, recalcedPos[1] - triHeight, 0
	]
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tri), gl.STATIC_DRAW);
	
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	const quadPos = [
		-0.5, 0.5, 0,
		0.5, 0.5, 0,
		-0.5, -0.5, 0,
		0.5, -0.5, 0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadPos), gl.STATIC_DRAW);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

var side = false;
var upDown = false;

var triVel = [
	25, 15
]

var triHeight = 0;
var triWidth = 0;

let hasChanged = false;
var r = 1;
var g = 1;
var b = 1;

function logicLoop() {
	triPos[0] += triVel[0] * .1;
	triPos[1] += triVel[1] * .1;

	let hitCorner = [false, false];
	

	if (triPos[0] + triSize >= gl.canvas.width || triPos[0] - triSize <= -gl.canvas.width) {
		triVel[0] *= -1;
		hitCorner[0] = true;
		if(!hasChanged){
			r = Math.random();
			g = Math.random();
			b = Math.random();
			hasChanged = true;
		}
	}
	if (triPos[1] + triSize >= gl.canvas.height || triPos[1] - triSize <= -gl.canvas.height) {
		triVel[1] *= -1;
		hitCorner[1] = true;
		if(!hasChanged){
		r = Math.random();
		g = Math.random();
		b = Math.random();
		hasChanged = true;
		}
	}

	if(!hitCorner[0] && !hitCorner[1]) {
		hasChanged = false;
	}

	if(hitCorner[0] && hitCorner[1]) {
		alert("corner hit!")
	}

	console.log(gl.canvas.height);

	drawLoop();
}

resizeCanvas(window.innerWidth / 2, window.innerHeight);
logicLoop();
setInterval(logicLoop, 1);

function resizeCanvas(x, y) {
	gl.canvas.width = x;
	gl.canvas.height = y;
	triHeight = triSize / gl.canvas.height;
	triWidth = triSize / gl.canvas.width;
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}