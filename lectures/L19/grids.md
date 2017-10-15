# Grids and Radio Buttons
Today, we'll learn about Grid systems (skeleton in particular) and radio
buttons.

## Plan

1. Recap Grid Systems
1. Answer your questions
1. Demo A8
1. Build a little page using skeleton
1. Discuss radio buttons in HTML
1. Add a set of radio buttons to our page
1. Discuss how to find out the value of a radio button set

## Recap Grid Systems

Grid systems are pretty common.  Look at Facebook or [the NY
Times](https://www.nytimes.com/). It's pretty common to be able to point to
a page and be able to say "the left column" or the "middle column"

You don't *have* to use a grid system, but it can be useful.

## Grid Basics

1. Page is a set of *rows*, each of which is some number of *areas*
1. The width of each area is measured in *columns*
1. The CSS has definitions for columns based on each being 1/12th of the
width
1. Typically uses `box-sizing:border-box` so that widths are easier to
manage (width includes padding and border but not the margin)
1. There are all kinds of shorthands so that your HTML can be fairly
readable:

```
:::HTML
<div class="row">
    <div class="one column">Hufflepuff</div>
    <div class="four columns">Slytherin</div>
    <div class="six columns">Gryffindor</div>
    <div class="two columns">Ravenclaw</div>
</div>
```

The result is a row with 4 *columns*, one for each Hogwarts house, but of
unequal widths. 

There is a terminological problem here: what is a "column"?

What mistake did I make above?

## Behind the Scenes

Since this page was itself built with Skeleton, let's do a "view source"
on this page and see the HTML and CSS.

(Note that the source isn't as pretty as I would like, because it was
written by Python program.)

Observe:

* How many rows does the page have?
* How many columns?
* What is the width of 12 columns? Of 6? 
* What is the total width of two 6-column areas?
* What are the margins of those two columns?
* Look at the first few media queries
* Zip down to the end and look at the other media queries

## Skeleton

Visit [getskeleton.com](http://getskeleton.com) and see what they have
there.

## Your Questions

I'll answer [your questions](../../quizzes/quiz15.html)

## Demo of Assignment

I'll demo the next assignment, which will

1. Use skeleton to lay out the page
1. Use a `.js` file that contains some multiple-choice questions.
1. Dynamically create as many quiz questions as there are in that file
1. Add a function to grade a quiz question.
1. Use event delegation to grade any question with just one function.

You already know the theory of how to use skeleton. Now, go through some
steps, and we'll make sure you know how to create a radio button set.

## Exercise: Build a Skeleton

Use `curl` to download [skeleton.tar](../../downloads/skeleton.tar) to
your C9 account. Then un-tar it.

Open the base page. It should look like this [base
page](../../downloads/skeleton/base.html)

Clear out the demo stuff if you would like.

Put in a hand-coded row and column. (It doesn't have to add up to twelve
columns). We'll use that for the next part of the exercise.

[My solution to the first exercise](solution1.html)

## Radio Buttons

Radio buttons are good when you want to force people to make a choice
among a set of options. (Drop-down menus can work, too.)

Suppose we are selling T-shirts. They come in either blue or red. Here's
how we might do that:

```
:::HTML
<div>
    <label>
       <input type="radio" name="color" value="red"> Le Rouge
    </label>
    <label>
       <input type="radio" name="color" value="blue"> Le Bleu
    </label>
</div>
```

In action:

<div>
    <label>
       <input type="radio" name="color" value="red"> Le Rouge
    </label>
    <label>
       <input type="radio" name="color" value="blue"> Le Bleu
    </label>
</div>

Some important points:

* two different controls have the same *name*. That's how the browser
  knows that they are in a radio group, so that if one is selected, the
  other is de-selected. Two different elements can't have the same *id*
  but they can (and in this case, *must*) have the same name.
* the `label` associates a piece of text with a button. Here, we put the
  text after the button. You can imagine other layouts that makes the
  association less obvious. Or maybe someone is blind, and doesn't see the
  layout at all. The `label` is crucial for *accessibility*
* The description doesn't have to match the value. Usually it does, but it
  doesn't have to. Here, we switched between English and French.
* Initially, neither is checked.  So what is the value?

## Determining Value

Implement the code above in your C9 workspace.

Open the JS console and try the following:

```
:::JavaScript
$("[name=color]");
```

Unsurprisingly, this selector finds two inputs.  Now try the following
jQuery incantation:

```
:::JavaScript
$("[name=color]").val();
```

Check a value and try the incantation again. Check the other value and try
it a third time.

Refresh your page to make the radio buttons unchecked. Then try this
incantation instead. Try it for all three states.

```
:::JavaScript
$("[name=color]:checked").val();
```

## Exercise: Improved Radio Buttons

Skeleton would like you to wrap the text in a `span` with a class of
`label-body`.

Make that change, and then create another set of radio buttons to choose
the size of the T-shirt (L, XL and XXL).

[My solution to the second exercise](solution2.html)

## Exercise: A Bold Choice

If we have time, let's add an event handler that makes the text blue when
an item is checked.  Conceptually, here's how we might do it:

* Invent a class to add/remove to make the style change, call it `chosen`
* Add an event handler to every radio button
* That handler starts at the target, goes up to the `div` for the radio group, then down to every
  button and removes the `chosen` class
* The handler starts again at the target, goes up to the `label`, then
  down to the `label-body` and adds the `chosen` class.

Here's how we might define the `chosen` class:

```
:::CSS
.chosen { color: blue; }
```

Here's the JQ code:

```
:::JavaScript
$("[type=radio]").click(function (event) {
    console.log(event.target);
    var start = event.target;
    $(start).closest("div").find(".label-body").removeClass("chosen");
    $(start).closest("label").find(".label-body").addClass("chosen");
});
```

Here is my [solution to third exercise](solution3.html)

## Summary

We learned about grid systems, which automates some of the tedious parts
of making a responsive, multi-column page.

We learned about how to build radio buttons, using a shared `name`
attribute to indicate the group.

We saw how to use jQuery's `.val()` method to get the current value of a
set of radio buttons.
