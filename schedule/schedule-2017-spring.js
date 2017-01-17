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
    "08Feb",
    makeLink("H1:  MySQL", "homeworks/h1-MySQL.html", "due"));

cal.add_info(
    "15Feb",
    makeLink("H2:  ER Diagrams", "homeworks/ER.html", "due"));

cal.add_info(
    "01Mar",
    makeLink("H3: Ajax", "homeworks/Ajax.html", "due"));

cal.add_info(
    "07Mar",
    makeLink("H4:  PHP", "homeworks/h4-PHP.html", "due"));

cal.add_info("15Mar"
    ,makeLink("H4 code review", "homeworks/h4-review.html", "due")
);
        
cal.add_info(
    "22Mar"
    ,makeLink("H5:  Python/Flask 1", "homeworks/h5-Python.html", "due")
 );

/*
cal.add_info(
    "09Nov",
    makeLink("H5 code review", "homeworks/h5-review.html", "due"));
*/

cal.add_info("12Apr" ,makeLink("H6: Flask", "homeworks/hwk6-Flask.html", "due"));

cal.add_info(
    "19Apr",
    "exam distributed","");

cal.add_info(
    "25Apr",
    fakeLink("exam due","","due"));

// ================================================================
// project
        
cal.add_info(
      "22Feb", makeLink("P0: Ideas", "project/proposals.html#ideas", "project"));
                        
   cal.add_info(
       "10Mar", makeLink("P1: Proposal", "project/proposals.html#proposal", "project"));
                        
   cal.add_info(
       "05Apr", makeLink("P2: Design and Plan", "project/p2-design-and-plan.html", "project"));
                        
   cal.add_info(
      "19Apr", makeLink("P3: Draft Version", "project/p3-draft.html", "project"));
                        
   cal.add_info(
      "05May", makeLink("P4: Alpha Version", "project/p4-alpha.html","project"));

   cal.add_info(
       "12May",
       makeLink("P5: Beta Version","project/p5-beta.html","project"),
       makeLink("P6: Final Paper","project/p6-paper.html","project")
   );

// ================================================================
// extras        
cal.add_info(
        "19May"
        ,makeLink("Java Database Connection (JDBC)", "lectures/11-JDBC/")
        ,makeLink("Java Servlets", "lectures/12-Java-Servlets/")
     ,makeLink("CAS", "lectures/CAS/")
     ,makeLink("XML", "lectures/19-XML/19.shtml")
     ,makeLink("Procedures and Triggers", "lectures/23-Procedures-and-Triggers/")
//     ,makeLink("OpenID", "lectures/OpenID/")
     ,"<p>and maybe..."


);

add_wellesley_semester_admin(cal); /* add admin dates */

cal.render();

