class TaskList {
    #key;
    #sortKey;
    #comparator;
    #tasks;

    constructor (key) {
        this.#key = key;
        this.#tasks = [];
        this.setSortKey('id');
    }

    // useful for debugging
    show() {
        this.#tasks.forEach((i,e) => console.log(i + ': ' + e.toString()));
        return this;
    }

    // getter/setters
    getKey() { return this.#key; }
    setKey(key) { this.#key = key; return this; }

    // there should be a matching "read", but instead we have readFromLocalStorage
    // further down. The .save() method is used lots of places, but the readFromLocalStorage 
    // is used only once.

    save() {
        localStorage.setItem(this.#key, JSON.stringify(this.#tasks));
        return this;
    }

    clear() {
        localStorage.removeItem(this.#key);
        return this;
    }
        
    readFromLocalStorage() {
        let descs = JSON.parse(localStorage.getItem(this.key));
        this.#tasks = [];
        for(let i in descs) {
            let desc = tescs[i]
            this.push(new Task(desc));
        }
        return this;
    }

    get(id) {
        console.log("search for task with ID "+id);
        // need to make sure we teach 'find'
        return this.#tasks.find(function (task) {
            console.log(task.getId());
            return ( elt.getId() === id );
        });
    }

    push(task) {
        task.setID(this.#tasks.length);
        this.#tasks.push(task);
        this.save();
        return this;
    }

    setSortKey(sortKey) {
        this.#sortKey = sortKey;
        if(sortKey === 'dueDate') {
            // Tasks need to implement the getTimestamp() method
            this.#comparator = (a,b) => a.getTimestamp() - b.getTimestamp();
        } else if (sortKey == 'tag') {
            // this is how you compare strings. Need to teach this.
            this.#comparator = (a,b) => a.getTag().localeCompare(b.getTag());
        } else if (sortKey == 'id') {
            this.#comparator = (a,b) => a.getId() - b.getId();
        }
    return this;
    }

    sort() {
        this.tasks.sort(this.#comparator);
        this.save(); // ???
        return this;
    }
    
    format() {
        let listElt = $("<ul>");
        this.#tasks.forEach( function (i,e) { listElt.append(e.format()); } );
        return listElt;
    }
}

