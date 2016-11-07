function showFavorites() {
    if (Cookies.get("mySchools") != null) {
        $("goToFave").removeClass("disableClick");
        $("#goToFave span").removeClass("glyphicon glyphicon-heart-empty");
        $("#goToFave span").addClass("glyphicon glyphicon-heart");
        $('#goToFave').css("opacity", 1);
        $('#goToFave').attr('data-original-title', 'Gå til favoritter');
        $("#goToFave").off('click', DoPrevent);

    } else {
        $('#goToFave').css("opacity", 0.4);
        $("goToFave").addClass("disableClick");
        $("#goToFave span").removeClass("glyphicon glyphicon-heart");
        $("#goToFave span").addClass("glyphicon glyphicon-heart-empty");
        $('#goToFave').attr('data-original-title', 'Du har ingen favoritter enda!');
        $("#goToFave").on('click', DoPrevent);
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

function DoPrevent(e) {
    e.preventDefault();
    e.stopPropagation();
}