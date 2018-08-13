flys///-------------------INIT 1
// (REMOVE LogoEnd() in the end of the script from the final build)
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
 
	console.log("YEEEP",check);
 return check;

};
//----------------------LOAD PLUGINS
var Cordapp = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
	LogoEnd();// Begins to end only after plugins are loaded
	console.log("YEEP");
	needPermission();
    }
};

Cordapp.initialize();

//----------------------PERMISSIONS


var isApp=false;
var permissions;

function needPermission(){
var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
if ( app ) {
   isApp=true;
	
permissions = cordova.plugins.permissions;
permissions.hasPermission(permissions.INTERNET, function( status ){
  if ( !status.hasPermission ) {
	if(sessionStorage.getItem("setperm")==null||sessionStorage.getItem("setperm")==false){
	sessionStorage.setItem("setperm",true);
	askPermissions();
		}
	else{
		haveInternetPerm=false;
		}
	
  }
else {
haveInternetPerm=true;

}
});	
}

 else {
console.log("Not an App");
isApp=false;
}  
}
function askPermissions()
{

	permissions.requestPermissions(permissions, GoBack,GoBack);
}
//-----------------CHECK PERMISSION
function checkInternetPerm(){
if((isApp)&&(!haveInternetPerm))
{
return false;
}
return true;

}
//-------------DECLARE
function $(x){return document.getElementById(x);}

var mobileCheck=window.mobilecheck();
const container=$("container");
const height= window.innerHeight;
const ratio=4/7;
 container.style.height = height; 
 container.style.width  =height*ratio;
const canvas= $("Scene");
 canvas.height = height; 
 canvas.width  = height*ratio;
const scene= canvas.getContext('2d');
const retry = $("Retry");
const backBtn=$("BackBtn");

const ScoreText=$("Score");
const CoinText=$("Coins");
const playBtn= $('Play');
const TutBtn= $('Tutorial');
const TutImg=$('TutImg');

const TutImgDiv=$('TutImgDiv');

const sayingArea=$('sayingArea');
const LoginBtn=$('userMan');
const LoginArea=$('LoginArea');
const RegisArea=$('RegisterArea');
const ForgotArea=$('ForgotArea');
const Logo = $("Logo");
const nextImg=$('NextImg');
const prevImg=$('PrevImg');

var highScore=localStorage.getItem("HighScore");
var isGameOver=true;  // So that immediately the game will not start working ...
if(highScore==null){	// This runs only once .. The first time the game is opened
localStorage.setItem("HighScore",0);
}
var LevelCounter=$("LevelCount");
var level=1;
var isGamerOver=true;
var lastRender=0;
var shotFrog=false;
var numberOfPlats=3;
var Score;
var Coins;
var fingerPos=[];
//TutImg.style.left=document.body.clientWidth/2-canvas.width/2;
/*TutBtn.style.left=document.body.clientWidth/2;
playBtn.style.left=document.body.clientWidth/2;
retry.style.left=document.body.clientWidth/2;
*/
//-----------------OBJECT CREATION
function _frog(w,h){

this.width=w;
this.height=h;
this.image= "frog.svg";
this.x;
this.y;
this.speed=.001; //>> Tweak This
this.Velx=this.speed;
this.Vely=this.speed;

this.DeathSpeed=0.005;
this.savedX=0;
this.savedY=0;
this.calVel=function(x,y){
forceX=(this.savedX)-x+(document.body.clientWidth)/2-(canvas.width/2);
forceY=this.savedY-y;

//console.log(x,y,forceX,forceY);
this.Velx=this.speed*forceX;
this.Vely=this.speed*forceY;
return [this.Velx,this.Vely];
//console.log(forceX,forceY);
//console.log(Math.atan(forceX/forceY)*180/Math.PI);
}
this.folVelx=0;
this.folVely=0;
this.resis=.01;
this.img = new Image();
}
function _fly(x,y,Vely){

var flyImgs=[
[20,20,"plat_2.png"],
[20,20,"plat_2.png"],
[20,20,"plat_3.png"],
];

// Explaination = [width:20,height:100,image:"plat_2.png"] 

this.img = new Image();

var randfly= Math.floor(rand(0,flyImgs.length));

this.width=flyImgs[randfly][0];
this.height=flyImgs[randfly][1];
this.image=flyImgs[randfly][2];
this.x=x;
this.y=y;
this.Velx=0;
this.Vely=Vely;
this.Jitter=0.04;
}
function _BackG(){

this.width=canvas.width;
this.height=canvas.height;
this.image= "BackG.png";
this.x=0;
this.y=0;

this.img = new Image();
}

