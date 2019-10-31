# Ottergram using Flexbox

## Outline

1. SSH-keys
1. Revise VSC installation
1. Assignment 1 Partners
1. Assignment 1 starter
1. Chapter 3 recap
1. Chapter 4

## SSH-key

Any questions about the concepts?

1. Let's do it:

```
$ ssh-keygen
$ ssh-copy-id youracct@cs.wellesley.edu
```

1. test it

## Revise VSC

1. Remove your Dock Icon, if any
1. Delete the application in your `Downloads` folder
1. Use the Finder to go to Applications and launch VSC
1. Use the Extensions menu, search for remote-development and install that if you haven't
1. Add this VSC to the dock
1. Connect to `youracct@cs.wellesley.edu`

## Assignment 1 Partners

I'll bring up the Google Doc, call out pairs and you can raise your hands and find each other

Choose a host and a guest. Host should log in and use VSC.

## Assignment 1

We'll do the first few steps together:

1. Connect to `hostacct@cs`
1. Navigate to `cs204-assignments`
1. Do `mkdir a01` or use the GUI
1. Open the directory and use the GUI to make a new file (or `touch a01.html; code a01.html`)
1. Copy/paste [template](https://cs.wellesley.edu/~cs204/reading/template.html) into your file
1. Save it
1. Switch to a browser
1. Go to this [https://cs.wellesley.edu/~cs204guest/cs204-assignments/](https://cs.wellesley.edu/~cs204guest/cs204-assignments/) URL, making the appropriate change
1. The host types their username/password to get past the security barrier
1. navigate to your page
1. Test it
1. Try the validation links

That's enough for now.

## Chapter 3 review

We'll start by exploring the solution from
[Chapter 3](../../front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)

You can copy this solution and explore it with me:

```
cd ~/public_html/cs204/
cp -r ~cs204/pub/downloads/Chapter03 .
```

Open it in a web browser (change the `cs204guest` to your account): [https://cs.wellesley.edu/~cs204guest/](https://cs.wellesley.edu/~cs204guest/)

We'll look at the effect of these CSS styles using the Chrome Developer Tools.

* `.thumbnail-list` and `padding`
* `.thumbnail-image` and `display:block` and `width:100%`
* `.thumbnail-item` and `border` 
* `.thumbnail-item + .thumbnail-item` and `margin-top`
* `.logo-text` and all its declarations
* fonts

What questions do you have?

## Recap of Reading from Chapter 4

We'll visit the [reading](../../reading/ch04.html) and quickly recap the
first part 

* designing for mobile first
* flexbox and its CSS properties

## Flexbox Model

* main and cross axes, either row or column
* easy to change layout by changing a CSS rule
* can nest these as deeply as you want

## Flexbox Example

Consider the following HTML markup:

```
:::HTML
<div id="outer">
<div class="inner">Barry</div>
<div class="inner">Robin</div>
<div class="inner">Maurice</div>
<div class="inner">Leslie</div>
</div>
```

So far, pretty simple. Let's add some styles:

```
:::CSS
#outer {
    display: flex;
    flex-direction: column;
    border: 2px solid red;
}
.inner {
    border: 1px solid red;
    margin: 10px;
    padding: 5px;
    width: 100px;
}    
```

Here it is in action:
    
<div class="example">
<style scoped>
#outer1 {
    display: flex;
    flex-direction: column;
    border: 2px solid red;
}
.inner {
    border: 1px solid red;
    margin: 10px;
    padding: 5px;
    width: 100px;
}    
</style>
<div id="outer1">
<div class="inner">Barry</div>
<div class="inner">Robin</div>
<div class="inner">Maurice</div>
<div class="inner">Leslie</div>
</div>
</div>

Here it is again, with just one small change:

```
:::CSS
#outer {
    display: flex;
    flex-direction: row;  /* was column */
    border: 2px solid red;
}
```
    
<div class="example">
<style scoped>
#outer2 {
    display: flex;
    flex-direction: row;
    border: 2px solid red;
}
.inner {
    border: 1px solid red;
    margin: 10px;
    padding: 5px;
    width: 100px;
}    
</style>
<div id="outer2">
<div class="inner">Barry</div>
<div class="inner">Robin</div>
<div class="inner">Maurice</div>
<div class="inner">Leslie</div>
</div>
</div>

Let's try the following:

* `justify-content` on `outer2` with several different values: `center`, `space-between`, `space-around`
* add `flex: 1 1 auto` to .inner
* add `flex: 1 1 auto` just to Barry
* combinations of those

## Quiz Questions

[Your questions](../../quizzes/quiz03.html)

## Get started!

You can use the Chapter 3 folder that you copied at the beginning of class
as a starting point for today's activities:

```
cp -r Chapter03 work3
cd work3/ottergram
code index.html
```

Here's our goal for [Chapter 4](../../front-end-dev-resources/book-solutions/Chapter-04b/ottergram/index.html)

Let's explore the role of flexbox in that.

## Extra Time?

* Add some text that will flow around the detail image, making the detail float

## Image Scaling

Note that if you use an image on the page and scale it to, say, 10% of its
natural width, you're downloading 100 times as much data as you are really
using, taking 100 times the bandwidth and taking 100 times longer than
necessary.

Thus, it often makes sense to use an image editing program (like Photoshop
or many others) to create a variety of images at different sizes, and
download the most appropriate one.

In the example in this chapter, they use the same image files for both the
detail (big version) and the thumbnails (small version). In this case,
it's probably fine, because we'll probably view all of the big versions
and so no data will be wasted.  Still, we have to wait for all the big
versions to load when we load the website.

If we expected that only a few of the big versions would be looked at, we
should create thumbnail images and load those, and then only load the big
versions on demand.  We can do that with JavaScript.



## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Fun fact

Can you guess who these otters are named after?

[Barry, Robin, Maurice Gibb, Stayin' Alive](https://www.youtube.com/watch?v=I_izvAbhExY)
