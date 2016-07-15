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
    if( typeof inits === "undefined" ) inits = {};
    that.text = inits.text || "no description"; // error?
    that.done = inits.done || false;
    that.duedate = beforeMidnight(inits.duedate || "today");
    that.priority = inits.priority || "medium";
    that.tags = inits.tags || [];
    that.taskId = Task.list.length;
    Task.list.push(that);
    return that;
};

// Class static methods

Task.list = [];

Task.save = function () {
    localStorage.setItem("TASKMIN-tasklist",JSON.stringify(Task.list));
};    

Task.read = function () {
    localStorage.getItem("TASKMIN-tasklist");
};    
    
Task.show = function () {
    var tasklist = Task.list;
    for( var i in tasklist ) {
        console.log(i+": "+tasklist[i].text);
    }
};

// ================================================================
// Sorting.  Could allow list of sort keys, but not yet.

Task.sortKey = "taskId";         // the default.

Task.sort = function (sortKey) {
    if(sortKey) {
        Task.sortKey = sortKey;
    } else {
        sortKey = Task.sortKey;
    }
    switch (sortKey) {
    case "taskId" : 
        Task.list.sort(function (a,b) {
            return a.taskId - b.taskId;
        });
        break;
    case "dueDate":
        Task.list.sort(function (a,b) {
             // subtracting date objects is okay, but not strings
            return new Date(a.duedate) - new Date(b.duedate);
        });
        break;
    case "mainTag":
        Task.list.sort(function (a,b) {
            var atag = a.mainTag();
            var btag = b.mainTag();
            // sorting by strings needs this method
            return atag.localeCompare(btag);
        });
        break;
    }
};

// ================================================================
// Instance methods

Task.prototype.toString = function () {
    var due = this.duedate ? ' due on ' + this.duedate : '';
    var tags = this.tags.length == 0 ? '' : ' (' + this.tags.join(',') + ')';
    return '#<Task '+this.text+due+tags+'>';
};

Task.prototype.mainTag = function () {
    var tags = this.tags;
    if( tags.length == 0 ) {
        return "";
    } else {
        return tags[0];
    }
}


// This function formats the Task for display on a web page.

