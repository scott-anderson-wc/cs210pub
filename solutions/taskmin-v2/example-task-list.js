// ============================================================================
// Task description objects. Task objects have at least five instance
// variables, as shown in these examples:

var example_task_list =
    [
        {text: "Finish Taskmin Project",
         priority: "high",
         duedate: "May 15, 2019",
         tag: "work",
         done: true
        },
        {text: "send card to mom",
         priority: "medium",
         duedate: "May 10, 2019",
         tag: "personal",
         done: false
        },
        {text: "Do CS 432 exam",
         priority: "low",
         duedate: "May 12, 2019",
         tag: "work",
         done: false
        },
        {text: "pack for home",
         priority: "high",
         duedate: "May 16, 2019",
         tag: "personal",
         done: true
        }
    ];

function saveExamplesToLocalStorage(key) {
    LocalStorage.setItem(key,JSON.stringify(example_task_list));
}
