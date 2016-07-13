// V1.0 by Scott D. Anderson

// A Task Administration app using JavaScript and LocalStorage. 

/* Design for V1.0

   The app manages a list of tasks -- a "to do" list.

   At the top of the app are several buttons:

   one allows the user to add a task by opening up a form to enter (1)
   text, (2) priority, (3) an optional deadline, and (4) a set of tags,
   possibly empty. Each tag affects the background color

   Another allows the user to add/edit/remove tags from the set of
   tags. The order of tags in this list is the sort order if a task has
   multiple tags.  

   A third allows the user to sort the tasks by priority, tags, or duedate. 

   Each task has the following properties:
   o) text, describing the task
   o) priority, default is "medium"
   o) duedate: a parseable date string
   o) tags: a list of tags that the user has created

*/

/* V2.0

   May allow a list of dates to the task. Each task automatically gets
   dates for 'created'.  A task can have a list of dates (e.g. created,
   early submission, due, lastchance, etc). It's sorted by the first one
   that isn't in the past.

   Allow list of tags to be managed, including setting colors, text and
   abbreviations.

   multiple dates, a list of parseable date strings
*/



/* To do:

   Make sure the site is usable just with keyboard.

   Implement click and drag to change the ordering.  Add an "order"
   attribute so that user can sort by, say, deadline, and then restore.

   How to make the textarea 100% in a narrow window.

   Eventually, allow labels to be added dynamically, like in Gmail
   
   Add a date picker for the due date

   Hide functions and such in the TASKMIN environment

   Use moustache?

*/

"use strict";

var TASKMIN = TASKMIN || {};

// ================================================================
// Task objects

var Task = function (inits) {
    var that = this === document ? {} : this;
    that.text = inits.text || "no description"; // error?
    that.done = inits.done || false;
    that.duedate = new Date(inits.duedate);
    that.priority = inits.priority || "medium";
    that.tags = inits.tags || [];
    that.taskId = Task.list.length;
    Task.list.push(that);
    return that;
};

Task.list = [];

Task.save = function () {
    localStorage.setItem("TASKMIN-tasklist",JSON.stringify(Task.list));
    // localStorage.setItem("TASKMIN-taglist","");
};    

Task.prototype.toString = function () {
    var due = this.duedate ? ' due on ' + this.duedate : '';
    var tags = this.tags.length == 0 ? '' : ' (' + this.tags.join(',') + ')';
    return '#<Task '+this.text+due+tags+'>';
};

Task.prototype.format = function (templateElt) {
    templateElt = templateElt || $('#templatetasklist > li');
    var clone = templateElt.clone();
    clone.attr("data-taskId",this.taskId);
    clone.find(".duedate").text(this.duedate.toDateString());
    clone.find(".priority").text(this.priority);
    clone.find(".text").text(this.text);
    // definitely need to make this more general and abstract
    if(this.tags && this.tags.indexOf("personal") != -1) {
        clone.addClass("personal");
    }
    return clone;
};

// Each button will have a class name that indicates what we want to do.

Task.prototype.admin = function (todo, taskElt) {
    /*
    if( this.hasOwnProperty(todo) ) {
        this[todo].call(this);
    } else {
        throw "No such method: "+todo;
    }
    */
    console.log("DO '"+todo+"' to element "+taskElt);
    switch(todo) {
    case "done": this.markDone(taskElt); break;
    case "del": this.remove(taskElt); break;
    case "undo": this.undoDone(taskElt); break;
    case "more": this.nyi(taskElt); break;
    default:
        throw "No such method: "+todo;
    }
};

Task.prototype.nyi = function (taskElt) {
    console.log("click on button for task "+this.taskId+" not yet implemented");
    var button = $('<button type="button" class="nyi">Not Yet Implemented</button>'); 
    var orig = $(taskElt).html();
    $(taskElt).html(button);
    var clear = function (evt) {
        console.log("Clearing NYI button");
        $(taskElt).html(orig);
        evt.stopPropagation();
    };
    button.focus().blur(clear);
}

Task.prototype.markDone = function (taskElt) {
    var index = this.taskId;
    console.log("Marking task "+index+" as done");
    this.done = true;
    var button = $('<button type="button" class="undo">undo</button>'); 
    var orig = $(taskElt).html();
    $(taskElt).html(button);
    var reallyDone = function () {
        $(taskElt).html(orig).css("opacity",0.5);
        Task.save();
        console.log("Task "+index+" is really done");
    };
    var undoDone = function () {
        this.done = false;
        $(taskElt).html(orig);
        console.log("undo!");
    }
    button.blur(reallyDone).click(undoDone).focus();
};

