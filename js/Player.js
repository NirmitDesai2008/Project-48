class Player{
    constructor(){
      this.index = null;
      this.name = null;
      this.distance = 0;
      this.distanceY = 0;
      this.xPos = 0;
      this.place = 0;
      this.x = 0;
}
  
getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
        playerCount = data.val();
    })
}
  
updateCount(count){
    database.ref('/').update({
        playerCount: count
    });
}
  
update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        place: this.place,
        distanceY: this.distanceY,
        x: this.x
    });
}
  
getFinishedPlayers(){
    var finishedPlayersRef = database.ref('finishedPlayers');
    finishedPlayersRef.on("value",(data)=>{
        finishedPlayers = data.val();
    });
}
  
static updateFinishedPlayers(){
    database.ref('/').update({
        finishedPlayers: finishedPlayers+1
    });
  
    this.place = this.place+1;
}
  
static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
    });
    }
}