# Assignment: Sliding Tiles

We hope this will be fun.

## Goal

You'll build a web application of a [sliding tile
puzzle](https://en.wikipedia.org/wiki/Sliding_puzzle). I've seen them in a
15-piece version (and played them in the back of the car on long trips in
my childhood).  You'll build an 8-piece puzzle.

Basics:

* There are four moves: up, down, left and right.
* We will interpret "up" to mean that a tile is moving "up" into the blank spot. Similarly for the other moves.
* If the blank is on the last row, "up" isn't possible. Similarly for other locations for the blank. In fact, the only time all four moves are possible is when the blank is in the center.
* We'll use [WASD](https://en.wikipedia.org/wiki/Arrow_keys#WASD_keys) for the movement keys. Feel free to add the arrow keys as well, or IJKL or whatever other keys you want. 'W' maps to "up" and so forth.
* If a move isn't possible, that key should do nothing.

Here are the things you'll need to figure out

* What picture is in each grid square. Since they'll be moving around,
  this will have to be a dynamic data structure. I recommend a 2D array of
  3 rows of 3 elements each.
* Where the blank is.  You'll maintain a global variable or two that keeps
  track of the coordinates of the blank.
* What moves are possible. 
* Given a move, figure out what tile needs to move and slide it the correct way. if it's not a possible move, just do nothing.

## Demo

<video controls style="width:50%;border:1px solid black">
    <source src="tile_game.mp4" type="video/mp4">
    Your browser doesn't support the video tag
</video>

## 2D arrays

One of the key parts of this is how to represent the current occupant of each grid square. I recommend a 2D array.

That's done just by having a 1D array, each of whose elements is a 1D array. Here's an example:

```
:::JavaScript
var keyboard = [['q','w','e'],
                ['a','s','d'],
                ['z','x','c']];
console.log(keyboard[0][1]); // prints 'w'
console.log(keyboard[1][0]); // prints 'a'
console.log(keyboard[2][2]); // prints 'c'
```

You can assign to an element using the same access syntax:

```
:::JavaScript
keyboard[0][0] = 'Q'; // capitalize Q
```

## Reading CSS values

So far in this course, we have modified CSS values using the DOM but never
read them. We can. Click the following to find out the current width of
your browser:

<button id="findWidthButton">Find the Width</button>
<script>
$("#findWidthButton").click(function () {
    var width = $("body").css("width");
    alert(width);
});
</script>

Here's the code:

```
:::JavaScript
$("#findWidthButton").click(function () {
    var width = $("body").css("width");
    alert(width);
});
```

## Using `parseInt()`

Note that the width is returned as a *string* and has "px" at the end of
it. If you try to add/subtract from that value, you'll have a problem.
So, you have to convert it to a number. For that, use the built-in
`parseInt()` function. (Note that `parseInt` has an optional second
argument which is the *radix* (number base), so if you want to parse octal
or hexadecimal strings, you can. It defaults to 10, but supplying 10 is
not a bad idea.)

<button id="findBiggerWidthButton">Find a Bigger Width</button>
<script>
$("#findBiggerWidthButton").click(function () {
    var width = parseInt($("body").css("width"));
    var width1 = width + 1;
    alert('one pixel bigger is '+width1);
});
</script>


Here's the code:

```
:::JavaScript
$("#findBiggerWidthButton").click(function () {
    var width = parseInt($("body").css("width"));
    var width1 = width + 1;
    alert('one pixel bigger is '+width1);
});
```

## Animation Callbacks

Checking that a jQuery animation <q>worked</q> is tricky. The following won't work:

<button id="growButton">Grow</button>
<button id="alice">Alice</button>
<button id="shrinkButton">Shrink</button>
<script>
$("#alice").css("width","300px");
$("#growButton").click(function () {
    console.log('before '+$("#alice").css("width"));
    $("#alice").animate({width: "+=200"});
    console.log('after '+$("#alice").css("width"));
});
$("#shrinkButton").click(function () {
    console.log('before '+$("#alice").css("width"));
    $("#alice").animate({width: "-=200"});
    console.log('after '+$("#alice").css("width"));
});
</script>

```
:::JavaScript
$("#growButton").click(function () {
    console.log('before '+$("#alice").css("width"));
    $("#alice").animate({width: "+=200"});
    console.log('after '+$("#alice").css("width"));
});
```

The reason is because the animation takes *time* (say, 600ms), and the
console.log happens *immediately* after the animation *begins*. So, the
value that we label "after" is unchanged from the "before" value.

So, what to do?  You can supply a callback function that is invoked after
the animation completes:

<button id="growButton2">Grow</button>
<button id="white_rabbit">White_Rabbit</button>
<button id="shrinkButton2">Shrink</button>
<script>
$("#white_rabbit").css("width","300px");
function report() {
    console.log($("#white_rabbit").css("width"));
}
$("#growButton2").click(function () {
    report();
    $("#white_rabbit").animate({width: "+=200"}, report);
});
$("#shrinkButton2").click(function () {
    report();
    $("#white_rabbit").animate({width: "-=200"}, report);
});
</script>

```
:::JavaScript
function report() {
    console.log($("#white_rabbit").css("width"));
}
$("#growButton2").click(function () {
    report();
    $("#white_rabbit").animate({width: "+=200"}, report);
});
```

## Directions

I'm going to leave most of the markup, CSS and coding to you. One
important piece is to realize that the 8 pieces are all positioned in an
area of the browser set aside for them. The playing area (grid) should be
`position:relative` and all the pieces are `position:absolute` and
positioned appropriately with the grid.

You can let each piece keep track of its location and use jQuery's `css`
method to read those values off when you need them.

I suggest giving each piece an ID so that you can easily find it to move
it around.

I will supply a set of images that you can use in this
[tarfile](../../downloads/tiles.tar)

If you want to use a different image, you can go to
[imagesplitter.net](http://imagesplitter.net) and split an image of your
choosing.

## Advice

* Build functions that you can test on their own, using the JS console,
rather than trying to build everything and test it using the click
handlers
* A low-level function you might write could be `getRightTile()` taking no arguments which returns the tile to the right of the blank, if any. You'll have to figure out what it should do or return if there is no such tile. Test it from the JS console.
* A high-level function you might write could be `doMove` which takes a direction, determines the tile to slide and slides it one space in that direction. Test it from the JS console.
* Remember that whenever you move a tile, you have to update your data structures and global variables to ensure that they correctly represent the new state of the grid.
* When you have the functions working well, then add the keyboard event handler to do the right thing.

Final advice:

* You can use either raw JS or jQuery to manipulate the DOM. I used
jQuery.
* Coding quality matters. Try to be concise and abstract.
* My code, including functions you've already written, and including blank
lines and comments space between functions, is still less than 100 lines.

## Final Checklist

* Make sure your name is in the files. If you have a partner, *both* names should be in the files.
* Make sure everything works and looks nice
* Make sure both the HTML and the CSS are valid
* Fill out this [form](https://docs.google.com/a/wellesley.edu/forms/d/e/1FAIpQLSe970yhc5Pws7GP_1xe_P-0cwliVZd4f_mWhxC5xRhji7bo9Q/viewform?usp=sf_link)
That form will help me improve the course for next time. The form is anonymous; it will not collect your username.

## How to turn this in

In your C9 workspace, rename your working directory to a finished directory:

`mv a05-work a05-done`

then make it not writeable:

`chmod -R a-w a05-done`

Finally, touch the directory for the last time:

`touch a05-done`
