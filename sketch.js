
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
ground = createSprite(400,350,900,10); 
ground.velocityX=-4;
ground.x = ground.width /2;
console.log(ground.x)

monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
FoodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {

background("white");
  
if (ground.x < 0){
    ground.x = ground.width/2;
    } 
  
  
 //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
   //add gravity
monkey.velocityY = monkey.velocityY + 0.5
  
monkey.collide(ground);
 
Food();
obstacles();
  
     if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
   score=score+2;
 }
  
   if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
     score=score-4;
 }
  
stroke("white");
textSize(20);
fill("white");
text("score: "+ score, 500, 50);

stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())  
text("survivalTime: "+ survivalTime, 100, 50);
  
drawSprites(); 
}

function Food(){
 if(World.frameCount%200===0){
   banana = createSprite(400,200,20,20);
   banana.addImage(bananaImage);
   banana.y=Math.round(random(120,200));
   banana.velocityX=-8;
   banana.setLifetime=100;
   banana.scale = 0.1;
   
   FoodGroup.add(banana);
 }    
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,326,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
    //generate random obstacles
    var rand = Math.round(random(1,6));
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}




