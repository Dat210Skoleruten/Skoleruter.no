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
    var schoolArray = getSchoolArray();
    $("#indexList").children().empty();
    $.each(schoolArray, function (index, value) {
        var elem1 = $("<tr></tr>");
        var elem2 = $("<td></td>");
        var elem3 = $("<div></div>");
        var elem4 = $("<a href='calendar.html'>" + value.Skolenavn + "</a>");
        var elem5 = $("<a href='#' class='addButton'><span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span></a>");
        elem3.click(function(){
            Cookies.set("selected", $(this).text());
        });
        elem3.append(elem4);
        elem3.append(elem5);
        elem2.append(elem3);
        elem1.append(elem2);
        $("#indexList").append(elem1);
    });
    $("#indexList").hide();

}

function getIndexListItemsPos(closest) {
  console.log("getIndexListItemsPos: ", closest )
    $("#indexList").show();
    $("#indexList").children().empty();
    var fiveClosest = closest;
    for(var i = 0; i < 5; i++){ //5 closest schools
        var elem1 = $("<tr></tr>");
        var elem2 = $("<td></td>");
        var elem3 = $("<a href='calendar.html'>" + fiveClosest[i][1] + "</a>");
        elem2.click(function(){
            Cookies.set("selected", $(this).text());
        });
        elem2.append(elem3);
        elem1.append(elem2);
        $("#indexList").append(elem1);
    }
}
