"use strict";

// ================================================================
// The constructor. The argument is an object containing the data for the
// instance variables, as shown in example.js. 

function Task (inits) {
    this.text = inits.text || "no description"; // error?
    this.done = inits.done || false;
    this.duedate = new Date(inits.duedate);
    this.priority = inits.priority || "medium";
    this.tag = inits.tag || defaultTag;
    return this;
};

// ================================================================
// Instance methods

Task.prototype.toString = function () {
    var date = this.duedate.toLocaleDateString();
    var due = this.duedate ? ' due on ' + date : '';
    var tag = '(' + this.tag + ')';
    return '#<Task #'+this.id+" "+this.text+due+' '+tag+'>';
};

Task.prototype.getTag = function () { return this.tag; };

Task.prototype.getDuedate = function () { return this.duedate; };

Task.prototype.getId = function () { return this.id; };
Task.prototype.setId = function (id) { this.id = id; };

// This method formats the Task for display on a web page.

Task.prototype.format = function (container) {
    var templateElt = $('#templatetasklist > li').one();
    var clone = templateElt.clone();
    clone.attr("data-taskId",this.id);
    clone.find(".duedate").text(this.duedate.toDateString());
    clone.find(".priority").text(this.priority);
    clone.find(".tag").text(this.tag);
    clone.find(".text").text(this.text);
    clone.addClass(this.tag);
    if(this.done) clone.addClass("done");
    this.elt = clone;
    clone.appendTo(container);
    return clone;
};

// This method gets invoked when the user clicks on the "done" button

Task.prototype.markDone = function () {
    var id = this.id;
    console.log("Marking task "+id+" as done");
    this.done = true;
    this.elt.addClass("done").find('.priority').text('done');
    theTaskList.save();
};
