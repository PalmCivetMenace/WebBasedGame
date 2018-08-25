<?php
include "dbcon.php";

$Sel=$_GET["Sel"];
$email=$_GET["email"];

$query="INSERT INTO Player_Skins VALUES('$email',$Sel)";
mysqli_query($conn,$query);

header("Location:./ChangeSelec.php?Sel=$Sel&email=$email");


?>
