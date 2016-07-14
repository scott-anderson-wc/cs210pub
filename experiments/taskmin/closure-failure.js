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

