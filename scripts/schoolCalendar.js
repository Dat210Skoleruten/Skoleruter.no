function calendar(schoolNames, array) {
	this.currentDate = new Date();
	this.currentDate.setDate(1);
	this.currentDate.setHours(0, 0, 0, 0);
	this.now = new Date();
	this.now.setHours(0, 0, 0, 0);
	this.events = [];
	this.schools = findSchool(schoolNames, array);
	this.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Desember"
	];

	this.iCal = function() {
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

	this.setMonth = function(thisYear, month) {
		console.log("setMonth");
		var months = {
    		'Januar' : 0,
    		'Februar' : 1,
    		'Mars' : 2,
    		'April' : 3,
    		'Mai' : 4,
    		'Juni' : 5,
    		'Juli' : 6,
    		'August' : 7,
    		'September' : 8,
    		'Oktober' : 9,
    		'November' : 10,
    		'Desember' : 11,
		}
		month = months[month];
		this.currentDate.setFullYear(thisYear);
		this.currentDate.setMonth(month);
		this.buildCalendar();
		this.buildList(); //fjærn denn hvis listen skal være statisk
	};

	this.prevMonth = function() {
		console.log("prevMonth");
		this.currentDate.setMonth(this.currentDate.getMonth() - 1);
		this.buildCalendar();
		this.buildList(); //fjærn denn hvis listen skal være statisk
	};

	this.nextMonth = function() {
		console.log("nextMonth");
		this.currentDate.setMonth(this.currentDate.getMonth() + 1);
		this.buildCalendar();
		this.buildList(); //fjærn denn hvis listen skal være statisk
	};

	this.buildCalendar = function() {
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
		if(this.schools.length == 0){
			return;
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
					day = $("<li class='" + chosenDayType + " " + dates + "'>" + "<div class='weekNum'>" + eventDate.getWeekNumber() + "</div>" + " " + dates.substring(8, 10) +
						"</li>");
				} else {
					day = $("<li class='" + chosenDayType + " " + dates + "'>" + dates.substring(8, 10) +
						"</li>");
				}
				//if date today, add now class
				var thisDate = new Date(dates);
				thisDate.setHours(0, 0, 0, 0);
				if (thisDate.getTime() == this.now.getTime()) {
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

	this.buildList = function() {
		console.log('Building List')
		var monthHeader;
		var list;
		var currMonth;
		$("#myUL").empty();
		var header = 0;
		console.log(this.schools);
		if(this.schools.length == 0){
			return;
		}
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
						list = $("<li class="+ dates + "><a>" + currDay + currName + status + " </a></li>");
						$("#myUL").append(list);

					}
				}
			}
		}
		 $(".header").click(function () {
               var date = $(this).html().split(",");
               cal.setMonth(date[1], date[0]);
        });
		 //Scrolls to the top of the list after listBuild
		 $("#noScrollCalendar").animate({ scrollTop: 0 }, "fast");
	}

	this.addHover = function(){

		for(var l in this.schools[0].Datoer){ // can iterate over dates but does not working with jQuery hover assigning
			//console.log(l);
		}

		$.each( this.schools[0].Datoer, function( l ){ // cant iterate over array but should work with jQuery hover
			console.log(l);
		});

		jQuery.each( this.schools[0].Datoer, function( i, val ) {
			console.log(i);
			console.log(val);
			$( "." + val ).hover(function () {
				console.log("hover");
				$("." + val).toggleClass("hovered");
				console.log(val);
			});
		});
	}


}
