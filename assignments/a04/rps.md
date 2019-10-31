# Assignment: Rock-Paper-Scissors Game

This next assignment will actually not be very much coding, but we'll
build something fun (well, somewhat fun)

## Here it is in action:

<video controls style="width:50%;border:1px solid black">
    <source src="rps.mp4" type="video/mp4">
    Your browser doesn't support the video tag
</video>

## Directions

I'm going to leave all the markup, CSS and coding to you. 

Put your work in a folder called `a04`:

```
cd ~/public_html/cs204-assignments/
mkdir a04
```

I will supply a set of images that you can use in this
[tarfile](../../downloads/rps-images.tar) To get those images into your
account, you'll need to download and untar the tar file. The following
commands, executed in your *Tempest* account, will do the trick.

```
cd ~/public_html/cs204-assignments/a04
curl https://cs.wellesley.edu/~cs204/downloads/rps-images.tar --output rps-images.tar
tar xf rps-images.tar
```

(This is the same procedure as for the zodiac images.)

## Guidelines/Suggestions

Here's how I approached and solved the problem. You don't have to do it my
way. You can come up with a different way or follow my suggestions. I've
mentioned the function names I used, but you don't have to do that,
either.

* write a function, `rpsJudge`, to compare two choices (rock, paper, or scissors) as strings, returning 0 on a tie, 1 if the second argument wins, and -1 if the first argument wins. (Or some other encoding.)
* re-use the `randomElt` function from the last assignment
* write a function, `highlightPlayerChoice` that, given a player's choice as a string, puts a blue border around the choice image. Note that I used a simple trick to get this so that the page doesn't jump around when you do the highlighting. Start (in the static CSS) with a *white* border around each image. Then, the highlighting is just to change the `border-color` to blue. Then it's exactly the same size, so the layout is identical.
* write a function, `showComputerChoice` that, given the computer's choice as a string, sets the computer image. This is similar to what you did in the Zodiac assignment.
* write a function, `resetRPS`, to reset the game (you'll use this at the beginning of each turn). It sets all the player choices back to a white border and clears the previous message.
* write a function, `startOver`, to reset the scores (you'll use this when the game starts over).
* add the latter function as an event handler for the "startOver" button
* write a function, `updateScores` to update the page with the current scores.

Those building blocks will make the next function, which is big, a bit
easier. I called my function `playerTurn`. The `playerTurn` function does
all the work to play one round of the game, given the player's choice (as
an argument, a string). That function does the following:

1. uses `resetRPS` to reset the game to start the turn
1. uses `highlightPlayerChoice` to highlights the player's choice
1. uses `randomElt` to determines the computer's choice
1. uses `showComputerChoice` to display that choice
1. uses `rpsJudge` to compare the choices to see who won
1. updates the scores (global variables)
1. uses `updateScores` to update the score display
1. inserts a message on the page saying the outcome

Finally, the last step is to somehow invoke the `playerTurn` function,
with the appropriate argument, when the user clicks on their choice. The
easiest way is *not* the fancy `addThumbClickHandler` that the book uses
for Ottergram.  (Though that can be made to work, of course, and you're
welcome to do that if you'd like.)  The easier way is to add a custom
click handler function to each user choice image, where the only thing
that function does is invoke `playerTurn` with the appropriate
argument. Those handler functions can be very simple anonymous functions,
similar to one another, but not identical.


## Advice

* Build functions that you can test on their own, using the JS console,
rather than trying to build everything and test it using the click
handlers. All of mine are done that way.
* You can use either raw JS or jQuery to manipulate the DOM. I used
jQuery.
* Coding quality matters. Try to be concise and abstract.
* My code, including functions you've already written, and including blank
lines, comments and space between functions, is still less than 100 lines.

## Final Checklist

* Make sure your name is in the files. If you have a partner, *both* names should be in the files.
* Make sure everything works and looks nice
* Make sure both the HTML and the CSS are valid

## How to turn this in

We'll grade the work in your `cs204-assignments/a04` folder; no need to do
anything else

## Tutors/Graders

You can use the password to view the [RPS solution](../../solutions/a04-rock-paper-scissors/rps.html).
