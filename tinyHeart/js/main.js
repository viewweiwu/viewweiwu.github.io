var can1, can2, ctx1, ctx2;
var canWidth,
	canHeight;
var lastTime, // 上一帧绘制的时间
	deltaTime; // 和上一帧的时间差
var bgImg; // 背景

var ane, // 海葵
	fruit, // 果实
	mom, // 鱼妈妈
	baby; // 鱼宝宝

var mx,
	my;

var babyTail = [], //小鱼尾巴
	babyEye = [], //小鱼眼睛
	babyBody = []; //小鱼身体

var bigTail = [], // 大鱼尾巴
	bigEye = [], // 大鱼眼睛
	bigBodyOra = [], // 大鱼橙色身体
	bigBodyBlue = []; // 大鱼蓝色身体

var data;

var wave,
	halo; // 碰撞产生的涟漪
	
var dust,
	dustPic= []; // 漂浮物

document.body.onload = game;

function game() {
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init() {
	//获得canvas context
	can1 = document.getElementById("canvas1"); // 大鱼和小鱼、漂浮物、漂浮物、ui、圆
	can2 = document.getElementById("canvas2"); // 背景、海葵、果实
	ctx1 = can1.getContext("2d");
	ctx2 = can2.getContext("2d");
	canWidth = can1.width;
	canHeight = can1.height;

	ctx1.fillStyle = "#fff";
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
	
	can1.addEventListener("mousemove", onMousemove, false);

	bgImg = new Image();
	bgImg.src = "img/background.jpg";

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	data = new dataObj();
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	// 漂浮物
	dust = new dustObj();
	dust.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	// 初始化小鱼尾巴
	for(var i = 0; i <= 7; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/babyTail" + i + ".png";
	}

	// 初始化小鱼眼睛
	for(var i = 0; i <= 1; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "img/babyEye" + i + ".png";
	}

	// 初始化小鱼身体
	for(var i = 0; i <= 19; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/babyFade" + i + ".png";
	}

	// 初始化大鱼尾巴
	for(var i = 0; i <= 7; i++) {
		bigTail[i] = new Image();
		bigTail[i].src = "img/bigTail" + i + ".png";
	}

	// 初始化大鱼眼睛
	for(var i = 0; i <= 1; i++) {
		bigEye[i] = new Image();
		bigEye[i].src = "img/bigEye" + i + ".png";
	}

	// 初始化大鱼身体
	for(var i = 0; i <= 7; i++) {
		bigBodyOra[i] = new Image();
		bigBodyBlue[i] = new Image();
		bigBodyOra[i].src = "img/bigSwim" + i + ".png";
		bigBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
	}
	
	// 漂浮物图片
	
	for(var i = 0; i <= 6; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "img/dust" + i + ".png";
	}
}

function gameloop() {
	var now = Date.now();
	requestAnimFrame(gameloop);
	deltaTime = now - lastTime;
	lastTime = now;

	ctx1.clearRect(0, 0, canWidth, canHeight);
	
	fruitMonitor();
	momFruitsCollision();
	momBabyCollision();
	
	drawBg();
	ane.draw();
	fruit.draw();
	mom.draw();
	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMousemove(e) {
	if(!data.gameOver) {
		if(e.offSetX || e.layerX) {
			mx = e.offSetX || e.layerX;
			my = e.offSetY || e.layerY;
		}
	}
}