# Accessibility

Today we'll look at some principles for making our websites accessible to
as wide an audience as possible.

We will *not* look at my solution to A10 (Jelly Blobs), but I'll talk
about when we will.

## Plan

1. Admin: 304 showcase, OH during RP and exams, A10 solution
1. Discuss Accessibility
1. Answer your questions
1. Explore Taskmin

## Admin

* The final project can be done with a partner or solo, as you choose

## Accessibility

We'll switch to the reading for a while, to discuss/review those ideas:

[reading](../../reading/accessibility.html)

## Navigating without a mouse

Try to get around a website using just the keyboard:

* `tab` to go to the *next* control (link, input, button, etc)
* shift `tab` to go backwards
* `enter` to *click*
* arrow keys, sometimes.

## Buttons vs SPANs

Here are two different things with click handlers. Clicking either of them
changes it to a random color. 

<button id="button1">click me</button>
<span id="span1" class="button">click me</span>

<script src="random.js"></script>

<style>
#button1:focus, #span1:focus { box-shadow: 3px 2px blue; }
</style>

<script>
function changeColor(elt) {
    $(elt).css("background-color",random.color());
}
$("#button1").click( function() { $(this).css("background-color",random.color()) });
$("#span1").click( function() { $(this).css("background-color",random.color()) });
</script>

Here's the HTML. The class added to the span is just a skeleton-defined
class to style buttons and button-like things, so that they look the same.

```
:::HTML
<button id="button1">click me</button>
<span id="span1" class="button">click me</span>
```

Here's the CSS. Note how we mark elements that are in focus.  However, the
SPAN can't be in focus; it's not focusable, since it's not a control.

```
:::CSS
#button1:focus, #span1:focus {
    box-shadow: 3px 2px blue;
}
```

Here's the JS:

```
:::JavaScript
function changeColor(elt) {
    $(elt).css("background-color",random.color());
}
$("#button1").click( function() { changeColor(this); })
$("#span1").click( function() { changeColor(this); })
```

But the *button* can be used with the mouse, and the span *can't*.  So the
button is more *accessible*

## ARIA

If you create your own widgets (like our button-like span, above), you can
make them accessible via ARIA.

See [Using the button
role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role).

Alternatively, wrap them in a hyperlink (the `a` tag).

## Buttons vs SPAN buttons

This time, the SPAN uses some extra attributes to make it more like a button.

<button id="button2">no, click me</button>
<span id="span2" class="button" role="button" tabindex="0">no, click me</span>

<style>
#button2:focus, #span2:focus { box-shadow: 3px 2px blue; }
</style>

<script>
$("#button2").click( function() { changeColor(this); })
$("#span2").click( function() { changeColor(this); })
$("#span2").on('keydown', function (evt) {
    if( event.key === " " || event.key === "Enter" ) {
        // unnecessary for SPAN, but needed for A
        event.preventDefault();
        changeColor(this);
    }
});
</script>

Here's the HTML:

```
:::HTML
<button id="button2">no, click me</button>
<span id="span2" class="button"
      role="button" tabindex="0">no, click me</span>
```

JavaScript is the mostly the same, except for `keydown` handling. 

```
:::JavaScript
$("#button2").click( function() { changeColor(this); })
$("#span2").click( function() { changeColor(this); })
$("#span2").on('keydown', function (evt) {
    if( event.key === " " || event.key === "Enter" ) {
        // unnecessary for SPAN, but needed for A
        event.preventDefault(); 
        this changeColor(this);
    }
});
```

## Your Questions

There were no questions, otherwise I would answer [your
questions](../../quizzes/quiz22.html)

## Alt

There are some interesting quizzes here; we'll do some

[alt text](http://webaim.org/techniques/alttext)

## Final Project

Our final project is not a game but a practical app that you can use on
your phone. It's not a *native* app, but a web app.

There's a jQuery plugin that can turn [touch movements into mouse
movements](http://touchpunch.furf.com/): 

```
<!-- Thanks to http://touchpunch.furf.com/ -->
<script src="jquery.ui.touch-punch.min.js"></script>
```

You don't have to use this, but playing with the app on your touch-screen
device might be fun.

[taskmin](../../solutions/taskmin/taskmin.html)

* click a header to toggle the display of add task, edit tags, and sort
* add tasks
* mark tasks as done. Become gray (or other CSS)
* delete tasks
* undo buttons; confirm by doing something else (optional)
* not implemented additional menu (omit this)
* sorting by different criteria:
    * main tag puts personal together, then work
    * date by order of when they are due
    * tag number by order of when they are entered
* Automatically saved to localstorage. I used
`getItem("TASKMIN-tasklist")` and `getItem("TASKMIN-taglist")` 

## Summary

Accessibility is important.  

* alt text
* figures and figcaptions
* targets that are big enough
* labeled controls
* perspicuous link text
* buttons
* ARIA roles
* tabindex

There's so much more to learn about this. I'm just a beginner myself.

Accessibility principles are high-level and succinct. The devil is in the
details. Accessibility is a thousand tiny details that make your web page
a bit better for someone who often is neglected. Sometimes, those details
differ from time to time.  But don't give up, just because perfection
can't be achieved.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

