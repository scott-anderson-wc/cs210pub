var winningDiameter = window.innerHeight/2; // bigger than this wins
var losingDiameter = 5;                     // smaller than this loses
var growDiameter = 20;                      // grow by this many pixels
var shrinkDiameter = 5;                     // shrink by this many pixels

function Player(color, diameter) {
    Blob.call(this,color,diameter);
    this.setX(window.innerWidth/2);
    this.setY(window.innerHeight/2);
}
    
Player.prototype = Object.create(Blob.prototype);
Player.prototype.constructor = Player;

/* Ideally, this method should *also* check for collisions, but we'd have
 * to check every Enemy in the game. We could do that; there's probably
 * only a dozen at a time. */

Player.prototype.move = function(point) {
    this.setX(point.clientX);
    this.setY(point.clientY);
    return this;
};
    
Player.prototype.grow = function () {
    this.setDiameter(this.getDiameter()+growDiameter);
    console.log('grow! to '+this.getDiameter());
    if( this.getDiameter() >= winningDiameter ) {
        $("#winOrLose").text( "You win! :) ");
        stopGame();
    }
};
    
Player.prototype.shrink = function () {
    this.setDiameter(this.getDiameter()-5);
    console.log('shrink! to '+this.getDiameter());
    if( this.getDiameter() < losingDiameter ) {
        $("#winOrLose").text( "Booo, you've lost.");
        stopGame();
    }
};

Player.prototype.collide = function (enemy) {
    if( this.diameter >= enemy.getDiameter() ) {
        this.grow();
        enemy.remove();
    } else {
        this.shrink();
    }
};
