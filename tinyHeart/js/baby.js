var babyObj = function() {
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer = 0; // 尾巴计时器
	this.babyTailCount = 0; // 尾巴当前处于哪一帧

	this.babyEyeTimer = 0; // 眼睛计时器
	this.babyEyeCount = 0; // 眼睛当前处于哪一帧
	this.babyEyeInterval = 1000; // 闭眼

	this.babyBodyTimer = 0; // 身体计时器
	this.babyBodyCount = 0; // 身体当前处于哪一帧
}

babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
}

babyObj.prototype.draw = function() {

	// lerp(让一个【值】趋向于一个【目标值】) x,y
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.99);

	// delta angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; // 反正切 (-π, π)

	// lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	// baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	// baby eye count
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 + 2000; // [2000, 3500) 下一帧时间（睁眼状态）
		} else {
			this.babyEyeInterval = 200; // 下一帧时间（眨眼状态）
		}
	}

	// baby body
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300) {
		this.babyBodyCount++;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			// game over
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(
		babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * 0.5, -babyBody[this.babyBodyCount].height * 0.5);
	ctx1.drawImage(
		babyTail[this.babyTailCount], -babyTail[this.babyTailCount].width * 0.5 + 23, -babyTail[this.babyTailCount].height * 0.5);
	ctx1.drawImage(
		babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width * 0.5, -babyEye[this.babyEyeCount].height * 0.5);
	ctx1.restore();
}