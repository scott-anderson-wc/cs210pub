# Rectangles

All the interesting stuff is in the JavaScript, so open up a JavaScript
console and look at the console.log output.

<pre id="code"></pre>

<script src="rect.js"></script>
<script>
console.log('loading the PRE');
$.get('rect.js',function (code) {
      console.log('starting');
      $("#code").text(code);
      console.log('done');
      });
</script>
