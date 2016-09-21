function navSearchList() {
    var input, filter, table, tr, td, i;
    input = $("#navSearch");
    if (input.val() == 0) {
        $("#navList").hide();
    } else {
        $("#navList").show();
    }
    filter = input.val().toUpperCase();
    table = document.getElementById("navList");
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

// $("#indexSearch").(getListItems());

function getNavListItems() {
    var schoolArray = getSchoolArray();
    if ($("#navList").children().length == 0) {
        $.each(schoolArray, function (index, value) {
            $("#navList").append("<tr><td><a href='calendar.html'>" + value.Skolenavn + "</a></td></tr>");
        });
        $("#navList").hide();
    }

}
