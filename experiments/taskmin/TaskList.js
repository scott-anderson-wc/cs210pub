// Persistent Lists are lists that have methods to save them to the
// localStorage

var PersistentList = function (localStorageKey) {
    if( this === window ) {
        throw "Constructor called without 'new'";
    }
    this.key = localStorageKey;
    var curr = localStorage.getItem(localStorageKey);
    if( curr != "" ) {
        // already has saved data, so use that
        this.list = JSON.parse(curr);
    } else {
        this.list = [];
    }
    return this;
}

PersistentList.prototype.read = function () {
    return localStorage.getItem(this.key);
}

PersistentList.prototype.save = function () {
    localStorage.setItem(this.key, JSON.stringify(this.list));
    return this;
}

PersistentList.prototype.clear = function () {
    localStorage.removeItem(this.key);
    return this;
}

PersistentList.prototype.get = function (index) {
    if( typeof this.list[index] === "undefined") {
        // probably not a good thing, so throw an error
        throw "invalid index to persistent list: "+index;
    }
    return this.list[index];
}

PersistentList.prototype.del = function (index) {
    delete this.list[index];
    this.save();
    return this;
}


// Push adds to the end and returns the index of the added item

PersistentList.prototype.push = function (item) {
    var list = this.list;
    var index = list.length;
    list.push(item);
    this.save();                // always save, after any modification
    return index;
}

// Useful for debugging

PersistentList.prototype.show = function () {
    var list = this.list;
    for(var i in list) {
        var item = list[i];
        console.log(i+": "+item.toString());
    }
}

// ================================================================
// List of Tasks

var TaskList = new PersistentList("TASKMIN-tasklist");

TaskList.sortKey = "taskId";    // the default.

// Adding a method to this instance.

TaskList.sort = function (sortKey) {
    if(sortKey) {
        this.sortKey = sortKey;
    } else {
        sortKey = this.sortKey;
    }
    switch (sortKey) {
    case "taskId" : 
        this.list.sort(function (a,b) {
            return a.taskId - b.taskId;
        });
        break;
    case "dueDate":
        this.list.sort(function (a,b) {
             // subtracting date objects is okay, but not strings
            return new Date(a.duedate) - new Date(b.duedate);
        });
        break;
    case "mainTag":
        this.list.sort(function (a,b) {
            var atag = a.mainTag();
            var btag = b.mainTag();
            // sorting by strings needs this method
            return atag.localeCompare(btag);
        });
        break;
    }
    return this;
};

// Reading a Tasklist means making instances. This method does that.

TaskList.readInstances = function () {
    var stored = this.read();
    var tasklist;
    if( stored ) {
        console.log("Using real saved data");
        tasklist = JSON.parse(stored);
    } else {
        console.log("Using example task data");
        tasklist = example_task_list;
    }
    this.list = [];
    for(var i in tasklist) {
        var taskDesc = tasklist[i];
        if( taskDesc != null )
            new Task(taskDesc); // automatically added to the list.
    }
    return this;
}

// Putting them on the page.

TaskList.format = function () {
    var list = this.list;
    console.log("formatting list of "+list.length+" tasks");
    var template = $("#templatetasklist > li");
    var listElt = $("<ul>");
    for( var i in list ) {
        var task = list[i];
        var elt = task.format(template);
        if (task.done) $(elt).addClass("done");
        listElt.append(elt);
    }
    $("#tasklist").empty().append(listElt);
    return this;
}
