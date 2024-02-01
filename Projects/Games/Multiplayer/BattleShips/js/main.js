const actionHeader = $("#gameStateHeader");

function join() {
	let code = window.prompt("Please enter the connect code");
	if (code != "" && code != null) {
		guestUser();
		connecting();
		connect(code);
	}
}

function host() {
	console.log("host");
	hostUser();
	connecting();
	gameOngoing = false;
}

function checkUsername() {
	if ($("#UsernameInput").val() == "") {
		$("#joinBtn").prop('disabled', true);
		$("#hostBtn").prop('disabled', true);
	}
	else {
		$("#joinBtn").prop('disabled', false);
		$("#hostBtn").prop('disabled', false);
	}
}

function disc() {
	disconnect();
	disconnected();
}

function connecting() {
	$("#UsernameInput").attr("readonly", true);
	$("#joinBtn").addClass("hidden");
	$("#hostBtn").addClass("hidden");
	$("#discBtn").removeClass("hidden");
	$("#readyBtn").removeClass("hidden");
	$("#playerJoined").removeClass("hidden");
}

function disconnected() {
	$("#UsernameInput").attr("readonly", false);
	$("#joinBtn").removeClass("hidden");
	$("#hostBtn").removeClass("hidden");
	$("#discBtn").addClass("hidden");
	$("#idText").addClass("hidden");
	$("#readyBtn").addClass("hidden");
	$("#playerJoined").addClass("hidden");
}

function hostUser() {
	$("#idText").removeClass("hidden");
	$("#idText").removeClass("hidden");
	$("#playerJoined").removeClass("hidden");
}

function guestUser() {
	$("#playerJoined").removeClass("hidden");
	$("#playerJoined").text("Connecting");
}

addEventListener("peerInit", (id) => {
	$('#idText').text("Share this connect code:\r\n" + id.detail.peerId);
})

addEventListener("connOpen", () => {
	console.log("connected");
	if (isHost) {
		$("#playerJoined").text("Player connected.");
		$("#idText").addClass("hidden");
		sendData({
			type: 'init',
			username: $("#UsernameInput").val()
		});
	}
	else {
		$("#playerJoined").text("Connected to player.");
	}
})

addEventListener("connClosed", () => {
	if (isHost) {
		$("#idText").removeClass("hidden");
		$("#playerJoined").text("Waiting for player..");
		otherUsername = undefined;
		return;
	}
	disc();
})

addEventListener("dataRecievedHost", (data) => {
	console.log(data)
	switch (data.detail.data.type) {
		case "init":
			otherUsername = data.detail.data.username;
			addMessageToChat(`${otherUsername} has joined your game`, "Info", 'Lightgrey')
			break;
		case "readyState":
			onlineReady = data.detail.data.value;
			addMessageToChat(`${otherUsername} is ${onlineReady ? 'ready' : 'no longer ready'}.`, 'Game', 'Lightgrey')
			tryStartGame();
			break;
	}
})

addEventListener("dataRecievedClient", (data) => {
	console.log(data)
	switch (data.detail.data.type) {
		case "init":
			otherUsername = data.detail.data.username;
			sendData({
				type: 'init',
				username: $("#UsernameInput").val()
			});
			addMessageToChat(`You have joined ${otherUsername}'s game`, "Info", 'Lightgrey')
			break;
		case "readyState":
			onlineReady = data.detail.data.value;
			addMessageToChat(`${otherUsername} is ${onlineReady ? 'ready' : 'no longer ready'}.`, 'Game', 'Lightgrey')
			break;
	}
})


addEventListener("dataRecieved", (data) => {
	console.log(data)
	switch (data.detail.data.type) {
		case "chatMessage":
			addMessageToChat(data.detail.data.msg, otherUsername)
			break;
		case "gameOver":
			board = data.detail.data.board;
			currPlayer = data.detail.data.currPlayer;
			gameOngoing = data.detail.data.gameOngoing;
			winner = data.detail.data.winner;
			drawScreen();
			break;
		case "startGame":
			runBuildSetup();
			break;
		case "error":
			$("joinError").text((data.detail.data.code == 1 ? "Failed to join lobby, " : "There was an error trying to connect to peer, ") + data.detail.data.msg);
			$("joinError").removeClass("hidden");
			break;
	}
})

function changeGrid(gridToShow) {
	switch (gridToShow) {
		case 'ocean':
			$('#oceanBtn').prop("disabled", true).addClass("clicked");
			$('#targetBtn').prop("disabled", false).removeClass("clicked");
			break;
		case 'target':
			$('#oceanBtn').prop('disabled', false).removeClass('clicked');
			$('#targetBtn').prop('disabled', true).addClass('clicked');
			break;
	}
}

function ready(forcedChange) {
	if(otherUsername == undefined) {return;}
	localReady = !localReady;
	$('#readyBtn').text((localReady ? 'Unready': 'Ready'))
	if(!forcedChange){
		sendData({
			type: 'readyState',
			value: localReady
		});
	}
	if(isHost && !gameHasStarted) {tryStartGame();}

}

function tryStartGame() {
	if(localReady && onlineReady){
		runBuildSetup();
		sendData({
			type: 'startGame'
		})
	}
}

function runBuildSetup(){
	phase = 'build';
	changeGrid('ocean');
	$(actionHeader).text("Setup Phase");
	gameHasStarted = true;
	addMessageToChat("The setup phase has now begun, setup your ships on the grid and press ready.", "Game", 'Lightgrey')
	$('#readyBtn').prop('disabled', true);
	$('#readyBtn').addClass('clicked');
	localReady = true;
	ready(true);
}

changeGrid('ocean');
checkUsername();
drawScreen();