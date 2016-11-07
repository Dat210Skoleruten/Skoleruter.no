//function to check
var currCal = null;

function getCurrCal(){
    if(currCal != null){
        return currCal;
    }else{
        console.log("NO CALENDAR SET");
    }
}
function checkCookie(val) {
    var elem = document.getElementById(val);

    if(checking(val)){
        elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-star-empty';
    }else{
        elem.firstElementChild.firstElementChild.setAttribute("class", 'glyphicon glyphicon-star');
    }
}

function checking(school){
    
    if (Cookies.get('mySchools') == null) {
        Cookies.set('mySchools', school, {expires: 365});
        return false;
    } else {
        schoStr = Cookies.get('mySchools');
        ArrOfSchools = schoStr.split(",");

        for (var i = 0; i < ArrOfSchools.length; i++) {
            if (school == ArrOfSchools[i]) {
                ArrOfSchools.splice(i, 1);
                Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
                if (ArrOfSchools.toString() == "") {
                    Cookies.remove("mySchools");
                }
                return true;
            }
        }
        ArrOfSchools.push(school);
        Cookies.set('mySchools', ArrOfSchools.toString(), {expires: 365});
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
                elem.className = "glyphicon glyphicon-star";
            }
        }
    }
}

function calenderCookie() {
    var elem = document.getElementById("selecookiefav");

    if(checking(Cookies.get("selected"))){
        elem.className = 'glyphicon glyphicon-star-empty';
    }else{
        elem.className = 'glyphicon glyphicon-star';
    }
}

function removeSchool(school){
  //mySchoolString = Cookies.get('mySchools');

  if(Cookies.get('mySchools') != null){
    checking(school);
    //if(Cookies.get('mySchools') != null){

      printMySchools();
      var cal = new calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData());
      currCal = cal;
      cal.buildCalendar();
      cal.buildList();

      $("#cal_prev").click(function() {
          cal.prevMonth();
      });

      $("#cal_next").click(function() {
          cal.nextMonth();
      });

      $("body").keyup(function(e) {
          if (e.keyCode == 37) { // Left arrow
              cal.prevMonth();
          }
      });

      $("body").keyup(function(e) {
          if (e.keyCode == 39) { // Right arrow
              cal.nextMonth();
          }
      });

      $(".header").click(function () {
          var date = $(this).html().split(",");
          cal.setMonth(date[1], date[0]);
      });
  //  }
  }
  else{
    console.log("Ingen skoler valgt!");
  }
}

