var dataObj = function() {
	this.fruitNum = 0;
	this.double = 1; // 是否吃到蓝色果实(1:no | 2:yes)
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.draw = function() {
	var w = canWidth,
		h = canHeight;
	
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "#fff";

	ctx1.fillText("SCORE:" + this.score, w * 0.5, h - 20);

	if(this.gameOver) {
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		ctx1.fillText("GAMEOVER", w * 0.5, h * 0.5);
	}
	ctx1.restore();
}

dataObj.prototype.addScore = function() {
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}