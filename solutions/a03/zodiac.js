// JavaScript File

/* global $ */

var test_dates = ["8/22/2017",  // leo last day
                "8/23/2017",    // virgo first day
                "9/19/1979",    // Hermione's birthday, a virgo
                "9/31/2017",    // no such day, but a libra
                "10/23/1935",   // scorpio and my father's birthday
                "11/23/2017",   // thanksgiving this year, sagittarius
                "12/31/2017",   // new year's eve, capricorn
                "1/1/2017",     // new year's day, capricorn
                "2/14/2017",    // valentine's day, aquarius, a Tuesday
                "2/29/2016",    // leap day pisces
                "4/1/2017",     // april fool's day, aries
                "4/23/1616",    // Shakespeare's deathday, taurus
                "5/31/2002",    // Ross's birthday, gemini
                "6/22/2017",    // midsummer's day, cancer
            ];

function makeDate(string) {
    return new Date(string);
}

function test_makeDate() {
    console.log("testing makeDate");
    test_dates.forEach(function (s) { console.log(s+" => "+makeDate(s)); });
}

test_makeDate();

function formatDate(date) {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var name = dayNames[date.getDay()];
    var mon = date.getMonth()+1;
    return name+", "+mon+"/"+date.getDate()+"/"+date.getFullYear();
}

function test_formatDate() {
    console.log("testing formatDate");
    test_dates.forEach(function (s) { console.log(s+" => "+formatDate(makeDate(s))); });
}

test_formatDate();

function zodiacSign(date) {
    var m = date.getMonth()+1;
    var d = date.getDate();
    // there are many ways this could be done. Here's a somewhat fancy way:
    // sm is start month, sd is start date
    // em is end month, ed is end date
    // all months are 1-12
    var signs = [
        {name: "aries",     sm: 3, sd: 21, em: 4, ed: 19},
        {name: "taurus",    sm: 4, sd: 20, em: 5, ed: 20},
        {name: "gemini",    sm: 5, sd: 21, em: 6, ed: 20},
        {name: "cancer",    sm: 6, sd: 20, em: 7, ed: 22},
        {name: "leo",       sm: 7, sd: 23, em: 8, ed: 22},
        {name: "virgo",     sm: 8, sd: 23, em: 9, ed: 22},
        {name: "libra",     sm: 9, sd: 23, em: 10, ed: 22},
        {name: "scorpio",   sm: 10, sd: 23, em: 11, ed: 21},
        {name: "sagittarius", sm: 11, sd: 22, em: 12, ed: 21},
        {name: "capricorn", sm: 12, sd: 22, em: 1, ed: 19},
        {name: "aquarius",  sm: 1, sd: 20, em: 2, ed: 18},
        {name: "pisces",    sm: 2, sd: 19, em: 3, ed: 20},
    ];
    var sign_name;
    // this is actually somewhat inefficient, since we can't easily 
    // exit early, which we could do if it were a loop.
    signs.forEach(function (sign) {
        if( m == sign.sm && d >= sign.sd ||
            m == sign.em && d <= sign.ed ) {
                sign_name = sign.name;
            }
    });
    if( sign_name == null) {
        throw new Error("Couldn't find sign for this date: "+date);
    } else {
        return sign_name;
    }
}

function test_zodiacSign() {
    console.log("testing zodiacSign");
    test_dates.forEach(function (s) { console.log(s+" => "+zodiacSign(makeDate(s))); });
}

test_zodiacSign();

function randomElt(elts) {
    var index = Math.floor(elts.length*Math.random());
    return elts[index];
}

function randomDate() {
    return makeDate(randomElt(test_dates));
}

function updatePage() {
    var today = randomDate();
    $("#today").text(formatDate(today));
    var zsign = zodiacSign(today);
    $("#sign").text(zsign);
    $("#zodiac_image").attr('src',"zodiac/"+zsign+".png").attr('alt',zsign);
}

$("#updateButton").click(updatePage);

updatePage();  // this happens on load


