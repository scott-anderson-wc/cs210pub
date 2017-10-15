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

Version 1.2 Sept 18, 2017 Scott. I changed it to use HTML email PHP
script, and to have the mail HTML page load a JSON file with the
particular rubric data in it. Note that that file is assumed to set a
global called rubric_data. That should be loaded *before* this file is
loaded.

*/

// Wrap all of this in a IIFE when done

var roster = null;

$.get('roster.json',function (roster) {
    window.roster = roster
    var menu = $("<select>");
    $("<option>").attr("value",-1).text("Add to Email").appendTo(menu);
    roster.forEach(function (student,index) {
        $("<option>")
            .attr("value",index)
            .text(student.name+" ("+student.email+")")
            .appendTo(menu);
        });
    menu.change(function (evt) {
        var index = menu.val();
        if(index != -1) {
            var names = $("[name=student_name]").val();
            var emails = $("[name=student_email]").val();
            if(names!="") {
                $("[name=student_name]").val(names+" and "+roster[index].name);
                $("[name=student_email]").val(emails+","+roster[index].email);
            } else {
                $("[name=student_name]").val(roster[index].name);
                $("[name=student_email]").val(roster[index].email);
            }
        }
        menu.find("[value="+index+"]").attr("disabled","disabled");
    });
    $("#roster_menu_here").empty().append(menu);
},"json").fail(function (jqXHR,textStatus,errorThrown) { console.log("Could not load roster.json: "+textStatus,errorThrown); });
    

$("[name=assignment]").change(function (event) {
    var assign = $(this).val();
    $("#finished_rubric").empty();
    if( assign === '' ) return;
    var file = "../assignments/"+assign+"/rubric_data.js";
    console.log("loading file: "+file);
    $.getScript(file, processSource)
        .fail(function (jqxhr, settings, exception) {
            alert("Failed to load "+file);
        });
});

$("#finished_rubric").submit(function (evt) {
    evt.preventDefault();
    console.log("maybe submitting");
    var name = $("#finished_rubric [name=student_name]").val();
    var title = $("#assign_title").text();
    var body = format_email(name,title,rubric_data.items);
    var recipients = $("#finished_rubric [name=student_email]").val();
    // check for missing scores
    var missing = [];
    $("#finished_rubric input.earned").each(function (i,elt) {
        if(elt.value=='') {
            missing.push(i+1);
        }
    });
    if(missing.length > 0) {
        alert("Scores missing for items "+missing.join())
        return;
    }
    // add @wellesley.edu to addresses
    var addrs = recipients.split(',').map(function (elt) {
        return elt.match(/@/) ? elt : elt+'@wellesley.edu';
    }).join(',');
    console.log('to: '+addrs);
    if(confirm("are you sure?")) {
        console.log("really submitting");
        $.post('mail.php',
               {from_name: 'Scott D. Anderson',
                from_email: 'scott.anderson@wellesley.edu',
                recipients: addrs,
                subject: title,
                body: body},
               function (resp) {
                   console.log("resp: "+resp);
                   if(resp.status === 'ok') {
                       alert('sent');
                       $("form")[0].reset();
                   } else {
                       alert("Ooops, response was "+JSON.stringify(resp));
                   }
               },
              "json");
    } else {
        console.log("cancelled");
    }
});

$("#finished_rubric").on("change","input.earned",function(event) {
    var earned = 0;
    $("input.earned").each(function (i,elt) {
        earned += parseInt(elt.value,10) || 0;
    });
    console.log("Total Score: "+earned);
    $("#finished_rubric .score").text(earned);
});

function processSource() {
    if( rubric_data == undefined ) {
        console.log("no variable rubric_data!");
        return;
    }
    $("#form_template > div").clone().appendTo("#finished_rubric");
    var title = "Grade for "+rubric_data.assign_num+": "+rubric_data.assign_desc;
    $("#assign_title").text(title);
    var items = rubric_data.items;
    console.log("items: "+items.length);
    var $ol = $('<ol>');
    var $li = $('#item_template > li');
    var possible = 0;
    for( i in items) {
        var item = items[i];
        possible += item.value;
        var clone = $li.clone();
        clone.find('.value').text(item.value);
        clone.find('.earned').attr('name','value'+i);
        clone.find('.desc').html(item.desc);
        clone.find('.comments').attr('name','comments'+i);
        $ol.append(clone);
    }
    $("#finished_rubric .items_go_here").append($ol)
    $("#finished_rubric .possible").text(possible);
    console.log("total available:" + possible);
}

// returns something that has been escaped properly
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"' : '&quot;',
    "'": '&#39;',
    '/': '&#x2F',
    '`': '&#x60',
    '=': '&#x#D;'
};

function escapeHTML(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

// processSource();

function format_email(name,assign,items) {
    var body = `<p>Here is the grade for ${name} on ${assign}</p>\n`;
    body += "<ol>\n";
    var score = 0;
    var possible = 0;
    for( var i in items) {
        var item = items[i];
        possible += item.value;
        var earned = $(`[name=value${i}]`).val();
        score += parseInt(earned,10);
        var comments = escapeHTML($(`[name=comments${i}]`).val());
        if (comments !== '') {
            body += `<li>${earned}/${item.value} ${item.desc} <p>${comments}</p></li>\n`;
        } else {
            body += `<li>${earned}/${item.value} ${item.desc}</li>\n`;
        }
    }
    body += "</ol>\n";
    body += "<p>Total: "+score+"/"+possible+"</p>\n";
    return body;
}
