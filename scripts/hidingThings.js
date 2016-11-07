$(document).mouseup(function (e)
{
    var indexlist = $("#indexList");
    var navbar = $("#mySidenav")

    if (!indexlist.is(e.target) // if the target of the click isn't the container...
        && indexlist.has(e.target).length === 0) // ... nor a descendant of the container
    {
        indexlist.hide();
    }
    if (!navbar.is(e.target) // if the target of the click isn't the container...
        && navbar.has(e.target).length === 0) // ... nor a descendant of the container
    {
        closeNav();
    }

});