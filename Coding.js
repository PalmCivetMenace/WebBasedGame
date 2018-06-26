const canvas= document.getElementById("Scene");
const scene= canvas.getContext('2d');


//-----------------OBJECT CREATION
function _frog(w,h){

this.width=w;
this.height=h;
this.image= "frog.svg";
this.x=200;
this.y=200;
this.speed=.001; //>> Tweak This
this.Velx=this.speed;
this.Vely=this.speed;
this.calVel=function(x,y){

forceX=(this.x)-x+(document.body.clientWidth)/2-(canvas.width/2);
forceY=this.y-y;
console.log(x,y,forceX,forceY);
this.Velx=this.speed*forceX;
this.Vely=this.speed*forceY;
}
this.folVelx=0;
this.folVely=0;

}


function _BackG(){

this.width=canvas.width;
this.height=canvas.height;
this.image= "BackG.png";
this.x=0;
this.y=0;

}

function _Plat(){

this.x=Math.random()*300;
this.y=200;
this.maxHeight=100;
this.minHeight=20;

this.floating=true;

this.maxWidth=30;
this.minWidth=5;

this.width=this.minWidth+Math.random()*this.maxWidth;
this.height=this.minHeight+Math.random()*this.maxHeight;
this.Velx=0;
this.Vely=.01;
this.image="plat.png";
}

var frog= new _frog(64,48);
var BackG= new _BackG();
var Plats=[];
newPlat();
newPlat();
newPlat();
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
//--------------SPAWN PLATS

function newPlat(){
Plats.push(new _Plat);

}

//-------------- RENDER STUFF
function drawObj(obj){
//console.log(obj); 
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
return true;
}
else {return false;}


}

//------------------INPUT
var isDragging=false;
document.onmousedown= function(){isDragging=true
				
				};
document.onmouseup =function(event){
if(isDragging&&!shotFrog)       // >>>>>>> isGrounded is needed so that frog is only launched when on a platform 
{
	console.log(event.clientX,event.clientY);
frog.calVel(event.clientX,event.clientY);
isDragging=false;
shotFrog=true;
}};
document.onmousemove=function(event){
if(isDragging){

}}; 
//------------------UPDATE

shotFrog=false; // this is only false at initialization
var lastRender=0;

requestAnimationFrame(deltaTimeCal);//>>> Implement a time based system for this

function deltaTimeCal(timeStamp){
	var dt=timeStamp-lastRender;
	update(dt);
	lastRender=timeStamp;
	window.requestAnimationFrame(deltaTimeCal);
}

function update(dt){

clearScene();// Comes Before the frog as it should drawn under the frog
	if(shotFrog)
	{	// When clicked and released the shotFrog is made true
	move(frog,dt);

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

Plats.forEach(function(plat)
{
move(plat,dt);
drawObj(plat);
//console.log("YEEEP");
//isColliding(plat,frog);
}

);
drawObj(frog);
}