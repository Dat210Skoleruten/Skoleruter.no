/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

parseData();

function indexSearchList() {
    var input, filter, table, tr, td, i;
    input = $("#indexSearch");

    if (input.val() == 0) {
        $("#indexList").hide();
    } else {
        $("#indexList").show();
    }

    var fired = false
    $("body").keydown(function (e) {
        if(!fired){
            fired = true;
            if (e.keyCode == 38) { // up arrow
                console.log("up");
                
            }else if (e.keyCode == 40) { // down arrow
                console.log("down");
                if($("#selSchool").length > 0){
                    console.log("found selSchool");

                }else{
                    console.log("didnt find selSchool");
                    console.log($(".listElement"));
                    for( i = 0; i < 10; i++){
                        var tmp = $(".listElement")[i];
                        console.log(tmp);
                        console.log(tmp.style.display);
                    }
                }

            }
        }
            
    });

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
        var elem4 = $("<a href='html/kalender.html' class='listElement'>" + value.Skolenavn + "</a>");
        //the favbutton
        var elem5 = $("<td></td>");
        var elem6 = $("<div id= '" + value.Skolenavn + "'></div>");

        if (containsObject(value.Skolenavn, ArrayWSchools)) {
            var elem7 = $("<a class='addButton'><span class='glyphicon glyphicon-heart' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
        }
        else {
            var elem7 = $("<a class='addButton'><span class='glyphicon glyphicon-heart-empty' aria-hidden='true'><span hidden>" + value.Skolenavn + "<span></span></a>");
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
    
}
