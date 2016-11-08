function testHover(){
$("#indexList td a").mouseenter(function(){
    console.log("HELLO");
    $(this).css("color", "#fff");
    $(this).css("background-color", "#495156");
});
$(".addbutton td a").mouseenter(function(){
    $(this).css("color", "#fff");
    $(this).css("background-color", "#495156");
});
$("#indexList td a").mouseleave(function(){
    console.log("LEAVING");
    $(this).css("color", "#495156");
    $(this).css("background-color", "#e5e5e5");
});
$(".addbutton td a").mouseleave(function(){
    $(this).css("color", "#495156");
    $(this).css("background-color", "#e5e5e5");
});
}