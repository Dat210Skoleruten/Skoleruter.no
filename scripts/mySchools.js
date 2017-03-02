//function to check
var currCal = null;

function getCurrCal() {
    if (currCal != null) {
        return currCal;
    } else {

    }
}
function checkCookie(val) {
    var elem = document.getElementById(val);

    if (checking(val)) {
        elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-heart-empty';
    } else {
        elem.firstElementChild.firstElementChild.setAttribute("class", 'glyphicon glyphicon-heart');
    }
    showFavorites() // printMySchools.js - if mySchools is empty, grey out mySchools button in index and vice versa
}

function checking(school) {
    if (Cookies.get('mySchools') == null) {
        Cookies.set('mySchools', school, {expires: 365});
        return false;
    } else {
        schoStr = Cookies.get('mySchools');
        ArrOfSchools = schoStr.split(";");
        for (var i = 0; i < ArrOfSchools.length; i++) {
            if (school == ArrOfSchools[i]) {
                ArrOfSchools.splice(i, 1);
                Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
                if (ArrOfSchools.join(";") == "") {
                    Cookies.remove("mySchools");
                }
                return true;
            }
        }
        ArrOfSchools.push(school);
        Cookies.set('mySchools', ArrOfSchools.join(";"), {expires: 365});
        return false;
    }
}

function containsObject(val, list) {
    var i;

    for (i = 0; i < list.length; i++) {
        if (list[i] === val) {
            return true;
        }
    }
    return false;
}

function checkCalSelect() {
    var elem = document.getElementById("selecookiefav");

    if (Cookies.get("mySchools") != null) {
        schoStr = Cookies.get('mySchools');
        ArrOfSchools = schoStr.split(",");

        for (var i = 0; i < ArrOfSchools.length; i++) {
            if (Cookies.get("selected") == ArrOfSchools[i]) {
                elem.className = "glyphicon glyphicon-heart";
            }
        }
    }
}

function calenderCookie() {
    var elem = document.getElementById("selecookiefav");

    if (checking(Cookies.get("selected"))) {
        elem.className = 'glyphicon glyphicon-heart-empty';
    } else {
        elem.className = 'glyphicon glyphicon-heart';
    }
}

function removeSchool(school) {
    //mySchoolString = Cookies.get('mySchools');
    if (Cookies.get('mySchools') != null) {
        checking(school);


        printMySchools();

        cal.rebuildSchools();
        cal.buildCalendar();
        cal.buildList();

    }
    else {
        
    }
}

