// See README.js for overall documentation

"use strict";

var TASKMIN = TASKMIN || {};
TASKMIN.version = 2.1;

var theTaskList = new TaskList("TASKMIN-tasklist");
var tags = ['work', 'personal','tennis'];
var defaultTag = 'personal';

// ================================================================
// Tags

// This is invoked when we create the page.

function addTagsToAddTaskForm() {
    var template = $("#task-radiobutton-template > li").one();
    var dest = $("#task-tag-radiobuttons").one();
    var tagListElt = $("<ul>");
    tags.forEach(function (tag) {
        var elt = template.clone();
        elt.find('input[name=tag]').attr('value',tag);
        elt.find('.tag-text').text(tag);
        tagListElt.append(elt);
    });
    dest.empty().append(tagListElt);
}

// ================================================================
// Dealing with the add task form

function addTask() {
    var inits = {};
    var text = $("#task-text").val();
    if( text == '' ) return;
    console.log('adding task '+text);
    inits.text = text;
    inits.priority = $("#task-priority").val(); // should validate this
    inits.duedate = $("#task-due").val();
    inits.tag = $("#task-tag-radiobuttons input:checked").val();
    $("#addtask-form form")[0].reset();
    var task = new Task(inits);
    theTaskList.push(task);
    task.format("#tasklist > ul");
    theTaskList.sort();
}

$("#done-add-task").click(function () { addTask(); $("#addtask-form").slideUp(); });
$("#cancel-add-task").click(function () { $("#addtask-form form")[0].reset(); $("#addtask-form").slideUp(); });

// the form is hidden when page loads; has to be opened explicitly
$("#addtask-form").hide();

$("#addtask-button").click(function () {
    $("#addtask-form").slideToggle();
});
    
// ================================================================
// Buttons on individual task elements.
// Using event delegation

// These globals are just for debugging. No longer necessary.
var gtarget, gtaskElt, gtaskTaskId;

$("#tasklist").on("click",
                  "button.done",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskTaskId = taskId;
                      var task = theTaskList.get(taskId);
                      task.markDone(taskElt);
                  });

$("#tasklist").on("click",
                  "button.delete",
                  function () {
                      var taskElt = getTaskElt(this);
                      var taskId = getTaskId(taskElt);
                      gtarget = this; gtaskElt = taskElt; gtaskTaskId = taskId;
                      theTaskList.remove(taskId);
                      taskElt.remove();
                  });

// ================================================================
// Utility functions for working with the DOM task elements.

function getTaskElt(target) {
    return $(target).closest("LI.task").one();
}

// more globals for debugging. 
var gelt, gattr;

function getTaskId(jqelt) {
    gelt = jqelt;
    var attr = jqelt.attr("data-taskId");
    if( typeof attr !== typeof "string" || attr.length == 0 ) {
        console.log("bad attr is "+attr);
        gattr = attr;
        throw "No valid data-taskId attribute for "+jqelt.html();
    }
    try {
        return parseInt(attr,10);
    }
    catch (err) {
        throw "Couldn't get numeric value out of data-taskId attribute: "+attr;
    }
}

// ================================================================
// Sorting Menu

$("#sort-button").one().click( function () { $("#sort-menu").one().slideToggle(); });

$("#sort-menu").one().hide();

function resortBy(key) {
    theTaskList.setSortKey(key).sort().format(); $("#sort-menu").one().slideUp(); 
}

$("#sort-by-taskId").one().click(function () { resortBy('taskId'); });
$("#sort-by-dueDate").one().click(function () { resortBy('dueDate'); });
$("#sort-by-mainTag").one().click(function () { resortBy('tag'); });

// ================================================================

function resetLocalStorage() {
    theTaskList.clear();
}

function initializeAll() {
    console.log('initialize all');
    addTagsToAddTaskForm();
    theTaskList.read().makeInstances().format();
}

$("#reset-button").click(function () {
    resetLocalStorage();
    initializeAll();
});
