<div>
<style id="style1" scoped>
    .questions, .suggs {
         border: 1px solid red;
    }

    @media all and (min-width: 1024px) {
        .questions, .suggs {
            display: inline-block;
            width: 45%;
            vertical-align: top;
        }
    }
</style>    

<ol class="questions">

<li>not related to reading, but can we go over how to appropriately style
images so they don't get so distorted with adaptive layouts?

<p>Great question!  In a nutshell:
<blockquote>
        <p>Don't set both <code>width</code> and <code>height</code>. The
        missing one will be calculated from the supplied one to
        preserve <em>aspect ratio</em>
        <p>You should probably always set at least one of them, rather
        than allow an image to be its <q>natural size</q>
</blockquote>

<li>Run through an example in which we convert code for a desktop webpage
to mobile (viewports practice)
    <p>Actually, we want to do the opposite: convert a mobile page into a
    desktop page.  We'll do it with this page:

<pre id="style1dst"></pre>
<script>
    document.getElementById('style1dst').innerHTML = document.getElementById('style1').textContent;
</script>

<li>Right now I think I am good with all the topics.

</ol>

<ul class="suggs">

<li> [understanding media queries](https://www.sitepoint.com/web-foundations/understanding-media-queries/)

</ul>    
</div>

