/*
 *   Holidays and Administrative deadlines for Wellesley College
 *
 *   For future use, one may as well put in all the dates for the entire year.
 *   Only entries within the calendar's date interval will get rendered.
 */

var wellesley_semester_start = new Date(2019, 0, 28); // month is 0-11
var wellesley_semester_end   = new Date(2019, 4, 24);

function add_wellesley_semester_holidays(cal)
{
        cal.add_holidays("18Feb", "President's Day",
                         "19Feb", "Monday Schedule",
                         "21Mar", "Spring Break",
                         "22Mar", "Spring Break",
                         "25Mar", "Spring Break",
                         "26Mar", "Spring Break",
                         "27Mar", "Spring Break",
                         "28Mar", "Spring Break",
                         "29Mar", "Spring Break",
                         "15Apr", "Patriot's Day",
                         "01May", "Ruhlman");
}

function add_wellesley_semester_admin(cal)
{
        var blank_line = ""; /* causes add_info() to make blank line */

        cal.add_info("08Feb", blank_line, admin_note("Add period ends"));
        cal.add_info("22Feb", blank_line, admin_note("Drop deadline; Credit/Non-credit ends"));
        cal.add_info("16Apr", blank_line, admin_note("Registration for Fall begins"), blank_line);
        // cal.add_info("20Feb", blank_line, admin_note("Monday Schedule"));
        cal.add_info("10May", blank_line, admin_note("Classes End"));
        cal.add_info("13May", blank_line, admin_note("Reading period"), blank_line);
        cal.add_info("14May", blank_line, admin_note("Reading period ends"), blank_line);
        cal.add_info("15May", blank_line, admin_note("Final exams begin"));
        cal.add_info("21May", blank_line, admin_note("Final exams end at 4pm"));
        cal.add_info("24May", blank_line, admin_note("Senior grades due at noon"));
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

