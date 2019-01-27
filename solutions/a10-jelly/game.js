// Should wrap these up in an IIFE

var interval;

function stopGame() {
    console.log('stopping game');
    clearInterval(interval);
    $("div").stop();
}

var startingDiameter = 30;
var thePlayer;

function startGame() {
    console.log("starting game");
    $("#intro").remove();
    var board = $("body");
    thePlayer = new Player("blue",startingDiameter);
    thePlayer
        .setX(window.innerWidth/2)
        .setY(window.innerHeight/2)
        .addToGame(board);
    interval = setInterval(function () { 
        var e = new Enemy(); 
        e.addToGame(board).start();
    },
                           1000);
    $(document).on('mousemove',
                   thePlayer.move.bind(thePlayer));
}

$('#start').click(function () {
    testingMode = false;
    startGame();
});

$('#testGrow').click(function () { 
    testingMode = 'grow';
    startGame();
});

$('#testShrink').click(function () { 
    testingMode = 'shrink';
    startGame();
});

// ================================================================
// Testing

function testGame(size) {
    thePlayer = new Player("blue",size);
    thePlayer.addToGame("body");
    e1 = new Enemy();
    e1.addToGame("body");
    e1.start();
}

function testIntersect(dx,dy) {
    // This test has two blobs of radius 100 and a 120,160,200 triangle
    // between their centers, so their centers are 200 px apart and they
    // should be just tangent. The second blob is perturbed by (dx,dy)
    dx = (dx === undefined) ? 0 : dx;
    dy = (dy === undefined) ? 0 : dy;
    $(".circle").remove();      // remove any prior blobs
    // these are global on purpose, so you can play with them afterward.
    b1 = new Blob("red",200);   // radius of 100
    b2 = new Blob("green",200);
    b1.setX(100).setY(100).addToGame("body");
    b2.setX(100+120+dx).setY(100+160+dy).addToGame("body");
    console.log("b1 intersects b2? ",b1.intersects(b2));
    console.log("b2 intersects b1? ",b2.intersects(b1));
}

function testProgress() {
    $(".circle").remove();      // remove any prior blobs
    blob17 = new Blob("coral",200);
    blob17.setX(100).setY(100).addToGame("body");
    $(blob17.elt)
        .animate({ left: "+=456px" },
                 { duration: 3000,
                   progress: function () {
                     var $elt = $(blob17.elt);
                     var left = parseInt($elt.css("left"),10);
                     var x = left+100; // radius is 100
                     console.log("x is now "+x);
                 }});                                  
}
