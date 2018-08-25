<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
session_start();
include 'dbcon.php';
$email=$_GET["email"];
$val=$_GET["val"];
$query= "SELECT $val FROM Player WHERE email='$email'";
$result=mysqli_query($conn,$query);
while($row=mysqli_fetch_assoc($result))
{
	echo $row["$val"];

}
?>
