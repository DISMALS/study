<?php 
	require "config.php";
	
	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];
	$query = "INSERT INTO blog_users(user,pass,ques,ans,email,birthday,ps)
	                      VALUES('{$_POST['username']}',sha1('{$_POST['pass']}'),'{$_POST['ques']}','{$_POST['anw']}','{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";
	
	
	//新增
	mysql_query($query) or die("新增失败！".mysql_error());
	
	echo mysql_affected_rows();
	
	
	//关闭数据库
	mysql_close();
?>