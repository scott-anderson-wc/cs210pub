/* This function gets any event that bubbles up from clicking on or
 * otherwise activating a button on a task. */

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

