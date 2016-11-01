/* window.onload = function(){
	//var box = document.getElementById('box');
	//var wi = document.documentElement.innerWidth || document.body.clientWidth;
	//var hei = document.documentElement.innerHeight || document.body.clientHeight;
	//var s_w = window.screen.availWidth;
	//var s_h = window.screen.availHeight;
	//box.innerHTML = '浏览器的宽为：' + wi +'<br/>'+ '浏览器的高为：'  + hei;
	//alert('屏幕宽度为：' + s_w +'&nbsp'+ '屏幕的高度为：' + s_h);
	//alert(window.location.href);
	//alert(screen.logicalYDPI);
	//window.status="Some text in the status bar!!"
	//prompt("Please enter your name","")

	
	function addEvent(obj,type,fn){
		var saved = null;
		if(typeof obj['on' + type] == 'function'){
			saved = obj['on' + type];
		};
		obj['on' + type] = function(){
			if(saved) saved();
			fn();
		};
		
	}
	addEvent(window,'load',function(){
		alert('wang');
	});
	} 
//添加事件函数




function addEvent(obj,type,fn){
	var saved = null;      //用于保存上一个事件
	//判断saved事件是否存在
	if(typeof obj['on' + type] == 'function'){
		saved = obj['on' + type];    //保存上一个事件
	}
	//执行事件
	obj['on' + type] = function(){
		if(saved) saved();   //如果上一个事件存在，则执行上一个事件
		fn.call(this);     //把this传递过去
	};
}
addEvent(window,'load',function(){
	var box = document.getElementById('box');
	addEvent(box,'click',function(){
		alert('wang!');
	});    //在添加一个函数
	addEvent(box,'click',toBlue);
});
function toRed(){
	this.className = 'red';
	//removeEvent(this,'click');//清楚点击事件，解决卡死问题，同时这是一种一刀切的做法，会影响其他事件的正常运行
	addEvent(this,'click',toBlue);
}
function toBlue(){
	this.className = 'blue';
	//removeEvent(this,'click');//清楚点击事件，解决卡死问题，同时这是一种一刀切的做法，会影响其他事件的正常运行
	addEvent(this,'click',toRed);
}

function removeEvent(obj,type){
if(obj['on' + type]) obj['on' + type] = null;
}

//添加事件函数及事件切换











window.addEventListener('load',init,false);

window.addEventListener('load',init,false);

window.addEventListener('load',init,false);

function init(){
	alert('wang!');
}


function addEvent(obj,type,fn){
	var saved = null;      //用于保存上一个事件
	//判断saved事件是否存在
	if(typeof obj['on' + type] == 'function'){
		saved = obj['on' + type];    //保存上一个事件
	}
	//执行事件
	obj['on' + type] = function(){
		if(saved) saved();   //如果上一个事件存在，则执行上一个事件
		fn.call(this);     //把this传递过去
	};
}
addEvent(window,'load',function(){
	var box = document.getElementById('box');
	addEvent(box,'click',function(){
		alert('wang!');
	});    //在添加一个函数
	addEvent(box,'click',toBlue);
});
function toRed(){
	this.className = 'red';
	//removeEvent(this,'click');//清楚点击事件，解决卡死问题，同时这是一种一刀切的做法，会影响其他事件的正常运行
	addEvent(this,'click',toBlue);
}
function toBlue(){
	this.className = 'blue';
	//removeEvent(this,'click');//清楚点击事件，解决卡死问题，同时这是一种一刀切的做法，会影响其他事件的正常运行
	addEvent(this,'click',toRed);
}

function removeEvent(obj,type){
if(obj['on' + type]) obj['on' + type] = null;
}

	*/


//var thisIsDay = new Date();
//var thisYear = thisIsDay.getYear()+1900;
//alert(thisYear);


var thisIsToday = new Date();

var toDay = new Date();  // 获取今天的日期。

// 提取年、月、日信息。
var thisYear = toDay.getYear() + 1900;
var thisMonth =toDay.getMonth();
var thisDay = (thisMonth  + 1) + " " + toDay.getDate() + "," + (parseInt(toDay.getYear()) + 1900);
//alert(thisDay);
// 确定从开始以来的天数 #。
thisDay = Math.round(Date.parse(thisDay)/8.64e7);

// 对今年的第一天采取同样的操作。
var firstDay = "Jan 1, " + thisYear;
firstDay = Math.floor(Date.parse(firstDay)/8.64e7); 

// 对今年的最后一天在此采取同样的操作，以防止闰年。
var lastDay = "Dec 31, " + thisYear;
lastDay = Math.floor(Date.parse(lastDay)/8.64e7);

// 计算这一年的天数。
var daysInYear = (lastDay - firstDay) + 1;

// 确定已过去多少天，还剩下多少天。
var daysElapsed = thisDay - firstDay;
var daysLeft = daysInYear - daysElapsed; 

// 对普遍情况建立评论。
var comment1 = "今年已过去 " + daysElapsed+ " 天。";
var comment2 = "这意味着在 " + "thisYear" + " 还有 " + daysLeft + " 天。";

// 包含特殊情况：一年的开始&结束，以及只剩一天。
if (daysElapsed == 0)  {
comment1 = "今天是 " + thisYear + " 的 1 月 1 日。";
}
if (daysElapsed == 1) {
comment1 = "只过去了一天。";
}
if(daysElapsed == daysInYear) {
comment1 = thisYear + " 快要结束了。";
}

if (daysLeft == 0)  {
comment2 = "新年最诚挚的祝福！";
}
if (daysLeft == 1)  {
comment2 = thisYear + "只剩下一天了。";
}
if (daysLeft == daysInYear)  {
comment2 = "新年快乐！";
}









































































