// JavaScript File

/* defined in jquery.min.js */
/* global $ */

/* defined in questions.js */
/* global questions */

/* defined in Question.js */
/* global Question */

(function () {
    
    function makeQuestions() {
        // you could also use .forEach() here, but I think the loop is fine.
        var $right = $("#right");
        var $left = $("#left");
        for( var i=0; i < questions.length; i++ ) {
            var quest = questions[i];
            var qobj = new Question(quest,i);
            if( i >= questions.length / 2 ) {
                qobj.addToDOM($right);    
            } else {
                qobj.addToDOM($left);
            }
        }
    }
    
    // This is short but hard. Note how the correct answer and the given answer 
    // are looked up in the DOM.
    
    function addGrader(sel) {
        $(sel).on('click','[data-kind=grade]', function (event) {
            console.log('Clicked on '+event.target);
            var $div = $(event.target).closest(".question");
            var correct = $div.attr("data-answer");
            var given =$div.find("[type=radio]:checked").val();
            console.log("correct answer is "+correct);
            console.log("User answered "+given);
            if( correct == given ) {
                $div.removeClass("wrong").addClass("correct");
                $div.find('.feedback').text('Correct!');
            } else {
                $div.removeClass("correct").addClass("wrong");
                $div.find('.feedback').text("Sorry, that's not correct.");
            }
        });
    }
    
    makeQuestions();
    addGrader("#grader");
})();
