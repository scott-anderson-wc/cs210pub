function Player(color, diameter) {
    this.color = color;
    this.diameter = diameter;
    
   
    Player.prototype.setColor = $(function(){
        $("#player").css("background", color);
    });
    
    Player.prototype.setDiameter = $(function(){
        $("#player").css("width", diameter);
        $("#player").css("height", diameter);
    });
    
    Player.prototype.getDiameter = function () {
        return parseInt($("#player").css("width"));
    };
    
    Player.prototype.movePlayer = $(document).keydown(function(e) {
        switch(e.which) {
            case 37: $("#player").animate({left: '-=50'});// left
            break;

            case 38: $("#player").animate({top: '-=50'});// up
            break;

            case 39: $("#player").animate({left: '+=50'});// right
            break;

            case 40: $("#player").animate({top: '+=50'})// down
            break;

            default: return; // exit this handler for other keys
        }
    });
    
    Player.prototype.stopPlayer = $(document).keyup(function(e) {
        $('#player').stop(true, true); 
    });
    
    
     Player.prototype.getCoords =  function () {
         return {x: parseFloat($('#player').css("left")),
                 y: parseFloat($('#player').css("top"))}
     };
    
    
    Player.prototype.grow = function () {
        this.diameter = this.diameter + 20;
        $("#player").css("width", this.diameter);
        $("#player").css("height", this.diameter);
    }
    
    Player.prototype.shrink = function () {
        this.diameter = this.diameter - 5;
        $("#player").css("width", this.diameter);
        $("#player").css("height", this.diameter);
        
    }

}

//var play = new Player("skyblue", 34);
