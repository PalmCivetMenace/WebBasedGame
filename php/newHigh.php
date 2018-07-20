<?php
session_start();
include 'dbcon.php';

if(!isset($_SESSION["email"])){
	echo 0;

}
else
{
	$Score=$_GET["Score"];
	$email=$_SESSION["email"];

	$addQuery="INSERT INTO LeaderBoard VALUES('$email',$Score)";
	if(mysqli_query($conn,$addQuery))
	{
	echo 1;
	}

}

?>
