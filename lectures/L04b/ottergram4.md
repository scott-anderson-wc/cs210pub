# Ottergram Chapter 4

## Recap of Reading from Chapter 4

We'll visit the [reading](../../reading/ch04.html) and quickly recap the
first part 

* designing for mobile first
* flexbox and its CSS properties

## Flexbox Model

* parent (`display:flex`) and children (flex items)
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

Let's try the following, using the Chrome Developer tools:

* `justify-content` on `outer2` with several different values: `center`, `space-between`, `space-around`
* add `flex: 1 1 auto` to `.inner` (allows all four to grow)
* add `flex: 0 1 auto` to `.inner` (does not allow them to grow; the default)
* add `flex: 1 1 auto` just to the first `div.inner` (Barry)

## Chapter 4: nested flexboxes

Here is the result of [Chapter 4](../../front-end-dev-resources/book-solutions/Chapter-04/ottergram/index.html)

Here's a high-level outline:

<pre>
BODY display:flex
     flex-direction:column
    HEADER.main-header
         flex: 0 1 auto
    MAIN.main-content
         display:flex
         flex: 1 1 auto
         flex-direction: column
        UL.thumbnail-list
             display:flex
             flex: 0 1 auto; 
            LI.thumbnail-item 
            LI.thumbnail-item 
            LI.thumbnail-item 
            LI.thumbnail-item 
        DIV.detail-image-container
            display:flex
            flex: 1 1 auto
           DIV.detail-image-frame
               IMG.detail-image
               SPAN.detail-image-title
</pre>

Let's explore the role of flexbox in that using the Chrome developer.

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

## Doing it yourself

If you want to do Chapter 4 you can copy the Chapter 3 folder that we
created today.

```
cp -r ch3-done work4
code work/index.html
```

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
