class Boid{
	constructor(pos){
		this.pos = {
			x: pos.x, 
			y: pos.y
		};
		this.vel = {
			x: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1), 
			y: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
		};
		this.accel = 10;
		this.height = 10;
		this.col = 'red';
		this.rot = 0;
	}
}

