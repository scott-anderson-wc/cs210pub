

var Game = function Game () {
    this.player = player;
    var uniqueID = 0
    
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
   
    Game.prototype.CreateEnemies = window.setInterval(function(){
        new Enemy(uniqueID, getRandomNum(1, 4));
        uniqueID++;
    }, 500);
    
//    
//    Game.prototype.doBlobsIntersect = function (player, enemy) {
//        var dx = player.getCoords().x - enemy.getCoords().x;
//        var dy = player.getCoords().y - enemy.getCoords().y;
//        var distance = Math.sqrt(dx * dx + dy * dy);
//
//        if (distance < (player.getDiameter())/2 + (enemy.getDiameter())/2) {
//            return true;
//        }
//        
//        return false;
//    };
//        
//    Game.prototype.GrowOrShrink = function (player, enemy) {
//        if (player.getDiameter() < enemy.getDiameter()) {
//            $(enemy).delete();
//            player.grow();
//            
//        } else {
//            player.shrink();
//        }
//    };
//    
//    Game.prototype.checkWinOrLose = function (player) {
//        if (player.diameter < 5) {
//            console.log("You lose");
//        } else if (player.diameter >= window.innerHeight/2) {
//            console.log("You win!");
//        }
//    };
//    
//    
//    function playGame (player, enemy) {
//        if (doBlobsIntersect(player, enemy)) {
//            GrowOrShrink(player, enemy);
//            checkWinOrLose(player);
//        }  
//    };
    
//    setInterval(playGame, 16)
       
};

$('button').click(function () {
    var g = new Game();
    $("button").remove();
    $("#intro").remove();
    $("h1").remove()
});