function _Plat(x,y,Vely){

this.floating=true;

var platforms=[
[65,46,"plat_2.png"],
[60,47,"plat_2.png"],
[44,28,"plat_3.png"],
];

// Explaination = [width:20,height:100,image:"plat_2.png"] 

this.img = new Image();

var randplat= Math.floor(rand(0,platforms.length));

this.width=platforms[randplat][0];
this.height=platforms[randplat][1];
this.image=platforms[randplat][2];
this.x=x-this.width/2;
this.y=y;
this.Velx=0;
this.Vely=Vely;

this.FlipOver=function(){
this.floating=false;
this.image="flip.png";


}


}
//----------- GUIDE
function _Guide(x,y){
this.x=x;
this.y=y;
this.width=5;
this.height=5;
this.image="bubble.png";
this.img=new Image();
}
function initGuides(length){
for(i=0;i<length;i++)
{
Guides.push(new _Guide(-100,-100));
}


}
//------------- AUDIO
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
	
    this.loop = function(){
	 this.sound.setAttribute("loop","true");
		this.sound.play();
	
	}
} 
//--------------MOVE OBJECTS
function move(obj,dt){
obj.x+= obj.Velx*dt;
obj.y+= obj.Vely*dt;
}
function jitter(obj,dt){
obj.x+=rand(-obj.Jitter,obj.Jitter)*dt;
}
function follow(dt)
{
frog.x+=frog.folVelx*dt;
frog.y+=frog.folVely*dt;
}

function airResis(){
frog.Vely-=frog.Vely*frog.resis;
frog.Velx-=frog.Velx*frog.resis;
}

//-------------- GAME OVER
function isDrowned(Velx,Vely){
if((Math.abs(Velx)<frog.DeathSpeed)&& (Math.abs(Vely)<frog.DeathSpeed)){
frog.Velx=0;
frog.Vely=0;
GameOver();
}
}

function isOutOfBounds(){
if(frog.x>canvas.width||(frog.x+frog.width)<0||(frog.y+frog.height)<0||frog.y>canvas.height){
GameOver();

}}
function GameOver(){
hideUI(LevelCounter);
unhideUI(sayingArea);
splash.play();

showKingMsg();
isGameOver=true; // gameOverScreen is checked in deltaTimeCal
unhideUI(retry);
FinalScoreDisplay(isNewHighScore());
}
function _gameOverScreen(){

this.image="gameOverImg.png";
this.height=canvas.height;
this.width=canvas.width;
this.x=0;
this.y=0;
this.img=new Image();
this.show=function(){
drawObjINIT(this);
}
}
//-------------PLAYER
function _player(){
this.name=sessionStorage.getItem("name");

this.saying=sessionStorage.getItem("saying");

this.email=localStorage.getItem("email");
this.psswd=localStorage.getItem("psswd");
}
player= new _player();

//-------------BACK BTN

function GoBack(){
window.location.reload();
}
//------------- CHECK LOGIN
function isLoggedIn(data)
{			//Call this every time you go to the main menu
if(!checkInternetPerm)
{
showLogBtn("permission");
return 0;

}
	if(navigator.onLine)
	{
	wasLoggedIn();	
	}
	else
	{	
	console.log("NOT Connected");
	showLogBtn("offline");
	}


}


