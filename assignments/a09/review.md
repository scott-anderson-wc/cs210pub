## 20 Questions Review

We'll look at the code of Assignment 9 (Twenty Questions)

First, some concepts:

The *show tree* task is a recursive function on a recursive data structure.

The *game play* task is an iterative algorithm on a recursive data
structure. Each step (iteration) of the game goes down the tree, from
parent to (one) child. We keep track of where we are by using a separate
variable. (I called mine `currentTreeNode`.)

## Tree Sketch

I'll sketch the tree so we all remember what it looks like.

## Code Review

I'll hand out a printout of my code, so you can follow along.

[my solution](../../solutions/a09-20questions-static/20-static.html)

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

I used both of these techniques: the first with show-tree, and the second
in game play.

We'll observe:

1. How `showtree` works: base case, recursive case, and how it starts and finishes
1. Game play, and adding a DOM element from `nextQuestionDOM`
1. How to use templates to add a DOM element
1. Implementing the four kinds of answers (yes, no, win, lose)
1. Buttons for the four kinds of answers
1. Adding button handlers, including new game and the delegated gameplay
buttons
