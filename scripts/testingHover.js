$(document).ready(function(){
    $("#indexList td a").mouseenter(function(){
        $("#indexList td a").css("color", "#fff");
        $("#indexList td a").css("background-color", "#495156")
    });
    $(".addbutton td a").mouseenter(function(){
        $("#indexList td a").css("color", "#fff");
        $("#indexList td a").css("background-color", "#495156")
    });
    
    $(".addbutton td a").mouseleave(function(){
        $("#indexList td a").css("color", "#495156");
        $("#indexList td a").css("background-color", "#e5e5e5")
    });
    $(".addbutton td a").mouseleave(function(){
        $("#indexList td a").css("color", "#495156");
        $("#indexList td a").css("background-color", "#e5e5e5")
    });
});