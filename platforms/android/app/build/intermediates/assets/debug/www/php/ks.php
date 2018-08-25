<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

include 'dbcon.php';

$selectQuery="SELECT L.Score,P.nickname,P.saying FROM Player AS P JOIN LeaderBoard AS L ON P.email=L.email ORDER BY L.Score DESC LIMIT 1";

$result = mysqli_query($conn,$selectQuery);
while($row=$result->fetch_assoc()){
echo $row["nickname"]."||".$row["Score"]."||".$row["saying"];

}


?>
