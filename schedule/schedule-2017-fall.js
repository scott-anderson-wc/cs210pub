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
cal.add_info( "05Sep"
    ,makeLink("Overview, C9 Environment Setup", "../reading/cloud9.html")
    ,makeLink("<em>activities</em>","../lectures/L01/"));

// day 2
cal.add_info( "08Sep"
             ,makeLink("First Project, HTML and some CSS","../reading/ch02.html")
             ,makeLink("<em>activities</em>","../lectures/L02/")
             ,"BNR chapter 2"
);

// day 3
cal.add_info( "12Sep"
              ,makeLink("CSS: box model, inheritance, fonts", "../reading/ch03.html")
              ,makeLink("<em>activities</em>","../lectures/L03/")
              ,"BNR chapter 3"
);

// day 4
cal.add_info( "15Sep"
              ,makeLink("CSS: floats, flex layouts","../reading/ch04.html")
              ,makeLink("<em>activities</em>","../lectures/L04/")
             ,"BNR chapter 4"
//,"chapter 4 includes relative and absolute positioning, which may mean we don't need the lecture on 07Apr. Either that, or skip that part of chapter 4."
);

// day 5
cal.add_info( "19Sep"
              ,makeLink("Mobile and Responsive; Media Queries","../reading/ch05.html")
              ,makeLink("<em>activities</em>","../lectures/L05/")
              ,"BNR chapter 5"
);

// day 6
cal.add_info( "22Sep"
              ,makeLink("JS Intro and Review","../reading/path.html")
              ,makeLink("<em>activities</em>","../lectures/L06/js1.html")
);

// day 7
cal.add_info( "26Sep"
              ,makeLink("JS Dates and Objects", "../reading/methods.html")
              ,makeLink("<em>activities</em>","../lectures/L07/")
);

// day 8
cal.add_info("29Sep"
             ,makeLink("JS: DOM and jQuery","../reading/DOM.html")
             ,makeLink("<em>activities</em>","../lectures/L08/")
);

// day 9
cal.add_info("03Oct"
             ,makeLink("JS: Event Handlers", "../reading/ch06.html")
             ,"BNR chapter 6"
             ,makeLink("<em>activities</em>","../lectures/L09/")
);

// day 10
cal.add_info( "06Oct"
              ,makeLink("Visual Effects with CSS", "../reading/ch07.html")
              ,"BNR chapter 7"
//              ,"is this obviated by much of the JQ animations?"
              ,makeLink("<em>activities</em>","../lectures/L10/")
);

// day 11
cal.add_info( "13Oct"
              ,makeLink("Closures and Namespaces", "../reading/closures-and-namespaces.html")
              ,"BNR chapter 8, through page 173"
              ,makeLink("<em>activities</em>","../lectures/L11/")
);

// day 12 (new! inserted. All subsequent got renumbered)
cal.add_info( "17Oct"
              ,makeLink("more on Closures and Namespaces", "../reading/namespaces2.html")
              ,"BNR chapter 8, through page 173"
              ,makeLink("<em>activities</em>","../lectures/L12/")
);

// day 13
cal.add_info( "20Oct"
              ,"Review for Midterm"
              ,makeLink("<em>activities</em>","../lectures/L13/")
);

// day 14
cal.add_info("24Oct"
             ,fakeLink("Midterm","","due")
             ,makeLink("<em>activities</em>","../lectures/L14/")
);

// day 15
cal.add_info( "27Oct"
              ,makeLink("OOP Objects and Methods", "../reading/OOP.html")
              ,makeLink("Forms", "../reading/forms.html")
              ,"BNR chapter 8, rest"
              ,"BNR chapter 9"
              ,makeLink("<em>activities</em>","../lectures/L15/")
);

// day 16
cal.add_info( "03Nov"
              ,makeLink("Forms", "../reading/forms-and-js.html")
              // need to add .val()?
              ,"BNR chapter 10"
              ,makeLink("<em>activities</em>","../lectures/L16/")
);

// day 17
cal.add_info( "07Nov"
              ,"Catchup; No new reading"
              ,makeLink("<em>activities</em>","../lectures/L17/")
);

// day 18
cal.add_info("10Nov"
              ,makeLink("From Data to DOM", "../reading/ch11.html")
              ,"BNR chapter 11"
              ,makeLink("<em>activities</em>","../lectures/L18/")
);


// day 19
cal.add_info("14Nov"
             ,makeLink("Grid Systems", "../reading/grids.html")
             // Skeleton and Bootstrap, too
             ,"BNR chapter 9"
             ,makeLink("<em>activities</em>","../lectures/L19/")
);

/*
// dropping this
cal.add_info( "11Apr"
              ,makeLink("Animations and Absolute Positioning", "../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L19/")
//,"might need to drop this; replace with what??"
);
*/

