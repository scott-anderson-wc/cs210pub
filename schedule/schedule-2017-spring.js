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
    ,makeLink("Overview, C9 Environment Setup", "reading/cloud9.html")
    ,makeLink("activities","lectures/L01/"));

// day 2
cal.add_info( "27Jan"
             ,makeLink("First Project, HTML and some CSS","reading/tbd.html")
             ,makeLink("activities","lectures/L02/")
             ,"BNR chapter 2"
);

// day 3
cal.add_info( "31Jan"
              ,makeLink("CSS: box model, inheritance, fonts", "reading/tbd.html")
              ,makeLink("activities","lectures/L03/")
              ,"BNR chapter 3"
);

// day 4
cal.add_info( "03Feb"
              ,makeLink("CSS: floats, flex layouts","reading/tbd.html")
              ,makeLink("activities","lectures/L04/")
             ,"BNR chapter 4"
,"chapter 4 includes relative and absolute positioning, which may mean we don't need the lecture on 07Apr. Either that, or skip that part of chapter 4."
);

// day 5
cal.add_info( "07Feb"
              ,makeLink("Mobile and Responsive; Media Queries","reading/tbd.html")
              ,makeLink("activities","lectures/L05/")
              ,"BNR chapter 5"
);

// day 6
cal.add_info( "10Feb"
              ,makeLink("JS Intro and Review","reading/path.html")
              ,makeLink("activities","lectures/L06/")
);

// day 7
cal.add_info( "14Feb"
              ,makeLink("JS Dates and Objects", "reading/tbd.html")
              ,makeLink("activities","lectures/L07/")
);

// day 8
cal.add_info("17Feb"
             ,makeLink("JS: DOM and jQuery","reading/tbd.html")
             ,makeLink("activities","lectures/L08/")
);

// day 9
cal.add_info("24Feb"
             ,makeLink("JS: Event Handlers", "reading/tbd.html")
             ,"BNR chapter 6"
             ,makeLink("activities","lectures/L09/")
);

// day 10
cal.add_info( "28Feb"
              ,makeLink("Visual Effects with CSS", "reading/tbd.html")
              ,"BNR chapter 7"
              ,"is this obviated by much of the JQ animations?"
              ,makeLink("activities","lectures/L10/")
);

// day 11
cal.add_info( "03Mar"
              ,makeLink("Closures and Namespaces", "reading/closures-and-namespaces.html")
              ,makeLink("activities","lectures/L11/")
);

// day 12
cal.add_info( "07Mar"
              ,makeLink("OOP Methods; Modules, Objects and Forms", "reading/OOP.html")
              ,"BNR chapter 8"
              ,makeLink("activities","lectures/L12/")
);

// day 13
cal.add_info("10Mar","SIGCSE/Midterm");

// day 14
cal.add_info( "14Mar"
              ,makeLink("Skeleton and Bootstrap", "reading/tbd.html")
              ,"BNR chapter 9"
              ,makeLink("activities","lectures/L14/")
);

// day 15
cal.add_info( "17Mar"
              ,makeLink("Forms and val()", "reading/tbd.html")
              ,"BNR chapter 10"
              ,makeLink("activities","lectures/L15/")
);

// day 16
cal.add_info( "21Mar"
              ,makeLink("From Data to DOM (creating checkboxes)", "reading/tbd.html")
              ,"BNR chapter 11"
              ,makeLink("activities","lectures/L16/")
);

// day 17
cal.add_info("24Mar"
             ,makeLink("Validating Forms, including Regular Expressions", "reading/tbd.html")
              ,"BNR chapter 12"
              ,makeLink("activities","lectures/L17/")
);


// day 18
cal.add_info("04Apr"
             ,makeLink("Local Storage and Ajax, GET, POST and Same Origin Policy", "reading/tbd.html")
              ,"BNR chapter 13"
              ,makeLink("activities","lectures/L18/")
);

