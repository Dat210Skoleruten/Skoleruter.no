/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
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
            for (var x = 0; x < filter.length; x++) {
                if (td.firstElementChild.firstElementChild.innerHTML.toUpperCase().substring(0, x + 1) == filter) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function getIndexListItems(closest) {
    var arrString = "";
    var ArrayWSchools = [];

    if (Cookies.get('mySchools') != null) {
        arrString = Cookies.get('mySchools').split(",");
        ArrayWSchools = arrString.sort();
    }

    if (closest == 'List') {
        var schoolArray = getSchoolData();

        $("#indexList").children().empty();
        schoolArray = schoolArray.sort(function (a, b) {
            if (a.Skolenavn < b.Skolenavn) return -1;
            if (a.Skolenavn > b.Skolenavn) return 1;
            return 0;
        })
    } else {
        $("#indexList").show();
        $("#indexList").children().empty();
        var schoolArray = closest;
    }

    $.each(schoolArray, function (index, value) { //5 closest schools

        var elem1 = $("<tr></tr>");
        var elem2 = $("<td></td>");
        var elem3 = $("<div></div>");
        var elem4 = $("<a href='html/calendar.html' class='listElement'>" + value.Skolenavn + "</a>");
        //the favbutton
        var elem5 = $("<td></td>");
        var elem6 = $("<div id= '" + value.Skolenavn + "'></div>");

        if (containsObject(value.Skolenavn, ArrayWSchools)) {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-heart' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
        }
        else {
            var elem7 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-heart-empty' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
        }
        elem3.click(function () {
            Cookies.set("calendarType", "selected");
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

    if (closest == 'List') {
        $("#indexList").hide();
    }
    testHover();
    
    //Check if mySchools Cookes is set and go to schools.html

//     if( Cookes.get("mySchools") != null && Cookes.get("visiting") == null){
//     Cookes.set("visiting", "true");
//     window.location.href = 'html/calendar.html';
// }
}
