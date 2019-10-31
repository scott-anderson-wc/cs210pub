// Testing the Task object. 

// This function tests the basics of the API.
// Note that it assigns to global variables, not local variables,
// so that if something goes wrong, inspection is a little easier.


function testTask1() {
    for( i in example_task_list ) {
        et = example_task_list[i];
        t = new Task(et);
        t.setId(i);
        // this invisibly uses the .toString() method
        console.log("Created task: "+t);
        function checkProp (prop,getter) {
            if( et[prop] !== t[getter]() ) {
                throw Exception('property not returned: '+
                                `${prop} should be ${et[prop]}, but got ${t[getter]()}`);
                }
        }
        checkProp('text','getText');
        checkProp('tag','getTag');
        checkProp('priority','getPriority');
        checkProp('done','getDone');
        checkProp('text','getText');
        if( et['done'] !== t.getDuedate().toDateString() ) {
            throw Exception('getDuedate not right: '+
                            `should be ${et['done']}, but got ${t.getDuedate()}`)
        }
    }
}

// This function tests the DOM element, but it can't ensure that the DOM
// element looks right and so forth.  After this running this in the JS
// console, look in the page to see that the object looks right.  Note
// that this testing code makes no assumptions about the structure of the
// page. It creates the DOM element and adds it to "BODY"

function testTask2() {
    templateElt = $(`<p>
                <span class="text"></span>
                <span class="tag"></span>
                <span class="priority"></span>
                <span class="duedate"></span>
                    </p>`);
    
    for( i in example_task_list ) {
        et = example_task_list[i];
        t = new Task(et);
        t.setId(i);
        elt = t.format(templateElt);
        $("BODY").append(elt);
    }
}

    
