window.onload = function(){
	//alert($(".waiteLoad").first().offsetTop); //获取图片距离文档定点的距离
	
	//问题1：将xsrc的地址替换到src中去
	//当图片进入到可是区域时，将xsrc的地址替换到src中去即可
	//alert($(".waiteLoad").eq(0).attr("xsrc")); //获取xsrc的地址
	//$(".waiteLoad").eq(0).attr("src",$(".waiteLoad").eq(0).attr("xsrc")); //将xsrc的地址替换到src中去
	
	//问题2：获取图片元素到最外层顶点元素的距离
	//alert(offsetTop($(".waiteLoad").first())); 
	
	//问题3：获取页面可是区域的最低点的位置
	//alert(getInner().height + getScroll().top);
	
	var wait_load = $(".waiteLoad");
	wait_load.opacity(0); //初始化图片透明度
	
	//这是利用事件发生器bind方法加载事件
	// $(window).bind("scroll",_wait_load);
	
	
	//这是利用传统事件绑定方法加载事件
	addEvent(window,"scroll",_wait_load);
	
	addEvent(window,"resize",_wait_load);
	//独立出主要延迟加载代码
	function _wait_load(){
		setTimeout(function(){
			for(var i = 0; i < wait_load.length(); i++){
				var _this = wait_load.ge(i); //返回的是原生态的对象
				if(getInner().height + getScroll().top >= offsetTop(_this)){
					$(_this).attr("src",$(_this).attr("xsrc")).animate({
						attr:"o",
						target:100,
						step:10
					});
				}
			}
		},100);
	}
}









































