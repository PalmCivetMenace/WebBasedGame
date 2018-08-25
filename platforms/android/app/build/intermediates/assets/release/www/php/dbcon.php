<?php

	
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache"); 
#The above code is for prevent caching

$server='localhost';
//$user='id6388800_chamathinfotech_gallusdb';
$user='root';
//$psswd='GallusDB123';
$psswd="";
//$db='id6388800_gallusdb';
$db="GallusDB";
$playerTable="Player";


$conn= new mysqli($server,$user,$psswd,$db);
// new way of connecting
if($conn){

}
else {
die('Failed to connect');
}

function getKingSaying($conn){
$selectQuery="SELECT P.nickname,P.saying FROM Player AS P JOIN LeaderBoard AS L ON P.email=L.email ORDER BY L.Score DESC LIMIT 1";

$result = mysqli_query($conn,$selectQuery);
while($row=$result->fetch_assoc()){
return array("saying"=>$row["saying"],"user"=>$row["nickname"]);
}
}





?>
