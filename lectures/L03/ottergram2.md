# Styling Ottergram

## Finishing Up

We have several items left from [last time](../L02/)

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
#ids { color: green; font-weight: bold }
</style>

## IDs

Have two purposes/roles (for now):

* uniquely specify an element for a URL [this section](#ids)
* uniquely specify an element for CSS selection:  `#ids { color: green; font-weight: bold }`


## Quiz Questions

[Your questions](../../quizzes/quiz02.html)

## Cloud 9 clarification

Make sure you have two workspaces, one public and one private.

Share both with me and with Emily Wang (`ewang10@wellesley.edu`)

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

## Assignment

Assignment 1 is posted. Let's take a minute to talk about time:

* multi-tasking
* self-distraction
* breaks

## Validation

Validation is important. Here's an example:

[Chapter 2 with Validation](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-02/ottergram/index-w-validation.html)

The [HTML Validator](https://validator.w3.org/nu/)

For assignments, you'll have to use the text input technique. I'll demo
that.

## Extra Time?

* try the bronze challenge
* add an ID to Barry and style him differently from the other otters using an ID selector
(this roughly follows the "For the More Curious" section on specificity).
* Create a hyperlink to Barry, using a URL with the *fragment* ID in it
* Add a Google Font

## End of Class

At the end of each class, I'll hand out 3x5 cards. On it, please write
your name and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Conclusion

Here is our [solution to chapter
  3](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)


