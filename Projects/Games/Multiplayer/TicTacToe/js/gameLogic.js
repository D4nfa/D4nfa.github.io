//Tic Tac Toe logic


var onlineGame = false;
var playerOnline = false;

var currPlayer = false;
var gameOngoing = true;
var winner = -1;

// 0 = empty
// 1 = X
// 2 = O
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

canvas.addEventListener("mousedown", function (e) {
	if(!gameOngoing) {return}
	let rect = canvas.getBoundingClientRect();

	let x = Math.floor((e.clientX - rect.left) / squareSize);
	let y = Math.floor((e.clientY - rect.top) / squareSize);

	doMove(x, y, onlineGame ? playerOnline : currPlayer)
})

function doMove(x, y, player){
	if(tryPlace(x, y, player)){
		drawScreen();

		if(!onlineGame || isHost) {currPlayer = !currPlayer;}

		if(onlineGame && !isHost){
			sendData({
				type: "place",
				player: playerOnline,
				x: x,
				y: y
			})
		}

		switch (checkBoard()) {
			case 1:
				gameOngoing = false;
				winner = 1;
				sendData({
					type: "gameOver",
					board: board,
					currPlayer: currPlayer,
					gameOngoing: gameOngoing,
					winner: winner
				})
			break;
			case 2:
				gameOngoing = false;
				winner = 2;
				sendData({
					type: "gameOver",
					board: board,
					currPlayer: currPlayer,
					gameOngoing: gameOngoing,
					winner: winner
				})
			break;
			case 3:
				if(onlineGame){
					if(isHost){
						sendData({
							type: "gameState",
							board: board,
							currPlayer: currPlayer,
							gameOngoing: gameOngoing
						})
					}
				}
			break;
			case 4:
				gameOngoing = false;
				winner = 3;
				sendData({
					type: "gameOver",
					board: board,
					currPlayer: currPlayer,
					gameOngoing: gameOngoing,
					winner: winner
				})
			break;
		}
	}

	updateDisplayInfo();
}

function resetGame(){
	gameOngoing = true;
	currPlayer = false;
	board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
	drawScreen();
	updateDisplayInfo();
}

function tryPlace(x, y, player) {
	if (board[x][y] == 0 && currPlayer == player) {
		board[x][y] = currPlayer ? 2 : 1;
		return true;
	}
	return false;
}

//Returns
//1 if X has won
//2 if O has won
//3 if game is still on
//4 if draw
function checkBoard() {
	if (onlineGame && !isHost) { return }

	let check = 0;
	let checkWon = false;
	for (let j = 0; j < 2; j++) {
		check++;
		for (let i = 0; i < 3; i++) {
			if (board[0][i] != 0 && board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
				console.log("won on parallel");
				check = board[0][i];
				checkWon = true;
				break;
			}
			if (board[i][0] != 0 && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
				console.log("won on vertical");
				check = board[i][0];
				checkWon = true;
				break;
			}
			if (i == 0 && board[0][0] != 0 && board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
				console.log("won on downward diagonal");
				check = board[0][0]
				checkWon = true;
				break;
			}
			if (i == 0 && board[0][2] != 0 && board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
				console.log("won on upward diagonal");
				check = board[0][2]
				checkWon = true;
				break;
			}
		}
		if(checkWon) {break;}
	}
	if(check == 2){
		check++;
		let draw = true;
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				if (board[x][y] == 0) {
					check = checkWon ? check - 1: check;
					draw = false;
					break;
				}
			}
			if(check == 2) {break;}
		}
		if(check == 3 && draw){
			check = 4;
		}
	}
	return check;
}