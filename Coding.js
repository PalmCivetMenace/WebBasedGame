//-------------------INIT 1
const canvas= document.getElementById("Scene");
const scene= canvas.getContext('2d');
const retry = document.getElementById("Retry");
var isGamerOver=false;
var lastRender=0;
var shotFrog=false;
var numberOfPlats=3;
var Score;
var ScoreText=document.getElementById("Score");

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
this.calVel=function(x,y){
forceX=(this.x)-x+(document.body.clientWidth)/2-(canvas.width/2);
forceY=this.y-y;
//console.log(x,y,forceX,forceY);
this.Velx=this.speed*forceX;
this.Vely=this.speed*forceY;
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

this.x=x;
this.y=y;
this.floating=true;

var platforms=[
[70,49,"plat_1.png"],
[60,47,"plat_2.png"],
[44,28,"plat_3.png"],
];
// Explaination = [width:20,height:100,image:"plat_2.png"] 

var randplat= Math.floor(Math.random()*platforms.length);

this.width=platforms[randplat][0];
this.height=platforms[randplat][1];
this.image=platforms[randplat][2];


this.Velx=0;
this.minVely=0.05; // increase with player Progress
this.increment=0.032;
this.Vely=this.minVely+(this.increment*Math.random());

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

isDead(frog.Velx,frog.Vely);
}
//-------------- GAME OVER
function isDead(Velx,Vely){
if((Math.abs(Velx)<frog.DeathSpeed)&& (Math.abs(Vely)<frog.DeathSpeed) 
||frog.x>canvas.width||(frog.x+frog.width)<0||(frog.y+frog.height)<0||frog.y>canvas.height
){
frog.Velx=0;
frog.Vely=0;
GameOver();
}

}
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
		this.spawnPoints.forEach(function(spawn)
		{
		//console.log(spawn[2]);
		if(--(spawn[2])<0)
		{
			
				
		spawn[2]= this.minWait + (Math.random()* this.extraWait);
		this.newPlat(spawn[0],spawn[1]); 

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

function clearScene(){ // Simply Redraws the background
	drawObj(BackG);

}
//-------------COLLISION DETECTION

function isColliding(a,b){

if((a.x+a.width/2)>b.x && (a.x+a.width/2)<(b.x+b.width)&&(a.y+a.height)>b.y && a.y<(b.y+b.height)&&a.floating==true ){
AddScore();

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
document.onmousedown= function(){isDragging=true
				
				};
document.onmouseup =function(event){
if(isDragging&&!shotFrog)       // >>>>>>> isGrounded is needed so that frog is only launched when on a platform 
{
	//console.log(event.clientX,event.clientY);
frog.calVel(event.clientX,event.clientY);
isDragging=false;
shotFrog=true;
}};
document.onmousemove=function(event){

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

function update(dt){

clearScene();// Comes Before the frog as it should drawn under the frog
	if(shotFrog)
	{	// When clicked and released the shotFrog is made true
	move(frog,dt);
	airResis();
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
	}

for(i=Plats.length-1;i>=0;i--){
plat=Plats[i];
move(plat,dt);
drawObj(plat);
freeMemory(i);
}
drawObj(frog);
Spawns.timeSpawn(dt);

}

//-----------------------------INIT 2
var frog= new _frog(64,48);
var BackG= new _BackG();
var Plats=[];
var Spawns= new _Spawns();

gameTheme= new sound("Purple Pardon.mp3");
gameTheme.loop();
splash=new sound("splash.mp3");


Restart();
