// JavaScript File

var allQuestions = [];  // we never actually use this.

/* global $ */

/* this function needs to give each set of radio buttons a unique name. 
We'll use Q+i where i is the index of the question.  So, this function 
needs to know, via an argument. It also stores the correct answer on 
the surrounding DIV, using data-answer, so the event handler can get it. 
Otherwise, this is mostly based on the checkbox-creating code from 
Chapter 11. */

// This is easy, but maybe not intuitive.

function Question(init,index) {
    var $div = $("<div></div>", {'class':'question', 'data-answer':init.ANS});
    var $q = $("<p></p>").text("Q"+index+": "+init.Q);
    $div.append($q);

    // writing this function makes life easier. 
    
    function makeOption(prop, text) {
        var $label = $("<label></label>");
        var $input = $("<input></input>", 
                {'type':"radio","value":prop,"name":"Q"+index});
        var $span = $("<span></span>", {'class':'label-body'}).text(text);
        $label.append($input);
        $label.append($span);
        return $label;
    }
    
    // add the options. Maybe a loop would be better, but I think this is okay.
    $div.append( makeOption("A",init.A));
    $div.append( makeOption("B",init.B));
    $div.append( makeOption("C",init.C));
    $div.append( makeOption("D",init.D));
    
    // Many options for our grading button. 
    var $button = $("<input></input>", {'type':'button',
                                        'value':'grade', 
                                        'class': "button-primary",
                                        "data-kind":"grade"});
    var $feedback = $("<output></output>",{'class':'feedback'});
    $div.append($button);
    $div.append($feedback)
    this.$element = $div;  // our only instance variable
    allQuestions.push(this);
}

Question.prototype.addToDOM = function (sel) {
    $(sel).append(this.$element);
};


