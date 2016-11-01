window.onload = function(){
	/*var btn = document.getElementById("btn");
	var a = document.getElementById("a");
	addEvent(btn,'click',fn1);
	addEvent(body,'click',fn2);
	addEvent(document,'click',fn3);
	removeEvent(btn,'click',fn2);
	addEvent(btn,"click",function(e){  
		e.stopPropagation();   //阻止向上冒泡
		alert("btn");
	});
	addEvent(document,"click",function(e){
		
		alert("document");
	});
	addEvent(a,"click",function(e){
		e.preventDefault();   //阻止默认行为
	});
	*/
	var str = '56789dfdskid48527hdsihiu12345';
	var patten = /\d+/g;
	var num = str.match(patten);
	for(var i = 0; i < num.length; i++){
		var num2 = [];
		var patten2 = /\d{1}/g;
		num2 = num[i].match(patten2);
		for(var j = 0; j < num2.length; j++){
			if(num2[j+1] - num2[j] == 1){
				console.log(num2[num2.length - 1]);
			}
		}
		//console.log(num2[0]);
		
	}
	
	
}

function fn1(e){
	
	alert("btn按钮被点击了1！！" + this.value + e.clientX);
}
function fn2(e){
	alert("body按钮被点击了2！！" + this.value + e.clientX);
}
function fn3(e){
	e.preventDefault();
	alert("document按钮被点击了3！！" + this.value + e.clientX);
}