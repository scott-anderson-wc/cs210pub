# Assignment: Concentration

The game of Concentration (which also goes by many other names) is very
old. This version was developed by Ellen Hildreth for CS 110.

## Goal

You'll build a web application that will have grid of images, all of them
blank (displaying a 150x150 pixel image of white pixels).  However, each
is clickable to reveal a picture (like turning over a card). You click on
them in pairs.

* for the first click, the picture is revealed. (if the picture is already revealed, you can do nothing).
* for the second click, the picture is also revealed, but then the pictures are compared,
and if they aren't the same, they both get hidden again, after a short delay (1 second) so that
the user can see the pictures.

## Demo

<video controls style="width:50%;border:1px solid black">
    <source src="concentration.mp4" type="video/mp4">
    Your browser doesn't support the video tag
</video>

## Game Play

Your Game of Concentration will be played on a 4x4 game board whose cells
initially contain blank images, as shown in this <a
href="initGame.png">initial game display</a>.  Each cell will have a
"hidden" image that appears when the user clicks on the blank cell. In
each round of the game, the user will select two blank cells by clicking
on them, one after the other. As the user clicks on each blank cell, the
hidden image should appear. If the two cells contain matching images, the
images should remain visible. If the two images do not match, a message
should appear on the page in a visible location indicating that there is
no match.

Your program should keep track of, and display, the total number of clicks
and matches as the game progresses, as shown in this <a
href="inProgress.png">game in progress</a>, which has three pairs of
matching images that were found after 16 clicks. When the user succeeds at
finding all 8 pairs of matching images, a message should appear on the page,
congratulating the user on their success and indicating how many clicks
were needed to finish the game. The object of this version of the game is
to finish with the fewest number of clicks <strong><em>(beware! once you
have a working game, it can become addictive!)</em></strong>.  The game
display should include some text that the user can click to start a new
game, as shown in the bottom right corner of the sample game displays.
                
## Making the images disappear

There's one tricky thing that we need to help you with, and that is
getting the images to disappear after 1 second.  JavaScript has a built-in
function called <code>setTimeout</code> that takes two arguments: a
function and an integer. The integer says how long to wait (in
milliseconds) before executing the function.  Copy/paste the following
into a JavaScript console to see how it works:

<pre class="prettyprint lang-js linenums executable">
setTimeout( function () { alert("done!"); }, 1000);
</pre>

So, to make the images disappear after after 1 second, just write the
appropriate function and use <code>setTimeout</code> to invoke it after
1000 milliseconds.

## Building the Concentration Game *Incrementally*

When faced with a large programming task, it is always best to develop the
implementation *incrementally*. We recommend that you first create the
visual layout of the game board, including the necessary CSS, and then add
JavaScript code to handle events such as the user's clicks.

### (1) Create the visual display

Create an initial webpage with the following elements:


* a title at the top of the page.
* a 4x4 arrangement of 16 images whose source (<code>src</code>) is the
<code>blank.jpg</code> image stored in your <a href="#images">tarfile</a>
below. Add an <code>id</code> to each <code>&lt;img&gt;</code> element
that is a string containing an integer that will be used to identify the
location of the image on the game board. The first
<code>&lt;img&gt;</code> element should have an <code>id</code> of "1",
the second should have an <code>id</code> of "2", and the last should have
an <code>id</code> of "16". This <code>id</code> will be used to change
the source of the image as the game progresses (changing between the blank
and hidden images). Wrap a single <code>div</code> around the entire set
of 16 images comprising the game board, and add CSS to create borders
around the images and game board.  (Everything in this bullet is in the
starting file.)
* text to display the number of clicks and matches as the game
progresses. This text should initially indicate 0 clicks and 0
matches. Add an <code>id</code> to this element to allow the text to be
changed as the game progresses.
* text (or image) that (in stage 4, below) will have
a <code>click</code> event handler to allow the user to start a new
game.

You're welcome to embellish your webpage with additional style.

### (2) Load an external JavaScript file with some initial code

We provide two JavaScript functions, named `shuffleImages()` and
`getImage()`, to assist with your implementation of the game. The
definitions of these functions are stored in an external JavaScript file
that can be loaded with the following statement that you should add to the
bottom of your page, after the loading of jQuery, and before your own
code.  Here's the URL:

`https://cs.wellesley.edu/~cs204/assignments/a06/supplied.js`

