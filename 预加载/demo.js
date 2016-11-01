addEvent(window,"load",function(){
	
	//延迟加载
	var wait_load = $(".waiteLoad");
	wait_load.opacity(0); //初始化图片透明度
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
		
		//预加载
		//弹出层,锁屏
		var photo_big = $("#photo_big");
		var screen = $(".screen");
		photo_big.center(500,500).resize(function(){   //当屏幕重新设定宽高时，再次计算弹窗的位置以及遮罩的宽高	 
			if(photo_big.css("display") == "block"){   //只有当弹窗出现时才会出现遮罩
				screen.lock();
			}
		});
		$(".waiteLoad").click(function(){  //点击显示弹窗
			photo_big.css("display","block");
			screen.lock();
			
			//图片预加载
			var imgObj = new Image(); //创建一个临时的区域图片对象
			
			$(imgObj).bind("load",function(){
				$("#photo_big .big img").attr("src",imgObj.src).animate({
					attr:'o',
					target:100,
					t:30,
					step:10
				}).css("width","440px").css("height","440px").css("top",0).opacity(0);
			});
			
			//IE下src要放在load事件之后
			imgObj.src = $(this).attr("bigsrc")//src属性可以在后台加载这张图片到本地缓存，但不会显示出来
			
			
			
			var childrenDl = this.parentNode.parentNode;  //获取当前图片的父节点的父节点
			//alert($(childrenDl).index());
			prev_next_img(childrenDl);
			
			
			
		});
		$(".close").click(function(){  //点击弹窗关闭按钮
			photo_big.css("display","none");
			screen.unlock();
			$("#photo_big .big img").attr("src","loading.gif").css("width","32px").css("height","32px").css("top","204px");
		});
		
		photo_big.drag([$("h2").first()]);  //拖拽
	}
	
	
	//图片鼠标滑过
	$(".big .left").hover(function(){
		$(".big .sl").animate({
			attr:"o",
			target:50,
			t:30,
			step:10
		});
	},function(){
		$(".big .sl").animate({
			attr:"o",
			target:0,
			t:30,
			step:10
		});
	});
		
	//图片鼠标滑过
	$(".big .right").hover(function(){
		$(".big .sr").animate({
			attr:"o",
			target:50,
			t:30,
			step:10
		});
	},function(){
		$(".big .sr").animate({
			attr:"o",
			target:0,
			t:30,
			step:10
		});
	});

	//图片上一张
	$(".big .left").click(function(){
		$("#photo_big .big img").attr("src","loading.gif").css("width","32px").css("height","32px").css("top","204px");//上一张未完成加载时，显示loading图
		
		var current_img = new Image();  //创建临时图片对象
		$(current_img).bind("load",function(){
			$(".big img").attr("src",current_img.src).animate({
				attr:"o",
				target:100,
				t:30,
				step:10
			}).opacity(0).css("width","440px").css("height","440px").css("top","0px"); 
		});
		
		current_img.src = $(this).attr("src"); //后台加载图片
		
		//console.log($(".waiteLoad").ge($(".big img").attr("index")));  //获取上一张图片
		
		var children = $(".waiteLoad").ge(prevIndex($(".big img").attr("index"),$("#waiteLoad").first())).parentNode.parentNode;  //获取上一张小图的dl对象
		prev_next_img(children);
	});


	//图片下一张
	$(".big .right").click(function(){
		$("#photo_big .big img").attr("src","loading.gif").css("width","32px").css("height","32px").css("top","204px"); //下一张未完成加载时，显示loading图
		
		var current_img = new Image();  //创建临时图片对象
		$(current_img).bind("load",function(){
			$(".big img").attr("src",current_img.src).animate({
				attr:"o",
				target:100,
				t:30,
				step:10
			}).opacity(0).css("width","440px").css("height","440px").css("top","0px"); //单次切换到上一张
		});
		current_img.src = $(this).attr("src"); //后台加载图片
		
		//console.log($(".waiteLoad").ge($(".big img").attr("index")));  //获取上一张图片

		var children = $(".waiteLoad").ge(nextIndex($(".big img").attr("index"),$("#waiteLoad").first())).parentNode.parentNode;  //获取上一张小图的dl对象
		prev_next_img(children);
	});
		

	function prev_next_img(children){
		var prev = prevIndex($(children).index(),children.parentNode);  //上一张图片
		var next = nextIndex($(children).index(),children.parentNode);  //下一张图片
		//alert(next);
		
		//创建Image对象
		var prev_img = new Image();
		var next_img = new Image();
		
		//Image对象的src属性在后台加载相应的图片，但是不会再前台页面上显示出来
		prev_img.src = $(".waiteLoad").eq(prev).attr("bigsrc");  
		next_img.src = $(".waiteLoad").eq(next).attr("bigsrc");
		$(".left").attr("src",prev_img.src);
		$(".right").attr("src",next_img.src);
		$(".big img").attr("index",$(children).index());  //$(children).index();是当前图片的小图索引值
		
		//获取相对当前图片的索引值以及总数值
		$(".index").html(parseInt($(children).index()) + 1 + "/" + $(".waiteLoad").length());
	}
	
	
	
	//ajax调用
	addEvent(document,'click',function(){
		ajax({
			url:'../ajax.php',  //请求的文件路径
			method:'post',   //请求的方式GET 或者 POST
			data:{          //请求或者获取的主体内容
				"nam&e":'wang',
				"age":100
			},
			main:function(text){ //回调函数
				alert(text);
			},
			async:false    //false同步 或者 true异步执行
		});
	});
});









































