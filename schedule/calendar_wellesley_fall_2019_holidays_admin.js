/*
 *   Holidays and Administrative deadlines for Wellesley College
 *
 *   For future use, one may as well put in all the dates for the entire year.
 *   Only entries within the calendar's date interval will get rendered.
 */

var wellesley_semester_start = new Date(2019, 9-1, 2); // month is 0-11
var wellesley_semester_end   = new Date(2019, 12-1, 20);

function add_wellesley_semester_holidays(cal)
{
        cal.add_holidays("14Oct", "Fall Break",
                         "15Oct", "Fall Break",
                         "29Oct", "Tanner",
                         "27Nov", "Thanksgiving Break",
                         "28Nov", "Thanksgiving Break",
                         "29Nov", "Thanksgiving Break"
                         );
}

function add_wellesley_semester_admin(cal)
{
        var blank_line = ""; /* causes add_info() to make blank line */

        cal.add_info("11Sep", blank_line, admin_note("Add period ends"));
        cal.add_info("27Sep", blank_line, admin_note("Drop deadline; Credit/Non-credit ends"));
        // cal.add_info("03Nov", blank_line, admin_note("mid-semester warnings"), blank_line);
        cal.add_info("10Dec", blank_line, admin_note("Classes End"));
        cal.add_info("11Dec", blank_line, admin_note("Reading period"), blank_line);
        cal.add_info("13Dec", blank_line, admin_note("Reading period ends"), blank_line);
        cal.add_info("16Dec", blank_line, admin_note("Final exams begin"));
        cal.add_info("20Dec", blank_line, admin_note("Final exams end at 4pm"));
}

/* If someone wants a pre-made calendar that they can just add their
 * course items to, here it is.  The administrative dates are NOT
 * included here, because a) my intuition is that some people may not
 * want the administrative dates and b) if they do want them, they
 * will likely want them at the bottom of each calendar day (after any
 * course content).  So, they can call the above function if they want.
 */

var wellesley_semester_calendar = new Calendar(wellesley_semester_start,
                                               wellesley_semester_end);

