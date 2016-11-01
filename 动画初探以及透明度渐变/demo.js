$(function(){
	$("#btn").click(function(){
		$("#box").animate({
		'attr':'x',     //可选，动画运行的方向
		'start':100,       //可选，动画开始的起始位置
		'step':7,         //可选，动画每次执行的长度值
		't':50,			   //可选，动画运行的频率
		'target':300		   //增量值，目标点
	});
	});
	
});