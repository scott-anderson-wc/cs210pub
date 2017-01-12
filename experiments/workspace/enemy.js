var play = new Player("skyblue", 50);


function Enemy (uniqueId, side) {
    this.uniqueId = uniqueId;
    this.side = side;
    
    
    var uniqueIdHash = "#" + uniqueId;
    
     var colors = ["AliceBlue","Aqua","Aquamarine","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","ForestGreen","Fuchsia","Gainsboro","Gold","GoldenRod","Green","GreenYellow","HotPink","IndianRed","Indigo","Khaki","Lavender","LawnGreen","LemonChiffon","LightBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MistyRose","Moccasin","Navy","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","Yellow","YellowGreen"];
    
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    
    
    Enemy.prototype.addEnemy = $(function(){
        $( ".enemies" ).append( "<div class='circle' id ='" + uniqueId + "'></div>" );
    });
    
     function getEnemy() {
        return $(uniqueId).get();
    };
    
    function getCoords2 () {
        return {x: parseFloat($(uniqueIdHash).css("left")),
                y: parseFloat($(uniqueIdHash).css("top"))}
    }
    
    function getDiameter () {
        return parseInt($(uniqueIdHash).css("width"))
    }
    
    
    
    Enemy.prototype.setColor = $(function(){
        $(uniqueIdHash).css("background", colors[getRandomNum(0, colors.length-1)]);
    });
    
    Enemy.prototype.setDiameter = $(function(){
        var randDiameter = getRandomNum(5, window.innerWidth/4);
        $(uniqueIdHash).css("width", randDiameter);
        $(uniqueIdHash).css("height", randDiameter);
    });
    
    Enemy.prototype.getDiameter = function () {
        return parseInt($(uniqueIdHash).css("width"));
    };
    
    Enemy.prototype.setCoords = $(function(){
        
         switch(side) {   
            
            case 1: $(uniqueIdHash).css("left", -parseFloat($(uniqueIdHash).css("width")));
                    $(uniqueIdHash).css("top", getRandomNum(0, window.innerHeight));
                    break; // left
            
                 
            case 2: $(uniqueIdHash).css("left", window.innerWidth);
                    $(uniqueIdHash).css("top", getRandomNum(0, window.innerHeight));
                    break; // right
                 
            case 3: $(uniqueIdHash).css("left", getRandomNum(0, window.innerWidth));
                    $(uniqueIdHash).css("top", -parseFloat($(uniqueIdHash).css("width")));
                    break; // top
                 

            case 4: $(uniqueIdHash).css("left", getRandomNum(0, window.innerWidth));
                    $(uniqueIdHash).css("top", window.innerHeight);
                    break; //bottom
                 
            default: return;
         }    
    });
    
    
    Enemy.prototype.getCoords = function() {
        return {x: parseFloat($(uniqueIdHash).css("left")),
                y: parseFloat($(uniqueIdHash).css("top"))}
    }
    
    
    Enemy.prototype.move = $(function(){
        var objectWidth = parseFloat($(uniqueIdHash).css("width"));
        var collided = false;
        switch(side) {
                
            // right
            case 1: $(uniqueIdHash).animate({
                    left: "+=" + (window.innerWidth + objectWidth)}, 
                                            {duration: 5000,
                                             progress: function () {
                                                 if (doBlobsIntersect(play, getEnemy()) && !collided) {
                                                     growOrShrink(play);
                                                     collided = true;
                                                     checkWinOrLose(play);
                                                 }
                                                     },
                                             complete: function() {
                                                 $(uniqueIdHash).remove()}});
            break;
            
            
            // left
            case 2: $(uniqueIdHash).animate({
                    left: "-=" + (window.innerWidth + objectWidth)}, 
                                            {duration: 5000, 
                                             progress: function () {
                                                 if (doBlobsIntersect(play, getEnemy()) && !collided) {
                                                     growOrShrink(play);
                                                     collided = true;
                                                     checkWinOrLose(play);
                                                 }
                                             },
                                             complete: function() {
                                                 $(uniqueIdHash).remove()}}); 
            break;
            
            // down
            case 3: $(uniqueIdHash).animate({
                    top: "+=" + (window.innerHeight + objectWidth)}, 
                                            {duration: 5000, 
                                            progress: function () {
                                                 if (doBlobsIntersect(play, getEnemy()) && !collided) {
                                                     growOrShrink(play);
                                                     collided = true;
                                                     checkWinOrLose(play);
                                                 }
                                            },
                                             complete: function() {
                                                 $(uniqueIdHash).remove()}});
            break;
                
            // up
            case 4: $(uniqueIdHash).animate({
                    top: "-=" + (window.innerHeight + objectWidth)}, 
                                            { duration: 5000, 
                                             progress: function () {
                                                 if (doBlobsIntersect(play, getEnemy()) && !collided) {
                                                     growOrShrink(play);
                                                     collided = true;
                                                     checkWinOrLose(play);
                                                 }
                                             },
                                             complete: function() {
                                                 $(uniqueIdHash).remove()}});
            break;
        }
        
        collided = false;
        
    });
    
    function doBlobsIntersect (player, enemy) {
        var dx = player.getCoords().x - getCoords2().x;
        var dy = player.getCoords().y - getCoords2().y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (player.getDiameter())/2 + (getDiameter())/2) {
            return true;
        }
        
        return false;
    };
    
    function growOrShrink (player) {
        if (player.getDiameter() > getDiameter()) {
            $(uniqueIdHash).remove();
            player.grow();
            
        } else {
            player.shrink();
        }
    };
    
    function checkWinOrLose (player) {
        if (player.getDiameter() < 5) {
            $("#winOrLose").text("Booo you've lost");

        } else if (player.getDiameter() >= window.innerHeight/2) {
           $("#winOrLose").text( "You win! :)" );

        }
    };
    
    
};
