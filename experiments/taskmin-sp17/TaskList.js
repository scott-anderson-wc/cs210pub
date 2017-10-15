"use strict";

// Persistent Lists are lists that have methods to save them to the
// localStorage

function PersistentList (localStorageKey) {
    if( this === window ) {
        throw "Constructor called without 'new'";
    }
    this.key = localStorageKey;
    this.list = [];
}

PersistentList.prototype.save = function () {
    localStorage.setItem(this.key, JSON.stringify(this.list));
    return this;
};

PersistentList.prototype.read = function () {
    var stored = JSON.parse(localStorage.getItem(this.key));
    if( stored ) {
        console.log("Using real saved data");
        this.descs = stored;
    } else {
        console.log("Using example task data");
        this.descs = example_task_list;
    }
    return this;
};

PersistentList.prototype.clear = function () {
    console.log('clearing local storage');
    localStorage.setItem(this.key, null);
    this.list = [];
    return this;
};


// ================================================================
// List of Tasks

function TaskList(localStorageKey) {
    PersistentList.call(this,localStorageKey);
    this.setSortKey('taskId');
}

TaskList.prototype = Object.create(PersistentList.prototype);
TaskList.prototype.constructor = TaskList;

TaskList.prototype.get = function (taskId) {
    var tasks = this.list;
    for( var i in tasks ) {
        var task = tasks[i];
        if( task.getId() == taskId ) {
            return tasks[i];
        }
    };
    throw new Error("no such task");
};

// Push adds to the end

TaskList.prototype.push = function (task) {
    var list = this.list;
    task.setId(list.length);
    list.push(task);
    this.save();                // always save, after any modification
};

// ================================================================
// Process a list of descriptions and make instances

TaskList.prototype.makeInstances = function () {
    var descs = this.descs;
    for( var i in descs ) {
        var desc = descs[i];
        if( desc != null ) {
            this.push(new Task(desc));
        }
    };
    this.save();
    return this;
};

// Putting them on the page.

TaskList.prototype.format = function () {
    var template = $("#templatetasklist > li");
    var listElt = $("<ul>");
    var list = this.list;
    console.log("formatting list of "+list.length+" tasks");
    list.forEach(function (task) {
        if (task) {
            var elt = task.format(template);
            listElt.append(elt);
        }
    });
    $("#tasklist").empty().append(listElt);
    return this;
};

TaskList.prototype.remove = function (taskId) {
    var tasks = this.list;
    for( var i in tasks ) {
        var task = tasks[i];
        if( task.getId() == taskId ) {
            delete tasks[i];
            this.save();
            return this;
        }
    };
    throw new Error("no such task: "+taskId+" in "+tasks);
    return this;
};

// ================================================================
// Sorting

TaskList.prototype.setSortKey = function (sortKey) {
    if( ['taskId', 'dueDate', 'tag'].indexOf(sortKey) == -1 ) {
        throw new Error('no such sort key: '+sortKey);
    } else {
        this.sortKey = sortKey;
    }
    return this;
};

// Sorting uses the remembered sortKey or optionally changes it.

TaskList.prototype.sort = function () {
    var sortKey = this.sortKey;
    console.log('sorting by '+sortKey);
    switch (sortKey) {
    case "taskId" : 
        this.list.sort(function (a,b) {
            return a.getId() - b.getId();
        });
        break;
    case "dueDate":
        this.list.sort(function (a,b) {
             // subtracting date objects is okay, but not strings
            return new Date(a.duedate) - new Date(b.duedate);
        });
        break;
    case "tag":
        this.list.sort(function (a,b) {
            var atag = a.getTag();
            var btag = b.getTag();
            // sorting by strings needs this method
            return atag.localeCompare(btag);
        });
        break;
    default:
        throw new Error("No such sort key: "+sortKey);
        break;
    }
    return this;
};
