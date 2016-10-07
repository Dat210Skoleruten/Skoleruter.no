$(document).ready(function() {
  setSchoolData(Cookies.get('selected')); // Sets name & hyperlink on html document



  cal.buildCalendar(); // Builds calendar
  cal.buildList(); // Builds List

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
});

/**
 * [findSchool description]
 * @param  {[type]} str   [description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function findSchool(str, array) {
  var selectedSchools = [];
  var strArr = str.split(",");

  for (var j = 0; j < strArr.length; j++) {
    for (var i = 0; i < array.length; i++) {

      if (array[i].Skolenavn == strArr[j]) {
        selectedSchools.push(array[i]);
      }
    }
  }
  return selectedSchools;
}
/**
 * [setSchoolData description]
 * @param {[string]} name [description]
 */
function setSchoolData(name) {
  if (name == "" || name == null) {
    $("#schoolName").html('Ingen skole valgt');
    return
  }
  // setter href for hver skole når du trykker på hver av dem
  var chosenScho = findSchool(name, getSchoolData());
  var elem = document.getElementById("schoolLink");
  elem.href = chosenScho[0].Hjemmeside;
}

/**
 * 
 */
class Calendar {
  constructor(schoolNames, array) {
    this.currentDate = new Date();
    this.currentDate.setDate(1);
    this.currentDate.setHours(0, 0, 0, 0)
      //this.currentDate.setTime(0);
    this.now = new Date();
    //  this.currentDate.setMonth(11); //for å teste andre månder
    this.events = [];
    this.schools = findSchool(schoolNames, array);
    this.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
  }

  addEvent(dato, status, comment, school) {};

  addSchool(schoolNames, array) {};

  iCal() {
    var selSchool = Cookies.get('selected');
    var newCal = new ics();
    for (var currDate in this.schools[0].Datoer) {
      for (var entries in this.schools) {
        var dates = currDate;
        var dayType = "";
        var dayNum = this.schools[entries].Datoer[dates][1];
        if (dayNum == "001" || dayNum == "011") {
          dayType = "SFO";
        } else if (dayNum == "000" || dayNum == "010") {
          dayType = "Fri/Ingen SFO";
        }
        if (this.schools[entries].Datoer[dates][1] != "" && this.schools[entries].Datoer[dates][1] != "Lørdag" && this.schools[entries].Datoer[dates][1] != "Søndag") {
          //se på SFO
          newCal.addEvent(this.schools[entries].Datoer[dates][1], dayType, selSchool, dates, dates);
        }
      }
    }
    newCal.download();

  };

  prevMonth() {
    console.log("prevMonth");
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.buildCalendar();
    this.buildList(); //fjærn denn hvis listen skal være statisk
  };

  nextMonth() {
    console.log("nextMonth");
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.buildCalendar();
    this.buildList(); //fjærn denn hvis listen skal være statisk
  };

