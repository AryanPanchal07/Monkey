var PLAY = 1;
var END = 0;
var gameState = PLAY;

var points = 0;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var screen,screenImage;
var invisible,invisibleImage;
var gameover,gameoverImage;
var restart,restartImage;
var obstacle;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  screenImage = loadImage("PngItem_3813016.png");
  invisibleImage = loadImage("Background_and_Blank_Effect_Transparent_PNG_Clip_Art_Image.png");
  gameoverImage = loadImage("freesnippingtool.com_capture_20200914180946.png");
  restartImage = loadImage("Download-Restart-PNG-File-333.png")
  
}



function setup() {
  createCanvas(400,400)
  
  screen = createSprite(200,200);
  screen.addImage(screenImage);
  screen.scale = 1;
  
  monkey = createSprite(50,370,20,50);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;
  
  invisible = createSprite(50,390);
  invisible.addImage(invisibleImage);
  
  restart = createSprite(200,255);
  restart.addImage("reset", restartImage);
  restart.scale = 0.3;
  restart.visible = false;
  
  gameover = createSprite(200,180);
  gameover.addImage("over", gameoverImage);
  gameover.scale = 0.7;
  gameover.visible = false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true;
}


function draw() {
  if(gameState === PLAY){
     
    gameover.visible = false;
    restart.visible = false;
 
      monkey.changeAnimation("running", monkey_running);
    
    screen.velocityX = -8;
    
    survivalTime = Math.ceil (frameCount/frameRate());
    
    if(monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
        points=points+1;
     }
    
    if (screen.x < 0){
      screen.x = screen.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 301) {
        monkey.velocityY = -12;
    }
    
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnfood();
  
    //spawn obstacles on the ground
    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
      screen.velocityX = 0;
      monkey.velocityY = 0;
      monkey.visible = false;
    }
  }
  
  else if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
       if(mousePressedOver(restart)){
         reset();
       }  

     
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
    monkey.collide(invisible);
  

  drawSprites();
   text("survival Time:" + survivalTime,130,50,stroke("black"),textSize(20),fill("black"));
  
    text("points : " + points,170,100,textSize(15),fill("black"));
}



function spawnObstacle(){
  if (frameCount % 100 === 0){
    obstacle = createSprite(600,368,10,40);
    obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityX = -6;
   
      
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
     //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnfood(){
     if (frameCount % 80 === 0) {
    banana = createSprite(200,380,10);
    banana.y = Math.round(random(220,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
       
     FoodGroup.add(banana);  
 }     
}

function reset () {
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.visible = true;
  points=0;
  survivalTime = 0;
}  



