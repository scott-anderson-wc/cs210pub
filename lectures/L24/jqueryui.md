# jQuery UI

Today doesn't have a lot of code but has some important concepts.

We'll also look at my solution to A9 (20 Questions)

## Plan

1. Questions on A10?
1. Discuss jQuery UI
1. Answer your questions
1. Explore 20 Questions

## Recap JQUI

Curated set of interactions, effects, widgets and themes:

* Has *flexible styling* using CSS classes instead of JavaScript. (Several
people asked about this last time)
* Progressive Enhancement:  page still works in JavaScript is missing
* Accessibility:  page is useable by disabled people
* Internationalization and Localization: page is useable in a variety of
languages and lands

## Progressive Enhancement

* Have a basic, 1990s, non-JavaScript option.
* For example, tabs would be stacked DIVs.
* For example, datepicker and autocomplete is just a text input
* I dunno about sortable. Could add a text input where the user can
specify the location, and then hide that in JS.

## Accessibility

If someone is disabled, say blind or unable to use a mouse, we'd like the
site to still be useable.

Should be possible to interact with the site using a *keyboard* rather
than a mouse.

* Can you move from tab to tab using the keyboard key? (Yes, arrow keys.) 
* Can you choose a date using the keyboard? (Try typing in 5/25/2017)
* Can you navigate among autocomplete options using tab and enter?

We'll discuss more about accessibility next Tuesday.

## When JQ Code Runs

Modern thinking is that, for speed, JS files, including JQ and JQ UI,
should be loaded at the *bottom* of the file.

But old habits are hard to break, and what if you want to use JQ and JQ UI
while the page loads. (I do in these notes).

Consider the following code:

```
<html>
<head>
<script src="...jquery..."></script>
<script>
   $("#fred").click(function () { alert('I am Fred'); });
</script>
</head>
<body>
    <div id="fred"> ... </div>
</body>
</html>
```

What happens?

How can we solve that?

## Solution 1: Move to the Bottom

```
<html>
<head>
</head>
<body>
    <div id="fred"> ... </div>
<script src="...jquery..."></script>
<script>
   $("#fred").click(function () { alert('I am Fred'); });
</script>
</body>
</html>
```

This works and loads faster, but we can't use JQ while the page loads, and
we have to look at the bottom for the code.

## Postponing Code 

Alternatively:

```
<html>
<head>
<script src="...jquery..."></script>
<script>
   $( function () {
         $("#fred").click(function () { alert('I am Fred'); });
         });
</script>
</head>
<body>
    <div id="fred"> ... </div>
</body>
</html>
```

The `$( func )` synatx is shorthand for:

`$(document).ready( func );`

See [document.ready()](https://learn.jquery.com/using-jquery-core/document-ready/)

JQuery UI often uses this.


## Your Questions

I'll answer [your questions](../../quizzes/quiz20.html)

## Activity

Create a page with

* three tabs
* a date picker in one tab
* an autocomplete way of choosing something
* a sortable list of favorites in one tab

I'm imagining an airline app with the following:

* departure date
* a set of destinations
* a sortable list of favorite airlines

Hints:

* I suggest starting with tabs.
* Copy/paste the basic code into your HTML page.
* When you add the other features, just check that all the correct CSS and
JS is already loaded. For me it was. This means that once you use any JQ
UI feature, others are "free"
* Use the following JS code to avoid lots of typing:

```
:::JavaScript

            var cities = [
                "Atlanta",
                "Boston",
                "Chicago",
                "Detroit",
                "Erie",
                "Fairbanks",
                "Galveston",
                "Honolulu",
                "Indianapolis",
                "Jacksonville",
                "Kansas City, MO",
                "Los Angeles",
                "Minneapolis",
                "New York, NY",
                "Omaha",
                "Pittsburgh",
                "Quebec City",
                "Roanoke",
                "Seattle",
                "Tallahassee",
                "Utica",
                "Valpariso",
                "Wichita",
                "Xenia",
                "Yakima",
                "Zanesville"];

            var airlines = [ "JetBlue", "Southwest", "Delta" ];
```

I used cloning to make the airline list easier and more modular.

## My Solution

[my solution](ex.html)

## Assignment 9

We'll look at the code of Assignment 9 (Twenty Questions)

First, some concepts:

The *show tree* task is a recursive function on a recursive data structure.

The *game play* task is an iterative algorithm on a recursive data
structure. Each step (iteration) of the game goes down the tree, from
parent to (one) child. We keep track of where we are by using a separate
variable. (I called mine `currentTreeNode`.)

## Tree Sketch


## Code Review

* We'll start with the HTML file and notice:
    * the initial buttons
    * the `treedisplay` container
    * the `questions` container
    * the templates for questions and guesses
    * the way the files are loaded and used
* We'll look briefly at the CSS file; there's not much there
* We'll look at the `20-static.js` file, which does all the important work

Before we look at `20-static.js`, I'd like to look at an abstraction of
how the code for recursion can be organized.

Note that we have a kind of on-going *pun* in our terminology: is there a
difference between a *tree* and a *node*? Can one be treated as the other?

```
:::JavaScript
function doTree(node) {
    if( isLeaf(node) ) {
        // leaf code
    } else {
        // internal node code
        doTree(node.leftChild);
        doTree(node.rightChild);
    }
}    
```

Alternatively, we can pull out the code that handles the two cases:

```
:::JavaScript
function doTree(node) {
    if( isLeaf(node) ) {
        doLeaf(node);
    } else {
        doInternalNode(node);
    }
}    

function doLeaf(node) {
    // leaf code
}

function doInternalNode(node) {
    // internal node code
    doTree(node.leftChild);
    doTree(node.rightChild);
}
```

I used both of these techniques.

## Summary

jQuery UI is pretty cool.
