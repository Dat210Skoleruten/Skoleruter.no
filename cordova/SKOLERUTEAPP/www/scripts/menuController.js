$(document).ready(function () {
    var children = $("#mySidenav").children().toArray();
    //$(children[2]).attr("id", "MenuCalendar");
    $(children[2]).attr("id", "MenuSchools");

    /*
    $("#MenuCalendar").click(function () {
        Cookies.set("calendarType", "selected");
    });
    */

    $("#MenuSchools").click(function () {
        Cookies.set("calendarType", "mySchools");
    });
});