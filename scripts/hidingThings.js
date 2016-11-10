/*$(document).mouseup(function (e) {
        var indexlist = $("#indexList");
        var navbar = $("#mySidenav")

        if (!indexlist.is(e.target) // if the target of the click isn't the container...
            && indexlist.has(e.target).length === 0) { // ... nor a descendant of the container
            indexlist.hide();
            $("#indexSearch").val("");
        }
        if (!$("#indexSearch").is(e.target) // if the target of the click isn't the container...
            && $("#indexSearch").has(e.target).length === 0) { // ... nor a descendant of the container
            $("#indexSearch").blur();
        }
        if (!navbar.is(e.target) // if the target of the click isn't the container...
            && navbar.has(e.target).length === 0) { // ... nor a descendant of the container
            closeNav();
        }
    }); */

if (!isMobile()) {
    $(document).mouseup(function (e) {
        var indexlist = $("#indexList");    
        var navbar = $("#mySidenav")

        if (!indexlist.is(e.target) // if the target of the click isn't the container...
            && indexlist.has(e.target).length === 0) { // ... nor a descendant of the container
            indexlist.hide();
            $("#indexSearch").val("");
        }
        if (!navbar.is(e.target) // if the target of the click isn't the container...
            && navbar.has(e.target).length === 0) { // ... nor a descendant of the container
            closeNav();
        }
    });
}

if (isMobile()) {
    $(document).mouseup(function (e) {
        var navbar = $("#mySidenav")

        if (!navbar.is(e.target) // if the target of the click isn't the container...
            && navbar.has(e.target).length === 0) { // ... nor a descendant of the container
            closeNav();
        }
        if (!$("#indexSearch").is(e.target) // if the target of the click isn't the container...
            && $("#indexSearch").has(e.target).length === 0) { // ... nor a descendant of the container
            $("#indexSearch").blur();
        }
    });
}


function isMobile(){
    /*if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){*/
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent) ) {
 // some code..
        return true;
    }else{
        return false;
    }
}

function getPlatform(){
    if(navigator.userAgent.match(/Android/i)){
        return "Android";
    }else if(navigator.userAgent.match(/webOS/i)){
        return "webOS";
    }else if(navigator.userAgent.match(/iPhone/i)){
        return "iPhone";
    }else if(navigator.userAgent.match(/iPad/i)){
        return "iPad";
    }else if(navigator.userAgent.match(/iPod/i)){
        return "iPod";
    }else if(navigator.userAgent.match(/BlackBerry/i)){
        return "BlackBerry";
    }else if(navigator.userAgent.match(/Windows Phone/i)){
        return "Windows Phone";
    }else{
        return "UNKNOWN";
    }
}

var newDiv = $("<div id='currPlatform'></div>")
newDiv.text(getPlatform());
$("body").append("<p> platform: " + newDiv + "</p>");
$('body').append('<div>footer</div>');