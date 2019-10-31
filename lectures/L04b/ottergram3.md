# Ottergram Chapter 3 and 4

## Outline

1. Announcements, roll, etc.
1. Chapter 3 walkthrough
1. Chapter 4 recap
1. Chapter 4 exercises

## Chapter 3 Walkthrough

The following sections walks us through the steps of Chapter 3, combining
some steps, but having you and your partner do all the work, so that you
can become more comfortable with the process.

* you will have VSC open and Chrome
* in Chrome, you'll be looking at
   * your Ottergram, and
   * these notes
* you'll edit using VSC, save, and shift+reload your Ottergram in Chrome
* you'll be editing two files: the HTML and the CSS files.

### Starting point is Chapter 2

We'll start by with the solution from Chapter 2

Start VSC, connect to your account on the CS server, and open a terminal
window. In the terminal window, do this:

```
cd ~/public_html/cs204/
cp -r ~cs204/pub/downloads/Chapter-02 ch3
ls
ls -R ch3
```

WAIT

We've copied it as `ch3` because we are going to edit it so that it will become the result of Chapter 3. Here's the first version:

[ch3a](ch3a/)

Now let's see your copy:

Open a web browser (change the `cs204guest` to your account) and
navigate to find the ottergram solution in the `ch3` folder.

[https://cs.wellesley.edu/~cs204guest/](https://cs.wellesley.edu/~cs204guest/)

WAIT

You can explore this web page by using "View Source" (command-shift-U).

Note:

* there's a HEAD and a BODY
* the HEAD has a META, a TITLE and a LINK to a CSS file
* there's a CSS file but it's empty (click to see its contents)
* the BODY has a HEADER and a UL
* the LI items all have the same structure: LI A IMG SPAN

If you get lost later, you can always return to this step.

## Step 1 is Normalize.css

* Open your `ch3` ottergram `index.html` in VSC. From the terminal, do:

```
code ch3/ottergram/index.html
```

Add the following code in the HEAD, before the existing LINK

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
```

You might also customize the H1 text, so you will know it's YOUR
ottergram.

Save the file, switch back to your web browser and shift+reload. Do you
see any difference? Here's mine:

[ch3b](ch3b/)

WAIT

I see a difference just in the appearance (style) of the H1 element.  We
can use the Chrome Developer tools:

* control-click on the H1 and choose "inspect"
* notice the H1 rule from `normalize` that sets `font-size` and `margin`
* notice the `font-family` that is inherited from HTML

## Step 2: add a class to the SPANs and add a style rule.

Add a `class="thumbnail-title"` to every SPAN, converting

```
:::HTML
<span>Barry the Otter</span>
```

to

```
:::HTML
<span class="thumbnail-title">Barry the Otter</span>
```

I suggest using the VSC Edit/Replace function, replacing

```
:::HTML
<span>
```

with

```
:::HTML
<span class="thumbnail-title">

```

Click to confirm the changes.

This change means nothing without a rule. Either open the CSS file using
the GUI or open it using the terminal like this:

```
code ch3/ottergram/stylesheets/styles.css
```

Then add the following rule:

```
:::CSS
.thumbnail-title {
    display: block;
    margin: 0;
    padding: 4px 10px;
    background-color: rgb(96, 125, 139);
    color: rgb(202, 238, 255);
}
```

Save the file, switch back to your web browser and shift+reload. Do you
see any difference? Use the Chrome Developer tools to toggle each of the
properties that we added.

Here's mine:

[ch3c](ch3c/)

WAIT

If you get lost at the next step, you can restart from here using:

```
cp -r ~cs204/pub/lectures/04b/ch3c ch3
```

## Step 3: Style Inheritance, font-size and text-decoration

Add the following rule to our CSS file (anywhere is okay, but put it at
the top, to match our book's solution).

```
:::CSS
body {
    font-size: 10px;
}
```

and modify the `.thumbnail-title` rule to add the following property/value
pair:

```
:::CSS
    font-size: 18px;
```

Finally, add the following rule (after the BODY rule) to eliminate the
underlines in the hyperlinks (A tags):

```
:::CSS
a {
    text-decoration: none;
}
```

Save the file, switch back to your web browser and shift+reload. Do you
see any difference? Inspect the A and SPAN elements to see. Here's mine:

[ch3d](ch3d/) has 18px spans, with no underlines

WAIT

If you get lost at the next step, you can restart from here using:

```
cp -r ~cs204/pub/lectures/04b/ch3d ch3
```

## Step 4 Make images fit their container; Color control

Use Edit/Replace again to:

* add the `thumbnail-item` class to every LI and
* add `thumbnail-image` to every IMG.

Now, edit the CSS file to add some rules.

The following rule makes every IMG fill its container and makes it a BLOCK
element. (Those are separate operations.)

```
:::CSS
.thumbnail-image {
    width: 100%;
    display: block;
}
```

Color: Modify the background color of the page by adding the following
property/value pair to the BODY rule:

```
:::CSS
    background: rgb(149, 194, 215);
```

And add the following rule to put a border around each otter.

```
:::CSS
.thumbnail-item {
    border: 1px solid rgb(100%, 100%, 100%);
    border: 1px solid rgba(100%, 100%, 100%, 0.8);
}
```

Finally, get rid of the bullets by modifying the UL element in the HTML
file to be

```
:::HTML
<ul class="thumbnail-list">
```

and add this CSS rule:

```
:::CSS
.thumbnail-list {
    list-style: none;
}
```

Why use a UL without bullets rather than, say, DIV?  *Accessibility*  Tools will know when the list starts/ends.

Save the file, switch back to your web browser and scroll down to see the
size of the otter pictures. Now shift+reload. Do you see any difference?
Here's mine:

One more change. Add the following CSS rule, which only affects
.thumbnail-items *after* the first one:

```
:::CSS
.thumbnail-item + .thumbnail-item {
    margin-top: 10px;
}
```

Use the Chrome inspector to see the difference between the first and
second list items.

[ch3e](ch3e/) has UL w/o bullets and liquid images

WAIT

If you get lost at the next step, you can restart from here using:

```
cp -r ~cs204/pub/lectures/04b/ch3e ch3
```

## Step 5 Adding a Font

Copy a directory that contains all the font files from the class directory
to the `stylesheets` directory of your ottergram page. In VSC, switch to
your terminal window and do the following command.

```
cp -r ~cs204/pub/downloads/fonts/ ch3/ottergram/stylesheets/
```

Next, modify the HTML to add a class `logo-text` to the H1 in the HEADER:

```
:::HTML
<h1 class="logo-text">
```


Then, add the following CSS rule:

```
:::CSS
@font-face {
  font-family: 'lakeshore';
  src: url('fonts/LAKESHOR-webfont.eot');
  src: url('fonts/LAKESHOR-webfont.eot?#iefix') format('embedded-opentype'),
       url('fonts/LAKESHOR-webfont.woff') format('woff'),
       url('fonts/LAKESHOR-webfont.ttf') format('truetype'),
       url('fonts/LAKESHOR-webfont.svg#lakeshore') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

Then, add a `.logo-text` rule to be:

```
:::CSS
.logo-text {
    background: white;
    text-align: center;
    text-transform: uppercase;
    font-family: lakeshore;  /* see above */
    font-size: 37px;
}
```

Switch to Chrome and look at the header text as you shift+reload.


[ch3f](ch3f/) has the lakeshore font

WAIT

The `ch3f` result, above, is our finished website.

If you want, you can copy it to your directory like this:

```
cd ~/public_html/cs204/
cp -r ~cs204/pub/lectures/L04b/ch3f ch3-done
```

(It differs from what we did by omitting the `ottergram` folder.)


## Conclusion

In chapter 3, we learned about

* style rules
* adding classes to tags and defining rules for them
* `display:block` and `width:100%` among other properties
* the box model and margins, border and padding
* structural selectors (though they didn't use them as I would)
* fonts

Now let's switch to learning about [Flexbox in Chapter 4](ottergram4.html)
