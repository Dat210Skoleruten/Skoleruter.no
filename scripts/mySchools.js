//function to check
function checkCookie(val) {
    console.log(Cookies.get('mySchools') == null);
    var schoStr = "";
    var ArrOfSchools = [];
    var elem = document.getElementById(val);

    if (Cookies.get('mySchools') == null) {
        Cookies.set('mySchools', val, {expires: 365});
        elem.firstElementChild.firstElementChild.setAttribute("class", 'glyphicon glyphicon-star');
    } else {
        schoStr = Cookies.get('mySchools');
        ArrOfSchools = schoStr.split(",");

        for (var i = 0; i < ArrOfSchools.length; i++) {
            if (val == ArrOfSchools[i]) {
                ArrOfSchools.splice(i, 1);
                Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
                elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-star-empty';
                if (ArrOfSchools.toString() == "") {
                    Cookies.remove("mySchools");
                }
                return;
            }
        }
        ArrOfSchools.push(val);
        Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
        elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-star';
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
                elem.className = "glyphicon glyphicon-star";
            }
        }
    }
}

function calenderCookie() {
    var elem = document.getElementById("selecookiefav");
    var schoStr = "";
    var ArrOfSchools = [];

    if (Cookies.get('mySchools') == null) {
        //  console.log("mySchools var tom!");
        Cookies.set('mySchools', Cookies.get("selected"), {expires: 365});
        elem.className = 'glyphicon glyphicon-star';
    } else {
        //  console.log("else", Cookies.get('mySchools') == null);
        schoStr = Cookies.get('mySchools');
        ArrOfSchools = schoStr.split(",");
        //  console.log(ArrOfSchools);
        //  console.log("toloaasd");

        for (var i = 0; i < ArrOfSchools.length; i++) {
            if (Cookies.get("selected") == ArrOfSchools[i]) {
                ArrOfSchools.splice(i, 1);
                Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
                elem.className = 'glyphicon glyphicon-star-empty';
                return;
            }
        }
        ArrOfSchools.push(Cookies.get("selected"));
        Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
        elem.className = 'glyphicon glyphicon-star';
    }
}

function removeSchool(school){
  mySchoolString = Cookies.get('mySchools');

  if(Cookies.get('mySchools') != null){
    ArrOfSchools = mySchoolString.split(",");

    console.log("(this) = ", school);
    for (var i = 0; i < ArrOfSchools.length; i++) {
      if (school == ArrOfSchools[i]) {
          ArrOfSchools.splice(i, 1);
          Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
      }
      if (ArrOfSchools.toString() == "") {
          Cookies.remove("mySchools");
      }
    }
    //if(Cookies.get('mySchools') != null){
      printMySchools();
      var cal = new calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData());
      cal.buildCalendar();
      cal.buildList();
  //  }
  }
  else{
    console.log("Ingen skoler valgt!");
  }
}