// day 20
cal.add_info( "17Nov"
             ,makeLink("Validating Forms, including Regular Expressions", "../reading/form-validation.html")
              ,"BNR chapter 12"
              ,makeLink("<em>activities</em>","../lectures/L20/")
);

// day 21
cal.add_info( "21Nov"
              ,makeLink("Ajax and localStorage", "../reading/ajax.html")
              ,"BNR chapter 13"
              ,makeLink("<em>activities</em>","../lectures/L21/")
// Eventually, add same origin policy?
);

/*
 * dropping this
              ,makeLink("Keyboard and Mouse Event Handlers","../reading/tbd.html")
              ,makeLink("<em>activities</em>","../lectures/L23/")
 */


// day 22
cal.add_info( "28Nov"
              ,makeLink("OOP: Classes and Inheritance", "../reading/OOP-inheritance.html")
              ,makeLink("<em>activities</em>","../lectures/L22/")
);

// day 23
cal.add_info( "01Dec"
              ,makeLink("Galleries and DropDowns", "../reading/galleries-and-dropdowns.html")
              ,makeLink("<em>activities</em>","../lectures/L23/")
);

// day 24
cal.add_info("05Dec"
             ,makeLink("JQuery UI","../reading/jqueryui.html")
             ,makeLink("<em>activities</em>","../lectures/L24/")
);

// day 25
cal.add_info("08Dec"
             ,makeLink("Google Maps API","../reading/google-maps.html")
             ,makeLink("<em>activities</em>","../lectures/L25/")
            );


// day 26
cal.add_info( "12Dec"
              ,makeLink("Accessibility","../reading/accessibility.html")
              ,makeLink("<em>activities</em>","../lectures/L26/")
            );

// ================================================================
// due dates

cal.add_info(
    "20Sep",
    makeLink("A1:  personal web page", "../assignments/a01/a01.html", "due")
//    ,"would have HTML, CSS no JS. Have sections to prepare for A2. Uses material from book chapters 2-3."
);

cal.add_info(
    "27Sep",
    makeLink("A2:  mobile web page", "../assignments/a02/a02.html", "due")
    // ,"different layouts for different size devices, vertical for narrow, and horizontal for wide. Based on book chapters 4-5. Also should have a JS component, maybe not part of the web page, but a separate JS assignment like computing rock-paper-scissors winner"
);

cal.add_info(
    "04Oct",
    makeLink("A3: conditional page content/styling", "../assignments/a03/a03.html", "due")
// ,"Use Date object to have conditional content and styling. Have a single function, adjustPage(), that takes a date object and does everything. Page uses current date, but can be tested by supplying different values. They need to write a tester function, testAll(), as well. It should use confirm() to allow tester to continue or stop. Could also implement Rock-Paper-Scissors, using the code they wrote last time, plus some button-handler code we give them."
);

cal.add_info(
    "18Oct",
    makeLink("A4: page w/ event handlers", "../assignments/a04/rps.html", "due")
);

cal.add_info(
    "01Nov"
    ,makeLink("A5: page w/ JQ animations", "../assignments/a05/tile_game.html", "due")
);
        
cal.add_info(
    "08Nov"
    ,makeLink("A6:  Concentration", "../assignments/a06/concentration.html", "due")
 );

cal.add_info(
    "15Nov"
    ,makeLink("A7: Signup", "../assignments/a07/signup.html", "due")
    );

cal.add_info(
    "21Nov"
    ,makeLink("A8:  Quizzes", "../assignments/a08/quiz.html", "due")
//    ,"Allow the author to create a quiz for others to take. JQ array of questions, where each question is an object with a question, an array of possible multiple-choice answers and a solution"
 );

cal.add_info(
    "29Nov" 
    ,makeLink("A9: Twenty Questions", "../assignments/a09/20questions.html", "due")
//    ,"I have a draft of this: build a static 20-questions game
);

cal.add_info(
    "06Dec" 
    ,makeLink("A10: Jelly Blobs of Doom", "../assignments/a10/jBlobs.html", "due")
);

cal.add_info(
    "13Dec" 
    ,makeLink("A11: Learning Tree", "../assignments/a11/20-learning.html", "due")
);

/*
cal.add_info(
    "08Apr" 
    ,makeLink("A8: Ajax; Ruhlman Data", "../assignments/ruhlman-data.html", "due")
    ,"I've used this in CS 304; I think we can create something pretty good here"
);
*/

cal.add_info(
    "21Dec" 
    ,makeLink("Project: Taskmin; due at 4pm", "../assignments/project/taskmin.html", "due")
//    ,"Needs some debugging, but I think this will make a good assignment"
);


add_wellesley_semester_admin(cal); /* add admin dates */

cal.render();