(You're welcome to look at that [code](supplied.js); there are no secrets.

The `shuffleImages()` function generates a random configuration of the 8
pairs of images for the game board. This function has no inputs or outputs
and can be invoked as follows:

```
:::JavaScript
shuffleImages();
```

Note that the <code>shuffleImages()</code> function initializes the board,
so you must invoke that before the <code>getImage()</code> function will
work.

The <code>getImage()</code> function will be used to get the filename for
the hidden image associated with each cell on the game board.  The
<code>getImage()</code> function has a single input that is the
<code>id</code> for a particular <code>&lt;img&gt;</code> element on the
game board (e.g. "1", "2", etc.).  This function returns a string that
specifies a relative URL for the hidden image for the cell associated with
the input <code>id</code>. For example, the expression
<code>getImage("11")</code> might returns the string "images/im7.jpg"
which is the URL for the hidden image associated with the
<code>&lt;img&gt;</code> element whose <code>id</code> is "11", which
might be the filename for the smartphones image.  Try it out a little
using the JS Console, so that you are comfortable with it.
       
### (3) Add JavaScript code to implement the <em>actions</em> of the game

Implement the actions for the game <em>incrementally</em> using
JavaScript, by proceeding in four stages as described below. To begin this
development, first create an additional pair of
<code>&lt;script&gt;</code> tags after you loaded jQuery and our
<code>supplied.js</code> file (see above). All of the JavaScript code that
you write will be placed between these tags.

#### Stage 1: Reveal and conceal images on the game board

After completing this first stage, you'll be able to click on each blank
cell on the game board and the following actions will take place: (1) the
hidden image will appear in the cell, and 1 second later, the image will
disappear.  To complete this stage, add JavaScript code to do the
following:

(1) invoke the <code>shuffleImages()</code> function to create
  a random configuration of hidden images.

(2) define a function named <code>showImage()</code> that displays the
  hidden image for a blank cell that the user clicked. This function
  should have one parameter that is the <code>id</code> for the
  <code>&lt;img&gt;</code> element associated with the cell that the user
  clicked. The <code>showImage()</code> function should do the following
  <ul> <li>change the SRC attribute for the image with the given ID to be
  the url returned by <code>getImage()</code> </li></ul>

You can and should test the <code>showImage()</code> function using the JS
console.  For example, the following will reveal the image associated with
the first cell:

```
:::JavaScript
showImage(1)
```

(3) define a function named <code>hideImage()</code> that changes a cell
back to the blank image.  This function should also have one parameter
that is the <code>id</code> for the <code>&lt;img&gt;</code> element
associated with the cell that the user clicked.  The
<code>hideImage()</code> function should change the SRC attribute for the
image with the given ID back to the <code>blank.jpg</code> image.

(4) You can and should also test this function using the JS console.  The
following will conceal the image associated with the first cell:
                
```
:::JavaScript
hideImage(1)
```

(5) define a function named <code>processClick()</code> that processes the
 user's clicks. This function will take one argument, the ID of the image
 that was clicked on.  This API allows you to easily test it from the JS
 console and makes the event handler as lean as possible.  (The
 <code>processClick()</code> function is <em>not</em> the event handler;
 it can't be, because it takes a different kind of argument.) For this
 first stage, the <code>processClick()</code> function should just do the
 following steps: 

1. invoke the <code>showImage()</code> function with the ID as an
 argument, in order to to reveal the hidden image,
1. then invoke <code>hideImage()</code> with the ID as
 an argument, to conceal the image again.

#### Testing Your Code

You can test the `processClick` function in the JS console (as you can all
of these) just by calling them. E.g. to simulate clicking on the upper
left cell, do:

```
processClick(1);
```

While shuffling is important to have a real game, it makes things harder
to test. If you add `?grading` to the end of the URL, the
`shuffleImages()` function will set up the board but not shuffle it, so
the 3rd row is the same as the first row and the fourth row is the same as
the second row, which makes testing a lot easier!

#### Stage 1 Handler Attachment

Finally, you must invoke <code>processClick()</code> when one of the
<code>&lt;img&gt;</code> elements is clicked.  This can be done by
attaching a function (that invokes <code>processClick</code> with the
appropriate argument) to every game image as a click handler.  You can do
this the same way the event handlers were added to each thumbnail in
Ottergram. (In this case, you will use the raw JavaScript API rather than
jQuery.) Note that you will have to make sure each event handler knows the
ID of the image that it's attached to, since that's the argument to
`processClick`.  There are several ways to do this.

**Test your code for this stage to be sure it works correctly
before proceeding to the next stage!**
   
#### Stage 2: Distinguish the first and second clicks

After completing this second stage, you'll be able to click on pairs of
blank cells on the game board and have both hidden images revealed. After
the second cell of each pair is clicked, the images will remain visible if
the images match. If they don't match, insert a message onto the page, and
then, after a second or so (see <code>setTimeout</code>, above), the two
images will disappear. You can proceed with this stage as follows:

1. Create two <strong><em>global variables</em></strong> to store the following information:
    * an integer whose value will be 1 or 2, indicating whether the user selected
     (clicked on) the first or second cell of a pair of locations. This variable
     should be initialized to 1.
    * the <code>id</code> for the <code>&lt;img&gt;</code>
     element associated with the first cell of the pair selected
               by the user. This variable does not need to be initialized
               to a specific value.  The purpose of this variable is to
               remember the ID of the first cell that was clicked on, so
               that the images can be compared to determine whether they
               match.
1. Modify the <code>processClick()</code> function to handle first and second clicks
   differently. This function should still invoke <code>showImage()</code> first, to display 
          the hidden image for the selected cell. Then, if this is the first click (the click number 
          is 1), perform the following two actions:
    * store the id of the cell that was clicked on.  Store it in the global variable to created above.
    * change the click number to 2

Otherwise it's the second click, so the function should compare the images
for the two selected cells. You can accomplish this by comparing the
strings (containing the image filenames) that are returned by the
<code>getImage()</code> function, for the two <code>id</code>'s associated
with the first and second cells clicked by the user. If these strings do
not match, then perform the following actions:

* notify the user that there is no match
* hide the images again (after 1 second)

Whether or not it's a match, change the click number back to 1.

*Suggestion:* Break this stage into two steps: first make sure you are
 distinguishing between first and second clicks, say by putting an
 <code>alert()</code> or <code>console.log()</code> into the relevant part
 of your code so that you know which part of your code is handling a first
 click and which part is handling a second click.  When you click on
 cells, you should have those two alert messages alternating.

**Test your code for this stage to be sure it works correctly before proceeding to the next stage!**

Once you get this working, you can remove the alerts. In fact, you
<em>should</em> remove the alerts. There is an odd effect where the
<code>alert</code> causes the browser to stop before it has updated the
page with the new image, so even though your code invokes
<code>showImage</code> to show the image, you might not see the image (at
least until after you respond to the alert).  Pretty much any other way of
reporting what's happening will work, such as <code>console.log</code> or
inserting the string <code>no match</code> onto the page, which is what
your finished code will do.

#### Stage 3: Keep track of the status of the game

After completing this third stage of the game, you'll be able to keep
track of the number of clicks and matches as the game progresses, and
notify the user when the game is done. You can proceed with the following
steps:

1. Create two additional global variables to store the following information:         
    * the number of clicks the user has made so far, initialized to 0
    * the number of matches the user has found so far, initialized to 0
1. Modify the <code>processClick()</code> function to record and display the
 status of the game. After invoking <code>showImage()</code> at the beginning, perform
 the following actions:
    * increment the number of clicks made so far
    * update the text on the webpage that displays the number of clicks, to reflect the new number of clicks

If there is a match between the images associated with the first and second cells
selected by the user:

* increment the number of matches found so far
* update the text on the webpage that displays the number of matches, to reflect the new number of matches
* if the game is done (all 8 matches have been found), then congratulate the user
 with a message that includes the number of clicks needed to complete the game

** Test your code for this stage to be sure it works correctly before proceeding to the next stage!**

#### Stage 4: Allow the user to start a new game

After this final stage is complete, the user will be able to start a new
game without having to reload the page, by clicking a "button" (a
clickable image or bit of text).  This final stage can be completed as
follows:

* Define a function named <code>startNewGame()</code> that
 starts a new game for the user. This function should have no
 parameters and should perform the following actions:
   * invoke <code>shuffleImages()</code> to generate a new random arrangement of images for the new game
   * reset the global variables for the start of a new game 
   * reset the text on the webpage to indicate 0 clicks and 0 matches 
   * change all the cells of the board to the blank image (you
             can use your <code>hideImage()</code> function here, multiple
             times, or think of an even better way using jQuery).
* Attach the <code>startNewGame()</code> function to be the
        click handler for the button on your page.

      <p>Again, <strong><em>test your code thoroughly</em></strong> after
      completing this final step.

      <p><strong><em>You can assume that the user plays the game
      correctly!</em></strong> For example, you can assume that the user
      only clicks on blank cells, and that they only click on two cells
      for each round of the game.

## Images

You can get the images from this <a href="concentration-images.tar">tarfile</a>, which
is also in the downloads folder:

```shell
curl https://cs.wellesley.edu/~cs204/downloads/concentration-images.tar --outfile images.tar
tar xf images.tar
```

## How to turn this in

We'll grade the work in your `cs204-assignments/a06` folder; no need to do
anything else

## Tutors/Graders

You can use the password to view the [Concentration](../../solutions/a06-concentration/game.html)

