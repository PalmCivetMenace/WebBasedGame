<?php
session_start();
 include 'dbcon.php';
include 'header.php';
$email=$_GET["email"];
$_SESSION["email"]=$email;
$token=$_GET["token"];

$checkEmail="SELECT email FROM $playerTable WHERE email=? AND token=?";
if(!$stmt=$conn->prepare($checkEmail))
{

die("3");
}
$stmt->bind_param("ss",$email,$token);

$stmt->execute();

$result=$stmt->get_result();
echo "<div class='panel' ><div class='centerUI'>" ;
if($result->num_rows<1)
{
        die("<h1>Invalid URL</h1><p> Check Your Link </p> ");
echo "</div></div>";
include'footer.php';
}
echo"<form action='./resetPsswd.php' method='POST'>
<table>
	<tr>
		<td>New Password</td>
		<td><input type='password' name='psswd' placeholder='Enter your new password here'>	
	</tr>
		
	</tr>		<th colspan='2'><input class='basicBtn'
type='submit' value='OK'></th>
	
	</tr>
</table>
</form>
";
echo "</div></div>";
include'footer.php';
?>