function wasLoggedIn(){
if(player.email==null||player.email=="null"||player.psswd==null||player.psswd=="null")
	{
	
console.log(player.email,player.psswd);
	showLogBtn("Login");	
		return 0 ;	
	}
LoginAjax(player.email,player.psswd);
}
//---------------LOGIN
function showLogin(){

unhideUI(backBtn);
unhideUI(LoginArea);
}
function Login(){
form=document.forms["LoginForm"];
email=form["player_email"].value;
psswd=form["player_psswd"].value;
LoginAjax(email,psswd);
}
unset_email="";
unset_psswd="";
function LoginAjax(email,psswd){
data="player_email="+email+"&player_psswd="+psswd;
unset_email=email;
unset_psswd=psswd;
ajaxPOST("./php/LoginPlayer.php",_Login,data);

}
function _Login(response){
resArray=response.split("||");
switch(resArray[0]){
case "3":case "\n3":
alert("The information you have provided is invalid");
break;
case "4":case "\n4":
alert("Email Or Password in incorrect");
showLogBtn("Login");
break;
default:
player.email=unset_email;
player.psswd=unset_psswd;
localStorage.setItem("email",unset_email);
localStorage.setItem("psswd",unset_psswd);
player.name=resArray[1];
sessionStorage.setItem("name",resArray[1]);
hideUI(LoginArea);
hideUI(backBtn);
showLogBtn("Logged");
getSaying();
}
}
//--------------LOGIN,LOGOUT,OFFLINE
function showLogBtn(i){
switch (i){
case "Logged":
LoginBtn.innerHTML="<div onclick='showLogout()'>"+player.name+"'s Profile</div>   <div  class='horCenter small basicBtn' id='LogoutBtn' onclick='LogOut()'>Logout</div>";


break;
case "offline":
	LoginBtn.innerHTML="<p class='centerUI'>You are offline</p>";
break;
case "Login":

	LoginBtn.innerHTML="<div onclick='showLogin()'>Login</div>";
break;
case "permission":
	
	LoginBtn.innerHTML="<div onclick='askPermissions()'>Grant Internet Permission</div>";
break;
}
}
//--------------LOGOUT
function showLogout(){
unhideUI(backBtn);
unhideUI(LogoutArea);

getSaying();
}
function LogOut(){
ajaxGET("./php/Logout.php",_errorHandle);
localStorage.setItem("email",null);
localStorage.setItem("psswd",null);
localStorage.setItem("name",null);
}
//---------------REGISTER
function showRegis(){
unhideUI(RegisArea);

unhideUI(backBtn);

}

