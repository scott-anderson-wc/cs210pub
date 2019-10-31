# jQuery UI

Today doesn't have a lot of code but has some important concepts.

## Plan

1. Admin
1. Questions on A10?
1. Discuss jQuery UI
1. Answer your questions

## Recap JQ UI

Curated set of interactions, effects, widgets and themes:

* Has *flexible styling* using CSS classes instead of JavaScript. (Several
people asked about this last time)
* Progressive Enhancement:  page still works if JavaScript is missing
* Accessibility:  page is useable by disabled people
* Internationalization and Localization: page is useable in a variety of
languages and lands

## Progressive Enhancement

* Have a basic, 1990s, non-JavaScript option.
* For example, tabs would be stacked DIVs.
* For example, datepicker and autocomplete are just text inputs
* I dunno about sortable. Could add a text input where the user can
specify the location, and then hide that in JS.

## Accessibility

If someone is disabled, say blind or unable to use a mouse, we'd like the
site to still be useable.

Should be possible to interact with the site using a *keyboard* rather
than a mouse.

* Can you move from tab to tab using the keyboard key? (Yes, arrow keys.) 
* Can you choose a date using the keyboard? (Try typing in 5/3/2019)
* Can you navigate among autocomplete options using tab and enter?

We'll discuss more about accessibility later

## When JQ Code Runs

Modern thinking is that, for speed, JS files, including JQ and JQ UI,
should be loaded at the *bottom* of the file.

But old habits are hard to break, and what if you want to use JQ and JQ UI
while the page loads. (I sometimes do in these notes).

Consider the following code:

```
<html>
<head>
<script src="...jquery..."></script>
<script>
$("#fred").click(
    function () { alert('I am Fred'); }
);
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
$("#fred").click(
    function () { alert('I am Fred'); }
);
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
    $("#fred").click(
        function () { alert('I am Fred'); }
    );
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

var airlines = [ "Delta",
                 "JetBlue",
                 "Spirit",
                 "Southwest"];
```

I used cloning to make the airline list easier and more modular.

## My Solution

[my solution](ex.html)

## Summary

jQuery UI is pretty cool.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

