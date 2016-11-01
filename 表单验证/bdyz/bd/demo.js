//表单验证
// addEvent(window,"load",function(){
	// alert($("form").first().username.value);
// })

addDomLoaded(function(){ //现代DOM加载事件
	//alert($("form").first());
	//$("form").form("username").value("qw");
	
	//表单初始化
	$("form").first().reset();
	
	//用户名验证
	$("form").form("username").bind("focus",function(){
		$(".user_default").css("display","block");
		$(".user_error").css("display","none");
		$(".user_allright").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == ""){
			$(".user_default").css("display","none");
			$(".user_error").css("display","none");
			$(".user_allright").css("display","none");
		}else if(!check_user()){ //\u4e00-\u9fa5 这是中文字符编码范围
			$(".user_error").css("display","block");
			$(".user_allright").css("display","none");
			$(".user_default").css("display","none");
		}else{
			$(".user_allright").css("display","block");
			$(".user_error").css("display","none");
			$(".user_default").css("display","none");
		}
	});
	function check_user(){
		if(/[\w]{2,20}/.test(trim($("form").form("username").value()))) return true;
	}
	
	
	
	//密码验证
	$("form").form("pass").bind("focus",function(){
		$(".pass_default").css("display","block");
		$(".pass_error").css("display","none");
		$(".pass_allright").css("display","none");
	}).bind("keyup",function(){
		check_pass();
	}).bind("blur",function(){
		if(trim($(this).value()) == ""){
			$(".pass_default").css("display","none");
			$(".pass_error").css("display","none");
			$(".pass_allright").css("display","none");
		}else{
			if(check_pass()){ 
				$(".pass_default").css("display","none");
				$(".pass_error").css("display","none");
				$(".pass_allright").css("display","block");
			}else{
				$(".pass_default").css("display","none");
				$(".pass_error").css("display","block");
				$(".pass_allright").css("display","none");
			}
		}
	})
	
	
	
	
	//密码验证函数
	function check_pass(){
		var value = trim($("form").form("pass").value());
		var value_length = value.length;
		var code_length = 0;  //用于验证第三个条件，记录大写字母、小写字母、数字、非空字符中出现了哪几种
		
		
		//验证6~20位字符
		if(value_length >= 6 && value_length <= 20){
			$(".fzd .q1").css("color","green").html("●");
		}else{
			$(".fzd .q1").css("color","#444").html("○");
		}
		
		//验证，字母或数字或非空字符，任意一个即可
		if(value_length > 0 && !/\s/.test(value)){
			$(".fzd .q2").css("color","green").html("●");
		}else{
			$(".fzd .q2").css("color","#444").html("○");
		}
		
		//第三个必须条件的验证，大小写字母或数字或非空字符，两种混搭即可满足
		if(/[\d]/.test(value)){  //验证密码含有数字
			code_length++;
		}
		if(/[a-z]/.test(value)){   //验证密码含有小写字母
			code_length++;
		}
		if(/[A-Z]/.test(value)){   //验证密码含有大写字母
			code_length++;
		}
		if(/[^\w]/.test(value)){   //验证密码含有非空字符
			code_length++;
		}
		if(code_length >= 2){
			$(".fzd .q3").css("color","green").html("●");
		}else{
			$(".fzd .q3").css("color","#444").html("○");
		}
		
		if(value_length >= 6 && value_length <= 20 && code_length >= 2 && !/\s/.test(value)){
			return true;
		}else{
			return false;
		}
	}
	
	
	//密码确认验证
	$("form").form("surepass").bind("focus",function(){
		$(".notpass_default").css("display","block");
		$(".notpass_error").css("display","none");
		$(".notpass_allright").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == ""){
			$(".notpass_default").css("display","none");
			$(".notpass_error").css("display","none");
			$(".notpass_allright").css("display","none");
		}else if(check_notpass()){
			$(".notpass_default").css("display","none");
			$(".notpass_error").css("display","none");
			$(".notpass_allright").css("display","block");
		}else{
			$(".notpass_default").css("display","none");
			$(".notpass_error").css("display","block");
			$(".notpass_allright").css("display","none");
		}
	});
	function check_notpass(){
		if(trim($("form").form("surepass").value()) == trim($("form").form("pass").value())) return true;
	}
	
	
	//问题回答验证
	$("form").form("anw").bind("focus",function(){
		$(".ans_default").css("display","block");
		$(".ans_error").css("display","none");
		$(".ans_allright").css("display","none");
	}).bind("blur",function(){
		if(trim($(this).value()) == ""){
			$(".ans_default").css("display","none");
			$(".ans_error").css("display","none");
			$(".ans_allright").css("display","none");
		}else if(check_ans()){
			$(".ans_default").css("display","none");
			$(".ans_error").css("display","none");
			$(".ans_allright").css("display","block");
		}else{
			$(".ans_default").css("display","none");
			$(".ans_error").css("display","block");
			$(".ans_allright").css("display","none");
		}
	});
	function check_ans(){
		if(trim($("form").form("anw").value()).length >= 2 && trim($("form").form("anw").value()).length <= 32) return true;
	}
	
	
	
	//电子邮件验证
	$("form").form("email").bind("focus",function(){
		
		//补全系统显示
		//判断输入的值中没有@符号时，自动补全显示
		if($(this).value().indexOf("@") == -1) $(".all_email").css("display","block");  
		
		$(".email_default").css("display","block");
		$(".email_error").css("display","none");
		$(".email_allright").css("display","none");
	}).bind("blur",function(){
		
		//补全系统隐藏
		$(".all_email").css("display","none");
		
		if(trim($(this).value()) == ""){
			$(".email_default").css("display","none");
			$(".email_error").css("display","none");
			$(".email_allright").css("display","none");
		}else if(check_email()){
			$(".email_default").css("display","none");
			$(".email_error").css("display","none");
			$(".email_allright").css("display","block");
		}else{
			$(".email_default").css("display","none");
			$(".email_error").css("display","block");
			$(".email_allright").css("display","none");
		}
	});
	
	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,6}){1,2}$/.test(trim($("form").form("email").value()))) return true;
	}
	
	//电子邮件补全系统键入
	$("form").form("email").bind("keyup",function(event){
		//判断输入的值中有没有@符号，，没有时自动补全显示
		if($(this).value().indexOf("@") == -1){
			$(".all_email").css("display","block");
			$(".all_email li i").html($(this).value());
		}else{ //否则自动补全隐藏
			$(".all_email").css("display","none");
		}
		
		//键盘上的向下键
		if(event.keyCode == 40){
			if(this.index == undefined || this.index >= $(".all_email li").length() -1){
				this.index = 0;
			}else{
				this.index++;
			}
			$(".all_email li").css("background","#fff");
			$(".all_email li").css("color","#666");
			
			$(".all_email li").eq(this.index).css("background","#333");
			
		}
		
		//键盘上的向上键
		if(event.keyCode == 38){
			if(this.index == undefined || this.index <= 0){
				this.index = $(".all_email li").length() - 1;
			}else{
				this.index--;
			}
			$(".all_email li").css("background","#fff");
			$(".all_email li").css("color","#666");
			
			$(".all_email li").eq(this.index).css("background","#333");
			$(".all_email li").eq(this.index).css("color","#f2f2f2");
			
		}
		
		//键盘上的Enter键
		if(event.keyCode == 13){
			$(this).value($(".all_email li").eq(this.index).text());
			$(".all_email").css("display","none");
			this.index =  undefined;
		}
		
	});
	
	//电子邮件补全系统点击获取
	$(".all_email li").bind("mousedown",function(){
		$("form").form("email").value($(this).text())
	});
	
	//电子邮件补全系统鼠标移入移出效果
	$(".all_email li").hover(function(){
		$(this).css("background","#333").css("color","#f2f2f2");
	},function(){
		$(this).css("background","#fff").css("color","#666");
	});
	
	
	
	//年月日
	var year = $("form").form("year");
	var month = $("form").form("month");
	var day = $("form").form("day");
	
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];
	
	//注入年
	for(var i = 1650; i <= 2013; i++){
		year.first().add(new Option(i,i),undefined);
	}
	
	//注入月
	for(var i = 1; i <= 12; i++){
		month.first().add(new Option(i,i),undefined);
	}
	 //年份的值变化时
	year.bind("change",select_day);
	
	//月份值变化时
	month.bind("change",select_day);
	
	day.bind("chenge")
	
	function check_birthday(){
		if(year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}
	
	function select_day(){
		if(year.value() != 0 && month.value() != 0){
			//清除上一次注入的日
			day.first().options.length = 1;
			
			//不确定的日
			var cur_day = 0;
			
			//注入日
			if(inArray(day31,parseInt(month.value()))){  //31天的月份
				cur_day = 31;
			}else if(inArray(day30,parseInt(month.value()))){  //30天的月份
				cur_day = 30;
			}else{ //2月份
				if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0){
					cur_day = 29;
				}else{
					cur_day = 28;
				}
			}
			for(var i = 1; i <= cur_day; i++){
				day.first().add(new Option(i,i),undefined);
			}
		}else{
			//清除注入的日
			day.first().options.length = 1;
		}
	}
	
	
	
	//备注
	$("form").form("ps").bind("keyup",check_ps).bind("paste",function(){
		//粘贴事件
		setTimeout(check_ps,50);
	});
	
	//清尾
	$(".clear").click(function(){
		$("form").form("ps").value($("form").form("ps").value().substring(0,200));
		check_ps();
	});
	
	function check_ps(){
		var num = 200 - $("form").form("ps").value().length;
		if(num >= 0){
			$(".tishi").eq(0).css("display","block");
			$(".num").eq(0).html(num);
			$(".tishi").eq(1).css("display","none");
		}else{
			$(".tishi").eq(0).css("display","none");
			$(".num").eq(1).html(Math.abs(num)).css("color","#f00");
			$(".tishi").eq(1).css("display","block");
		}
	}
	
	//提交
	$("form").form("submits").click(function(){
		var flag = true;
		if(!check_user()){
			$(".user_error").css("display","block");
			flag = false;
		}
		
		if(!check_pass()){
			$(".pass_error").css("display","block");
			flag = false;
		}

		if(!check_notpass()){
			$(".notpass_error").css("display","block");
			flag = false;
		}
		
		if(!check_ans()){
			$(".ans_error").css("display","block");
			flag = false;
		}
		
		if(!check_email()){
			$(".email_error").css("display","block");
			flag = false;
		}
		
		if(!check_birthday()){
			flag = false;
		}
		
		if(flag){
			//$("form").first().submit();
			
			//ajax提交数据
			ajax({
				method:"post",
				url:"../add.php",
				data:$("form").eq(0).serialize(),
				success:function(text){
					if(text == 1){
						alert("成功注册！");
					}else{
						alert(text);
					}
				},
				async:true
			});
		}
		
		
		
	});
	
	
	
	
});






