function ValRegis(){
form=document.forms["Register"];
name=form["player_name"].value;

if(name==""){
alert('Please Give A Nick Name');

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

saying=form["player_saying"].value;
addPlayer(name,psswd,email,saying);
}

function addPlayer(name,psswd,email,saying)
{
unset_email=name;
unset_psswd=psswd;
data="player_name="+name+"&player_email="+email+"&player_psswd="+psswd+"&player_saying="+saying;
ajaxPOST("./php/newPlayer.php",_errorHandle,data);
}
//--------------------------Change Password
function showForgot(){

unhideUI(backBtn);
unhideUI(ForgotArea);

}

function sendEmail(){

email= document.forms["Forgot"]["player_email"].value;
data="email="+email;

ajaxPOST("./php/newToken.php",_errorHandle,data);
}


//--------------------------ERROR HANDLE
function _errorHandle(response)
{

switch(response)
{
case "0":
alert("Failed");
break;
case "1":case "\n1": 
alert("That email is already in use");
break;
case "2":case "\n2":
alert("Sorry That username is taken");
break;
case "3":case "\n3":
alert("The information you have provided is invalid");
break;
case "4":case "\n4":
alert("Email Or Password in incorrect");
break;
default : 
GoBack();
break;
case "5":case "\n5":
alert("Wrong Email Address");
break;
case "6":
r=confirm("Sent Reset Password mail");
if(r==true){
GoBack();
}
break;
case "7":case "\n7":

GoBack();
player.email=unset_email;
getSaying();
player.psswd=unset_psswd;
localStorage.setItem("email",unset_email);
localStorage.setItem("psswd",unset_psswd);
LoginBtn("Logged");
break;
}

console.log(response);

}
//---------------GetCurrentSaying
function getSaying(){
console.log("email=" +player.email);
ajaxGET("./php/getVal.php?email="+player.email+"&val=saying",_getSaying);
}
function _getSaying(response){
document.forms["ChangeSayForm"]["saying"].placeholder=response;

document.forms["ChangeSayForm"]["saying"].value=response;
player.saying=response;
sessionStorage.setItem("saying",response);
}
//---------------CHANGING Saying
function ChangeSay()
{
form=document.forms["ChangeSayForm"];
newSaying= form["saying"].value;
if(newSaying=="")
{
alert("The Value is Empty");
return false;
}
link="./php/ChangeSay.php?email="+player.email+"&saying="+newSaying;
ajaxGET(link,_errorHandle);
}

//--------------- LEVEL TRANSITION

function newLevel(){
	unhideUI(LevelCounter);
Spawns.Faster();
level++;
LevelCounter.innerHTML=level.toString();
maxLevelScore*=2;
showLevel=true;
}

function opacity(element,val){
element.style.opacity=val;
}

function ResetLevel()
{
maxLevelScore=5;
level=1;
LevelCounter.innerHTML=level.toString();
}

//--------------- RESTART GAME

function Restart(){

gameTheme.loop();
hideUI(sayingArea);
hideUI(retry);
hideUI(playBtn);
hideUI(TutBtn);
hideUI(TutImgDiv);
hideUI(LoginBtn);
hideUI(backBtn);
unhideUI(ScoreText);
unhideUI(CoinText);
unhideUI(LevelCounter);
ToggleScore(false);
showLevel=true;
isGameOver=false;
frog.x=canvas.width/2-frog.width/2;
frog.y=canvas.height/2;
frog.savedX=frog.x;
frog.savedY=frog.y;

frog.folVelx=0;
frog.folVely=0;
shotFrog=false; // this is only false at initialization
lastRender=0;
ResetScore();
ResetCoins();
ResetLevel();
Spawns.ResetSpeed();
op=0;
requestAnimationFrame(deltaTimeCal); // >>> Implement a time based system for this
}

//------------- SHOW TUTORIAL
function runTutorial(){
unhideUI(backBtn);
playBtn.style.top=20;
hideUI(TutBtn);
unhideUI(TutImgDiv);
}

function TutImgSrc(){
	
	
 	this.TutImageSrc=["TutImg_1.png","TutImg_2.png","TutImg_3.png","TutFinal.png"];

	this.imgNum=0;

	this.Display=function(){
	
	TutImg.src=this.TutImageSrc[this.imgNum];

	}
	
	this.Display();
	
	this.ChangeImg=function(set){		
	
		if(set<0){
		if((this.imgNum!=0)){
		
			nextImg.innerHTML="Next";		
		this.imgNum+=set;
		this.Display();
		}
		}

		else {
		if(this.imgNum<this.TutImageSrc.length-1)
		{
		this.imgNum+=set;
		this.Display();
		}
		else{
		Restart();	
		}
		 if(this.imgNum==this.TutImageSrc.length-1)
		{
			
			nextImg.innerHTML="Play";		
		}
		}
	}		
}

//------------- SHOW MAIN MENU
function showMainMenu(){
hideUI(backBtn);
isLoggedIn();
showKingMsg();

hideUI(ScoreText);
hideUI(CoinText);
hideUI(LoginArea);
hideUI(RegisArea);
clearScene();
playBtn.style.top=canvas.height/2;
hideUI(retry);
unhideUI(playBtn);
unhideUI(TutBtn);
unhideUI(sayingArea);
unhideUI(LoginBtn);
img= new Image();
img.onload=function(){
scene.drawImage(img,0,0,canvas.width,canvas.height);
}
img.src="MenuBackG.png";
}

//--------------SPAWN PLATS

function _Spawns(){

this.spawnPoints=[];
	for(i=0;i<numberOfPlats;i++)
	{	
	xPos=(i/numberOfPlats*canvas.width)+(1/numberOfPlats*canvas.width)/2;
	this.spawnPoints.push([xPos,-10,0]); //<<< Tweak This
	// Syntax : [x:xPos,y:10,waitTime:0]
		
	}
this.secondCounter=0;
this.minWait=3;
this.maxWait=2;

this.minVely; // increase with player Progress
this.maxVely;

this.timeSpawn=TimeSpawn;
this.Faster=function(){

	this.minVely+=this.minVely*.2;	

	this.maxVely+=this.maxVely*.2;	
	}
	this.ResetSpeed=function()
	{
	this.minVely=0.05; // increase with player Progress
	this.maxVely=0.09;
	}

	this.newObj=function(x,y,Vely){
	Plats.push(new _Plat(x,y,Vely));
}

	this.ResetSpeed();
}
function _flySpawn(){
numOfFlySpawn=numberOfPlats-1;
this.spawnPoints=[];
	for(i=0;i<numOfFlySpawn;i++)
	{	
	xPos=(i/numOfFlySpawn*canvas.width)+(1/numOfFlySpawn*canvas.width)/2;
	this.spawnPoints.push([xPos,-10,0]); //<<< Tweak This
	// Syntax : [x:xPos,y:10,waitTime:0]
		
	}
this.secondCounter=0;
this.minWait=5;
this.maxWait=4;
this.x;
this.y;
this.minVely=0.1;
this.maxVely=0.1; //<<TWEAK THIS
this.timeSpawn=TimeSpawn;
this.newObj=function(x,y,Vely){
	flys.push(new _fly(x,y,Vely));
}


}
//Spawning Timer
function TimeSpawn(dt,waitTime){

this.secondCounter+=dt
	if(this.secondCounter>waitTime)
	{

 		this.secondCounter=0;
		this.turn= Math.floor(rand(0,this.spawnPoints.length));
		this.turnCounter=0;

		this.spawnPoints.forEach(function(spawn)
		{
		
		if(--(spawn[2])<0)
		{
			
		if(this.turnCounter==this.turn){				
		spawn[2]= rand(this.minWait,this.maxWait);
		this.newObj(spawn[0],spawn[1],rand(this.minVely,this.maxVely));
		//console.log(Plats);
		}
		this.turnCounter++;
		}
	
		}.bind(this) // SOMETHING NEW !!!
		);
	}
}
		
//--------------MEMORY MANAGEMENT
function freeMemory(Obj,i){ // deletes platform when it is no longer in view
if(Obj[i].y>canvas.height)
{
Obj.splice(i,1);
return true;
}
return false;
}

//--------------RANDOM
function rand(min,max){
	range=max-min;
return (min+Math.random()*range);
}

//-------------- RENDER STUFF
function drawObjINIT(obj){ // SLOW METHOD (Some functions still uses this)

var img = new Image();
img.onload=function(){
scene.drawImage(img,obj.x,obj.y,obj.width,obj.height);
}
img.src=obj.image;
}

function drawObj(obj){ 		//FASTER METHOD
//console.log(obj.image);
scene.drawImage(obj.img,obj.x,obj.y,obj.width,obj.height);

obj.img.src=obj.image;

}

function clearScene(){ // Simply Redraws the background
	drawObj(BackG);

}
//-------------COLLISION DETECTION

function isColliding(a,b){   // b=frog, a=plat/fly

if((a.x+a.width/2)>b.x && (a.x+a.width/2)<(b.x+b.width)&&(a.y+a.height/2)>b.y && a.y<(b.y+b.height)){

console.log("YEEEEP");
return true;
}
else {return false;}


}
//------------------COIN MANAGEMENT
function AddCoins(){
Coins++;
CoinText.innerHTML="Flys : "+ Coins;
}
function ResetCoins(){
Coins=0;
ScoreText.innerHTML="Score : "+0;

}

//------------------ SCORE MANAGEMENT
function AddScore(){
var increment=1;
Score+=increment;

ScoreText.innerHTML="Score : "+Score;
}
function ResetScore(){
Score=0;
ScoreText.innerHTML="Score : "+0;

}

function isNewHighScore(){

isNewKing();
if(Score>localStorage.getItem("HighScore")){
console.log("New High Score");
localStorage.setItem("HighScore",Score);
highScore=Score;
return true;
}
else {
return false;
}



}
function FinalScoreDisplay(isHighScore){

ToggleScore(true);
if(isHighScore){
ScoreText.innerHTML="<b>New</b>Your Personal Best <br> "+ Score;
}
else{

ScoreText.innerHTML="Your Score is "+Score+"<br>Your Personal Best "+ highScore;
}

}

function ToggleScore(isBig)
{
if(isBig)
{



ScoreText.classList.add("BigScore");

//ScoreText.classList.add("centerUI");
ScoreText.classList.remove("SmallScore");
}
else 
{

//ScoreText.classList.remove("centerUI");

ScoreText.classList.remove("BigScore");
ScoreText.classList.add("SmallScore");
}
}
//-----------------KING
function showKingMsg(){
if(checkInternetPerm())
{
ajaxGET("./php/ks.php",_showKingMsg);
}
}
function _showKingMsg(response){
details=response.split("||");
makeMsg(details);
console.log(details);
}

function isNewKing(){
ajaxGET("./php/Highest.php",_isNewKing);
}
function _isNewKing(response)
{

if(Score>parseInt(response)){
console.log("Congrats");
ajaxGET("./php/newHigh.php?email="+player.email+"&Score="+Score,newKing);
}

}
function newKing(response){
console.log(response);
if(response)
{ScoreText.innerHTML="Nice .. Current Highest Score <br>"+Score;
showKingMsg();
}
}
function ajaxPOST (link,func,data){
var xmlhttp= new XMLHttpRequest();
xmlhttp.onreadystatechange=function(){
if(this.readyState==4&&this.status==200){
console.log(this);
func(this.responseText);
}
}
xmlhttp.open("POST",link,true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(data);
}
function ajaxGET(link,func){
var xmlhttp= new XMLHttpRequest();
xmlhttp.onreadystatechange=function(){
if(this.readyState==4&&this.status==200){

func(this.responseText);
}
}
xmlhttp.open("GET",link,true);
xmlhttp.send();
}

function makeMsg(King){
console.log(King[2]);
output ="<table id='saying'><tr><td class='marqueeLabel'>"+King[0]+" :  "+King[1]+" Says</td><td><div class='marquee'><p id='marqP'>"+King[2]+"</p></div></td><tr></table>";
sayingArea.innerHTML=output;
$('marqP').style.animationDuration=(King[2].length*.6)+"s";

}
//------------------DESKTOP INPUT
var isDragging=false;

document.onmousedown= function(event){		
if(!mobileCheck){
	inputDown();
	
		}

	};
document.onmouseup =function(event){

if(!mobileCheck){
inputUp(event.clientX,event.clientY);
}
};
document.onmousemove=function(event){

if(!mobileCheck){
inputDrag(event.clientX,event.clientY);
}
};
//-------------------------------------MOBILE INPUT
document.querySelector('canvas').addEventListener('touchstart',touchDown,false);
document.querySelector('canvas').addEventListener('touchend',touchUp,false);
document.querySelector('canvas').addEventListener('touchmove',touchDrag,false);
//document.querySelector('canvas').addEventListener("touchstart",Restart);

 fingerPos["x"]=0;
 fingerPos["y"]=0;
function touchDown(event){
	
if(mobileCheck){
event.preventDefault();

console.log(event.touches);
	inputDown();
}

}
function touchUp(event){

if(mobileCheck){
event.preventDefault();

console.log(event.touches);
inputUp(fingerPos.x,fingerPos.y);
}
}
function touchDrag(event){

if(mobileCheck){
event.preventDefault();

console.log(event.touches);
inputDrag(event.touches[0].clientX,event.touches[0].clientY);

fingerPos.x=event.touches[0].clientX;
fingerPos.y=event.touches[0].clientY;
}
}


//---------------------------------- INPUT ACTION
function inputDown(){	

if(!isGameOver)
		{
			console.log(isDragging);
			isDragging=true;
	
		/*

		frog.savedX=frog.x;

		frog.savedY=frog.y;//This is so that the guiding does change when the frog goes down
		*/	
				}


}
function inputUp(x,y){


if(isDragging&&!shotFrog)       // >>>>>>> isGrounded is needed so that frog is only launched when on a platform 
{
	console.log(x,y);
frog.calVel(x,y);
isDragging=false;
shotFrog=true;
jump.play();
}
for(i=0;i<Guides.length;i++){
Guides[i].x=-100; // So it is out of the viewport of the Player

Guides[i].y=-100;

}
}

function inputDrag(x,y)
{


if(!shotFrog&&isDragging){				
force= frog.calVel(x,y);

for(i=0;i<Guides.length;i++){
Guides[i].x= (frog.x+frog.width/2)+((i+1)*force[0]*100);

Guides[i].y=(frog.y+frog.height/2) +((i+1)*force[1]*100);

}
}


}
//------------------UPDATE
function deltaTimeCal(timeStamp){
	if(!isGameOver){
	var dt=timeStamp-lastRender;
	update(dt);
	lastRender=timeStamp;
	

	window.requestAnimationFrame(deltaTimeCal);
	}
	else{
		gameOverScreen.show();	
	}
}
var waitTimer=10;
var  counter=0;
var op=0;
function update(dt){
if(showLevel){
op+=.01;
opacity(LevelCounter,op);
if(op>1){
	hideLevel=true;
	showLevel=false;
	}
}
if(hideLevel){
op-=.01;
opacity(LevelCounter,op);
if(op<0){
hideLevel=false;

}
}


if(Score>=maxLevelScore){
newLevel();
}
clearScene();// Comes Before the frog as it should drawn under the frog
for(i=Plats.length-1;i>=0;i--){
	plat=Plats[i];
	move(plat,dt);
	drawObj(plat);
	freeMemory(Plats,i);
}
for(i=flys.length-1;i>=0;i--){
	fly=flys[i];
	move(fly,dt);
	jitter(fly,dt);
	drawObj(fly);
	if(!freeMemory(flys,i)) {// So we dont check Collision with one that has already been removed
	
	if(isColliding(fly,frog))
		{
		
		console.log("Coins hit");
		AddCoins();	
		flys.splice(i,1);
	
		}	
	}	
}


	if(shotFrog)
	{	// When clicked and released the shotFrog is made true
	move(frog,dt);
	airResis();
	
	isDrowned(frog.Velx,frog.Vely);

	isOutOfBounds();
	Plats.forEach(function(plat)
	{
	if(isColliding(plat,frog)&&plat.floating==true) {
	AddScore();
	stick.play();
	shotFrog=false;
	plat.FlipOver();
	
	frog.folVelx=plat.Velx; //So that the frog follows it
	frog.folVely=plat.Vely;	
	this.break;
	}
	});

	}
	else {	


	follow(dt);
	isOutOfBounds();
	}



drawObj(frog);
Spawns.timeSpawn(dt,1000);// Wait a second before spawing other leaf
flySpawn.timeSpawn(dt,1000);
for(i=0;i<Guides.length;i++){
drawObj(Guides[i]);

}
}

//-----------------------------UI
function hideUI(element){
element.style.display="none";
}
function unhideUI(element){
element.style.display="block";
}



//-----------------------------INIT 2
var frog= new _frog(64,48);
var BackG= new _BackG();
var Plats=[];
var flys=[];
var flySpawn= new _flySpawn();
var Spawns= new _Spawns();
var Guides=[]; //<<Tweak this
initGuides(10);
var maxLevelScore=5;
var gameOverScreen= new _gameOverScreen();
var TutImgManager= new TutImgSrc(); 
gameTheme= new sound("Purple Pardon.mp3");
splash=new sound("splash.mp3");
stick = new sound("Stick.wav");
jump = new sound("Jump.wav");
isGameOver=true;
showLevel=true;
hideLevel=false;

//------------------------ LOGO LOAD
function LogoEnd(){
//console.log(Logo.style.animationDuration);
setTimeout(function () {
       showMainMenu();
	Logo.style.display="none";
    },4000);
}
//console.log(Logo.style.animation-duration);
LogoEnd(); // REMOVE FROM FINAL BUILD !!!!!!!!!!!!!!!!!!!!!!!
