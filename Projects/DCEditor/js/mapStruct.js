class Map {
	constructor() {
		this.mapName = "";
		this.rooms = [new Room()];
	}
}

class Room {
	constructor() {
		this.totalX,
		this.totalZ,
		this.totalY,
		this.layouts = [],
		this.roomInfo = [
			{
				info: [typeof String]
			}
		]
	}
}

/*
room = {
	totalX: 100,
	totalZ: 100,
	totalY: 2,
	layouts: [
		{
			x: 50,
			z: 50,
			layout: [
				[typeof Boolean],
				[typeof Boolean],
				[typeof Boolean],
				[typeof Boolean],
				[typeof Boolean],
				...
			]
		},
		{
			x: 25,
			z: 25,
			layout: [
				[typeof Boolean],
				[typeof Boolean],
				[typeof Boolean],
				...
			]
		}
	],
	roomInfo: [
		{
			info: [
				"type of info",
				"necessary info",
				"necessary info",
				...
			]
		},
		{
			info: [
				"type of info",
				"necessary info",
				"necessary info",
				...
			]
		}
	]
}
*/