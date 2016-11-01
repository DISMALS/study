// function createXMLDOM(){  //IE下创建XMLDOM对象的兼容函数
	// var version = [   //判断浏览器以及操作系统支持哪个版本的MSXML库
		// "MSXML2.DOMDocument.6.0",
		// "MSXML2.DOMDocument.3.0",
		// "MSXML2.DOMDocument"
	// ];
	// for(var i = 0;i<version.length;i++){
		// try{
			// var xmlDom = new ActiveXObject(version[i]);  //创建XMLDOM对象
			// return xmlDom;
		// }catch(e){
			// //如果不满足，则跳过当前的条件，继续执行下一个条件
		// }
	// }
	// throw new Error("当前操作系统不支持MSXML库！");
// }
//var xmlDOM = createXMLDOM();
//alert(xmlDOM);



//跨浏览器创建XML DOM 对象 
function getXMLDom(xmlStr){
	var xmlDom = null;
	if(typeof window.DOMParser != 'undefined'){  //dom2级的创建xml dom对象以及错误的信息处理
		var xmlDom = (new DOMParser()).parseFromString(xmlStr,'text/xml');
		var errors = xmlDom.getElementsByTagName("parsererror");  //获取错误信息
		if(errors.length > 0){
			throw new Error('错误信息：' + errors[0].textContent);
		}
	}else if(typeof window.ActiveXObject != 'undefined'){ //ie下的创建xml dom对象以及错误处理机制
		var version = [
			"MSXML2.DOMDocument.6.0",
			"MSXML2.DOMDocument.3.0",
			"MSXML2.DOMDocument"
		];
		for(var i = 0; i < version.length; i++){
			try{
				var xmlDom = new ActiveXObject(version[i]);
			}catch(e){
				//跳出本次循环继续其余循环
			}
		}
		xmlDom.loadXML(xmlStr);
		if(xmlDom.parseError != 0 ){
			throw new Error('错误代号：' + xmlDom.parseError.errorcode + '\n错误行号：' + xmlDom.parseError.line + '\n错误解释：' + xmlDom.parseError.reason);
		}
	}else{
		throw new Error("您的系统或者浏览器不支持xml dom对象！！");
	}
	
	return xmlDom;
}

//序列化xml字符串
function serializerXML(xml){
	var serializerxml = '';
	
	if(typeof window.XMLSerializer != 'undefined'){
		serializerxml = (new XMLSerializer()).serializeToString(xml);
	}else if(xml.xml != 'undefined' ){
		serializerxml = xml.xml;
	}
	
	return serializerxml;
}

//XPath跨浏览器获取节点
//XPath跨浏览器获取单一节点
function selectSingleNode(xmlDom,xpath){
	var node = null;  //以为此方法返回的是一个节点对象
	if(typeof xmlDom.evaluate != 'undefined'){   //W3C下的获取单一节点
		//因为在W3C中XPath的下标是从1开始的，在IE中的XPath的下标是从0开始的，所以此处需要统一下标从0开始
		var patten = /\[(\d+)\]/;
		var flag = xpath.match(patten);
		var num = 0;
		//alert(flag);   //返回正则匹配的数字
		if(flag !== null){
			num = parseInt(RegExp.$1) + 1;
			xpath = xpath.replace(patten,'['+ num +']');
		}
		var result = xmlDom.evaluate(xpath,xmlDom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);  //W3C下获取XPathResult对象
		if(result !== null){
			node = result.singleNodeValue;
		}
	}else if(typeof xmlDom.selectSingleNode != undefined){   //IE下的获取单一节点
			node = xmlDom.selectSingleNode(xpath);
	}else{
		throw new Error("您的浏览器不支持XML DOM对象！！");
	}
	return node;
}


