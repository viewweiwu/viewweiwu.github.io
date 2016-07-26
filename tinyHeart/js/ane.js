var aneObj = function() {
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = []; // 振幅
	this.color = [];
	this.alpha = 0;
	// start point, control point, end point(sin)
}

aneObj.prototype.num = 50;

aneObj.prototype.init = function() {
	var r, g, b;
	for(var i = 0; i < this.num; i++) {
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		this.color[i] = "rgb(" + r + "," + g + "," + b + ")";
	}
}

aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha); // [-1, 1]
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	for(var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.strokeStyle = this.color[i];
		ctx2.stroke();
	}
	ctx2.restore();
}