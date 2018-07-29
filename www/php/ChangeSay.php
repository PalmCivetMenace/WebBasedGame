<?php
session_start();
include 'header.php';
include 'dbcon.php';
include 'footer.php';
$email=$_SESSION['email'];

?>

<h1>Saying</h1>

<?php
$newsaying=$_POST['saying'];
$updateQuery="UPDATE Player SET saying=? WHERE email=?";
if(!$stmt=$conn->prepare($updateQuery))
{
echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
}
$stmt->bind_param("ss",$newsaying,$email);
$result=$stmt->execute();
if($result)
{
	
	$_SESSION['saying']= $newsaying;
	echo "<p >Your new saying is <span><b>$newsaying</b></span></p>";

	echo "<a class='centerUI basicBtn' href='../StartGame.php'>Play</a>";
}
else 
{
	echo "Failed To Add Change Your Saying";
}



