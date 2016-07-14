// Each button will have a class name that indicates what we want to do.
// Decided against this approach, when event delegation turned out to be
// so easy and effective.

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
