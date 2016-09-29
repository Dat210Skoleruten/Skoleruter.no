


$(document).ready(function () {
    var selected = Cookies.get('selected');
    console.log("Selected school:" ,selected);
    var currentDate = new Date();
    var tmpArray = getSchoolData(); //workaround with Session
    console.log("SchoolData:", tmpArray);
    $("#schoolName").html(selected);

    var cal = new Calendar(selected, tmpArray);
    cal.buildCalendar();
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
        this.events = [];
        this.schools = findSchool(schoolNames, array);
        this.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
        this.month = this.currentDate.getMonth()+1;
        if(month < 10){
            month = "0"+month;
        }
    }

    addEvent(dato, status, comment, school) {


    }
    addSchool(schoolNames, array) {
        //this.schools = findSchool(schoolNames, array);
    }

    buildCalendar() {



        console.log("Building Calendar");
        console.log(this.schools[0]);
        console.log(this.schools[0].Datoer);
  for (var skoler in this.schools){
    console.log(this.schools[skoler]);
        for(var dates in this.schools[skoler].Datoer){
          console.log(dates ,this.schools[skoler].Datoer[dates]);

      }
    }
        $(".days").empty();
        $("#month").html(this.months[this.currentDate.getMonth()]); //set calendar month in html
        $.each(this.schools[0].dates, function (i, date) {
            var dateType = "000";
            var daysInMonth = 0;
            $.each(schools, function (j, school) {
                //build calendar and table
                if (date.substring(5, 7) == month) {
                    daysInMonth++;
                    var currDateType = school.dates[date];
                    for (var c = 0; c < 3; c++) {
                        if (currDateType[0].charAt(c) == '1') {
                            dateType.charAt(c) == '1';
                        }
                    }
                }
            });
            if(dateType == "000"){
                var day = $("<li>"+date.substring(8,9)+"</li>")
            }else{
                var day = $("<li><span class='c"+ dateType + "'>" + date.substring(8,9) + "</span></li>");
            }

            $(".days").append(day);
        });
    }
}
