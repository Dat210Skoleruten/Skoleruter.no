/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready(function () {
    console.log("calendar document ready: 0");
    parseData(function () {
        setSchoolData(Cookies.get('selected'), Cookies.get("calendarType")); // Sets name & hyperlink on html document
        console.log("parseData and parseSecondData completed: 5");
        cal = new calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData());
        cal.buildCalendar(); // Builds calendar
        cal.buildList(); // Builds List


        $("#cal_prev").click(function () {
            cal.prevMonth();
        });

        $("#cal_next").click(function () {
            cal.nextMonth();
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 37) { // Left arrow
                cal.prevMonth();
            }
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 39) { // Right arrow
                cal.nextMonth();
            }
        });
    });
});

/**
 * [findSchool description]
 * @param  {[type]} str   [description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function findSchool(str, array) {
    var selectedSchools = [];
    if (str != undefined) {
        var strArr = str.split(",");
        for (var j = 0; j < strArr.length; j++) {
            for (var i = 0; i < array.length; i++) {

                if (array[i].Skolenavn == strArr[j]) {
                    selectedSchools.push(array[i]);
                }
            }
        }
    }

    return selectedSchools;
}

/**
 * [setSchoolData description]
 * @param {[string]} name [description]
 */
function setSchoolData(name, type) {
    if (type == 'selected') {
        if (name == "" || name == null) {
            $("#schoolName").html('Ingen skole valgt');
            alert("Ingen skole valgt");
            return
        }
        $("#schoolName").html(name);
        // setter href for hver skole når du trykker på hver av dem
        var chosenScho = findSchool(name, getSchoolData());
        var elem = document.getElementById("schoolLink");
        elem.href = chosenScho[0].Hjemmeside;
    }
}

var cal; // Creates a calendar
console.log("debugging synchronous 1.1");
