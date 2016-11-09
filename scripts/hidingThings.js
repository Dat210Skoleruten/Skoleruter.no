if(!checkIfMobile()){
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
if(checkIfMobile()){
    $(document).mouseup(function (e) {
    var navbar = $("#mySidenav")

    if (!navbar.is(e.target) // if the target of the click isn't the container...
        && navbar.has(e.target).length === 0) { // ... nor a descendant of the container
        closeNav();
    }
    });
}
    
function checkIfMobile(){
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }else{
        return false;
    }
}