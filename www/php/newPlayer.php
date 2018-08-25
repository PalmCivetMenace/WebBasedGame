<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
session_start();
include 'dbcon.php';
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


$insertQuery="INSERT INTO $playerTable VALUES(?,?,?,'',?,1)";
//----------------------------------------------------------
if(!$stmt= $conn->prepare($checkEmail)){


die("3");
}

$stmt->bind_param("s",$email);

$stmt->execute();

$result=$stmt->get_result();
if($result->num_rows>0)
{
die ("1"); //email in use
}




//------------------------------------------------------------
if(!$stmt= $conn->prepare($checkName)){

die("3");
}


$stmt->bind_param("s",$name);
$result=$stmt->execute();

$result=$stmt->get_result();
if($result->num_rows)
{
	
die ("2"); // name in use
}
//-----------------------------------------------------------
if(!$stmt= $conn->prepare($insertQuery) ){

die("3");

}


$stmt->bind_param("ssss",$email,$name,$hashedpsswd,$saying);
//? acts like tokens
// s for string
$result=$stmt->execute();

if($result){
echo("7"); // ADDED PLAYER
}
else
{
echo'4'; //Failed to add

}

?>


