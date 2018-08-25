<?php
include 'dbcon.php';
$email = $_GET["email"];
$Sel= $_GET["Sel"];

$query="UPDATE Player SET Selected=$Sel WHERE email='$email'";
$result= mysqli_query($conn,$query);
if($result)
{
 echo 1;
}
else
{
echo 0;
}
?>
