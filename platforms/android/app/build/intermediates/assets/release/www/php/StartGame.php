<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

include "access.php";
session_start();
include 'dbcon.php';
$_king= getKingSaying($conn);
$kingName=$_king["user"];
$kingSaying=$_king["saying"];

/*echo "<table style='display:none' id='saying' class='bottom'><tr><td class='marqueeLabel'>$kingName Says</td><td><div class='marquee'><p>$kingSaying</p></div></td> </tr> </table>";*/
if(isset($_SESSION['loggedIn'])&&($_SESSION['loggedIn']==true))
{

$user=$_SESSION['user'];

echo "1||$user";


}
else 
{

echo "0||null";
#echo "<button id='userMan' style='display:none' class='centerUI' onclick='showLogin()'>Login</button>";
}
?>
