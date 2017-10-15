# Visual Effects

Hopefully, this will be fun

## Plan

1. jQuery at the *bottom*
1. Assignment 4
1. Review the solution from Chapter 6
1. Recap concepts and techniques for Chapter 7
1. Activity from Chapter 7
1. Review the solution

## Assignment 4 (Rock-Paper-Scissors Game)

[RPS Game](../../assignments/a04/rps.html)

## Solution to Chapter 6

We'll look at the JS code in the solution.  We'll take our time for this.

## Questions from last night

[questions](../../quizzes/quiz09.html)

## Recap of Visual Effects

1. Add a class to a top-level DOM node to trigger the changes
1. Changes are to (1) display the detail window and (2) shrink the thumbnails
1. Changes are defined using descendant selectors on all nodes that need to
change
1. Changes are driven by a class added to an ancestor (the body)
1. Changes are initiated by a `click` event on any thumbnail
1. Use a keyboard event to close the detail window by removing the class
1. Keyboard events use a `.keyCode` property of the `event` object (the
argument to the event handler). FYI, this technique is deprecated, but
good enough for now.

That's the main effect. Then we have some eye candy.

1. pseudo-classes can be sensitive to, for example, when an item is
hovered over
1. Use the `transition` CSS property to specify the properties that will
change and for how long
1. Use pseudo-class to specify the new values
1. A new CSS property is `transform` which can let you do a vast set of 2D
affine transformations. (<q>Affine </q> means lines are still lines.) See
[MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

## Transition

Try mousing over the following:

<div>
<style scoped>
#hermione { width: 100px; }

#hermione:hover {
    border: 3px solid red;
    width: 300px;
    transition: width 800ms;
}
</style>
<p><img id="hermione"
     src="../../images/hermione-granger-1024.jpeg"
     alt="Emma Watson as Hermione Granger">
</p>
</div>

Here's the code:

```
:::CSS
#hermione { width: 100px; }

#hermione:hover {
    border: 3px solid red;
    width: 300px;
    transition: width 1500ms;
}
```

I can show you a trick for debugging these in Chrome.

## Easing

The animations can accelerate and decelerate in a variety of ways:

```
:::CSS
transition: transform 133ms ease-in-out;
```

A list of [timing
functions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)
on MDN.

## The result

[the result](../../front-end-dev-resources/book-solutions/Chapter-07/ottergram/index.html)

* clicking on a thumbnail changes the detail, now with eye candy
* pressing escape removes the detail, giving big thumbnails
* clicking on a big thumbnail restores the first display

## Activity

Go! Do this!  If you need a starting point, you can download an install this tar file:

* [ch06b tarfile](../../downloads/ch06b.tar)
* `curl -O http://cs.wellesley.edu/~cs204/downloads/ch06b.tar`
* `tar xf ch06b.tar`

## Code review

[the solution](../../front-end-dev-resources/book-solutions/Chapter-07/ottergram/index.html)

## jQuery Animations

Try the following: <button id="accio_button">Accio Broomstick</button>

<div id="broomstick_demo">
<style scoped>
   #broomstick_demo { position: relative; height: 100px }
   #harry { width: 100px; position: absolute; left: 0px; top: 0px; }
   #broomstick { width: 50px; }
</style>
<img id="harry" src="../../images/harry-potter-thumb.jpeg">
<img id="broomstick" src="../../images/broomstick-noun_228764_cc.png">
<script>
$("#broomstick")
    .css({position: 'absolute',left: '800px',top: '-300px'});
$("#accio_button").click(function () {    
    $("#broomstick")
        .css({position: 'absolute',left: '800px',top: '-300px'})
        .animate({left: '50px',top: '50px'},
                 2000,
                 "swing", // the default
                 function () {
                     var d = new Date();
                     console.log("done at "+d.toLocaleTimeString());
                 }
                 ); // end of animate
    var d = new Date();
    console.log("summoning at "+(d.toLocaleTimeString()));
});
</script>
</div>

Here's the code that does that:

```
:::HTML
<div id="broomstick_demo">
<style scoped>
   #broomstick_demo { position: relative; height: 100px }
   #harry { width: 100px; position: absolute; left: 0px; top: 0px; }
   #broomstick { width: 50px; }
</style>
<img id="harry" src="../../images/harry-potter-thumb.jpeg">
<img id="broomstick" src="../../images/broomstick-noun_228764_cc.png">
<script>
// see below
</script>
</div>
```

and JavaScript:

```
:::JavaScript
$("#broomstick")
    .css({position: 'absolute',left: '800px',top: '-300px'});
$("#accio_button").click(function () {    
    $("#broomstick")
        .css({position: 'absolute',left: '800px',top: '-300px'})
        .animate({left: '50px',top: '50px'},
                 2000,
                 "swing", // the default
                 function () {
                     var d = new Date();
                     console.log("done at "+d.toLocaleTimeString());
                     }
                 ); // end of animate
    var d = new Date();
    console.log("summoning at "+(d.toLocaleTimeString()));
});
```


Details at [jQuery animate()
method](http://api.jquery.com/animate/)

Special easing with plug-ins. We'll also look at chaining animations
together.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
