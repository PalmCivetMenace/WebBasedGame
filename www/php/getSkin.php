<?php
include 'dbcon.php';
$num= $_GET["num"];
$query="SELECT link FROM Skins WHERE id=$num";
$result=mysqli_query($conn,$query);
$path;
while($row=mysqli_fetch_assoc($result))
{
$path = $row["link"];
}

$handle=fopen($path,"r");
$contents=fread($handle,filesize($path));
fclose($handle);
echo $contents;
?>
