/*插件库*/



//在外部返回Base对象，解决了调用间的不独立性
var $ = function(args){
	return new Base(args);
};

//JavaScript封装库之连缀

function Base(args){  //核心类
	//创建一个数组，保存从页面上获取到的节点或者节点数组
	this.elements = [];
	if(typeof args == "string"){
		//css模拟类似于$("#box p .a")
		if(args.indexOf(" ") != -1){
			var elements = args.split(" ");  //把节点拆开分别保存到数组里
			var childElements = [];   //存放临时节点对象的数组，解决覆盖的问题
			var node = [];   //用来存放父节点用的
			for(var i = 0; i < elements.length; i++){
				if(node.length == 0) node.push(document); //如果默认没有父节点，就把document放入
				switch(elements[i].charAt(0)){
					case "#":
						childElements = [];  //清理掉临时节点，以便父节点失效，子节点失效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;  //保存父节点，因为childElements要清理所以要创建node数组
						break;
					case ".":
						childElements = [];
						for(var j = 0; j < node.length; j++){
							var temps = this.getClass(elements[i].substring(1),node[j]);
							for(var k = 0; k < temps.length; k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for(var j = 0; j < node.length; j++){
							var temps = this.getTagName(elements[i],node[j]);
							for(var k = 0; k < temps.length; k++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		}else{
			//find模拟类似于$("#box")
			switch(args.charAt(0)){
				case "#":
					this.elements.push(this.getId(args.substring(1)));
					break;
				case ".":
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == "object"){
		if(args != undefined){  //_this是一个对象，区别于typeof 的返回值'undefied'
			this.elements[0] = args;
		}
	}else if(typeof args == "function"){ //如果传入的是一个function，则执行这个
		this.ready(args);
	}
	
	
};

//执行addDomLoaded方法
Base.prototype.ready = function(fn){
	addDomLoaded(fn);
}


//获取ID节点
Base.prototype.getId = function(id){
	//this.elements.push(document.getElementById(id));
	return document.getElementById(id);
};

//获取元素名
Base.prototype.getName = function(name){
	var names = document.getElementsByName(name);
	for(var i = 0;i < names.length; i++){
		this.elements.push(names[i]);
	}
	return this;  //返回Base对象本身 ，以便实现连缀
};

//获取元素节点数组
Base.prototype.getTagName = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){  //如果parentNode不为空，那么就是传递了父节点的值
		node = parentNode;
	}else{
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i = 0 ; i< tags.length; i++){
		temps.push(tags[i]);
	}
	return temps;
};

//添加功能，利用Base对象的原型对象prototype添加功能

//获取CLASS节点数组,并将类名相同的标签添加到elements数组中
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){  //如果parentNode不为空，那么就是传递了父节点的值
		node = parentNode;
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++){
		if((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all[i].className)){ //从多个class中选择一个或多个
			temps.push(all[i]);
		}
	}
	return temps;
};

//添加Class
Base.prototype.addClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(!hasClass(this.elements[i],className)){  //利用正则的match查找匹配重复的class，进行class添加
			this.elements[i].className += '' + className;
		}
	}
	return this;
};

//删除class
Base.prototype.removeClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(hasClass(this.elements[i],className)){  
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),'');
		}
	}
	return this;
};

//设置CSS选择器子节点(层次结构)
Base.prototype.find = function(str){
	var childElements = [];
	for(var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			case "#":
				//childElements.push(document.getElementById(str.substring(1)));
				chidElements.push(this.getId(str.substring(1)));
				break;
			case ".":
				var temps = this.getClass(str.substring(1),this.elements[i]);
				for(var j = 0; j < tags.length; j ++){
					childElements.push(temps[j]);
				}
				break;
			default:
				var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0; j < temps.length; j++){
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
};

//获取某一个节点,并返回这个节点对象
Base.prototype.ge = function(num){
	return this.elements[num];
};

//获取某组节点的数量
Base.prototype.length = function(){
	return this.elements.length;
}

//获取某一个节点的属性
Base.prototype.attr = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length == 2){
			this.elements[i].setAttribute(attr,value);
		}
	}
	return this;
};

//获取某一个节点再节点数组中的索引值
Base.prototype.index = function(){
	var children = this.elements[0].parentNode.children;
	for(var i = 0; i < children.length; i++){
		if(this.elements[0] == children[i]) return i;
	}
}

//设置某个节点的透明度
Base.prototype.opacity = function(num){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.opacity = num/100;
		this.elements[i].style.filter = "alpha(opacity = " + num + ")";
	}
	return this; 
}

//获取第一个节点对象
Base.prototype.first = function(){
	return this.elements[0];
}

//获取最后一个节点，并返回这个节点对象
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}

