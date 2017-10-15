/* JS code to create a rubric that can be emailed to the professor or TA
 for review, data entry, printing, forwarding to the student, etc.

Version 1.0 Sept 10, 2017 Scott D. Anderson

To do:

- Incorporate a name for the rubric, e.g. assignment name/number
- sum up the points
- submit by Ajax, so we have continuity across students
- keep track of the values, to make data entry easier
- have a menu of student names for ease and reliability
- shrink the menu when a student has been done
- format the email more nicely
- remember the comments for a field, maybe in localstorage

Version 1.1 Sept 11, 2017 Scott I changed it to do an Ajax submission to a
PHP script that hard-codes the destination, instead of using a hidden
input. That new script takes just four inputs:

FROM_NAME
FROM_EMAIL
SUBJECT
BODY

*/

// Wrap all of this in a IIFE when done
var items; // just while debugging

function processSource() {
    var lines = $('[type=rubric]').text().split("\n");
    console.log("lines: "+lines.length);
    items = [];
    var prev_was_blank = true;
    var starts_with_int = /^(\d+)\s+/;
    var blank_line = /^\s*$/;
    for( var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var item_match = starts_with_int.exec(line);
        if( item_match != null) {
            var value = parseInt(item_match[0],10);
            var desc = line.substr(item_match[0].length);
            console.log("value "+value+" desc "+desc);
            items.push({value: value, desc: desc})
        }
    }
    var $ol = $('<ol>');
    var $li = $('#template > li');
    var sum = 0;
    for( i in items) {
        var item = items[i];
        sum += item.value;
        var clone = $li.clone();
        clone.find('.value').text(item.value);
        clone.find('.earned').attr('name','value'+i);
        clone.find('.desc').html(item.desc);
        clone.find('.desc_input')
            .attr('name','desc'+i)
            .attr('value',item.desc);
        clone.find('.comments').attr('name','comments'+i);
        $ol.append(clone);
    }
    $("#finished_rubric").append($ol)
    $("<button>submit</button>").appendTo("#finished_rubric");
    console.log("total:" + sum);
    $("form").submit( function (event) {
        event.preventDefault();
        console.log("submitting");
        var name = $("[name=student_name]").val();
        var assign = $("[name=assign_name]").val();
        var body = format_email(name,assign,items);
        $.post('https://cs.wellesley.edu/~cs110/php/mailto_scott_anderson_at_wellesley_edu.php',
               {from_name: 'Scott D. Anderson',
                from_email: 'scott.anderson@wellesley.edu',
                subject: `Grade for ${name} on ${assign}`,
                body: body},
               function (resp) {
                   console.log("resp: "+resp);
                   if(resp.status === 'ok') {
                       alert('sent');
                   }
               });
        });
}

processSource();

function format_email(name,assign,items) {
    var body = `<p>Here is the grade for ${name} on ${assign}</p>\n`;
    body += "<ol>\n";
    for( var i in items) {
        var item = items[i];
        var earned = $(`[name=value${i}]`).val();
        var comments = $(`[name=comments${i}]`).val();
        body += `<li>${earned}/${item.value} ${item.desc} ${comments}\n`;
    }
    body += "</ol>\n";
    return body;
}
