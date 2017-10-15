# Ajax and Recursion

Ajax is not lengthy, but it is odd and surprising.

We'll also look at recursion

## Plan

1. Recap Ajax
1. Answer your questions
1. Discuss A9
1. Explore Recursion

## Recap Ajax

Ajax makes a "side" request to the server and sets up a "catcher" to catch
and deal with the response.

[slideshow](http://cs.wellesley.edu/~cs304/lectures/09-Ajax/reading.html#slideshow-on-ajax-interaction)

## Timing

Which message is printed first?

```
:::JavaScript
$.get('characters.json',function (data) {
    console.log('Done. Got '+data);
});
console.log('Finally done.');
```

## Demo

[get random HP character](ajax-v1.html)

Answer the following questions:

1. How long does it take for the data to arrive?
1. Does it take the same amount of time every time?
1. What URL is the data gotten from?
1. If you visit that URL (just copy/paste it into your browser location
bar), you can see the actual data that is sent. Or look at the
<code>serverData</code> global variable.

## CoffeeRun Examples

Let's look at these examples:

[coffeerun](coffeerun.html)

## Coffeerun Code

```
:::JavaScript
(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
```

## Your Questions

I'll answer [your questions](../../quizzes/quiz17.html)

## Assignment 9

We'll look at Assignment 9 and I'll give a demo.

## Cloning

Here's a complex bit of HTML:

```
:::HTML
<div class="foo">
   <div class="bar">
      <p><span style="font-weight:bold">buttons!</span>
         <span data-msg="msg">lorem ipsum</span>
         <input type="button" data-kind="fred" value="fred">
         <input type="button" data-kind="george" value="george">
      </p>
   </div>
</div>
```

Here's what it looks like:

<div id="template">
<div class="foo">
   <div class="bar">
      <p><span style="font-weight:bold">buttons!</span>
         <span data-msg="msg">lorem ipsum</span>
         <input type="button" data-kind="fred" value="fred">
         <input type="button" data-kind="george" value="george"></p>
   </div>
</div>
</div>

We will add copies of that template to a container (id of `container`).
Here's the JavaScript code that will do the work:

```
:::JavaScript
$("#addToContainer").click(function () {
     var clone = $("#template .foo").clone();
     var num = Math.floor(100*Math.random());
     clone.find("[data-msg]").text(num);
     clone.appendTo("#container");
});
```

Let's see it in action. Here's the button and the container:

<input type="button" id="addToContainer" value="add stuff to container">

<div id="container" style="border: 1px solid orange">
  <h2>This is the container</h2>
</div>

<script>
$("#addToContainer").click(function () {
     var clone = $("#template .foo").clone();
     var num = Math.floor(100*Math.random());
     clone.find("[data-msg]").text(num);
     clone.appendTo("#container");
});
</script>

The button makes it easy to add custom copies to the container, no matter
how complicated the HTML.

We can hide the template using `display:none` in our CSS.

## Delegation

Suppose we want to add behavior to our buttons. Here's a way:

<script>
$("#container").on('click',
                   '[data-kind=fred]',
                   function (event) {
                      alert("Oh, Fred!");
                   });
$("#container").on('click',
                   '[data-kind=george]',
                   function (event) {
                      gt = event.target;
                      var num = $(event.target)
                                   .closest(".bar")
                                   .find("[data-msg]")
                                   .text();
                      alert("Heavens, George! number is "+num);
                   });
</script>

```
:::JavaScript
$("#container").on('click',
                   '[data-kind=fred]',
                   function (event) {
                      alert("Oh, Fred!");
                   });
$("#container").on('click',
                   '[data-kind=george]',
                   function (event) {
                      var num = $(event.target)
                                    .closest(".bar")
                                    .find("[data-msg]")
                                    .text();
                      alert("Heavens, George! number is "+num);
                   });
```


## Bounds Checking plugin

jQuery's only flaw is to ignore "errors" where the selector doesn't match
anything.

I wrote a jQuery plugin to add two methods to check.

[bounds-check](https://cs.wellesley.edu/~anderson/js/bounds/bounds-plugin.html)

You're welcome to use it. I did.  It's as easy as this:

```
:::JavaScript
$("#fred").one().html('Gotcha!');
```

If `#fred` doesn't exist, you'll get an error instead of nothing.

Try this in the JavaScript console:

```
:::JavaScript
$("#containr").one().html();
```

## Recursion

Trees are important but are recursively defined and therefore are an
excellent match for recursive algorithms.  It's essential that you are
comfortable with such algorithms and data structures.

### Choose

The binomial coefficient is a recursive function:

```
:::JavaScript
function choose(n,k) {
    if( k==0 || k==n ) {
        return 1;
    } else {
        return choose(n-1,k-1)+choose(n-1,k);
    }
}

function test_choose(n) {
    for (var k = 0; k <= n; k++ ) {
         console.log(n+" choose "+k+" is "+choose(n,k));
    }
}
```

<script>
function choose(n,k) {
    if( k==0 || k==n ) {
        return 1;
    } else {
        return choose(n-1,k-1)+choose(n-1,k);
    }
}

function test_choose(n) {
    for (var k = 0; k <= n; k++ ) {
         console.log(n+" choose "+k+" is "+choose(n,k));
    }
}
</script>

## Recursive Tree Traversal

<script src="tree1.json"></script>

I've loaded into this page a tree in JSON as the value of `treejs`.  We'll
take a look at it.

```
:::JavaScript
function isLeaf(node) {
    return( typeof node === 'string' );
}

function treeSize(node) {
    if( isLeaf(node) ) {
        return 1;
    } else {
        return treeSize(node.Y)+treeSize(node.N);
    }
}    
```

<script>
function isLeaf(node) {
    return( typeof node === 'string' );
}

function treeSize(node) {
    if( isLeaf(node) ) {
        return 1;
    } else {
        return treeSize(node.Y)+treeSize(node.N);
    }
}    
</script>

## Exercise:

Write a function to find the *height* of the tree. It might be helpful to
know that there is a `Math.max` function in JavaScript.

<div class="solution">
<pre>
function treeHeight(node) {
    if( isLeaf(node) ) {
        return 1;
    } else {
        return 1+Math.max(treeHeight(node.Y),treeHeight(node.N));
    }
}    
</pre>
</div>

## Summary

Ajax

* Ajax allows us to send (POST) and receive (GET) data from a server
  without having to leave our current page.
* We can also use the `.ajax` jQuery method if we want to use other verbs
  like PUT or DELETE.
* Ajax requests are *asynchronous*, so we *must* supply a callback
  function if we care about the response from the server (usually we will,
  but sometimes we might not).

LocalStorage

* We can save data to the browser using a generic key/value store
* <code>localStorage.<em>key</em> = <em>value</em></code>

Recursion

* Very important for handling recursive data structures, such as trees
  (including web page documents).
* Write a function to solve the "generic" case of a single node (leaf or
  internal node) and trust that the recursive calls will do the right
  thing.
  
