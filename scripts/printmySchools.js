function printMySchools() {
    var elem = document.getElementById("myFavScho");

    if (Cookies.get("mySchools") != null) {
        var theString = "";
        var arr = Cookies.get("mySchools").split(",");

        for (var i = 0; i < arr.length; i++) {
                theString += "<p class='favorite'>" + arr[i] + "<span class='glyphicon glyphicon-remove legendRemove' onclick='calendarCookie()' aria-hidden='true'></span></p>";
        }
        console.log(theString);
        elem.innerHTML = theString;
    } else {
        elem.innerHTML = "Ingen skoler valgt!";
        elem.style.color = "red";
    }
}
