<?php include 'dbcon.php';
$selectQuery="SELECT Score FROM LeaderBoard ORDER BY Score DESC LIMIT 1";

$result = mysqli_query($conn,$selectQuery);
while($row=$result->fetch_assoc()){
echo $row["Score"];
}
?>

