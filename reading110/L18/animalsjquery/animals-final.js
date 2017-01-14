/*
Filename: animals.js
Author: Eni Mustafaraj
Purpose: Demonstrate use of objects, dynamic DOM change, FOR loops.
Date: Oct 16, 2014
*/

// An array of object literals
var images = [
  {alt: "bear",      src: "images/bear.jpg",      title: "The Fishing Bear",    class: "mammal"},
  {alt: "clownfish", src: "images/clownfish.jpg", title: "Nemo's ancestor",     class: "fish"},
  {alt: "swan",      src: "images/swan.jpg",      title: "Swan's lake",         class: "bird"},
  {alt: "cheetahs",  src: "images/cheetahs.jpg",  title: "The prairie's kings", class: "mammal"},
  {alt: "swordfish", src: "images/swordfish.jpg", title: "Swords at the door",  class: "fish"},
  {alt: "pelican",   src: "images/pelican.jpg",   title: "Wings of desire",     class: "bird"},
  {alt: "kangaroo",  src: "images/kangaroo.jpg",  title: "Kangaroo and Joey",   class: "mammal"},
  {alt: "eel",       src: "images/eel.jpg",       title: "Electric Eel",        class: "fish"},
  {alt: "raven",     src: "images/raven.jpg",     title: "Raven at Wellesley",  class: "bird"}
];


// Function that will display the thumbnails in the HTML page
function add_thumbnails(){

  var div = document.querySelector("#thumbnails"); // get container for images
  // FOR loop to create each image element one by one
  for (var i=0; i<images.length; i++){
    var info = images[i];
    var img = document.createElement("img");
    img.setAttribute("src",info.src);
    img.setAttribute("alt",info.alt);
    img.setAttribute("title",info.title);
    img.setAttribute("class",info.class);

    div.appendChild(img); // append the <img> element to the parent div
    img.onclick = showImage; // add event handler method
  }
}

/* event handler called when clicking a thumbnail */
function showImage() {
  // the special variable "this", which gives access to the target element
  console.log(this.src);

  // Select the <img> within <figure> and set its src and alt attributes
  document.querySelector("#animal img").setAttribute("src", this.src);
  document.querySelector("#animal img").setAttribute("alt", this.alt);

  // Set figcaption text
  document.querySelector("#animal figcaption").innerHTML = this.title;
}

/* event handler called when the event change on the radio boxes is triggered*/
function displayFiltered() {
  var choice = document.querySelector("[name='choice']:checked").value;
  console.log("current radiobox checked is: "+ choice);
  
  // notice querySelectorAll. It returns an array of all images.
  var imgEls = document.querySelectorAll("#thumbnails img");
  
  for (var i=0; i < imgEls.length; i++){
    if (choice == 'all') {
      imgEls[i].style.display = "initial";
    }else if (imgEls[i].getAttribute("class") == choice){
      imgEls[i].style.display = "initial";
    }else {
      imgEls[i].style.display = "none"
    }
  }
  
  // Clean up the big image, to not create confusion
  document.querySelector("#animal img").setAttribute("src", "images/blank.png");
  document.querySelector("#animal figcaption").innerHTML = "";
}   

// Attach the event handler to the event "change"
document.addEventListener("change", displayFiltered);
