# Styling Ottergram

## Recap of Reading

We'll visit the [reading](../../reading/ch03.html) and quickly recap

* normalize.css
* CSS rules
* box model
* Selectors: tags, classes, ID
* IDs in URLs
* Attribute selectors
* Structural selectors
* Style inheritance
* Colors
* Transparency
* Fonts

## Box Model

We'll explore that using the Dev Tools and this page:

* set the margins, padding and width of the header for this section
* set just the `border-top` or `margin-top`
* set the background color

We'll look at inheritance as well, using this list:

* set a border, margins and font-size for the UL. What's inherited?
* set a border and margins and font-size for the LI. What's overridden?
* set a background color for the UL

## Structural Selectors

We'll draw a sample tree for a small bit of HTML, like this, and talk about structural selectors:

```
:::HTML
<div class="lorem">
    <p>Cras id purus...</p>
    <ul>
        <li>lorem ipsum <span>dolor</span> sit amet</li>
        <li>consectetur adipsixing <span>elit</span> donec</li>
        <li>eleifend nibh at <span>malesuada</span> condimentum
                <ul>
                     <li>suspendiss</li>
                     <li>elementum</li>
                     <li>feugiat</li>
                </ul>
        <li>
    </ul>
</div>
```

What is selected by the following?

* `.lorem`
* `.lorem ul`
* `.lorem li`
* `.lorem > li`
* `.lorem > ul`
* `p ~ ul`
* `li + li`

<style>
#ids { color: green; }
</style>

## IDs

Have two purposes/roles (for now):

* uniquely specify an element for a URL [this section](#ids)
* uniquely specify an element for CSS selection:  `#ids { color: green; }`


## Quiz Questions

[Your questions](../../quizzes/quiz02.html)

## Cloud 9 clarification

Make sure you have two workspaces, one public and one private.

Share both with me and with Grace Hu (`ghu@wellesley.edu`)

## Cloud 9 startup

Remember, here's our standard practice for the semester:

* Pair up with another student at one of the college Macs. 
* Introduce yourself. Each class, I'd like you to pair up with a different person.
Eventually, you'll meet everyone.
* It doesn't matter who logs in. Over the course of the semester, you should aim
to be the host and guest an equal number of times. You should take turns typing. There is evidence that shows that doing is better than watching.  Discuss 
* That person should login to their Cloud 9 account and
* start their *public* workspace
* make sure that public workspace is shared with me and with the tutor
* When you create or edit files, take a moment to put *both* names in the file. This is so that we can see who is here and working on stuff (for class participation credit).

## Get started!

Here's our goal for [Chapter 3](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)

Go head and start on the chapter activities.

## Extra Time?

* try the bronze challenge
* add an ID to Barry and style him differently from the other otters using an ID selector
(this roughly follows the "For the More Curious" section on specificity).
* Create a hyperlink to Barry, using a URL with the *fragment* ID in it
* Add a Google Font

