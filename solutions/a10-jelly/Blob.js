function Blob(color, diameter) {
    // have to create the elt first, since other methods modify its CSS
    this.elt = $("<div></div>").addClass("circle");
    this.setDiameter(diameter);
    this.setColor(color);
    this.radius = Math.floor(diameter/2);
    // coordinates; as yet unknown
    this.setX(0);
    this.setY(0);
}

Blob.prototype.addToGame = function (container) { 
    this.elt.appendTo(container); 
    return this;
};

Blob.prototype.setColor = function (color) {
    this.color = color;
    this.elt.css("background-color",color);
    return this;
};

Blob.prototype.setDiameter = function (diameter) {
    this.diameter = diameter;   // check that it's positive?
    var radius = diameter/2;
    this.radius = radius;
    this.elt.css({width: diameter,
                  height:diameter,
                  left: this.x-radius,
                  top: this.y-radius});
    return this;
};
    
Blob.prototype.setRadius = function (radius) {
    this.setDiameter(radius*2);
    return this;
};

Blob.prototype.getDiameter = function () { return this.diameter };

Blob.prototype.getRadius = function () { return this.radius };

// x and y are the *center* values, not top left
Blob.prototype.getX =  function () { return this.x; };
Blob.prototype.getY =  function () { return this.y; };
    
Blob.prototype.setX =  function (x) { 
    this.x = x; 
    this.elt.css("left",(this.x-this.radius)+"px");
    return this;
};

Blob.prototype.setY =  function (y) { 
    this.y = y; 
    this.elt.css("top",(this.y-this.radius)+"px");
    return this;
};
    
Blob.prototype.intersects = function (other) {
    var dx = this.getX() - other.getX();
    var dy = this.getY() - other.getY();
    var distance_squared = (dx * dx + dy * dy);

    var r1 = this.getRadius();
    var r2 = other.getRadius();
    var rsum = r1+r2;
    var closer = (distance_squared <= rsum*rsum);
    return closer;
};
