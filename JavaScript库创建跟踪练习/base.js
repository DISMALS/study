﻿
/*
函数式,获取网页元素
function getId(id){
	return document.getElementById(id);
}
*/

/*
对象式获取页面元素
var base = {
	getId:function(id){
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElementsByName(name);
	},
	getTagName:function(tag){
		return document.getElementsByTagName(tag);
	}
}
*/	


//在外部返回Base对象，解决了调用间的不独立性
var $ = function(_this){
	return new Base(_this);
};

//JavaScript封装库之连缀

function Base(_this){  //核心类
	//创建一个数组，保存从页面上获取到的节点或者节点数组
	this.elements = [];
	if(_this != undefined){  //_this是一个对象，区别于typeof 的返回值'undefied'
		this.elements[0] = _this;
	}
	
}

//获取单一节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;  //返回Base对象本身 ，以便实现连缀
};

//获取元素名
Base.prototype.getName = function(name){
	var names = document.getElementsByName(name);
	for(var i = 0;i < names.length; i++){
		this.elements.push(names[i]);
	}
	return this;  //返回Base对象本身 ，以便实现连缀
};

//获取元素节点列表
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);
	for(var i = 0 ; i< tags.length; i++){
		this.elements.push(tags[i]);
	}
	return this;   //返回Base对象本身 ，以便实现连缀
};

//添加功能，利用Base对象的原型对象prototype添加功能

//获取CLASS节点数组,并将类名相同的标签添加到elements数组中
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){  //设置指定区域下的同类名属性值
		node = document.getElementById(idName);
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}

//添加Class
Base.prototype.addClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){  //利用正则的match查找匹配重复的class，进行class添加
			this.elements[i].className += '' + className;
		}
	}
	return this;
}

//删除class
Base.prototype.removeClass = function(className){
	for(var i = 0; i < this.elements.length; i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){  
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),'');
		}
	}
	return this;
}


//获取某一个节点
Base.prototype.getElement = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

//设置CSS样式和获取CSS样式
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		//alert(arguments.length);
		if(arguments.length == 1){
			if(typeof window.getComputedStyle != 'undefined'){  //W3C下获取外部样式表以及内联样式的样式属性
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currenStyle != 'undefined'){  //IE下获取外部样式表以及内联样式的样式属性
				return this.elements[i].currentStyle[sttr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}


//设置innerHTML
Base.prototype.html = function(str){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].innerHTML = str;
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}

//触发点击事件
Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}


//添加link或者style的CSS样式
Base.prototype.addCSS = function(num,selectorText,cssText,position){
	var sheets = document.styleSheets[num];
	if(typeof sheets.insertRule != 'undefined'){  //w3c
		sheets.insertRule(selectorText + "{" + cssText + "}",position);
	}else if(typeof sheets.addRule != 'undefined'){  //IE
		sheets.addRule(selectorText,"{" + cssText + "}",position);
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}


//删除link或者style的CSS规则
Base.prototype.removeCSS = function(num,index){
	var sheets = document.styleSheets[num];
	if(typeof sheets.deleteRule != 'undefined'){  //w3c
		sheets.deleteRule(index);
	}else if(typeof sheets.removeRule != 'undefined'){  //IE
		sheets.removeRule(index);
	}
	return this;   //返回Base对象本身 ，以便实现连缀
}


//添加鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
}

//添加显示函数
Base.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
	return this;
}

//添加隐藏函数
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
	return this;
}






















