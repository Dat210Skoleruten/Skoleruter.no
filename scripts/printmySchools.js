function showFavorites() {
    var welcomeText = document.getElementById("welcomeText");

    if (Cookies.get("mySchools") != null) {
        var output = "";
        var arr = Cookies.get("mySchools").split(",");
        var sortedArr = arr.sort();

        for (var i = 0; i < sortedArr.length; i++) {
            output += "<p class='welcome'>" + sortedArr[i] + "   har neste fridag:" + "</p>";
        }

        welcomeText.innerHTML = output;
    } else {
        document.getElementById("goToFave").style.backgroundColor = "gray";
        $("goToFave").attr("disabled", "disabled");
        $("#goToFave").attr("href", "");
        welcomeText.innerHTML = "Velkommen! Her kan du søke på barne- og ungdomskoler i Stavanger og få en oversikt over ferier og andre fridager!";
        $('#goToFave').attr('data-original-title', 'Du har ingen favoritter enda!');
    }
}
function printMySchools() {
    var elem = document.getElementById("myFavScho");
    $('myFavScho').empty;
    if (Cookies.get("mySchools") != null) {
        var theString = "";
        var arr = Cookies.get("mySchools").split(",");
        var sortedArr = arr.sort();

        for (var i = 0; i < sortedArr.length; i++) {
            theString += "<p class='favorite'>" + sortedArr[i] + "<span class='glyphicon glyphicon-remove legendRemove' aria-hidden='true' id='" + sortedArr[i] + "' onclick='removeSchool(this.id)'></span></p>";
        }
        console.log(theString);
        elem.innerHTML = theString;
    } else {
        elem.innerHTML = "Ingen skoler valgt!";
        elem.style.color = "red";
    }
}

