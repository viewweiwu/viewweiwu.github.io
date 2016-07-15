(function() {
	var input = document.querySelector("#input");
	var box = {
		el: document.querySelector("#box"),
		direction: 2, // 方向  | 0: 上 | 1: 右 | 2: 下 | 3: 左 |
		x: 1,
		y: 1,
		timer: "",
		animateFlag: false
	}
	var walls = []; // 路障
	var ctrl = {
		/* 初始化 */
		"init": function() {
			var submit = document.querySelector("#submit");
			var refresh = document.querySelector("#refresh");
			var helloBtn = document.querySelector("#hello");
			var body = document.querySelector("body");
			var closeBtn = document.querySelector(".btn-close");
			var think = document.querySelector(".think");
			
			var ctrlFlag = false;
			var openFlag = true;

			// 关闭提示
			closeBtn.addEventListener('click', function() {
				var parent = this.parentElement;
				if(openFlag) {
					this.style.backgroundImage = "url('img/help.png')";
					parent.style.width = "40px";
					parent.style.height = "40px";
					parent.style.right = "-50px";
					openFlag = false;
				} else {
					this.style.backgroundImage = "url('img/close.png')";
					parent.style.width = "840px";
					parent.style.height = "840px";
					parent.style.right = "0";
					openFlag = true;
				}
			});

			// 转换大小写
			input.addEventListener('keyup', function(e) {
				this.value = this.value.toLocaleUpperCase();
			});

			// 阻止事件冒泡
			input.addEventListener('keydown', function(e) {
				e.stopPropagation();
			});

			body.addEventListener("keydown", function(e) {
				if(ctrlFlag) { return; }
				switch(e.which) {
					case 32:
						ctrl.animate("BUILD");
						break;
					case 37:
						if(box.direction != 3) {
							ctrl.animate("TUN", 3);
						} else {
							ctrl.animate("MOV LEF");
						}
						break;
					case 38:
						if(box.direction != 0) {
							ctrl.animate("TUN", 0);
						} else {
							ctrl.animate("MOV TOP");
						}
						break;
					case 39:
						if(box.direction != 1) {
							ctrl.animate("TUN", 1);
						} else {
							ctrl.animate("MOV RIG");
						}
						break;
					case 40:
						if(box.direction != 2) {
							ctrl.animate("TUN", 2);
						} else {
							ctrl.animate("MOV BOT");
						}
						break;
					case 67: // C
						ctrl.animate("BRU");
						break;
					case 82: // R
						ctrl.removeWall();
						break;
					case 71: // G
						ctrl.submit(input.value);
						break;
				}
			});

			input.addEventListener('scroll', function(e) {
				var ul = document.querySelector('.code-pnl ul');
				ul.style.top = -this.scrollTop + "px";
			});

			// 执行
			submit.addEventListener('click', function() {
				ctrl.submit(input.value);
			});

			// 刷新
			refresh.addEventListener('click', function() {
				ctrl.refresh();
			});
			
			// hello
			helloBtn.addEventListener('click', function() {
				var hello = "//H\nTRA RIG\nBUILD\nBRU\nMOV RIG 1\nMOV BOT 2\nTUN RIG\nBUILD\nBRU\nMOV BOT 1\nTUN RIG\nBUILD\nBRU\nMOV BOT 1\nTUN RIG\nBUILD\nBRU\nMOV BOT 1\nTUN RIG\nBUILD\nBRU\nTUN RIG\nGO\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nGO 2\nBUILD\nBRU\nTUN BAC\nGO\nTUN BAC\nBUILD\nBRU\nTUN BAC\nGO\nTUN BAC\nBUILD\nBRU\nTUN BAC\nGO\nTUN BAC\nBUILD\nBRU\nTUN BAC\nGO\nTUN BAC\nBUILD\nBRU\n// E\nMOV RIG 2\nTUN LEF\nGO 4\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV LEF 2\nBUILD\nBRU\nMOV BOT\nTUN RIG\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV BOT\nMOV LEF 2\nBUILD\nBRU\nMOV BOT\nTUN RIG\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\n// L\nMOV RIG\nMOV TOP 3\nBUILD\nBRU\nMOV BOT\nTUN BAC\nBUILD\nBRU\nMOV BOT\nTUN BAC\nBUILD\nBRU\nMOV BOT\nTUN BAC\nBUILD\nBRU\nMOV BOT\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\n// L\nMOV LEF 13\nMOV BOT 4\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nMOV RIG\nMOV BOT 4\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\n// O\nMOV RIG 2\nMOV TOP 4\nTUN BAC\nGO 3\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nMOV RIG 2\nTUN BAC\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\nMOV BOT 2\nTUN BAC\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nMOV LEF\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\n// V\nMOV BOT 2\nMOV LEF 9\nTUN LEF\nMOV BOT 2\nTUN BAC\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nMOV RIG 2\nTUN BAC\nBUILD\nBRU\nTUN LEF\nBUILD\nBRU\nTUN LEF\nBUILD\nBRU\nMOV TOP\nMOV RIG 3\nTUN BAC\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\n// I\nMOV RIG\nMOV TOP\nTUN BAC\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\nMOV RIG\nMOV BOT 2\nMOV LEF\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nMOV BOT\nMOV LEF\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\nTRA RIG\nBUILD\nBRU\n\n//E\nMOV RIG\nMOV TOP 3\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV RIG\nTUN LEF\nBUILD\nBRU\nMOV LEF 2\nBUILD\nBRU\nMOV BOT\nTUN RIG\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV BOT\nMOV LEF 2\nBUILD\nBRU\nMOV BOT\nTUN RIG\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\nMOV RIG\nTUN BAC\nBUILD\nBRU\n\n//W\nMOV RIG\nMOV TOP 3\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nMOV RIG 2\nTUN BAC\nBUILD\nBRU\nTUN RIG\nGO\nBUILD\nBRU\nTRA BOT\nBUILD\nBRU\nMOV RIG\nMOV TOP\nTUN BAC\nBUILD\nBRU\nMOV RIG\nMOV TOP\nTUN BAC\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\nTRA TOP\nBUILD\nBRU\n\nMOV LEF 4\nMOV TOP 4\nTUN BAC";
				
				ctrl.refresh();
				ctrlFlag = true;
				submit.disabled = true;
				refresh.disabled = true;
				helloBtn.disabled = true;
				think.style.display = "block";
				input.value = "我说“HELLO”比较慢。。。\n\n键盘和按钮已被禁用";
				ctrl.submit(hello);
				
				setTimeout(function(){
					ctrlFlag = false;
					submit.disabled = false;
					refresh.disabled = false;
					helloBtn.disabled = false;
					input.value = "谢谢你的耐心，接下来可以操作了！";
					think.style.display = "none";
					ctrl.onInputValueChange();
				},40000);
			});
			
			input.addEventListener('input', function(e) {
				e.stopPropagation();
				ctrl.onInputValueChange()
			});

			// 扩展数组 查看是否包含某个元素
			Array.prototype.contains = function(arr) {
				for(var i = 0; i < this.length; i++) { //this指向真正调用这个方法的对象  
					if(this[i] == arr) {
						return true;
					}
				}
				return false;
			}
			
			// 扩展数组 删除某个元素
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
				this.splice(index, 1);
				}
			};
			this.regs = [
				/^GO(\s+)?(\d+)?$/i,
				/^TUN\s+(LEF|RIG|BAC|[0-3])$/i,
				/^MOV\s+(LEF|TOP|RIG|BOT)(\s+)?(\w+)?$/i,
				/^TRA\s+(LEF|TOP|RIG|BOT)(\s+)?(\w+)?$/i,
				/^BUILD$/i,
				/^BRU(\s+)?(.*)?$/i
			];
		},
		/* 输入框输入改变 */
		"onInputValueChange": function() {
			var ul = document.querySelector('.code-pnl ul');
			var length = input.value.split("\n").length;
			var html = "<li>1</li>";
			for(var i = 1; i < length; i++) {
				html += "<li>" + (i + 1) + "</li>";
			}
			ul.innerHTML = html;
		},
		/* 提交命令列表 */
		"submit": function(key) {
			var eventList = key.split("\n");
			var event = {};
			this.onInputValueChange();
			for(var i = 0; i < eventList.length; i++) {
				(function(i) {
					setTimeout(function() {
						// 判断是否为空
						if(eventList[i].replace(/^\s+|\s+$/g, "") == "") {
							return;
						}
						event = ctrl.parse(eventList[i]);

						if(event) {
							if(event.step) {
								ctrl.animate(event.key, event.step);
							} else if(event.key == "TUN" && event.step == 0) {
								ctrl.animate(event.key, event.step);
							} else {
								ctrl.animate(event.key);
							}
						} else {
							ctrl.error(i);
						}
					}, 100 * i);
				})(i);
			}
		},
		/* 刷新 */
		"refresh": function(){
				box.el.style.top = "0";
				box.el.style.left = "0";
				box.x = 1;
				box.y = 1;
				box.direction = 2;
				input.value = "";
				
				for(var i = 0; i < walls.length; i++) {
						ctrl.removeElement(walls[i].el);
				}
				walls.length = 0;
				
				ctrl.onInputValueChange()
				ctrl.onDrctChange();
		},
		/* 获取命令列表 */
		"parse": function(command) {
			var event = {};
			var match = "";
			for(var i = 0; i < this.regs.length; i++) {
				match = command.match(this.regs[i]);
				if(match) {
					if(!isNaN(parseInt(match.slice(-1)))) { // 判断是否包含 步数) 
						// 获取步数
						event.step = parseInt(match.pop());
						// 获取命令
						event.key = match[0].replace(event.step, "").replace(/^\s+|\s+$/g, "");
					} else if(match[0].replace(match.slice(-1), "").replace(/^\s+|\s+$/g, "") == "BRU") { // 判断是否包含颜色
						// 获取步数
						event.step = match.pop();
						// 获取命令
						event.key = match[0].replace(event.step, "").replace(/^\s+|\s+$/g, "");
					} else {
						// 获取步数
						event.step = false;
						// 获取命令
						event.key = match[0];
					}
					return event;
				}
			}
			return false;
		},
		/* 执行命令 */
		"animate": function(key, step) {
			if(!box.animateFlag) {
				box.animateFlag = true;
				setTimeout(function() {
					box.animateFlag = false;
				}, 80);
				switch(key) {
					case "GO": // 向前移动
						this.go(step);
						break;
					case "TUN LEF": // 方向 向左 旋转90deg
						this.tun("left");
						break;
					case "TUN RIG": // 方向 向右 旋转90deg
						this.tun("right");
						break;
					case "TUN BAC": // 方向 向后 旋转90deg
						this.tun("back");
						break;
					case "TUN": // 旋转至 具体方向
						this.tun(step);
						break;
					case "TRA LEF": // 向左移动
						this.tra("left", step);
						break;
					case "TRA TOP": // 向上移动
						this.tra("top", step);
						break;
					case "TRA RIG": // 向右移动
						this.tra("right", step);
						break;
					case "TRA BOT": // 向下移动
						this.tra("bottom", step);
						break;
					case "MOV LEF": // 向左移动，并旋转至左侧
						this.move("left", step);
						break;
					case "MOV TOP": // 向上移动，并旋转至上侧
						this.move("top", step);
						break;
					case "MOV RIG": // 向右移动，并旋转至右侧
						this.move("right", step);
						break
					case "MOV BOT": // 向下移动，并旋转至下侧
						this.move("bottom", step);
						break;
					case "BUILD":
						this.build();
						break;
					case "BRU":
						this.bru(step);
						break;
				}
			}
		},
		/* 命令错误 */
		"error": function(i) {
			var errorLine = document.querySelectorAll('.code-pnl ul li');
			errorLine[i].classList.add("error");
		},
		/* 移动 */
		"go": function(step, drct) {
			var top = box.el.offsetTop;
			var left = box.el.offsetLeft;
			var flag = false;
			var touchFlag = false;
			var targetPosi = {
				x: 0, // x 坐标
				y: 0 // y 坐标
			}
			if(!step) {
				step = 1;
			}
			if(!drct && drct != 0) {
				drct = box.direction;
			}

			// 获取目的地的位置信息
			switch(drct) {
				case 3: // 向左移动
					targetPosi.x = box.x - step;
					targetPosi.y = box.y;
					// 判断当前位置 与 目的地之间是否有 障碍物
					for(var i = box.x - 1; i >= targetPosi.x; i--) {
						if(this.hasWall(i, box.y)) {
							touchFlag = true;
							break;
						}
					}
					break;
				case 0: // 向上移动
					targetPosi.x = box.x;
					targetPosi.y = box.y - step;
					// 判断当前位置 与 目的地之间是否有 障碍物
					for(var i = box.y - 1; i >= targetPosi.y; i--) {
						if(this.hasWall(box.x, i)) {
							touchFlag = true;
							break;
						}
					}
					break;
				case 1: // 向右移动
					targetPosi.x = box.x + step;
					targetPosi.y = box.y;
					// 判断当前位置 与 目的地之间是否有 障碍物
					for(var i = box.x + 1; i <= targetPosi.x; i++) {
						if(this.hasWall(i, box.y)) {
							touchFlag = true;
							break;
						}
					}
					break;
				case 2: // 向下移动
					targetPosi.x = box.x;
					targetPosi.y = box.y + step;
					// 判断当前位置 与 目的地之间是否有 障碍物
					for(var i = box.y + 1; i <= targetPosi.y; i++) {
						if(this.hasWall(box.x, i)) {
							touchFlag = true;
							break;
						}
					}
					break;
			}

			if(flag) {
				console.log("碰到墙壁了");
			} else if(touchFlag) {
				console.log("碰到障碍物了");
			} else {
				box.x = targetPosi.x;
				box.y = targetPosi.y;
				box.el.style.left = (box.x - 1) * 40 + "px";
				box.el.style.top = (box.y - 1) * 40 + "px";
			}
		},
		/* 改变方向 */
		"tun": function(drct) {
			if(drct == box.direction) {
				return;
			} // 方向无需改变
			// 确定方向
			if(typeof(drct) == "number") {
				box.direction = drct;
			} else {
				switch(drct) {
					case "left":
						box.direction - 1 < 0 ? box.direction = 3 : box.direction--;
						break;
					case "right":
						box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
						break;
					case "back":
						box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
						box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
						break;
				}
			}

			this.onDrctChange();
		},
		/* 移动 不 改变方向 */
		"tra": function(drct, step) {
			// 格式化方向
			drct = this.drctFormat(drct, "number");
			// 移动
			this.go(step, drct);
		},
		/* 移动 并 改变方向 */
		"move": function(drct, step) {
			// 改变方向
			this.tun(this.drctFormat(drct, "number"));
			// 移动
			this.tra(drct, step);
		},
		/* 创建障碍物 */
		"build": function() {
			var wall = {
				el: "",
				x: 0,
				y: 0
			}
			var floor = document.querySelector(".floor");

			wall.el = document.createElement("div")
			wall.el.className = "wall";

			switch(box.direction) {
				case 3:
					wall.x = (box.x - 1);
					wall.y = box.y;
					break;
				case 0:
					wall.x = box.x;
					wall.y = (box.y - 1);
					break;
				case 1:
					wall.x = (box.x + 1);
					wall.y = box.y;
					break;
				case 2:
					wall.x = box.x;
					wall.y = (box.y + 1);
					break;
			}
			wall.el.style.left = (wall.x - 1) * 40 + "px";
			wall.el.style.top = (wall.y - 1) * 40 + "px";
			if(!this.hasWall(wall.x, wall.y)) {
				floor.appendChild(wall.el);
				walls.push(wall);
			}
		},
		/* 改变颜色 */
		"bru": function(color) {
			var x = 0,
				y = 0;
			var wall = "";
			if(!color) {
				color = "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
			}
			switch(box.direction) {
				case 3:
					x = (box.x - 1);
					y = box.y;
					break;
				case 0:
					x = box.x;
					y = (box.y - 1);
					break;
				case 1:
					x = (box.x + 1);
					y = box.y;
					break;
				case 2:
					x = box.x;
					y = (box.y + 1);
					break;
			}
			wall = this.hasWall(x, y);
			if(wall && wall.el) {
				wall.el.style.backgroundColor = color;
			}
		},
		/* 方向格式化 */
		"drctFormat": function(value, type) {
			switch(type) {
				case "number": // 数字
					if([3, "left", "LEF"].contains(value)) {
						return 3;
					} else if([0, "top", "TOP"].contains(value)) {
						return 0;
					} else if([1, "right", "RIG"].contains(value)) {
						return 1;
					} else if([2, "bottom", "BOT"].contains(value)) {
						return 2;
					}
					break;
				case "lowerCase": // 小写字母
					if([3, "left", "LEF"].contains(value)) {
						return "left";
					} else if([0, "top", "TOP"].contains(value)) {
						return "top";
					} else if([1, "right", "RIG"].contains(value)) {
						return "right";
					} else if([2, "bottom", "BOT"].contains(value)) {
						return "bottom";
					}
					break;
				case "lowerCaseShort": // 小写字母 简写
					if([3, "left", "LEF"].contains(value)) {
						return "lef";
					} else if([0, "top", "TOP"].contains(value)) {
						return "top";
					} else if([1, "right", "RIG"].contains(value)) {
						return "rig";
					} else if([2, "bottom", "BOT"].contains(value)) {
						return "bot";
					}
					break;
				case "upperCase": // 大写字母
					if([3, "left", "LEF"].contains(value)) {
						return "LEF";
					} else if([0, "top", "TOP"].contains(value)) {
						return "TOP";
					} else if([1, "right", "RIG"].contains(value)) {
						return "RIG";
					} else if([2, "bottom", "BOT"].contains(value)) {
						return "BOT";
					}
					break;
			}
			return false;
		},
		/* 改变行走图方向 */
		"onDrctChange": function() {
			box.el.className = "box";
			switch(box.direction) {
				case 3:
					box.el.classList.add("lef");
					break;
				case 0:
					box.el.classList.add("top");
					break;
				case 1:
					box.el.classList.add("rig");
					break;
				case 2:
					box.el.classList.add("bot");
					break;
			}
		},
		/* 判断是否有障碍 */
		"hasWall": function(x, y) {

			// 判断是否超出边界
			if(x < 1 || x > 20 || y < 1 || y > 20) {
				return true;
			}

			// 遍历 障碍列表，看是否存在障碍
			for(var i = 0; i < walls.length; i++) {
				if(walls[i].x == x && walls[i].y == y) {
					return walls[i];
				}
			}

			return false;
		},
		"removeWall": function() {
			var x = 0,
				y = 0;
			switch(box.direction) {
				case 3:
					x = (box.x - 1);
					y = box.y;
					break;
				case 0:
					x = box.x;
					y = (box.y - 1);
					break;
				case 1:
					x = (box.x + 1);
					y = box.y;
					break;
				case 2:
					x = box.x;
					y = (box.y + 1);
					break;
			}
			for(var i = 0; i < walls.length; i++) {
				if(walls[i].x == x && walls[i].y == y) {
					this.removeElement(walls[i].el);
					walls.remove(walls[i]);
					
				}
			}
		},
		"removeElement": function(_element) {
			var _parentElement = _element.parentNode;
			if(_parentElement) {
				_parentElement.removeChild(_element);
			}
		}
	}
	ctrl.init();
})();