//XPath跨浏览器获取节点集合
function selectNodes(xmlDom,xpath){
	var nodes = [];
	if(typeof xmlDom.evaluate !== 'undefined'){
		//因为在W3C中XPath的下标是从1开始的，在IE中的XPath的下标是从0开始的，所以此处需要统一下标从0开始
		var patten = /\[(\d+)\]/;
		var flag = xpath.match(patten);
		var num = 0;
		//alert(flag);   //返回正则匹配的数字
		if(flag !== null){
			num = parseInt(RegExp.$1) + 1;
			xpath = xpath.replace(patten,'['+ num +']');
		}
		var result = xmlDom.evaluate(xpath,xmlDom,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		if(result !== null){
			var arr = null;
			while((arr = result.iterateNext()) !== null){
				nodes.push(arr);
			}
		}
	}else if(typeof xmlDom.selectNodes !== 'undefined'){
		nodes = xmlDom.selectNodes(xpath);
	}
	
	return nodes;
}















//载入XML：方法一、loadXML()方法载入XML字符串;方法二、load()方法载入XML文件

//例一
// var xmlDOM = createXMLDOM();
// xmlDOM.loadXML("<root><user>wang</user></root>");
// alert(xmlDOM.xml);  //.xml属性用于序列化XML字符串

// var user = xmlDOM.getElementsByTagName("user")[0];
// alert(user.nodeType);  //节点类型：元素节点  类型值为1
// alert(user.tagName);  //标签名 user
// alert(user.firstChild.nodeValue); //标准DOM获取节点值


// //例二
// var xmlDOM = createXMLDOM();
// xmlDOM.load("test.xml");  //加载外部xml文件
// alert(xmlDOM.xml);  //.xml序列化字符串，然后打印

// //例三 添加新的XML节点
// var xmlDOM = createXMLDOM();
// xmlDOM.load("test.xml");
// var ddd = xmlDOM.createElement("ddd");
// xmlDOM.documentElement.appendChild(ddd);
// var dddText = xmlDOM.createTextNode("sss");
// ddd.appendChild(dddText);
// alert(xmlDOM.xml);



//例四  异步加载文件以及错误处理

// var xmlDom = createXMLDOM();
// xmlDom.async = true; //设置异步加载
// xmlDom.onreadystatechange = function(){
	// if(xmlDom.readyState == 4){   //readyState的值为4时说明文件加载完成 异步加载完成
		// if(xmlDom.parseError == 0){  //parseError的值等于零时，说明没有错误
			// var ddd = xmlDom.createElement("ddd");
			// xmlDom.documentElement.appendChild(ddd);
			// var dddText = xmlDom.createTextNode("sss");
			// ddd.appendChild(dddText);
			// alert(xmlDom.xml);
		// }else{  //错误时抛出错误提示
			// throw new Error("错误行号：" + xmlDom.parseError.line + "\n 错误代号：" + xmlDom.parseError.errorCode + "\n 错误解释：" + xmlDom.parseError.reason);
		// }
	// }
// }
// xmlDom.load("test.xml");




//例五 DOM2级中的XMLDOM对象

//DOM2创建XMLDOM对象
//var xmlDom = document.implementation.createDocument('','root',null); //创建XMLDOM对象,并且提供了跟标签root
//alert(xmlDom);

//获取xml根标签的两个方法
//alert(xmlDom.documentElement.tagName);  //root
//alert(xmlDom.getElementsByTagName("root")[0].tagName); //root

//添加元素标签
// var dd = xmlDom.createElement("user");
// xmlDom.documentElement.appendChild(dd);
// var ddText = xmlDom.createTextNode("我是第一次使用XMLDOM对象！");
// dd.appendChild(ddText);
// alert(xmlDom.getElementsByTagName("user")[0].tagName);



//例六 DOM2级加载外部XML文件

//load()方法同步加载
// var xmlDom = document.implementation.createDocument('','root',null);
// xmlDom.async = false; //同步加载
// xmlDom.load('test.xml'); //加载外部XML文件
// alert(xmlDom.getElementsByTagName('user')[0].tagName);  //获取元素标签名
// alert(xmlDom.getElementsByTagName('user')[0].firstChild.nodeValue); //获取元素的文本内容，标准DOM
// alert('以上两个执行了！');
// alert(xmlDom.getElementsByTagName('name')[0].textContent); //获取元素的文本内容，textContent属性仅W3C支持，相当于XHTML的innerHTML


//load()方法异步加载
// var xmlDom = document.implementation.createDocument('','root',null);
// xmlDom.async = true; //异步加载
// xmlDom.onload = function(){   //异步加载之前使用load()方法将需要执行的预先保存到内存中，类似IE下的就绪状态事件即readystatechange()方法
	// alert(xmlDom.getElementsByTagName('user')[0].textContent);
// };
// xmlDom.load('test.xml'); 

//PS:load()方法只支持火狐浏览器，和新版的Opera浏览器，其他浏览器均不支持





//例七 DOMParser类型解决简易的创建XML字符串,以及XMLSerializer类型解决非IE下的XML序列化
//IE9 Safari Chrome Opera支持

//DOMParser类型,模拟loadXML()方法简易创建XML字符串
// var xmlParser = new DOMParser();  //创建DOMParser对象
// var xmlStr = '<root><user>我是文本内容！</user></root>';  //xml字符串
// var xmlDom = xmlParser.parseFromString(xmlStr,"text/xml");   //创建XML DOM
// //alert(typeof xmlDom);

// //xmlserializer类型,模拟.xml序列化字符串
// var xmlSerializer = new XMLSerializer(); //创建xmlserializer对象
// var xml = xmlSerializer.serializeToString(xmlDom); //序列化xml字符串
// alert(xml); //打印序列化后的xml字符串




//例八 DOM2级的XML发生错误的时候，会另外生成一个XML文档来保存错误信息
// var xmlParser = new DOMParser();
// var xmlStr = '<root><user>这是XML文档内容！</user></root>';
// var xmlDom = xmlParser.parseFromString(xmlStr,"text/xml"); //通过DOMParser类型的parseFromString()方法创建XML DOM对象

// var xmlSerializer = new XMLSerializer();
// var xml = xmlSerializer.serializeToString(xmlDom);  //通过XMLSerializer类型的serializeToString()方法序列化XML字符串

// var xmlErrors = xmlDom.getElementsByTagName("parsererror");  //获取保存错误信息的XML文档
// if(xmlErrors.length == 0){
	// alert(xml);
// }else{
	// throw new Error("错误信息：" + xmlErrors[0].textContent);
// }




// //例九 兼容各个浏览器创建XML DOM对象并返回此对象，并序列化XML字符串
// function getXMLDom(xmlStr){
	// var xmlDom = null;  //因为结尾返回的是对象，所以此时创建一个空对象，以便接下来的使用
	
	// //首先进行DOM2级的XML DOM对象的创建
	// //alert(window.DOMParser);  //W3C浏览器打印出的值是function DOMParser() {[native code]}函数，而IE浏览器打印的是undefined
	// if(typeof window.DOMParser != "undefined"){  
		// xmlDom = (new DOMParser()).parseFromString(xmlStr,"text/xml");  //DOM2级下创建XML DOM文档
		// var errors = xmlDom.getElementsByTagName("parsererror");
		// if(errors.length > 0){  //DOM2级下的XML错误处理机制
			// throw new Error('错误信息：' + errors[0].textContent);
		// }
	// }
	// //下面是进行的IE下的XML DOM文档的创建
	// //alert(window.ActiveXObject);
	// else if(typeof window.ActiveXObject != "undefined"){
		// var version = [    //根据操作系统和浏览器版本选择版本号
			// "MSXML2.DOMDocument.6.0",
			// "MSXML2.DOMDocument.3.0",
			// "MSXML2.DOMDocument"
		// ];
		// for(var i = 0; i < version.length; i++){
			// try{
				// //IE下创建XML DOM对象
				// var xmlDom = new ActiveXObject(version[i]);   
			// }catch(e){
				// //跳出本次循环进行下次循环
			// }
		// }
		// //加载XML字符串
		// xmlDom.loadXML(xmlStr);
		// if(xmlDom.parseError != 0){   //IE下的错误处理机制
			// throw new Error("错误代号：" + xmlDom.parseError.errorCode + "\n错误行号：" + xmlDom.parseError.line + "\n错误解释：" + xmlDom.parseError.reason);
		// }
		// return xmlDom;
		
	// }else{
		// throw new Error("您的系统或浏览器不支持XML DOM对象！");
	// }
	
	
	// return xmlDom;
// }

// //兼容浏览器序列化XML
// function serializerXML(xmldom){
	// var xml = "";
	// //alert(window.XMLSerializer);
	// if(typeof window.XMLSerializer != "undefined"){ //DOM2级下的XML序列化
		// xml = (new XMLSerializer()).serializeToString(xmldom);
	// }else if(xml.xml != "undefined"){  //IE下的XML序列化
		// xml = xmldom.xml;
	// }
	
	// return xml;
// }
// var xmlStr = "<root><user>Wang</user></root>";
// var xmlDOM = getXMLDom(xmlStr);
// alert(serializerXML(xmlDOM));




//例十  IE下的XPath的节点获取

// //跨浏览器创建XML DOM 对象 
// function getXMLDom(xmlStr){
	// var xmlDom = null;
	// if(typeof window.DOMParser != 'undefined'){  //dom2级的创建xml dom对象以及错误的信息处理
		// var xmlDom = (new DOMParser()).parseFromString(xmlStr,'text/xml');
		// var errors = xmlDom.getElementsByTagName("parsererror");  //获取错误信息
		// if(errors.length > 0){
			// throw new Error('错误信息：' + errors[0].textContent);
		// }
	// }else if(typeof window.ActiveXObject != 'undefined'){ //ie下的创建xml dom对象以及错误处理机制
		// var version = [
			// "MSXML2.DOMDocument.6.0",
			// "MSXML2.DOMDocument.3.0",
			// "MSXML2.DOMDocument"
		// ];
		// for(var i = 0; i < version.length; i++){
			// try{
				// var xmlDom = new ActiveXObject(version[i]);
			// }catch(e){
				// //跳出本次循环继续其余循环
			// }
		// }
		// xmlDom.loadXML(xmlStr);
		// if(xmlDom.parseError != 0 ){
			// throw new Error('错误代号：' + xmlDom.parseError.errorcode + '\n错误行号：' + xmlDom.parseError.line + '\n错误解释：' + xmlDom.parseError.reason);
		// }
	// }else{
		// throw new Error("您的系统或者浏览器不支持xml dom对象！！");
	// }
	
	// return xmlDom;
// }

// //序列化xml字符串
// function serializerXML(xml){
	// var serializerxml = '';
	
	// if(typeof window.XMLSerializer != 'undefined'){
		// serializerxml = (new XMLSerializer()).serializeToString(xml);
	// }else if(xml.xml != 'undefined' ){
		// serializerxml = xml.xml;
	// }
	
	// return serializerxml;
// }

// //XPath跨浏览器获取节点
// //XPath跨浏览器获取单一节点
// function selectSingleNode(xmlDom,xpath){
	// var node = null;  //以为此方法返回的是一个节点对象
	// if(typeof xmlDom.evaluate != 'undefined'){   //W3C下的获取单一节点
		// //因为在W3C中XPath的下标是从1开始的，在IE中的XPath的下标是从0开始的，所以此处需要统一下标从0开始
		// var patten = /\[(\d+)\]/;
		// var flag = xpath.match(patten);
		// var num = 0;
		// //alert(flag);   //返回正则匹配的数字
		// if(flag !== null){
			// num = parseInt(RegExp.$1) + 1;
			// xpath = xpath.replace(patten,'['+ num +']');
		// }
		// var result = xmlDom.evaluate(xpath,xmlDom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);  //W3C下获取XPathResult对象
		// if(result !== null){
			// node = result.singleNodeValue;
		// }
	// }else if(typeof xmlDom.selectSingleNode != undefined){   //IE下的获取单一节点
			// node = xmlDom.selectSingleNode(xpath);
	// }else{
		// throw new Error("您的浏览器不支持XML DOM对象！！");
	// }
	// return node;
// }


// //XPath跨浏览器获取节点集合
// function selectNodes(xmlDom,xpath){
	// var nodes = [];
	// if(typeof xmlDom.evaluate !== 'undefined'){
		// //因为在W3C中XPath的下标是从1开始的，在IE中的XPath的下标是从0开始的，所以此处需要统一下标从0开始
		// var patten = /\[(\d+)\]/;
		// var flag = xpath.match(patten);
		// var num = 0;
		// //alert(flag);   //返回正则匹配的数字
		// if(flag !== null){
			// num = parseInt(RegExp.$1) + 1;
			// xpath = xpath.replace(patten,'['+ num +']');
		// }
		// var result = xmlDom.evaluate(xpath,xmlDom,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		// if(result !== null){
			// var arr = null;
			// while((arr = result.iterateNext()) !== null){
				// nodes.push(arr);
			// }
		// }
	// }else if(typeof xmlDom.selectNodes !== 'undefined'){
		// nodes = xmlDom.selectNodes(xpath);
	// }
	
	// return nodes;
// }



var xmlstr = '<root><user id="5">姓名：王明豪</user><user id="6">年龄：22岁</user></root>';
var xmldom = getXMLDom(xmlstr); //创建XML DOM文档
var xml = serializerXML(xmldom); //序列化后的XML字符串
//alert(xml);


try{  //单一节点获取
	var node = selectSingleNode(xmldom,'root/user[1]');
	alert(serializerXML(node));
}catch(e){
	throw new Error("XPath有误！");
}


//获取节点集合
// var nodes = selectNodes(xmldom,'root/user');
// alert(serializerXML(nodes[0]));
// alert(serializerXML(nodes[1]));



//IE8以下获取XML节点的方法
//var node = xml.selectSingleNode('root/user'); //获取单一节点，并返回第一个匹配的元素
//alert(node.tagName);
//var node = xml.selectSingleNode('root/user[1]'); //根据下标获取相应的标签及内容
//var node = xml.selectSingleNode('root/user[@id=5]'); //根据ID获取指定的标签及其内容
//var node = xml.selectSingleNode('root/user[1]/text()');  //获取指定标签的文本内容
// var node = xml.selectNodes('root/user');   //获取指定的节点集合
// alert(node.xml);
//alert(typeof xmldom.selectSingleNode); //IE下返回unknown,非IE下返回undefined


//例十一 W3C下的XPath节点获取，首先要得到XPathResult对象，得到XPathResult对象的方法有两种，evaluate()方法的五个参数分别是XPath路径、上下文节点对象、命名空间求解器(通常为null)、返回的结果类型、保存结果的XPathResult对象(通常为null)


//下面是单一节点的获取方式
//方法一通过创建XPathEvaluator对象执行evaluate()方法得到XPathResult对象,且W3C下的XPath的下标是从1开始的
//var eva = new XPathEvaluator();  //创建XPathEvaluator类型对象
//var wNode = eva.evaluate('root/user',xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);  //获取XPathResult对象
//alert(wNode); //返回object XPathResult
//下面是获取单一节点的值
// if(wNode !== null){  
	// alert(serializerXML(wNode.singleNodeValue)); //singleNodeValue属性是XPathResult.FIRST_ORDERED_NODE_TYPE单一节点常量提供的属性，用于获取节点内容
// }

//方法二直接通过上下文节点对象执行evaluate()方法，获取XPathResult对象 ,W3C下XPath的下标是从1开始的
//var sss = xmldom.evaluate('root/user[1]',xmldom,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null); //直接通过上下文节点对象执行evaluate()方法获取xpathresult对象
//if(sss !== null){
	//alert(serializerXML(sss.singleNodeValue));
//}


//下面是节点集合的获取方式
// var result = xmldom.evaluate('root/user',xmldom,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
// if(result !== null){
	// var nodes = [];
	// var node = result.iterateNext();  //iterateNext()方法是XPathResult.ORDERED_NODE_ITERATOR_TYPE节点集合常量提供的方法，用于迭代数组集合
	// while(node !== null){
		// nodes.push(node);  //将迭代的值添加到nodes数组中
		// node = result.iterateNext();
	// }
// }
// alert(serializerXML(nodes[0]));




































