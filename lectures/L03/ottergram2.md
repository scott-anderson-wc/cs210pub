# Styling Ottergram

## Outline

1. Development Environment
1. Ottergram Chapter 2
1. Chrome Developer Tools
1. Recap Ottergram Chapter 3
1. Your questions from Chapter 3 (from those who could take the quiz --
most, but not all)

## Development Environment

We'll talk about our development environment and install [Visual Studio Code](../../reading/visual-studio-code.html)

We'll switch to this page about [Visual Studio Code and Catching up](../dev/)

## Ottergram Chapter 2

We'll go over what we would have built last time, were it not for the
technical difficulties.

## Chrome Developer Tools

These are really cool. We'll look at them.

## Recap of Chapter 3 Reading

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

## Get started!

Here's our [starting point for Chapter 3](../../front-end-dev-resources/book-solutions/Chapter-02/ottergram/index.html)

Here's our [goal for Chapter 3](../../front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)

Go head and start on the chapter activities.

If you didn't finish last time, you can download the starting point like
this:

```
curl -O https://cs.wellesley.edu/~cs204/front-end-dev-resources/book-solutions/Chapter-02/ottergram/index.html
```


## Assignment

Assignment 1 will be posted soon. Let's take a minute to talk about time:

* multi-tasking
* self-distraction
* breaks

## Validation

Validation is important. We'll validate this page using the icon at the bottomw.

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

At the end of each class, I'll hand out paper slips. On it, please write
your name and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Conclusion

Here is our [solution to chapter
  3](../../front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)


