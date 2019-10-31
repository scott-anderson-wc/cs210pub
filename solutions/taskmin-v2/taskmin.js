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
TASKMIN.version = 3.0;

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
// This is invoked when we create the page.

const predefined_tags = ['personal', 'work'];

function addTagsToAddTaskForm() {
    var template = $("#task-checkbox-template > li").one();
    var dest = $("#task-tag-checkboxes").one();
    var tagListElt = $("<ul>");
    var tags = predefined_tags;
    for( var i in tags ) {
        let tag = tags[i];
        let clone = template.clone();
        clone.find('tag-text').text(tag);
        clone.find('[name=tag]').attr('value',tag);
        tagListElt.append(clone);
    }
    dest.empty().append(tagListElt);
}

// ================================================================
// Buttons on individual task elements.
// Uses event delegation 

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

var the_tasklist = new TaskList("TASKMIN-tasklist");

function resetLocalStorage() {
    the_tasklist.clear();
    localStorage.setItem(the_tasklist.getKey(),
                         JSON.stringify(example_task_list));
}

function initializeAll() {
    addTagsToAddTaskForm();
    $("#tasklist").one().empty().append(the_tasklist.readFromLocalStorage().format());
}

$("#reset-button").click(function () {
    resetLocalStorage();
    initializeAll();
});