// ================================================================
// Example of closure failure. The following doesn't work:

/*
Task.prototype.markDoneFail = function (taskElt) {
    var index = this.taskId;
    console.log("Marking task "+index+" as done");
    this.done = true;
    var button = $('<button type="button" class="undo">undo</button>'); 
    var orig = $(taskElt).html();
    $(taskElt).html(button);
    var reallyDone = function () {
        $(taskElt).html(orig).css("opacity",0.5);
        Task.save();
        // Can't use this.taskId, because "this" doesn't have the right
        // value when the event handler is invoked. Can't "close" over the
        // value of "this." So, I assigned this.taskId to a local variable
        // and closed over that.  Could also assign "this" to "that" and
        // close over "that."
        console.log("Task "+this.taskId+" is really done");
    };
    var undoDone = function () {
        this.done = false;
        $(taskElt).html(orig);
    }
    button.blur(reallyDone).click(undoDone).focus();
};
*/


// ================================================================

Task.prototype.remove = function (taskElt) {
    var index = this.taskId;
    console.log("removing task "+index+": "+this.text);
    console.log("matching elt is "+taskElt);
    this.deleted = true;
    // for now, just update the display
    var button = $('<button type="button" class="undo">undo delete</button>'); 
    var orig = $(taskElt).html();
    $(taskElt).html(button);
    var reallyDone = function () {
        delete Task.list[index];
        $(taskElt).remove();
        Task.save();
        console.log("Task "+index+" is really deleted");
    };
    var undoDelete = function () {
        $(taskElt).html(orig);
        console.log("undo!");
    }
    button.click(undoDelete).blur(reallyDone).focus();
};

// ================================================================

function resetLocalStorage() {
    localStorage.setItem("TASKMIN-tasklist","");
    localStorage.setItem("TASKMIN-taglist","");
}

var example_task_list =
    [
        {text: "Create CS 210",
         priority: "medium",
         duedate: [ "August 1, 2016 23:59" ],
         tags: []
        },
        {text: "Help Mom with her taxes",
         priority: "medium",
         duedate: [ "August 8, 2016 23:59" ],
         tags: ["personal"]
        }
    ];

var task1 = new Task( example_task_list[0] );
var task2 = new Task( example_task_list[1] );

var example_tag_list =
    [
        {name: "personal",
         abbr: "P",
         color: "#2BFF9C"},
        {name: "done",
         abbr: "D",
         color: "#cccccc"}
    ];

// ================================================================

function readTaskList() {
    var stored = localStorage.getItem("TASKMIN-tasklist");
    var tasklist;
    if( stored ) {
        console.log("Using real saved data");
        tasklist = JSON.parse(stored);
    } else {
        console.log("Using example data");
        tasklist = example_task_list;
    }
    Task.list = [];
    for(var i in tasklist) {
        var taskDesc = tasklist[i];
        if( taskDesc != null )
            new Task(taskDesc);
    }
}

function formatTaskList() {
    console.log("formatting list of "+Task.list.length+" tasks");
    var template = $("#templatetasklist > li");
    var list = $("<ul>");
    for( var i in Task.list ) {
        var task = Task.list[i];
        var elt = task.format(template);
        if (task.done) $(elt).css("opacity",0.5);
        list.append(elt);
    }
    $("#tasklist").empty().append(list);
}

readTaskList();
formatTaskList();

function beforeMidnight(date) {
    console.log("allDay: "+date);
    if( date instanceof Date ) {
        date.setHours(23);
        date.setMinutes(59);
        return date;
    } else if( typeof date === typeof "string" ) {
        if( date.match(/^\d\d\d\d-\d\d-\d\d$/) ) {
            console.log("ISO 8601 format: YYYY-MM-DD, which parses as UTC time");
            return new Date(date+"T23:59:00Z");
        } else {
            // not sure what format, but should parse as local time
            var d = new Date(date)
            if( d instanceof Date ) {
                d.setHours(23);
                d.setMinutes(59);
                return d;
            } else {
                throw "Could not parse this date: "+date;
            }
        }
    } else {
        throw "Invalid arg to beforeMidnight: "+date;
    }
}