//获取某一个节点，并返回Base对象
Base.prototype.eq = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//获取当前节点的下一个同级元素节点
Base.prototype.next = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i] == null) throw new Error('找不到下一个同级元素节点！');//当是最后一个节点的时候，则让其抛出错误
		if(this.elements[i].nodeType == 3) this.next(); //如果等于3则是空白节点，那么在让这个函数在执行一遍
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//获取当前节点的上一个同级元素节点
Base.prototype.prev = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i] == null) throw new Error('找不到上一个同级元素节点'); //当是最后一个节点的时候，则让其抛出错误
		if(this.elements[i].nodeType == 3)this.prev();//如果等于3则是空白节点，那么在让这个函数在执行一遍
	}
	return this; //返回Base对象本身 ，以便实现连缀
};


//设置CSS样式和获取CSS样式
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		//alert(arguments.length);
		if(arguments.length == 1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//设置表单字段元素
Base.prototype.form = function(name){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i] = this.elements[i][name];
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}

//设置或获取value值
Base.prototype.value = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].value;  //获取value值
		}
		this.elements[i].value = str;  //设置value值
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//设置或获取innerHTML，文本内容包含标签元素
Base.prototype.html = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;  //获取innerHTML值
		}
		this.elements[i].innerHTML = str;  //设置innerHTML值
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//设置或获取innerText，文本内容不包含标签元素
Base.prototype.text = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return getInnerText(this.elements[i]);  //获取文本值
		}
		setInnerText(this.elements[i],str);  //设置文本值
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//触发点击事件
Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};


//添加link或者style的CSS样式
Base.prototype.addCSS = function(num,selectorText,cssText,position){
	var sheets = document.styleSheets[num];
	insertRule(sheets,selectorText,cssText,position);
	return this;   //返回Base对象本身 ，以便实现连缀
};


//删除link或者style的CSS规则
Base.prototype.removeCSS = function(num,index){
	var sheets = document.styleSheets[num];
	deleteRule(sheets,index);
	return this;   //返回Base对象本身 ，以便实现连缀
};

//设置事件发生器
Base.prototype.bind = function(event,fn){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
}

//添加鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i = 0; i < this.elements.length; i++){
		//this.elements[i].onmouseover = over;
		//this.elements[i].onmouseout = out;
		addEvent(this.elements[i],"mouseover",over);
		addEvent(this.elements[i],"mouseout",out);
	}
	return this;
};


//设置点击切换方法
Base.prototype.toggle = function(){
	for(var i = 0; i < this.elements.length; i++){
		//利用闭包使计数器独立，解决计数器共享出现的切换问题
		(function(element,args){
			var count = 0;  //计数器初始化
			addEvent(element,'click',function(){
				args[count++ % args.length].call(this);  //利用算法来切换运行函数
			});
		})(this.elements[i],arguments)
	}
	return this;
};


//添加显示函数
Base.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
	return this;
};

//添加隐藏函数
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
	return this;
};

//弹出层居中
Base.prototype.center = function(width,height){
	var left = (getInner().width - width)/2 + getScroll().left;
	var top = (getInner().height - height)/2 + getScroll().top;
	for(var i = 0 ; i < this.elements.length; i++){
		this.elements[i].style.left = left + "px";
		this.elements[i].style.top = top + "px";
	}
	return this;
};

//动态获取浏览器窗口大小
Base.prototype.resize = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		addEvent(window,"resize",function(){
			fn();  //首先执行resize传过来的函数
			if(element.offsetLeft > (getInner().width + getScroll().left) - element.offsetWidth){  // 当浏览器窗口大小改变时重新计算被点击div距离左边的left值
				element.style.left = (getInner().width + getScroll().left) - element.offsetWidth + "px";
				if(element.offsetLeft <= 0 + getScroll().left){
					element.style.left = 0 + getScroll().left + "px";
				}
			}
			if(element.offsetTop > (getInner().height + getScroll().top) - element.offsetHeight){   // 当浏览器窗口大小改变时重新计算被点击div距离上边的top值
				element.style.top = (getInner().height + getScroll().top) - element.offsetHeight + "px";
				if(element.offsetTop <= 0 + getScroll().top){
					element.style.top = 0 + getScroll().top + "px";
				}
			}
		});
	}
	
	
	return this;
};

//遮罩锁屏
Base.prototype.lock = function(){
	for(var i = 0;i < this.elements.length; i++){
		fixedScroll.top = getScroll().top;
		fixedScroll.left = getScroll().left;
		this.elements[i].style.width = getInner().width + getScroll().left + "px";
		this.elements[i].style.height = getInner().height + getScroll().top + "px";
		this.elements[i].style.display = "block";
		parseFloat(sys.firefox) < 4  ? document.body.style.overflow = "hidden": document.documentElement.style.overflow = "hidden";
		
		//弹窗时防止上下拖出可是范围
		addEvent(this.elements[i],"mousedown",predef);
		addEvent(this.elements[i],"mouseup",predef);
		addEvent(this.elements[i],"selectstart",predef);
		
		addEvent(window,"scroll",fixedScroll);
	}
	return this;
};

