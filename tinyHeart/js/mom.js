var momObj = function() {
	this.x;
	this.y;
	this.angle;

	this.bigTailTimer = 0; // 尾巴计时器
	this.bigTailCount = 0; // 尾巴当前处于哪一帧

	this.bigEyeTimer = 0; // 眼睛计时器
	this.bigEyeCount = 0; // 眼睛当前处于哪一帧
	this.bigEyeInterval = 1000; // 闭眼

	this.bigBodyCount = 0; // 身体当前处于哪一帧
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

momObj.prototype.draw = function() {

	// lerp(让一个【值】趋向于一个【目标值】) x,y
	this.x = lerpDistance(mx, this.x, 0.97);
	this.y = lerpDistance(my, this.y, 0.98);

	// delta angle
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; // 反正切 (-π, π)

	// lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	// big tail count
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50) {
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}

	// big eye count
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval) {
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;

		if(this.bigEyeCount == 0) {
			this.bigEyeInterval = Math.random() * 1500 + 2000; // [2000, 3500) 下一帧时间（睁眼状态）
		} else {
			this.bigEyeInterval = 200; // 下一帧时间（眨眼状态）
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	if(data.double == 1) {
		ctx1.drawImage(bigBodyOra[this.bigBodyCount], -bigBodyOra[this.bigBodyCount].width * 0.5, -bigBodyOra[this.bigBodyCount].height * 0.5);
	} else {
		ctx1.drawImage(bigBodyBlue[this.bigBodyCount], -bigBodyBlue[this.bigBodyCount].width * 0.5, -bigBodyBlue[this.bigBodyCount].height * 0.5);
	}
	ctx1.drawImage(
		bigTail[this.bigTailCount], -bigTail[this.bigTailCount].width * 0.5 + 23, -bigTail[this.bigTailCount].height * 0.5);
	ctx1.drawImage(
		bigEye[this.bigEyeCount], -bigEye[this.bigEyeCount].width * 0.5, -bigEye[this.bigEyeCount].height * 0.5);
	ctx1.restore();
}