/*
beforeMidnight.test = function () {
    var standard = Date.parse("7/13/2016 23:59");
    var cases = this.cases;
    for( var i in cases ) {
        var d = beforeMidnight(cases[i]);
        if( d.getTime() != standard ) {
            throw "case "+i+": "+cases[i]+" fails."+standard+" versus "+d.getTime();
        }
    }
}

beforeMidnight.cases = ["7/13/2016", "2016-07-13", "7/13/2016 8:00 am", "July 13, 2016 8:00 am"];

// beforeMidnight.test();
*/

function addTask() {
    var inits = {};
    var text = $("#task-text").val();
    if( text == '' ) return;
    console.log('adding task '+text);
    inits.text = text;
    inits.priority = $("#task-priority").val(); // should validate this
    inits.duedate = beforeMidnight($("#task-due").val());
    inits.tags = [];
    $("#task-tag-checkboxes input:checked").each(function () {
        inits.tags.push(this.value);
    });
    var task = new Task(inits);
    $("#tasklist > ul").append(task.format());
    // should sort it into the right place, too
    localStorage.setItem("TASKMIN-tasklist", JSON.stringify(Task.list));
}

$("#done-add-task").click(function () { addTask(); $("#addtask-form").slideUp(); });
$("#cancel-add-task").click(function () { $("#addtask-form").slideUp(); });

$("#reset-button").click(function () {
    resetLocalStorage();
    readTaskList();
    formatTaskList();
});

// the form is hidden when page loads; has to be opened explicitly
$("#addtask-form").hide();


$("#addtask-button").click(function () {
    $("#addtask-form").slideToggle();
});
    
// ================================================================

/* This function gets any event that bubbles up from clicking on or
 * otherwise activating a button on a task. */

var gtarget, gtaskElt, gtaskId;

function handleTaskEvent(evt) {
    console.log("task event"+JSON.stringify(evt));
    var target = evt.target;
    console.log("click on "+target.outerHTML);
    gtarget = target;
    // var taskElt = $(target).closest("li.task");
    var taskElt = $(target).closest("li");
    gtaskElt = taskElt;
    if( taskElt.length === 0 ) {
        throw "didn't find a task element";
    }
    console.log("taskElt is "+taskElt.html());
    var attrTaskId = $(taskElt).attr("data-taskId");
    if( typeof attrTaskId === 'undefined' ) {
        throw "no data-taskId attribute";
    }
    var taskId = parseInt(attrTaskId);
    gtaskId = taskId;
    if( ! typeof taskId === "number" ) {
        throw "task doesn't have an ID"+taskElt;
    }
    var task = Task.list[taskId];
    // What kind of element was clicked on?
    if( target.tagName === "BUTTON" ) {
        task.admin(target.className, taskElt);
    } else {
        console.log("non-button click");
        // probably allow the user to edit the target
    }
}

// $("#tasklist").click(handleTaskEvent);

// ================================================================
// Try event delegation instead

$("#tasklist").on("click",
                  "button.done",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = Task.list[taskId];
                      task.markDone(taskElt);
                  });

$("#tasklist").on("click",
                  "button.delete",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = Task.list[taskId];
                      task.remove(taskElt);
                  });

$("#tasklist").on("click",
                  "button.more",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = Task.list[taskId];
                      task.nyi(taskElt);
                  });

function getTaskElt(target) {
    var result = $(target).closest("LI.task");
    if( result.length != 1 ) {
        throw "Couldn't find LI.task starting at "+$(target).html();
    }
    return result[0];
}

function getTaskId(elt) {
    var attr = $(elt).attr("data-taskId");
    if( typeof attr !== typeof "string" || attr.length == 0 ) {
        throw "No valid data-taskId attribute for "+$(elt).html();
    }
    try {
        return parseInt(attr,10);
    }
    catch (err) {
        throw "Couldn't get numeric value out of data-taskID attribute: "+attr;
    }
}

// ================================================================


/*

$(document).keypress(function (evt) {
    SPC = 32;
    ENTER = 13;
    
    switch (evt.which) {
    case SPC:
    case ENTER:
        // these keys trigger a click event on the focussed element
        $(event.target).click();
        break;

    default:
        console.log("Don't know how to handle "+evt.which
                    +" ("+String.fromCharCode(evt.which)+")");
    }
});

*/

