/* app to take an array of JS objects, each object representing a multiple choice question, like this:
 * {Q: 'Which house is Harry Potter in?', 
 * A: 'Gryffindor',
 * B: 'Hufflepuff',
 * C: 'Ravenclaw',
 * D: 'Slytherin',
 * ANS: 'A'}
 * 
 * Each question is turned into a multiple-choice item in a form, each of
 * which as a 'grade this' button and there's also an overall button to
 * grade the whole quiz.  Allow 2 to 8 options.
 * 
 * Students practice dynamically creating form elements and adding a
 * delegated event handler to grade an item or all items.
 */

// This function creates and adds a single question to #exam

function makeQuestion(questionObj, index) {
    console.log(index);
    console.log('obj %o', questionObj);
    var $q = $("<li>").addClass("question").text(questionObj.Q);
    //    $("<p>").text(questionObj.Q).appendTo($q);
    var name = "Q"+index;
    var opts = ['A','B','C','D','E','F','G','H'];
    opts.forEach(function (opt,i) {
        if(questionObj[opt]) {
            var questionText = opt+': '+questionObj[opt];
            var input = $('<input type="radio">')
                    .attr('name',name)
                    .attr('value',opt);
            var option = $('<label>').append(input).append(questionText);
            option.appendTo($q);
        }
    });
    $("<button>").text("check").attr('data-qnum',index).appendTo($q);
    $('#exam').one().append($q);
}

// We'll attach this function to #exam and delegate all grading to it.

$("#exam").one().on("click","[data-qnum]",
                    function (event) {
                        var num = parseInt($(this).attr('data-qnum'));
                        console.log('num is '+num);
                        var ans = questions[num].ANS;
                        var $qelt = $(this).closest('.question').one();
                        var given = $qelt.find("input:checked").one().attr("value");
                        // remove the other class in case someone changes their mind
                        console.log('ans is '+ans+' and given is '+given);
                        if( ans === given ) {
                            $qelt.addClass("correct").removeClass("wrong");
                        } else {
                            $qelt.addClass("wrong").removeClass("correct");
                        }
                    });

$('#checkall').one().click(function () {
    $('button[data-qnum]').bounds(1).click();
});
