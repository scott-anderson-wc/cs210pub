/*
Filename: animals.js
Author: Eni Mustafaraj
Purpose: Demonstrate use of objects, dynamic DOM change, FOR loops.
Date: Oct 16, 2014
*/

// An array of object literals
var images = [
  {alt: "bear",      src: "images/bear.jpg",      title: "The Fishing Bear",    class: "mammal"},
  {alt: "crownfish", src: "images/crownfish.jpg", title: "Nemo's ancestor",     class: "fish"},
  {alt: "swan",      src: "images/swan.jpg",      title: "Swan's lake",         class: "bird"},
  {alt: "cheetahs",  src: "images/cheetahs.jpg",  title: "The prairie's kings", class: "mammal"},
  {alt: "swordfish", src: "images/swordfish.jpg", title: "Swords at the door",  class: "fish"},
  {alt: "pelican",   src: "images/pelican.jpg",   title: "Wings of desire",     class: "bird"},
  {alt: "kangaroo",  src: "images/kangaroo.jpg",  title: "Kangaroo and Joey",   class: "mammal"},
  {alt: "eel",       src: "images/eel.jpg",       title: "Electric Eel",        class: "fish"},
  {alt: "raven",     src: "images/raven.jpg",     title: "Raven at Wellesley",  class: "bird"}
];


// Example that students can understand
for (var index in images) {
  $("<img>").attr(images[index])      // show how to set all attributes via an object
            .appendTo("#thumbnails");
}

/* More complex way using .$each()
// jQuery each method replaces the FOR loop, but uses anonymous functions

$.each(images, function(index){
  console.log("index is: ", index);
  console.log(images[index]);
  $("<img>").attr(images[index])      // show how to set all attributes via an object
            .appendTo("#thumbnails"); // show chaining 
});

*/
 
// Scott, in Javascript one writes this.alt, 
// but in jQuery one has to write $(this).attr("alt"). In the homework, we needed to use
// $(this) to refer to the parent() method of the clicked icon.
$("#thumbnails img").click(function(){
  console.log("clicked ", $(this).attr("alt"));                         
  $("#animal img").attr({src: this.src, alt: this.alt});
  $("figcaption").text(this.title);
});

// Scott, can this be done differently, I couldn't think of something else

$("form").change(function(){
  var choice = $(":checked").val();
  if (choice == "all"){
    $("#thumbnails img").show();
  } else {
    $("#thumbnails img").hide();
    $("."+choice).show();
  }
  // remove big image
  $("#animal img").attr({src: "images/blank.png", alt: ""});
  $("figcaption").text("");
});

