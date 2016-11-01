$().extend("drag",function(tags){
	//拖拽步骤：
	//1.先是鼠标左键按下
	//2.再点下的物体被选中，进行move移动
	//3.抬起鼠标，停止移动
	//4.点击某个物体选中此物体的外层div即可，move和up是需要全局区域的，也就是整个文档通用，应该用document
	for(var i = 0; i < this.elements.length; i++){
			addEvent(this.elements[i],"mousedown",function(e){   //鼠标按下
				if(trim(this.innerHTML).length == 0) e.preventDefault(); //老版本火狐时，当弹窗内容为空时，会出现bug，无法拖动，禁止一下默认行为即可
				var _this = this;
				var chaLeft = e.clientX - _this.offsetLeft;
				var chaTop = e.clientY - _this.offsetTop;
				
				//自定义拖拽区域
				var flag = false;
				for(var i = 0; i < tags.length; i++){
					if(e.target == tags[i]){
						flag = true;   //只要有一个为true，就立刻返回
						break;
					}
				}
				
				if(flag){
					addEvent(document,"mousemove",move);
					addEvent(document,"mouseup",up);
				}else{
					removeEvent(document,"mousemove",move);
					removeEvent(document,"mouseup",up);
				}
				
				function move(e){  //鼠标移动
					//问题一、解决鼠标移动到可视窗口外部出现白色区域的情况
					//问题二、专属IE浏览器鼠标脱出浏览器时出现白色区域，IE提供两个方法：setCaptrue()和releaseCaptrue(),分别放在鼠标按下和弹起事件里
					//问题三、当改变浏览器窗口大小时，弹窗会自动水平垂直居中，比不是保持我们拖拽后的位置不变
					
					var left = e.clientX - chaLeft;  // 获取点击的div距离左边的left值
					var top = e.clientY - chaTop; //获取点击的div距离上边的top值
					if(left < 0){
						left = 0;
					}else if(left <= getScroll().left){
						left = getScroll().left;
					}else if(left > (getInner().width + getScroll().left) - _this.offsetWidth){
						left = (getInner().width + getScroll().left) - _this.offsetWidth;
					}
					if(top < 0){
						top = 0;
					}else if(top <= getScroll().top){
						top = getScroll().top;
					}else if(top > (getInner().height + getScroll().top) - _this.offsetHeight){
						top = (getInner().height + getScroll().top) - _this.offsetHeight;
					}
					_this.style.left = left + "px";
					_this.style.top = top + "px";
					
					//专属IE的问题,捕获事件
					if(typeof _this.setCapture != "undefined"){
						_this.setCapture();
					}
				}
				
				function up(){  //鼠标弹起
					removeEvent(document,"mousemove",move);
					removeEvent(document,"mouseup",up);
					
					//专属IE的问题，释放事件
					if(typeof _this.releaseCapture != "undefined"){
						_this.releaseCapture();
					}
				}
			});
		}
		return this;
});
