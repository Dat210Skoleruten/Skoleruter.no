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
    if(/Android/i.test(navigator.userAgent)){
        return "Android";
    }else if(/webOS/i.test(navigator.userAgent)){
        return "webOS";
    }else if(/iPhone/i.test(navigator.userAgent)){
        return "iPhone";
    }else if(/iPad/i.test(navigator.userAgent)){
        return "iPad";
    }else if(/iPod/i.test(navigator.userAgent)){
        return "iPod";
    }else if(/BlackBerry/i.test(navigator.userAgent)){
        return "BlackBerry";
    }else if(/IEMobile/i.test(navigator.userAgent)){
        return "IEMobile";
    }else if(/Opera Mini/i.test(navigator.userAgent)){
        return "Opera Mini";
    }else if(/Windows Phone/i.test(navigator.userAgent)){
        return "Windows Phone";
    }else{
        return "UNKNOWN";
    }
}

$(document).ready(function(){
    $("#currPlatform").html(getPlatform());
});