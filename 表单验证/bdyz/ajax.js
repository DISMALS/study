//封装Ajax



//分别GET和POST
//同步和异步
//特殊字符处理
function ajax(obj){
	var xhr = (function(){  //创建XHR对象
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
	})();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = (function(data){  //名值对转换为字符串
		var arr =[];
		for(var i in data){   //遍历data
			//alert(i);  //返回的是data属性名
			//alert(data[i]);  //返回的是data属性名对应的值
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));  //组合名和值，并且添加到arr数组中
		}
		return arr.join('&');  //返回转换为字符串的名值对
	})(obj.data);
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
			obj.success(xhr.responseText);  //回调传递参数
		}else{
			throw new Error("出现错误！ 错误代码：" + xhr.status + ";错误信息：" + xhr.statusText);
		}
	}
}





//调用
// addEvent(document,'click',function(){
	// ajax({
		// url:'ajax.php',  //请求的文件路径
		// method:'get',   //请求的方式GET 或者 POST
		// data:{          //请求或者获取的主体内容
			// "nam&e":'wang',
			// "age":100
		// },
		// success:function(text){ //回调函数
			// alert(text);
		// },
		// async:false    //false同步 或者 true异步执行
	// });
// });




















