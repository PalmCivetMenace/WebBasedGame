<?php
session_start();
include 'dbcon.php';
include 'header.php';
$email=$_SESSION["email"];
$unhashedpsswd=$_POST["psswd"];
$hashedpsswd=password_hash("$unhashedpsswd",PASSWORD_DEFAULT);
$reset="UPDATE Player SET token=?,psswd=? WHERE email=?";

if(!$stmt= $conn->prepare($reset)){

 die("<h1>Invalid URL</h1><p>Use another Password</p> ");

echo "</div></div>";
include'footer.php';

}

$randomChars="123456789qwertyuiopasdfghjkl";
$newToken =str_shuffle($randomChars);
$newToken= substr($newToken,0,10);

$stmt->bind_param("sss",$newToken,$hashedpsswd,$email);
echo "<div class='panel' ><div class='centerUI'>" ;

if($stmt->execute())
{
 echo "<h1>Done</h1><p>Your Password in Now Changed</p> ";

}
        
echo "</div></div>";
include'footer.php';


?>
