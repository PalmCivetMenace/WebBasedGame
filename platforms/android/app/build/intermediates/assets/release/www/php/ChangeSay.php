<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

include 'dbcon.php';
$email=$_GET['email'];

?>
<?php
$newsaying=$_GET['saying'];
$updateQuery="UPDATE Player SET saying=? WHERE email=?";
if(!$stmt=$conn->prepare($updateQuery))
{
echo "3";
}
$stmt->bind_param("ss",$newsaying,$email);
$result=$stmt->execute();
if($result)
{
	
	echo"Done";
}
else 
{
	echo "0";
}



