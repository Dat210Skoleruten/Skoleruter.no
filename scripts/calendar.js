var tmpArray = getSchoolData();
var selected = Cookies.get('selected');
var mySchools = Cookies.get('mySchools');

$(document).ready(function() {
  console.log("Selected school:", selected);
  console.log("SchoolData:", tmpArray);
  $("#schoolName").html(selected);
  console.log("Selected school:", selected);
  console.log("SchoolData:", tmpArray);
  $("#schoolName").html(selected);
  // setter href for hver skole når du trykker på hver av dem
  var chosenScho = findSchool(selected, tmpArray);
  var elem = document.getElementById("schoolLink");
  elem.href = chosenScho[0].Hjemmeside;

  cal.buildCalendar();
  cal.buildList();

  $("#cal_prev").click(function() {
    cal.prevMonth();
  });

  $("#cal_next").click(function() {
    cal.nextMonth();
  });

  $("body").keyup(function(e) {
    if (e.keyCode == 37) {
      cal.prevMonth();
    }

  });

  $("body").keyup(function(e) {
    if (e.keyCode == 39) {
      cal.nextMonth();
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

// findSchool finds the school with the name as string from array
function findSchool(str, array) {
  var tmpArr = [];
  var strArr = str.split(",");

  for (var j = 0; j < strArr.length; j++) {
    for (var i = 0; i < array.length; i++) {

      if (array[i].Skolenavn == strArr[j]) {
        tmpArr.push(array[i]);
      }
    }

  }
  return tmpArr;
}


// TODO: finish calendar class
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
    console.log(schoolNames);
    console.log(this.schools);
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
        } else {
          dayType = "Ikke SFO idag";
        }
      newCal.addEvent(this.schools[entries].Datoer[dates][1], selSchool, dayType, dates, dates);
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
          //console.log(dates);
          //console.log(this.schools[skoler]);
          // for (var dates in this.schools[skoler].Datoer[temp]) {

          //  console.log("Dato:", dates ,"Status:",this.schools[skoler].Datoer[dates][0],"Kommentar",this.schools[skoler].Datoer[dates][1]);


          //build calendar and table

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
        console.log("isOnlySFO: ", isOnlySFO, ", isFri: ", isFri);

        if(weekend){
          chosenDayType = "weekend";
        }else if (isOnlySFO && isFri) {
          chosenDayType = "SFOfri";
        } else if (isOnlySFO && !isFri) {
          chosenDayType = "SFO";
        }else if (!isOnlySFO && isFri) {
          chosenDayType = "fri";
        }else if (!isOnlySFO && !isFri) {
          chosenDayType = "";
        }
        console.log(chosenDayType);
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

        //console.log(this.now.getFullYear() ,(this.now.getMonth()+1) , (this.now.getDay()+2) , dates );
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
    var monthHeader;
    var list;
    var currMonth;
    $("#myUL").empty();
    var header = 0;
    for (var dates in this.schools[0].Datoer) {
      for (var skoler in this.schools) {
        if (this.schools[skoler].Datoer[dates][0] != "111" && this.schools[skoler].Datoer[dates][0] != "110") {
          var eventDate = new Date(dates);
          // console.log(eventDate);
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
            // console.log(status);
            list = $("<li><a>" + currDay + currName + status + " </a></li>");
            $("#myUL").append(list);
          };
        }
      }
    };
  };
};



var calMode;
if (Cookies.get("calendarType") == "mySchools" || Cookies.get("calendarType") == "selected") {
  calMode = Cookies.get(Cookies.get("calendarType"));
} else {
  calMode = selected;

}
var cal = new Calendar(calMode, tmpArray);