// day 19
cal.add_info( "07Apr"
              ,makeLink("Animations and Absolute Positioning", "reading/tbd.html")
              ,makeLink("activities","lectures/L19/")
,"might need to drop this; replace with what??"
);

// day 20
cal.add_info( "11Apr"
              ,makeLink("Slideshows", "reading/tbd.html")
              ,makeLink("activities","lectures/L20/")
);

// day 21
cal.add_info( "14Apr"
              ,makeLink("Galleries and DropDowns", "reading/tbd.html")
              ,makeLink("activities","lectures/L21/")
);

// day 22
cal.add_info( "18Apr"
              ,makeLink("OOP: Classes and Inheritance", "reading/tbd.html")
);

// day 23
cal.add_info( "21Apr"
              ,makeLink("Keyboard and Mouse Event Handlers","reading/tbd.html")
);

// day 24
cal.add_info("25Apr"
             ,makeLink("JQ UI, date picker, menus, autocomplete","reading/tbd.html")
);

// day 25
cal.add_info("28Apr"
             ,makeLink("Google Maps API","reading/tbd.html")
            );


// day 26
cal.add_info( "02May"
              ,makeLink("Accessibility","reading/accessibility.html")
            );

// ================================================================
// due dates

cal.add_info(
    "09Feb",
    makeLink("A1:  personal web page", "assignments/web-page.html", "due")
    ,"would have HTML, CSS no JS. Have sections to prepare for A2."
);

cal.add_info(
    "16Feb",
    makeLink("A2:  mobile web page", "assignments/mobile-page.html", "due")
,"different layouts for different size devices, vertical for narrow, and horizontal for wide. Also should have a JS component, maybe not part of the web page, but a separate JS assignment like computing rock-paper-scissors winner");

cal.add_info(
    "23Feb",
    makeLink("A3: conditional page content/styling", "assignments/dynamic-page.html", "due")
,"Use Date object to have conditional content and styling. Have a single function, adjustPage(), that takes a date object and does everything. Page uses current date, but can be tested by supplying different values. They need to write a tester function, testAll(), as well. It should use confirm() to allow tester to continue or stop."
);

cal.add_info(
    "02Mar",
    makeLink("A4: page w/ event handlers", "assignments/event-handling.html", "due")
    ,"Page with style selector buttons, like accessibility, but choosing light/dark, font-size and so forth. Extra credit to save selections to LocalStorage?"
);

cal.add_info(
    "09Mar"
    ,makeLink("A5: page w/ JQ animations", "assignments/animations.html", "due")
    ,"Uses the visual effects transitions? Maybe something with closures instead? "
);
        
cal.add_info(
    "16Mar"
    ,makeLink("A6:  Concentration/Names", "assignments/concentration.html", "due")
    ,"I have a draft of this, based on an original by Ellen. Should be a fun game."
 );

cal.add_info(
    "23Mar"
    ,makeLink("A7:  Form Processing: Quizzes", "assignments/quizzes.html", "due")
    ,"Allow the author to create a quiz for others to take. JQ array of questions, where each question is an object with a question, an array of possible multiple-choice answers and a solution"
 );

cal.add_info(
    "06Apr" 
    ,makeLink("A8: Twenty Questions", "assignments/expandable-forms.html", "due")
    ,"I have a draft of this: build a 20-questions game that allows learning, where when the game loses, it asks for a distinguishing yes/no question and builds its tree."
);

cal.add_info(
    "13Apr" 
    ,makeLink("A9: Ajax; Ruhlman Data", "assignments/ruhlman-data.html", "due")
    ,"I've used this in CS 304; I think we can create something pretty good here"
);

cal.add_info(
    "20Apr" 
    ,makeLink("A10: Taskmin", "assignments/taskmin.html", "due")
    ,"Needs some debugging, but I think this will make a good assignment"
);

cal.add_info(
    "27Apr" 
    ,makeLink("A11: Jelly Blobs of Doom", "assignments/jelly-blobs.html", "due")
    ,"This is just about ready"
);

add_wellesley_semester_admin(cal); /* add admin dates */

cal.render();

