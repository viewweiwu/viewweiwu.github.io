(function() {
	var input = document.querySelector("#input");
	var box = {
		el: document.querySelector("#box"),
		rotate: 0, // 旋转角度
		direction: 2, // 方向  | 0: 上 | 1: 右 | 2: 下 | 3: 左 |
		x: 2,
		y: 2,
		timer: "",
		animateFlag: false
	}
	var ctrl = {
		"init": function() {
			var submit = document.querySelector("#submit");
			var refresh = document.querySelector("#refresh");
			var body = document.querySelector("body");
			var closeBtn = document.querySelector(".btn-close");
			var openFlag = true;

			input.value = "TUN BAC\nGO 2\nMOV RIG 3\nHELLO WORLD\nTUN BAC\nTUN LEF\nGO @VIEW\nMOV BOT 5";
			this.onInputValueChange();

			input.addEventListener('input', function(e) {
				e.stopPropagation();
				ctrl.onInputValueChange()
			});

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
				switch(e.which) {
					case 37:
						ctrl.animate("MOV LEF");
						break;
					case 38:
						ctrl.animate("MOV TOP");
						break;
					case 39:
						ctrl.animate("MOV RIG");
						break;
					case 40:
						ctrl.animate("MOV BOT");
						break;
				}
			});

			input.addEventListener('scroll', function(e) {
				var ul = document.querySelector('.code-pnl ul');
				ul.style.top = -this.scrollTop + "px";
			});

			submit.addEventListener('click', function() {
				ctrl.submit(input.value);
			});

			refresh.addEventListener('click', function() {
				box.el.style.top = "80px";
				box.el.style.left = "80px";
				input.value = "";
				ctrl.onInputValueChange()
			});

			Array.prototype.contains = function(arr) {
				for(var i = 0; i < this.length; i++) { //this指向真正调用这个方法的对象  
					if(this[i] == arr) {
						return true;
					}
				}
				return false;
			}
			this.regs = [
				/^GO(\s+)?(\d+)?$/i,
				/^GO\s+to\s+(\d+)[,\s+](\d+)$/i,
				/^TUN\s+(LEF|RIG|BAC)$/i,
				/^MOV\s+(LEF|TOP|RIG|BOT)(\s+)?(\w+)?$/i,
				/^TRA\s+(LEF|TOP|RIG|BOT)(\s+)?(\w+)?$/i
			];
		},
		"onInputValueChange": function() {
			var ul = document.querySelector('.code-pnl ul');
			var length = input.value.split("\n").length;
			var html = "<li>1</li>";
			for(var i = 1; i < length; i++) {
				html += "<li>" + (i + 1) + "</li>";
			}
			ul.innerHTML = html;
		},
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
							} else {
								ctrl.animate(event.key);
							}
						} else {
							ctrl.error(i);
						}
					}, 210 * i);
				})(i);
			}
		},
		"parse": function(command) {
			var event = {};
			var match = "";
			for(var i = 0; i < this.regs.length; i++) {
				match = command.match(this.regs[i]);
				if(match) {
					if(!isNaN(parseInt(match.slice(-1)))) { // 判断是否包含 步数
						// 获取步数
						event.step = parseInt(match.pop());
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
		"animate": function(key, step) {
			if(!box.animateFlag) {
				box.animateFlag = true;
				setTimeout(function() {
					box.animateFlag = false;
				}, 200);
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
				}
			}
		},
		"error": function(i) {
			var errorLine = document.querySelectorAll('.code-pnl ul li');
			errorLine[i].classList.add("error");
		},
		"go": function(step, drct) {
			var top = box.el.offsetTop;
			var left = box.el.offsetLeft;
			var flag = false;
			if(!step) {
				step = 1;
			}
			if(!drct && drct != 0) {
				drct = box.direction;
			}
			switch(drct) {
				case 3: // 向左移动
					if(box.x - step < 0) {
						flag = true
					} else {
						box.x -= step;
						box.el.style.left = box.x * 40 + "px";
					}
					break;
				case 0: // 向上移动
					if(box.y - step < 0) {
						flag = true
					} else {
						box.y -= step;
						box.el.style.top = box.y * 40 + "px";
					}
					break;
				case 1: // 向右移动
					if(box.x + step >= 20) {
						flag = true
					} else {
						box.x += step;
						box.el.style.left = box.x * 40 + "px";
					}
					break;
				case 2: // 向下移动
					if(box.y + step >= 20) {
						flag = true
					} else {
						box.y += step;
						box.el.style.top = box.y * 40 + "px";
					}
					break;
			}
			if(flag) {
				console.log("碰到墙壁了")
			};
		},
		"tun": function(drct) {
			// 确定方向
			switch(drct) {
				case "left":
					box.direction - 1 < 0 ? box.direction = 3 : box.direction--;
					box.rotate -= 90;
					break;
				case "right":
					box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
					box.rotate += 90;
					break;
				case "back":
					box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
					box.direction + 1 > 3 ? box.direction = 0 : box.direction++;
					box.rotate += 180;
					break;
			}
			this.onDrctChange();
		},
		"tra": function(drct, step) {
			// 转换方向
			drct = this.drctFormat(drct, "number");
			// 移动
			this.go(step, drct);
		},
		"move": function(drct, step) {
			// 记录方向
			box.direction = this.drctFormat(drct, "number");
			// 改变方向
			this.onDrctChange();
			// 移动
			this.tra(drct, step);
		},
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
		"onDrctChange": function() {
			// 改变行走图方向
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
		}
	}
	ctrl.init();
})();
