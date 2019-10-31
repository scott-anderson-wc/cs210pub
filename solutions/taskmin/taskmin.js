// V2.0 by Scott D. Anderson



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

/* future versions

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
TASKMIN.version = 2.0;


function beforeMidnight(date) {
    // console.log("beforeMidnight: "+date);
    if( date == "today" ) date = new Date();
    if( date instanceof Date ) {
        date.setHours(23);
        date.setMinutes(59);
        return date;
    } else if( typeof date === typeof "string" ) {
        if( date.indexOf(":") != -1 ) {
            // make the reasonable but possibly erroneous assumption that if the
            // string contains a colon, it has be previously regularized
            return new Date(date);
        } else if( date.match(/^\d\d\d\d-\d\d-\d\d$/) ) {
            // Date pickers often return ISO 8601 format. Chrome's does.
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

beforeMidnight.cases = ["7/13/2016",
                        "2016-07-13",
                        "7/13/2016 8:00 am",
                        "July 13, 2016 8:00 am"];

// beforeMidnight.test();

// ================================================================
// Dealing with the add task form

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
}

$("#done-add-task").click(function () { addTask(); $("#addtask-form").slideUp(); });
$("#cancel-add-task").click(function () { $("#addtask-form").slideUp(); });

// the form is hidden when page loads; has to be opened explicitly
$("#addtask-form").hide();

$("#addtask-button").click(function () {
    $("#addtask-form").slideToggle();
});
    
// ================================================================
// Dealing with the form to add a tag

function addTag() {
    var inits = {};
    inits.text = $("#tag-text").val();
    // TODO: UX for empty value
    if( inits.text == "" ) { throw "tag text required"; }
    inits.abbr = $("#tag-abbr").val();
    inits.color = $("#tag-color").val();
    var tag = new Tag(inits);
    addTagsToAddTaskForm();
    addTagsToEditForm();
    // clear the form
    $("#tag-text").val("");
    $("#tag-abbr").val("");
    $("#tag-color").val("#ffffff");
    // and disappear
    $("#edittags-area").slideUp();
}

// This is also invoked when we create the page.

function addTagsToAddTaskForm() {
    var template = $("#task-checkbox-template > li").one();
    var dest = $("#task-tag-checkboxes").one();
    var tagListElt = $("<ul>");
    var tags = TagList.list;
    for( var i in tags ) {
        var tag = tags[i];
        var tagElt = tag.formatCheckbox(template);
        tagListElt.append(tagElt);
    }
    dest.empty().append(tagListElt);
}

function addTagsToEditForm() {
    var template = $("#edit-tag-list-template > li").one();
    var dest = $("#edit-tags-list").one();
    var tagListElt = $("<ul>");
    var tags = TagList.list;
    for( var i in tags ) {
        var tag = tags[i];
        var tagElt = tag.formatListItem(template);
        tagListElt.append(tagElt);
    }
    dest.empty().append(tagListElt);
}

$("#done-add-tag").click(function () { addTag(); $("#edittags-area").one().slideUp(); });
$("#cancel-add-tag").click(function () { $("#edittags-area").one().slideUp(); });

// the form is hidden when page loads; has to be opened explicitly
$("#edittags-area").hide();

$("#edittags-button").click(function () {
    $("#edittags-area").slideToggle();
});
    
// ================================================================
// Edit form: allow tags to be deleted.

var gliElt;

$("#edit-tags-list")
        .one()
        .on("click",
            "button.delete",
            function () {
                var liElt = $(this).closest("li.tag").one();
                gliElt = liElt;
                var index = parseInt($(liElt).attr("data-tagid"),10);
                console.log("deleting tag w/ index "+index);
                TagList.del(index);
                $(liElt).remove();
            });

// ================================================================
// Buttons on individual task elements.
// Try event delegation instead of a single click handler for #tasklist

// These globals are just for debugging. No longer necessary.
var gtarget, gtaskElt, gtaskId, gtask;

$("#tasklist").on("click",
                  "button.done",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = TaskList.get(taskId);
                      task.markDone(taskElt);
                  });

$("#tasklist").on("click",
                  "button.delete",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = TaskList.get(taskId);
                      gtask = task;
                      task.remove(taskElt);
                  });

$("#tasklist").on("click",
                  "button.more",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                      var task = TaskList.get(taskId);
                      task.nyi(taskElt);
                  });

// ================================================================
// Utility functions for working with the DOM task elements.

function getTaskElt(target) {
    var result = $(target).closest("LI.task");
    if( result.length != 1 ) {
        throw "Couldn't find LI.task starting at "+$(target).html();
    }
    return result[0];
}

// more globals for debugging. 
var gelt, gattr;

function getTaskId(elt) {
    gelt = elt;
    var attr = $(elt).attr("data-taskId");
    if( typeof attr !== typeof "string" || attr.length == 0 ) {
        console.log("bad attr is "+attr);
        gattr = attr;
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
// Sorting Menu

$("#sort-button").one().click( function () { $("#sort-menu").one().slideToggle(); });

$("#sort-menu").one().hide();

$("#sort-by-taskId").one().click(function () {
    TaskList.sort("taskId").format(); $("#sort-menu").one().slideUp(); });
$("#sort-by-dueDate").one().click(function () {
    TaskList.sort("dueDate").format(); $("#sort-menu").one().slideUp(); });
$("#sort-by-mainTag").one().click(function () {
    TaskList.sort("mainTag").format(); $("#sort-menu").one().slideUp(); });


// ================================================================

function resetLocalStorage() {
    TaskList.clear();
    TagList.clear();
}

function initializeAll() {
    TagList.readInstances();
    TaskList.readInstances().format();
    addTagsToAddTaskForm();
    addTagsToEditForm();
    addSortableBehavior();
}

$("#reset-button").click(function () {
    resetLocalStorage();
    initializeAll();
});

// ================================================================

// We use jQuery UI's sortable method to allow users to reorder tasks
// using the mouse (and a plug-in to allow them to use a touch
// screen). This update method lets us renumber the tasks whenever that
// happens.

function addSortableBehavior() {
    $("#tasklist > ul").one().sortable({
        update: function( event, ui ) {
            $("#tasklist > ul > li").each( function (index, elt) {
                var taskId = getTaskId(this);
                var task = TaskList.get(taskId);
                $(this).attr("data-taskId",index);
                task.taskId = index;
            });
            console.log("sorting tasks");
            TaskList.sort("taskId").save();
        }
    });
}