Task.prototype.format = function (templateElt) {
    templateElt = templateElt || $('#templatetasklist > li');
    var clone = templateElt.clone();
    clone.attr("data-taskId",this.taskId);
    clone.find(".duedate").text(this.duedate.toDateString());
    clone.find(".priority").text(this.priority);
    clone.find(".text").text(this.text);
    var tags = this.tags;
    var tagsElt;
    for( var i in tags) {
        // I've decided to store tag names rather than indexes in the Task, even
        // though that will make lookup a bit less efficient. But the list of tags
        // should be short.
        var tagName = tags[i];
        var tag = Tag.getTagByName(tagName);
        if( !tagsElt ) {
            tagsElt = clone.find(".tags");
            $(tagsElt).text(tag.abbr);
        } else {
            $(tagsElt).text(", "+tag.abbr);
        }
    }
    if(tags.length > 0) {
        var mainTag = Tag.getTagByName(this.mainTag());
        clone.css("background-color",mainTag.color);
    }
    if(this.done) clone.addClass("done");
    return clone;
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
        $(taskElt).html(orig).addClass("done");
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

var example_task_list =
    [
        {text: "Create CS 210",
         priority: "medium",
         duedate: "August 1, 2016 23:59",
         tags: []
        },
        {text: "Help Mom with her taxes",
         priority: "medium",
         duedate: "August 8, 2016 23:59",
         tags: ["personal"]
        }
    ];

var task1 = new Task( example_task_list[0] );
var task2 = new Task( example_task_list[1] );

// ================================================================

function readTaskList() {
    var stored = localStorage.getItem("TASKMIN-tasklist");
    var tasklist;
    if( stored ) {
        console.log("Using real saved data");
        tasklist = JSON.parse(stored);
    } else {
        console.log("Using example task data");
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
        if (task.done) $(elt).addClass("done");
        list.append(elt);
    }
    $("#tasklist").empty().append(list);
}

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

// the form is hidden when page loads; has to be opened explicitly
$("#addtask-form").hide();


$("#addtask-button").click(function () {
    $("#addtask-form").slideToggle();
});
    
// ================================================================
/* Task tags. A task can have more than one tag. Each has a text label,
 * and optional abbreviation, and an optional background color (default
 * gray). All are added to the LI.task span.tags.  The last tag decides
 * the background color; no choice there, except to delete other tags.
 * Tags are very similar to Tasks, so maybe use some inheritance?

 * inits properties are text, abbr, and color

 */

var Tag = function(inits) {
    var that = this === document ? {} : this;
    if( typeof inits === "undefined" ) inits = {};
    that.text = inits.text || "no name"; // error?
    that.abbr = inits.abbr;
    that.color = inits.color || "#cccccc"; // make this a global parameter
    that.tagId = Tag.list.length;
    Tag.list.push(that);
    return that;
};

// Class static methods

Tag.list = [];

Tag.save = function () {
    localStorage.setItem("TASKMIN-taglist",JSON.stringify(Tag.list));
};    

Tag.getTagByName = function (name) {
    var tag = Tag.list.find(function (tag) { return tag.text == name; });
    if( ! tag ) {
        throw "Couldn't find tag named "+name;
    }
    return tag;
};

// Instance Methods

Tag.prototype.toString = function () {
    var abbr = this.abbr == this.text ? "" : " ("+this.abbr+")";
    return '#<Tag '+this.text+abbr+" "+this.color+'>';
};

// TODO

Tag.prototype.format = function (templateElt) {
    templateElt = templateElt || $('#task-checkbox-template > li');
    var clone = templateElt.clone();
    var id = "tag-"+this.text;
    var input = clone.find("input").one();
    input.attr("id",id);
    input.attr("value",this.text);
    clone.find("label").one().attr("for",id);
    clone.find(".tag-abbr").one().text(this.abbr);
    clone.find(".tag-text").one().text(this.text);
    return clone;
};

var example_tag_list =
    [
        {text: "personal",
         abbr: "P",
         color: "#2BFF9C"},
        {text: "work",
         abbr: "W",
         color: "#FF2b9d"}
    ];

var tag1 = new Tag( example_tag_list[0] );
var tag2 = new Tag( example_tag_list[1] );

function readTagList() {
    var stored = localStorage.getItem("TASKMIN-taglist");
    var taglist;
    if( stored ) {
        console.log("Using real saved tag data");
        taglist = JSON.parse(stored);
    } else {
        console.log("Using example tag data");
        taglist = example_tag_list;
    }
    Tag.list = [];
    for(var i in taglist) {
        var inits = taglist[i];
        if( inits != null )
            new Tag(inits);
    }
}

function addTag() {
    var inits = {};
    inits.text = $("#tag-text").val();
    // TODO: UX for empty value
    if( inits.text == "" ) { throw "tag text required"; }
    inits.abbr = $("#tag-abbr").val();
    inits.color = $("#tag-color").val();
    var tag = new Tag(inits);
    // Update the Add Task form
    formatAddTask();
    // Save
    Tag.save();
    // And disappear
    $("#edittags-area").slideUp();
}

$("#done-add-tag").click(function () { addTag(); $("#edittags-area").bounds(1,1).slideUp(); });
$("#cancel-add-tag").click(function () { $("#edittags-area").one().slideUp(); });

// the form is hidden when page loads; has to be opened explicitly
$("#edittags-area").hide();

$("#edittags-button").click(function () {
    $("#edittags-area").slideToggle();
});
    
// ================================================================
// Buttons on individual task elements.
// Try event delegation instead of a single click handler for #tasklist

var gtarget, gtaskElt, gtaskId;

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

// ================================================================


function getTaskElt(target) {
    var result = $(target).closest("LI.task");
    if( result.length != 1 ) {
        throw "Couldn't find LI.task starting at "+$(target).html();
    }
    return result[0];
}

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
// Add the tags to the Add Task form

function formatAddTask() {
    var template = $("#task-checkbox-template > li").one();
    var dest = $("#task-tag-checkboxes").one();
    var tagList = $("<ul>");
    var tags = Tag.list;
    for( var i in tags ) {
        var tag = tags[i];
        var tagElt = tag.format(template);
        tagList.append(tagElt);
    }
    dest.empty().append(tagList);
}

// ================================================================
// Sorting Menu

$("#sort-button").one().click( function () { $("#sort-menu").one().slideToggle(); });

$("#sort-menu").one().hide();

$("#sort-by-taskId").one().click(function () {
    Task.sort("taskId"); formatTaskList(); $("#sort-menu").one().slideUp(); });
$("#sort-by-dueDate").one().click(function () {
    Task.sort("dueDate"); formatTaskList(); $("#sort-menu").one().slideUp(); });
$("#sort-by-mainTag").one().click(function () {
    Task.sort("mainTag"); formatTaskList(); $("#sort-menu").one().slideUp(); });


// ================================================================

function resetLocalStorage() {
    localStorage.setItem("TASKMIN-tasklist","");
    localStorage.setItem("TASKMIN-taglist","");
}

function initializeAll() {
    readTaskList();
    readTagList();
    formatTaskList();
    formatAddTask();
}

$("#reset-button").click(function () {
    resetLocalStorage();
    initializeAll();
});

// The only function invoked in loading this file, except for adding event handlers

initializeAll();

$("#tasklist > ul").one().sortable({
    update: function( event, ui ) {
        $("#tasklist > ul > li").each( function (index, elt) {
            var taskId = getTaskId(this);
            var task = Task.list[taskId];
            $(this).attr("data-taskId",index);
            task.taskId = index;
        });
        console.log("sorting tasks");
        Task.sort("taskId");
        Task.save();
    }
});
