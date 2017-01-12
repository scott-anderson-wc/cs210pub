var whiteboard;                 // our drawing surface (jQuery wrapper)
var whiteboardElt;              // our drawing surface (DOM elt)

var isMouseDown = false;        // true iff mouse is down (hence, dragging)
var currBox = null;             // the element we are currently drawing (while mouse is down)
var curPos = null;

var boxCounter = 0;             // incremented whenever we make a new box
var boxes = [];

function Box(x,y,w,h) {
    boxCounter++;
    var box = $("<div class='box'></div>")
                  .attr("id","box"+boxCounter)
                  .css("position","absolute")
                  .css("top", (y || 0) + "px")
                  .css("left", (x || 0) + "px")
                  .css("width", (w || 10) + "px")
                  .css("height", (w || 20) + "px");
    $(whiteboard).append(box);
    var box0 = box[0];
    boxes.push(box0);
    return box;
}

// this allocates a small amount of space. We might need to consider that sometime.

function relativeCoords(parent, event) {
    var rect = parent.getBoundingClientRect();
    rx = event.clientX - rect.left;
    ry = event.clientY - rect.top;
    return {x: rx, y: ry};
}

function onMouseDown(event) {
    isMouseDown = true;
    var coords = relativeCoords(whiteboardElt, event);
    currBox = new Box(coords.x, coords.y, 0, 0);
    curPos = coords;
}

function onMouseUp(event) {
    isMouseDown = false;
}

function onMouseMove(event) {
    if( ! isMouseDown ) return;
    var curr = relativeCoords(whiteboardElt, event);
    var left = parseInt($(currBox).css("left"));
    var top = parseInt($(currBox).css("top"));
    var width = Math.max(0, curr.x - left);
    var height = Math.max(0, curr.y - top);
    // console.log(curr.x,curr.y,left,top,width,height);
    $(currBox).css("width",width).css("height",height);
    curPos = curr;
}

function initDrawing(selector) {
    whiteboard = $(selector);
    whiteboard.css("position","relative");
    whiteboardElt = whiteboard[0];
    document.addEventListener('mousemove', onMouseMove);    
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
}
