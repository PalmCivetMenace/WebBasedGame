<?php
session_start();
include 'dbcon.php';
include 'header.php';

include  'footer.php';
$name = $_POST['player_name'];
$email= $_POST['player_email'];
$unhashedpsswd= $_POST['player_psswd'];
$saying=$_POST['player_saying'];
$hashedpsswd=password_hash("$unhashedpsswd",PASSWORD_DEFAULT);


/*
password_verify($input,$dbpass);
*/


/*
*/


$checkEmail="SELECT email FROM $playerTable WHERE email=?";

$checkName="SELECT email FROM $playerTable WHERE nickname=?";


$insertQuery="INSERT INTO $playerTable VALUES(?,?,?,'',?)";
//----------------------------------------------------------
if(!$stmt= $conn->prepare($checkEmail)){

echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;

}

$stmt->bind_param("s",$email);

$stmt->execute();

$result=$stmt->get_result();
if($result->num_rows>0)
{
die ("The Email $email is Already in use");
}




//------------------------------------------------------------
if(!$stmt= $conn->prepare($checkName)){

echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;

}


$stmt->bind_param("s",$name);
$result=$stmt->execute();

$result=$stmt->get_result();
if($result->num_rows)
{
	
die ("The $name Nick Name is  Taken");
}
//-----------------------------------------------------------
if(!$stmt= $conn->prepare($insertQuery) ){

echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;

}


$stmt->bind_param("ssss",$email,$name,$hashedpsswd,$saying);
//? acts like tokens
// s for string
$result=$stmt->execute();

if($result){
echo '<h1> Welcome </h1>';
$_SESSION['loggedIn']=true;
$_SESSION['user']=$name;

$_SESSION['email']=$email;
$_SESSION['saying']=$saying;
}
else
{
echo'Sorry<br>Failed to add You as a Player';

}

echo "<a class='centerUI basicBtn' href='../StartGame.php'>Play</a>"

?>


