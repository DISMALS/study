var requirejs, require, define;
(function(global) {
	var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.11",
		commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
		cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
		jsSuffixRegExp = /\.js$/,
		currDirRegExp = /^\.\//,
		op = Object.prototype,
		ostring = op.toString,
		hasOwn = op.hasOwnProperty,
		ap = Array.prototype,
		apsp = ap.splice,
		isBrowser = !! (typeof window !== "undefined" && typeof navigator !== "undefined" && window.document),
		isWebWorker = !isBrowser && typeof importScripts !== "undefined",
		readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
		defContextName = "_",
		isOpera = typeof opera !== "undefined" && opera.toString() === "[object Opera]",
		contexts = {}, cfg = {}, globalDefQueue = [],
		useInteractive = false;
function newTopslider(k) {
	var t = jQuery(k);
	if (t.length < 1) {
		return
	}
	var s = null;
	var l = jQuery("#site_header");
	var o = l.css("padding-top");
	if (o && o.indexOf("px") >= 0) {
		o = o.replace("px", "")
	}
	if (l.attr("data-hfix")) {
		s = l.attr("data-hfix")
	}
	var r = t.find(".index_topbanner_fold");
	var q = t.find(".big_topbanner");
	var n = jQuery("#smallTopBanner");
	r.click(function() {
		if ($(this).hasClass("index_topbanner_unfold")) {
			$(this).removeClass("index_topbanner_unfold");
			$(this).html("展开<s></s>");
			q.slideUp();
			n.slideDown();
			if (s) {
				l.animate({
					"padding-top": o + "px"
				})
			}
		} else {
			$(this).addClass("index_topbanner_unfold");
			$(this).html("收起<s></s>");
			q.slideDown();
			n.slideUp();
			if (s) {
				l.animate({
					"padding-top": (o - s) + "px"
				})
			}
		}
	});
	var p = q.find("img");
	if (p && p.length > 0) {
		p.attr("src", p.attr(isWidescreen ? "wideimg" : "shortimg")).removeAttr("wideimg").removeAttr("shortimg")
	}
	p.eq(0).load(function() {
		var c = window.navigator.userAgent.toLowerCase();
		var b = /msie ([\d\.]+)/;
		if (b.test(c)) {
			var d = parseInt(b.exec(c)[1]);
			if (d <= 6) {
				var a = $(this).height();
				if (a > 450) {
					$(this).css("height", 450)
				}
			}
		}
		if (s) {
			l.animate({
				"padding-top": (o - s) + "px"
			})
		}
		t.slideDown();
		lamuSlidUpAuto(r)
	});
	var m = n.find("img");
	m.each(function(b, a) {
		jQuery(a).attr("src", jQuery(a).attr(isWidescreen ? "wideimg" : "shortimg")).removeAttr("wideimg").removeAttr("shortimg")
	})
}

function lamuSlidUpAuto(e) {
	var f = function() {
		e.trigger("click")
	};
	var d = setTimeout(f, 5000);
	e.click(function() {
		clearInterval(d)
	})
}
runfunctions([], [initHeader, initProvince, initAllMiniCart, searchKeywords_onDocumentReady], this);

function runfunctions(i, j, n) {
	if (!(j && j.length)) {
		return
	}
	n = n || window;
	for (var e = 0; e < j.length; e++) {
		var k = j[e];
		var l = (i && i.length > e) ? i[e] : [];
		if (typeof k == "function") {
			try {
				k.apply(n, l)
			} catch (m) {}
		}
	}
}(function() {
	function b(a) {
		this.option = {
			container: null,
			content: null,
			trigger: null,
			pageButton: [],
			steps: 1,
			effect: "visible",
			autoPlay: false,
			interval: 3000,
			activeClass: "on",
			speed: 300,
			eventType: "mouseover",
			delay: 0
		};
		$.extend(this.option, a);
		this.index = 0;
		this.timer = 0;
		this.handlers = {};
		this.box = $(this.option.container);
		if (this.box.length == 0) {
			return false
		}
		this.sprite = this.box.find(this.option.content);
		if (this.sprite.length == 0) {
			return false
		}
		this.trig = this.box.find(this.option.trigger).children();
		this.btnLast = this.box.find(this.option.pageButton[0]);
		this.btnNext = this.box.find(this.option.pageButton[1]);
		this.items = this.sprite.children();
		if (this.items.length == 0) {
			return false
		}
		this.total = this.items.length;
		if (this.total <= this.option.steps) {
			return false
		}
		this.page = Math.ceil(this.total / this.option.steps);
		this.width = this.items.eq(0).outerWidth(true);
		this.height = this.items.eq(0).outerHeight(true);
		this.init()
	}
	b.prototype = {
		init: function() {
			this.initStyle();
			this.cutover(0);
			this.bindUI();
			this.autoPlay()
		},
		on: function(d, a) {
			if (typeof this.handlers[d] == "undefined") {
				this.handlers[d] = []
			}
			this.handlers[d].push(a);
			return this
		},
		fire: function(h, g) {
			if (this.handlers[h] instanceof Array) {
				var j = this.handlers[h];
				for (var i = 0, a = j.length; i < a; i++) {
					j[i](g)
				}
			}
		},
		initStyle: function() {
			var a = function(c) {
				for (var d = 0; d < c.option.steps; d++) {
					c.items.eq(c.total - (d + 1)).clone().prependTo(c.sprite);
					c.items.eq(d).clone().appendTo(c.sprite)
				}
			};
			switch (this.option.effect) {
				case "scrollx":
					a(this);
					this.sprite.css({
						width: this.sprite.children().length * this.width,
						left: -this.option.steps * this.width
					});
					this.sprite.children().css("float", "left");
					break;
				case "scrolly":
					a(this);
					this.sprite.css({
						top: -this.option.steps * this.height
					});
					break;
				case "fade":
					this.items.css({
						position: "absolute",
						zIndex: 0
					}).eq(this.index).css({
						zIndex: 1
					});
					break;
				case "visible":
					this.items.css({
						display: "none"
					}).eq(this.index).css({
						display: "block"
					});
					break
			}
			var e = this;
			var f = setTimeout(function() {
				clearTimeout(f);
				e.fire("init")
			}, 30)
		},
		cutover: function(i) {
			var h = (i == null) ? this.option.speed : 0;
			var g = this.index != this.page ? this.index : 0;
			this.trig.eq(g).addClass(this.option.activeClass).siblings().removeClass(this.option.activeClass);
			switch (this.option.effect) {
				case "visible":
					this.items.css({
						display: "none"
					}).eq(g).css({
						display: "block"
					});
					break;
				case "fade":
					this.items.css({
						position: "absolute",
						zIndex: 0
					}).fadeOut(h);
					this.items.eq(g).css({
						zIndex: 1
					}).fadeIn(h);
					break;
				case "scrollx":
					var a = this.width * this.option.steps;
					this.sprite.stop().animate({
						left: -a * this.index - a
					}, h);
					break;
				case "scrolly":
					var j = this.height * this.option.steps;
					this.sprite.stop().animate({
						top: -j * this.index - j
					}, h);
					break
			}
			this.fire("cutover", g)
		},
		bindUI: function() {
			var d = this;
			var a = 0;
			this.trig.bind(this.option.eventType, function() {
				var c = this;
				if (d.option.eventType == "mouseover" || d.option.eventType == "mouseenter") {
					if (d.index == $(c).index()) {
						return
					}
					clearTimeout(a);
					a = setTimeout(function() {
						d.index = $(c).index();
						d.cutover();
						clearTimeout(a)
					}, d.option.delay)
				} else {
					d.index = $(this).index();
					d.cutover()
				}
			});
			this.btnLast.click(function() {
				d.lastPage()
			});
			this.btnNext.click(function() {
				d.nextPage()
			});
			this.box.bind({
				mouseenter: function() {
					d.btnLast.show();
					d.btnNext.show();
					clearInterval(d.timer)
				},
				mouseleave: function() {
					d.btnLast.hide();
					d.btnNext.hide();
					d.autoPlay()
				}
			})
		},
		lastPage: function() {
			this.index--;
			if (this.index < -1) {
				this.index = this.page - 1;
				this.cutover(0);
				this.index = this.page - 2
			}
			this.cutover()
		},
		nextPage: function() {
			this.index++;
			if (this.index > this.page) {
				this.index = 0;
				this.cutover(0);
				this.index = 1
			}
			this.cutover()
		},
		autoPlay: function() {
			var a = this;
			if (!this.option.autoPlay) {
				return false
			}
			clearInterval(this.timer);
			this.timer = setInterval(function() {
				a.nextPage()
			}, this.option.interval)
		}
	};
	window.Switchable = b
})();
(function(b) {
	YHD.HomePage = new function() {
		this.init = function() {
			newTopslider("#topCurtain");
			a("#hd_head_skin");
			$("body").delegate("a", "click", function() {
				$(this).css("outline", "none")
			})
		};

		function a(i) {
			var g = b(i);
			if (g.length > 0) {
				var h = $.parseJSON(g.attr(isWidescreen ? "data-wiData" : "data-siData")),
					j = [];
				$.each(h, function(d, c) {
					j.push('<div style="background: url(&quot;' + c.url + "&quot;) no-repeat scroll center top; height: " + c.height + 'px;"></div>')
				});
				if (j.length > 0) {
					g.prepend(j.join(""))
				}
			}
		}
	}
})(jQuery);

function getAjaxProductPrice(h) {
	if (!jQuery.cookie("provinceId") && !$(h)) {
		return
	}
	var i = URLPrefix.busystock ? URLPrefix.busystock : "http://gps.yhd.com";
	var j = "?mcsite=" + currBsSiteId + "&provinceId=" + jQuery.cookie("provinceId");
	var f = $(h).find("[productid]");
	jQuery.each(f, function(a, b) {
		var c = $(b).attr("productid");
		if (c != null && c != "") {
			j += "&productIds=" + c
		}
	});
	var g = i + "/busystock/restful/truestock";
	jQuery.getJSON(g + j + "&callback=?", function(a) {
		if (a == null || a == "") {
			return
		}
		jQuery.each(a, function(c, e) {
			var d = $(h).find("[productid='" + e.productId + "']");
			if (d) {
				var b = "¥" + e.productPrice + "</strong>";
				d.html(b).removeAttr("productid")
			}
		})
	})
}

function reflushGrouponData(j) {
	var m = jQuery(j);
	if (m.length < 1) {
		return
	}
	var n = jQuery.cookie("provinceId");
	if (!n) {
		return
	}
	var h = m.find("[data-grouponId]");
	if (!h || h.length < 1) {
		return
	}
	var l = [];
	jQuery.each(h, function(a, b) {
		var c = $(b).attr("data-grouponId");
		l.push("grouponIds=" + c)
	});
	var k = URLPrefix.busystock ? URLPrefix.busystock : "http://gps.yihaodian.com";
	var i = k + "/restful/groupon?provinceId=" + n + "&" + l.join("&") + "&callback=?";
	jQuery.getJSON(i, function(e) {
		if (e == null || e == "" || e.length < 1) {
			return
		}
		for (var f = 0, c = e.length; f < c; f++) {
			var d = e[f];
			var a = d.grouponId;
			if (d.code == 1) {
				var b = m.find("[data-grouponId='" + a + "']");
				if (b) {
					b.html("<em><i>" + d.soldNum + "</i>人已购买</em>¥<b>" + d.currentPrice + "</b><span>参考价:</span><del>¥" + d.marketPrice + "</del>");
					b.removeAttr("data-grouponId")
				}
			}
		}
	})
}

function getGrouponBrandData(g) {
	var j = jQuery(g);
	if (j.length < 1) {
		return
	}
	var h = j.find("[data-grouponBrandId]");
	if (!h || h.length < 1) {
		return
	}
	var i = [];
	jQuery.each(h, function(a, b) {
		var c = $(b).attr("data-grouponBrandId");
		i.push(c)
	});
	var f = currDomain + "/homepage/grouponBrand.do?brandIds=" + i.join(",");
	jQuery.getJSON(f, function(a) {
		if (a == null || a == "" || a.length < 1) {
			return
		}
		for (var c in a) {
			var d = a[c];
			var c = d.brandId;
			var b = j.find("[data-grouponBrandId='" + c + "']");
			if (b) {
				b.append("<span><b>" + (d.rebate || 0) + "</b>折起</span><em><i>" + (d.peopleNumber || 0) + "</i>人已购买</em>");
				b.removeAttr("data-grouponId")
			}
		}
	})
}

function getShanData(h) {
	var j = jQuery(h);
	if (j.length < 1) {
		return
	}
	var f = j.find("[data-shanActivityId]");
	if (!f || f.length < 1) {
		return
	}
	var i = [];
	jQuery.each(f, function(c, b) {
		var a = $(b).attr("data-shanActivityId");
		i.push(a)
	});
	var g = currDomain + "/homepage/shanActivityData.do?activityIds=" + i.join(",");
	jQuery.getJSON(g, function(r) {
		if (!r || r.status == 0 || !r.result) {
			return true
		}
		var e = r.result;
		for (var a in e) {
			var s = e[a];
			if (s) {
				var t = s.id;
				var c = s.discountInfo;
				var q = s.discountType;
				var p = j.find("[data-shanActivityId='" + t + "']");
				if (p) {
					if (q == 1) {
						p.append("<u><b>" + (c || 0) + "</b>折起</u>")
					} else {
						if (q == 2) {
							p.append("<u><b>" + (c || 0) + "</b>折封顶</u>")
						}
					}
					p.removeAttr("data-shanActivityId")
				}
				var d = s.remainTime;
				var b = p.parent().find("p");
				countdownTime(b, d)
			}
		}
	})
}

function countdownTime(j, k) {
	if (k && k >= 0) {
		var m = k / 1000;
		var l = Math.floor(m % 60);
		var p = Math.floor((m / 60) % 60);
		var o = Math.floor((m / 3600) % 24);
		var n = Math.floor(m / (24 * 3600));
		var i = "<i></i>剩余<span><em>" + n + "</em>天</span>";
		if (n < 1) {
			i = "<i></i>剩余<span><em>" + o + "</em>小时<em>" + p + "</em>分<em>" + l + "</em>秒</span>";
			setTimeout(function() {
				countdownTime(j, k - 1000)
			}, 1000)
		}
		j.html(i)
	}
}

function scrollToTop() {
	var f = $(".floor_left_box"),
		d = f,
		e = $(window).height();
	loli.delay(window, "scroll", null, function() {
		if ($(window).scrollTop() > 0) {
			d.css("display", "block")
		} else {
			d.css("display", "none")
		} if (loli.util.isIE() && loli.util.isIE() <= 6) {
			f.css("top", (e - 480 - 30 + $(window).scrollTop()) + "px")
		}
	});
	$(".toTop", d).click(function() {
		$("body,html").stop().animate({
			scrollTop: 0
		});
		return false
	});
	$(".fixedRight").delegate(".fanli_code_wrap", "mouseenter", function() {
		$(".fanli_code", this).show()
	});
	$(".fixedRight").delegate(".fanli_code_wrap", "mouseleave", function() {
		$(".fanli_code", this).hide()
	})
}

function getProvinceName() {
	var b = jQuery.cookie("provinceId");
	if (!b) {
		b = 1
	}
	return YHDPROVINCE.proviceObj["p_" + b]
}
YHD.HomePage.Tools = YHD.HomePage.Tools || {};
YHD.HomePage.Tools.getNowTime = function() {
	var d;
	if (typeof(nowTime) == "undefined" || nowTime == undefined) {
		var c = new Date();
		d = new Array(c.getFullYear(), c.getMonth() + 1, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds())
	} else {
		d = nowTime.split("-")
	}
	return new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5])
};
YHD.HomePage.initIE6UpdateMsg = function() {
	var f = window.navigator.userAgent.toLowerCase();
	var j = /msie ([\d.]+)/;
	if (j.test(f)) {
		var i = parseInt(j.exec(f)[1]);
		var g = $.cookie("ie6Update");
		if (i <= 6 && "1" != g) {
			var h = [];
			h.push("<div class='ie6_upgrade clearfix' id='ie6_upgrade'>");
			h.push("<div class='ie6_upgrade_wrap'>");
			h.push("<span class='ie6_upgrade_sad'></span>");
			h.push("<span class='ie6_upgrade_text'>温馨提示：您当前使用的浏览器版本过低，兼容性和安全性较差，1号店建议您升级：</span>");
			h.push("<a href='http://windows.microsoft.com/zh-cn/internet-explorer/download-ie' target='_blank' class='ie6_upgrade_ie' tk='global_ie6_upgrade_ie8'>IE8浏览器</a>");
			h.push("<span class='ie6_upgrade_text'>或</span>");
			h.push("<a href='http://chrome.360.cn/' target='_blank' class='ie6_upgrade_360' tk='global_ie6_upgrade_360'>360极速浏览器</a>");
			h.push("</div>");
			h.push("<a href='javascript:void(0);' class='ie6_upgrade_close' title='关闭' tk='global_ie6_upgrade_close'>关闭提示</a>");
			h.push("</div>");
			$(document.body).prepend(h.join(""));
			$("#ie6_upgrade").show();
			$("#ie6_upgrade a.ie6_upgrade_close").click(function() {
				$("#ie6_upgrade").slideUp();
				$.cookie("ie6Update", "1", {
					expires: 7,
					path: "/",
					domain: no3wUrl
				});
				var a = $(this).attr("tk");
				gotracker("2", a)
			});
			$("#ie6_upgrade>div>a").click(function() {
				var a = $(this).attr("tk");
				gotracker("2", a)
			})
		}
	}
};
YHD.HomePage.initDigitTab = function() {
	var e = $("#index_digit");
	if (e.size() == 0) {
		return
	}
	var f = function() {
		var a = new Date();
		return (a.getYear() + 1900) + "" + (a.getMonth() + 1) + "" + a.getDate()
	};
	var h = $.trim(e.attr("data-url"));
	if (h) {
		e.data("iframeLoaded", "1");
		if (h.indexOf("?") == -1) {
			h = h + "?randid=" + f()
		} else {
			h = h + "&randid=" + f()
		}
		var g = "<iframe src='" + h + "' width='240' height='222' frameborder='0' scrolling='no'></iframe>";
		e.html(g)
	}
};
YHD.HomePage.initBaifendian = function() {
	var f = typeof globalBaifendianFlag != "undefined" && globalBaifendianFlag == "0";
	if (f) {
		return
	}
	var g = $.cookie("yihaodian_uid");
	var e = $.cookie("guid");
	var h = function(b, a) {
		window._BFD = window._BFD || {};
		_BFD.BFD_INFO = {
			user_id: b,
			user_cookie: a,
			page_type: "homepage"
		};
		_BFD.client_id = "Cyihaodian";
		_BFD.script = document.createElement("script");
		_BFD.script.type = "text/javascript";
		_BFD.script.async = true;
		_BFD.script.charset = "utf-8";
		_BFD.script.src = (("https:" == document.location.protocol ? "https://ssl-static1" : "http://static1") + ".baifendian.com/service/yihaodian/yihaodian.js");
		document.getElementsByTagName("head")[0].appendChild(_BFD.script)
	};
	setTimeout(function() {
		h(g ? g : "", e)
	}, 10 * 1000)
};
YHD.HomePage.initPreloadAdvertise = function() {
	if ($("#preloadAdvsData").size() == 0) {
		return
	}
	var y = $("#preloadAdvsData").val();
	var u = (y && y.length > 2) ? $.parseJSON(y) : null;
	var r = function() {
		if ($("#topCurtain").size() > 0 && $("#smallTopBanner img").size() > 1) {
			return 4
		}
		if ($("#topCurtain").size() > 0 && $("#smallTopBanner img").size() == 1) {
			return 3
		}
		if ($("#topbanner").size() > 0 && $("#topbanner img").size() > 1) {
			return 2
		}
		if ($("#topbanner").size() > 0 && $("#topbanner img").size() == 1) {
			return 1
		}
		return 0
	};
	var q = function(d, b) {
		var a = false;
		var c = YHD.HomePage.Tools.getNowTime().getTime();
		if (c >= d && c <= b) {
			a = true
		}
		return a
	};
	var B = function(f, a) {
		var d = null;
		var g = f[a];
		var e = g != null ? g : [];
		for (var b = 0; b < e.length; b++) {
			var c = e[b];
			if (q(c.startTime, c.endTime) && (c.imgPath != null || c.imgWidePath != null)) {
				d = c;
				break
			}
		}
		return d
	};
	var A = function(k) {
		if (!k) {
			return {
				type: 0,
				data: null
			}
		}
		var h = B(k, "INDEX_TOP_ZNQSYLAMU_ZHANKAI", 1);
		var e = B(k, "INDEX_TOP_ZNQSYLAMU_SHOUQIZUO", 1);
		var f = B(k, "INDEX_TOP_ZNQSYLAMU_SHOUQIZHONG", 1);
		var g = B(k, "INDEX_TOP_ZNQSYLAMU_SHOUQIYOU", 1);
		var i = B(k, "INDEX_TOP_CURTAINAD_OPEN", 1);
		var c = B(k, "INDEX_TOP_CURTAINAD_CLOSE", 1);
		var j = B(k, "INDEX_TOP_ZNQSYHENGFU_ZUOTU", 1);
		var a = B(k, "INDEX_TOP_ZNQSYHENGFU_ZHONGTU", 1);
		var b = B(k, "INDEX_TOP_ZNQSYHENGFU_YOUTU", 1);
		var d = B(k, "INDEX_TOP_TOPBANNER_DEFAULT", 1);
		if (h != null && e != null && f != null && g != null) {
			return {
				type: 4,
				data: {
					open: h,
					close1: e,
					close2: f,
					close3: g
				}
			}
		}
		if (i != null && c != null) {
			return {
				type: 3,
				data: {
					open: i,
					close: c
				}
			}
		}
		if (j != null && a != null && b != null) {
			return {
				type: 2,
				data: {
					adv1: j,
					adv2: a,
					adv3: b
				}
			}
		}
		if (d != null) {
			return {
				type: 1,
				data: {
					adv: d
				}
			}
		}
		return {
			type: 0,
			data: null
		}
	};
	var C = function() {
		var a = $("#smallTopBanner");
		if (a.length < 1) {
			a = $("#topbanner").find(".small_topbanner3")
		}
		if (a.length < 1) {
			return
		}
		a.delegate("a", "mouseover", function() {
			$(this).siblings("a").find("u").show()
		});
		a.delegate("a", "mouseout", function() {
			$(this).siblings("a").find("u").hide()
		})
	};
	var z = function(b, c) {
		if (b.attr("data-done") == "1") {
			return
		}
		b.attr("href", c.imgJumpLinkUrl).attr("title", c.title).attr("data-ref", c.perTracker);
		var a = c.tc;
		if (a) {
			b.attr("data-tc", a)
		}
	};
	var x = function(a, b) {
		if (a.attr("data-done") == "1") {
			return
		}
		a.attr("alt", b.title).attr("src", isWidescreen ? b.imgWidePath : b.imgPath);
		if (a.attr("shortimg") != null) {
			a.attr("shortimg", b.imgPath)
		}
		if (a.attr("wideimg") != null) {
			a.attr("wideimg", b.imgWidePath)
		}
		if (a.attr("si") != null) {
			a.attr("si", b.imgPath)
		}
		if (a.attr("wi") != null) {
			a.attr("wi", b.imgWidePath)
		}
	};
	var s = function(e, a) {
		var b = e == 1;
		var f = $("#topbanner");
		var d = a.adv;
		if (b) {
			if (!f.data("preloadFlag")) {
				f.data("preloadFlag", 1);
				z($("#topbanner a"), d);
				x($("#topbanner img"), d)
			}
		} else {
			if (e > 0) {
				$("#topbanner").remove();
				$("#topCurtain").remove()
			}
			var c = [];
			c.push("<div id='topbanner' class='wrap'>");
			c.push("<div class='banner_img'>");
			c.push("<a href='" + d.imgJumpLinkUrl + "' title='" + d.title + "' data-ref='" + d.perTracker + "' target='_blank'>");
			c.push("<img alt='" + d.title + "' src='" + (isWidescreen ? d.imgWidePath : d.imgPath) + "'/>");
			c.push("</a>");
			c.push("</div>");
			c.push("</div>");
			$("#global_top_bar").after(c.join(""));
			$("#topbanner").data("preloadFlag", 1)
		}
	};
	var t = function(f, a) {
		var b = f == 3;
		var g = $("#topCurtain");
		var c = a.open;
		var d = a.close;
		if (b) {
			if (!g.data("preloadFlag")) {
				g.data("preloadFlag", 1);
				z($(".big_topbanner", g), c);
				x($(".big_topbanner img", g), c);
				z($("#smallTopBanner", g), d);
				x($("#smallTopBanner img", g), d)
			}
		} else {
			if (f > 0) {
				$("#topbanner").remove();
				$("#topCurtain").remove()
			}
			var e = [];
			e.push("<div id='topCurtain' style='display:none;' class='wrap index_topbanner'>");
			e.push("<a class='big_topbanner' href='" + c.imgJumpLinkUrl + "' title='" + c.title + "' data-ref='" + c.perTracker + "' target='_blank'>");
			e.push("<img alt='" + c.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + c.imgPath + "' wideimg='" + c.imgWidePath + "'/>");
			e.push("</a>");
			e.push("<a style='display:none;' id='smallTopBanner' class='small_topbanner' href='" + d.imgJumpLinkUrl + "' title='" + d.title + "' data-ref='" + d.perTracker + "' target='_blank'>");
			e.push("<img alt='" + d.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + d.imgPath + "' wideimg='" + d.imgWidePath + "'/>");
			e.push("</a>");
			e.push("<span title='点击-展开' class='index_topbanner_fold index_topbanner_unfold'>收起<s></s></span>");
			e.push("</div>");
			$("#global_top_bar").after(e.join(""));
			$("#topCurtain").data("preloadFlag", 1)
		}
	};
	var E = function(h, b) {
		var c = h == 2;
		var a = $("#topbanner");
		var e = b.adv1;
		var f = b.adv2;
		var g = b.adv3;
		if (c) {
			if (!a.data("preloadFlag")) {
				a.data("preloadFlag", 1);
				z($("#topbanner a").eq(0), e);
				x($("#topbanner img").eq(0), e);
				z($("#topbanner a").eq(1), f);
				x($("#topbanner img").eq(1), f);
				z($("#topbanner a").eq(2), g);
				x($("#topbanner img").eq(2), g)
			}
		} else {
			if (h > 0) {
				$("#topbanner").remove();
				$("#topCurtain").remove()
			}
			var d = [];
			d.push("<div id='topbanner' class='wrap'>");
			d.push("<div class='small_topbanner3'>");
			d.push("<a class='small_topbanner3_side' href='" + e.imgJumpLinkUrl + "' title='" + e.title + "' data-ref='" + e.perTracker + "' target='_blank'>");
			d.push("<img alt='" + e.title + "' src='" + (isWidescreen ? e.imgWidePath : e.imgPath) + "'/>");
			d.push("<u style='display: none;'></u>");
			d.push("</a>");
			d.push("<a class='small_topbanner3_m' href='" + f.imgJumpLinkUrl + "' title='" + f.title + "' data-ref='" + f.perTracker + "' target='_blank'>");
			d.push("<img alt='" + f.title + "' src='" + (isWidescreen ? f.imgWidePath : f.imgPath) + "'/>");
			d.push("<u style='display: none;'></u>");
			d.push("</a>");
			d.push("<a class='small_topbanner3_side' href='" + g.imgJumpLinkUrl + "' title='" + g.title + "' data-ref='" + g.perTracker + "' target='_blank'>");
			d.push("<img alt='" + g.title + "' src='" + (isWidescreen ? g.imgWidePath : g.imgPath) + "'/>");
			d.push("<u style='display: none;'></u>");
			d.push("</a>");
			d.push("</div>");
			d.push("</div>");
			$("#global_top_bar").after(d.join(""));
			$("#topbanner").data("preloadFlag", 1)
		}
	};
	var F = function(e, h) {
		var f = e == 4;
		var i = $("#topCurtain");
		var a = h.open;
		var b = h.close1;
		var c = h.close2;
		var d = h.close3;
		if (f) {
			if (!i.data("preloadFlag")) {
				i.data("preloadFlag", 1);
				z($(".big_topbanner", i), a);
				x($(".big_topbanner img", i), a);
				z($("#smallTopBanner a", i).eq(0), b);
				x($("#smallTopBanner img", i).eq(0), b);
				z($("#smallTopBanner a", i).eq(1), c);
				x($("#smallTopBanner img", i).eq(1), c);
				z($("#smallTopBanner a", i).eq(2), d);
				x($("#smallTopBanner img", i).eq(2), d)
			}
		} else {
			if (e > 0) {
				$("#topbanner").remove();
				$("#topCurtain").remove()
			}
			var g = [];
			g.push("<div style='display:none;' id='topCurtain' class='wrap index_topbanner'>");
			g.push("<a class='big_topbanner' href='" + a.imgJumpLinkUrl + "' title='" + a.title + "' data-ref='" + a.perTracker + "' target='_blank'>");
			g.push("<img alt='" + a.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + a.imgPath + "' wideimg='" + a.imgWidePath + "'/>");
			g.push("</a>");
			g.push("<div id='smallTopBanner' class='small_topbanner3' style='display: none;'>");
			g.push("<a class='small_topbanner3_side' href='" + b.imgJumpLinkUrl + "' title='" + b.title + "' data-ref='" + b.perTracker + "' target='_blank'>");
			g.push("<img alt='" + b.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + b.imgPath + "' wideimg='" + b.imgWidePath + "'/>");
			g.push("<u style='display: none;'></u>");
			g.push("</a>");
			g.push("<a class='small_topbanner3_m' href='" + c.imgJumpLinkUrl + "' title='" + c.title + "' data-ref='" + c.perTracker + "' target='_blank'>");
			g.push("<img alt='" + c.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + c.imgPath + "' wideimg='" + c.imgWidePath + "'/>");
			g.push("<u style='display: none;'></u>");
			g.push("</a>");
			g.push("<a class='small_topbanner3_side' href='" + d.imgJumpLinkUrl + "' title='" + d.title + "' data-ref='" + d.perTracker + "' target='_blank'>");
			g.push("<img alt='" + d.title + "' src='" + (URLPrefix.statics + "/global/images/blank.gif") + "' shortimg='" + d.imgPath + "' wideimg='" + d.imgWidePath + "'/>");
			g.push("<u style='display: none;'></u>");
			g.push("</a>");
			g.push("</div>");
			g.push("<span class='index_topbanner_fold'>收起<s></s></span>");
			g.push("</div>");
			$("#global_top_bar").after(g.join(""));
			$("#topCurtain").data("preloadFlag", 1)
		}
	};
	var D = function(a, c) {
		var d = "INDEX2_LUNBO_PIC" + a + "_DEFAULT";
		var b = B(c, d, 1);
		if (b != null) {
			return {
				big: b
			}
		}
		return null
	};
	var w = function(b, g) {
		var f = $("#promo_show");
		var c = $(".promo_wrapper ol li[flag=" + b + "]", f);
		if (c != null && c.size() > 0) {
			for (var a = 0; a < c.size(); a++) {
				var e = $(c[a]);
				if (e.data("preloadFlag")) {
					return
				}
				e.data("preloadFlag", 1);
				var d = g.big;
				if (d != null) {
					z(e.children("a"), d);
					x(e.children("a").find("img"), d)
				}
			}
		}
	};
	var v = function() {
		var e = $("#preloadAdvsData").data("advsData");
		if (e != null) {
			var d = r();
			var c = A(e);
			if (c.type != 0 && c.data != null) {
				if (c.type == 4) {
					F(d, c.data)
				} else {
					if (c.type == 3) {
						t(d, c.data)
					} else {
						if (c.type == 2) {
							E(d, c.data)
						} else {
							if (c.type == 1) {
								s(d, c.data)
							}
						}
					}
				}
			}
			for (var b = 1; b <= 10; b++) {
				var a = D(b, e);
				if (a != null) {
					w(b, a)
				}
			}
		}
	};
	if (u != null) {
		$("#preloadAdvsData").data("advsData", u);
		v()
	}
};
YHD.HomePage.initAjaxReplaceAdvertise = function() {
	var z = $("#ajaxReplaceAdvCodesData");
	var F = z ? z.val() : "";
	var H = F ? F.split(",") : [];
	var N = $("#ajaxReplaceOrientationsData");
	var x = N ? N.val() : "";
	var G = x ? x.split(",") : [];
	var w = (typeof currSiteId == "undefined") ? 1 : currSiteId;
	var A = $.cookie("provinceId");
	var v = "";
	var J = function(e, c) {
		var f = null;
		var b = e[c];
		var g = b != null ? b : [];
		for (var d = 0; d < g.length; d++) {
			var a = g[d];
			if (a && a.commonScreenImgUrl) {
				f = a;
				break
			}
		}
		return f
	};
	var L = function(e, c) {
		var f = null;
		var b = e.sourceList;
		var g = b != null ? b : [];
		for (var d = 0; d < g.length; d++) {
			var a = g[d];
			if (a && a.advertiseRegionalCode == c) {
				f = a;
				f.regionId = a.advertiseRegionalId;
				f.adBgColor = a.reserved;
				f.text = a.displayContent;
				f.nameSubtitle = a.displayTitle;
				f.landingPage = a.linkUrl;
				f.tc = a.tc;
				if (isWidescreen) {
					f.commonScreenImgUrl = a.imageUrlWide
				} else {
					f.commonScreenImgUrl = a.imageUrl
				}
				break
			}
		}
		return f
	};
	var D = function(c, a) {
		if (c.attr("data-done") == "1") {
			return
		}
		var b = a.tc;
		var d = a.tc_ext;
		if (b) {
			c.attr("data-tc", b + ".1");
			if (d) {
				c.attr("data-tce", d)
			}
		}
		c.attr("href", a.landingPage).attr("title", a.text).attr("data-done", "1").attr("data-ref", a.ref);
		$("h3", c).text(a.text);
		$("h4", c).text(a.nameSubtitle)
	};
	var E = function(a, b) {
		if (a.attr("data-done") == "1") {
			return
		}
		a.attr("alt", b.text).attr("src", b.commonScreenImgUrl).attr("data-done", "1");
		if (a.attr("shortimg") != null) {
			a.attr("shortimg", loli.util.hashImgUrl(b.commonScreenImgUrl))
		}
		if (a.attr("wideimg") != null) {
			a.attr("wideimg", loli.util.hashImgUrl(b.commonScreenImgUrl))
		}
		if (a.attr("si") != null) {
			a.attr("si", loli.util.hashImgUrl(b.commonScreenImgUrl))
		}
		if (a.attr("wi") != null) {
			a.attr("wi", loli.util.hashImgUrl(b.commonScreenImgUrl))
		}
		if (a.attr("original") != null) {
			a.attr("original", loli.util.hashImgUrl(b.commonScreenImgUrl))
		}
	};
	var K = function() {
		if (H.length > 0) {
			y()
		}
		if (G.length > 0) {
			M()
		}
	};

	function y() {
		var c = z.data("advsData");
		var b = z.data("doneAdvCodes") != null ? z.data("doneAdvCodes").split(",") : [];
		if (c != null) {
			for (var f = 0; f < H.length; f++) {
				var i = J(c, H[f]);
				var e = false;
				for (var g = 0; g < b.length; g++) {
					if (b[g] == H[f]) {
						e = true;
						break
					}
				}
				if (!e && i != null) {
					var a = $("body a[data-advId=" + i.regionId + "]");
					var d = $("body img[data-advId=" + i.regionId + "]");
					if (a.size() > 0) {
						for (var h = 0; h < a.size(); h++) {
							D(a.eq(h), i);
							E(d.eq(h), i)
						}
						b.push(H[f]);
						z.data("doneAdvCodes", b.join(","))
					}
				}
			}
		}
	}

	function M() {
		var a = z.data("orientationData");
		var c = z.data("doneAdvCodes") != null ? z.data("doneAdvCodes").split(",") : [];
		if (a != null) {
			for (var f = 0; f < G.length; f++) {
				var i = L(a, G[f]);
				var e = false;
				for (var g = 0; g < c.length; g++) {
					if (c[g] == G[f]) {
						e = true;
						break
					}
				}
				if (!e && i != null) {
					var b = $("body a[data-advId=" + i.regionId + "]");
					var d = $("body img[data-advId=" + i.regionId + "]");
					if (b.size() > 0) {
						for (var h = 0; h < b.size(); h++) {
							D(b.eq(h), i);
							E(d.eq(h), i)
						}
						c.push(G[f]);
						z.data("doneAdvCodes", c.join(","))
					}
				}
			}
		}
	}
	var I = function(b) {
		var a = $("#chuchuang_banner_top,#index_chuchuang,#loucengBanner,#needLazyLoad");
		a.find("a[data-nsf='1']").each(function() {
			var c = $(this).parent();
			var e = $(this);
			if (e.attr("data-nsf") == "1" && e.attr("data-ajax") == b && e.attr("data-done") != "1") {
				e.remove();
				if (c.attr("data-singlemodule") == 1) {
					c.remove()
				} else {
					if (c.hasClass("img_box")) {
						var d = c.children().length;
						if (d == 0) {
							c.next(".trig_box").find("li>a").remove()
						} else {
							c.next(".trig_box").find("li>a:gt(" + (d - 1) + ")").remove()
						}
					}
				}
			}
		})
	};
	var B = function(c, d, a) {
		var e = "http://p4p.yhd.com/advdolphin/external/saleTypeWeightAd?callback=?";
		var b = {
			mcSiteId: w,
			provinceId: A,
			codes: c,
			categoryIds: d,
			screenType: isWidescreen ? "1" : "2"
		};
		$.getJSON(e, b, function(f) {
			g = {};
			if (f && f.status == 1) {
				var h = f.value;
				if (h) {
					var g = z.data("advsData");
					if (g == null) {
						z.data("advsData", h)
					} else {
						g = $.extend(g, h);
						z.data("advsData", g)
					}
					y()
				}
			}
			if (a) {
				I("1")
			}
		})
	};
	var C = function(b, c, f) {
		if (typeof(flagControlJs) == "undefined") {
			I("2");
			return
		}
		var d = "http://gemini.yhd.com/libraService/exactNormalAdServe?callback=?";
		var e = jQuery.cookie("guid");
		var a = {
			mcSiteId: w,
			provinceId: A,
			codes: b,
			categoryIds: c,
			guId: e
		};
		$.getJSON(d, a, function(g) {
			if (g && g.status == 1) {
				var i = g.value;
				if (i) {
					var h = z.data("orientationData");
					if (h == null) {
						z.data("orientationData", i)
					} else {
						h = $.extend(h, i);
						z.data("orientationData", h)
					}
					M()
				}
			}
			if (f) {
				I("2")
			}
		})
	};
	YHD.HomePage.runAjaxReplaceAdvertise = K;
	YHD.HomePage.delBlankAjaxAD = function() {
		I(1);
		I(2)
	};
	var u = function() {
		var c = false;
		var a = [];
		for (var b = 0; b < H.length; b++) {
			a.push(H[b]);
			if (b == H.length - 1) {
				c = true
			}
			if (a.length >= 20) {
				B(a.join(","), v, c);
				a = []
			}
		}
		if (a.length > 0) {
			B(a.join(","), v, c)
		}
		a = [];
		for (var b = 0; b < G.length; b++) {
			a.push(G[b]);
			if (b == G.length - 1) {
				c = true
			}
			if (a.length >= 20) {
				C(a.join(","), v, c);
				a = []
			}
		}
		if (a.length > 0) {
			C(a.join(","), v, c)
		}
	};
	u()
};
YHD.HomePage.initLunbo = function() {
	if ($("#index_menu_carousel>ol>li").size() == 0) {
		return
	}
	var k = $("#promo_show");
	var l = $("#index_menu_carousel");
	var m = $("#lunboNum");
	var o = $("#index_menu_carousel>ol>li:eq(0)");
	var r = $("img", o);
	var q = function() {
		if (!l.data("loaded")) {
			l.data("loaded", 1);
			$("#index_menu_carousel>ol>li").each(function() {
				$(this).css("backgroundColor", $(this).attr("data-bgcolor"))
			});
			l.lazyImg({
				indexLoad: true,
				wideAttr: isWidescreen ? "wi" : "si"
			});
			m.show();
			m.delegate("li", "mouseover", function() {
				var b = $(this).attr("flag");
				var a = "lunbo_tab_" + b;
				gotracker("2", a)
			});
			s()
		}
	};
	if (typeof lunboAjaxReplaceAdvCodes != "undefined" && lunboAjaxReplaceAdvCodes != "") {
		if (k.attr("data-ajax-done") != "1") {
			setTimeout(function() {
				q()
			}, 2000)
		} else {
			q()
		}
	} else {
		if (r.attr("data-loaded") != "1") {
			n(r, function() {
				var b = window.global || (window.global = {});
				var a = b.vars = (b.vars || {});
				b.vars.customInteractTime = b.vars.customInteractTime || new Date().getTime();
				q()
			})
		} else {
			q()
		}
	}
	p(o);
	setTimeout(function() {
		q()
	}, 3000);

	function n(c, a) {
		c = $(c);
		var d = t();
		var b = c.attr(d);
		if (b) {
			c.load(function() {
				var e = c.data("callbackFlag");
				if (a && !e) {
					a.call(this);
					c.data("callbackFlag", 1)
				}
			});
			c.attr("src", b);
			c.removeAttr(d)
		}
	}

	function t() {
		var a = "si";
		if (window.isWidescreen) {
			a = "wi"
		}
		return a
	}

	function s() {
		var a = new Switchable({
			container: "#promo_show",
			content: ".promo_wrapper ol",
			trigger: ".mod_promonum_show ol",
			effect: "fade",
			activeClass: "cur",
			interval: 4000,
			autoPlay: true,
			pageButton: [".show_pre", ".show_next"]
		});
		a.on("cutover", function(c) {
			var b = $("#index_menu_carousel>ol>li:eq(" + c + ")");
			p(b)
		})
	}

	function p(a) {
		var c = jQuery.cookie("provinceId");
		if (!c) {
			c = 0
		}
		if (c != 0) {
			var b = a.find("a");
			var d = [];
			d.push(b);
			require(["base_observer"], function(e) {
				e.fire("adContentTrackerEvent", d)
			})
		}
		if (typeof(extTracker) === "object") {
			extTracker.sendTrackByTrigger(a)
		}
	}
};
YHD.HomePage.initChuchuang = function() {
	$("#chuchuang_banner_top img").each(function() {
		var a = $(this).attr(isWidescreen ? "wideimg" : "shortimg");
		if (a) {
			$(this).attr("src", a)
		}
	});
	var b = $("#index_chuchuang");
	if (b.size() == 0) {
		return
	}
	$(".small_pic a", b).hover(function() {
		$(this).find("img").stop().animate({
			"margin-left": -10
		}, 300)
	}, function() {
		$(this).find("img").stop().animate({
			"margin-left": 0
		}, 300)
	});
	b.lazyImg({
		indexLoad: true
	})
};
YHD.HomePage.initFloorBanner = function() {
	$("#loucengBanner img").each(function() {
		var b = $(this).attr(isWidescreen ? "wideimg" : "shortimg");
		if (b) {
			$(this).attr("src", b)
		}
	})
};
YHD.HomePage.sliderIndexAd = function(c) {
	function d(z) {
		if (!z || z.size() == 0) {
			return
		}
		var r = z.find(".img_box");
		var a = z.find(".trig_box li");
		var q = r.children();
		var w = a.children();
		var v = q.length;
		var b = q.eq(0).width();
		var A = 0;
		var y = 0;
		var x = 5000;
		if (v <= 1) {
			z.find(".trig_box").hide();
			return
		}
		r.find("a").attr("data-mrt", 1);
		z.find(".trig_box li a:gt(0) span").width(0);
		w.bind("mouseenter", function() {
			A = $(this).index();
			t();
			s();
			require(["base_observer"], function(e) {
				e.fire("impressionEvent", r.find("a").eq(A))
			})
		});
		z.bind({
			mouseenter: function() {
				clearInterval(y);
				s()
			},
			mouseleave: function() {
				B();
				u()
			}
		});

		function t() {
			r.stop().animate({
				left: -A * b
			});
			w.removeClass("cur").eq(A).addClass("cur");
			u();
			r.find("a").attr("data-mrt", 1).eq(A).attr("data-mrt", 0);
			if (loli.isVisual(r.find("a").eq(A)[0])) {
				require(["base_observer"], function(e) {
					e.fire("impressionEvent", r.find("a").eq(A))
				})
			}
		}

		function B() {
			y = setInterval(function() {
				A++;
				if (A > v - 1) {
					A = 0
				}
				t()
			}, x);
			u()
		}

		function u() {
			var e = z.find(".trig_box li a.cur");
			z.find(".trig_box li a span").stop().css("width", 0);
			e.find("span").width(0).animate({
				width: "30px"
			}, x, function() {
				$(this).width(0)
			})
		}

		function s() {
			var e = z.find(".trig_box li a.cur");
			z.find(".trig_box li a span").stop().css("width", 0);
			e.find("span").stop().width("100%")
		}
		B()
	}
	d(c)
};
YHD.HomePage.sliderFloorTab = function() {
	$(".sg_tabcontent").delegate(".sg_banner", "mouseenter", function() {
		$(this).addClass("sg_cur")
	});
	$(".sg_tabcontent").delegate(".sg_banner", "mouseleave", function() {
		$(this).removeClass("sg_cur")
	});
	$(".sg_tab").delegate("li", "mouseenter", function() {
		var a = $("li", ".sg_tab").index(this);
		$(this).addClass("cur").siblings("li").removeClass("cur");
		$(".tab_arrow").stop().animate({
			left: 30 + 68 * a
		});
		$(".sg_tabcontent").eq(a).show().siblings(".sg_tabcontent").hide();
		$(".sg_tabcontent").eq(a).lazyImg({
			indexLoad: true
		})
	});
	var c = $("li", ".sg_tab").length;
	var d = null;
	$(".sgwrap").hover(function() {
		clearInterval(d)
	}, function() {
		d = setInterval(function() {
			var a = $("li", ".sg_tab").index($("li.cur", ".sg_tab"));
			a < c - 1 ? a++ : a = 0;
			$("li", ".sg_tab").eq(a).addClass("cur").siblings("li").removeClass("cur");
			$(".tab_arrow").stop().animate({
				left: 30 + 68 * a
			});
			$(".sg_tabcontent").eq(a).show().siblings(".sg_tabcontent").hide();
			$(".sg_tabcontent").eq(a).lazyImg({
				indexLoad: true
			})
		}, 8000)
	}).trigger("mouseout")
};
YHD.HomePage.sliderFloorNav = function() {
	var f = loli.util.isIE() && loli.util.isIE() <= 6;
	var n = $(window).height();
	if (f) {
		$(".floor_left_box").css("top", n - $(".floor_left_box").height() - 100)
	}
	$(window).scroll(function() {
		var b = $(this).scrollTop();
		if (f) {
			var a = b + $(window).height() - $(".floor_left_box").height() - 100;
			$(".floor_left_box").css("top", a)
		}
	});
	var l = $(".mod_index_floor");
	var o = $(".floor_left_box");
	var p = [];

	function m() {
		p = [];
		for (var a = 0; a < l.length; a++) {
			p.push(l.eq(a).offset().top)
		}
	}
	o.delegate("a", "click", function() {
		m();
		$("body,html").stop().animate({
			scrollTop: p[$(this).index()] - 60
		})
	});
	var j = 0;
	var k = o.find("a");
	$(window).scroll(function() {
		m();
		var b = $(".ft_service_link").offset().top - 60;
		var a = $(window).scrollTop();
		var c = $(window).height();
		if (a == 0) {
			o.fadeOut()
		} else {
			o.fadeIn()
		} if (a > p[j] - c / 2) {
			j++
		}
		if (a < p[j - 1] - c / 2) {
			j--
		}
		if (j == 0 || a > b) {
			k.removeClass("cur")
		} else {
			k.eq(j - 1).addClass("cur").siblings().removeClass("cur")
		}
	})
};
YHD.HomePage.sliderBrand = function(c) {
	function d(s) {
		if (!s || s.size() == 0) {
			return
		}
		var b = s.find(".img_box ul");
		var r = s.find(".img_box li");
		var t = s.find(".btn_prev");
		var x = s.find(".btn_next");
		var A = r.length;
		var B = 1;
		var z = 0;
		var y = 5000;
		var q = r.eq(0).width();
		var v = r.eq(0).clone();
		var u = r.eq(A - 1).clone();
		r.eq(0).before(u);
		r.eq(A - 1).after(v);
		b.css("left", -q);
		if (A > 1) {
			t.click(function() {
				B--;
				if (B < 0) {
					B = A;
					b.css({
						left: -B * q
					});
					B = A - 1
				}
				w()
			});
			x.click(function() {
				B++;
				if (B > A) {
					B = 0;
					b.css({
						left: -B * q
					});
					B = 1
				}
				w()
			});

			function w() {
				b.stop().animate({
					left: -B * q
				})
			}

			function a() {
				z = setInterval(function() {
					B++;
					if (B > A) {
						B = 0;
						b.css({
							left: -B * q
						});
						B = 1
					}
					w()
				}, y)
			}
			a();
			s.bind({
				mouseover: function() {
					clearInterval(z)
				},
				mouseout: function() {
					a()
				}
			})
		}
	}
	d(c)
};
YHD.HomePage.loadWalmartAdv = function() {
	var f = $.cookie("provinceId");
	if (f != 20) {
		return
	}
	var h = URLPrefix.central + "/homepage/ajaxFindWalmartAdv.do?callback=?";
	var e = function(b) {
		if (b) {
			var c = b.INDEX2_WALMART_LPIC_DEFAULT;
			var a = c != null ? c[0] : null;
			if (a) {
				$("#floorCustom_INDEX2_FLOOR7 div.d_con a").attr("data-ref", a.perTracker).attr("href", a.imgJumpLinkUrl).attr("title", a.name);
				$("#floorCustom_INDEX2_FLOOR7 div.d_con a img").attr("src", a.imgPath).attr("alt", a.name)
			}
		}
	};
	var g = {
		currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
		currSiteType: 1,
		provinceId: $.cookie("provinceId")
	};
	$.getJSON(h, g, function(b) {
		if (b) {
			if (b.status == 1) {
				var a = b.data;
				e(a)
			}
		}
	})
};
jQuery(function() {
	YHD.HomePage.initPreloadAdvertise();
	YHD.HomePage.initAjaxReplaceAdvertise();
	YHD.HomePage.init();
	require(["content_tracker_expo"], function() {
		YHD.HomePage.initLunbo()
	});
	YHD.HomePage.initChuchuang();
	YHD.HomePage.initFloorBanner();
	YHD.HomePage.sliderFloorNav();
	scrollToTop();
	YHD.HomePage.initDigitTab();
	YHD.HomePage.initIE6UpdateMsg();
	YHD.HomePage.initBaifendian()
});
$(document).ready(function() {
	require(["content_tracker_expo"], function(b) {
		b.run("adContentTrackerEvent", "ad.dolphin.bidding")
	})
});
if (trackerGetCookie("gla")) {
	trackerContainer.addParameter(new Parameter("attachedInfo", trackerGetCookie("gla")))
}
if (typeof abtestId != "undefined" && abtestId) {
	trackerContainer.addParameter(new Parameter("abtestValue", abtestId))
}(function(b) {
	var a = window.loli || (window.loli = {});
	a.scroll = function(g, e) {
		var c = "";
		var d = e || 200;
		var h = d - 20;
		b(window).scroll(function() {
			setTimeout(function() {
				f()
			}, d);
			c = new Date().getTime()
		});

		function f() {
			if ((new Date().getTime() - c) >= h) {
				g();
				c = new Date().getTime()
			}
		}
	}
})(jQuery);
(function(e) {
	var f = function(b) {
		var c = b,
			a = {
				lazyImg: {
					ltime: "2000",
					lnum: "5",
					load: true,
					indexLoad: false,
					scrollLoad: true,
					attr: "original",
					wideAttr: null,
					hfix: 100
				}
			};
		e.extend(a, c);
		this.param = a
	};
	f.prototype = {
		constructor: f,
		isBusy: false,
		doc: document,
		imgArray: [],
		wideAttr: null,
		lazyImg: function(j, l) {
			var k = this,
				b = k.param.lazyImg,
				a, c = j;
			if (l) {
				k.param.lazyImg = e.extend(b, l)
			}
			if (c instanceof e) {
				a = c
			} else {
				if (e.isArray(c)) {
					c = e(c.join(","))
				} else {
					c = e(c) || e("body")
				}
			} if (b.wideAttr) {
				wideAttr = b.wideAttr;
				k.imgArray = c.find("img[" + b.attr + "],img[" + wideAttr + "]")
			} else {
				k.imgArray = c.find("img[" + b.attr + "]")
			} if (b.indexLoad) {
				k._lazyImg(k.imgArray, b)
			}
			if (b.scrollLoad) {
				k._iniLazy(function() {
					if (k.imgArray.length == 0) {
						return a
					}
					k._lazyImg(k.imgArray, b)
				})
			}
			if (b.load) {
				k._loadImg(c)
			}
			return j
		},
		_loadImg: function(b) {
			var j = this,
				k = j.param.lazyImg,
				l = k.attr,
				a = k.ltime,
				c = k.lnum;
			(function(g, r, p, q, h) {
				var i = setInterval(function() {
					if (g.isBusy) {
						return false
					}
					var m = g.imgArray;
					var n = m.length;
					if (n > h) {
						g._imgLoad(m, 0, h, p)
					} else {
						if (n > 0) {
							g._imgLoad(m, 0, n, p)
						} else {
							clearInterval(i)
						}
					}
				}, q)
			})(j, b, l, a, c)
		},
		_lazyImg: function(a, o) {
			var c = o.attr,
				l = a.length,
				m = this,
				n = 0,
				b = 1;
			m.isBusy = true;
			var p = m._pageTop();
			m._imgLoad(m.imgArray, n, l, c, p, o.hfix);
			m.isBusy = false
		},
		_imgLoad: function(a, u, q, c, r, p) {
			var s = this;
			if (r) {
				for (var b = u; b < q; b++) {
					var v = e(a[b]);
					var i = jQuery(window).height() + p;
					if (v.offset().top < (r + p) && (r - v.offset().top) < i) {
						s._renderImg(v, c);
						delete a[b]
					}
				}
			} else {
				for (var b = u; b < q; b++) {
					var v = e(a[b]);
					s._renderImg(v, c);
					delete a[b]
				}
			}
			var t = new Array();
			for (var b = 0; b < a.length; b++) {
				if (a[b] != null) {
					t.push(a[b])
				}
			}
			s.imgArray = t
		},
		_renderImg: function(c, a) {
			var b = c;
			if (typeof wideAttr != "undefined" && wideAttr != null && b.attr(wideAttr)) {
				b.attr("src", loli.webp(b.attr(wideAttr)));
				b.removeAttr(a)
			} else {
				b.attr("src", loli.webp(b.attr(a)));
				b.removeAttr(a)
			}
		},
		_iniLazy: function(b) {
			var a = this;
			loli.delay(window, "scroll", function() {
				if (!a.isBusy) {
					a.isBusy = true;
					return true
				} else {
					return false
				}
			}, function() {
				b()
			}, 50)
		},
		_pageTop: function() {
			var b = this,
				c = b.doc,
				a = c.documentElement;
			return a.clientHeight + Math.max(a.scrollTop, c.body.scrollTop)
		},
		_hashImgUrl: function(a) {
			if (loli && loli.util) {
				return loli.util.hashImgUrl(a)
			}
			return a
		}
	};
	var d = new f();
	e.fn.extend({
		lazyImg: function(a) {
			var b = new f();
			return b.lazyImg(this, a)
		}
	})
})(jQuery);
(function(c) {
	var d = function(a) {
		var g = a,
			b = URLPrefix.busystock ? URLPrefix.busystock : "http://gps.yhd.com",
			h = "/busystock/restful/truestock";
		_setting = {
			attr: "productid",
			busystock_url: b + h,
			busystockAttr: "productIds",
			lazyLoadDelay: 500,
			priceCounter: 30,
			load: true,
			maxNum: 200,
			oneOffLoad: false,
			indexLoad: false,
			scrollLoad: true,
			hfix: 100,
			callbackHtml: null
		};
		c.extend(_setting, g);
		this.param = _setting
	};
	d.prototype = {
		constructor: d,
		isBusy: false,
		doc: document,
		priceArray: [],
		lazyPrice: function(b, o) {
			var p = this,
				l = p.param;
			if (o) {
				p.param = c.extend(l, o)
			}
			var k = b,
				m = l.attr,
				n = l.busystock_url,
				a = l.maxNum;
			if (k instanceof c) {
				p.priceArray = b.find("[" + m + "]").get()
			} else {
				if (c.isArray(k)) {
					p.priceArray = k
				} else {
					p.priceArray = c(b).find("[" + m + "]").get()
				}
			} if (l.oneOffLoad) {
				p._flushPrice(p.priceArray, m, n, l.busystockAttr, a);
				return b
			}
			if (l.indexLoad) {
				p._lazyPrice(p.imgArray, l)
			}
			if (l.scrollLoad) {
				p._iniLazy(function() {
					if (p.priceArray.length == 0) {
						return b
					}
					p._lazyPrice(p.priceArray, l)
				})
			}
			if (l.load) {
				p._loadPrice()
			}
			return b
		},
		_loadPrice: function() {
			var o = this,
				b = o.param,
				k = b.attr,
				p = b.busystock_url,
				m = b.busystockAttr,
				l = b.maxNum,
				a = b.lazyLoadDelay,
				n = b.priceCounter;
			(function(s, e, t, j, h, f, i) {
				var g = setInterval(function() {
					if (s.isBusy) {
						return false
					}
					var r = s.priceArray;
					var q = r.length;
					if (q > i) {
						s._priceLoad(r, e, t, j, 0, i, h)
					} else {
						if (q > 0) {
							s._priceLoad(r, e, t, j, 0, q, h)
						} else {
							clearInterval(g)
						}
					}
				}, f)
			})(o, k, p, m, l, a, n)
		},
		_lazyPrice: function(m, o) {
			var n = o.attr,
				t = m.length,
				q = o.busystock_url,
				r = o.busystockAttr,
				p = o.maxNum,
				b = this,
				a = 0;
			b.isBusy = true;
			var s = b._pageTop() + o.hfix;
			b._priceLoad(m, n, q, r, a, t, p, s);
			b.isBusy = false
		},
		_priceLoad: function(r, s, b, t, z, w, v, A) {
			var B = this,
				a = r.length;
			if (a == 0) {
				return
			}
			var x = new Array();
			if (A) {
				for (var u = z; u < w; u++) {
					var i = c(r[u]);
					if (i.offset().top < A) {
						x.push(i);
						delete r[u]
					}
				}
			} else {
				for (var u = z; u < w; u++) {
					var i = c(r[u]);
					x.push(i);
					delete r[u]
				}
			}
			B._flushPrice(x, s, b, t, v);
			var y = new Array();
			for (var u = 0; u < r.length; u++) {
				if (r[u] != null) {
					y.push(r[u])
				}
			}
			B.priceArray = y
		},
		_iniLazy: function(b) {
			var a = this;
			window.scrollTo(0, 0);
			c(window).bind("scroll", function() {
				if (!a.isBusy) {
					b()
				} else {}
			})
		},
		_pageTop: function() {
			var b = this,
				f = b.doc,
				a = f.documentElement;
			return a.clientHeight + Math.max(a.scrollTop, f.body.scrollTop)
		},
		_flushPrice: function(L, H, I, j, E) {
			var F = this,
				b = F.param,
				G = b.callbackHtml;
			if (L && L.length > 0) {
				var J = L.length,
					e = 0,
					a, y = 1;
				if (J < E) {
					a = J
				} else {
					y = (J - 1) / E + 1
				}
				var z = jQuery.cookie("provinceId");
				if (!z) {
					return
				}
				var C = "?mcsite=" + currBsSiteId + "&provinceId=" + z;
				var A = {};
				for (var D = 0; D < y; D++) {
					if (D > 0) {
						e = E * D;
						a = e + E;
						if (a > J) {
							a = J
						}
					}
					A = {};
					for (var B = e; B < a; B++) {
						var K = jQuery(L[B]);
						C += "&" + j + "=" + K.attr(H);
						if (!A[K.attr(H)]) {
							A[K.attr(H)] = []
						}
						A[K.attr(H)].push(K)
					}
					try {
						jQuery.getJSON(I + C + "&callback=?", function(f) {
							if (f == null || f == "") {
								return
							}
							jQuery.each(f, function(h, g) {
								var k = A[g.productId];
								if (k) {
									jQuery.each(k, function(l, m) {
										if (G) {
											jQuery(m).html(G(g, m)).removeAttr(H)
										} else {
											if (currSiteId == 2) {
												jQuery(m).text("¥" + g.productPrice).removeAttr(H)
											} else {
												if (k) {
													if (globalShowMarketPrice == 1) {
														var n = "<strong>¥" + g.productPrice + "</strong>";
														n += "<del>¥" + g.marketPrice + "</del>";
														jQuery(m).html(n).removeAttr(H)
													} else {
														var n = "<strong>¥" + g.productPrice + "</strong>";
														if (g.curPriceType && g.curPriceType == 2 && g.yhdPrice) {
															n += "<del>¥" + g.yhdPrice + "</del>"
														}
														jQuery(m).html(n).removeAttr(H)
													}
												}
											}
										}
									})
								}
							})
						})
					} catch (i) {}
				}
			}
		}
	};
	c.fn.extend({
		lazyPrice: function(a) {
			var b = new d();
			return b.lazyPrice(this, a)
		}
	})
})(jQuery);
(function(c) {
	var d = function(b) {
		var f = b,
			a = {
				activeLoadTime: 2000,
				load: true,
				activeLoadNum: 1,
				hfix: 100,
				callback: null,
				attr: "lazyLoad_textarea",
				flushPrice: true,
				flushPriceAttr: "productid",
				indexLoad: false,
				scrollLoad: true
			};
		c.extend(a, f);
		this.param = a
	};
	d.prototype = {
		constructor: d,
		doc: document,
		areaArray: [],
		lazyDom: function(j, a) {
			var h = this,
				b = h.param,
				i = j;
			if (a) {
				h.param = c.extend(b, a)
			}
			h.areaArray = h._getJqueryDomArray(i, b);
			if (b.indexLoad) {
				h._domScrollLoad(h.areaArray, b)
			}
			if (b.scrollLoad) {
				h._loadScrollDom(function() {
					if (h.areaArray.length == 0) {
						return
					}
					h._domScrollLoad(h.areaArray, b)
				})
			}
			if (b.load) {
				h._loadActiveDom(h.areaArray, b)
			}
		},
		_loadActiveDom: function(b, m) {
			var n = this,
				a = m,
				k = a.activeLoadTime,
				j = b;
			var l = setInterval(function() {
				var e = j.length;
				if (e == 0) {
					clearInterval(l);
					return
				}
				n._domActiveLoad(j, a)
			}, k)
		},
		_loadScrollDom: function(a) {
			loli.scroll(function() {
				a()
			}, 50)
		},
		_domScrollLoad: function(m, i) {
			var n = this,
				i = n.param,
				a = [];
			for (var k = 0, b = m.length; k < b; k++) {
				var l = n._getJqueryDom(m[k]);
				if (n.isInCurrScreen(l)) {
					n._rendDom(l, i)
				} else {
					a.push(l)
				}
			}
			n.areaArray = a
		},
		_domActiveLoad: function(o, b) {
			var p = this,
				i = b,
				m = o,
				n = m.length,
				l = Math.min(i.activeLoadNum, n);
			for (var a = 0; a < l; a++) {
				p._rendDom(p._getJqueryDom(m.shift()), i)
			}
		},
		_rendDom: function(a, q) {
			var l = a,
				o = q,
				p = o.attr,
				m = l.attr(p),
				b = c("#" + m),
				n = o.flushPrice,
				r = o.flushPriceAttr;
			if (b.size() > 0) {
				l.html(b.val())
			}
			l.removeAttr(p);
			if (n) {
				l.lazyPrice({
					attr: r,
					oneOffLoad: true
				})
			}
			if (o.callback) {
				o.callback.call(l)
			}
		},
		isInCurrScreen: function(o) {
			var m = this,
				l = o,
				r = m.doc,
				b = r.documentElement,
				n = m.param,
				q = n.hfix,
				p = Math.max(b.scrollTop, r.body.scrollTop),
				a = b.clientHeight + p;
			if (l) {
				return (l.offset().top < a + q) && (l.offset().top > p - q)
			}
			return false
		},
		_getJqueryDomArray: function(a, b) {
			var h = [],
				g = b.attr;
			if (a instanceof c) {
				h = a.find("[" + g + "]").get()
			} else {
				if (c.isArray(a)) {
					h = a;
					return h
				} else {
					a = c(a);
					h = a.find("[" + g + "]").get()
				}
			} if (h.length == 0) {
				if (a.attr(g)) {
					h.push(a)
				}
			}
			return h
		},
		_getJqueryDom: function(a) {
			if (!a) {
				return a
			}
			if (a instanceof c) {
				return a
			}
			return c(a)
		}
	};
	c.fn.extend({
		lazyDom: function(a) {
			var b = new d();
			return b.lazyDom(this, a)
		}
	})
})(jQuery);
jQuery(function() {
	jQuery("body").lazyImg({
		indexLoad: true,
		load: false,
		wideAttr: isWidescreen ? "wideimg" : "shortimg"
	});
	jQuery("#needLazyLoad").lazyDom({
		load: false,
		hfix: 500,
		flushPrice: false,
		indexLoad: true,
		callback: function() {
			var f = $(this);
			YHD.HomePage.runAjaxReplaceAdvertise();
			YHD.HomePage.delBlankAjaxAD();
			f.find("img").each(function() {
				var a = $(this).attr("original");
				if (a) {
					if (loli.webp) {
						a = loli.webp(a)
					}
					$(this).attr("src", a).removeAttr("original")
				}
			});
			var e = f.find("div.slider_index_ad");
			YHD.HomePage.sliderIndexAd(e);
			var d = f.find("div.brands");
			YHD.HomePage.sliderBrand(d);
			if (f.attr("id") == "floorShan") {
				YHD.HomePage.sliderFloorTab();
				getShanData("#floorShan")
			}
			if (f.attr("id") == "floorGroup") {
				reflushGrouponData("#floorGroup");
				getGrouponBrandData("#floorGroup");
				getAjaxProductPrice("#floorGroup")
			}
			if (f.attr("id") == "floor3c") {
				getAjaxProductPrice("#floor3c")
			}
			if (f.attr("id") == "floorCustom_INDEX2_FLOOR7") {
				YHD.HomePage.loadWalmartAdv()
			}
			require(["content_tracker_expo"], function(a) {
				a.run("adContentTrackerEvent", "ad.dolphin.bidding")
			})
		}
	})
});

