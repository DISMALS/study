/*
函数式获取页面元素
window.onload = function(){
	alert(getId('box').innerHTML);
}




//将e转化为相对定位的元素，使之左右“震动”
//第一个参数可以是元素对象或者元素的ID
//如果第二个参数是函数，以e为参数，它将在动画结束时调用
//第三个参数指定e震动的距离，默认是5像素
//第四个参数指定震动多久，默认是500毫秒
function shake(e,fn,distance,time){
	//句柄参数
	if(typeof e === "string") e = document.getElementById(e);
	if(!distance) distance = 5;
	if(!time) time = 500;
	
	var originaStyle = e.style.cssText;   //保存e的原始style
	e.style.position = "relative";      //使e相对定位
	var start = (new Date()).getTime();    //注意，动画的开始时间
	animation();      //动画开始
	
	
	//动画函数
	function animation(){
		var now = (new Date()).getTime();   //得到当前的时间
		var elapsed = now - start;         //从开始以来消耗了多长时间
		var fraction = elapsed/time;         //是总时间的几分之几
		
		
		//作为动画完成比例的函数，计算e的x位置
		//使用正弦函数将完成比例乘以4pi
		//所以，他来回往复两次
		if(fraction < 1){
			var x = distance * Math.sin(fraction*4*Math.PI);
			e.style.top = x + "px"; 
			
			
			//在25毫秒后或者是在总时间的最后尝试再次运行函数
			//目的是为了产生每秒40帧的动画
			setTimeout(animation,Math.min(25,time - elapsed));  
		}else{
			e.style.cssText = originaStyle;     //恢复原始样式
			if(fn) fn(e);  //调用完成后的回调函数
		}
	}
}	


//以毫秒级的时间将e从完全不透明淡出到完全透明
//在调用函数时假设e是完全不透明的
//fn是一个可选的函数，以e为参数，它将在动画结束时调用
//如果不指定time，默认是500毫秒
//在IE中需要修改方能有效

function fadeOut(e,fn,time){
	if(typeof e === "string")e = document.getElementById(e);
	if(!time) time = 500;
	
	//使用Math.sqrt作为一个简单的“缓动函数”来创建动画
	//精巧的非线性：一开始淡出的比较快，然后缓慢了一些
	var ease = Math.sqrt;
	var start = (new Date()).getTime();
	animate();
	
	
	function animate(){
		var elapsed = (new Date()).getTime() - start;   //消耗的时间
		var fraction = elapsed/time;   //总时间的几分之几
		if(fraction < 1){    //如果动画未完成
			var opacity = 1 - ease(fraction); //计算元素的不透明度
			e.style.opacity = String(opacity);   //设置在e上
			setTimeout(animate,Math.min(25,time - elapsed));      //调度下一帧
		}else{           //否则动画完成
			e.style.opaciy = "0";  //使e完全透明
			if(fn) fn(e); //调用完成后的回调函数
		}
	}
}


//下拉菜单
$().getClass('menu').hover(function(){
		$().getTagName('ul').show();
	},function(){
		$().getTagName('ul').hide();
	});
*/

/*
对象式获取页面元素
window.onload = function(){
	alert(base.getId('box').innerHTML);
	alert(base.getName('sex')[0].value);
	alert(base.getTagName('p')[0].innerHTML);
}
*/


window.onload = function(){
	// $().getId('box').css('background','#ff0').html('执行了！');
	// $().getTagName('p').css('color','#cccccc').click(function(){
		// alert('a');
	// });
	// $().getName('sex').css("background","#ccc").click(function(){
		// alert("我执行了！");
	// });	
	//$().getId('box').css('background','#ff0');
	//alert($().getId('box').css('color'));
	//$().getClass('nnn').getElement(2).css('color','green');
	//$().getClass('nnn').css("color",'#999');
	//$().getId("box").addClass('aaa');
	//$().addCSS(1,"body","background-color:#333",1);removeCSS
	//$().addCSS(0,"body","background-color:#333",0).removeCSS(0,1);
	
	
	
}






































