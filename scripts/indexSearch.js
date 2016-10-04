/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

function indexSearchList() {
    var input, filter, table, tr, td, i;
    input = $("#indexSearch");

    if (input.val() == 0) {
        $("#indexList").hide();
    } else {
        $("#indexList").show();
    }

    filter = input.val().toUpperCase();
    table = document.getElementById("indexList");

    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$(document).ready(function () {

});

function getIndexListItems() {
    var arrString = ""
    var ArrayWSchools = [];

    if (Cookies.get('mySchools') != null) {
        arrString = Cookies.get('mySchools');
        ArrayWSchools = arrString.split(",");
    }

    var schoolArray = getSchoolData();
    console.log(ArrayWSchools);
    console.log(ArrayWSchools.length > 0);
    $("#indexList").children().empty();
    $.each(schoolArray, function (index, value) {
        //the schools

        var elem1 = $("<tr></tr>");
        var elem2 = $("<td></td>");
        var elem3 = $("<div></div>");
        var elem4 = $("<a href='calendar.html' class='listElement'>" + value.Skolenavn + "</a>");
        //the favbutton
        var elem5 = $("<td></td>");
        var elem6 = $("<div id= '" + value.Skolenavn + "'></div>");

        if (containsObject(value.Skolenavn, ArrayWSchools)) {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-star' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
        }
        else {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-star-empty' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
        }

        elem3.click(function () {
            Cookies.set("selected", $(this).text());
        });

        //Checks if cookie is set or not, decides if it should add or delete a variable to the mySchools-cookie
        elem6.click(function () {
            checkCookie($(this).attr("id"));
        });

        elem3.append(elem4);
        elem2.append(elem3);
        elem1.append(elem2);
        elem6.append(elem7);
        elem5.append(elem6);
        elem1.append(elem5);
        $("#indexList").append(elem1);
    });
    $("#indexList").hide();
}

/*
 function getIndexListItemsPos(closest) {
 console.log("getIndexListItemsPos: ", closest)
 $("#indexList").show();
 $("#indexList").children().empty();
 var fiveClosest = closest;
 for (var i = 0; i < 5; i++) { //5 closest schools
 var elem1 = $("<tr></tr>");
 var elem2 = $("<td></td>");
 var elem3 = $("<div></div>");
 var elem4 = $("<a href='calendar.html' class='listElement'>" + fiveClosest[i][1] + "</a>");
 var elem5 = $("<td><div><a href='#' class='addButton'><span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span></a></div></td>");
 elem2.click(function () {
 Cookies.set("selected", $(this).text());
 });
 elem3.append(elem4);
 elem2.append(elem3);
 elem1.append(elem2);
 elem1.append(elem5);
 $("#indexList").append(elem1);
 }
 }*/

function getIndexListItemsPos(closest) {
    //console.log("getIndexListItemsPos: ", closest)
    var ArrayWSchools = [];

    if (Cookies.get('mySchools') != null) {
        arrString = Cookies.get('mySchools');
        ArrayWSchools = arrString.split(",");
    }

    $("#indexList").show();
    $("#indexList").children().empty();
    var fiveClosest = closest;
    $.each(fiveClosest, function (index, value) { //5 closest schools
        //console.log("print value: ", value[1]);
        var elem1 = $("<tr></tr>");
        var elem2 = $("<td></td>");
        var elem3 = $("<div></div>");
        var elem4 = $("<a href='calendar.html' class='listElement'>" + value[1] + "</a>");
        //the favbutton
        var elem5 = $("<td></td>");
        var elem6 = $("<div id= '" + value[1] + "'></div>");

        if (containsObject(value[1], ArrayWSchools)) {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-star' aria-hidden='true'><span hidden>" + value[1] + "<span></span></a>");
        }
        else {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-star-empty' aria-hidden='true'><span hidden>" + value[1] + "<span></span></a>");
        }
        elem3.click(function () {
            Cookies.set("selected", $(this).text());
        });
        //Checks if cookie is set or not, decides if it should add or delete a variable to the mySchools-cookie
        elem6.click(function () {
            checkCookie($(this).attr("id"));
        });
        elem3.append(elem4);
        elem2.append(elem3);
        elem1.append(elem2);
        elem6.append(elem7);
        elem5.append(elem6);
        elem1.append(elem5);
        $("#indexList").append(elem1);
    });
}
