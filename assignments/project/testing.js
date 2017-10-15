// Provided to students to help with testing their code

TaskList.prototype.show = function () {
    var list = this.list;
    for(var i in list) {
        var item = list[i];
        console.log(i+": "+item.toString());
    }
};

function testTaskList() {
    var lskey = 'test';
    localStorage.removeItem(lskey);
    var tl = new TaskList(lskey);
    tl.read().makeInstances();
    console.log('local storage has: '+localStorage.getItem(lskey));
    console.log('first list:');
    tl.show();

    console.log('testing adding:');
    var inits = {text: 'buy airplane tickets',
                 priority: 'high',
                 duedate: 'May 13, 2017',
                 tag: 'personal'};
    var task = new Task(inits);
    tl.push(task);
    console.log('new task',task.toString());
    tl.show();
    
    console.log('testing lookup; should find CS 432 exam:');
    console.log(tl.get(2));
    tl.show();

    console.log('testing removal');
    tl.remove(2);
    tl.show();

    console.log('testing adding:');
    var inits = {text: 'file receipts',
                 priority: 'low',
                 duedate: 'May 23, 2017',
                 tag: 'work'};
    var task = new Task(inits);
    tl.push(task);
    console.log('new task',task.toString());
    tl.show();

    console.log('testing sorting');
    console.log('sort by duedate:');
    tl.setSortKey('dueDate').sort().show();
    console.log('sort by tag:');
    tl.setSortKey('tag').sort().show();
    console.log('sort by taskId; should match the first list:');
    tl.setSortKey('taskId').sort().show();
    console.log('done!');
}
