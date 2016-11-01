/*基础函数库*/


//浏览器检查
(function(){
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var attr;
	(attr = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = attr[1]: //火狐浏览器
	(attr = ua.match(/msie ([\d.]+)/)) ? sys.msie = attr[1]: //IE浏览器
	(attr = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = attr[1]: //谷歌浏览器
	(attr = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = attr[1]: //opera浏览器
	(attr = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = attr[1]:"无法检测该浏览器版本！";  //苹果浏览器
	if(/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1]; //判断是webkit内核浏览器
})()


//综合跨浏览器，现代DOM加载事件
function addDomLoaded(fn){
	var isReady = false;
	var timer = null;
	function doReady(fn){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}
	//首先判断非主流浏览器
	if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
		timer = setInterval(function(){ //在图片加载之前就执行
			if(document && document.getElementById && document.getElementsByTagName && document.body){
				doReady(fn);
			}
		},1);
	}
	//然后是判断W3C标准以及IE9以上的DOM加载事件
	else if(document.addEventListener){ 
		addEvent(document,"DOMContentLoaded",function(){  //添加事件方式添加现代加载事件
			fn();
			removeEvent(document,"DOMContentLoaded",arguments.callee);
		});
	}
	//IE6、7、8下的DOM加载事件
	else if(sys.ie && sys.ie < 9){  
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll("left");//IE采用doScroll方法实现现代加载事件
				fn();
			}catch(e){

			}
		});
	}
}





/*
传统事件绑定
由于IE下的事件绑定存在三个问题：
1、无法删除事件
2、无法顺序执行
3、IE的现代事件绑定存在内存泄漏问题
4、同时绑定多个事件
*/
//由于以上问题，所以IE下需要使用传统的事件绑定机制
//跨浏览器添加事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != "undefined"){  //W3C
		obj.addEventListener(type,fn,false);
	}else{     //IE
		//创建一个存放事件的哈希表（散列表）
		if(!obj.events) obj.events = {};
		
		//第一次执行事件的时候执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if(obj["on" + type]) obj.events[type][0] = fn;
		}else{
			//同一个注册函数进行屏蔽，不添加到计数器里;   解决相同函数的重复问题
			if(addEvent.equal(obj.events[type],fn)) return false;
		}
		
		//第二次使用事件计算器来存储
		obj.events[type][addEvent.ID++] = fn;
		
		//执行事件处理函数
		obj["on" + type] = addEvent.exec;
	}
}
//为每个事件分配一个计算器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function(event){   //解决IE下this和event的使用问题
	var e = event || addEvent.fixEvent(window.event);  //此处调用配对后的IE中的event事件
	var es = this.events[e.type]
	for(var i in es){
		es[i].call(this,e);
	}
}

//屏蔽同一事件处理函数
addEvent.equal = function(es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){ 
	event.preventDefault = addEvent.fixEvent.preventDefault;   //阻止默认行为，W3C下用的是preventDefault()阻止默认行为，在IE下用的是returnValue = false;阻止默认行为
	event.stopPropagation = addEvent.fixEvent.stopPropagation;   //阻止冒泡，W3C下用的是stopPropagation()阻止冒泡，在IE下用的是cancelBubble = true;阻止冒泡
	event.target = event.srcElement;  //获取事件对象
	return event;
}


//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != "undefined"){
		obj.removeEventListener(type,fn,false);
	}else{
		if(obj.events){  //解决IE下不能选中文本框内容
			for(var i in obj.events[type]){
				if(obj.events[type][i] == fn){
					delete obj.events[type][i];
				}
			}
		}
	}
}


//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}

//IE阻止冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}


//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth != "undefined"){  // W3C以及IE9以上
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{  //IE8以下
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取滚动条位置
function getScroll(){
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}

//跨浏览器获取Style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle != 'undefined'){  //W3C下获取外部样式表以及内联样式的样式属性
		value = window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currenStyle != 'undefined'){  //IE下获取外部样式表以及内联样式的样式属性
		value = element.currentStyle[attr];
	}
	return value;
}


//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}


//跨浏览器添加link规则
function insertRule(sheets,selectorText,cssText,position){
	if(typeof sheets.insertRule != 'undefined'){  //w3c
		sheets.insertRule(selectorText + "{" + cssText + "}",position);
	}else if(typeof sheets.addRule != 'undefined'){  //IE
		sheets.addRule(selectorText,cssText,position);
	}
}

//跨浏览器删除link规则
function deleteRule(sheets,index){
	if(typeof sheets.deleteRule != 'undefined'){  //w3c
		sheets.deleteRule(index);
	}else if(typeof sheets.removeRule != 'undefined'){  //IE
		sheets.removeRule(index);
	}
}

//跨浏览器获取innerText 或者 textContent
function getInnerText(element){
	return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}

//跨浏览器设置innerText或者textContent
function setInnerText(element,text){
	if(typeof element.textContent == "string"){
		element.textContext = text;
	}else{
		element.innerText = text;
	}
}

//

//获取Event对象
function getEvent(event){
	return event || window.event;
}


//阻止默认事件
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != "undefined"){
		e.preventDefault;
	}else{
		e.returnValue = false;
	}
}

//获取某一个元素到最外层顶点的位置
function offsetTop(element){
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}


//删除左后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//某一个值存在于某一个数组中
function inArray(array,value){
	for(var i in array){
		if(array[i] === value) return true;
	}
	return false;
}

//获取某一个节点的上一个节点的索引值
function prevIndex(current,parent){  //当前节点索引值 ，父节点
	var length = parent.children.length;
	if(current == 0) return length - 1;
	return parseInt(current) - 1;
}  


//获取某一个节点的下一个节点的索引值
function nextIndex(current,parent){ //当前节点索引值，父节点
	var length = parent.children.length;
	if(current == length - 1) return 0;
	return parseInt(current) + 1;
}


//固定滚动条
function fixedScroll(){
	setTimeout(function(){
		window.srcollTo(fixedScroll.top,fixedScroll.left);
	},100);
	
}


//阻止默认行为
function predef(e){
	e.preventDefault();
}


//名值对转换为字符串
function params(data){
	var arr =[];
	for(var i in data){   //遍历data
		//alert(i);  //返回的是data属性名
		//alert(data[i]);  //返回的是data属性名对应的值
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));  //组合名和值，并且添加到arr数组中
	}
	return arr.join('&');  //返回转换为字符串的名值对
}


//兼容浏览器创建XMLHttpRequest对象
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){  //IE7+、以及火狐、谷歌、苹果、Opera
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){   //IE6以下的创建XHR对象
		var version = [   //IE6以下创建XHR对象的三种情况
			"MSXML2.XMLHttp.6.0",
			"MSXML2.XMLHttp.3.0",
			"MSXML2.XMLHttp"
		];
		for(var i = 0; i < version.length; i++){
			try{
				return new ActiveXObject(version[i]);
			}catch(e){
				//跳出本次循环，进行下一循环
			}
		}
	}else{   //如果以上均不支持，则抛出一个错误
		throw new Error("您的系统或者浏览器不支持Ajax!!");
	}
}







































