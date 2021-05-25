var balloon,balloonImage1,balloonImage2;
var database,position,balloonposition

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }
function setup() {
  database = firebase.database();
  
  createCanvas(1350,800);
  
  balloon = createSprite(400, 630, 50, 50);
  balloon.addAnimation("flying",balloonImage2);
  balloon.scale = 0.6;

  balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value", readPosition);
}

function draw() {
  background(bg);

  if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
  }
  else if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref("balloon/height").set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPosition(a){
  position = a.val();
  balloon.x = position.x;
  balloon.y = position.y;
}