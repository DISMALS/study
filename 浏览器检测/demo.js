(function(){
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var attr;
	console.log(ua);
	 //firefox/44.0
	 //msie 8.0
	 //chrome/46.0.2490.86
	 //Opera/9.80 (Windows NT 6.1; U; zh-cn) Presto/2.9.168 Version/11.50
	//alert(ua.match(/chrome\/([\d.]+)/));
	// if((/firefox\/([\d.]+)/).test(ua)){   //火狐浏览器
	// 	attr = ua.match(/firefox\/([\d.]+)/); 
	// 	sys.firefox = attr[1];
	// }
	// if((/msie ([\d.]+)/).test(ua)){  //IE浏览器
	// 	attr = ua.match(/msie ([\d.]+)/);
	// 	sys.msie = attr[1];
	// }
	// if((/chrome\/([\d.]+)/).test(ua)){ //谷歌浏览器
	// 	attr = ua.match(/chrome\/([\d.]+)/);
	// 	sys.chrome = attr[1];
	// }
	// if((/safari\/([\d.]+)/).test(ua)){ 	//
	// 	attr = ua.match(/safari\/([\d.]+)/);
	// 	sys.safari = attr[1];
	// }
	// if((/opera\/.*version\/([\d.]+)/).test(ua)){  //opera浏览器
	// 	attr = ua.match(/opera\/.*version\/([\d.]+)/);
	// 	sys.opera = attr[1];
	// 	//alert(sys.opera);  //版本号
	// }
	// if((/version\/([\d.]+).*safari/).test(ua)){
	// 	attr = ua.match(/version\/([\d.]+).*safari/);
	// 	sys.safari = attr[1];
	// }


	(attr = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = attr[1]: //火狐浏览器
	(attr = ua.match(/msie ([\d.]+)/)) ? sys.msie = attr[1]: //IE浏览器
	(attr = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = attr[1]: //谷歌浏览器
	(attr = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = attr[1]: //opera浏览器
	(attr = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = attr[1]:"无法检测该浏览器版本！";  //苹果浏览器
})()

console.log(navigator.userAgent.toLowerCase());






































