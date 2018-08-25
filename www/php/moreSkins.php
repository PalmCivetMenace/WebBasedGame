<?php
include 'dbcon.php';
$query="SELECT MAX(id) FROM Skins";
$result=mysqli_query($conn,$query);
while($row=mysqli_fetch_assoc($result))
{
echo $row["MAX(id)"];

}




?>
