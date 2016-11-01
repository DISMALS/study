<?php
	header("Content-Type:text/html; charset = utf-8");
	
	define("DB_HOST","127.0.0.1");
	define("DB_USER","root");
	define("DB_PWD","root");
	define("DB_NAME","blog");
	
	//连接数据库服务器
	$conn = @mysql_connect(DB_HOST,DB_USER,DB_PWD) or die("数据库连接错误".mysql_error());
	
	//选择指定的数据库，设置字符集
	@mysql_select_db(DB_NAME) or die("数据库错误，错误信息：".mysql_error());
	
	@mysql_query("SET NAMES UTF8")or die("字符集设置错误".mysql_error());
	
	
?>