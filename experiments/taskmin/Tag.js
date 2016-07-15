// ================================================================
/* Tag Objects. A task can have more than one tag. Each has a text label,
 * and optional abbreviation, and an optional background color (default
 * gray). All are added to the LI.task span.tags.  The last tag decides
 * the background color; no choice there, except to delete other tags.
 * Tags are very similar to Tasks, so maybe use some inheritance?

 * They have instance variables as shown in these examples:
 */

var example_tag_list =
    [
        {text: "personal",
         abbr: "P",
         color: "#2BFF9C"},
        {text: "work",
         abbr: "W",
         color: "#FF2b9d"}
    ];

// ================================================================
// The constructor. The arg is an object containing values for the
// instance variables. The new object is automatically pushed onto the
// persistent TagList.

var TagList = new PersistentList("TASKMIN-taglist");
console.log("1. TagList is length "+TagList.list.length);

var Tag = function(inits) {
    if( this === window ) {
        throw "Constructor called without 'new'";
    }
    if( typeof inits === "undefined" ) inits = {};
    this.text = inits.text || "no name"; // error?
    this.abbr = inits.abbr;
    this.color = inits.color || "#cccccc"; // make this a global parameter
    this.tagId = TagList.push(this);
    return this;
};

// ================================================================
// Instance Methods

Tag.prototype.toString = function () {
    var abbr = this.abbr == this.text ? "" : " ("+this.abbr+")";
    return '#<Tag '+this.text+abbr+" "+this.color+'>';
};

// This method formats the Tag as a checkbox on the web page

Tag.prototype.formatCheckbox = function (templateElt) {
    templateElt = templateElt || $('#task-checkbox-template > li').one();
    var clone = templateElt.clone();
    var id = "tag-"+this.text;
    var input = clone.find("input").one();
    input.attr("id",id);
    input.attr("value",this.text);
    clone.find("label").one().attr("for",id);
    clone.find(".tag-abbr").one().text(this.abbr);
    clone.find(".tag-text").one().text(this.text);
    return clone;
};

Tag.prototype.formatListItem = function (templateElt) {
    templateElt = templateElt || $("#edit-tag-list-template > li").one();
    var clone = templateElt.clone();
    clone.attr("data-tagId",this.tagId);
    clone.find(".tag-abbr").one().text(this.abbr);
    clone.find(".tag-text").one().text(this.text);
    clone.css("background-color",this.color);
    return clone;
};


// ================================================================
// Adding methods to TagList

// Creating a TagList means creating objects, too.

TagList.readInstances = function () {
    console.log("2. TagList is length "+TagList.list.length);
    var stored = this.read();
    var taglist;
    if( stored ) {
        console.log("Using real saved tag data");
        taglist = JSON.parse(stored);
    } else {
        console.log("Using example tag data");
        taglist = example_tag_list;
    }
    this.list = [];
    for(var i in taglist) {
        var inits = taglist[i];
        if( inits != null )
            new Tag(inits);     // automatically adds to the list
    }
    console.log("3. TagList is length "+TagList.list.length);
    return this;
}

// This method allows us just to store names of tags on tags, and look
// them up when needed.

TagList.getTagByName = function (name) {
    // probably should use an accessor method rather that tag.text
    var tag = this.list.find(function (tag) { return tag.text == name; });
    if( ! tag ) {
        throw "Couldn't find tag named "+name;
    }
    return tag;
};

// ================================================================
/*
var tag1 = new Tag( example_tag_list[0] );
var tag2 = new Tag( example_tag_list[1] );
*/
