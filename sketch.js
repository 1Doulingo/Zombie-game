var bgimg
var shooterIMG
var shooterShooting
var zombieIMG
var bulletIMG
var zombieGroup = [], bulletGroup =[]
var explosionSound
var heart3IMG, heart2IMG, heart1IMG
var lives 
var score

function preload(){
bgimg = loadImage("./assets/bg.jpeg")
shooterIMG = loadImage("./assets/shooter_2.png")
shooterShooting = loadImage("./assets/shooter_3.png" )
zombieIMG = loadImage("./assets/zombie.png")
bulletIMG = loadImage("./assets/bullet.png")
explosionSound = loadSound("./assets/explosion.mp3")
heart3IMG = loadImage("./assets/heart_3.png")
heart2IMG = loadImage("./assets/heart_2.png")
heart1IMG = loadImage("./assets/heart_1.png")
}


function setup(){
createCanvas(windowWidth,windowHeight)

shooter = createSprite(200,height-100)
shooter.addImage(shooterIMG)
shooter.scale = 0.3

heart = createSprite(100,height-50)
heart.addAnimation("heart3", heart3IMG)
heart.addAnimation("heart2", heart2IMG)
heart.addAnimation("heart1", heart1IMG)
heart.scale = 0.2
lives = 3

score = 0

gameState = "play"
}


function draw(){
background(bgimg)

if(gameState=="play"){



if (keyDown("UP_ARROW")){
shooter.y = shooter.y-30
}

if (keyDown("DOWN_ARROW")){
  shooter.y = shooter.y+30
  }

  if (keyWentDown("space")){
  shooter.addImage(shooterShooting)
    }

    if (keyWentUp("space")){
      shooter.addImage(shooterIMG)
      bullet = createSprite(shooter.x+60, shooter.y, 50, 50)
      bullet.velocityX = +10
      bullet.addImage(bulletIMG)
      bullet.scale = 0.1
      bulletGroup.push(bullet)
        }

        for(var i = 0; i<bulletGroup.length; i++){
          for(var j = 0;j<zombieGroup.length;j++){
            if(bulletGroup[i].collide(zombieGroup[j])){
            zombieGroup[j].destroy()
            bulletGroup[i].destroy()
            explosionSound.play()
            score=score+2
            }
          }
        }

        for(var k = 0; k<zombieGroup.length; k++){
          if(zombieGroup[k].x<0){
            lives = lives-1
            //zombieGroup[k].destroy()
            zombieGroup.splice(k,1)
            k--
            console.log(lives)
          }
        }

        if(lives==2){
        heart.changeAnimation("heart2")
          console.log("heart2")
        }

        if(lives==1){
          heart.changeAnimation("heart1")
  
          }

          if(lives<=0){
            gameOver()
            gameState = "end"
          }
          spawnZombies()
        }
   
drawSprites()
textSize(20)
fill("yellow")
text("Score : "+score,100,50)
}

function spawnZombies(){
  if(frameCount % 80==0){
   zombie = createSprite(width, 300)
   zombie.debug = false
   zombie.addImage(zombieIMG)
   zombie.scale = 0.15
   zombie.setCollider("rectangle",0,0,300,1050)
   zombie.velocityX = -8
   zombie.y = getRandomNumber(100, height-50)
   zombieGroup.push(zombie)
     }
    }

    function getRandomNumber(min, max) 
    { 
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    function gameOver(){
      zombieGroup.destroyEach()
      swal({
        title: "Game Over",
        text: "Thanks for playing",
        confirmButtonText: "Play again"
      },
      function(a){
        if(a){
          window.location.reload()
        }
      }
      )
    }