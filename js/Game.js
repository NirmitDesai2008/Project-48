class Game{
    constructor(){
          
    }
          
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
      gameState = data.val();
      });
    }
          
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
          
    async start(){
      if (gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
  
        form = new Form()
        form.display();
      }

      background1 = createSprite(2000,320,displayHeight,displayWidth);
      background1.addImage(backgroundImg);
      background1.scale = 1.9;
      background1.velocityX = -5;
    
      mickey = createSprite(100,250,30,30);
      mickey.addAnimation("mickey",mickeyImg);
      mickey.scale = 0.25;

      sonic = createSprite(100,320,30,30);
      sonic.addAnimation("sonic",sonicImg);
      sonic.scale = 0.25;
  
      doraemon = createSprite(100,390,30,30);
      doraemon.addAnimation("doraemon",doraemonImg);
      doraemon.scale = 0.6;  
      
      jerry = createSprite(100,450,30,30);
      jerry.addAnimation("jerry",jerryImg);
      jerry.scale = 0.25;
  
      tom = createSprite(100,490,30,30);
      tom.addAnimation("tom",tomImg);
      tom.scale = 0.7;
  
      bunny = createSprite(100,570,30,30);
      bunny.addAnimation("bunny",bunnyImg);
      bunny.scale = 0.4;

      boundary1 = createSprite(1500,180,3500,20);
      boundary1.visible = false;

      boundary2 = createSprite(1500,630,3500,20);
      boundary2.visible = false;

      runners = [mickey,sonic,doraemon,jerry,tom,bunny];
      finished = false;
    }
          
    play(){
      form.hide();
          
      Player.getPlayerInfo();
      player.getFinishedPlayers();
              
      if (allPlayers !== undefined){

        if (gameState === 1){
          if (background1.x < 0){
            background1.x = background1.width*2;
          }
        }

        var index = 0;
        var x = 100;
        var y = 70;
          
        for (var plr in allPlayers){          
          index = index+1;
          y = y+70;
          x = displayWidth+allPlayers[plr].distance;
          runners[index-1].x = x;

          if (index === player.index){
            camera.position.x = runners[index-1].x;
          }
        }
      }

      if (obstaclesGroup.isTouching(player)){
        player.velocityX -= 1;
        player.update();
      }

      if (keyIsDown(UP_ARROW) && player.index !== null){
        player.distanceY = player.distanceY-20;
        player.y = player.y-10;
        player.update();
      }

      if (keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distanceY = player.distanceY+20;
        player.y = player.y+10;
        player.update();
      }

      if (keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance = player.distance-20;
        player.velocityX = -4;
        player.x = -30;
        player.update();
      }

      if (keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance = player.distance+20;
        player.velocityX = 4;
        player.update();
      }

      if (player.distance >= 2500){
        gameState = 2;
        endSprite = createSprite(displayWidth-30,displayHeight-165);
        endSprite.addAnimation("ending",endingAnimation);
        console.log(gameState);
      }

      if (frameCount % 150 === 0 && gameState === 1){
        var rand = random(1,2);
        
        if (rand === 1){
          for (i = 0; i < 5; i++){
            width = random(-height*4,height-300);
            height = random(200,950);
            spider = createSprite(width,height,20,20);
            spider.velocityY = -6;
            spider.addImage(spiderImg);
            obstaclesGroup.add(spider);
          }
        }
        
        if (rand === 2){
          for (i = 0; i < 5; i++){
              width = random(-height*4,height-300);
              height = random(200,950);
              mouse = createSprite(width,height,20,20);
              mouse.velocityY = -4;
              mouse.addImage(mouseImg);
              obstaclesGroup.add(mouse);
          }
        }
      }

      mickey.bounceOff(boundary1);
      mickey.bounceOff(boundary2);
      sonic.bounceOff(boundary1);
      sonic.bounceOff(boundary2);
      doraemon.bounceOff(boundary1);
      doraemon.bounceOff(boundary2);
      jerry.bounceOff(boundary1);
      jerry.bounceOff(boundary2);
      tom.bounceOff(boundary1);
      tom.bounceOff(boundary2);
      bunny.bounceOff(boundary1);
      bunny.bounceOff(boundary2);
      // spider.bounceOff(boundary1);
      // spider.bounceOff(boundary2);
      // mouse.bounceOff(boundary1);
      // mouse.bounceOff(boundary2);

      if (finished === false){
        Player.updateFinishedPlayers();
        player.place = finishedPlayers;
        player.update();
        finished = true;
      }

      drawSprites();
    }
  
    displayRanks(){      
      camera.position.y = 0;
      camera.position.x = 0;
    
      imageMode(CENTER);
      Player.getPlayerInfo();
    
      image(bronzeMedalImg,displayWidth/-4,-100+displayHeight/9,200,240);
      image(silverMedalImg,displayWidth/4,-100+displayHeight/10,225,270);
      image(goldMedalImg,0,-100,250,300);
    
      textAlign(CENTER);
      textSize(50);
      for (var plr in allPlayers){
        if (allPlayers[plr].place === 1){
          text("1st: "+allPlayers[plr].name,0,85);
        } else if (allPlayers[plr].place === 2){
          text("2nd: "+allPlayers[plr].name,displayWidth/4,displayHeight/9+73);
        } else if (allPlayers[plr].place === 3){
          text("3rd: "+allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);
        } else {
          textSize(30);
          text("Honorable Mention: "+allPlayers[plr].name,0,225);
        }
      }
    }

    end(){
      console.log("Game End");
    }
}