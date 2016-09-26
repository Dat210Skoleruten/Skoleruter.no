$(document).ready(function () {
    var selected = Cookies.get('selected');
    var currentDate = new Date();
    $.each(skoleRuteArray, function (index, value) {
        //schools er array med skoler som skal tegnes i kalender
        console.log(value);

        if (value["skolenavn"] == selected) {





            // skal generere kalender til calendar.html
        }
    });
});

function calendarList() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
