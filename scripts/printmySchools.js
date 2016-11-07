function showFavorites() {
    if (Cookies.get("mySchools") != null) {
        $("goToFave").removeClass("disableClick");
        $('#goToFave').css("backgroundColor", "#EEEEEE");
        $('#goToFave').attr('data-original-title', 'Gå til favoritter');
        $("#goToFave").off('click', DoPrevent);

    } else {
        $('#goToFave').css("backgroundColor", "gray");
        $("goToFave").addClass("disableClick");
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