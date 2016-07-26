var fruitObj = function() {
	this.alive = []; // bool
	this.x = [];
	this.y = [];
	this.aneNo = [];
	this.spd = [];
	this.size = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo[i] = 0;
		this.spd[i] = Math.random() * 0.01 + 0.005; // [0.005, 0.015)
		this.size[i] = 0;
		this.fruitType[i] = "";
		this.born(i);
	}

	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}

fruitObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			if(deltaTime > 40) deltaTime = 40;
			if(this.size[i] <= 14) {
				var no = this.aneNo[i];
				this.size[i] += this.spd[i] * deltaTime;
				this.x[i] = ane.headx[no];
				this.y[i] = ane.heady[no];
			} else {
				this.y[i] -= this.spd[i] * 5 * deltaTime;
			}
			ctx2.drawImage(
				this.fruitType[i] == "blue" ? this.blue : this.orange,
				this.x[i] - this.size[i] * 0.5,
				this.y[i] - this.size[i] * 0.5,
				this.size[i],
				this.size[i]
			);
			if(this.y[i] < 10) {
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i) {
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	this.size[i] = 0;
	this.alive[i] = true;
	this.fruitType[i] = Math.random() < 0.2 ? "blue" : "orange"; // orange,blue
}

fruitObj.prototype.dead = function(i) {
	this.x[i] = 0;
	this.y[i] = 0;
	this.alive[i] = false;
}

function fruitMonitor() {
	var num = 0;
	for(var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]) num++;
	}
	if(num < 15) {
		// send fruit
		sendFruit();
		return;
	}
}

function sendFruit() {

	for(var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}