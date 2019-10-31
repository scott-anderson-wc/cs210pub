# Trees and Recursion

Trees are important in Computer Science. They are best defined recursively
and therefore are an excellent match for recursive algorithms.  It's
essential that you are comfortable with such algorithms and data
structures.

Definition:

A binary tree is either:

* a leaf (a node with no children), *OR*
* a node with two children, each of which is a tree

## Tree in JSON

The JSON structure that we learned earlier in the course is easily able to
represent a binary tree:

* a leaf can be just a string
* a node can be a JS object with two properties, `lchild` and `rchild`,
* each of which is a tree

Here are some examples. I suggest you draw them out so that you are better
able to understand this definition:

```
:::JavaScript
tree1 = 1;
tree2 = {lchild: 2, rchild: 3};
tree3 = {lchild: {lchild: 4, rchild: 5}, rchild: {lchild: 6, rchild: 7}};
tree4 = {lchild: 8, rchild: {lchild: 9, rchild: {lchild: 10, rchild: 11}}};
```

Look at those variables in this browser window and see what they look
like. Toggle the triangles to go deeper.

## Pretty-Printing a tree

Trying to read a tree like the ones above can be a bit difficult at
first. Pretty-printing the tree, nicely indented, can help. One way is to
use the `JSON.stringify()` function with the third argument being a tab
character (written as `\t`). Then the JSON string is nicely
indented. Here's how:

```
:::JavaScript
JSON.stringify(tree3, null, '\t');
```

Let's write a simple function called `pp` that does this:

```
:::JavaScript
function pp(json) {
    return JSON.stringify(json, null, '\t');
}
```

Open the JS console and try that function on the example trees above.

## Random Numbers

In a moment, we'll build some random trees with random numbers as the
leaves, but we'll take a brief aside to talk about random numbers. Most
languages have a built-in random number generator that returns decimal
values between 0 and 1. That's because such a value is often easy to work
with. For example, the following function returns true with the given
probability:

```
:::JavaScript
function chance(prob) {
    if( Math.random() < prob ) {
        return true;
    } else {
        return false;
    }
}    
```

That function is written the way most novices write code, but it's
needlessly verbose. Most experienced programmers would realize that the
value of the conditional is exactly the value that they want to return, so
they would instead write the following, which is much more concise and
means exactly the same thing:

```
:::JavaScript
function chance(prob) {
    return( Math.random() < prob );
}
```

Play around with that function in the JS console, so that you feel
confident using it.

Next, suppose we want to generate equally likely integer numbers from 1 to
6, say for a die roll. The idea is to take the fractional number, multiply
it by the number of values we want (6 values, which is just the max minus
the min plus 1), and then round it *down* to an integer (using
`floor`). That yields an integer in the range from [0-5]. Then, add the
bottom of the range (in this case, 1), and you get the numbers you want.

```
:::JavaScript
function rand_in_range(min,max) {
    range = max - min + 1;
    return( min + Math.floor(range*Math.random()));
}
```

Again, play around with that function a bit in the console so that you
feel confident using it.

## Random Tree

Let's write a JS function that can create a random tree like the ones
above. You can use the `pp` function to print the results.  This function
uses random numbers for two purposes. One is random values for the
leaves. For that, we'll use random integers from 1-100. The other is the
probability of of a leaf. For that, we'll use `chance`.

```
:::JavaScript
function randTree(probLeaf) {
    if( chance(probLeaf) ) {
        return rand_in_range(1,100);
    } else {
        return {lchild: randTree(probLeaf),
                rchild: randTree(probLeaf) };
    }
}
```

Note the two recursive calls.

As before, copy/paste that into the JavaScript console and play around
with it a bit so that you feel confident using it.  I suggest using a
probability of a leaf between 0.4 and 0.7. Too low and you'll exhaust the
stack size too often.  Too high and almost all the trees are tiny and
uninteresting.  Try a few values. Try it multiple times. I used the
uparrow key to try the following a few dozen times:

```
:::JavaScript
pp(rt=randTree(0.6));
```

## Display Tree

Suppose we want to convert our random tree into elements in the DOM. Each
node will be drawn with a box around it and a little left padding so it'll
be indented:

```
:::CSS
.node {
    border: 1px solid black;
    padding-left: 2em;
}

.leaf {
    border: 1px solid red;
    padding-left: 2em;
}
```

The idea will be to generate a DOM element as the return value from the
recursive JS function. Leaves will be `p` elements, and nodes will be
`div` elements. The driver will start the function on the root, get the
DOM element for the entire tree, and then attach the whole thing to the
DOM someplace, namely a static DIV whose id is `tree_display`. 

Here's the JS:

```
:::JavaScript
function show_random_tree(probLeaf) {

    // purely functional recursive function
    function make_tree(node) {
        if( typeof node == "number" ) {
            return $("<p>").addClass("leaf").text(node);
        } else {
            var parent_div = $("<div>").addClass("node");
            parent_div.append(make_tree(node.lchild));
            parent_div.append(make_tree(node.rchild));
            return parent_div;
        }
    }

    var tree = randTree(probLeaf);
    var dom_elt = make_tree(tree);
    $("#tree_display").empty().append(dom_elt);
}
```

Try that in the JavaScript console and play around with it a bit so that
you feel confident with it.

Finally, let's make a slider for probability values and a button to allow
us to try this many times:

```
:::HTML
<label>probLeaf: <input type="range" name="probLeaf" min="0.3" max="0.8"></label>
<button id="new_tree">Make a Tree</button>
<div id="tree_display">tree goes here</div>
```

And the JavaScript

```
:::
JavaScript
$("#new_tree").on('click',
    function () { 
       var prob = $('[name="probLeaf"]').val();
       show_random_tree(prob);
    });
```

<div id="example">
<style scoped>
.node {
    border: 1px solid black;
    padding-left: 2em;
}

.leaf {
    border: 1px solid red;
    padding-left: 2em;
}
</style>
    <label>probLeaf:
       <input type="range" name="probLeaf" min="0.3" max="0.8" step="0.05">
       </label>
    <button id="new_tree">Make a Tree</button>
    <div id="tree_display">tree goes here</div>
</div>

<script>
tree1 = 1;
tree2 = {lchild: 2, rchild: 3};
tree3 = {lchild: {lchild: 4, rchild: 5}, rchild: {lchild: 6, rchild: 7}};
tree4 = {lchild: 8, rchild: {lchild: 9, rchild: {lchild: 10, rchild: 11}}};

function pp(json) {
    return JSON.stringify(json, null, '\t');
}

function chance(prob) {
    return( Math.random() < prob );
}

function rand_in_range(min,max) {
    range = max - min + 1;
    return( min + Math.floor(range*Math.random()));
}

function randTree(probLeaf) {
    if( chance(probLeaf) ) {
        return rand_in_range(1,100);
    } else {
        return {lchild: randTree(probLeaf),
                rchild: randTree(probLeaf) };
    }
}

function show_random_tree(probLeaf) {

    // purely functional recursive function
    function make_tree(node) {
        if( typeof node == "number" ) {
            return $("<p>").addClass("leaf").text(node);
        } else {
            var parent_div = $("<div>").addClass("node");
            parent_div.append(make_tree(node.lchild));
            parent_div.append(make_tree(node.rchild));
            return parent_div;
        }
    }

    var tree = randTree(probLeaf);
    var dom_elt = make_tree(tree);
    $("#tree_display").empty().append(dom_elt);
}

$("#new_tree").on('click',
    function () { 
       var prob = $('[name="probLeaf"]').val();
       show_random_tree(prob);
    });
</script>