  buildCalendar() {
    console.log("Building Calendar");

    var month = this.currentDate.getMonth() + 1;
    var currentYear = this.currentDate.getFullYear();
    var currentDay = this.currentDate.getDay();
    var firstDay = new Date(this.currentDate.getFullYear(), this.currentDate
      .getMonth(), 1);
    if (month < 10) {
      month = "0" + month;

    }



    $(".days").empty();
    $("#month").html(this.months[this.currentDate.getMonth()] +
      "<br> <span style='font-size:18px' id='year'>" + currentYear +
      "</span>"); //set calendar month in html
    $("#year").html(currentYear);
    var dateType = "000";
    var daysInMonth = 0;

    if (firstDay.getDay() != 1) {
      var cDay = firstDay.getDay();
      if (cDay == 0) {
        cDay = 7;
      }
      for (var i = 1; i < cDay; i++) {
        daysInMonth++;

        var day = $("<li class='before'>.</li>"); //dagene før måneden har startet

        $(".days").append(day);

      }
    }

    for (var currDate in this.schools[0].Datoer) {
      var dates = currDate;
      if (dates.substring(5, 7) == month && dates.substring(0, 4) == currentYear) {
        var eventDate = new Date(dates);
        var totDayType = [];

        for (var skoler in this.schools) {
          var dayType = "";
          var dayNum = this.schools[skoler].Datoer[dates][0];
          if (dayNum == "001" || dayNum == "011") {
            dayType = "SFO";
          } else if (eventDate.getDay() == 6 || eventDate.getDay() == 0) {
            dayType = "weekend";

          } else if (dayNum == "000" || dayNum == "010") {
            dayType = "fri";
          }
          totDayType.push(dayType);
        };

        daysInMonth++;
        var isOnlySFO = false;
        var isFri = false;
        var weekend = false;
        var chosenDayType = "";
        for (var currDateType in totDayType) {
          if (totDayType[currDateType] == "SFO") isOnlySFO = true;
          if (totDayType[currDateType] == "fri") isFri = true;
          if (totDayType[currDateType] == "weekend") weekend = true;
        }
        if (weekend) {
          chosenDayType = "weekend";
        } else if (isOnlySFO && isFri) {
          chosenDayType = "SFOfri";
        } else if (isOnlySFO && !isFri) {
          chosenDayType = "SFO";
        } else if (!isOnlySFO && isFri) {
          chosenDayType = "fri";
        } else if (!isOnlySFO && !isFri) {
          chosenDayType = "";
        }
        var day;
        if (eventDate.getDay() == 1) {
          day = $("<li class='" + chosenDayType + "'>" + "<div class='weekNum'>" + eventDate.getWeekNumber() + "</div>" + " " + dates.substring(8, 10) +
            "</li>");
        } else {
          day = $("<li class='" + chosenDayType + "'>" + dates.substring(8, 10) +
            "</li>");
        }
        //};
        //if date today. Append class "today"
        var thisDate = new Date(dates);

        if (parseInt(dates.substring(0, 4)) == this.now.getFullYear() && parseInt(dates.substring(5, 7)) == (this.now.getMonth() + 1) && parseInt(dates.substring(8, 10)) == (this.now.getDay() + 2)) {
          day.addClass("now");
        }

        $(".days").append(day);
      };
    }

    for (daysInMonth; daysInMonth < 42; daysInMonth++) {

      var day = $("<li class='after'>.</li>"); //dagene etter måneden.

      $('.days').append(day);
    };
  };

  buildList() {
    console.log('Building List')
    var monthHeader;
    var list;
    var currMonth;
    $("#myUL").empty();
    var header = 0;
    for (var dates in this.schools[0].Datoer) {
      for (var skoler in this.schools) {
        if (this.schools[skoler].Datoer[dates][0] != "111" && this.schools[skoler].Datoer[dates][0] != "110") {
          var eventDate = new Date(dates);
          if (eventDate >= this.currentDate) { //bytt med this.now hvis liste skal være statisk
            if (header == 0 && currMonth != parseInt(dates.substring(5, 7))) {
              currMonth = parseInt(dates.substring(5, 7));

              monthHeader = $("<br><li><a class='header'>" + this.months[currMonth - 1] + ", " + dates.substring(0, 4) + "</a></li>");
              $("#myUL").append(monthHeader);
            }

            var dayType = "";
            var dayComment = this.schools[skoler].Datoer[dates][1];
            var dayNum = this.schools[skoler].Datoer[dates][0];

            if (dayNum == "001" || dayNum == "011") {
              dayType = "SFO";
            } else if (dayComment == "Lørdag" || dayComment == "Søndag") {
              dayType = "weekend";
            } else if (dayNum == "000" || dayNum == "010") {
              dayType = "fri";
            }

            var status;
            var currDay = "";
            var currName = "";

            if (skoler == 0) {
              currDay = "<span class='dateNum'>" + dates.substring(8, 10) + "</span> ";
            }

            if (dayType == "SFO") {
              status = "Kun SFO";
            } else if (dayType == "fri" && dayComment == "") {
              status = "Skolefri";
            } else if (dayType != "weekend") {
              status = dayComment;
            } else {
              continue;
            }

            if (this.schools.length > 1) {
              currName = this.schools[skoler].Skolenavn + ": ";
            }
            list = $("<li><a>" + currDay + currName + status + " </a></li>");
            $("#myUL").append(list);
          };
        }
      }
    };
  };
};
var cal = new Calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData()); // Creates a calendar