var whiteboard;                 // our drawing surface (jQuery wrapper)
var whiteboardElt;              // our drawing surface (DOM elt)

var wbWidth;
var wbHeight;
var colWidth;
var hourHeight;
    

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
    if( coords.x < 0 || coords.x > wbWidth ||
        coords.y < 0 || coords.y > wbHeight ) return;
    // round down to col start
    var x = Math.floor(coords.x / colWidth) * colWidth;
    var y = Math.floor(coords.y / hourHeight) * hourHeight;
    // console.log(x, y, colWidth, hourHeight);
    currBox = new Box(x, y, colWidth, hourHeight);
    curPos = coords;
}

function onMouseUp(event) {
    isMouseDown = false;
}

function onMouseMove(event) {
    if( ! isMouseDown ) return;
    var coords = relativeCoords(whiteboardElt, event);
    var left = parseInt($(currBox).css("left"));
    var top = parseInt($(currBox).css("top"));
    // round up to col end
    var x = Math.ceil(coords.x / colWidth) * colWidth;
    var y = Math.ceil(coords.y / hourHeight) * hourHeight;

    var width = Math.max(0, x - left);
    var height = Math.max(0, y - top);
    // console.log(coords.x,coords.y,left,top,width,height);
    $(currBox).css("width",width).css("height",height);
    curPos = coords;
}

function initDrawing(selector) {
    whiteboard = $(selector);
    whiteboard.css("position","relative");
    whiteboardElt = whiteboard[0];
    document.addEventListener('mousemove', onMouseMove);    
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // ================================================================
    // these values are also used to limit the box widths and heights

    wbWidth = parseInt(whiteboard.css("width"));
    wbHeight = parseInt(whiteboard.css("height"));
    colWidth = Math.round(wbWidth / 5);
    hourHeight = Math.round(wbHeight / 8);
    
    // All the rest of this is just decorating the calendar

    for( var i = 1; i < 5; i++ ) {
        $("<div>")
            .css({position: "absolute",
                  width: 0, height: wbHeight, top: 0, left: i*colWidth,
                  "border-left": "1px solid gray"})
            .appendTo(whiteboard);
    }
    for( var i = 1; i < 8; i++ ) {
        $("<div>")
            .css({position: "absolute",
                  height: 0, width: wbWidth, left: 0, top: i*hourHeight,
                  "border-top": "1px solid gray"})
            .appendTo(whiteboard);
    }
    function labelDay(dayName, col) {
        $("<div>"+dayName+"</div>")
            .css({position: "absolute", "text-align": "center", bottom: wbHeight, width: colWidth, left: col*colWidth})
            .appendTo(whiteboard);

    }
    function labelHour(hour, row) {
        $("<div>"+hour+"</div>")
            .css({position: "absolute", height: colWidth, right: wbWidth+10, top: row*hourHeight - 5 })
            .appendTo(whiteboard);
    }
    labelDay("Monday",0);
    labelDay("Tuesday",1);
    labelDay("Wednesday",2);
    labelDay("Thursday",3);
    labelDay("Friday",4);
    var hours = [9, 10, 11, 12, 1, 2, 3, 4]; 
    for( i = 1; i < hours.length; i++ ) {
        labelHour(hours[i],i);
    }
}
