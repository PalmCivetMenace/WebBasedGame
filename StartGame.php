
<html>
<head>
<meta name="viewport" content="width=device-width,target-densitydpi=medium-dpi,initial-scale=1.0,user-scalable=no">
		<title>
			Gallus
		</title>


	</head>
	
	<link rel="stylesheet" type="text/css" href="./css/Styling.css" >
	<link rel="stylesheet" type="text/css" href="./css/marquee.css">
	<body class="unselectable">
		<center>
		<table>
			<tr>
				<th>
					<img id="BI" class="unselectable2" draggable="false" src="BackImgMain1.png"></img>
				</th>

				<td style="width:350px">

					<!--	<embed src="Brixton Purpose.mp3" autostart="true" loop="true"/> -->
					<div id="container" class="centerUI">
						<img id="TutImg"  class="centerUI" style="display:none;" alt="Tutorial GIF" width="350" height="500">
<?php
session_start();
include 'php/dbcon.php';
$_king= getKingSaying($conn);
$kingName=$_king["user"];
$kingSaying=$_king["saying"];

/*echo "<table style='display:none' id='saying' class='bottom'><tr><td class='marqueeLabel'>$kingName Says</td><td><div class='marquee'><p>$kingSaying</p></div></td> </tr> </table>";*/
if(isset($_SESSION['loggedIn'])&&($_SESSION['loggedIn']==true))
{

$user=$_SESSION['user'];


echo "<button id='userMan' class='centerUI' style='display:none' onclick='showLogout()'>Hello $user</button>";
}
else 
{
echo "<button id='userMan' style='display:none' class='centerUI' onclick='showLogin()'>Login</button>";

}
?>

						<canvas id="Scene"  width="350" height="500"></canvas>
							<div id="Score" style="display:none" class="unselectable2">Score: 0</div>
						<button class="centerUI basicBtn" style="display:none" id="Play" onclick="Restart();">Play</button>
						<button style="display:none" class="centerUI basicBtn" id="Tutorial" onclick="runTutorial();">How to Play</button>
						<button class="basicBtn bottom" style="display:none" id="PrevImg" onclick="TutImgManager.ChangeImg(-1)">Previous</button>
						<button class="basicBtn bottom" style="display:none"  id="NextImg" onclick="TutImgManager.ChangeImg(+1)">Next</button>
						<button style="display:none" id="Retry"  class="centerUI basicBtn" onclick="showMainMenu()">Retry</button>
						
						<p style="display:none" class="centerUI unselectable2" id="LevelCount" >1</p>
						<img id="Logo" class="centerUI unselectable2" draggable="false" src="Logo.png">
					
						<div id="LoginArea" class="panel centerUI"style="display:none" >
						<form method="POST" action="./php/LoginPlayer.php">
						<table class="centerUI">
						<tr>
						<td>
						Email
						</td>
	`					<td>
						<input type="text" name="player_email" placeholder="Enter Your name here" required>
						
						</td>

						</tr>
						<tr>
						<td>
						Password
						</td>
	`					<td>
						<input type="password" name="player_psswd" placeholder="Enter Your Password here" required>
						
						</td>

						</tr>
						<tr>
						<td colspan="2">
						<input type="submit" class="basicBtn" value="Done">
						</td>
	`				
						</tr>
						</table>
						</form>				
						<a class="bottom basicBtn small horCenter" id="RegisterBtn"href="./php/RegisterForm.php">Or Register</a>	
						</div>
 					
	
							
						<div id="LogoutArea" class="panel centerUI"style="display:none" >
						<form method="POST" action="./php/ChangeSay.php">
						<table class="centerUI">
						<tr>
						<td>							Your Saying	
						</td>
	`					<td>
<textarea name="saying" placeholder=<?php echo "".$_SESSION['saying']."" ?>></textarea>
						
						</td>

						</tr>
												<tr>
						<td colspan="2">
						<input type="submit" class="horCenter small basicBtn" value="Change">
						</td>
	`				
						</tr>
						</table>

						</form>				
						<a class="horCenter bottom small basicBtn" id="LogoutBtn" href="./php/Logout.php">Logout</a>
						</div>

<div id="sayingArea" style="display:none">
 		</div>
					
<script src="Coding.js"></script>
				</td>

<!--
	<button style="display:none" id="Retry"  class="centerUI basicBtn" onclick=";">Retry</button>
	<p style="display:none" class="centerUI" id="LevelCount" >1</p>
	<img id="Logo" class="centerUI" src="Logo.png"></img>
	
	
	<button style="display:none" class="centerUI basicBtn"id="CreditBtn" onclick="showCredits()">Credits</button>
	<div style="display:none" class="centerUI" id="Credits">
	<span class="Head"> Credits </span>
	Done By :
	<br>
	
	<br>	
	Music From www.jukedeck.com
	 </div> 
	</div> -->
	




				<th>
					<img id="BI" class="unselectable2" draggable="false" src="BackImgMain2.png"></img>
				</th>
			</tr>
		</table>
		</center>
	</body>

</html>

<?php

mysqli_close($conn);
?>
