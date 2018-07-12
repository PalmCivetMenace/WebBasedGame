///-------------------INIT 1
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
 
	console.log("YEEEP",check);
 return check;

};


function $(x){return document.getElementById(x);}
var mobileCheck=window.mobilecheck();
const canvas= $("Scene");
const scene= canvas.getContext('2d');
const retry = $("Retry");

const ScoreText=$("Score");
const playBtn= $('Play');
const TutBtn= $('Tutorial');
const TutImg=$('TutImg');

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


function _BackG(){

this.width=canvas.width;
this.height=canvas.height;
this.image= "BackG.png";
this.x=0;
this.y=0;

this.img = new Image();
}

function _Plat(x,y,Vely,Velx){

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

splash.play();

isGameOver=true; // gameOverScreen is checked in deltaTimeCal
retry.style.display="block";
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

hideUI(nextImg);
hideUI(prevImg);
hideUI(retry);
hideUI(playBtn);
hideUI(TutBtn);
hideUI(TutImg);

unhideUI(ScoreText);
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
ResetLevel();
Spawns.ResetSpeed();
op=0;
requestAnimationFrame(deltaTimeCal); // >>> Implement a time based system for this
}

//------------- SHOW TUTORIAL
function runTutorial(){

unhideUI(nextImg);
unhideUI(prevImg);
playBtn.style.top=10;
hideUI(TutBtn);
unhideUI(TutImg);
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
		}
	}		
}

//------------- SHOW MAIN MENU
function showMainMenu(){
hideUI(ScoreText);
hideUI(nextImg);
hideUI(prevImg);
clearScene();
playBtn.style.top=canvas.height/2;
hideUI(retry);
unhideUI(playBtn);
unhideUI(TutBtn);
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

this.timeSpawn=function(dt){
	this.secondCounter+=dt
	if(this.secondCounter>1000)
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
		this.newPlat(spawn[0],spawn[1],rand(this.minVely,this.maxVely));
		//console.log(Plats);
		}
		this.turnCounter++;
		}
	
		}.bind(this) // SOMETHING NEW !!!
		);
	}
}
	this.Faster=function(){

	this.minVely+=this.minVely*.2;	

	this.maxVely+=this.maxVely*.2;	
	}
	this.ResetSpeed=function()
	{
	this.minVely=0.05; // increase with player Progress
	this.maxVely=0.09;
	}

	this.newPlat=function(x,y,Vely){
	Plats.push(new _Plat(x,y,Vely));

	}	
this.ResetSpeed();
}

//--------------MEMORY MANAGEMENT
function freeMemory(i){ // deletes platform when it is no longer in view
if(Plats[i].y>canvas.height)
{
Plats.splice(i,1);
}
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

function isColliding(a,b){   // b=frog, a=plat(leaf)

if((a.x+a.width/2)>b.x && (a.x+a.width/2)<(b.x+b.width)&&(a.y+a.height/2)>b.y && a.y<(b.y+b.height)&&a.floating==true ){
AddScore();
stick.play();
return true;
}
else {return false;}


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
ScoreText.innerHTML="<b>New</b> High Score <br> "+ Score;
}
else{
ScoreText.innerHTML="Your Score is "+Score+"<br> High Score  is "+ highScore;
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
//------------------ DESKTOP INPUT
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
	freeMemory(i);
}
	if(shotFrog)
	{	// When clicked and released the shotFrog is made true
	move(frog,dt);
	airResis();
	
	isDrowned(frog.Velx,frog.Vely);

	isOutOfBounds();
	Plats.forEach(function(plat)
	{
	if(isColliding(plat,frog)){
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
Spawns.timeSpawn(dt);
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
LogoEnd();
