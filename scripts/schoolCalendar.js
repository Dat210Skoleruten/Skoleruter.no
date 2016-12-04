
/**
 * calendar is the object that controlls the calendar and list.
 * @param  {array} schoolNames 	The name of schools the caldenar should process
 * @param  {array} array       	The array schoolData 
 */
function calendar(schoolNames, array) {
    this.currentDate = new Date();
    this.currentDate.setDate(1);
    this.currentDate.setHours(0, 0, 0, 0);
    this.now = new Date();
    this.now.setHours(0, 0, 0, 0);
    this.events = [];
    this.schoolList = schoolNames;
    this.schools = findSchool(schoolNames, array);
    this.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    this.firstMonth;
    this.lastMonth;
    



    /**
     * iCal creates a downloadable .ics file of the selected school
     * Used when downloading calendar
     */
    this.iCal = function () {
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

    /**
     * setMounth sets the this.currentDate to the year and month and rebuilds calendar and list
     * Used when clicking on a mounth in the list
     * @param {int} thisYear The desired year
     * @param {int} month    The desired month
     */
    this.setMonth = function (thisYear, month) {
        var months = {
            'Januar': 0,
            'Februar': 1,
            'Mars': 2,
            'April': 3,
            'Mai': 4,
            'Juni': 5,
            'Juli': 6,
            'August': 7,
            'September': 8,
            'Oktober': 9,
            'November': 10,
            'Desember': 11
        };

        month = months[month];
        this.currentDate.setFullYear(thisYear);
        this.currentDate.setMonth(month);
        this.buildCalendar();
        this.buildList(); //fjærn denn hvis listen skal være statisk
    };

    /**
     * prevMonth rebuilds calendar and list with the previous mounth
     */
    this.prevMonth = function () {
    	if ( $("#cal_prev").css('display') == 'none' ){
    		return
		}
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.buildCalendar();
        this.buildList(); //fjærn denn hvis listen skal være statisk
        this.checkMonth();
    };

    /**
     * nextMonth rebuilds calendar and list with the next mounth
     */
    this.nextMonth = function () {
    	if ( $("#cal_next").css('display') == 'none' ){
    		return
		}
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.buildCalendar();
        this.buildList(); //fjærn denn hvis listen skal være statisk
        this.checkMonth();
    };

    /**
     * removeSchool removes a school from the selected schools
     * @param  {string} schoolName The school you want removed
     */
    this.removeSchool = function (schoolName) {
        for (var i = this.schools.length - 1; i >= 0; i--) {
            if (this.schools[i] === schoolName) {
                this.schools.splice(i, 1);
            }
        }
        this.buildCalendar();
        this.buildList(); //fjærn denn hvis listen skal være statisk

    };
    /**
     * rebuildSchools reprocesses the schools selected
     * This needs to be run when removing a school
     */
    this.rebuildSchools = function () {
        this.schools = findSchool(Cookies.get(Cookies.get("calendarType")), getSchoolData());
    };

    /**
     * checkMonth check if you are on the first or last mounth in the dataset. If in one of them, remove ability to go further in that direction
     */
    this.checkMonth = function () {
    	if (this.firstMonth != null){
    		if (this.currentDate.getMonth() == this.firstMonth.getMonth() && this.currentDate.getFullYear() == this.firstMonth.getFullYear()) {
    			console.log("hide");
    			$("#cal_prev").hide();
    		}else{
    			$("#cal_prev").show();
    		}
    		   if (this.currentDate.getMonth() == this.lastMonth.getMonth() && this.currentDate.getFullYear() == this.lastMonth.getFullYear()) {
    		   	console.log("hide");
    			$("#cal_next").hide();
    		}else{
    			$("#cal_next").show();
    		}
    	}

    };

    /**
     * buildCalendar proscesses calender data and builds the html elements for the calendar
     */
    this.buildCalendar = function () {
        var month = this.currentDate.getMonth() + 1;
        var currentYear = this.currentDate.getFullYear();
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

        if (this.schools.length == 0) {
            return;
        }

        for (var currDate in this.schools[0].Datoer) {
            var dates = currDate;

            var dato = new Date(currDate);
            dato.setHours(0 ,0, 0, 0);
           
            //sets this.firstMonth
            if (this.firstMonth == null){
            	console.log("setting first", dato);
            	this.firstMonth = dato;
            }
            //set this.lastMonth
          		this.lastMonth = dato;

            if (dates.substring(5, 7) == month && dates.substring(0, 4) == currentYear) {
                var eventDate = new Date(dates);
                var totDayType = [];

                for (var school in this.schools) {
                    var dayType = "";
                    var dayNum = this.schools[school].Datoer[dates][0];

                    if (dayNum == "001" || dayNum == "011") {
                        dayType = "SFO";
                    } else if (eventDate.getDay() == 6 || eventDate.getDay() == 0) {
                        dayType = "weekend";

                    } else if (dayNum == "000" || dayNum == "010") {
                        dayType = "fri";
                    }
                    totDayType.push(dayType);
                }
                ;

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
                    day = $("<li class='" + chosenDayType + " " + dates + "'>" + "<div class='weekNum'>" + eventDate.getWeekNumber() + "</div>" + "<span class='daySpan text-center'>" + dates.substring(8, 10)
                        + "</span>" + "</li>");
                } else {
                    day = $("<li class='" + chosenDayType + " " + dates + "'>" + "<span class='daySpan text-center'>" + dates.substring(8, 10) + "</span>" + "</li>");
                }
                //if date today, add now class
                var thisDate = new Date(dates);
                thisDate.setHours(0, 0, 0, 0);

                if (thisDate.getTime() == this.now.getTime()) {
                    day.addClass("now");
                }
                $(".days").append(day);
            }
            ;
        }

        for (daysInMonth; daysInMonth < 42; daysInMonth++) {
            var day = $("<li class='after'>.</li>"); //dagene etter måneden.
            $('.days').append(day);
        }
        ;
    };

    /**
     * buildList proscesses calender data and builds the html elements for the list
     */
    this.buildList = function () {
        var monthHeader;
        var list;
        var currMonth;
        $("#myUL").empty();
        var header = 0;
        if (this.schools.length == 0) {
            return;
        }
        for (var dates in this.schools[0].Datoer) {
            var eventDate = new Date(dates);
            var currDay = "";
            var hasSetFirstSchool = false;

            if (header == 0 && currMonth != parseInt(dates.substring(5, 7)) && eventDate >= this.currentDate) {
                currMonth = parseInt(dates.substring(5, 7));

                monthHeader = $("<br><li><span class='header'>" + this.months[currMonth - 1] + ", " + dates.substring(0, 4) + "</span></li>");
                $("#myUL").append(monthHeader);
            }

            for (var school in this.schools) {
                if (currDay.length <= 0) {
                    currDay = "<span class='dateNum'>" + dates.substring(8, 10) + "</span> ";
                }
                if (this.schools[school].Datoer[dates][0] != "111" && this.schools[school].Datoer[dates][0] != "110") {
                    var eventDate = new Date(dates);
                    if (eventDate.getDay() != 0 && eventDate.getDay() != 6) {

                        if (eventDate >= this.currentDate) { //bytt med this.now hvis liste skal være statisk


                            var dayType = "";
                            var dayComment = this.schools[school].Datoer[dates][1];
                            var dayNum = this.schools[school].Datoer[dates][0];

                            if (dayNum == "001" || dayNum == "011") {
                                dayType = "SFO";
                            } else if (dayComment == "Lørdag" || dayComment == "Søndag") {
                                dayType = "weekend";
                            } else if (dayNum == "000" || dayNum == "010") {
                                dayType = "fri";
                            }

                            var status;
                            var currName = "";

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
                                currName = this.schools[school].Skolenavn + ": ";
                            }

                            var legendC = "<span class='legendCircle " + dayType + "'></span>"; //The circle right side calendarList
                            var space = "<span class='space'>" + 01 + "</span>";
                            if (!hasSetFirstSchool) {
                                currDay = "<span class='dateNum " + dayType + "'>" + dates.substring(8, 10) + "</span>";
                                list = $("<li class=" + dates + "><span>" + currDay + currName + status + legendC + "</span></li>");
                                hasSetFirstSchool = true;
                            } else {
                                currDay = "<span class='dateNum " + dayType + "'>" + space + "</span> ";
                                list = $("<li class=" + dates + "><span>" + currDay + currName + status + legendC + "</span></li>");
                            }
                            $("#myUL").append(list);
                        }
                    }
                }
            }
        }

        $(".header").click(function () {
            var date = $(this).html().split(",");
            var currCal = getCurrCal();
            if (currCal != null) {
                currCal.setMonth(date[1], date[0]);
            } else {
                cal.setMonth(date[1], date[0]);
            }
        });

        //Scrolls to the top of the list after listBuild
        $("#noScrollCalendar").animate({scrollTop: 0}, "fast");
    };

    /**
     * addHover adds hover makse hovering over a date in the list, it highlights the same date in the calendar or the other way around.
     * !!! DOES NOT WORK !!!
     */
    this.addHover = function () {
        jQuery.each(this.schools[0].Datoer, function (i, val) {
            $("." + val).hover(function () {
                $("." + val).toggleClass("hovered");
            });
        });
    }
}
