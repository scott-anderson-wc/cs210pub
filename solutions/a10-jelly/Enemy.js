var testingMode = false;        // or 'grow' or 'shrink'

var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;              // time to cross the document

function Enemy () {
    var color = random.color();
    var diam;
    if(testingMode==='shrink') {
        diam = 100;             // big blobs to test shrinking
    } else if (testingMode === 'grow') {
        diam = 10;              // small blobs to test growing
    } else {
        diam = random.intBetween(minDiameter, maxDiameter);
    }
    Blob.call(this,color,diam);
    // whether it has collided with the player. Only the first collision counts.
    this.collided = false;
    // the side it comes in from
    this.side = random.arrayElt(['top','right','bottom','left']);
    this.setCoords();
}
    
Enemy.prototype = Object.create(Blob.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.collide = function () { 
    this.collided = true; 
    thePlayer.collide(this);
};

Enemy.prototype.maybeCollide = function () {
    if( ! this.collided ) {
        // OMG. This is a pain, but necessary, because the animation only
        // updates the CSS properties, not the x and y values in our
        // object.
        this.setX(parseInt(this.elt.css("left"),10)+this.radius);
        this.setY(parseInt(this.elt.css("top"),10)+this.radius);
        if( this.intersects(thePlayer) ) {
            this.collide();
        }
    }
};

Enemy.prototype.setCoords = function() {
    var x, y;
    if(testingMode) {
        x = window.innerWidth/2;
        y = window.innerHeight/2;
    } else {
        x = random.intBetween(0, window.innerWidth);
        y = random.intBetween(0, window.innerHeight);
    }
    switch (this.side) {
    case "top": 
        this.setX( x );
        this.setY( -1*this.radius );
        break;

    case "right":
        this.setX( window.innerWidth+this.radius );
        this.setY( y );
        break;

    case "bottom":
        this.setX( x );
        this.setY( window.innerHeight+this.radius );
        break;

    case "left":
        this.setX( -1*this.radius );
        this.setY( y );
        break;
                 
    default: throw new Error("no such 'side' :"+this.side);
    }
};
    
Enemy.prototype.remove = function () { 
    this.elt.stop().remove(); 
};

Enemy.prototype.start = function() {
    var options = { duration: enemyDuration,
                    progress: this.maybeCollide.bind(this),
                    complete: this.remove.bind(this) };

    switch(this.side) {
    case "top":
        this.elt.animate({ top: "+=" + (window.innerHeight+this.diameter) },
                         options);
        break;
    case "right":
        this.elt.animate({ left: "-=" + (window.innerWidth+this.diameter) },
                         options);
        break;
    case "bottom":
        this.elt.animate({ top: "-=" + (window.innerHeight+this.diameter) },
                         options);
        break;
    case "left":
        this.elt.animate({ left: "+=" + (window.innerWidth+this.diameter) },
                         options);
        break;
    default: throw new Error("no such 'side' :"+this.side);
    }
};
