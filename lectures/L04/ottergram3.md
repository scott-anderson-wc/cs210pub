# Ottergram using Flexbox

## Chapter 3 review

We'll start by exploring the solution from
[Chapter 3](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)

You can upload this [chaper 3 tarfile](../../downloads/ch03.tar) to
explore it with me:

```
curl -O http://cs.wellesley.edu/~cs210/downloads/ch03.tar
tar xf ch03.tar
```

We'll look at the effect of these CSS styles

* `.thumbnail-image` and `display:block` and `width:100%`
* `.thumbnail-item` and `border` and `list-style:none`
* `.thumbnail-item + .thumbnail-item` and `margin-top`
* `.thumbnail-list` and `padding`
* `.logo-text` and all its declarations
* fonts

What questions do you have?

## Recap of Reading

We'll visit the [reading](../../reading/ch04.html) and quickly recap the first part

* designing for mobile first
* flexbox and its CSS properties

## Quiz Questions

[Your questions](../../quizzes/quiz03.html)

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

## Flexbox Model

* main and cross axes, either row or column
* easy change to layout by changing a CSS
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

* `justify-content` with several different values: `center`, `space-between`, `space-around`
* add `flex: 1 1 auto` to .inner
* add `flex: 1 1 auto` to Barry
* combinations of those

## Get started!

You can use the Chapter 3 folder that you uploaded at the beginning of
class as a starting point for today's activities.

Here's our goal for [Chapter 4](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-04/ottergram/index.html)

Go head and start on the chapter activities.  Stop when you get to
*Absolute and Relative Positioning*; we'll do that next time.

## Extra Time?

* Add some text that will flow around the detail image, making the detail float

## Fun fact

Can you guess who these otters are named after?

[Barry, Robin, Maurice Gibb, Stayin' Alive](https://www.youtube.com/watch?v=I_izvAbhExY)
