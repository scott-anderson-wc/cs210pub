# Forms

This reading supplements Chapter 9, which introduces forms along with
Bootstrap. This reading focusses just on the forms.

Forms are an import part of any website in which the user interacts, such
as suppling information or making choices (e.g. menu options).

We will not be covering all aspects of HTML forms. We'll focus on just a
handful that are useful in this course. If you want to learn more, there's
some additional material at the end, and you're welcome to ask. The most
important kinds of inputs we'll learn are:

 <ul>

   <li>text inputs (a single line of text, such as someone's name or favorite
     color
     
   <li>textareas (longer blocks of text, such as someone's address or blog
     entry)

   <li>menus (one of a set of choices, pre-defined by the form's author,
     such as 
     
   <li>buttons, which don't so much give input as trigger behavior.

 </ul>

## The `form` tag

HTML has a dedicated tag, <code>form</code>, that is used as a container
to package data that might be sent to a web server. In this course, we
won't always be submitting the form to a web server, so we will
occasionally use form inputs without surrounding them with a `form` tag,
but mostly we will use it. Your book does in Chapter 9.

The attribute <code>method</code> of the element allows the form to either
request data from the server (<code>method="GET"</code>), or send data to
the server (<code>method="POST"</code>). However, in order for both these
operations to happen, the server needs to have some dedicated programs
(also known as scripts) that can deal with the form data. At this point,
we will not talk about how this happens (we'll postpone this discussion
for later in the semester), and only concentrate on the HTML elements that
are contained inside the form.
            
Let's see an example form, and then we'll look at the code that creates it.

<form class="example" id="pizza-form">
  <p><label>Customer name: <input name="customer"></label></p>
  <p><label>Telephone: <input type=tel name="phone"></label></p>
  <p><label>E-mail address: <input type=email name="addr"></label></p>
  <p><label>Size:
      <select name="size">
        <option value="">choose size</option>
        <option value="small">small (10-inch)</option>
        <option value="medium">medium (12-inch)</option>
        <option value="large">large (14-inch)</option>
      </select>
    </label></p>
  <p><label>Preferred delivery time:
      <input name="due" type=time min="11:00" max="21:00" step="900">
  </label></p>
  <p><label>Delivery instructions:
      <textarea rows="3" cols="30" name="instructions"></textarea>
  </label></p>
  <p><button type="submit">Submit order</button></p>
</form>
          
<p>Here's the code that creates that form:</p>
          
<pre id="pizza-form-pre" class="prettyprint lang-html"></pre>

<script>
  // Copies the form code to a PRE element. Don't use jQuery in case it is not
  // loaded yet.
  document.getElementById("pizza-form-pre").innerText = document.getElementById("pizza-form").outerHTML;
</script>

<p>As you can see, there's an outer <code>FORM</code> element that wraps
  up the form inputs.  There are input elements that correspond to
  different places where the user can enter information. Most of the
  inputs use the <code>INPUT</code> tag, but some use tags
  like <code>SELECT</code> (for a drop-down menu)
  and <code>TEXTAREA</code> (for larger blocks of text).  The general term
  is <em>control</em>.  Finally, there's a <code>BUTTON</code> input at
  the end. In a more complete example; clicking this button would send the
  form data to the web server; this one doesn't do anything.</p>

## Form Fields

<p>Let's look at the different input elements.  The following table shows
  the HTML syntax for including different HTML elements in a form. As you
  will notice, the most common element is <code>&lt;input&gt;</code>,
  which, based on the value for its attribute <code>type</code> will
  display a different kind of input. Play with the rendered version of a
  tag in every row in the table.</p>
          
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Tag Name</th>
      <th>Rendered Tag</th>
      <th>
        More Info
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;input type="text"&gt;</pre></td>
      <td><input></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">Your Age: &lt;input type="number" min="1" max="120"&gt;</pre></td>
      <td>Your Age: <input type=number min="1" max="120"></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;input type="range" min="100" max="200"&gt;</pre></td>
      <td><input type=range min="100" max="200"></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;input type="date"&gt;</pre></td>
      <td><input type=date></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;input type="time"&gt;</pre></td>
      <td><input type=time></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;button type="button"&gt;Click me&lt;/button&gt;</pre></td>
      <td><button>Click me</button></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/TAGs/tag_button.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;textarea rows="2" cols="10"&gt; You can type here&lt;/textarea&gt;</pre></td>
      <td><textarea rows="2" cols="10">You can type here</textarea></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/TAGs/tag_textarea.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
    <tr>
      <td><pre class="prettyprint lang-html">&lt;select&gt;&lt;option&gt;Black &lt;option&gt;White &lt;/select&gt;</pre></td>
      <td><select><option>Black <option>White</select></td>
      <td class="text-center">
        <a href="http://www.w3schools.com/TAGs/tag_textarea.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
  </tbody>
</table>

<p>For more information on the <code>form</code> elements and all its
   fields, consult the <a
   href="http://www.w3schools.com/tags/tag_form.asp">W3Schools page on
   forms</a>.</p>
          
<p>Let's look at some of the more important controls, and then other
  aspects of forms.</p>

## The `input` Tag
         
<p>The <code>input</code> tag is fairly straightforward, but you can
specify the type of input you are looking for by using the
<code>TYPE</code> attribute.  It has many more types, which we are not
listing here; consult <a
href="http://www.w3schools.com/tags/tag_input.asp">W3Schools page for
input</a> to see the complete list. Here are just a few:
</p>

<UL>

   <LI><code>text</code>: allows the user to type in a word
   or phrase
            
   <LI><code>password</code>: allows the user to type in a word or
   phrase, but its value isn't <em>echoed,</em> so no one can look
   over their shoulder and see it.
            
     <li><code>email</code>:  like a text type, but should look like an
     email address.  New with HTML5.

     <li><code>date</code>: for entering dates.  New with HTML5.

     <li><code>time</code>: for entering times.  New with HTML5.

</UL>

<p>Some of these types (such as time, date, number, range, etc.) were
introduced in HTML5, which means that not all browser versions are able to
support them.  For maximum portability, you should stick
to <code>type=text</code>. However, sliders like we get
with <code>type=range</code> are fun, and we'll use them sometimes.
</p>

## The `SELECT` input
         
<p>To specify a menu, from which the user can choose only one option, you
use the <code><a
href="http://www.htmlhelp.com/reference/html40/forms/select.html">SELECT</a></code>
tag inside the form. You specify the <code>NAME</code> of the input in the
<code>SELECT</code> tag, and each menu item is specified using the
<code><a
href="http://www.htmlhelp.com/reference/html40/forms/option.html">OPTION</a></code>
tag. Here's an example:
</p>

<pre class="prettyprint lang-html">
&lt;form action=""&gt;
  &lt;p&gt;Drink:  &lt;select name="beverage"&gt;
      &lt;option value=""&gt;choose one
      &lt;option value="Coke"&gt;Coca-Cola&lt;/option&gt;
      &lt;option value="Pepsi"&gt;Pepsi-Cola&lt;/option&gt;
      &lt;option&gt;Beer&lt;/option&gt;
      &lt;option&gt;Wine&lt;/option&gt;
   &lt;/select&gt;
&lt;/form&gt;
</pre>

<p>(The closing <code>&lt;/option&gt</code> tag is optional, like a closing 
<code>&lt;/p&gt</code> tag or <code>&lt;/li&gt</code> tag, but it's best
to use it.)  Any option can have a separate "value" attribute; if none is
specified, the value is the option itself.
</p>

<p>Specifying a <q>non-option</q> as the first item in the list helps to
tell whether someone has actually made a choice or just overlooked this
menu. Making the non-option have a value of the empty string helps with
validating the form, which we'll talk about later.  </p>

## The `textarea` input
         
If you want to allow your user to type in a long response, you should
define
a [`textarea`](http://www.htmlhelp.com/reference/html40/forms/textarea.html)
inside your form. This tag has attributes called <code>ROWS</code> and
<code>COLS</code> that let you specify the size of the area.

<pre class="prettyprint lang-html">
&lt;textarea name="thoughts" rows="3" cols="40"&gt;
A chicken is an egg's way of making another egg
&lt;/textarea&gt;
</pre>
         
<p>The default value is the region between the beginning and ending tag.
Typically, you want the default value to be empty, so put the
tags <em>right</em> next to each other, as in this example here:
</p>


<pre class="prettyprint lang-html">
&lt;textarea name="thoughts" rows="3" cols="40"&gt;&lt;/textarea&gt;
</pre>

Don't let even a single space creep in, or the initial value will be a
string of one space, and not the empty string.  That will affect any code
that cares about the default or original value, such as certain kinds of
validation

## Labels

<p>A form consisting of a bunch of bare boxes would be useless, so how is
  the user to know what input box means what?  That's done with
  the <code>label</code> tag.  There are two ways the label can be
  used. One option is to wrap the input in the label:
</p>

<pre class="prettyprint lang-html">
&lt;label&gt;
  Given Name
  &lt;input type="text" name="givenname"&gt;
&lt;/label&gt;
&lt;label&gt;
  Family Name
  &lt;input type="text" name="familyname"&gt;
&lt;/label&gt;
</pre>  

<p>The other is to give the input an ID and reference that ID in
  a <code>for</code> attribute of the label:</p>

<pre class="prettyprint lang-html">
&lt;label for="givenname"&gt;Given Name&lt;/label&gt;
&lt;input type="text" name="givenname" id="givenname"&gt;
&lt;label for="familyname"&gt;Family Name&lt;/label&gt;
&lt;input type="text" name="familyname" id="familyname"&gt;
</pre>  

<p>The latter is a bit more work, but it is necessary in some cases where
  the structure of the HTML doesn't allow the input to be a child of the
  label, as with a table. Your book uses this approach.</p>

## Name and Value

<p>When the form gets <em>submitted</em>, the form data gets sent to the
  server. It gets sent as a set of name/value pairs, which we can think of
  as like a little table. Here's some data as if from our pizza form:</p>
    

<p><table class="bordercells" id="name_value_pairs">
    <tbody>
      <tr><th>name</th><th>value</th></tr>
      <tr><td>customer</td><td>Hermione</td></tr>
      <tr><td>phone</td><td>555-8888</td></tr>
      <tr><td>addr</td><td>hgranger@hogwarts.ac.uk</td></tr>
      <tr><td>size</td><td>large</td></tr>
      <tr><td>due</td><td>21:00</td></tr>
      <tr><td>instructions</td><td>please deliver by owl</td></tr>
      </tbody>
  </table>
</p>

Since the fields of a form need to be processed both by Javascript code on
the client-side (by the browser) and the scripts on the web server, it is
necessary to use the different attributes of these elements to distinguish
and access them.

Consequently, the two most important attributes that we will use very
frequently are `name` and `value`
          
<ul>

<li> The <code>name</code> attribute is chosen by us, the authors of the
 form. It is used by Javascript to reference the HTML elements that use
 it, but most importantly is used by the server to distinguish between the
 different fields of the submitted form. We will discuss it again later
 when we talk about submitting the form to the server. In the meantime, it
 will be good practice to start using it everytime we create form fields.
 </li>

 <li>The <code>value</code> attribute is the information from the user. It
      can be typed in by the user, chosen from a menu, or some other
      way. </li>

</ul>
          
## Placeholder

<p>Another useful attribute for <code>input</code> controls is
  <code>placeholder</code>, which can be used to provide a hint for the
  kind of value that should go in a field.  For example, this
  HTML <code>&lt;input type="text" placeholder="Enter your
  name"&gt;</code> will be rendered like this:
</p>

<p> <input type="text" placeholder="Enter your name">.</p>
          
## Radio Buttons

<p>Radio buttons are used for a set of mutually exclusive options (like
the buttons on a car radio, to choose the station).  </p>

<p><strong>Important:</strong> Radio and checkbox input items should all
 have the same name, so that they are considered as related. Without the
 same name, radio buttons will not be mutually exclusive.</p>

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>HTML</th>
      <th>Rendered HTML</th>
      <th>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
<pre>
&lt;label for="wbur"&gt;WBUR&lt;/label&gt;
&lt;input type="radio" name="station" id="wbur"&gt;
&lt;label for="wzly"&gt;WZLY&lt;/label&gt;
&lt;input type="radio" name="station" id="wxly"&gt;
</pre>
      </td>
      <td>
      <fieldset>
      <label for="wbur">WBUR</label>
      <input type="radio" name="station" id="wbur">
      <label for="wzly">WZLY</label>
      <input type="radio" name="station" id="wxly">
      </fieldset>
      </td>
      <td class="text-center">
        <a href="http://www.w3schools.com/tags/tag_input.asp" target="_blank">
          <span class="glyphicon glyphicon-info-sign"></a>
      </td>                  
    </tr>
  </tbody>
</table>

<p>Try choosing one button and then the other</p>

## Topics we didn't cover

* fieldset and legend
* checkboxes
* size of inputs
* validation
* others??
