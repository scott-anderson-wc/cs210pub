// ================================================================
// The constructor. The argument is an object containing the data
// for the instance variables. The new object is automatically pushed onto
// the persistent TaskList (defined in another file).

class Task {
    #id;
    #text;
    #priority;
    #duedate;
    #done;
    #tag;
    #DOMelt;
    
    constructor (inits) {
        if( typeof inits === "undefined" ) inits = {};
        this.#text = inits.text || "no description"; // error?
        this.#priority = inits.priority || "medium";
        this.#duedate = new Date(inits.duedate); // we assume it will exist
        this.#done = inits.done || false;
        this.#tag = inits.tag;
    }

    // getters and setters
    getId() { return this.#id; }
    setId(id) { this.#id = id; return this; }

    getText() { return this.#text; }
    setText(text) { this.#text = text; return this; }

    getPriority() { return this.#priority; }
    setPriority(priority) { this.#priority = priority; return this; }

    getDueDate() { return this.#duedate; }
    setDueDate(duedate) { this.#duedate = duedate; return this; }

    getDone() { return this.#done; }
    setDone(done) { this.#done = done; return this; }

    getTag() { return this.#tag; }
    setTag(tag) { this.#tag = tag; return this; }

    toString() {
        let due = this.#duedate.toDateString();
        let stat = this.#done ? "done" : "todo";
        return `Task {${this.#text} due ${due} ${this.#tag} ${this.#priority} ${stat}`;
    }

    format(templateElt) {
        if(!templateElt) templateElt = $('#templatetasklist > li').one();
        let clone = templateElt.clone();
        clone.attr("data-taskId",this.#id);
        clone.find(".duedate").text(this.#duedate.toDateString());
        clone.find(".priority").text(this.#priority);
        clone.find(".text").text(this.#text);
        clone.addClass(this.#tag);
        if(this.#done) clone.addClass("done");
        this.#DOMelt = clone;
        return clone;
        }

        markDone() {
            console.log("Marking task "+this.#id+" as done");
            this.#done = true;
            this.#DOMelt.addClass('done');
        }
}

