let displayData;

function join(){
	let code = window.prompt("Please enter the connect code");
	if(code != "" && code != null){
		setOnline();
		guestUser();
		connect(code);
	}
}

function host(){
	console.log("host");
	setOnline();
	hostUser();
	gameOngoing = false;
}

function disc(){
	disconnect();
	setLocal();
}

function hostUser(){
	$("#idText").removeClass("hidden");
	$("#playerJoined").removeClass("hidden");
}

function guestUser(){
	$("#resetBtn").addClass("hidden");
	$("#playerJoined").removeClass("hidden");
	$("#playerJoined").text("Connecting");
}

function setOnline(){
	onlineGame = true;
	resetGame()
	$("#joinError").addClass("hidden");
	$("#joinBtn").addClass("hidden");
	$("#hostBtn").addClass("hidden");
	$("#idText").addClass("hidden");
	$("#playerJoined").addClass("hidden");
	$("#discBtn").removeClass("hidden");
	$("#resetBtn").removeClass("hidden");
}

function setLocal(){
	onlineGame = false;
	resetGame()
	$("#joinBtn").removeClass("hidden");
	$("#hostBtn").removeClass("hidden");
	$("#resetBtn").removeClass("hidden");
	$("#idText").addClass("hidden");
	$("#playerJoined").addClass("hidden");
	$("#joinError").addClass("hidden");
	$("#discBtn").addClass("hidden");
}

function updateDisplayInfo(){
	$("#player").text("You are playing as: " + (onlineGame ? playerOnline ? 'O' : 'X' : currPlayer ? 'O' : 'X'));
	$("#currPlayer").text("It's " + (currPlayer ? 'O' : 'X') + " to play");
	$("#gameState").text(gameOngoing ? "Game is ongoing" : "Game has ended with " + (winner == 1 ? 'X winning' : winner == 2 ? 'O winning' : 'a draw'));
}


function reset(){
	resetGame();
	if(onlineGame && isHost) {setPlayers();}
	updateDisplayInfo();
}

function setPlayers(){
	playerOnline = (Math.random()>0.5)? true : false;
	let other = !playerOnline;
	let initPackage = {
		type: "init",
		player: other
	}
	sendData(initPackage)
	console.log(initPackage);
}

//Network logic
addEventListener("peerInit", (id) => {
	$('#idText').text("Share this connect code:\r\n" + id.detail.peerId);
})

addEventListener("connOpen", () => {
	console.log("connected");
	$("#joinError").addClass("hidden");
	if(isHost){
		$("#playerJoined").text("Player connected, game is ready.");
		$("#idText").addClass("hidden");
	}
	else{
		$("#playerJoined").text("Connected to player.");
	}
	reset();
})

addEventListener("connClosed", () => {
	if(isHost){
		$("#idText").removeClass("hidden");
		$("#playerJoined").text("Waiting for player..");
		return;
	}
	disc();
})

addEventListener("peerRecieveConn", (conn) => {
	console.log("recieved connection");
})

addEventListener("dataRecievedHost", (data) => {
	console.log(data)
	switch (data.detail.data.type) {
		case "place":
			doMove(data.detail.data.x, data.detail.data.y, data.detail.data.player);
			break;
	}
})

addEventListener("dataRecievedClient", (data) => {
	console.log(data)
	switch (data.detail.data.type) {
		case "init":
			playerOnline = data.detail.data.player;
			reset();
			break;
		case "gameState":
			board = data.detail.data.board;
			currPlayer = data.detail.data.currPlayer;
			gameOngoing = data.detail.data.gameOngoing;
			drawScreen();
			break;
		case "gameOver":
			board = data.detail.data.board;
			currPlayer = data.detail.data.currPlayer;
			gameOngoing = data.detail.data.gameOngoing;
			winner = data.detail.data.winner;
			drawScreen();
			break;
		case "error":
			$("joinError").text((data.detail.data.code == 1 ? "Failed to join lobby, " : "There was an error trying to connect to peer, ") + data.detail.data.msg);
			$("joinError").removeClass("hidden");
			break;
	}
	updateDisplayInfo();
})

//Drawing
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let squareSize;

function drawScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let padding = 50;
	squareSize = canvas.width / 3;
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			ctx.strokeStyle = "white";
			ctx.beginPath();
			ctx.rect(squareSize * x, squareSize * y, squareSize, squareSize);
			ctx.stroke();
			ctx.closePath();
			if (board[x][y] == 1) {
				drawX(x * squareSize, y * squareSize);
			}
			else if (board[x][y] == 2) {
				drawO(x * squareSize, y * squareSize);
			}
		}
	}

	function drawX(x, y) {
		ctx.beginPath();

		ctx.moveTo(x + padding, y + padding);
		ctx.lineTo(x + squareSize - padding, y + squareSize - padding);

		ctx.moveTo(x + padding, y + squareSize - padding);
		ctx.lineTo(x + squareSize - padding, y + padding);
		ctx.closePath();
		ctx.stroke();
	}
	
	function drawO(x, y) {
		ctx.beginPath();
		ctx.arc(x + squareSize / 2, y + squareSize / 2, (squareSize / 2) - padding, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();
	}
}


//Start
setLocal();
reset();
drawScreen();