class Boid{
	constructor(pos = new vector2()){
		this.pos = pos;
		this.vel = new vector2(Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1), Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1));
		this.maxAccel = 0.012;
		this.maxForce = 0.1;
		this.accel = new vector2();
		this.height = 10;
		this.col = 'red';
		this.rot = 0;
	}

	update(){
		this.pos = this.pos.addVect(this.vel);
		this.vel = this.vel.addVect(this.accel);
	}
}