window.onload = function(){
	//alert($("#banner img").eq(0).attr("alt"));
	// $("#banner img").css("display","none");
	// $("#banner img").eq(0).css("display","block");
	
	$("#banner img").opacity(0);
	$("#banner img").eq(0).opacity(100);
	$("#banner ul li").eq(0).css("color","#333");
	$("#banner strong").html($("#banner img").eq(0).attr("alt"));
	
	//轮播计数器
	var banner_index = 1; //第一次轮播的位置
	//alert($("#banner ul li").length());
	
	//轮播器的类型，1为透明度切换，2为上下切换
	var banner_type = 2;
	
	//自动轮播器
	var banner_timer = setInterval(banner_fn,1500);
	
	//手动轮播器
	$("#banner ul li").hover(function(){
		//alert($(this).css("color"));
		clearInterval(banner_timer); //鼠标滑过时使轮播器停止自动播放
		if($(this).css("color") != "rgb(51, 51, 51)" && $(this).css("color") != "#333"){
			banner(this,banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1); //轮播器主体代码
		}
	},function(){
		banner_index = $(this).index() + 1;  //鼠标移出后继续从当前位置执行自动播放
		banner_timer = setInterval(banner_fn,1500);
	});
	
	//轮播器主体代码
	function banner(obj,prev){  //obj轮播的对象。prev轮播的前一个
		$("#banner ul li").css("color","#999");
		$(obj).css("color","#333");
		$("#banner strong").html($("#banner img").eq($(obj).index()).attr("alt"));
		
		if(banner_type == 1){  //透明度切换
			$("#banner img").eq(prev).animate({  //轮播的前一张动画
				attr:"o",
				target:0,
				t:30,
				step:10
			}).css("zIndex",1);
			
			$("#banner img").eq($(obj).index()).animate({  //当前轮播的动画
				attr:"o",
				target:100,
				t:30,
				step:10
			}).css("zIndex",2);
		}else if(banner_type == 2){  //上下切换
			$("#banner img").eq(prev).animate({  //轮播的前一张动画
				attr:"y",
				target:300,
				t:30,
				step:10
			}).css("zIndex",1).opacity(100);
			
			$("#banner img").eq($(obj).index()).animate({  //当前轮播的动画
				attr:"y",
				target:0,
				t:30,
				step:10
			}).css("top","-300px").css("zIndex",2).opacity(100);
		}
		
	}
	
	//自动轮播器主代码
	function banner_fn(){
		if(banner_index >= $("#banner ul li").length()) return banner_index = 0;
		banner($("#banner ul li").eq(banner_index).first(),banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
		banner_index ++;
	}
}




