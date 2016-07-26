// 判断【大鱼】和【果实】的距离
function momFruitsCollision() {
	if(!data.gameOver) {
		for(var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]) {
				// calculate length
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);

				if(l < Math.pow(20, 2)) {
					// fruit eaten
					wave.born(fruit.x[i], fruit.y[i]);
					fruit.dead(i);
					data.fruitNum++;
					mom.bigBodyCount++;
					if(mom.bigBodyCount > 7) {
						mom.bigBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue") {
						data.double = 2;
					}
				}
			}
		}
	}
}

// 判断【大鱼】和【小鱼】的距离
function momBabyCollision() {
	if(!data.gameOver) {
		var l = calLength2(baby.x, baby.y, mom.x, mom.y);

		if(l < 900 && data.fruitNum > 0) {
			// 恢复生命值
			baby.babyBodyCount = 0;
			mom.bigBodyCount = 0;
			data.addScore();
			halo.born(baby.x, baby.y)
		}
	}
}