<?
session_start();
include 'header.php';
include 'dbcon.php';
include 'footer.php';
$playerTable='Player';

$email=$_POST['player_email'];
$psswd=$_POST['player_psswd'];

$checkEmail="SELECT psswd FROM $playerTable WHERE email=? ";

if(!$stmt= $conn->prepare($checkEmail)){ 
 
echo "Prepare failed: (" . $conn->errno . ") " . $conn->error; 
 
}
$stmt->bind_param("s",$email);
$stmt->execute();
$result=$stmt->get_result();


if(($result->num_rows>0)&&password_verify($psswd,$result->fetch_assoc()["psswd"]))
{

$DetailsQuery= "SELECT * FROM $playerTable WHERE email=?";
if(!$stmt= $conn->prepare($DetailsQuery)){ 
 
	echo "Prepare failed: (" . $conn->errno . ") " . $conn->error; 
 
}
	$stmt->bind_param("s",$email);
	$stmt->execute();
	$result=$stmt->get_result();
	while($row=$result->fetch_assoc())
	{$_SESSION['user']=$row["nickname"];
	$_SESSION['email']=$row["email"];
	$_SESSION['saying']=$row["saying"];
	$_SESSION['loggedIn']=true;
	
	}
		echo "<a class='centerUI basicBtn' href='../StartGame.php'>Play</a>";

}
else {

die ("Either Email or Pssword in Invalid");
}
?>



