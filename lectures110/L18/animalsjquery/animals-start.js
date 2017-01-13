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


/* function that will display the thumbnails in the HTML page */
function add_thumbnails(){


}



/* event handler called when clicking a thumbnail */
function showImage(){
 
}



/* event handler called when the event change on the radio boxes is triggered */
function displayFiltered(){
 
}   

// Attach the event handler to the event "change"
document.addEventListener("change", displayFiltered);