function addTrackerToEvent(e, d) {
	var f = "tk";
	if (d) {
		f = d
	}
	if (e instanceof jQuery) {
		e.find("a[" + f + "]").click(function() {
			var a = $(this),
				b = a.attr(f);
			if (b) {
				addTrackPositionToCookie("1", b)
			}
		})
	} else {
		$(e + " a[" + f + "]").each(function(b) {
			var a = this;
			$(a).click(function() {
				addTrackPositionToCookie("1", $(a).attr(f))
			})
		})
	}
}
var yhdHead = window.yhdHead = window.yhdHead || {};
yhdHead.topMenuImgLazyLoad = function() {
	jQuery("#wideScreenTabShowID li img").each(function() {
		jQuery(this).attr("src", function() {
			return jQuery(this).attr("original")
		}).removeAttr("original")
	});
	jQuery("#allCategoryHeader ul li h3 img").each(function() {
		jQuery(this).attr("src", function() {
			return jQuery(this).attr("original")
		}).removeAttr("original")
	})
};
yhdHead.newTopTabShow = function(c, d) {
	if (c > d) {
		jQuery("#wideScreenTabShowID li").each(function(a) {
			if (a == d - 1) {
				jQuery(this).addClass("kf")
			}
			if (a > d - 1) {
				jQuery(this).remove()
			}
		})
	}
};
yhdHead.oldTopTabShow = function(c, d) {
	if (c > d) {
		jQuery("#global_menu span").each(function(a) {
			if (a > d - 1) {
				jQuery(this).remove()
			}
		})
	}
};
yhdHead.dealWideNarrowScreen = function() {
	var d = screen.width >= 1280;
	if (currSiteId == 1) {
		var e = jQuery("#wideScreenTabShowID li").length;
		var f = jQuery("#global_menu span").length;
		if (!d) {
			yhdHead.newTopTabShow(e, 10);
			yhdHead.oldTopTabShow(f, 7)
		} else {
			if (isIndex) {
				if (isIndex == 1) {
					yhdHead.newTopTabShow(e, 10)
				} else {
					yhdHead.newTopTabShow(e, 10)
				}
			} else {
				yhdHead.newTopTabShow(e, 10)
			}
			yhdHead.oldTopTabShow(f, 7)
		}
	} else {
		var e = jQuery("#wideScreenTabShowID li").length;
		var f = jQuery("#global_menu span").length;
		if (!d) {
			yhdHead.newTopTabShow(e, 8);
			yhdHead.oldTopTabShow(f, 6)
		} else {
			if (isIndex) {
				if (isIndex == 1) {
					yhdHead.newTopTabShow(e, 9)
				} else {
					yhdHead.newTopTabShow(e, 8)
				}
			} else {
				yhdHead.newTopTabShow(e, 8)
			}
			yhdHead.oldTopTabShow(f, 6)
		}
	}
};
yhdHead.topMenuTrackInit = function() {
	jQuery("#wideScreenTabShowID li a[tk]").click(function() {
		var c = $(this),
			d = c.attr("tk");
		if (d) {
			addTrackPositionToCookie("1", d)
		}
	});
	jQuery("#global_menu span a[tk]").click(function() {
		var c = $(this),
			d = c.attr("tk");
		if (d) {
			addTrackPositionToCookie("1", d)
		}
	})
};
jQuery(function() {
	yhdHead.topMenuImgLazyLoad();
	yhdHead.topMenuTrackInit()
});
jQuery(function() {
	var b = location.search;
	if (b.indexOf("isAdvStatistics=1") > -1 && b.indexOf("advParams=") > -1) {
		$.getScript("http://adbackend.yihaodian.com/js/adv/advertising.js", function() {
			var d = document.createElement("link");
			d.type = "text/css";
			d.rel = "stylesheet";
			d.href = "http://adbackend.yihaodian.com/css/adv/tk.css";
			var a = document.getElementsByTagName("script")[0];
			a.parentNode.insertBefore(d, a)
		})
	}
});
var returnUrl = document.location.href;
var yhdPublicLogin = yhdPublicLogin || {};
var URLPrefix_passport = URLPrefix.passport;
yhdPublicLogin.checkLogin = function() {
	if (yhdPublicLogin.getCookie("ut")) {
		return true
	} else {
		return false
	}
};
yhdPublicLogin.getCookie = function(a) {
	var b = document.cookie.split(";");
	for (var d = 0; d < b.length; d++) {
		var c = b[d].split("=");
		if (c[0].replace(/(^\s*)|(\s*$)/g, "") == a) {
			return c[1]
		}
	}
	return ""
};
yhdPublicLogin.loadCssAndJs = function(c, a) {
	var b = "";
	var d = 0;
	if (typeof currVersionNum != "undefined") {
		d = currVersionNum
	}
	if (a == "js") {
		b = document.createElement("script");
		b.setAttribute("type", "text/javascript");
		b.setAttribute("charset", "UTF-8");
		b.setAttribute("src", c + "?" + d)
	} else {
		if (a == "css") {
			b = document.createElement("link");
			b.setAttribute("rel", "stylesheet");
			b.setAttribute("type", "text/css");
			b.setAttribute("href", c + "?" + d)
		}
	} if (typeof b != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(b)
	}
};
yhdPublicLogin.showLoginDiv = function(b, d, f) {
	if (d && yhdPublicLogin.checkLogin()) {
		return
	}
	if (b) {
		var c = "";
		if (b.toLowerCase().indexOf("http") < 0) {
			var h = window.location.protocol;
			var i = window.location.host;
			var g = h + "//" + i;
			c = g
		}
		var a = c + b;
		returnUrl = a
	}
	try {
		passportLoginFrame(URLPrefix_passport, null, function(j) {
			try {
				if (returnUrl) {
					window.location.href = returnUrl
				} else {
					window.location.reload(true)
				}
			} catch (k) {}
		}, f)
	} catch (e) {}
};
yhdPublicLogin.showLoginDivNone = function(g, a, d, c, f) {
	if (a && yhdPublicLogin.checkLogin()) {
		return
	}
	try {
		passportLoginFrame(g, d, c, f)
	} catch (b) {}
};
yhdPublicLogin.showTopLoginInfo = function() {
	try {
		writeHeaderContent()
	} catch (a) {}
};
jQuery(document).ready(function() {
	var a = "";
	if (URLPrefix && URLPrefix.statics) {
		a = URLPrefix.statics
	} else {
		if (currSiteId && currSiteId == 2) {
			a = "http://image.111.com.cn/statics"
		} else {
			a = "http://image.yihaodianimg.com/statics"
		}
	}
	yhdPublicLogin.loadCssAndJs(a + "/global/css/global_yhdLib.css", "css");
	yhdPublicLogin.loadCssAndJs(a + "/global/js/global_yhdLib.js", "js");
	yhdPublicLogin.loadCssAndJs(URLPrefix_passport + "/front-passport/passport/js/login_frame_client.js", "js")
});
var jsTopbarFed = {
	ieLower: /msie ([\d\.]+)/.test(window.navigator.userAgent.toLowerCase()) && parseInt(/msie ([\d\.]+)/.exec(window.navigator.userAgent.toLowerCase())[1]) <= 6,
	isWidescreen: screen.width >= 1280,
	maxHeight: function(f, e) {
		if (jsTopbarFed.ieLower) {
			var g = $(f).height();
			var h = parseInt(e);
			if (g > h) {
				$(f).height(h)
			}
		}
	},
	userNameMax: function() {
		if (jsTopbarFed.ieLower) {
			var d = jQuery("#user_name");
			var c = d.width();
			if (jsTopbarFed.isWidescreen) {
				if (c > 215) {
					d.css("width", "215")
				}
			} else {
				if (c > 138) {
					d.css("width", "138")
				}
			}
		}
	},
	bindHoverEvent: function() {
		jQuery("#global_top_bar").delegate("[data-addClass]", "mouseenter", function() {
			var e = jQuery(this);
			var a = e.attr("data-addClass");
			e.addClass(a);
			var f = loli.spm.getData(this);
			gotracker("2", "topbarHover", null, f);
			b(e)
		});
		jQuery("#glWangZhanDaoHang").delegate("a", "click", function() {
			var a = loli.spm.getData(this);
			gotracker("2", "wangzhanDaohangClick", null, a)
		});

		function b(e) {
			var f = e.attr("id");
			if (f == "glKeHuDuan" || f == "shoujiVD") {
				e.lazyImg({
					indexLoad: true
				})
			}
			if (e.has(".hd_weixin_show").length) {
				jsTopbarFed.weixinTextMax();
				e.lazyImg({
					indexLoad: true
				})
			}
			if (e.has(".hd_fav_num").length) {
				var a = e.outerWidth() - 1;
				e.find("em", ".hd_favorites").css("width", a)
			}
			if (e.has(".hd_favorites").length) {
				jsTopbarFed.maxHeight(".hd_favorites dl", "300")
			}
		}
	},
	weixinTextMax: function() {
		if (jsTopbarFed.ieLower) {
			var d = $("p", ".hd_weixin_show").height(),
				c = 36;
			if (d > c) {
				$("p", ".hd_weixin_show").css("height", c)
			}
		}
	},
	bindHoverOutEvent: function() {
		jQuery("#global_top_bar").delegate("[data-addClass]", "mouseleave", function() {
			var c = jQuery(this);
			var d = c.attr("data-addClass");
			c.removeClass(d)
		})
	},
	setNoticeTop: function(d) {
		var f = jQuery(d);
		if (f[0] && jQuery("#hd_head_skin")[0]) {
			var e = jQuery("#topbanner");
			if (e[0]) {
				e.find("img").load(function() {
					f.css("top", e.height())
				})
			} else {
				if (!jQuery("#topCurtain")[0]) {
					f.css("top", 0)
				}
			}
		}
	},
	smallTopBannerHover: function() {
		if (typeof headerType != "undefined" && headerType == "search" && typeof isBigWidescreen != "undefined" && isBigWidescreen) {
			$("#topbanner").remove();
			return
		}
		var b = $("#smallTopBanner");
		if (b.length < 1) {
			b = $("#topbanner").find(".small_topbanner3")
		}
		if (b.length < 1) {
			return
		}
		b.delegate("a", "mouseover", function() {
			$(this).siblings("a").find("u").show()
		});
		b.delegate("a", "mouseout", function() {
			$(this).siblings("a").find("u").hide()
		})
	},
	closeNotice: function(b) {
		$("#hd_header_notice").delegate(".hd_notice_close", "click", function() {
			$(this).parents(".hd_header_notice").slideUp()
		})
	},
	loadFun: function() {
		jsTopbarFed.bindHoverEvent();
		jsTopbarFed.bindHoverOutEvent();
		jsTopbarFed.smallTopBannerHover();
		jsTopbarFed.closeNotice()
	},
	noticeShow: function() {
		if ($("li", "#hd_header_notice").length > 1) {
			var b;
			$("#hd_header_notice").hover(function() {
				if (b) {
					clearInterval(b)
				}
			}, function() {
				b = setInterval(function() {
					var d = $("#hd_header_notice ul:first");
					var a = d.find("li:first").height();
					d.animate({
						marginTop: -a + "px"
					}, 500, function() {
						d.css({
							marginTop: 0
						}).find("li:first").appendTo(d)
					})
				}, 5000)
			}).trigger("mouseleave")
		}
	}
};
jQuery(document).ready(function() {
	jsTopbarFed.userNameMax();
	jsTopbarFed.loadFun();
	jsTopbarFed.noticeShow()
});
(function(c) {
	var d = window.loli || (window.loli = {});
	d.timing = {
		timeToStr: function(g, a) {
			var b = [];
			for (var h in g) {
				if (g[h].value == -1 || g[h].value >= 3 * 60 * 1000) {
					continue
				}
				b.push(g[h].name + "_" + g[h].value)
			}
			if (a) {
				b.push(a)
			}
			return (b.join("-"))
		},
		basicTime: function(l) {
			if (!window.performance) {
				return
			}
			var j = window.performance,
				a = j.timing,
				k = j.navigation,
				b = {
					redirectCount: {
						name: "RDTT",
						value: k.redirectCount
					},
					redirectTime: {
						name: "RDTM",
						value: a.redirectEnd - a.redirectStart
					},
					domainLookupTime: {
						name: "DMLKT",
						value: a.domainLookupEnd - a.domainLookupStart
					},
					connectTime: {
						name: "CONTT",
						value: a.connectEnd - a.connectStart
					},
					requestTime: {
						name: "REQT",
						value: a.responseStart - (a.requestStart || a.responseStart + 1)
					},
					responseTime: {
						name: "RSPT",
						func: function() {
							var e = a.responseEnd - a.responseStart;
							if (a.domContentLoadedEventStart) {
								if (e < 0) {
									e = 0
								}
							} else {
								e = -1
							}
							return e
						},
						value: -1
					},
					domParsingTime: {
						name: "DMPT",
						func: function() {
							return a.domContentLoadedEventStart ? a.domInteractive - a.domLoading : -1
						},
						value: -1
					},
					domLoadedTime: {
						name: "DMLT",
						func: function() {
							if (a.loadEventStart) {
								return a.loadEventStart - a.domInteractive
							}
							return a.domComplete ? a.domComplete - a.domInteractive : -1
						},
						value: -1
					},
					winOnLoadTime: {
						name: "ONLOADT",
						func: function() {
							return a.loadEventEnd ? a.loadEventEnd - a.loadEventStart : -1
						},
						value: -1
					},
					pageLoadTime: {
						name: "PAGET",
						func: function() {
							if (a.loadEventStart) {
								return a.loadEventStart - a.fetchStart
							}
							return a.domComplete ? a.domComplete - a.fetchStart : -1
						},
						value: -1
					},
					allLoadTime: {
						name: "ALLT",
						func: function() {
							if (a.loadEventEnd) {
								return a.loadEventEnd - a.navigationStart
							}
							return a.domComplete ? a.domComplete - a.navigationStart : -1
						},
						value: -1
					},
					firstPaintTime: {
						name: "FPAINTT",
						func: function() {
							var e = a.firstPaint || a.msFirstPaint || a.mozFirstPaint || a.webkitFirstPaint || a.oFirstPaint;
							return e ? e - a.navigationStart : -1
						},
						value: -1
					},
					beforeDomLoadingTime: {
						name: "BEFDMLT",
						func: function() {
							return a.domLoading ? a.domLoading - a.navigationStart : -1
						},
						value: -1
					},
					resourcesLoadedTime: {
						name: "RESLOADT",
						func: function() {
							if (a.loadEventStart) {
								return a.loadEventStart - a.domLoading
							}
							return a.domComplete ? a.domComplete - a.domLoading : -1
						},
						value: -1
					},
					scriptRunTime: {
						name: "SCRIPTT",
						func: function() {
							var e = a.domContentLoadedEventEnd - a.domContentLoadedEventStart;
							return e > 0 ? e : -1
						},
						value: -1
					},
					customInteractTime: {
						name: "CINTT",
						func: function() {
							var f = window.global || (window.global = {});
							var e = f.vars = (f.vars || {});
							var g = f.vars.customInteractTime;
							if (g) {
								return g - window.performance.timing.navigationStart
							} else {
								return -1
							}
						},
						value: -1
					},
					interactTime: {
						name: "INTT",
						func: function() {
							if (a.domContentLoadedEventStart) {
								return a.domContentLoadedEventStart - a.navigationStart
							}
							return -1
						},
						value: -1
					}
				};
			for (var i in b) {
				if (b[i].value == -1 && typeof b[i].func == "function") {
					b[i].value = b[i].func()
				}
			}
			return this.timeToStr(b, l)
		},
		eventHandleTime: function(b) {
			try {
				var e = [];
				if (typeof b == "undefined") {
					return false
				} else {
					if (b instanceof Array) {
						var i = false;
						for (var k = 0; k < b.length; k++) {
							var l = b[k];
							if (typeof l == "object") {
								if (typeof l.name == "undefined" || l.endTime == "undefined" || l.startTime == "undefined") {
									console.log("data format is wrong! propeties should have name or endTime or startTime ");
									continue
								} else {
									if (typeof l.endTime != "number" || typeof l.startTime != "number") {
										console.log(" endTime or startTime of " + l.name + "Object is not number type");
										continue
									} else {
										e.push(l.name + "_" + (l.endTime - l.startTime));
										i = true
									}
								}
							} else {
								console.log("data format of Array is wrong! should be single Object");
								continue
							}
						}
						if (i) {
							d.timing.sendTimerTracker(e.join("|"));
							return true
						}
					} else {
						if (typeof b == "object") {
							if (typeof b.name == "undefined" || b.startTime == "undefined" || b.endTime == "undefined") {
								console.log("data format is wrong! propeties should be name and startTime ");
								return false
							} else {
								if (typeof b.startTime != "number" || typeof b.endTime != "number") {
									console.log(" startTime of " + b.name + "Object is not number type");
									return false
								}
								d.timing.sendTimerTracker(b.name + "_" + (b.endTime - b.startTime));
								return true
							}
						} else {
							return false
						}
					}
				}
			} catch (a) {}
		},
		sendTimerTracker: function(a) {
			if (a && c.trim(a) != "") {
				var b = d.page.getCurrPageInfo();
				if (!b) {
					recordTrackInfoWithType("2", a);
					return
				}
				var f = {
					w_pt: b.pageType,
					w_pv: b.pageValue
				};
				recordTrackInfoWithType("2", a, null, null, f)
			}
		},
		loadBaseTime: function() {
			if (!window.performance) {
				return
			}
			if (typeof stopGlobalTimingLoadFlag == "undefined") {
				d.timing.sendTimerTracker(d.timing.basicTime())
			}
		}
	}
})(jQuery);
jQuery(window).load(function() {
	setTimeout(function() {
		loli.timing.loadBaseTime()
	}, 3000)
});
var YHDREF = YHDREF || {};
(function($) {
	var refParseFunc = null;
	YHDREF.defineGlobalRefParse = function(getRefAttrFunc) {
		refParseFunc = getRefAttrFunc
	};
	$(function() {
		var head = "gl.",
			prevTk = "[",
			afterTk = "]";
		var util = loli.util.url;
		var getPrevPageFlag = function() {
			var _location = location;
			var href = _location.href;
			var params = util.getParams(href);
			if (!params || !params.ref) {
				return 0
			}
			var ref = params.ref;
			if (checkRef(ref)) {
				return ref.substring(ref.lastIndexOf(".") + 1)
			}
			return 0
		};
		var checkRef = function(ref) {
			if (ref.indexOf(head) != 0 || ref.indexOf(prevTk) <= 0 || ref.indexOf(afterTk) <= 0) {
				return false
			}
			var reg = /gl\.\d\.\d\.\w+\.\[[\S]+\]\.[\S]+\.[\S]+$/;
			var result = reg.exec(ref);
			return result ? true : false
		};
		var prevPageFlag = getPrevPageFlag();
		var currentPageFlag = loli.global.uid;
		var checkDataRef = function(dataRef) {
			return (typeof(dataRef) != "undefined" && (dataRef instanceof Array) && dataRef.length >= 1)
		};

		function isLinkRef(link) {
			if (typeof(link) == "undefined" || !link || link == "#" || link.indexOf("#") == 0 || link == "###" || link.toLowerCase().indexOf("javascript") >= 0) {
				return false
			}
			return true
		}
		var eventType = "mousedown";
		if (loli.isMobile()) {
			eventType = "click"
		}
		$("body").delegate("a, area", eventType, function() {
			var _this = $(this);
			var isTrkCustom = jQuery.trim(_this.attr("isTrkCustom"));
			if (typeof(isTrkCustom) != "undefined" && isTrkCustom && isTrkCustom == "1") {
				return
			}
			var dataRef = _this.data("data-tracker2cookie");
			if (!dataRef) {
				var data_ref = _this.attr("data-ref");
				if (data_ref && data_ref.indexOf("[") == 0 && data_ref.indexOf("]") == data_ref.length - 1) {
					eval("dataRef = " + data_ref)
				} else {
					if (data_ref) {
						data_ref = "['" + data_ref + "']";
						eval("dataRef = " + data_ref)
					}
				}
			}
			if (!dataRef && refParseFunc) {
				dataRef = refParseFunc(_this);
				if (checkDataRef(dataRef)) {
					_this.data("data-tracker2cookie", dataRef)
				}
			}
			var link = jQuery.trim(_this.attr("href"));
			var spmData = loli.spm.getData(_this);
			if (isLinkRef(link)) {
				if (checkDataRef(dataRef)) {
					addTrackPositionToCookie.apply(window, [1].concat(dataRef))
				} else {
					if (jQuery.trim(dataRef) != "") {
						addTrackPositionToCookie(1, dataRef)
					}
				}
				var _rewrite = _this.data("data-globalRewrite");
				if (_rewrite && _rewrite == 1) {
					return
				}
				if (spmData) {
					var tc = spmData.tc;
					var tp = spmData.tp;
					var tce = spmData.tce;
					var abtest = spmData.abtestValue;
					var params = {
						tc: tc,
						tp: tp,
						tce: tce,
						abtest: abtest
					};
					link = util.appendParams(link, params)
				}
				_this.attr("href", link);
				_this.data("data-globalRewrite", 1);
				var trackerCode = _this.attr("data-event");
				if (trackerCode && trackerCode == "add_cart") {
					var pmid = _this.attr("data-pmid") || 2;
					var proid = _this.attr("data-proid");
					spmData.positionTypeId = "4";
					gotracker(pmid, trackerCode, proid, spmData)
				} else {
					if (trackerCode) {
						gotracker(2, trackerCode, null, spmData)
					}
				}
			} else {
				var isTrkCustom = jQuery.trim(_this.attr("isTrkCustom"));
				if (typeof(isTrkCustom) != "undefined" && isTrkCustom && isTrkCustom == "1") {
					return
				} else {
					if (checkDataRef(dataRef)) {
						var pmId = dataRef[2] ? dataRef[2] : 2;
						var tk = dataRef[0];
						var productId = dataRef[1] ? dataRef[1] : null;
						gotracker(pmId, tk, productId, spmData)
					} else {
						var trackerCode = _this.attr("data-event");
						if (trackerCode && trackerCode == "add_cart") {
							var pmid = _this.attr("data-pmid") || 2;
							var proid = _this.attr("data-proid");
							spmData.positionTypeId = "4";
							gotracker(pmid, trackerCode, proid, spmData)
						} else {
							if (trackerCode) {
								gotracker(2, trackerCode, null, spmData)
							} else {
								if (spmData) {
									gotracker(2, "buttonPosition", null, spmData)
								}
							}
						}
					}
				}
			}
		})
	})
})(jQuery);
(function(f) {
	var e = {
		urlMap: [],
		resultMap: [],
		loadedCount: 0,
		config: {},
		cdnConfig: function(c) {
			e.config = c;
			var b = e.config.random;
			if (b) {
				var a = Math.floor(Math.random() * 100 + 1);
				if (a <= b) {
					e.config.canDetection = true
				}
			}
		},
		canDetection: function() {
			var a = window.navigator.userAgent.indexOf("Chrome") !== -1;
			if (a && window.performance && e.config.canDetection) {
				return true
			}
			return false
		},
		cdnAddObject: function(a, b) {
			if (!e.canDetection()) {
				return
			}
			e.urlMap.push({
				key: a,
				url: b + "?r=" + Math.random()
			})
		},
		cdnDetection: function(b) {
			if (!e.canDetection()) {
				return
			}
			var j = e.urlMap,
				c = j.length;
			for (var a = 0; a < c; a++) {
				var i = j[a];
				this.loadResource(i)
			}
		},
		loaded: function() {
			var b = e;
			if (b.urlMap.length == b.loadedCount) {
				var a = b.config.callback;
				a();
				return
			}
		},
		loadResource: function(a) {
			var b = new Image();
			b.onload = function() {
				try {
					var h = window.performance.getEntriesByName(a.url);
					if (h == null || h.length < 1) {
						return
					}
					e.loadedCount++;
					a.costTime = Math.round(h[0].responseEnd - h[0].startTime);
					e.resultMap.push(a);
					e.loaded()
				} catch (c) {}
			};
			b.src = a.url
		}
	};
	var d = window.loli || (window.loli = {});
	d.cdnDetection = e;
	jQuery(document).ready(function() {
		var c = f("body").attr("data-cdnDetection");
		if (c == "-1" || c == null) {
			return
		}
		c = jQuery.parseJSON(c);
		if (!c.random || !c.child) {
			return
		}
		var b = c.child,
			a = b.length;
		if (a < 1) {
			return
		}
		var h = d.cdnDetection;
		h.cdnConfig({
			random: c.random,
			callback: function() {
				var z = h.resultMap,
					B = "http://opsdev.yhd.com/trace/?time=" + new Date().getTime();
				var x = "d=";
				var C = z.length;
				for (var g = 0; g < C; g++) {
					var t = z[g];
					var v = t.key;
					var w = "0.0.0.0";
					var y = 0;
					var A = t.costTime;
					x += v + "," + w + "," + y + "," + A;
					if (g < C - 1) {
						x = x + ";"
					}
				}
				var u = new Image();
				u.src = B + "&" + x
			}
		});
		setTimeout(function() {
			for (var k = 0; k < a; k++) {
				var g = b[k];
				h.cdnAddObject(g.key, g.url)
			}
			h.cdnDetection()
		}, 10000)
	})
})(jQuery);
var glaCookieHandler = {};
(function(e) {
	var i = function(o) {
		var q = document.cookie;
		var r = q.split("; ");
		for (var p = 0; p < r.length; p++) {
			var n = r[p].split("=");
			if (n[0] == o) {
				return n[1]
			}
		}
		return null
	};
	var d = "gla";
	var e = e || {}, f = i("provinceId"),
		h = i(d);
	var c = {
		p_1: "-10",
		p_2: "-20",
		p_3: "-30",
		p_4: "25",
		p_5: "37",
		p_6: "50",
		p_7: "-40",
		p_8: "62",
		p_9: "75",
		p_10: "88",
		p_11: "97",
		p_12: "111",
		p_13: "133",
		p_14: "150",
		p_15: "159",
		p_16: "170",
		p_17: "187",
		p_18: "205",
		p_19: "222",
		p_20: "237",
		p_21: "258",
		p_22: "274",
		p_23: "294",
		p_24: "303",
		p_25: "320",
		p_26: "327",
		p_27: "337",
		p_28: "351",
		p_29: "359",
		p_30: "377",
		p_32: "387"
	};

	function j() {
		var n = k();
		if (n && n.provinceId) {
			return n.provinceId
		} else {
			return f
		}
	}

	function b() {
		var n = k();
		if (n && n.cityId) {
			return n.provinceId
		}
		return null
	}

	function g() {
		var n = false;
		var o = k();
		if (f && o && o.provinceId && o.provinceId == f) {
			n = true
		}
		return n
	}

	function k() {
		if (!h) {
			return null
		}
		var p = {};
		var n = h.split("_");
		var o = n[0].split(".");
		if (o.length < 2) {
			return null
		}
		p.provinceId = o[0];
		p.cityId = o[1];
		p.hasUnionSite = false;
		if (n.length > 1 && n[1] != "0") {
			p.hasUnionSite = true;
			p.unionSiteDomain = n[1]
		}
		p.willingToUnionSite = 1;
		if (n.length > 2 && n[2] == "0") {
			p.willingToUnionSite = 0
		}
		if (n.length > 3 && n[3] == "1") {
			p.isMain = 1
		}
		return p
	}

	function a(p) {
		if (!p || !p.provinceId) {
			return
		}
		if (!p.cityId) {
			p.cityId = c["p_" + p.provinceId]
		}
		var o = [];
		o.push(p.provinceId + "." + p.cityId);
		if (p.unionSiteDomain) {
			o.push(p.unionSiteDomain);
			if (p.willingToUnionSite && p.willingToUnionSite != "0") {
				o.push(1)
			} else {
				o.push(0)
			}
		} else {
			o.push(0)
		} if (p.isMain) {
			o.push(1)
		} else {
			o.push(0)
		}
		var n = new Date();
		n.setTime(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
		document.cookie = d + "=" + o.join("_") + ";path=/;domain=." + no3wUrl + ";expires=" + n.toGMTString()
	}

	function l(n) {
		if (!n || !n.provinceId) {
			return
		}
		a(n);
		var o = new Date();
		o.setTime(new Date().getTime() + 800 * 24 * 60 * 60 * 1000);
		document.cookie = "provinceId=" + n.provinceId + ";path=/;domain=." + no3wUrl + ";expires=" + o.toGMTString()
	}

	function m() {
		var n = "";
		if (g()) {
			var o = k();
			if (o && o.unionSiteDomain && o.willingToUnionSite) {
				n = o.unionSiteDomain
			}
		}
		return n
	}
	e.glaCookieKey = d;
	e.defaultCityObj = c;
	e.analysisGla = k;
	e.genGlaCookie = a;
	e.gotoUnionSite = m;
	e.getCookie = i;
	e.check2ProvinceIsSame = g;
	e.resetGlaAndProvinceCookie = l;
	e.getProvinceId = j
})(glaCookieHandler);
(function(a) {
	a(function() {
		var i = window.loli || (window.loli = {});
		var c = i.app = i.app || {};
		var f = i.app.account = i.app.account || {};
		var e = a.cookie("provinceId");
		var h = a.cookie("yihaodian_uid");
		var j = (typeof globalTopPrismFlag != "undefined" && globalTopPrismFlag == "0") ? 0 : 1;
		var l = a("#global_login");
		var k = l.attr("data-mpIcon") != "" ? a.parseJSON(l.attr("data-mpIcon")) : null;
		if (!h || !e) {
			return
		}
		var b = function() {
			var o = URLPrefix.central + "/homepage/ajaxFindPrismMemberUserInfo.do?callback=?";
			var n = function(q) {
				var r = g(q);
				l.html(r);
				l.data("userInfo", q);
				m()
			};
			var p = {
				userId: h,
				currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
				currSiteType: 1,
				provinceId: e
			};
			a.getJSON(o, p, function(q) {
				var s = q;
				if (s) {
					if (s.status == 1) {
						var r = s.userInfo;
						n(r)
					}
				}
			})
		};
		var d = function(n) {
			if (n != null && n != "") {
				n = n.replace(/\&/g, "&amp;");
				n = n.replace(/\</g, "&lt;");
				n = n.replace(/\>/g, "&gt;");
				n = n.replace(/\\/g, "&#92;");
				n = n.replace(/\'/g, "&#039;");
				n = n.replace(/\"/g, "&#034;")
			}
			return n
		};
		var g = function(s) {
			if (!s) {
				return
			}
			var C = URLPrefix.statics + "/global/images/top/peopleicon_01.gif";
			var t = URLPrefix.statics + "/global/images/top/peopleicon_02.gif";
			var v = "http://my.yhd.com/member/my.do";
			var H = "http://vip.yhd.com";
			var p = "http://jifen.yhd.com/pointshop/pointIndex.do";
			var E = "http://my.yhd.com/member/userinfo/editinfo.do";
			var B = "http://vip.yhd.com/badge-shop/index.html";
			var n = "http://edm.yhd.com/pcMsg/myMessage.action";
			var z = s.endUserCredit ? s.endUserCredit : 0;
			var D = s.exp ? s.exp : 0;
			var r = s.nextGradeExpNeed;
			var o = s.memberGrade ? s.memberGrade : 0;
			var x = s.endUserPic;
			var F = d(s.endUserName);
			var w = s.badgesNum ? s.badgesNum : 0;
			var u = s.msgsNum ? s.msgsNum : 0;
			var y = s.samFlag ? s.samFlag : 0;
			if (o == null || o < 0 || o > 3) {
				o = 0
			}
			var q = 0;
			if (D < 1) {
				q = 0
			} else {
				if (D < 1000) {
					q = D / 10
				} else {
					if (D < 3000) {
						q = D / 30
					} else {
						q = D >= 10000 ? 75 : D / 10000 * 0.75 * 100
					}
				}
			}
			var G = "";
			if (k != null && k.imgUrl != "") {
				G += "<img src='" + k.imgUrl + "' alt='" + (k.altName || "") + "'>"
			}
			var A = [];
			A.push("<div class='hd_login clearfix'>");
			A.push("<span class='hd_hi'>Hi,</span>");
			A.push("<a href='" + H + "' target='_blank' class='hd_vip " + ("hd_vip" + o) + "' data-ref='YHD_TOP_username_vip'></a>");
			A.push("<a href='" + v + "' target='_blank' class='hd_login_name fl' data-ref='YHD_TOP_myyihaodian'>" + F + "</a>");
			A.push("</div>");
			A.push("<div class='hd_user_center'>");
			A.push("<a href='javascript:bothSiteLogoutJsonp();' class='blue_link'>退出登录</a>");
			A.push("<div class='clearfix'>");
			A.push("<div class='fl'>");
			A.push("<a class='hd_avata_box' href='" + v + "' target='_blank' data-ref='YHD_TOP_userpic'>");
			A.push(x ? "<img src='" + x + "'>" : "");
			A.push("</a>");
			A.push("<a href='" + E + "' target='_blank' data-ref='YHD_TOP_userinfo'>个人资料</a>");
			A.push("</div>");
			A.push("<div class='hd_growth_box'>");
			A.push("<p><a class='hd_user_name' href='" + v + "' target='_blank' data-ref='YHD_TOP_myyihaodian'>" + F + "</a>&nbsp;");
			A.push("<a class='hd_vip " + ("hd_vip" + o) + "' href='" + H + "' target='_blank' data-ref='YHD_TOP_username_vip'></a>");
			A.push("</p>");
			A.push("<p>当前成长值：<a class='hd_login_wrap_arrow' href='" + H + "' target='_blank' data-ref='YHD_TOP_userexp'>" + D + "</a></p>");
			A.push("<div class='hd_growth_progress'><p class='hd_progress_bar' style='width:" + q + "%'><i></i></p></div>");
			A.push("</div>");
			A.push("</div>");
			A.push("<div class='hd_message'>");
			A.push("<a href='" + p + "' target='_blank' data-ref='YHD_TOP_userjifen'>");
			A.push("<b>" + z + "</b>");
			A.push("<span class='hd_point'>积分<em>" + G + "</em></span>");
			A.push("</a>");
			A.push("<a href='" + H + "' target='_blank' data-ref='YHD_TOP_userxunzhang'>");
			if (o == 0 || o == 3) {
				A.push("<b>0元</b>");
				A.push("<span>会员价</span>")
			} else {
				A.push("<b>19.9元</b>");
				A.push("<span>会员价</span>")
			}
			A.push("</a>");
			A.push("<a href='" + n + "' target='_blank' data-ref='YHD_TOP_usermsg'>");
			A.push("<b>" + u + "</b>");
			A.push("<span>消息</span>");
			A.push("</a>");
			A.push("</div>");
			A.push("</div>");
			A.push("<em class='hd_login_arrow'></em>");
			return A.join("")
		};
		var m = function() {
			var n = null;
			l.hover(function() {
				var o = i.spm.getData(this);
				gotracker("2", "logintopbarHover", null, o);
				if (n != null) {
					clearTimeout(n)
				}
				n = setTimeout(function() {
					l.addClass("hd_login_hover")
				}, 200)
			}, function() {
				if (n != null) {
					clearTimeout(n)
				}
				n = setTimeout(function() {
					l.removeClass("hd_login_hover")
				}, 200)
			});
			l.show();
			a("#global_unlogin").hide()
		};
		f.showUserInfo = function(n) {
			if (j) {
				if (n && n.result == 1) {
					b()
				}
			} else {
				if (n && n.result == 1) {
					var o = {
						endUserName: n.userName,
						endUserPic: n.endUserPic,
						endUserSex: n.endUserSex,
						memberGrade: n.memberGrade,
						exp: 0,
						nextGradeExpNeed: 0,
						endUserCredit: 0,
						badgesNum: 0,
						msgsNum: 0
					};
					var p = g(o);
					l.html(p);
					l.data("userInfo", o);
					m()
				}
			}
		};
		if (l.size() > 0 && l.attr("data-type") != null) {
			i.globalCheckLogin(f.showUserInfo)
		}
	})
})(jQuery);
(function(b) {
	b(function() {
		var N = window.loli || (window.loli = {});
		var B = N.app = N.app || {};
		var I = N.app.coupon = N.app.coupon || {};
		var D = N.yhdStore;
		var A = b.cookie("provinceId");
		var J = b.cookie("yihaodian_uid");
		var y = "top_prism_coupon";
		var H = "top_prism_coupon_num_" + J;
		var F = (typeof globalTopPrismFlag != "undefined" && globalTopPrismFlag == "0") ? 0 : 1;
		var L = b("#hdPrismWrap");
		var a = b("#hdPrismCoupon");
		var x = b("#hdPrismCouponNum");
		var E = b("#hdPrismCouponList");
		if (!J || !A || !F) {
			return
		}
		var z = function() {
			if (D) {
				var c = D.isIE();
				if (c == 0 || c >= 9 || (c == 8 && D.isRoot())) {
					D.getFromRoot(H, function(d) {
						if (d && d.status == 1) {
							var e = (d.value && !isNaN(d.value)) ? parseInt(d.value) : 0;
							a.data("couponsNumData", e);
							if (e > 0) {
								x.text(e <= 99 ? e : 99);
								x.show()
							} else {
								if (isNaN(d.value) || d.value == null) {
									w()
								}
							}
						} else {
							w()
						}
					})
				} else {
					w()
				}
			}
		};
		var w = function() {
			var d = URLPrefix.central + "/homepage/ajaxFindNewPrismCouponsNum.do?callback=?";
			var e = function(f) {
				a.data("couponsNumData", f);
				a.data("couponsNumLoaded", 1);
				if (f > 0) {
					x.text(f <= 99 ? f : 99);
					x.show()
				} else {
					x.text("");
					x.hide()
				} if (D) {
					D.setFromRoot(H, f)
				}
			};
			var c = {
				userId: J,
				currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
				currSiteType: 1,
				provinceId: A
			};
			b.getJSON(d, c, function(h) {
				var f = h;
				if (f) {
					if (f.status == 1) {
						var g = f.nums;
						e(g)
					}
				}
			})
		};
		var M = function() {
			var e = URLPrefix.central + "/homepage/ajaxFindNewPrismCoupons.do?callback=?";
			var c = a.data("couponsNumData");
			var f = function(h) {
				a.data("couponsData", h);
				var g = v(h);
				E.removeClass("global_loading").html(g);
				E.height("auto")
			};
			var d = {
				userId: J,
				total: c != null ? c : 50,
				currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
				currSiteType: 1,
				provinceId: A
			};
			b.getJSON(e, d, function(h) {
				var i = h;
				if (i) {
					if (i.status == 1) {
						var g = i.coupons;
						f(g)
					}
				}
			})
		};
		var v = function(d) {
			var f = "http://coupon.yhd.com/myCoupon";
			var l = [];
			if (d && d.length > 0) {
				var h = false;
				var i = false;
				for (var c = 0; c < d.length; c++) {
					var e = d[c];
					if (e.timeType == 1) {
						if (!h) {
							l.push("<p class='hd_prism_tit'>即将到期</p>");
							h = true
						}
					}
					if (e.timeType != 1) {
						if (!i) {
							if (h) {
								l.push("<p class='hd_prism_tit'>其他抵用券</p>");
								i = true
							} else {
								l.push("<p class='hd_prism_tit'>我的抵用券</p>");
								i = true
							}
						}
					}
					var j = e.timeType == 1 ? (e.endDateTimeStr + " 结束") : (e.startDateTimeStr + " 开始");
					var m = "http://list.yhd.com/redirectCoupon/" + e.couponActiveDefId;
					var k = y + "_" + e.couponNumber;
					var g = e.timeType == 1 ? "hd_coupon_org" : (e.timeType == 2 ? "" : "hd_coupon_gray");
					if (e.couponUserType == 0 || e.couponUserType == 5 || e.couponUserType == 6 || e.couponUserType == 7 || e.couponUserType == 8) {
						m = f
					}
					if (e.timeType == 1) {
						if (e.dateDiff == 0) {
							j = "<b>今天</b>到期"
						} else {
							j = "还剩 <b>" + e.dateDiff + "</b>天 到期"
						}
					} else {
						if (e.timeType == 2) {
							j = e.startDateStr + " 至 " + e.endDateStr
						} else {
							if (e.timeType == 3) {
								j = e.startDateTimeStr + " 开始"
							}
						}
					}
					l.push("<a href='" + m + "' data-ref='" + k + "' target='_blank' title='" + e.couponInfo + "' class='hd_coupon " + g + "'>");
					l.push("<div class='clearfix'>");
					l.push("<b class='hd_coupon_price'>&yen;<em>" + e.amount + "</em></b>");
					l.push("<span class='hd_coupon_sort'>" + e.couponInfo + "</span>");
					l.push("</div>");
					l.push("<p class='hd_coupon_timer'>" + j + "</p>");
					l.push("</a>")
				}
				l.push("<a class='hd_more_btn' href='" + f + "' target='_blank' data-ref='" + y + "_more'>查看更多</a>")
			} else {
				l.push("<div class='hd_none_tips'>");
				l.push("<span class='hd_none_icon'></span>");
				l.push("<p class='hd_none_text'>您还没有礼券哦~</p>");
				l.push("</div>")
			}
			return l.join("")
		};
		var K = function() {
			var c = b("a.hd_prism_tab", a);
			c.attr("href", "javascript:void(0);");
			c.removeAttr("target");
			c.click(function() {
				if (a.data("dataLoaded") == "1" && a.hasClass("hd_cur")) {
					G(a);
					return
				}
				if (!a.data("couponsNumLoaded")) {
					w()
				}
				var d = function(e) {
					if (e.result == 1) {
						if (a.data("dataLoaded") == "1") {
							C(a)
						} else {
							a.data("dataLoaded", "1");
							E.height("100");
							C(a);
							M();
							if (c.data("clicked") != 1) {
								gotracker("2", y);
								c.data("clicked", 1)
							}
						}
					} else {
						if (yhdPublicLogin) {
							yhdPublicLogin.showLoginDiv()
						}
					}
				};
				N.globalCheckLogin(d)
			});
			b(document.body).click(function(f) {
				var d = b(this);
				var e = f.target ? f.target : f.srcElement;
				if (e) {
					var g = b(e).parents("div.hd_prism_wrap").size();
					if (g == 0 && a.hasClass("hd_cur")) {
						a.removeClass("hd_cur")
					}
				}
			})
		};
		var C = function(c) {
			L.find("div.hd_prism,div.hd_mini_cart").removeClass("hd_cur");
			c.addClass("hd_cur")
		};
		var G = function(c) {
			c.removeClass("hd_cur")
		};
		I.showNum = function() {
			z();
			K()
		};
		window.topCouponTimeoutHandler = setTimeout(function() {
			if (a.size() > 0) {
				I.showNum()
			}
		}, 3 * 1000)
	})
})(jQuery);
(function(b) {
	b(function() {
		var R = window.loli || (window.loli = {});
		var z = R.app = R.app || {};
		var G = R.app.order = R.app.order || {};
		var a = R.yhdStore;
		var F = b.cookie("provinceId");
		var O = b.cookie("yihaodian_uid");
		var N = "top_prism_order";
		var E = "top_prism_order_num_" + O;
		var C = (typeof globalTopPrismFlag != "undefined" && globalTopPrismFlag == "0") ? 0 : 1;
		var Q = b("#hdPrismWrap");
		var H = b("#hdPrismOrder");
		var L = b("#hdPrismOrderNum");
		var M = b("#hdPrismOrderList");
		if (!O || !F || !C) {
			return
		}
		var B = function() {
			if (a) {
				var c = a.isIE();
				if (c == 0 || c >= 9 || (c == 8 && a.isRoot())) {
					a.getFromRoot(E, function(d) {
						if (d && d.status == 1) {
							var e = (d.value && !isNaN(d.value)) ? parseInt(d.value) : 0;
							H.data("ordersNumData", e);
							if (e > 0) {
								L.text(e <= 99 ? e : 99);
								L.show()
							} else {
								if (isNaN(d.value) || d.value == null) {
									I()
								}
							}
						} else {
							I()
						}
					})
				} else {
					I()
				}
			}
		};
		var I = function() {
			var c = URLPrefix.central + "/homepage/ajaxFindTopPrismOrdersNum.do?callback=?";
			var e = function(f) {
				H.data("ordersNumData", f);
				H.data("ordersNumLoaded", 1);
				if (f > 0) {
					L.text(f <= 99 ? f : 99);
					L.show()
				} else {
					L.text("");
					L.hide()
				} if (a) {
					a.setFromRoot(E, f)
				}
			};
			var d = {
				userId: O,
				currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
				currSiteType: 1,
				provinceId: F
			};
			b.getJSON(c, d, function(f) {
				var g = f;
				if (g) {
					if (g.status == 1) {
						var h = g.result;
						e(h)
					}
				}
			})
		};
		var y = function() {
			var e = URLPrefix.central + "/homepage/ajaxFindTopPrismOrders.do?callback=?";
			var c = function(g) {
				H.data("ordersData", g);
				var f = x(g);
				M.removeClass("global_loading").html(f);
				M.height("auto")
			};
			var d = {
				userId: O,
				currSiteId: (typeof currSiteId == "undefined") ? 1 : currSiteId,
				currSiteType: 1,
				provinceId: F
			};
			b.getJSON(e, d, function(f) {
				var g = f;
				if (g) {
					if (g.status == 1) {
						var h = g.orders;
						c(h)
					}
				}
			})
		};
		var x = function(aa) {
			var e = "http://image.yihaodianimg.com/front-homepage/global/images/defaultproduct_60x60.jpg";
			var p = typeof URLPrefix.my != "undefined" ? URLPrefix.my : "http://my.yhd.com";
			var f = "http://my.yhd.com/order/myOrder.do";
			var c = "http://cms.yhd.com/cmsPage/show.do?pageId=65818";
			var g = [];
			if (aa && aa.length > 0) {
				g.push("<p class='hd_order_tips'><a class='blue_link' href='" + c + "' target='_blank' data-ref='" + N + "_download'>下载手机客户端，轻松查询配送信息</a></p>");
				for (var v = 0; v < aa.length; v++) {
					var Y = aa[v];
					var j = Y.status;
					var s = Y.actionType;
					var o = s == 1 ? "待付款" : (s == 2 ? "待收货" : (s == 3 ? "待评论" : ""));
					var m = p + "/order/orderDetail.do?orderCode=" + Y.code;
					var n = N + "_detail_" + Y.id;
					var u = "http://e.yhd.com/front-pe/pe/orderProductExperience!orderProductExperience.do?soId=" + Y.id + "&userId=" + O + "&hasCommented=false&soType=0";
					var q = N + "_comment_" + Y.id;
					var l = "http://my.yhd.com/order/finishOrder.do?orderCode=" + Y.code;
					var r = N + "_pay_" + Y.id;
					var d = "http://e.yhd.com/front-pe/couriers/deliveryStaff!comment.do?soId=" + Y.id;
					var w = N + "_commentExpress_" + Y.id;
					if (!Y.hasSubOrders) {
						g.push("<div class='hd_order_list'>");
						g.push("<a href='" + m + "' target='_blank' data-ref='" + n + "' class='hd_order_num'>");
						if (s == 3 && !Y.deliveryMsg) {
							var ad = J(j);
							if (ad) {
								g.push("<b><i></i>" + ad + "</b>")
							}
						}
						g.push("订单号：" + Y.code);
						g.push("</a>");
						if (Y.deliveryMsg) {
							g.push("<p class='hd_order_status'>" + Y.deliveryMsg + "</p>")
						}
						g.push("<div class='hd_pro_list'>");
						g.push("<div class='clearfix'>");
						for (var Z = 0; Z < Y.items.length; Z++) {
							var ac = "http://item-home.yhd.com/item/snapshotShow.do?productId=" + Y.items[Z].productId + "&soItemId=" + Y.items[Z].soItemId + "&flag=1";
							var i = P(Y.items[Z].productPicPath ? Y.items[Z].productPicPath : e);
							var h = N + "_item_" + Y.items[Z].productMerchantId;
							if (Z > 2) {
								break
							}
							g.push("<a href='" + ac + "' target='_blank' data-ref='" + h + "'><img src='" + R.util.hashImgUrl(i) + "' /></a>")
						}
						g.push("</div>");
						g.push("</div>");
						if (s == 1) {
							g.push("<div class='hd_btn_wrap'><a href='" + l + "' target='_blank' data-ref='" + r + "' class='hd_pay_btn'>立即支付</a></div>")
						} else {
							if (s == 3) {
								if (1 == Y.hasCommentExpress) {
									g.push("<div class='hd_btn_wrap'>")
								} else {
									g.push("<div class='hd_btn_wrap hd_shop_order'>")
								}
								g.push("<a href='" + u + "' target='_blank' data-ref='" + q + "' class='hd_comment_btn'>立即评论");
								if (0 == Y.hasCommentGiftActivity) {
									if (1 == Y.commentActivityType) {
										g.push("<em class='hd_gift_icon'></em>")
									} else {
										if (2 == Y.commentActivityType) {
											g.push("<em class='hd_fanxian_icon'></em>")
										}
									}
								}
								g.push("</a>");
								if (1 == Y.hasCommentExpress) {
									g.push("<a class='hd_comment_express' href='" + d + "' target='_blank' data-ref='" + w + "'>评论快递小哥</a>")
								}
								g.push("</div>")
							}
						}
						g.push("</div>")
					} else {
						u = "http://e.yhd.com/front-pe/pe/orderProductExperience!orderProductExperience.do?soId=" + Y.id + "&userId=" + O + "&hasCommented=false&soType=1";
						g.push("<div class='hd_order_list'>");
						g.push("<a href='" + m + "' target='_blank' data-ref='" + n + "' class='hd_order_num'>订单号：" + Y.code + "</a>");
						for (var ab = 0; ab < Y.subOrders.length; ab++) {
							var t = Y.subOrders[ab];
							var k = "";
							if (t.deliveryMsg) {
								k = t.deliveryMsg
							}
							if (s == 3 && !t.deliveryMsg) {
								k = J(t.status)
							}
							d = "http://e.yhd.com/front-pe/couriers/deliveryStaff!comment.do?soId=" + t.id;
							w = N + "_commentExpress_" + t.id;
							g.push("<p class='hd_order_status'><i>包裹" + (ab + 1) + "</i>" + k + "</p>");
							g.push("<div class='hd_pro_list'>");
							g.push("<div class='clearfix'>");
							for (var Z = 0; Z < t.items.length; Z++) {
								var ac = "http://item-home.yhd.com/item/snapshotShow.do?productId=" + t.items[Z].productId + "&soItemId=" + t.items[Z].soItemId + "&flag=1";
								var i = P(t.items[Z].productPicPath ? t.items[Z].productPicPath : e);
								var h = N + "_item_" + t.items[Z].productMerchantId;
								if (Z > 2) {
									break
								}
								g.push("<a href='" + ac + "' target='_blank' title='" + t.items[Z].productName + "' data-ref='" + h + "'><img src='" + R.util.hashImgUrl(i) + "' title='" + t.items[Z].productName + "'/></a>")
							}
							g.push("</div>");
							if (1 == t.hasCommentExpress) {
								g.push("<div class='hd_subbtn_wrap'>");
								g.push("<a class='hd_comment_express' href='" + d + "' target='_blank' data-ref='" + w + "'>评论快递小哥</a>");
								g.push("</div>")
							}
							g.push("</div>")
						}
						if (s == 1) {
							g.push("<div class='hd_btn_wrap'><a href='" + l + "' target='_blank' data-ref='" + r + "' class='hd_pay_btn'>立即支付</a></div>")
						} else {
							if (s == 3) {
								g.push("<div class='hd_btn_wrap hd_shop_order'>");
								g.push("<a href='" + u + "' target='_blank' data-ref='" + q + "' class='hd_comment_btn'>立即评论</a>");
								if (0 == Y.hasCommentGiftActivity) {
									if (1 == Y.commentActivityType) {
										g.push("<em class='hd_gift_icon'></em>")
									} else {
										if (2 == Y.commentActivityType) {
											g.push("<em class='hd_fanxian_icon'></em>")
										}
									}
								}
								g.push("</div>")
							}
						}
						g.push("</div>")
					}
				}
				g.push("<a class='hd_more_btn' href='" + f + "' target='_blank' data-ref='" + N + "_more'>查看更多</a>")
			} else {
				g.push("<div class='hd_none_tips'>");
				g.push("<span class='hd_none_icon'></span>");
				g.push("<p class='hd_none_text'>您还没有订单哦~</p>");
				g.push("</div>")
			}
			return g.join("")
		};
		var P = function(c) {
			if (c) {
				c = c.replace("_40x40.", "_60x60.")
			}
			return c
		};
		var J = function(d) {
			var c = "";
			if (d == 20) {
				c = "已出库"
			} else {
				if (d == 24) {
					c = "已收货"
				} else {
					if (d == 35) {
						c = "已完成"
					}
				}
			}
			return c
		};
		var A = function() {
			var c = b("a.hd_prism_tab", H);
			c.attr("href", "javascript:void(0);");
			c.removeAttr("target");
			c.click(function() {
				if (H.data("dataLoaded") == "1" && H.hasClass("hd_cur")) {
					K(H);
					return
				}
				if (!H.data("ordersNumLoaded")) {
					I()
				}
				var d = function(e) {
					if (e.result == 1) {
						if (H.data("dataLoaded") == "1") {
							D(H)
						} else {
							H.data("dataLoaded", "1");
							M.height("100");
							D(H);
							y();
							if (c.data("clicked") != 1) {
								gotracker("2", N);
								c.data("clicked", 1)
							}
						}
					} else {
						if (yhdPublicLogin) {
							yhdPublicLogin.showLoginDiv()
						}
					}
				};
				R.globalCheckLogin(d)
			});
			b(document.body).click(function(g) {
				var e = b(this);
				var d = g.target ? g.target : g.srcElement;
				if (d) {
					var f = b(d).parents("div.hd_prism_wrap").size();
					if (f == 0 && H.hasClass("hd_cur")) {
						H.removeClass("hd_cur")
					}
				}
			})
		};
		var D = function(c) {
			Q.find("div.hd_prism,div.hd_mini_cart").removeClass("hd_cur");
			c.addClass("hd_cur")
		};
		var K = function(c) {
			c.removeClass("hd_cur")
		};
		G.showNum = function() {
			B();
			A()
		};
		window.topOrderTimeoutHandler = setTimeout(function() {
			if (H.size() > 0) {
				G.showNum()
			}
		}, 3 * 1000)
	})
})(jQuery);
(function(a) {
	a(function() {
		var e = a.cookie("provinceId");
		var g = a.cookie("yihaodian_uid");
		var i = (typeof globalTopPrismFlag != "undefined" && globalTopPrismFlag == "0") ? 0 : 1;
		if (!g || !e || !i) {
			return
		}
		var j = window.loli || (window.loli = {});
		var f = 0;
		var d = [];
		var h = {};
		if (a("#glShouCangChild").size() == 0) {
			return
		}
		var b = typeof URLPrefix.my != "undefined" ? URLPrefix.my : "http://my.yhd.com";
		j.globalCheckLogin(c);

		function c(o) {
			if (!o || !o.result || o.result != 1) {
				return
			}
			var l = b + "/member/myNewFavorite/myUserFavoriteInfo.do?callback=?";
			var p = {
				favoriteType: 0
			};
			a.getJSON(l, p, function(s) {
				var q = s;
				if (q) {
					if (q.code == 0) {
						var r = q.resultList;
						m(r)
					} else {}
				}
			});

			function m(s) {
				if (!s || s.length < 1) {
					return
				}
				var q = [];
				for (var t = 0; t < s.length; t++) {
					var r = s[t];
					if (!r.price || !r.listPrice) {
						continue
					}
					q.push(r);
					h[r.pmInfoId] = r
				}
				k(q)
			}

			function k(u) {
				if (!u || u.length < 1) {
					return
				}
				var x = [];
				var s = -1;
				for (var r = 0; r < u.length; r++) {
					var q = u[r];
					if (r % 10 == 0) {
						s = s + 1;
						if (!x[s]) {
							x[s] = []
						}
						x[s].push(q.pmInfoId)
					} else {
						x[s].push(q.pmInfoId)
					}
				}
				f = x.length;
				for (var w = 0; w < f; w++) {
					n(x[w])
				}
				var v = setInterval(function() {
					if (f <= 0) {
						var y = d.length;
						clearInterval(v);
						var M = a("#glShouCangChild");
						var t = [];
						t.push('<em style="width: 86px;"></em>');
						t.push("<dl>");
						var I = [];
						var K = 0;
						for (var N = 0; N < y; N++) {
							var J = d[N];
							if (J == null || J.pmInfoId == null || J.productId == null || !J.isPromotion || !J.promotionInfo || J.promotionInfo.length < 1) {
								continue
							}
							K++;
							var E = J.promotionInfo[0];
							var F = h[J.pmInfoId];
							z = "pms_191_prism_fav_pro_p_" + F.pmInfoId;
							var C = "http://item.yhd.com/item/" + F.pmInfoId;
							var G = yhdToolKit.getProductPicByDefaultPic(F.productUrl, 60, 60);
							I.push("<dd>");
							I.push('<a class="hd_pro_img" data-tpc="21" href="' + C + '" data-ref="' + z + '" target="_blank"><img src="' + j.util.hashImgUrl(G) + '"></a>');
							I.push('<a class="hd_pro_name" data-tpc="22" href="' + C + '" data-ref="' + z + '" target="_blank">' + F.productName + "</a>");
							I.push('<p class="hd_pro_price">¥' + F.price + "</p>");
							if (E.type == 2 || E.type == 3) {
								var D = "http://list.yhd.com/p/c0-b-a-s1-v0-p1-price-d0-pid" + F.productId + "-pt" + E.promotionId + "-pl" + E.levelId + "-m0";
								var z = "pms_191_prism_fav_pro_l_" + E.promotionId;
								I.push('<p class="hd_sale_tips"><i></i><a data-tpc="23" href="' + D + '" data-ref="' + z + '" target="_blank">' + E.promDesc + "</a></p>")
							} else {
								I.push('<p class="hd_sale_tips"><i></i><a>' + E.promDesc + "</a></p>")
							}
							I.push("</dd>")
						}
						if (K > 0) {
							t.push("<dt>您收藏的商品中有<b>" + K + "</b>个商品正在促销</dt>")
						} else {
							return
						}
						t.push(I.join(" "));
						t.push("</dl>");
						var H = "http://my.yhd.com/member/myNewCollection/myFavorite.do?operType=0";
						var A = "http://my.yhd.com/member/myNewCollection/myFavorite.do?operType=1";
						t.push('<div class="hd_btn_wrap clearfix"><a data-tpc="24" href="' + H + '" data-ref="global_prism_fav_pro_more" target="_blank">我收藏的商品</a><a data-tpc="25" href="' + A + '"  data-ref="global_prism_fav_shop_more" target="_blank">我收藏的店铺</a></div>');
						M.html(t.join(" "));
						M.removeClass("hd_menu_list").addClass("hd_favorites");
						var B = a("#glShouCang").find(".hd_menu");
						var L = B.find("span");
						L.html(L.html().replace(/&nbsp;/g, ""));
						B.html(B.html() + '<u class="hd_fav_num">' + K + "</u>")
					}
				}, 1000)
			}

			function n(t) {
				var r = "";
				for (var q = 0; q < t.length; q++) {
					if (t[q] == "" || t[q] <= 0) {
						continue
					}
					r += "&pmInfoIds=" + t[q]
				}
				if (!r) {
					return
				}
				var v = URLPrefix.central + "/homepage/ajaxFindProductPromotions.do?callback=?";
				var s = {
					mcsiteId: 1,
					pmInfoIds: t.join(","),
					provinceId: e
				};
				var u = 0;
				jQuery.getJSON(v, s, function(w) {
					if (u == 1) {
						return
					}
					u = 1;
					f--;
					if (!w || w.status != 1) {
						return true
					}
					d = d.concat(w.result)
				});
				setTimeout(function() {
					if (u = 0) {
						u = 1;
						f--
					}
				}, 2000)
			}
		}
	})
})(jQuery);
(function(a) {
	a(function() {
		var b = window.loli || (window.loli = {});
		var u = b.app = b.app || {};
		var f = b.app.msg = b.app.msg || {};
		var n = a.cookie("provinceId");
		var e = a.cookie("yihaodian_uid");
		var o = (typeof o == "undefined") ? 1 : o;
		var k = 1;
		var w = a("#hdUserMsg");
		var l = w.size() > 0 ? w.attr("data-cfg") : 0;
		if (!e || !n || !l) {
			return
		}
		var q = function(y) {
			var x = new Date();
			x.setTime(y);
			var z = x.getMonth() + 1;
			var A = x.getDate();
			return z + "月" + A + "日"
		};
		var v = function(x) {
			if (x != null && x != "") {
				x = x.replace(/\&/g, "&amp;");
				x = x.replace(/\</g, "&lt;");
				x = x.replace(/\>/g, "&gt;");
				x = x.replace(/\\/g, "&#92;");
				x = x.replace(/\'/g, "&#039;");
				x = x.replace(/\"/g, "&#034;")
			}
			return x
		};
		var c = function(y) {
			var z = URLPrefix.central + "/homepage/ajaxFindUserMsgsNum.do?callback=?";
			var x = {
				userId: e,
				currSiteId: o,
				currSiteType: k,
				provinceId: n
			};
			a.getJSON(z, x, function(A) {
				if (A && A.status == 1) {
					y(A.value)
				} else {
					y(0)
				}
			})
		};
		var g = function(z) {
			var x = "http://webim.yhd.com/customer/offline.action";
			var y = function(B) {
				var C = 0;
				if (!isNaN(B)) {
					C = parseInt(B)
				}
				if (C > 0) {
					z(C)
				} else {
					z(0)
				}
			};
			var A = {
				userId: e,
				currSiteId: o,
				currSiteType: k,
				provinceId: n
			};
			a.ajax({
				url: x,
				data: A,
				dataType: "jsonp",
				jsonp: "jsonpCallback",
				success: function(B) {
					if (B) {
						y(B)
					} else {
						y(0)
					}
				}
			})
		};
		var r = function(y) {
			var z = URLPrefix.central + "/homepage/ajaxFindUserMsgs.do?callback=?";
			var x = {
				userId: e,
				currSiteId: o,
				currSiteType: k,
				provinceId: n
			};
			a.getJSON(z, x, function(A) {
				if (A && A.status == 1) {
					y(A.value)
				} else {
					y(null)
				}
			})
		};
		var j = function(z, x) {
			var y = URLPrefix.central + "/homepage/ajaxUpdateUserMsgsStatus.do?callback=?";
			var A = {
				userId: e,
				msgIds: z.join(","),
				currSiteId: o,
				currSiteType: k,
				provinceId: n
			};
			a.getJSON(y, A, function(B) {
				if (B && B.status == 1) {
					x(B.value)
				} else {
					x(null)
				}
			})
		};
		var m = function(D, x) {
			var z = "http://edm.yhd.com/pcMsg/myMessage.action";
			var B = "http://webim.yhd.com/global/frontCheckPoint.action";
			var E = [];
			if (D == 0 && (!x || x.length == 0)) {
				E.push("<div class='hd_none_notice'>");
				E.push("<span class='hd_none_pic'></span>");
				E.push("<p>无新消息</p>");
				E.push("</div>");
				return E.join("")
			}
			if (x && x.length > 0) {
				E.push("<p class='hd_ntc_top clearfix' data-tpc='1'>");
				E.push("<a class='fl' href='javascript:;'>全部标记为已读</a>");
				E.push("<a class='blue_link fr' href='" + z + "' target='_blank'>查看更多</a>");
				E.push("</p>")
			}
			E.push("<div class='hd_notice_detail'>");
			if (D > 0) {
				E.push("<div class='hd_service clearfix' data-tpc='2'>");
				E.push("<span class='fl'><i></i>客服消息</span>");
				E.push("<a class='fr hd_delete_notc' href='javascript:;'>×</a>");
				E.push("<a class='fr hd_notc_num' href='" + B + "' target='_blank'><u>" + D + "</u>条新消息</a>");
				E.push("</div>")
			}
			if (x && x.length > 0) {
				E.push("<div class='hd_notice_list' data-tpc='3'>");
				for (var y = 0; y < x.length; y++) {
					var C = x[y];
					var A = C.link ? C.link : "javascript:;";
					E.push("<dl data-msgId='" + C.msgId + "'>");
					E.push("<dt class='clearfix'>");
					E.push("<b class='fl'>" + C.title + "</b>");
					E.push("<a class='fr hd_delete_notc' href='javascript:;'>×</a>");
					E.push("<em class='fr'>" + q(C.createTime) + "</em>");
					E.push("</dt>");
					E.push("<dd>");
					E.push("<a class='hd_notice_txt' href='" + A + "'" + (C.link ? " target='_blank'>" : ">") + v(C.content) + "</a>");
					E.push("</dd>");
					E.push("</dl>")
				}
				E.push("</div>")
			}
			E.push("</div>");
			return E.join("")
		};
		var h = function() {
			var x = w.data("customerMsgsNum") != null ? w.data("customerMsgsNum") : 0;
			var z = w.data("userMsgsNum") != null ? w.data("userMsgsNum") : 0;
			var y = x + z;
			if (y > 0) {
				w.find("a.hd_notice_tit").html("<i></i>新消息(<span>" + (y >= 100 ? "99+" : y) + "</span>)");
				w.addClass("hd_has_notice")
			} else {
				w.find("a.hd_notice_tit").html("<i></i>新消息(<span>0</span>)");
				w.removeClass("hd_has_notice")
			}
		};
		var t = function() {
			var A = 0;
			var B = 0;
			var x = null;
			var y = function(C) {
				B = C;
				w.data("userMsgsNum", B);
				w.show();
				h();
				s()
			};
			var z = function(C) {
				if (x) {
					clearTimeout(x)
				}
				A = C;
				w.data("customerMsgsNum", A);
				c(y)
			};
			g(z);
			x = setTimeout(function() {
				w.data("customerMsgsNum", 0);
				c(y)
			}, 1500)
		};
		var d = function() {
			var x = w.data("customerMsgsNum") != null ? w.data("customerMsgsNum") : 0;
			var z = w.data("userMsgsNum") != null ? w.data("userMsgsNum") : 0;
			var y = function(A) {
				if (A && A.length > 0) {
					z = A.length
				} else {
					z = 0
				}
				w.data("userMsgsNum", z);
				h();
				var B = m(x, A);
				w.find("div.hd_notice").html(B);
				w.addClass("hd_notice_hover")
			};
			r(y)
		};
		var p = function() {
			var x = [];
			var y = w.find("div.hd_notice_list dl");
			y.each(function() {
				x.push(a(this).attr("data-msgId"))
			});
			j(x, function(A) {
				if (A) {
					var z = m(0, null);
					w.find("div.hd_notice").html(z);
					w.data("userMsgsNum", 0);
					w.data("customerMsgsNum", 0);
					w.find("a.hd_notice_tit").html("<i></i>新消息(<span>0</span>)");
					w.removeClass("hd_has_notice")
				}
			})
		};
		var i = function(y) {
			var z = [];
			z.push(y);
			var x = w.find("div.hd_notice_list dl[data-msgId='" + y + "']");
			j(z, function(A) {
				if (A) {
					d()
				}
			})
		};
		var s = function() {
			var x, y;
			w.mouseenter(function() {
				if (y) {
					clearTimeout(y)
				}
				x = setTimeout(function() {
					if (w.data("loaded")) {
						w.addClass("hd_notice_hover");
						return
					}
					w.data("loaded", 1);
					d()
				}, 200)
			});
			w.mouseleave(function() {
				if (x) {
					clearTimeout(x)
				}
				y = setTimeout(function() {
					w.removeClass("hd_notice_hover")
				}, 200)
			});
			w.delegate("p.hd_ntc_top a.fl", "click", function() {
				p()
			});
			w.delegate("div.hd_notice_list a.hd_delete_notc", "click", function() {
				var z = a(this).parents("dl").attr("data-msgId");
				i(z)
			});
			w.delegate("div.hd_service a.hd_delete_notc", "click", function() {
				w.data("customerMsgsNum", 0);
				d()
			});
			w.delegate(".hd_notice_list dl", "mouseenter", function() {
				a(this).addClass("hd_notc_cur")
			});
			w.delegate(".hd_notice_list dl", "mouseleave", function() {
				a(this).removeClass("hd_notc_cur")
			});
			w.delegate(".hd_notice_detail", "mousewheel", function(C, A) {
				var D = a(".hd_notice_detail", w).scrollTop();
				var B = a(".hd_notice_detail", w).outerHeight();
				var z = (a(".hd_service", w).outerHeight() ? a(".hd_service", w).outerHeight() : 0) + a(".hd_notice_list", w).outerHeight() - 1;
				if (B > z) {
					C.preventDefault()
				}
				if (D == z - B && (A < 0)) {
					C.preventDefault()
				}
			})
		};
		f.showMsgsNum = function() {
			if (w.size() > 0) {
				b.globalCheckLogin(function(x) {
					if (x && x.result == 1) {
						t()
					}
				})
			}
		};
		f.showMsgs = function() {
			if (w.size() > 0) {
				b.globalCheckLogin(function(x) {
					if (x && x.result == 1) {
						d()
					}
				})
			}
		};
		window.topMsgTimeoutHandler = setTimeout(function() {
			f.showMsgsNum()
		}, 1 * 1000)
	})
})(jQuery);
(function() {
	var i = [];
	var j = [];
	Array.prototype.Contains = function(a) {
		if (null == a) {
			return
		}
		for (var b = 0; b < this.length; b++) {
			if (this[b] == a) {
				return true
			}
		}
		return false
	};
	var l = function(b) {
		var c = b.attr("data-extTrackUrl");
		if (i.length && i.Contains(c)) {
			return
		}
		if (c) {
			var a = new Image(1, 1);
			a.src = c;
			b.attr("data-extTrackUrl", "")
		}
	};
	var k = function(b) {
		if (b.attr("data-extTrackUrl")) {
			l(b);
			return
		}
		var a = b.find("a[data-extTrackUrl],img[data-extTrackUrl]");
		a.each(function() {
			l(jQuery(this))
		})
	};
	var h = function() {
		var b = jQuery('[data-TrackType="initShow"]');
		var a = b.find("[data-extTrackUrl]");
		a.each(function() {
			l(jQuery(this))
		})
	};
	h();
	var g = {
		sendTrackByTrigger: k,
		sendTrack: l
	};
	window.extTracker = g;
	require(["common_impression"], function() {})
})();
(function(c) {
	Array.prototype.contains = function(a) {
		for (var b = 0; b < this.length; b++) {
			if (this[b] == c.trim(a)) {
				return true
			}
		}
		return false
	};
	var d = {
		getWhiteList: function() {
			var b;
			var f = c("#globalcookiewhitelist");
			if (!f || !f.val()) {
				return []
			}
			var a = f.val();
			b = a.split(",");
			return b
		},
		getGlobalCookie: function() {
			var a = document.cookie.split(";");
			return a
		},
		deleteCookie: function(b, a) {
			var f = new Date();
			f.setTime(f.getTime());
			document.cookie = b + "=" + a + ";expires=" + f.toGMTString() + ";domain=.yhd.com;path=/;"
		},
		handleBlackListCookie: function() {
			var j = this.getWhiteList();
			var a = this.getGlobalCookie();
			if (j.length == 0 || a.length == 0) {
				return
			}
			for (var h = 0; h < a.length; h++) {
				if (a[h] && a[h].split("=").length > 0) {
					var i = c.trim(a[h].split("=")[0]);
					var b = a[h].split("=")[1];
					if (!contains(j, i)) {
						this.deleteCookie(i, b)
					}
				}
			}
		}
	};
	c(document).ready(function() {
		var a = c("#globalcookiewhitelist");
		if (!a || !a.val()) {
			return
		}
		setTimeout(function() {
			d.handleBlackListCookie()
		}, 3000)
	})
})(jQuery);
(function() {
	$(function() {
		var f = 0;
		var e = function(b) {
			if (!jQuery.cookie("provinceId")) {
				return
			}
			var c = URLPrefix.busystock ? URLPrefix.busystock : "http://gps.yhd.com";
			var d = "?mcsite=" + currBsSiteId + "&provinceId=" + jQuery.cookie("provinceId");
			var j = $(b).find("[productid]");
			jQuery.each(j, function(i, m) {
				var n = $(m).attr("productid");
				if (n != null && n != "") {
					d += "&productIds=" + n
				}
			});
			var a = c + "/busystock/restful/truestock";
			jQuery.getJSON(a + d + "&callback=?", function(i) {
				if (i == null || i == "") {
					return
				}
				jQuery.each(i, function(o, q) {
					var p = $(b).find("[productid='" + q.productId + "']");
					if (p) {
						var r = "<strong class='jbp_product-price'>&yen;" + q.productPrice + "</strong>";
						r += "<del>&yen; " + q.marketPrice + "</del>";
						p.html(r).removeAttr("productid")
					}
				})
			})
		};
		var h = function() {
			var b = jQuery.cookie("provinceId");
			if (indexJbpPopFlag == 0 || !b) {
				return
			}
			var a = window.location.search;
			if (a && a.indexOf("tracker_u") != -1) {
				var c = URLPrefix.central + "/homepage/ajaxGetIndexJbpPop.do" + a;
				$.getJSON(c, function(d) {
					if (d && d.cmsPageUrl != "") {
						var j = d.cmsPageUrl;
						jQuery.ajax({
							url: j + "&provinceId=" + b,
							dataType: "jsonp",
							jsonp: "callback",
							jsonpCallback: "ajaxGetIndexJbpPopCallback",
							cache: true,
							success: function(l) {
								if (l && l.code == 0) {
									if (f == 1) {
										return
									}
									f = 1;
									var i = jQuery("body");
									if (l.html) {
										i.append(l.html);
										e("#jbpProductInfo");
										YHD.HomePage.ModuleTracker($("#jbpProductInfo"))
									}
									if (l.js) {
										i.append(l.js)
									}
								}
							}
						})
					}
				})
			}
		};
		var g = function() {
			var a = window.loli || (window.loli = {});
			var d = a.yhdStore;
			var m = jQuery.cookie("provinceId");
			var c = jQuery.cookie("yihaodian_uid");
			var l = d.get("yihaodian_uid");
			if (c) {
				if (!l) {
					d.set("yihaodian_uid", c)
				}
				return
			}
			if (indexFreshmanPopFlag == 0 || !m || l) {
				return
			}
			var b = jQuery.cookie("abtest");
			if (b >= indexFreshmanPopFlag) {
				return
			}
			var n = URLPrefix.central + "/homepage/ajaxGetIndexFreshmanPop.do";
			$.getJSON(n, function(i) {
				if (i && i.cmsPageUrl != "") {
					var j = i.cmsPageUrl;
					jQuery.ajax({
						url: j + "&provinceId=" + m,
						dataType: "jsonp",
						jsonp: "callback",
						jsonpCallback: "ajaxGetIndexFreshmanPopCallback",
						cache: true,
						success: function(k) {
							if (k && k.code == 0) {
								if (f == 1) {
									return
								}
								f = 1;
								var p = jQuery("body");
								if (k.html) {
									p.append(k.html);
									YHD.HomePage.ModuleTracker($("#YHD_HOME_NEWGIFT"))
								}
								if (k.js) {
									p.append(k.js)
								}
							}
						}
					})
				}
			})
		};
		h();
		setTimeout(g, 500)
	})
})();