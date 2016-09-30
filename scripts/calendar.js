    var tmpArray = getSchoolData(); //workaround with Session
    var selected = Cookies.get('selected');

    $(document).ready(function() {

      console.log("Selected school:", selected);
      console.log("SchoolData:", tmpArray);
      $("#schoolName").html(selected);

      cal.buildCalendar();
      cal.buildList();

      $("#cal_prev").click(function() {
        cal.prevMonth();
      });
      $("#cal_next").click(function() {
        cal.nextMonth();
      });

      $("body").keydown(function(e) {
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
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < strArr.length; j++) {
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
        this.now = new Date();
        //  this.currentDate.setMonth(11); //for å teste andre månder
        this.events = [];
        this.schools = findSchool(schoolNames, array);
        this.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
          "Juli", "August", "September", "Oktober", "November", "Desember"
        ];
      }


      addEvent(dato, status, comment, school) {


      };
      addSchool(schoolNames, array) {
        //this.schools = findSchool(schoolNames, array);
      }

      prevMonth() {
        console.log("prevMonth");
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.buildCalendar();
      };
      nextMonth() {
        console.log("nextMonth");
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.buildCalendar();
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
        for (var skoler in this.schools) {

          if (firstDay.getDay() != 1) {
            var cDay = firstDay.getDay();
            if (cDay == 0) {
              cDay = 7;
            }
            for (var i = 1; i < cDay; i++) {
              daysInMonth++;
              var day = $("<li></li>");
              $(".days").append(day);

            }
          }


          //console.log(this.schools[skoler]);
          for (var dates in this.schools[skoler].Datoer) {

            //  console.log("Dato:", dates ,"Status:",this.schools[skoler].Datoer[dates][0],"Kommentar",this.schools[skoler].Datoer[dates][1]);



            //build calendar and table
            if (dates.substring(5, 7) == month && dates.substring(0, 4) ==
              currentYear) {

              daysInMonth++;
              var currDateType = this.schools[skoler].Datoer[dates][0];
              //         for (var c = 0; c < 3; c++) {
              //             if (currDateType.charAt(c) == '1') {
              //                 dateType.charAt(c) == '1';
              //                 console.log("current charat:", currDateType.charAt(c));
              //                 console.log("sat charat:",dateType.charAt(c));
              //             }

              //
              // }
              if (this.schools[skoler].Datoer[dates][0] == "111") {
                var day = $("<li>" + dates.substring(8, 10) + "</li>")

              } else {
                var day = $("<li><span class='c" + this.schools[skoler].Datoer[dates][0] + "'>" + dates.substring(8, 10) +
                  "</span></li>");
              };
              $(".days").append(day);
            };

          };
        };

        for (daysInMonth; daysInMonth < 42; daysInMonth++) {
          var day = $("<li></li>");
          $('.days').append(day);
        };
      };

  buildList () {
            var month = this.now.getMonth();
            var monthHeader;
            var list;
            var currMonth;
              $("#myUL").empty();
              var header = 0;
          for (var skoler in this.schools) {
            for (var dates in this.schools[skoler].Datoer) {
                    if (this.schools[skoler].Datoer[dates][0] != "111" ) {
                      if(header == 0 && currMonth != parseInt(dates.substring(5, 7))){
                            currMonth = parseInt(dates.substring(5, 7));
                        monthHeader = $("<li><a class='header'>" + this.months[currMonth-1] + "</a></li></br>");
                        $("#myUL").append(monthHeader);
                        }
                      }
                      list = $("<li><a>" + dates  + ", " + this.schools[skoler].Datoer[dates][1] + ", " + this.schools[skoler].Datoer[dates][0] + "</a></li>");
                      $("#myUL").append(list);
              };

          };
        };
};

      var cal = new Calendar(selected, tmpArray);
