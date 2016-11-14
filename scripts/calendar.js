/********** Tooltip **********/
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready(function () {

    var el = document.getElementById('schoolName');
    swipedetect(el, function(swipedir){
    //swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!');
        $("#schoolName").css("color", "blue");
    });


    parseData(function () {
        setSchoolData(Cookies.get('selected'), Cookies.get("calendarType")); // Sets name & hyperlink on html document
        cal = new calendar(Cookies.get(Cookies.get("calendarType")), getSchoolData());
        cal.buildCalendar(); // Builds calendar
        cal.buildList(); // Builds List
        cal.addHover();

        document.ontouchmove = function (e) {
            var target = e.currentTarget;
            while (target) {
                if (checkIfElementShouldScroll(target))
                    return;
                target = target.parentNode;
            }
            e.preventDefault();
        };

        $("#cal_prev").click(function () {
            cal.prevMonth();
        });

        $("#cal_next").click(function () {
            cal.nextMonth();
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 37) { // Left arrow
                cal.prevMonth();
            }
        });

        $("body").keyup(function (e) {
            if (e.keyCode == 39) { // Right arrow
                cal.nextMonth();
            }
        });

    });
});

/* Trying to swipe */
$(document).on("pagecreate", "#pageone", function() {
    $('ui').on("swipeleft", function () {
        alert("You swiped left!")
        console.log("Swiped left")
    });

    $('ui').on("swiperight", function () {
        alert("You swiped right!")
        console.log("Swiped right")
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
    if (str != undefined) {
        var strArr = str.split(",");
        for (var j = 0; j < strArr.length; j++) {
            for (var i = 0; i < array.length; i++) {

                if (array[i].Skolenavn == strArr[j]) {
                    selectedSchools.push(array[i]);
                }
            }
        }
    }
    return selectedSchools;
}

/**
 * [setSchoolData description]
 * @param {[string]} name [description]
 */
function setSchoolData(name, type) {
    if (type == 'selected') {
        if (name == "" || name == null) {
            $("#schoolName").html('Ingen skole valgt');
            alert("Ingen skole valgt");
            return
        }
        $("#schoolName").html(name);
        // setter href for hver skole når du trykker på hver av dem
        var chosenScho = findSchool(name, getSchoolData());
        var elem = document.getElementById("schoolLink");
        elem.href = chosenScho[0].Hjemmeside;
    }
}

var cal; // Creates a calendar

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}