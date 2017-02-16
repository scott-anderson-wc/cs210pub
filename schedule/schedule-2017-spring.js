var cal = wellesley_semester_calendar;
cal.setYear(2017);
cal.set_class("calendar");
cal.set_label_format("ddmmm");
cal.debug_mode_on();

add_wellesley_semester_holidays(cal);

var blank_line = ""; // adding empty item makes a blank line in calendar 

/***********************************************************************/
/*                          Lectures                                   */
/***********************************************************************/

// day 1
cal.add_info( "24Jan"
    ,makeLink("Overview, C9 Environment Setup", "../reading/cloud9.html")
    ,makeLink("<em>activities</em>","../lectures/L01/"));

// day 2
cal.add_info( "27Jan"
             ,makeLink("First Project, HTML and some CSS","../reading/ch02.html")
             ,makeLink("<em>activities</em>","../lectures/L02/")
             ,"BNR chapter 2"
);

// day 3
cal.add_info( "31Jan"
              ,makeLink("CSS: box model, inheritance, fonts", "../reading/ch03.html")
              ,makeLink("<em>activities</em>","../lectures/L03/")
              ,"BNR chapter 3"
);

// day 4
cal.add_info( "03Feb"
              ,makeLink("CSS: floats, flex layouts","../reading/ch04.html")
              ,makeLink("<em>activities</em>","../lectures/L04/")
             ,"BNR chapter 4"
//,"chapter 4 includes relative and absolute positioning, which may mean we don't need the lecture on 07Apr. Either that, or skip that part of chapter 4."
);

// day 5
cal.add_info( "07Feb"
              ,makeLink("Mobile and Responsive; Media Queries","../reading/ch05.html")
              ,makeLink("<em>activities</em>","../lectures/L05/")
              ,"BNR chapter 5"
);

// day 6
cal.add_info( "10Feb"
              ,makeLink("JS Intro and Review","../reading/path.html")
              ,makeLink("<em>activities</em>","../lectures/L06/js1.html")
);

// day 7
cal.add_info( "14Feb"
              ,makeLink("JS Dates and Objects", "../reading/methods.html")
              ,makeLink("<em>activities</em>","../lectures/L07/")
);

// day 8
cal.add_info("17Feb"
             ,makeLink("JS: DOM and jQuery","../reading/DOM.html")
             ,makeLink("<em>activities</em>","../lectures/L08/")
);

// day 9
cal.add_info("24Feb"
             ,makeLink("JS: Event Handlers", "../reading/tbd.html")
             ,"BNR chapter 6"
             ,makeLink("<em>activities</em>","../lectures/L09/")
);

// day 10
cal.add_info( "28Feb"
              ,makeLink("Visual Effects with CSS", "../reading/tbd.html")
              ,"BNR chapter 7"
//              ,"is this obviated by much of the JQ animations?"
              ,makeLink("<em>activities</em>","../lectures/L10/")
);

// day 11
cal.add_info( "03Mar"
              ,makeLink("Closures and Namespaces", "../reading/closures-and-namespaces.html")
              ,makeLink("<em>activities</em>","../lectures/L11/")
);

// day 12
cal.add_info( "07Mar"
              ,makeLink("OOP Methods; Modules, Objects and Forms", "../reading/OOP.html")
              ,"BNR chapter 8"
              ,makeLink("<em>activities</em>","../lectures/L12/")
);

// day 13
cal.add_info("10Mar","SIGCSE/Midterm");

// day 14
cal.add_info( "14Mar"
              ,makeLink("Skeleton and Bootstrap", "../reading/tbd.html")
              ,"BNR chapter 9"
              ,makeLink("<em>activities</em>","../lectures/L14/")
);

// day 15
cal.add_info( "17Mar"
              ,makeLink("Forms and val()", "../reading/tbd.html")
              ,"BNR chapter 10"
              ,makeLink("<em>activities</em>","../lectures/L15/")
);

// day 16
cal.add_info( "21Mar"
              ,makeLink("From Data to DOM (creating checkboxes)", "../reading/tbd.html")
              ,"BNR chapter 11"
              ,makeLink("<em>activities</em>","../lectures/L16/")
);

// day 17
cal.add_info("24Mar"
             ,makeLink("Validating Forms, including Regular Expressions", "../reading/tbd.html")
              ,"BNR chapter 12"
              ,makeLink("<em>activities</em>","../lectures/L17/")
);


// day 18
cal.add_info("04Apr"
             ,makeLink("Local Storage and Ajax, GET, POST and Same Origin Policy", "../reading/tbd.html")
              ,"BNR chapter 13"
              ,makeLink("<em>activities</em>","../lectures/L18/")
);

