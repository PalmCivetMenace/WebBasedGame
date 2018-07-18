///-------------------INIT 1
const canvas= document.getElementById("Scene");
const scene= canvas.getContext('2d');
const retry = document.getElementById("Retry");
var isGamerOver=false;
var lastRender=0;
var shotFrog=false;
var numberOfPlats=20;
var Score;
const ScoreText=document.getElementById("Score");
ScoreText.style.left=-canvas.width/2+60; //<< HARD coded in the px val
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
this.offScreenCanvas=document.createElement('canvas');
this.offScreenCanvas.width=this.width;
this.offScreenCanvas.height=this.height;
this.offScreenContext=this.offScreenCanvas.getContext('2d');
var img = new Image();

img.src=this.image;
img.onload=function(){
this.offScreenContext.drawImage(img,this.x,this.y,this.width,this.height);

}.bind(this);



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
}


function _BackG(){

this.width=canvas.width;
this.height=canvas.height;
this.image= "BackG.png";
this.x=0;
this.y=0;

}

function _Plat(x,y){


this.floating=true;



var platforms=[
[65,45,"plat_1.png"],
[60,47,"plat_2.png"],
[44,28,"plat_3.png"],
];

// Explaination = [width:20,height:100,image:"plat_2.png"] 

var randplat= Math.floor(Math.random()*platforms.length);

this.width=platforms[randplat][0];
this.height=platforms[randplat][1];
this.image=platforms[randplat][2];
this.x=x-this.width/2;
this.y=y;


this.Velx=0;
this.minVely=0.05; // increase with player Progress
this.increment=0.032;
this.Vely=this.minVely+(this.increment*Math.random());

}
//----------- GUIDE
function _Guide(x,y){
this.x=x;
this.y=y;
this.width=5;
this.height=5;
this.image="bubble.png";
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
if((Math.abs(Velx)<frog.DeathSpeed)&& (Math.abs(Vely)<frog.DeathSpeed) 
){
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


splash.play();
isGameOver=true;
retry.style.display="block";


}
//--------------- RESTART GAME


function Restart(){
retry.style.display="none";
isGameOver=false;
frog.x=canvas.width/2-frog.width/2;
frog.y=canvas.height/2;
frog.folVelx=0;
frog.folVely=0;
shotFrog=false; // this is only false at initialization
lastRender=0;
ResetScore();
requestAnimationFrame(deltaTimeCal);//>>> Implement a time based system for this
}

//--------------SPAWN PLATS

function _Spawns(){

this.spawnPoints=[];
	for(i=0;i<numberOfPlats;i++)
	{	
	xPos=(i/numberOfPlats*canvas.width)+(1/numberOfPlats*canvas.width)/2;
	this.spawnPoints.push([xPos,10,0]); //<<< Tweak This
	// Syntax : [x:xPos,y:10,waitTime:0]
		
	}
this.secondCounter=0;
this.minWait=2;
this.extraWait=1;
this.timeSpawn=function(dt){
	this.secondCounter+=dt
	if(this.secondCounter>1000)
	{

 		this.secondCounter=0;
		this.turn= Math.floor(Math.random()*this.spawnPoints.length);
		this.turnCounter=0;
		this.spawnPoints.forEach(function(spawn)
		{
		
		if(--(spawn[2])<0)
		{
			
		if(this.turnCounter==this.turn){				
		spawn[2]= this.minWait + (Math.random()* this.extraWait);
		this.newPlat(spawn[0],spawn[1]); 

		}
		this.turnCounter++;
		}
	
		}.bind(this) // SOMETHING NEW !!!
		);
	}
}

	this.newPlat=function(x,y){
	Plats.push(new _Plat(x,y));

	}	
}
//--------------MEMORY MANAGEMENT
function freeMemory( i){
if(Plats[i].y>canvas.height)
{
Plats.splice(i,1);

}


}
//-------------- RENDER STUFF
function drawObj(obj){

var img = new Image();
img.onload=function(){
scene.drawImage(img,obj.x,obj.y,obj.width,obj.height);

}

img.src=obj.image;
}
function drawOffCan(obj){
scene.drawImage(obj.offScreenCanvas,0,0,obj.width,obj.height);

}
function clearScene(){ // Simply Redraws the background
	drawObj(BackG);

}
//-------------COLLISION DETECTION

function isColliding(a,b){

if((a.x+a.width/2)>b.x && (a.x+a.width/2)<(b.x+b.width)&&(a.y+a.height)>b.y && a.y<(b.y+b.height)&&a.floating==true ){
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

//------------------INPUT
var isDragging=false;
document.onmousedown= function(event){

		isDragging=true;

		frog.savedX=frog.x;

		frog.savedY=frog.y;//This is so that the guiding does change when the frog goes down

				};
document.onmouseup =function(event){
if(isDragging&&!shotFrog)       // >>>>>>> isGrounded is needed so that frog is only launched when on a platform 
{
	//console.log(event.clientX,event.clientY);
frog.calVel(event.clientX,event.clientY);
isDragging=false;
shotFrog=true;
jump.play();
}
for(i=0;i<Guides.length;i++){
Guides[i].x=-100; // So it is out of the viewport of the Player

Guides[i].y=-100;

}


};
document.onmousemove=function(event){
if(!shotFrog&&isDragging){				
force= frog.calVel(event.clientX,event.clientY);

for(i=0;i<Guides.length;i++){
Guides[i].x= (frog.x+frog.width/2)+((i+1)*force[0]*100);

Guides[i].y=(frog.y+frog.height/2) +((i+1)*force[1]*100);

}
}

}

//------------------UPDATE
function deltaTimeCal(timeStamp){
	var dt=timeStamp-lastRender;
	update(dt);
	lastRender=timeStamp;
	if(!isGameOver){
	window.requestAnimationFrame(deltaTimeCal);
	}
}
var waitTimer=10;
var  counter=0;
function update(dt){

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
	plat.floating=false;
	
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


drawOffCan(frog);
Spawns.timeSpawn(dt);
for(i=0;i<Guides.length;i++){
drawObj(Guides[i]);

}
}

//-----------------------------INIT 2
var frog= new _frog(64,48);
var BackG= new _BackG();
var Plats=[];
var Spawns= new _Spawns();

var Guides=[]; //<<Tweak this
	initGuides(10);
gameTheme= new sound("Purple Pardon.mp3");
gameTheme.loop();
splash=new sound("splash.mp3");
stick = new sound("Stick.wav");
jump = new sound("Jump.wav");
Restart();