//解锁遮罩
Base.prototype.unlock = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
		parseFloat(sys.firefox) < 4  ? document.body.style.overflow = "auto": document.documentElement.style.overflow = "auto";
		
		//弹窗时防止上下拖出可视范围
		removeEvent(this.elements[i],"mousedown",predef);
		removeEvent(this.elements[i],"mouseup",predef);
		removeEvent(this.elements[i],"selectstart",predef);
		
		removeEvent(window,"scroll",fixedScroll);
	}
	return this;
};

//设置动画以及透明度渐变
Base.prototype.animate = function(obj){
	for(var i = 0; i < this.elements.length; i++){
		var element = this.elements[i];
		
		//2、使用X和Y表示横纵坐标更清晰
		var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 					//可选，x和y两种值，默认是x
				   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' :        //宽度和高度的变化 
				   obj['attr'] == 'o' ? 'opacity' : 'left';
		var start = obj['start'] != undefined ? obj['start'] : 
					attr == 'opacity' ? parseFloat(getStyle(element,attr))*100 :   //parseInt()取整数，parseFloat()取小数
										parseInt(getStyle(element,attr));      //可选，默认是css样式中的起始值
		var t = obj['t'] != undefined ? obj['t'] : 50;        							//可选，默认是50毫秒执行一次
		var step = obj['step'] != undefined ? obj['step'] : 10;							//可选，每次运行10像素
		
		//获取增量和目标量
		var alter = obj['alter'];
		var target = obj['target'];
		
		
		//3、动画缓冲运动
		var speed = obj['spped'] != undefined ? obj['speed'] : 6;						//可选，缓冲速度默认是6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer'; //可选，0表示匀速运动，1表示缓冲运动，默认是缓冲运动
		
		//4、增量和目标量两种定义方案的切换
		if(alter != undefined && target == undefined){
			target= alter + start;
		}else if(alter == undefined && target == undefined){
			throw new Error("必须书写alter增量或者target目标量！");
		}
		
		if(start > target) step = -step;
		
		
		if(attr == 'opacity'){
			//透明度渐变
			element.style.opacity = start /100;
			element.style.filter = 'alpha(opacity = ' + start + ')';
		}else{
			//正常动画
			//IE下这个有问题
			//element.style[attr] = start + 'px';    //初始化起始位置，解决到达目标点后无法回到起始位置，再次运行动画问题
		}

		clearInterval(element.timerss);         //运行前请除超时调用
		
		//超时运行动画
		element.timerss = setInterval(function(){
			//缓冲动画判断
			if(type == 'buffer'){
				step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr))*100) / speed : 
										   (target - parseInt(getStyle(element,attr))) / speed ;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
			}
			//运行动画
			//1、解决位移不均匀导致的跳跃问题
			/*
				 判断此时的getStyle(element,attr)属性值减去target目标值的绝对值是否小于step位移值
				 如果小于则属性值等于目标值
				 
			*/
			//透明度渐变
			if(attr == 'opacity'){
				var temp = parseFloat(getStyle(element,attr))*100;
				if(step == 0){
					setOpacity();
				}else if(step > 0 && Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= step){  //解决到达目标点后无法停止的问题,以及step为正值时的突兀
					setOpacity();
				}else if(step < 0 && (parseFloat(getStyle(element,attr))*100 - target) <= Math.abs(step)){  //反方向下动画到达目标点无法停止的问题，以及step为负值时的突兀
					setOpacity();
				}else{
					element.style.opacity = parseInt(temp + step)/100;
					element.style.filter = 'alpha(opacity='+ parseInt(temp + step) + ')';  
				}
			}else{ //正常动画
				if(step == 0){
					setTarget();
				}else if(step > 0 && Math.abs(parseInt(getStyle(element,attr)) - target) <= step){  //解决到达目标点后无法停止的问题,以及step为正值时的突兀
					setTarget();
				}else if(step < 0 && (parseInt(getStyle(element,attr)) - target) <= Math.abs(step)){  //反方向下动画到达目标点无法停止的问题，以及step为负值时的突兀
					setTarget();
				}else{
					//放在else里永远不会和停止运动同时执行，就不会出现由于移动位置和目标点位置无法整除的情况
					//但是会出现不同时到达目标点，导致的突兀
					element.style[attr] = parseInt(getStyle(element,attr)) + step + 'px';  
				}
			}
		},t);
		function setTarget(){
			element.style[attr] = target + 'px';//到达目标点位置 
			clearInterval(element.timerss); //动画停止运行
			if(obj.fn != undefined) obj.fn(); //实现动画列队
		}
		function setOpacity(){
			element.style.opacity = parseInt(target)/100;
			element.style.filter = 'alpha(opacity='+ parseInt(target) +')';
			clearInterval(element.timerss);
			if(obj.fn != undefined) obj.fn();//实现动画列队
		}
	}
	return this;
};



//插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};




















