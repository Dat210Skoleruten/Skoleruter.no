function showFavorites() {
    console.log("showfavourites running");
    if($("#position").hasClass("isInactive")){
        $("#position").tooltip('enable');
        console.log("gps tooltip enable");
    }else{
        $("#position").tooltip('disable');
        console.log("gps tooltip disable");
    }
    if (Cookies.get("mySchools") != null) {
        $("goToFave").removeClass("disableClick");
        $("#goToFave span").removeClass("glyphicon glyphicon-heart-empty");
        $("#goToFave span").addClass("glyphicon glyphicon-heart");
        $('#goToFave').css("opacity", 1);
        $('#goToFave').attr('data-original-title', 'Gå til favoritter');
        $("#goToFave").off('click', DoPrevent);
        $("#goToFave").removeClass("isInactive");
        if(isMobile()){
            $("#goToFave").tooltip('disable');
        }
    } else {
        $('#goToFave').css("opacity", 0.4);
        $("goToFave").addClass("disableClick");
        $("#goToFave span").removeClass("glyphicon glyphicon-heart");
        $("#goToFave span").addClass("glyphicon glyphicon-heart-empty");
        $('#goToFave').attr('data-original-title', 'Du har ingen favoritter enda!');
        $("#goToFave").on('click', DoPrevent);
        $("#goToFave").addClass("isInactive");
        $("#goToFave").tooltip('enable');
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
            theString += "<div class='fav'><p class='favorite'>" + sortedArr[i] + "</p><span class='glyphicon glyphicon-remove legendRemove' aria-hidden='true' id='" + sortedArr[i] + "' onclick='removeSchool(this.id)'></span></div>";
        }
        console.log(theString);
        elem.innerHTML = theString;
    } else {
        elem.innerHTML = "Ingen skoler valgt!";
        elem.style.color = "red";
    }

    $(".favorite").click(function () {
        Cookies.set("calendarType", "selected");
        Cookies.set("selected", $(this).text());
        window.location.replace("calendar.html");
    });

}

function DoPrevent(e) {
    e.preventDefault();
    e.stopPropagation();
}