// day 19
cal.add_info( "07Apr"
              ,makeLink("Animations and Absolute Positioning", "../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L19/")
//,"might need to drop this; replace with what??"
);

// day 20
cal.add_info( "11Apr"
              ,makeLink("Slideshows", "../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L20/")
);

// day 21
cal.add_info( "14Apr"
              ,makeLink("Galleries and DropDowns", "../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L21/")
);

// day 22
cal.add_info( "18Apr"
              ,makeLink("OOP: Classes and Inheritance", "../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L22/")
);

// day 23
cal.add_info( "21Apr"
              ,makeLink("Keyboard and Mouse Event Handlers","../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L23/")
);

// day 24
cal.add_info("25Apr"
             ,makeLink("JQ UI, date picker, menus, autocomplete","../reading/tbd.html")
             ,makeLink("<em>activities</em>","../lectures/L24/")
);

// day 25
cal.add_info("28Apr"
             ,makeLink("Google Maps API","../reading/tbd.html")
             ,makeLink("<em>activities</em>","../lectures/L25/")
            );


// day 26
cal.add_info( "02May"
              ,makeLink("Accessibility","../reading/accessibility.html")
              ,makeLink("<em>activities</em>","../lectures/L26/")
            );

// ================================================================
// due dates

cal.add_info(
    "09Feb",
    makeLink("A1:  personal web page", "../assignments/a01/a01.html", "due")
//    ,"would have HTML, CSS no JS. Have sections to prepare for A2. Uses material from book chapters 2-3."
);

cal.add_info(
    "16Feb",
    makeLink("A2:  mobile web page", "../assignments/a02/a02.html", "due")
    // ,"different layouts for different size devices, vertical for narrow, and horizontal for wide. Based on book chapters 4-5. Also should have a JS component, maybe not part of the web page, but a separate JS assignment like computing rock-paper-scissors winner"
);

cal.add_info(
    "23Feb",
    makeLink("A3: conditional page content/styling", "../assignments/a03/a03.html", "due")
// ,"Use Date object to have conditional content and styling. Have a single function, adjustPage(), that takes a date object and does everything. Page uses current date, but can be tested by supplying different values. They need to write a tester function, testAll(), as well. It should use confirm() to allow tester to continue or stop. Could also implement Rock-Paper-Scissors, using the code they wrote last time, plus some button-handler code we give them."
);

cal.add_info(
    "02Mar",
    makeLink("A4: page w/ event handlers", "../assignments/event-handling.html", "due")
//     ,"Page with style selector buttons, like accessibility, but choosing light/dark, font-size and so forth. Extra credit to save selections to LocalStorage? Or maybe this is the time to play Rock-Paper-Scissors?"
);

cal.add_info(
    "09Mar"
    ,makeLink("A5: page w/ JQ animations", "../assignments/animations.html", "due")
//    ,"Uses the visual effects transitions? Maybe something with closures instead? "
);
        
cal.add_info(
    "16Mar"
    ,makeLink("A6:  Concentration/Names", "../assignments/concentration.html", "due")
//    ,"I have a draft of this, based on an original by Ellen. Should be a fun game."
 );

cal.add_info(
    "23Mar"
    ,makeLink("A7:  Form Processing: Quizzes", "../assignments/quizzes.html", "due")
//    ,"Allow the author to create a quiz for others to take. JQ array of questions, where each question is an object with a question, an array of possible multiple-choice answers and a solution"
 );

cal.add_info(
    "13Apr" 
    ,makeLink("A8: Jelly Blobs of Doom", "../assignments/jelly-blobs.html", "due")
    ,"This is just about ready"
);

cal.add_info(
    "20Apr" 
    ,makeLink("A9: Twenty Questions", "../assignments/expandable-forms.html", "due")
//    ,"I have a draft of this: build a 20-questions game that allows learning, where when the game loses, it asks for a distinguishing yes/no question and builds its tree."
);

cal.add_info(
    "27Apr" 
    ,makeLink("A10: Learning Tree", "../assignments/expandable-forms.html", "due")
//    ,"I have a draft of this: build a 20-questions game that allows learning, where when the game loses, it asks for a distinguishing yes/no question and builds its tree."
);

/*
cal.add_info(
    "08Apr" 
    ,makeLink("A8: Ajax; Ruhlman Data", "../assignments/ruhlman-data.html", "due")
    ,"I've used this in CS 304; I think we can create something pretty good here"
);
*/

cal.add_info(
    "12May" 
    ,makeLink("Project: Taskmin", "../assignments/taskmin.html", "due")
//    ,"Needs some debugging, but I think this will make a good assignment"
);


add_wellesley_semester_admin(cal); /* add admin dates */

cal.render();

