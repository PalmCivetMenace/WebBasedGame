<?php
$findSkins="SELECT Skin_id FROM Player_Skins WHERE email='$email'";
$res= mysqli_query($conn,$findSkins);
while($r=mysqli_fetch_assoc($res))
{
	echo $r["Skin_id"];
	echo ",";
}



?>
