let availableShips = [
	{len: 2, name: 'Destroyer'},
	{len: 3, name: 'Submarine'},
	{len: 3, name: 'Cruiser'},
	{len: 4, name: 'Battleship'},
	{len: 5, name: 'Carrier'}
]
let ships = [];

let selShipLen = 2;
let selShipRot = false;

let hoverX;
let hoverY;

canvas.addEventListener("mousemove", function (e) {
	if (selShipLen != -1) {
		let rect = canvas.getBoundingClientRect();

		hoverX = Math.max(1, Math.floor((e.clientX - rect.left) / squareSize));
		hoverY = Math.max(1, Math.floor((e.clientY - rect.top) / squareSize));

		drawScreen();
	}
})

canvas.addEventListener("mousedown", function (e) {
	if (e.button === 0 && availableShips.find(o => o.len == selShipLen)) {
		let endX = selShipRot ? hoverX : hoverX + selShipLen - 1;
		let endY = selShipRot ? hoverY + selShipLen - 1 : hoverY;
		let allowPlace = true;
		let spaces = [];
		for (let i = 0; i < selShipLen; i++) {
			spaces.push({
				x: selShipRot ? hoverX : hoverX + i,
				y: !selShipRot ? hoverY : hoverY + i
			});
		}

		if (selShipRot ? (hoverY + selShipLen - 1) > 10 : (hoverX + selShipLen - 1) > 10) {
			allowPlace = false;
		}

		for (let i = 0; i < ships.length; i++) {
			let ship = ships[i];

			if (intersects(spaces, ship.spaces)) {
				allowPlace = false;
				break;
			}
		};
		if (allowPlace) {
			ships.push({
				len: selShipLen,
				name: availableShips.find(o => o.len == selShipLen).name,
				rot: selShipRot,
				startX: hoverX,
				endX: endX,
				startY: hoverY,
				endY: endY,
				spaces: spaces
			})
			availableShips.splice(availableShips.indexOf(availableShips.find(o => o.len == selShipLen)), 1);
		}
	}
	else if (e.button === 2) {
		let ship;
		for (let i = 0; i < ships.length; i++) {
			ship = intersects([{ x: hoverX, y: hoverY }], ships[i].spaces);
			if (ship) {
				ship = ships[i];
				break;
			}
		}
		if(ship){
			availableShips.push({len: ship.len, name: ship.name});
			availableShips.sort(function(a,b) {
				return a.len - b.len;
			});
			ships.splice(ships.indexOf(ship), 1);
		}
	}
	if (availableShips.length > 0) {
		selShipLen = availableShips[0].len;
	}
	else {
		selShipLen = -1;
	}

	drawScreen();
})

canvas.oncontextmenu = function (e) {
	if (e.preventDefault != undefined)
		e.preventDefault();
	if (e.stopPropagation != undefined)
		e.stopPropagation();
}

document.addEventListener("keypress", function onEvent(event) {
	if (selShipLen != -1 && event.key === "r") {
		selShipRot = !selShipRot;
		drawScreen();
	}
});

//Check if two lines intersect
function intersects(spaces1, spaces2) {
	for (let i = 0; i < spaces1.length; i++) {
		let found = spaces2.find(o => o.x == spaces1[i].x && o.y == spaces1[i].y);
		if (found) {
			return found;
		}
	}
};