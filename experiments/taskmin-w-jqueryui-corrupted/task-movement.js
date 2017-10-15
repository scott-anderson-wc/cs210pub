/* adds the buttons and functionality to allow tasks to be moved up and
   down the list. */

function addTaskMovement() {
    $('<ul class="movement-menu"><li><span>&#x271A;</span>'
      + '<ul>'
      + '<li><button class="first">first</button></li>'
      + '<li><button class="up">up</button></li>'
      + '<li><button class="down">down</button></li>'
      + '<li><button class="last">last</button></li>'
      + '</ul>'
      + '</li>'
      + '</ul>')
        .appendTo("#templatetasklist > li");
    $(".movement-menu").menu();
    $("#tasklist").on("click",
                      "button.first",
                      function () {
                          console.log("move to first");
                          var taskElt = getTaskElt(this);
                          var taskId = getTaskId(taskElt);
                          var task = TaskList.get(taskId);
                          // should probably be a method of TaskList
                          var list = TaskList.list;
                          list.splice(taskId, 1);
                          console.log("after removal");
                          TaskList.show();
                          list.unshift(task); // list.splice(0, 0, task);
                          console.log("after insert");
                          TaskList.show();
                          TaskList.format().save();
                          $(".movement-menu").menu();
                      });
    $("#tasklist").on("click",
                      "button.up",
                      function () {
                          console.log("move up");
                          var taskElt = getTaskElt(this);
                          var taskId = getTaskId(taskElt);
                          gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                          var task = TaskList.get(taskId);
                          // should probably be a method of TaskList
                          var list = TaskList.list;
                          list.splice(taskId, 1);
                          console.log("after removal");
                          TaskList.show();
                          list.splice(taskId-1, 0, task); // list.splice(0, 0, task);
                          console.log("after insert");
                          TaskList.show();
                          TaskList.format().save();
                          $(".movement-menu").menu();
                      });
    $("#tasklist").on("click",
                      "button.down",
                      function () {
                          console.log("move down");
                          var taskElt = getTaskElt(this);
                          var taskId = getTaskId(taskElt);
                          gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                          var task = TaskList.get(taskId);
                          // should probably be a method of TaskList
                          var list = TaskList.list;
                          list.splice(taskId, 1);
                          console.log("after removal");
                          TaskList.show();
                          list.splice(taskId+1, 0, task);
                          console.log("after insert");
                          TaskList.show();
                          TaskList.format().save();
                          $(".movement-menu").menu();
                      });
    $("#tasklist").on("click",
                      "button.last",
                      function () {
                          console.log("move last");
                          var taskElt = getTaskElt(this);
                          var taskId = getTaskId(taskElt);
                          gtarget = this; gtaskElt = taskElt; gtaskId = taskId;
                          var task = TaskList.get(taskId);
                          // should probably be a method of TaskList
                          var list = TaskList.list;
                          list.splice(taskId, 1);
                          console.log("after removal");
                          TaskList.show();
                          list.push(task);
                          console.log("after insert");
                          TaskList.show();
                          TaskList.format().save();
                          $(".movement-menu").menu();
                      });
}
