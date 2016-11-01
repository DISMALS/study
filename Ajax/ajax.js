//添加事件函数
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




//兼容浏览器创建XMLHttpRequest对象
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){  //IE7+、以及火狐、谷歌、苹果、Opera
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){   //IE6以下的创建XHR对象
		var version = [   //IE6以下创建XHR对象的三种情况
			"MSXML2.XMLHttp.6.0",
			"MSLXML2.XMLHttp.3.0",
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



/*
实例化XHR对象，XMLHttpRequest简称（XHR）
var xhr = new XMLHttpRequest();
alert(xhr);






var xhr = createXHR();  //获取到XHR对象

open()方法表示为请求发送的准备过程，有三个参数，分别是1、发送请求的类型（get或者是post）；2、请求的URL地址；3、表示是否是异步（true为异步，false为同步）；
xhr.open('get','ajax.php',false);  //一般get类型下，数据请求为同步

xhr.send(null); //发送请求
alert(xhr.responseText);   //作为响应主体被返回的文本、






通过点击事件 实时更新数据,使用的是同步调用
addEvent(document,'click',function(){
	var xhr = createXHR();  //创建XHR对象
	xhr.open('get','ajax.php?rand =' + Math.random(),false); //'ajax.php?rand =' + Math.random(),处理IE中默认使用缓存信息的问题，false为同步
	xhr.send(null);
	if(xhr.status == 200){  //判断HTTP状态代码来执行响应的操作，status=200 为成功返回
		alert(xhr.responseText);
	}else if(xhr.status == 404){  //未找到相应的文件，xhr.statusText为状态字符串
		alert('出现错误！错误代码：' + xhr.status +';错误信息：' + xhr.statusText);
	}else{
		throw new Error("请求没有成功返回！");
	}
});






使用的是异步调用
addEvent(document,'click',function(){
	var xhr = createXHR();
	xhr.onreadystatechange = function(){  //先将需要执行的内容通过readystatechange事件预加载到内存中
		if(xhr.readyState == 4){  //通过readyState属性判断响应数据的进度值有1（启动）、2（发送）、3（接受）、4（完成）
			if(xhr.status == 200){   //HTTP状态判断，200为完成状态
				alert(xhr.responseText);
			}else{
				throw new Error('出现错误！错误代码：' + xhr.status + ';错误信息：' + xhr.statusText);
			}
		}
		//alert(xhr.readyState);
	};
	xhr.open('get','ajax.php?rand=' + Math.random(),true);  //异步执行
	xhr.send(null);
});







//HTTP头部信息
addEvent(document,'click',function(){
	var xhr = createXHR();
	xhr.onreadystatechange = function(){  //先将需要执行的内容通过readystatechange事件预加载到内存中
		if(xhr.readyState == 4){  //通过readyState属性判断响应数据的进度值有1（启动）、2（发送）、3（接受）、4（完成）
			if(xhr.status == 200){
				alert(xhr.responseText);
				//alert(xhr.getAllResponseHeaders());   //获取响应头信息的所有信息
				//alert(xhr.getResponseHeader('Content-Type'));  //获取响应头信息的指定头信息
			}else{
				throw new Error('出现错误！错误代码：' + xhr.status + ';错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('get','ajax.php?rand=' + Math.random(),true);  //异步执行
	
	xhr.setRequestHeader('myheader','Wang');   //设置请求头信息,注意设置头信息的位置
	
	xhr.send(null);
});



//GET请求
addEvent(document,'click',function(){
	var xhr = createXHR();
	var url = 'ajax.php?rand=' + Math.random();
	url = params(url,'name','l&e');
	//alert(url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){  //检测是否全部接收响应数据
			if(xhr.status == 200){  //判断HTTP状态，确定服务器是否成功返回页面
				alert(xhr.responseText);
			}else{
				throw new Error('出现错误！错误代码：' + xhr.status + '；错误信息：' + xhr.statusText);
			}
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
	
});
//中文乱码，AJAX返回的数据其实是UTF-8的，所有文件的格式设为UTDF-8即可
//特殊字符，需要通过encodeURIComponent()方法进行编码解决
function params(url,name,value){    
	url += url.indexOf("?") == -1 ? '?' : '&';
	url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return url;
}







//利用JSON文件实现回调GET请求
addEvent(document,'click',function(){
	var xhr = createXHR();
	url = 'json.json?rand=' + Math.random();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				var box = JSON.parse(xhr.responseText);
				alert(box);
			}else{
				throw new Error("出现错误！ 错误代码：");
			}
		}	
	};
	xhr.open('get',url,true);
	xhr.send(null);
});







//封装Ajax

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

//分别GET和POST
//同步和异步
//特殊字符处理

function ajax(obj){
	var xhr = createXHR();
	//obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	//判断请求方式是GET时，判断url里是否有？若没有则执行'?' + obj.data，若有执行'&' + obj.data
	if(obj.method === 'get')obj.url += obj.url.indexOf("?")== -1 ? '?' + obj.data : '&' + obj.data;
	//alert(obj.url); //打印出最新的url信息
	if(obj.async === true){   //判断为异步执行时
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();
			}	
		};
	}
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method === 'post'){   //判断请求方式为post时
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send(null);
	}
	if(obj.async === false){//判断为同步执行时
		callback();
	}
	
	//回调函数
	function callback(){
		if(xhr.status == 200){
			obj.main(xhr.responseText);  //回调传递参数
		}else{
			throw new Error("出现错误！ 错误代码：" + xhr.status + ";错误信息：" + xhr.statusText);
		}
	}
}

//调用
addEvent(document,'click',function(){
	ajax({
		url:'ajax.php',
		method:'get',
		data:{
			"nam&e":'wang',
			"age":100
		},
		main:function(text){
			alert(text);
		},
		async:false
	});
});



*/







































