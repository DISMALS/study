$().extend("serialize",function(){
	for(var i = 0; i < this.elements.length; i++){
		var form = this.elements[i];
		
		var parts = {};
		for(var i = 0; i < form.elements.length; i++){
			var filed = form.elements[i];
			//alert(filed.type); //表单字段的type属性值
			switch(filed.type){
				case undefined:   //字段集
				case 'reset':        //重置按钮
				case 'submit':       //提交按钮
				case 'file':		   //上传按钮
				case 'button':       //普通按钮
					 break;
				case 'radio':        //单选按钮
				case 'checkbox':     //复选按钮
					 if(filed.selected) break;
				case 'select-one':   //下拉框，显示一行
				case 'select-multiple':   //下拉框显示多行
					 for(var j = 0; j < filed.options.length; j++){
						 var option = filed.options[j];
						 if(option.selected){
							 var optValue = "";
							 if(option.hasAttribute){  //判断是否是非IE浏览器，hasAttribute()方法判断是否有某个属性，返回布尔值
								 optValue = (option.hasAttribute("value") ? option.value : option.text);
							 }else{        //判断是否是非IE浏览器，attributes("value")取得属性，specified判断是否某个属性已规定，返回布尔值
								 optValue = (option.attributes("value").specified ? option.value : option.text);
							 }
							 parts[filed.name] = option.value;
						 }
					 }
					 break;
				default:
					 parts[filed.name] = filed.value;
			}
		}
		return parts;
	}
	return this;
});