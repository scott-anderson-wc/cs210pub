/* This function is supplied with a DOM element that it will append to,
 * so it works by side-effect. It's also given a list of authors, each of
 which is a JS object. */

function addAuthors(parentElt, authors) {
    var addOne = function (author) {
        var set = $("<span>").text(author.display_name).addClass('author');
        return parentElt.append(set);
    };

    if( authors.length == 1 ) {
        addOne(authors[0]);
    }
    else if( authors.length == 2 ) {
        addOne(authors[0]);
        parentElt.append(" and ");
        addOne(authors[1]);
    } else {
        addOne(authors[0]);
        parentElt.append(", ");
        // recursion, but the lists will be short.
        addAuthors( parentElt, authors.slice(1) );
    }
}

/* Function to put all the talks in the document, given a list of talks. */

function formatAllTalksUndisplayedDiv (talks) {
    var tmpl = $('#summary-div .summary');
    var dest = $('<ul>');       // lists are a bit more accessible
    talks = talks.slice(0,5);  // subset for debugging
    for( var i=0; i < talks.length; i++ ) {
        talk = talks[i];
        console.log(i+": "+talk.title);
        var clone = tmpl.clone();
        // insert data
        clone.find(".index").text(i+1);
        clone.find(".title").html(talk.title);
        clone.find(".authors").html("");
        addAuthors(clone.find(".authors"), talk.presenters);
        clone.find(".start").text(talk.start_time);
        clone.find(".location").text(talk.location);
        clone.find(".abstract").html(talk.description).hide();
        // finishing up
        dest.append(clone);
        // debug
        // console.log(clone.attr("data-scott"));
    }
    $('#summaries').append(dest);
}

// a pointer to the data, just for testing and debugging

var global_data;    

$.getJSON('ruhlman-2014.json',
          function(data) {
              global_data = data;
              console.log("loaded "+data.length+" talks");
              formatAllTalksUndisplayedDiv(data);
          });
                 
// Initially, the overlay is hidden and only appears when a summary is
// clicked on.

$('#overlay').hide();

// Also for testing and debugging
var global_target;
var global_summary;

$("#summaries").click(function (event) {
    console.log("click!");
    global_target = event.target;
    var target = event.target;
    var summary = $(target).closest('.summary');
    global_summary = summary;
    summary.find(".abstract").slideToggle();
});

$("#summaries").keypress(function (evt) {
    console.log(evt.which);
    if( evt.which == 32 || evt.which == 13 ) {
        $(evt.target).click();
    }
});

$("#summary-div").hide();
