# Solution to Jelly Blobs of Doom

[my solution](jBlobs.html)

## Code Review

* We'll start with the HTML file and notice
    * the initial buttons and text
    * the way the files are loaded and used
* We'll look briefly at the CSS file; there's not much there
* We'll look at the JS files, in order.

Things to note:

* Correspondence between DOM object (a `div`) and the JS object (`Blob`);
  look at `setDiameter` for example
* `Player` is pretty simple.
* Constructor for `Enemy` invokes `Blob` constructor, after choosing color
  and diameter
* `maybeCollide` does some important work
* How enemy sets coords
* The `start` method starts the animation, with the `progress` and `done`
  callbacks, including two uses of `bind`.
* The `game.js` file (not printed) defines a function to start the game,
  and sets up event handlers (click handlers and a mouse handler with
  another use of `bind`)


