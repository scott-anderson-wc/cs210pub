// ================================================================
// Task objects. Task objects have four instance variables, as shown in
// these examples:

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

// ================================================================
// The constructor. The argument is an object containing the data
// for the instance variables. The new object is automatically pushed onto
// the persistent TaskList (defined in another file).

var Task = function (inits) {
    if( this === window ) {
        throw "Constructor called without 'new'";
    }
    if( typeof inits === "undefined" ) inits = {};
    this.text = inits.text || "no description"; // error?
    this.done = inits.done || false;
    this.duedate = beforeMidnight(inits.duedate || "today");
    this.priority = inits.priority || "medium";
    this.tags = inits.tags || [];
    this.taskId = TaskList.push(this); // add to persistent list
    return this;
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

// This method formats the Task for display on a web page.

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
        var tag = TagList.getTagByName(tagName);
        if( !tagsElt ) {
            tagsElt = clone.find(".tags");
            $(tagsElt).text(tag.abbr);
        } else {
            $(tagsElt).text(", "+tag.abbr);
        }
    }
    if(tags.length > 0) {
        var mainTag = TagList.getTagByName(this.mainTag());
        clone.css("background-color",mainTag.color);
    }
    if(this.done) clone.addClass("done");
    return clone;
};

// This method gets invoked when the user clicks on the "more" button

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

// This method gets invoked when the user clicks on the "done" button

Task.prototype.markDone = function (taskElt) {
    var index = this.taskId;
    console.log("Marking task "+index+" as done");
    this.done = true;
    var button = $('<button type="button" class="undo">undo</button>'); 
    var orig = $(taskElt).html();
    $(taskElt).html(button);
    var reallyDone = function () {
        $(taskElt).html(orig).addClass("done");
        TaskList.save();
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
        TaskList.del(index);
        $(taskElt).remove();
        console.log("Task "+index+" is really deleted");
    };
    var undoDelete = function () {
        $(taskElt).html(orig);
        console.log("undo!");
    }
    button.click(undoDelete).blur(reallyDone).focus();
};

// ================================================================
// Try creating some examples. This won't work until TaskList is defined.

// var task1 = new Task( example_task_list[0] );
// var task2 = new Task( example_task_list[1] );

