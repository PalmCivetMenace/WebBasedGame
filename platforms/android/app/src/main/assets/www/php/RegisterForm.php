<?php
session_start();

include 'header.php';

?>

<form name="Register" method="POST" action="newPlayer.php" onsubmit=" return Validate()">
	<table class="centerUI" >
 
	<tr>	
		<td>
		Email
		</td>
		<td>
		 *<input type="text" name="player_email" placeholder="Enter your nick name here" required>		
		</td>
	</tr>	 
	<tr>
		<td>
		Nick Name
		</td>
		<td>
		 *<input type="text" name="player_name" placeholder="Enter your nick name here" required>
		</td>
	</tr>	
	<tr>	
		<td>
		Password
		</td>
		<td>
		 *<input type="password" name="player_psswd" placeholder="Enter your Password here" required minlength="5">		
		</td>
	</tr>	 
	<tr>	
		<td>
		Confirm Password
		</td>
		<td>
		 *<input type="password" name="player_psswd_2" placeholder="Enter your Password Again" required minlength="5">		
		</td>
	</tr>	 
	<tr>	
		<td>
		Saying
		</td>
		<td>
		 <textarea type="password" name="player_saying" cols="20" rows="5" maxlength="256" placeholder="If you get HighScore Everyone will see this what you type here !"></textarea>		
		</td>
	</tr>	 


	<tr>
		<td colspan="2">
			<input type="submit" class="basicBtn" value="Done">
		</td>
	</tr>
	</table>
	</form>
<script>
function Validate(){
form=document.forms["Register"];
name=form["player_name"].value;



if(name=""){
alert('Name cant be false');

return false;
}
psswd= form['player_psswd'].value;
psswd_2=form['player_psswd_2'].value;

if(psswd!==psswd_2){
alert("Passwords Do not match");
return false;
}
email = form['player_email'].value;
if(email.indexOf('@')<0||email.indexOf(".com")<0){

alert('Wrong Email address');
return false;
}


}
</script>

<?php include 'footer.php'?>
