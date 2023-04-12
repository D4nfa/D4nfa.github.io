class Map {
	constructor() {
		this.mapName = typeof String;
		this.rooms = [typeof Room];
	}
}

class Room {
	constructor() {
		this.totalX = 100,
		this.totalZ = 100,
		this.totalY = 2,
		this.layouts = [
			{
				x: 50,
				z: 50,
				layout: [[typeof Boolean]]
			},
			{
				x: 25,
				z: 25,
				layout: [[typeof Boolean]]
			}
		],
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