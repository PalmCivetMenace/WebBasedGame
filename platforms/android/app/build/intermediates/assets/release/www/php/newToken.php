<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

include 'dbcon.php';
$email=$_POST["email"];
$randomChars="123456789qwertyuiopasdfghjkl";
$checkEmail="SELECT email FROM $playerTable WHERE email=?";
if(!$stmt=$conn->prepare($checkEmail))
{

die("3");
}
$stmt->bind_param("s",$email);

$stmt->execute();

$result=$stmt->get_result();
if($result->num_rows<1)
{
	die("5");
}

$newToken =str_shuffle($randomChars);
$newToken= substr($newToken,0,10);


$addToken="UPDATE $playerTable SET token=? where email=?";
if(!$stmt=$conn->prepare($addToken))
{
die("3");

}
$stmt->bind_param("ss",$newToken,$email);

if($stmt->execute())
{
	if(mail($email,"Reset Password","To Reset Your Password Go to the link : \n	http://localhost/Gallus/www/php/resetPsswdForm.php?email=$email&token=$newToken"))
	echo "6";
}



?>
