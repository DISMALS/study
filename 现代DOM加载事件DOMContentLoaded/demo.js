//浏览器加载DOM的顺序：
/*
1、HTML解析完毕
2、外部脚本和样式加载完毕
3、脚本在文档内解析并执行
4、HTML DOM完全构造起来
5、图片和外部内容加载
6、网页完成加载

注：1-4步的加载是极快的，而第五步是根据网速和内容的多少各有快慢，总体上比1-4步加起来都要慢很多
*/

//1、在非IE下的现代加载事件：DOMContentLoaded事件，在浏览器执行完第四步HTML DOM结构完成之后，就会被触发，且不会理会图像、音乐、JS文件、CSS文件或其他资源是否已经下载完毕
//目前支持DOMContentLoaded事件的浏览器有：IE9+、Firefox、Chrome、Safari3.1+和Opera9+

/*
//传统的DOM加载事件
window.onload = function(){
	var box = document.getElementById("box");
	alert(box.innerHTML);
}
//PS:传统的DOM加载事件只有页面上的所有内容加载完毕，包括图像、音乐、JS文件、CSS文件或其他资源是否已经下载完毕之后，才会执行window.onload事件里的代码
//缺陷，如果有iframe标签，那么这种方法会等待iframe中的内容加载完毕后才能执行节点操作



//现代DOM加载事件
addEvent(document,'DOMContentLoaded',function(){
	var box = document.getElementById("box");
	alert(box.innerHTML);
});
//PS:IE6\7\8不支持



//IE6\7\8模拟DOMContentLoaded
document.write('<script id="ie_loaded" refer="refer"></script>');
var ie_loaded = document.getElementById("ie_loaded");
//判断是否完全加载完毕DOM
ie_loaded.onreadystatechange = function(){
	if(this.readyState == "complete"){
		var box = document.getElementById("box");
		alert(box.innerHTML);
	}
};
//有效，DOM加载完毕后执行了节点操作，并且后面才加载完毕图片


//doScroll,IE下使用的DOM加载事件
var timer = null;
timer = setInterval(function(){
	try{
		document.documentElement.doScroll("left");
		var box = document.getElementById("box");
		alert(box.innerHTML);
	}catch(e){}
});



//DOM加载事件关于IE和W3C的兼容方法
function addDomLoaded(fn){
	if(document.addEventListener){  //W3C
		addEvent(document,"DOMContentLoaded",function(){
			fn();
			//alert(arguments.callee); //获取的是DOMContentLoaded事件函数
			removeEvent(document,"DOMContentLoaded",arguments.callee); //运行完毕之后销毁事件，清理内存
		});
	}else{   //IE
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll("left");  //IE采用doScroll方法实现现代加载事件
				fn();
			}catch(e){
				
			}
		});
	}
}
addDomLoaded(function(){
	var box = document.getElementById("box");
	alert(box.innerHTML);
});






//非主流浏览器加载,Opera8之前，webkit引擎浏览器525之前不再支持，firfox2支持，但是有严重的bug
var isReady = false;
var timer = null;
function doReady(fn){
	if(timer) clearInterval(timer);
	if(isReady) return;
	isReady = true;
	fn();
}

function addDomLoaded(fn){
	//第一种方法，利用文档加载的就绪状态来进行判断
	//用于非主流浏览器向下兼容
	timer = setInterval(function(){  //在图片加载完之后执行
		if(/loaded|complete/.test(document.readyState)){ //loadede是部分加载，有可能只是DOM加载完毕，complete是完全加载类似于window.onload
			doReady(fn);
		}
	},1);
	
	//第二种方法，判断document、document.getElementById、document.getElementsTagName、document.body是否同时存在
	timer = setInterval(function(){ //在图片加载之前就执行
		if(document && document.getElementById && document.getElementsByTagName && document.body){
			doReady(fn);
		}
	},1);
}
addDomLoaded(function(){
	var box = document.getElementById("box");
	alert(box.innerHTML);
});

*/

//综合跨浏览器，现代DOM加载事件处理
function addDomLoaded(fn){
	var isReady = false;
	var timer = null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady) return;
		isReady = true;
		fn();
	}
	//首先判断非主流浏览器
	if((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)){
		timer = setInterval(function(){ //在图片加载之前就执行
			if(document && document.getElementById && document.getElementsByTagName && document.body){
				doReady();
			}
		},1);
	}
	//然后是判断W3C标准以及IE9以上的DOM加载事件
	else if(document.addEventListener){ 
		addEvent(document,"DOMContentLoaded",function(){  //添加事件方式添加现代加载事件
			doReady();
			removeEvent(document,"DOMContentLoaded",arguments.callee);
		});
	}
	//IE6、7、8下的DOM加载事件
	else if(sys.ie && sys.ie < 9){  
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll("left");//IE采用doScroll方法实现现代加载事件
				doReady();
			}catch(e){

			}
		});
	}
}
addDomLoaded(function(){
	var box = document.getElementById("box");
	alert(box.innerHTML);
});












































































