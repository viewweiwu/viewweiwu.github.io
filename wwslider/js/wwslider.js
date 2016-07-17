/*
 *	最后修改时间： 2016/07/17
 *  修改日志： 2016/07/17 解决当前页面出现连个 slider 的时候，会把之前的 选择页 抵消
 * */
;
(function($) {
	// 默认参数
	var defaluts = {
		w: 0,
		h: 0,
		direction: "right", // 轮播方向
		autoMove: true, // 自动轮播
		pointList: true, // 是否有下面的小点点
		arrowBtn: true, // 有左右箭头按钮
		pointStyle: "square", // 下面的小点点 的类型
		animateSpeed: 500, // 执行动画的速度
		timerSpeed: 5000 // 执行n毫秒 向右移动一次
	};
	var opts = {};
	$.fn.extend({
		"page": 0,
		"timer": '',
		"moveFlag": false,
		"slideLiWidth": 0,
		"slideUlMaxWidth": 0,
		"slideUlMarginLeft": 0,
		"wwslider": function(options) {
			opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
			return this.sliderInit();
		},
		"sliderInit": function() {
			var me = this;
			var $slideUl = me.find('.slide-ul');
			var $slideLiList = $slideUl.find('li');

			var $pointList = me.find('.point-list').remove();

			var w = opts.w;
			var h = opts.h;

			me.slideUlMarginLeft = 0;
			me.slideUlMaxWidth = 0;
			me.timer = ''; // 计时器
			me.moveFlag = false;
			me.page = 1;

			if(w != 0 && h != 0) {
				me.css({
					width: w,
					height: h
				});
			} else {
				w = me.width();
				h = me.height();
			}

			$slideLiList.width(w);
			$slideUl.width(w * $slideLiList.length);
			me.slideUlMaxWidth = w * ($slideLiList.length - 1);
			me.slideLiWidth = w;

			if(opts.pointList) {
				$pointList = $('<ul class="point-list"></ul>').appendTo(me);
				$pointList.addClass(opts.pointStyle);
				// 生成小点点
				for(var i = 0; i < $slideLiList.length; i++) {
					switch(opts.pointStyle) {
						case "square":
							$pointList.append('<li></li>');
							break;
						case "number":
							$pointList.append('<li>' + (i + 1) + '</li>');
							break;
					}
				}
				$pointLiList = $pointList.find('li');

				switch(opts.pointStyle) {
					case "square":
						// 设置小点点宽度
						$pointLiList.width(w / $pointLiList.length - 2);
						break;
				}

				// 让小点点第一个设为选中状态
				$pointLiList.eq(me.page - 1).addClass('on');

				// 绑定小点点点击事件
				$pointLiList.bind('click', function() {
					me.movePage($(this).index() + 1);
				})
			}

			if(opts.arrowBtn) {
				me.find('.lt').remove();
				me.find('.gt').remove();
				$('<span class="lt"></span>').appendTo(me).bind('click', function() {
					me.moveLeft();
				})
				$('<span class="gt"></span>').appendTo(me).bind('click', function() {
					me.moveRight();
				})
			}

			if(opts.autoMove) {
				me.initTimer();
			}
			return me;
		},
		"moveLeft": function() {
			var me = this;
			var $slideUl = me.find('.slide-ul');
			var $slideLiList = $slideUl.find('li');

			var $pointList = me.find('.point-list');

			if(!me.moveFlag) {
				if(opts.autoMove) {
					me.initTimer();
				}
				me.moveFlag = true;
				me.page == 1 ? me.page = me.slideUlMaxWidth / me.slideLiWidth + 1 : me.page--;
				if(opts.pointList) {
					$pointList.find('li').eq(me.page - 1).addClass('on').siblings().removeClass('on');
				}
				$slideUl.animate({
					'margin-left': me.slideUlMarginLeft == 0 ? me.slideUlMaxWidth * -1 : '+=' + me.slideLiWidth
				}, opts.animateSpeed, function() {
					me.moveFlag = false;
					me.slideUlMarginLeft = Math.abs(parseInt($slideUl.css('margin-left')));
				});
			}
			return this;
		},
		"moveRight": function() {
			var me = this;
			var $slideUl = me.find('.slide-ul');
			var $slideLiList = $slideUl.find('li');

			var $pointList = me.find('.point-list');

			if(!me.moveFlag) {
				if(opts.autoMove) {
					me.initTimer();
				}
				me.moveFlag = true;
				me.page == me.slideUlMaxWidth / me.slideLiWidth + 1 ? me.page = 1 : me.page++;
				if(opts.pointList) {
					$pointList.find('li').eq(me.page - 1).addClass('on').siblings().removeClass('on');
				}
				$slideUl.animate({
					'margin-left': me.page == 1 ? 0 : '-=' + me.slideLiWidth
				}, opts.animateSpeed, function() {
					me.moveFlag = false;
					me.slideUlMarginLeft = Math.abs(parseInt($slideUl.css('margin-left')));
				});
			}
			return this;
		},
		"movePage": function(num) {
			var me = this;
			var $slideUl = me.find('.slide-ul');
			var $slideLiList = $slideUl.find('li');

			var $pointList = me.find('.point-list');

			if(num < 1) {
				num = 1;
			} else if(num > $slideLiList.length) {
				num = $slideLiList.length;
			}

			if(!me.moveFlag) {
				if(opts.autoMove) {
					me.initTimer();
				}
				me.moveFlag = true;
				me.slideUlMarginLeft = (num - 1) * me.slideLiWidth * -1;
				me.page = num;
				if(opts.pointList) {
					$pointList.find('li').eq(me.page - 1).addClass('on').siblings().removeClass('on');
				}
				$slideUl.animate({
					'margin-left': me.slideUlMarginLeft
				}, opts.animateSpeed, function() {
					me.moveFlag = false;
					me.slideUlMarginLeft = (num - 1) * me.slideLiWidth * -1;
				});
			}
			return this;
		},
		"initTimer": function() {
			var me = this;
			if(me.timer) {
				clearTimeout(me.timer);
			}
			// 每隔 n 毫秒向右移动一次
			me.timer = setTimeout(function() {
				if(opts.direction == 'left') {
					me.moveLeft();
				} else if(opts.direction == 'right') {
					me.moveRight();
				}
			}, opts.timerSpeed);
		},
		"clearTimer": function() {
			var me = this;
			if(me.timer) {
				clearTimeout(me.timer);
			}
			return me;
		}
	});
})(window.jQuery);