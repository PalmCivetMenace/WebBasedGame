<?php
$server='localhost';
$user='root';
$psswd='';
$db='GallusDB';
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
