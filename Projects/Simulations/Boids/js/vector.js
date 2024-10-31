class vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  normalized(){
	let mag = Math.sqrt(this.getMag());
	if (mag === 0) {
		return new vector2(0, 0);
	}
	return new vector2(this.x / mag, this.y / mag);
  }

  random(){
	return new vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }

  add(n) {
    return new vector2(this.x + n, this.y + n);
  }
  addVect(v) {
    return new vector2(this.x + v.x, this.y + v.y);
  }

  sub(n) {
    return new vector2(this.x - n, this.y - n);
  }
  subVect(v) {
    return new vector2(this.x - v.x, this.y - v.y);
  }

  mult(n) {
    return new vector2(this.x * n, this.y * n);
  }
  multVect(v) {
    return new vector2(this.x * v.x, this.y * v.y);
  }

  div(n) {
    return new vector2(this.x / n, this.y / n);
  }
  divVect(v) {
    return new vector2(this.x / v.x, this.y / v.y);
  }

  equal(n) {
    return this.x == n && this.y == n;
  }
  equalVect(v) {
    return this.x == v.x && this.y == v.y;
  }

  greater(n) {
    return this.x > n && this.y > n;
  }
  greaterVect(v) {
    return this.x > v.x && this.y > v.y;
  }

  less(n) {
    return this.x < n && this.y < n;
  }
  lessVect(v) {
    return this.x < v.x && this.y < v.y;
  }

  getMag() {
    return this.x * this.x + this.y * this.y;
  }

  setMag(n) {
    return this.mult(n).div(this.getMag());
  }
}

function limitVect(vect, n1 = 1) {
  return new vector2(
    Math.min(Math.max(vect.x, -n1), n1),
    Math.min(Math.max(vect.y, -n1), n1)
  );
}
