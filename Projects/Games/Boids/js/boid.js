class Boid {
  constructor(pos = new vector2()) {
    this.pos = pos;
    this.vel = new vector2(
      Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1),
      Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
    );
    this.maxAccel = 0.012;
    this.accel = new vector2();
    this.height = 10;
    this.col = "green";
    this.rot = 0;
  }

  applyLogic() {

    this.accel = this.accel.mult(0);

    let sep = this.seperate(50).mult(sepForce.value);
    this.accel = this.accel.addVect(sep);

    let coh = this.cohesion(50).mult(atractForce.value);
    this.accel = this.accel.addVect(coh);

    let align = this.align(50).mult(alignForce.value);
    this.accel = this.accel.addVect(align);

    this.screenWrap();
    this.orient();
  }

  screenWrap() {
    if (this.pos.x > canvas.width) {
      this.pos.x -= canvas.width;
    }
    if (this.pos.x < 0) {
      this.pos.x += canvas.width;
    }
    if (this.pos.y > canvas.height) {
      this.pos.y -= canvas.height;
    }
    if (this.pos.y < 0) {
      this.pos.y += canvas.height;
    }
  }

  orient() {
    let angle = Math.atan2(this.vel.y, this.vel.x);
    angle = angle < 0 ? radToDegree(angle) + 360 : radToDegree(angle);
    this.rot = angle;
  }

  update() {
    this.vel = limitVect(this.vel, this.maxVel);
    this.pos = this.pos.addVect(this.vel);
    this.vel = this.vel.addVect(this.accel);
  }

  align(range) {
    let boids = getBoidsInRange(this, range);
    if (boids.length < 1) {
      return new vector2();
    }

    let avgVect = new vector2(0, 0);
    boids.forEach((_boid) => {
      avgVect = avgVect.addVect(_boid.vel);
    });
    avgVect = avgVect.div(boids.length);

    avgVect = avgVect.subVect(this.vel);

    return limitVect(avgVect, this.maxAccel);
  }

  seperate(range) {
    let boids = getBoidsInRange(this, range);
    if (boids.length < 1) {
      return new vector2();
    }

    let avgVect = new vector2(0, 0);
    boids.forEach((_boid) => {
      let diff = this.pos.subVect(_boid.pos);

      diff = diff.div(getDist(this, _boid));
      avgVect = avgVect.addVect(diff);
    });
    avgVect = avgVect.div(boids.length);

    avgVect = avgVect.subVect(this.vel);

    return limitVect(avgVect, this.maxAccel);
  }

  cohesion(range) {
    let boids = getBoidsInRange(this, range);
    if (boids.length < 1) {
      return new vector2();
    }

    let avgPos = new vector2(0, 0);
    boids.forEach((_boid) => {
      avgPos = avgPos.addVect(_boid.pos);
    });

    avgPos = avgPos.div(boids.length);

    avgPos = avgPos.subVect(this.pos);

    avgPos = avgPos.subVect(this.vel);

    return limitVect(avgPos, this.maxAccel);
  }
}