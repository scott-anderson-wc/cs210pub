/* 
File: storageEx.js
Author: Eni Mustafaraj
Date: April 5, 2014
Purpose: The Javascript code for the file "storageEx.html", the webpage that
implements the "implicit bookmarking" example.

Read comments on the code for further explanations.

The strategy for attacking the problem is described in these lecture notes:
http://cs.wellesley.edu/~cs110/lectures/L17/bookEx.html
*/

// Binding the two events of the window object to the event handler 
// function names.
window.onload = onDocumentReady;
window.onunload = onLeavingPage;


/* This function is called after the DOM is created and decides how to 
   display the content in the <aside> element, depending on whether 
   the user has personalized the page or not.
*/
function onDocumentReady() {
  
  // CASE 1: User has personalized the page in a previous visit.
  if (localStorage.getItem("username") != null){
    
    // Display welcome message in the <span> element
    displayWelcome();
    
    // check if there is a value stored with the key "lastVisit" and then
    // display it in the corresponding div element
    if (localStorage.getItem("lastVisit") != null) {
      var visitDiv = document.querySelector("#lastVisit");
      visitDiv.innerHTML = "Last visit: " + localStorage.getItem("lastVisit");
      
      // Invoke the object method .scrollTo() to move the page to last position.
      window.scrollTo(0, localStorage.getItem("lastYScroll"));
    }
  }  
  // CASE 2: User has not yet personalized the page.
  else {  
    // Bind event handler for click event on <aside> element
    var aside = document.querySelector("aside");
    aside.onclick = processAsideClick;
    
    // Bind event handler to button in the <aside> element
    var button = document.querySelector("aside button");
    button.onclick = processButtonClick;
  }  
}


/* This function is called just before the page is about to be unloaded
(i.e. deleted from the computer memory because the browser tab was closed).
It gives us the chance to store permanently in the localStorage the datetime
of this moment as well as the position (Y axis) of our location in the page.
*/
function onLeavingPage(){
 
  // grab current date and time and store it
  var datetime = new Date();
  localStorage.setItem("lastVisit", datetime.toLocaleString());
  
  // grab the yscroll position and store it
  var yScroll = window.pageYOffset;
  localStorage.setItem("lastYScroll", yScroll);
  
}



// Helper function that displays the welcome message in the <span> element.
function displayWelcome(){
  
    var span = document.querySelector("aside span");
    span.innerHTML = "Welcome, " + localStorage.getItem("username");
  
}

/* Event handler function for the click event on the <aside> element.
It will use the special variable "this" inside its body.
*/
function processAsideClick() {
  
  // Check that the variable "this" is referring to the clicked element
  console.log(this);
  
  // Access the #getInfo div that has the input field and button to make
  // it visible on the page.
  var infoDiv = document.querySelector("#getInfo");
  infoDiv.style.display = "block";
  
  // we use the variable "this" to unbind the event handler, so that 
  // once we show the #getInfo div, the click event is not connected with 
  // the <aside> element anymore.
  this.onclick = null;
}


/* Event handler function for the click event on the <button> element.
It will check if there is a value, store it, display the welcome message
and made the #getInfo div disappear.
*/
function processButtonClick(){
  
  // get the name of the user from the input field
  var name = document.querySelector("aside input").value;
  
  // Trim off spaces and see if anything is left
  if (name.trim() != "") {
    
    // store a key/pair in the localStorage
    localStorage.setItem("username", name.trim());
    
    // invoke helper function to show welcome message
    displayWelcome();
    
    // Make the #getInfo div disappear
    var infoDiv = document.querySelector("#getInfo");
    infoDiv.style.display = "none";    
  }
  
  else {
    alert("Your name field cannot be empty.");
  }
  
}

