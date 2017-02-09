// ================================================================
// Execute buttons

/* Adds an Execute Button after the given element. Clicking the button
will cause the JS code in the element to be executed. */

function addExecuteButton(elt) {
    var button = $("<button type='button'>execute it</button>")
        .click(function (evt) {
            that = this;
            var code = $(elt).text(); // closure over elt
            console.log("executing code: "+code);
            try { eval(code); }
            catch (e) {
                console.log("error in eval of "+code+": "+e);
            }
            evt.stopPropagation();
        }).insertAfter(elt);
}

/* Add execute buttons to every element that has the "executable" class */

$(".executable").each(function (idx, elt) { addExecuteButton(elt); });

// ================================================================
// Solutions hidden from students.

/* This function checks whether the revealAt global has been set, and if
not, sets it to right now. */

var revealTime;

function checkRevealTime () {
    if( typeof(revealAt) == "undefined" ) {
        console.log("revealAt time not set; assuming now");
        revealTime = new Date();
        revealAt = revealTime.toLocaleString();
    } else {
        revealTime = new Date(revealAt);
    }
    return revealTime;
}

/* Adds a message about when the solutions can be revealed. */

function addRevealLaterMessage () {
    var then = checkRevealTime();
    var now = new Date();
    if( now < then ) {
        $("<p>").text("Come back after "+then.toLocaleString()+" to see the solutions")
         .appendTo("body");
    }
}
addRevealLaterMessage();

// ================================================================

var magic_word = "dumbledore";

// hides *all* of the elements

function hide_solutions() {
    $(".solution").addClass("hidden");
    var n = $(".solution").length;
    console.log("hid "+n+" solutions");
}
hide_solutions();

/* returns true if the user knows the magic word or its properly set to a
cookie. Could also use localStorage for this. */

function knows_magic_word() {
    var magic = getCookie("magic210");
    if( magic == "" ) {
        magic = prompt("what's the magic word?");
        if( magic == magic_word ) {
            // 90 days should take care of the semester
            setCookie("magic210",magic,100,"/"); 
        }
    }
    return magic == magic_word;
}

/* This is the main event handler for the hidden elements. It's a toggle:
click to reveal, click again to hide. Because we sometimes want to click
on things inside the element, it checks that you clicked only on the
element; in practice, that means clicking on the padding.

Current implementation reveals if either (1) the time is after the
revealTime or (2) the magic word is set. */

function clickToReveal(event) {
    if( this != event.target ) {
        console.log("didn't click on the element itself");
        return;
    }
    var now = new Date();
    var then = checkRevealTime();
    if( now > then || knows_magic_word() ) {
        // console.log("toggle "+event.target);
        if( $(this).hasClass("hidden") ) {
            $(this).removeClass("hidden").addClass("shown");
        } else {
            $(this).removeClass("shown").addClass("hidden");
        }
    } else if ( now <= then ) {
        alert("Come back after "+then.toLocaleString());
    }
}

$(".solution").click(clickToReveal);

// ================================================================
/* Use Ajax to load an example file. Also uses the highlight library to
highlight the code.  */

function loadExampleFiles() {
    $(".load").each(function (index, elt) {
            var src=$(elt).attr("data-src");
            console.log("processing "+src);
            var re= /\w+\.(\w+)$/;
            var matcharray = src.match(re);
            var ext = matcharray[1];
            console.log("ext is "+ext);
            var lang = ext == "notphp" ? "php" : ext;
            $.get(src, function(data, status) {
                    var highlit = hljs.highlight(lang,data,true);
                    $("<pre>").addClass("hljs").html(highlit.value).appendTo(elt);
                    console.log("success with "+src);
                });
        });
}
loadExampleFiles();

